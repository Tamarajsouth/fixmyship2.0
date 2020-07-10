const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getSingleUser,
  saveBook,    //new
  deleteBook,   //new
  login,
} = require('../../controllers/user-controller');


// const {
// savePost,    //new
// deletePost,   //new
// editPost,   //new
// } = require('../../controllers/post-controller');


// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').get(getAllUsers).post(createUser).put(authMiddleware, saveBook);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:username').get(getSingleUser);

router.route('/books/:id').delete(authMiddleware, deleteBook);

//add new routes here (?)

//router.route('/tags/:tagName)

module.exports = router;


//consider whether we should create a new file called "blogpost-routes"