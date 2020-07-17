const router = require('express').Router(); //does this create a neew router or connect with old one?
const postController = require('../../controllers/post-controller');
const requireLogin = require('../../utils/auth')
//middleware for authentication and user access to posts
const { authMiddleware } = require('../../utils/auth');
const { savePost } = require('../../controllers/post-controller');
const auth = require('../../utils/auth');
const { Router } = require('express');

const {
    getAllPosts,
    createPost,

    newPost,
    editPost,
    deletePost,
    likedPost,
    getMyPosts
    
} = require('../../controllers/post-controller');


//get all (summaries?)
router.route('/all').get(getAllPosts);
//get one

//get by user

//do we need a get saved? can probably do on frontend...

//post new
router.route('/').post(createPost);
    //

// update (put)



// ~~~~~~old
/*
router
    .route('/')
    .get(postController.testGet)
    .post()
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
*/




module.exports = router;