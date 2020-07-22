import React, { useContext, useState } from 'react';
import { Jumbotron, Container, Card, Button, CardColumns } from 'react-bootstrap';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

import "./style.css";

function UserSavedPosts() {
  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeletePost = (_id) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deleteUserPost(_id, token)
      // upon succes, update user data to reflect book change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };


  return (
    <>
    <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved posts!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedPosts
            ? `Viewing ${userData.savedPosts} saved ${userData.savedPosts === 1 ? 'post' : 'posts'}:`
            : 'You have no saved posts!'}
        </h2>
        <CardColumns>
          {userData.savedPosts.map((post) => {
            return (
              <Card key={post._id} border='dark'>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <p className='small'>Username: {post.username}</p>
                  <Card.Text>{post.body}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeletePost(post._id)}>
                    Delete this Post
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
}

export default UserSavedPosts;
