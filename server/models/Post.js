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
  summary: {
    type: String,
    required: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date, 
    default: Date.now //is this working?
  },
  // postedBy: {
  //   type:ObjectId,
  //   ref:"user"
  // }
  tags:[  //this could also be a single catagory instead of an array
          //not sure if this needs to be an entire collection
  {
    type: Schema.Types.ObjectId,
    ref: "Tag"
  }
],

//lastUpdatedAt : {type: Data, default: Date.now}

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;


