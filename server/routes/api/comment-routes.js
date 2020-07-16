const router = require('express').Router();

const {
   getAllComments,
  } = require('../../controllers/comment-controller');

  //middleware for credentials
  const { authMiddleware } = require('../../utils/auth');

// get all comments - test
router.route('/all').get(authMiddleware, getAllComments);
//authMiddleware,

//get comments by post id
//get comments by user id


module.exports = router;