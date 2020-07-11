const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  body: String, //may need a longer variable type
  summary: String, //this could be a splice from the body
  posterId: String,   //this might be a int, but need to check mongoose doc
  //datecreated and lastupdated... research that because I think its automatic

//need to be able to figure out how to join this and track users own posts
//add reference later

  tags: [
    {
      type: String,
      //add relationships later
    },
  ]



});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;


// make this into posts!