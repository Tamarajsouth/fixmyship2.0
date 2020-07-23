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


  async createPost(req, res) { // this works! But needs testign with user data input!
    console.log("user params");
    console.log(req.params);
    //there are not params- I need to change the route to /post/:_id !
    console.log("first find user");
    //first find user
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      console.log("user does not exist");
      return res.status(400).json({ message: 'Something is wrong!' });
    }

    //then create post
    const myPost = await Post.create(req.body);
    if (!myPost) {
      console.log("post not created");
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    console.log("post created"); //this is not occuring!
    // console.log(myPost);

    //update mypost with the user id and save it
    const updatedPost = await Post.findOneAndUpdate({ _id: myPost._id },
      { user: user._id }
    );  //need to make sure this does not delete post...
    //check to see if I need to catch this error...
    //update user
    const updatedUser = await User.findOneAndUpdate(
      { username: req.body.username },  //find by username- ok
      { $addToSet: { posts: myPost._id } }, //adds post id... testme!
      //added null...I need a req.params.id for this to work...
      // I was able to add a specific post via hardcoded string id...
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      console.log("user not updated");
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    console.log("user updated!");
    res.json(myPost);
  },

  async getPostById(req, res) { //does this work? 
    //Seems to work without middleware, needs to be tested with middleware from front-end
    console.log(req.params._id);
    const onePost = await Post.findOne({ "_id": req.params._id });
    console.log("looking for: " + req.params._id)
    if (!onePost) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    return res.json(onePost);
  },

  async editPost(req, res) {
    console.log("edit post... not yet implemented")
    //MAKE ME WORK!!! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /*  Notes:
        this needs to recieve the post id...
        ..wait...
        updateOne... findOneAndUpdate()
        req.body.body should contain the main text that needs to be updated...
        the whole text must be sent, not just the part that is changed...
        post id must be in req.params.id
        ... need to figure out how to make this update the user as well... does the post id change?
    */

    const onePost = await Post.findByIdAndUpdate(
      { _id: req.params.id }, { $set: { body: req.body } }
    );
    if (!onePosts) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    return res.json(onePost);
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
   .then((data) => User.findOneAndUpdate({ user: "5f147c7753960423ccf2a70b" }, { $push: { posts: "5f147c7753960423ccf2a70b" } }, { new: true }))
      .then(dbUser => {
        console.log(dbUser);  //this is null right now...
        console.log("test");
      })
      .catch(err => {
        console.log("caught err");
        console.log(err);
        res.json({ message: 'Something went wrong!' });
      });
      //...this is updating the database... but mypost does not exist so err occurs...


      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedPosts: createdPost._id } },
        { new: true, runValidators: true }
      );




*/
