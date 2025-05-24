// Mongoose model with validation - week 03
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+@.+\..+/,
    },
    favoriteColor: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Contact', contactSchema);