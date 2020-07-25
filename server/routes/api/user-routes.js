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
  saveMyPost,
  

} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');
console.log("RUNNNNNNNNNNNN!!!!")

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').get(getAllUsers).post(createUser).put(authMiddleware, saveBook);
//can I use the above to get a list of the users or will it cause issues?

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:username').get(getSingleUser);

router.route('/post').get(authMiddleware, saveUserPost);
// authMiddleware,
// remove does not work
// router.route('/saved/remove/:id').get(authMiddleware, deleteUserPost);

// router.route('/all').get(authMiddleware, getAllUsers);

module.exports = router;

