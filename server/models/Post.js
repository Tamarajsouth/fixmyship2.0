const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  // summary: {
  //   type: String,
  //   required: true
  // },


  // username: {
  //   type: String,
  //   required: true,
    // ref: "User"
    //remove this
  // },
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: "User"

  },
  createdAt: {
    type: Date, default: Date.now 
  }
  // postedBy: {
  //   type:ObjectId,
  //   ref:"user"
  // },
  // image: {
  //   type: String,
  //   default: "no photo"
  // },
  // tags:{
  //   type: String
  // },

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;


