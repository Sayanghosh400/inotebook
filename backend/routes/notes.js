const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// fetching all notes of the user
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// adding notes
router.post('/addnotes', fetchuser, [
    body('title', 'Title must be atleast 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // if errors return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Note({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savedNotes = await notes.save();

        res.json(savedNotes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// updating notes
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // find the note to update
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Not found');
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

// deleting notes
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {
        // find the note to delete
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Not found');
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json("Note has been deleted");
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;