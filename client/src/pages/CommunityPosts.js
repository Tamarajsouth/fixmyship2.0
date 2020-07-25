// HOME PAGE
import React, { useContext, useEffect, useState } from "react";
import {
  Jumbotron,
  Container,
  Card,
  Button,
  ButtonGroup,
} from "react-bootstrap";

// import context for global state
import UserInfoContext from "../utils/UserInfoContext";

import * as API from "../utils/API";
import AuthService from "../utils/auth";

import "./style.css";

function CommunityPosts() {
  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);
  const [searchedPosts, setSearchedPosts] = useState([]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  // const handleDeleteBook = (bookId) => {
  //   // get token
  //   const token = AuthService.loggedIn() ? AuthService.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }
  //   API.deleteBook(bookId, token)
  //     // upon succes, update user data to reflect book change
  //     .then(() => userData.getUserData())
  //     .catch((err) => console.log(err));
  // };

  const [postArticles, setPostArticles] = useState([]);

  useEffect(() => {
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    if (!token) {
      return;
    }
    console.log(token);
    API.getAllPosts(token) //api call to grab all posts
      .then((res) => {
        let posts = [];
        res.data.map((postData) => {
          let workingpost = {
            _id: postData._id,
            body: postData.body,
            summary: postData.summary,
            createdAt: postData.createdAt,
            tags: postData.tags,
            title: postData.title,
            username: postData.user,
          };
          posts.push(workingpost);
        });
        API.getAllUsers().then((res) => {
          let users = [];
          res.data.map((user) => {
            console.log(user._id);
            posts.forEach((post) => {
              if (user._id === post.username) {
                post.username = user.username;
                console.log(post.username);
              }
            });
          });
        });
        if (posts.length) {
          console.log(posts);
          setPostArticles([...postArticles, ...posts]);
        }
      })
      //add error handling here
      .catch((err) =>
        console.log("No posts found. Please add posts to database")
      ); //not sure if this is catching the error.
  }, []);

  console.log(postArticles);
  // SAVE POSTS "LIKE POSTS" BY CLICKING HEART BUTTON
  // -------------------------------------
  const handleSavePost = (_id) => {
    const postToSave = postArticles.find((post) => post._id === _id);
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    console.log("postToSave --->_", postToSave, token);
    console.log(postToSave._id);
    if (!token) {
      return false;
    }
    console.log(postToSave._id);
    API.saveUserPost(postToSave._id, token)
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Jumbotron fluid className="text-dark bg-light">
        <Container>
          <h1 className="viewing-posts">
            <i className="fas fa-anchor"></i> Viewing Community Posts!{" "}
            <i className="fas fa-anchor"></i>
          </h1>
          <p className="user-instructions"> viewing all posts </p>
        </Container>
      </Jumbotron>
      <Container>
        <Card>
          {postArticles.map((post) => {
            console.log("THIS IS THE POST!! --> ", post);
            const { _id } = post;
            return (
              <Card key={_id}>
                <Card.Body
                  className="post-card"
                  key={post._id}
                  border="dark"
                ></Card.Body>

                <Card.Title>Title: {post.title}</Card.Title>
                <p className="username">Posted by:{post.username}</p>
                <Card.Text>{post.body}</Card.Text>
                <ButtonGroup className="btn-group">
                  <Button
                    disabled={userData.savedPosts?.some(
                      (savedPost) => savedPost._id === post._id
                    )}
                    className="heart-btn btn-block btn-info"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleSavePost(post._id)}
                  >
                    {userData.savedPosts?.some(
                      (savedPost) => savedPost._id === post._id
                    )
                      ? "This post has already been saved!"
                      : "Save this post!"}
                    {/* // className="heart-btn" variant="secondary" size="sm" onClick={()=> handleSavePost}> */}
                    {/* //   <i class="fas fa-heart"></i> */}
                  </Button>
                  <Button className="comment-btn" variant="secondary" size="sm">
                    <i className="fas fa-comment-dots"></i>
                  </Button>
                </ButtonGroup>
                <br></br>
              </Card>
            );
          })}
        </Card>
      </Container>
    </>
  );
}

export default CommunityPosts;
