const express = require('express');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const { createBook, getBooks, deleteBook } = require('../controllers/bookController');

const router = express.Router();

router.use(auth);

router.post('/', upload.single('cover'), createBook);
router.get('/', getBooks);
router.delete('/:id', deleteBook);

module.exports = router;
