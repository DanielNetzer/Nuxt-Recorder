const mongoose = require('mongoose');

/**
 * Sentence Schema
 */
const SentenceSchema = new mongoose.Schema({
    sentence_id: {
        type: Number,
        required: true
    },
    sentence: {
        type: String,
        required: true
    },
    corpus_id: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true,
        default: 'Undone'
    },
    url: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Sentence', SentenceSchema);