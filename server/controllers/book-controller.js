// import book model
const { Book } = require('../models');

module.exports = {
  async getAllBooks(req, res) {
    const books = await Book.find();
    return res.json(books);
  },
  async saveBook(req, res) {
    console.log(req.body);
    try {
      const savedBook = await Book.create(req.body);
      return res.json(savedBook);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async deleteBook(req, res) {
    const deletedBook = await Book.findOneAndRemove({ _id: req.params.id });
    if (!deletedBook) {
      return res.status(404).json({ message: "Couldn't find book with this id!" });
    }
    return res.json(deletedBook);
  },
};
