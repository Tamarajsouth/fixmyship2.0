import React, { useContext, useState, useEffect } from 'react';
import { Jumbotron, Container, Card, Button, CardColumns } from 'react-bootstrap';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

import "./style.css";

function UserSavedPosts() {
  const token = AuthService.loggedIn() ? AuthService.getToken() : null;
  const [posts, savedPosts] = useState([]);
  const [postArticles, setPostArticles] = useState([]); // used below
  const [userArticles, setUserArticles] = useState([]); // 

  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);
  const { username } = useContext(UserInfoContext);

  console.log("userData object --->", userData);
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

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  useEffect(() => {
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    if (!token) { return }
    console.log(token);
    API.getAllPosts(token) //api call to grab all posts and put them into "setPostArticles"
      .then((res) => {
        let posts = [];
        res.data.map((postData) => {
          let workingpost = { _id: postData._id, body: postData.body, summary: postData.summary, createdAt: postData.createdAt, tags: postData.tags, title: postData.title, username: postData.user }
          posts.push(workingpost);
        });
        API.getAllUsers()
          .then((res) => {
            let users = [];
            res.data.map((user) => {
              // console.log(user._id)
              posts.forEach((post) => {
                if (user._id === post.username) {
                  post.username = user.username
                  // console.log(post.username);
                }
              })
            })
          })
        if (posts.length) {
          console.log(posts)
          setPostArticles([...postArticles, ...posts]);
          console.log("username: " + userData._id);
          const userPosts= postArticles.filter(p => p.username === userData._id);
          

        }
      })
    .catch(err => console.log(err)); //not sure if this is catching the error.

}, []);



  console.log("now try and get users posts");
  API.getMe(token)
  .then((myData) => {
    console.log("myData");
    console.log(myData);
    console.log(myData.username);
    console.log("test");
    // setUserArticles("test");
  }
  )

return (
  <>
    <Jumbotron fluid className='viewing-liked text-light bg-light'>
      <Container>
        <h1 className="viewing-posts"><i className="fas fa-anchor"></i>  Viewing {username}'s Saved Posts!  <i className="fas fa-anchor"></i></h1>
      </Container>
    </Jumbotron>
    <Container>

      <CardColumns>
        {userData.posts.map((mypost) => {

          return (
            <Card>
              {/*  change this to map a "visibleArticles" - but after tamara gives us the last push*/}
              {postArticles.map((mypost) => {
                // if statement that makes sure only things that render are users own posts
                //oops, probably not user statement... ternary
                if(1)
                return (
                  <Card key={mypost._id}>
                    <Card.Body className="post-card" key={mypost._id} border="dark">
                    </Card.Body>

                    <Card.Title>Title: {mypost.title}</Card.Title>
                    <p className='username'>Posted by:{mypost.username}</p>
                    <Card.Text>{mypost.body}</Card.Text>

                    <br></br>
                  </Card>
                )
              })}
            </Card>
          );
        })}

      </CardColumns>
    </Container>
  </>
);
}

export default UserSavedPosts;
