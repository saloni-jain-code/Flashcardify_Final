const express = require('express');
const mongoose = require('mongoose');
const Flashcard = require('../models/flashcard');

const router = express.Router();

// GET
router.get('/', (req, res) => {
    Flashcard.find().exec()
        .then((flashcards) => {
            res.status(200).json(flashcards);
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

// in learn mode, i want to get an individual flashcard by id
router.get('/:id', (req, res) => {
    Flashcard.findById(req.params.id)
        .then((flashcard) => {
            res.json(flashcard);
        })
        .catch((err) => {
            res.json(err);
        });
});

// POST 
router.post('/', (req, res) => {
    const flashcard = new Flashcard({
        _id: new mongoose.Types.ObjectId(),
        front: req.body.front,
        back: req.body.back
    });

    flashcard.save()
        .then((result) => {
            res.status(201).json({
                message: 'Flashcard created successfully',
                createdFlashcard: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


// PATCH 
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    Flashcard.updateOne({_id: id}, {$set: req.body})
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        }); 
});

// DELETE
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Flashcard.deleteOne({_id: id})
        .exec()
        .then((result) => {
            res.status(200).json(result);
        }) 
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
