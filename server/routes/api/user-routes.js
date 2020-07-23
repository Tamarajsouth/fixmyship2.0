const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getSingleUser,
  saveBook,    
  deleteBook,   
  login,
  saveUserPost,
  deleteUserPost,
  saveMyPost
  

} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').get(getAllUsers).post(createUser).put(authMiddleware, saveBook);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:username').get(getSingleUser);

// router.route('/books/:id').delete(authMiddleware, deleteBook);

//save id to savedPosts in user
// router.route('/posts/:id').put(authMiddleware, saveMyPost);

router.route('/saved/add/:id').get(authMiddleware, saveUserPost);
// authMiddleware,

router.route('/saved/remove/:id').get(authMiddleware, deleteUserPost);

router.route('/all').get(authMiddleware, getAllUsers);

module.exports = router;

