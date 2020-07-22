// HOME PAGE
import React, { useContext, useEffect, useState } from 'react';
import { Jumbotron, Container, Card, Button, CardColumns } from 'react-bootstrap';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

import "./style.css";



function CommunityPosts() {
  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);

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
    if (!token) { return }
    console.log(token);
    API.getAllPosts(token) //api call to grab all posts
      .then((res) => {
        let posts = [];
        res.data.map((postData) => {
          let workingpost = { _id: postData._id, body: postData.body, summary: postData.summary, user: postData.user, createdAt: postData.createdAt, tags: postData.tags }
          posts.push(workingpost);
        });

        if (posts.length) {
          setPostArticles([...postArticles, ...posts]);

        }
        //change this to setposts
        // Line 40:5:  React Hook useEffect has a missing dependency: 'userInfo'. Either include it or remove the dependency array
      })
      //add error handling here
      .catch(err => console.log("No posts found. Please add posts to database")); //not sure if this is catching the error.
      
      const handleSavePost = (_id) => {
        // find the post in `setPosts` state by the matching id
        const postToSave = postArticles.find((post) => post._id === _id);
    
        // get token
        const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    
        if (!token) {
          return false;
        }
    
        // send the books data to our api
        savePost(postToSave, token)
          .then(() => userData.getUserData())
          .catch((err) => console.log(err));
      };
  return (
    <>
      <Jumbotron fluid className='text-dark bg-light'>
        <Container>
          <h1 className='viewing-posts'><i class="fas fa-anchor"></i>  Viewing Community Posts!  <i class="fas fa-anchor"></i></h1>
          <p className='user-instructions'> viewing all posts // or posts by category </p>
        </Container>
      </Jumbotron>
      <Container>
        <Card>
          {postArticles.map((post) => {
            return (
              <Card>
                <Card.Body className="post-card" key={post._id} border="dark">
                </Card.Body>
          <Card.Title>Title: {post.title}</Card.Title>
          <p className='username'>Posted by:{post.user}</p>
            <Card.Text>{post.body}</Card.Text>
            <Button className="heart-btn" variant="secondary" size="sm"
             disabled={userData.savedPosts?.some((savedPost) => savedPost._id === post._id)}
             className='btn-block btn-info'
             onClick={() => handleSavePost(post._id)}>
             {userData.savedPosts?.some((savedPost) => savedPost._id === post._id)
               ? 'This post has already been saved!'
               : 'Save this post!'}<i class="fas fa-heart"></i></Button>
            <Button className="comment-btn" variant="secondary" size="sm"><i className="fas fa-comment-dots"></i></Button>
          </Card>
            )
          })}
        </Card>
      </Container>
    </>
  );
}

export default CommunityPosts;
