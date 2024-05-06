const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    front: String,
    back: String,
});

module.exports=mongoose.model('Flashcard', flashcardSchema);
