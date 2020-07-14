import React, { useContext } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

function SavedPosts() {
  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);

  // create function that accepts the posts's mongo _id value as param and deletes the post from the database
  const handleDeletePost = (postId) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deletePost(postId, token)
      // upon succes, update user data to reflect post change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-light'>
        <Container>
          <h1>Viewing liked posts!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedPosts.length
            ? `Viewing ${userData.savedPosts.length} liked ${userData.savedPosts.length === 1 ? 'post' : 'posts'}:`
            : 'You have no liked posts!'}
        </h2>
        <CardColumns>
          {userData.savedPosts.map((post) => {
            return (
              <Card key={post.postId} border='dark'>
                {/* {post.image ? <Card.Img src={post.image} alt={`The cover for ${book.title}`} variant='top' /> : null} */}
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  {/* <p className='small'>Authors: {book.authors}</p> */}
                  <Card.Text>{post.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeletePost(post.postId)}>
                    unlike this post!
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

export default SavedPosts;


