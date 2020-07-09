const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: []
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;


// make this into posts!