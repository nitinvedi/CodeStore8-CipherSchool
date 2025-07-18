const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  const { title, author, genre, status } = req.body;
  const cover = req.file?.filename;

  try {
    const book = await Book.create({
      user: req.user._id,
      title,
      author,
      genre,
      status,
      cover
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: 'Error creating book', error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  const { title, author, status } = req.query;
  let filter = { user: req.user._id };

  if (title) filter.title = { $regex: title, $options: 'i' };
  if (author) filter.author = { $regex: author, $options: 'i' };
  if (status) filter.status = status;

  const books = await Book.find(filter);
  res.json(books);
};

exports.deleteBook = async (req, res) => {
  const book = await Book.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Book deleted' });
};
