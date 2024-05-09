const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();

const flashcardRoutes = require('./routes/flashcardify-routes');

const app = express();
const MONGO_URI = process.env.MONGO_DB_URI;

mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.log(err);
});

app.use(cors());
app.use(express.json());

app.use('/flashcards', flashcardRoutes);    

app.get('/', (req, res) => {
  res.json({'message': 'API IS WORKING'})
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});