const { Post, User } = require('../models');
const { signToken } = require('../utils/auth');
const { getSingleUser } = require('./user-controller');

// figure out how signin works...
//once this works we will add the signToken, etc
//need to figure out way to add token into the parameters...

module.exports = {
  async getAllPosts(req, res) {    // this function works now
    const allPosts = await Post.find();
    if (!allPosts) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    return res.json(allPosts);
  },

  //saveBooks function does not have middleware in the createUser post, only the put that updates the books
  async createPost( req , res) { //need to figure out how to lock this behind middleware
    console.log("testing ");
    //right here I should attempt to get user from header...
    console.log(req.user);
    //params and query are empty...
    // WHERE DOES THE USER-CONTROLLER GET THE user PARAMETER FROM!?
    // getSingleUser(); //async getSingleUser({ user = null, params }, res) {
    //try and find user or token in some manner...
    // and top function if that fails...
    // IMPLEMENT HERE
    //I will also need to update that user with the post id !

    // findOne({})  .populate('Post') .exec(function (err, user) 
    //{  if (err) return handleError(err);    });

    //const userId = params._id ... that cant be right...
    try {
      let user = User.findOne({  /* this needs to grab an id... */ })
      console.log("user:");
      // console.log(user);
    }
    catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }



    const myPost = await Post.create(req.body);

    if (!myPost) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    // const token = signToken(user);
    res.json(myPost);  // token is invalid... which means a token was sent!
  },  // this function still posts even if token is sent- needs to be configured differently to stop anon posting

  async getPostById(req, res) {
    console.log(req.params._id);
    const onePost = await Post.findOne({ "_id": req.params._id });
    console.log("looking for: " + req.params.id)
    if (!onePost) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    return res.json(onePost);
  },

  async editPost(req, res) {
    console.log("edit post... not yet implemented")
    //MAKE ME WORK!!! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const onePost = "test";
    if (!onePosts) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
  },


  // everything below this is old!  ~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // async getPost(req, res) { // make into get function

  //     // const foundPost = await Post.findOne({   //db.find...
  //     //   req.title ?
  //     // });

  //   return res.json("test");
  // },

  async newPost({ body }, res) {
    Post.create(body)
      .then(({ _id }) => User.findOneAndUpdate({}, { $push: { post: _id } }, { new: true }))
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  },



  async deletePost({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedPost: params.id } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  },

  async savePost({ user, body }, res) { // pretty sure this is not functional...
    console.log(user);
    try {
      const createdPost = await Post.create(body);
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedPosts: createdPost._id } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
};

// async getMyPosts({ user, body }, res) {
//   console.log(user); 
//   Post.findById(req.params.id)
//   .then(posts => res.json(posts))

// });
/*

// async getPostsByTag()

async testPost(req, res) {  //do I need req and res?
    const post = Post.create(
    //type stuff here!

    );
return res.json(post); //will this work?
return res.json({post}); //will this work?
}

};

// we should do routes first!

const express = require('express')// // const router = express.Router()
//POST MODELS// //
const Post = require('../../models/Post')
// GET ROUTE FOR API & POSTS// //
router.get('/', (req, res) => {// //
    Post.find()
        .sort({ date: -1 })// //
        .then(posts => res.json(posts))
})
// GET ROUTE API/POSTS/:id//
router.get('/:id', (req, res) => {// //
Post.findById(req.params.id)// //
    .then(posts => res.json(posts))// //
})
// POST ROUTE API/POSTS// //
router.post('/', (req, res) => {// //
    Post.create(req.body)// //
        .then(posts => res.json(posts))// //
})
//PUT ROUTE/ UPDATE API/POSTS/:id// //
router.put('/:id', (req, res) => {// //
    Post.findByIdAndUpdate(req.params.id, req.body)// //
        .then(posts => res.json(posts))// //
})
// DELETE ROUTE API/POSTS/:id// //
router.delete('/:id', (req, res) => {// //
    Post.findByIdAndRemove(req.params.id)// //
        .then(posts => res.json)// //
})


*/
