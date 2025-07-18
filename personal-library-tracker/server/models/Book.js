const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  author: String,
  genre: String,
  status: { type: String, enum: ['To Read', 'Reading', 'Read'], default: 'To Read' },
  cover: String
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
