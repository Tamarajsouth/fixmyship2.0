const router = require('express').Router();

const {
    getAllComments,
    getCommentsByUser,
    getCommentsByPost,
    postComment
    //    getComentsByPost
} = require('../../controllers/comment-controller');

//middleware for credentials
const { authMiddleware } = require('../../utils/auth');


// authMiddleware, 

// get all comments 
router.route('/all').get(getAllComments);


//get comments by user id
router.route('/user/:_id').get(getCommentsByUser);  // authMiddleware,  add this back in!
//... need to figure out if I can just use username...

//get comments by post id
router.route('/post/:_id').get(getCommentsByPost);

//post comment by post id
router.route('/').get(postComment);

//put (edit) comment by post id
// router.route('/post/:postId').get(authMiddleware, editComment);

module.exports = router;