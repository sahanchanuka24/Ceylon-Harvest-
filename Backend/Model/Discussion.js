const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    images: [{
        type: String
    }]
});

module.exports = mongoose.model('Discussion', discussionSchema); 