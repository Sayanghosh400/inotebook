const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI

const connectTOMongo = () => {
    mongoose.connect(mongoURI);
    console.log("Connected to Mongo");
};
module.exports = connectTOMongo;