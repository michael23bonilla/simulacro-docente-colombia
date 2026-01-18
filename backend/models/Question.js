const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    context: {
        type: String,
        default: ""
    },
    options: [{
        type: String,
        required: true
    }],
    answerIndex: {
        type: Number,
        required: true
    },
    explanation: {
        type: String,
        default: ""
    },
    // CNSC Specific Classifications
    component: {
        type: String,
        enum: ['functional', 'behavioral'],
        required: true,
        index: true
    },
    area: {
        type: String,
        enum: ['pedagogy', 'aptitude', 'technology', 'math', 'humanities', 'global'],
        default: 'global',
        index: true
    },
    difficulty: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
