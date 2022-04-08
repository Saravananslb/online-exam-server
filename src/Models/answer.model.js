const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    createdBy: {
        type: String,
    },
    examId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    questions: {
        type: Array
    },
    points: {
        type: Number,
    }

})

module.exports = mongoose.model('answers', answerSchema);