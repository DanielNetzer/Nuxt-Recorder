const { Router } = require('express');
const Sentence = require('../models/sentence.model');
const bodyParser = require('body-parser');
const router = Router();

const jsonParser = bodyParser.json();

/* GET sentences by user id and status. */
router.get('/sentences/:userId', function (req, res, next) {
    const userId = parseInt(req.params.userId);
    Sentence.findOne({ 'user_id': userId, 'state': 'Undone' })
        .exec((err, doc) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(doc);
            }
        });
})

router.post('/sentences', jsonParser, function (req, res, next) {
    let { state, sentenceId, userId, url } = req.body;

    sentenceId = parseInt(sentenceId);
    userId = parseInt(userId);

    Sentence.updateOne({ 'sentence_id': sentenceId, 'user_id': userId }, { $set: { 'state': state, 'url': url } })
        .exec((err, doc) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(doc);
            }
        });
})

/* GET all sentences. */
router.get('/sentences/', function (req, res, next) {
    Sentence.find({}).exec((err, docs) => {
        if (err) {
            console.error(err);
            res.status(400).json(err);
        } else {
            res.json(docs);
        }
    })
})

module.exports = router