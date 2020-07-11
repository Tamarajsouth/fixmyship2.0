// // import user model
// const { Post } = require('../models/Post');
// // import sign token function from auth
// const { signToken } = require('../utils/auth');

// module.exports = {
//   // get all users
//   async getAllPosts(req, res) {
//     const posts = await Post.find();
//     return res.json(users);
//   },
//   // get a single post by tags?
// //   async getSinglePost({ user = null, params }, res) {
// //     const foundPost = await Post.findOne({
// //       $or: [{ _id: post ? post._id : params.id }, { post: params.post }],
// //     });

// //     if (!foundPost) {
// //       return res.status(400).json({ message: 'Cannot find a post with this tag!' });
// //     }

// //     res.json(foundPost);
// //   },
//   // create a post, sign a token, and send it back (to client/src/components/SignUpForm.js)
//   async createPost({ body }, res) {
//     const Post = await Post.create(body);

//     if (!post) {
//       return res.status(400).json({ message: 'Something is wrong!' });
//     }
//     const token = signToken(post);
//     res.json({ token, post });
//   },
//   // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
//   // {body} is destructured req.body
// //   async login({ body }, res) {
// //     const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
// //     if (!user) {
// //       return res.status(400).json({ message: "Can't find this post" });
// //     }

// //     const correctPw = await user.isCorrectPassword(body.password);

// //     if (!correctPw) {
// //       return res.status(400).json({ message: 'Wrong password!' });
// //     }
// //     const token = signToken(user);
// //     res.json({ token, user });
// //   },
//   // save a post to a user's `savedBooks = profile?` field by adding it to the set (to prevent duplicates)
//   // post comes from `req.post` created in the auth middleware function
//   async savePost({ user, body }, res) {
//     console.log(user);
//     try {
//       const updatedPost = await Post.findOneAndUpdate(
//         { _id: post._id },
//         { $addToSet: { savedPosts: body } },
//         { new: true, runValidators: true }
//       );
//       return res.json(updatedPost);
//     } catch (err) {
//       console.log(err);
//       return res.status(400).json(err);
//     }
//   },
//   // remove a post from `savedBooks = profile?`
//   async deletePost({ user, params }, res) {
//     const updatedPost = await User.findOneAndUpdate(
//       { _id: post._id },
//       { $pull: { savedPosts: { postId: params.id } } },
//       { new: true }
//     );
//     if (!updatedUser) {
//       return res.status(404).json({ message: "Couldn't find post with this tag!" });
//     }
//     return res.json(updatedPost);
//   },
// };




// // const express = require('express')
// // const router = express.Router()

// // //POST MODELS
// // const Post = require('../../models/Post')

// // // GET ROUTE FOR API & POSTS
// // router.get('/', (req, res) => {
// //     Post.find()
// //         .sort({ date: -1 })
// //         .then(posts => res.json(posts))
// // })

// // // GET ROUTE API/POSTS/:id
// // router.get('/:id', (req, res) => {
// //     Post.findById(req.params.id)
// //         .then(posts => res.json(posts))
// // })

// // // POST ROUTE API/POSTS
// // router.post('/', (req, res) => {
// //     Post.create(req.body)
// //         .then(posts => res.json(posts))
// //     })

// // //PUT ROUTE/ UPDATE API/POSTS/:id
// // router.put('/:id', (req, res) => {
// //     Post.findByIdAndUpdate(req.params.id, req.body)
// //         .then(posts => res.json(posts))
// // })

// // // DELETE ROUTE API/POSTS/:id
// // router.delete('/:id', (req, res) => {
// //     Post.findByIdAndRemove(req.params.id)
// //         .then(posts => res.json)
// // })

// module.exports = router;