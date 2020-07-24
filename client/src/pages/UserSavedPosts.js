import React, { useContext, useState } from 'react';
import { Jumbotron, Container, Card, Button, CardColumns } from 'react-bootstrap';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

import "./style.css";

function UserSavedPosts() {
  const [posts, savedPosts] = useState([]);
  const [postArticles, setPostArticles] = useState([]);
  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);
  const { username } = useContext(UserInfoContext);

  console.log("userData object --->", userData) ;
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
    <Jumbotron fluid className='viewing-liked text-light bg-light'>
        <Container>
          <h1 className="viewing-posts"><i className="fas fa-anchor"></i>  Viewing {username}'s Saved Posts!  <i className="fas fa-anchor"></i></h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2 className="no-saved-message">
          {userData.posts
            ? `Viewing ${userData.posts} saved ${userData.posts === 1 ? 'post' : 'posts'}:`
            : 'You have no saved posts!'}
        </h2>
        <CardColumns>
          {userData.posts.map((post) => {
            const {_id}  = post
            return (
              <Card key={post._id} border='dark'>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <p className='small'>Username: {post.username}</p>
                  <Card.Text>{post.body}</Card.Text>
                  <Button className='delete-saved-btn-block btn-danger' onClick={() => handleDeletePost(post._id)}>
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
