const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    duration: {
        type: String,
        required: true
    },
    userId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    questions: {
        type: Array
    }
});

module.exports = mongoose.model('questions', questionSchema);