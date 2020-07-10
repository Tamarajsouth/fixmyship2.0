const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  body: String, //may need a longer variable type
  summary: String, //this could be a splice from the body
  authorId: String,   //this might be a int, but need to check mongoose doc

  tags: [
    {
      type: String,

    },
  ]



});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;


// make this into posts!