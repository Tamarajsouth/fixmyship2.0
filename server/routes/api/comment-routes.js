const router = require('express').Router();

const {
    getAllComments,
    getCommentsByUser,
    //    getComentsByPost
} = require('../../controllers/comment-controller');

//middleware for credentials
const { authMiddleware } = require('../../utils/auth');

// get all comments 
router.route('/all').get(authMiddleware, getAllComments);


//get comments by user id
router.route('/user/:userId').get(getCommentsByUser);  // authMiddleware,  add this back in!
//... need to figure out if I can just use username...

//get comments by post id
// router.route('/post/:postId').get(authMiddleware, getCommentsByUser);

//post comment by post id
// router.route('/post/:postId').get(authMiddleware, postComment);

//put (edit) comment by post id
// router.route('/post/:postId').get(authMiddleware, editComment);

module.exports = router;