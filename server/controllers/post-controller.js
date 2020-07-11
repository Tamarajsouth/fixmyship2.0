const {Post} = require('../models');
// figure out how signin works...
//once this works we will add the signToken, etc


module.exports = {
  async testGet(req, res) {
    console.log("Hello Server")
    // const posts = await Post.find();
    // return res.json(post);
       //nothing in db...
    





  },

// everything below this




















    async getPost(req, res) { // make into get function

      // const foundPost = await Post.findOne({   //db.find...
      //   req.title ?
      // });

    return res.json("test");
  },

  async editPost(req, res) {  //  not sure how this will work? -put
    return res.json("test");
  },

  async savePost(req, res) {  // not sure how this will work -post
    return res.json("test");
  }

};

/*
 // create a post, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createPost({ body }, res) {
    const post = await Post.create(body);
    if (!post) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    // const token = signToken(post);
    // res.json({ token, post });
    res.json({ post });
  },



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
