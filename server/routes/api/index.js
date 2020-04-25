const router = require('express').Router();
const bookRoutes = require('./book-routes');

router.use('/books', bookRoutes);

module.exports = router;
