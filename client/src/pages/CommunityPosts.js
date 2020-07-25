// HOME PAGE
import React, { useContext, useEffect, useState } from 'react';
import { Jumbotron, Container, Card, Button, ButtonGroup, CardColumns, Modal } from 'react-bootstrap';
import PostModal from '../components/PostModal'
import CommentDiv from '../components/CommentDiv'
// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

import "./style.css";

function CommunityPosts() {
  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);
  const [searchedPosts, setSearchedPosts] = useState([]);


  //for comment modal
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = (bookId) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deleteBook(bookId, token)
      // upon succes, update user data to reflect book change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  console.log(searchedPosts);

// SAVE POSTS "LIKE POSTS" BY CLICKING HEART BUTTON
// -------------------------------------
    const handleSavePost = (_id) => {
  
    const postToSave = searchedPosts.find((post) => post._id === "5f1b7147ad24cb2748128c9c");
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    console.log('handleSavePostId --->_', _id)
    if (!token) {
      return false;
    }

    API.saveUserPost(postToSave, token)
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };


  const [postArticles, setPostArticles] = useState([]);
  const [commentArray, setcommentArray] = useState([]);

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
          res.data.map((user) => {console.log(user._id) 
            posts.forEach((post) => {
              if (user._id === post.username){
                post.username = user.username
                console.log(post.username);
              }
            })
           })
        })
        if (posts.length) {
          console.log(posts)
          setPostArticles([...postArticles, ...posts]);
        }
      })
      //add error handling here
      .catch(err => console.log("No posts found. Please add posts to database")); //not sure if this is catching the error.

      API.getAllComments(token) //api call to grab all posts and put them into "setPostArticles"
      .then((res) => {
        let comments = [];
        res.data.map((commentData) => {
          let workingComment = { _id: commentData._id, body: commentData.body, createdAt: commentData.createdAt, user: commentData.user }
          //need to remove "mainText from comment model"
          comments.push(workingComment);
          console.log(workingComment);
        });

        if (comments.length) {
          setcommentArray([...commentArray, ...comments]);
          console.log("comment array");
          console.log(commentArray);  //this is not showing up!
        }
        //change this to setposts
        // Line 40:5:  React Hook useEffect has a missing dependency: 'userInfo'. Either include it or remove the dependency array
      })
      //add error handling here
      .catch(err => console.log("No commentts found.")); //not sure if this is catching the error.




  }, []);

  function testFunction() {
    console.log("test");
    // handleClose();
  }

  //modal function:
  function openComment() {
    console.log("modal should open");
    // setShow(true);  //sets show to true so modal opens...
    //need to set to false on close
// handleShow(); //setting state resets app so it immediately renders without modal...
    // return(
    //do not need to return- instead put the modal under the button...
    // <PostModal 
    // xxx = yyy
    // show={show}
    // handleClose={testFunction}
    // handlePostComment={testFunction}


    // />
    // )
  }

  return (
    <>
      <Jumbotron fluid className='text-dark bg-light'>
        <Container>
          <h1 className='viewing-posts'><i className="fas fa-anchor"></i>  Viewing Community Posts!  <i className="fas fa-anchor"></i></h1>
          <p className='user-instructions'> viewing all posts </p>
        </Container>
      </Jumbotron>
      <Container>
        <Card>
          {/*  change this to map a "visibleArticles" - but after tamara gives us the last push*/}
          {postArticles.map((post) => { 
            // console.log('THIS IS THE POST!! --> ', post)
            const { _id } = post
            return (
              <Card key={_id}>
                <Card.Body className="post-card" key={post._id} border="dark">
                </Card.Body>

          <Card.Title>Title: {post.title}</Card.Title>
          <p className='username'>Posted by:{post.username}</p>
            <Card.Text>{post.body}</Card.Text>
              <ButtonGroup className="btn-group">
            <Button 
            disabled={userData.savedPosts?.some((savedPost) => savedPost._id === post._id)}
            className='heart-btn btn-block btn-info'
            variant="secondary" size="sm"
            onClick={() => handleSavePost(post._id)}>
            {userData.savedPosts?.some((savedPost) => savedPost._id === post._id)
              ? 'This pook has already been saved!'
              : 'Save this post!'}
            {/* // className="heart-btn" variant="secondary" size="sm" onClick={()=> handleSavePost}> */}
            {/* //   <i class="fas fa-heart"></i> */}
              </Button>
            <Button className="comment-btn" variant="secondary" size="sm"><i className="fas fa-comment-dots"></i>
            </Button>
            </ButtonGroup>
            <br></br>
          </Card>
            )
          })}
        </Card>
      </Container>
    </>
  );
}

export default CommunityPosts;
