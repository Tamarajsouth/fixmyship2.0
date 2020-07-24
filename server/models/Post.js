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
 
  tags: [
    {
    type: String,
    required: true
  }
],

//lastUpdatedAt : {type: Data, default: Date.now}

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;


