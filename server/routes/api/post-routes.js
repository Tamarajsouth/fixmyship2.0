const router = require('express').Router(); //does this create a neew router or connect with old one?
const postController = require('../../controllers/post-controller');
const requireLogin = require('../../utils/auth')
//middleware for authentication and user access to posts
const { authMiddleware } = require('../../utils/auth');
const { savePost } = require('../../controllers/post-controller');
const auth = require('../../utils/auth');
const { Router } = require('express');

const {
    newPost,
    editPost,
    deletePost,
    likedPost,
    getMyPosts,
    getAllPosts
} = require('../../controllers/post-controller');

router
    .route('/')
    .get(postController.testGet)
    .post(/*something*/)
    .delete()
// router.route('/test').get(testPost);

//CREATE NEW POST
router.route('/newpost').post(authMiddleware, newPost);

//EDIT EXISITING POST
router.route('/editpost/:id').post(editPost).put(authMiddleware, savePost);

//DELETE POST
router.route('/deletepost/:id').delete(authMiddleware, deletePost);

//GET SINGLE USER POSTS
// router.route('/myposts').get(authMiddleware, getMyPosts);



// router.route('/allpost').get(getAllPosts).put(authMiddleware, savePost);  //need a custom function that interacts with database
//that function will be in controller!
//search post ID
// router.route('/:id').get(getSingleUser);
// .get(postController.findByID)
//needs custom method

// authMiddleware
//figure out how savedposts will work... if we can do it

// router.route('/tags/:tagName)



module.exports = router;