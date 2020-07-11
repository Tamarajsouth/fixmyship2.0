const router = require('express').Router(); //does this create a neew router or connect with old one?
const postController = require('../../controllers/post-controller');

    //add new routes here (?)
//search post routes
router
.route('/')
.get(postController.testGet)
.post(/*something*/)
.delete(/*somethin*/)  //uncomment when written
// router.route('/test').get(testPost);



// NOTHING IMPLEMENTED BELOW HERE YET

router.route('/allpost').get()  //need a custom function that interacts with database
                                //that function will be in controller!

                                //search post ID
router
.route('/:id')
// .get(postController.findByID)
 //needs custom method

router.route('/myposts').get()
    // authMiddleware
//figure out how savedposts will work... if we can do it

//router.route('/tags/:tagName)

module.exports = router;