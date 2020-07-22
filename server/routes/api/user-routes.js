const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getSingleUser,
  saveBook,    //new
  deleteBook,   //new
  login,
  saveUserPost,
  deleteUserPost
  

} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').get(getAllUsers).post(createUser).put(authMiddleware, saveBook);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:username').get(getSingleUser);

router.route('/books/:id').delete(authMiddleware, deleteBook);

//save id to savedPosts in user
// router.route('/posts/:id').put(authMiddleware, saveUserPost);

router.route('/saved/add/:id').put(authMiddleware, saveUserPost);

router.route('/saved/remove/:id').put(authMiddleware, deleteUserPost);

module.exports = router;

