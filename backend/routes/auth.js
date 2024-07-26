const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWt_SECRET = "NEEDED#!0"

//for validation
router.post('/createuser', [
    body('email', 'Please enter a valid email').isEmail(),
    body('name', 'Name must be atleast 3 characters').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
  // if errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //check if user exists
    try{
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: 'User already exists' });
      };
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt); 
      //create user
      user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        })
        const data = {
          user:{
            id: user.id
          }
        }
        const authToken = jwt.sign(data, JWt_SECRET);
        success = true;
        res.json({success, authToken});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

//for authentication
router.post('/login', [
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
    // if errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({success, error: 'Invalid credentials' });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ success, error: 'Invalid credentials' });
      }
      const data = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWt_SECRET);
      success = true;
      res.json({success, authToken});
    }catch(err){
      console.error(err.message);
      res.status(500).send('Server error');
  }
})

//for getting user data
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userID = req.user.id;
    const user = await User.findById(userID).select('-password');
    res.json(user);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
}
})

module.exports = router;