const router = require('express').Router();
const { getAllBooks, saveBook, deleteBook } = require('../../controllers/book-controller');

// for GET and POST /api/books
router.route('/').get(getAllBooks).post(saveBook);

// for DELETE /api/books/:id
router.route('/:id').delete(deleteBook);

module.exports = router;
