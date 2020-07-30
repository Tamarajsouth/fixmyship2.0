// HOME PAGE
import React, { useContext, useEffect, useState } from 'react';
import { Jumbotron, Container, Col, Row, Card, Button, ButtonGroup, CardColumns, Modal } from 'react-bootstrap';
import PostModal from '../components/PostModal'
import CommentDiv from '../components/CommentDiv'
// import context for global state
import UserInfoContext from "../utils/UserInfoContext";

import * as API from "../utils/API";
import AuthService from "../utils/auth";

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

  const [postArticles, setPostArticles] = useState([]);
  const [commentArray, setcommentArray] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [sort, setSort] = useState(["no posts: click on a category to view posts"]); //this sets the description of the posts the user is viewing
  const [visibleArticles, setVisibleArticles] = useState([]);

  useEffect(() => {
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    if (!token) {
      return;
    }
    console.log(token);
    API.getAllPosts(token) //api call to grab all posts and put them into "setPostArticles"
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
            // console.log(user._id);
            posts.forEach((post) => {
              if (user._id === post.username) {
                post.username = user.username;
                // console.log(post.username);
              }
            });
          });
        });
        if (posts.length) {
          // console.log(posts);
          setPostArticles([...postArticles, ...posts]);
        }
      })
      //add error handling here
      .catch(err => console.log("No posts found. Please add posts to database")); //not sure if this is catching the error.

    API.getAllComments(token) //api call to grab all comments and put them into "commentArray"
      .then((res) => {
        let comments = [];
        res.data.map((commentData) => {
          let workingComment = { _id: commentData._id, body: commentData.body, createdAt: commentData.createdAt, user: commentData.user }
          //need to remove "mainText from comment model"
          comments.push(workingComment);
          // console.log(workingComment);
        });

        if (comments.length) {
          setcommentArray([...commentArray, ...comments]);
        }
        //change this to setposts
        // Line 40:5:  React Hook useEffect has a missing dependency: 'userInfo'. Either include it or remove the dependency array
      })
      //add error handling here
      .catch(err => console.log("No commentts found.")); //not sure if this is catching the error.

  }, []); //end useEffect




  function openComment(myid) {
    // const openComment = () => {
    //prevent default?
    console.log("modal should open");
    console.log(myid)
    //post._id needs to get passed in to this funciton somehow
    const sortedComments = commentArray.filter(c => c.post === myid);
    setFilteredComments(commentArray.contains)
  }

  function sortAll() {
    setSort("all posts");
    setVisibleArticles([...postArticles]);
  }
  function sortByDating() {
    setSort("dating posts");
    const sortedPosts = postArticles.filter(x => x.tags.includes("dating"));
    console.log(sortedPosts);
    setVisibleArticles([...sortedPosts]);
  }
  function sortByBreakup() {
    setSort("breakup posts");
    const sortedPosts = postArticles.filter(x => x.tags.includes("breakingup"));
    setVisibleArticles([...sortedPosts]);
  }
  function sortByMarriage() {
    const sortedPosts = postArticles.filter(x => x.tags.includes("marriage"));
    setSort("marriage posts");
    setVisibleArticles([...sortedPosts]);
  }
  function sortBylgbtq() {
    const sortedPosts = postArticles.filter(x => x.tags.includes("lgbtq"));
    setSort("LGBTQ+ posts");
    setVisibleArticles([...sortedPosts]);
  }
  function sortByWomen() {
    const sortedPosts = postArticles.filter(x => x.tags.includes("women"));
    setSort("women posts");
    setVisibleArticles([...sortedPosts]);
  }
  function sortByMen() {
    setSort("men posts");
    const sortedPosts = postArticles.filter(x => x.tags.includes("men"));
    setVisibleArticles([...sortedPosts]);
  }
  function sortByJustFriends() {
    const sortedPosts = postArticles.filter(x => x.tags.includes("justfriends"));
    setSort("just friends posts");
    setVisibleArticles([...sortedPosts]);
    console.log(commentArray);
  }


  function noComments() {
    console.log("Comments are not yet implemented");
  }



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
        {/* <Container> */}
        <h1 className='viewing-posts'><i className="fas fa-anchor"></i>  Viewing Community Posts!  <i className="fas fa-anchor"></i></h1>
        <p className='user-instructions'> viewing all posts </p>
        <ButtonGroup className="cat-btn-group">
          <Row noGutters={true}>
            <Col md={12}>
              <button className="cat-btn" onClick={sortAll}>View All</button>
              <button className="cat-btn" onClick={sortByDating}>Dating</button>
              <button className="cat-btn" onClick={sortByBreakup}>Breakup</button>
              <button className="cat-btn" onClick={sortByMarriage}>Marriage</button>
              <button className="cat-btn" onClick={sortBylgbtq}>LGBTQ+</button>
              <button className="cat-btn" onClick={sortByWomen}>Women</button>
              <button className="cat-btn" onClick={sortByMen}>Men</button>
              <button className="cat-btn" onClick={sortByJustFriends}>Just Friends</button>
            </Col>
          </Row>
        </ButtonGroup>



        {/* </Container> */}
      </Jumbotron>
      {/* <Container> */}
      <Card>
        {/*  change this to map a "visibleArticles" - but after tamara gives us the last push*/}
        {visibleArticles.map((post) => {
          // console.log('THIS IS THE POST!! --> ', post)
          const { _id } = post
          return (
            <>
              <Card key={post._id}>
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
                    onClick={() => noComments()}>
                    {userData.savedPosts?.some((savedPost) => savedPost._id === post._id)
                      ? 'This pook has already been saved!'
                      : 'Save this post!'}
                    {/* // className="heart-btn" variant="secondary" size="sm" onClick={()=> handleSavePost}> */}
                    {/* //   <i class="fas fa-heart"></i> */}
                  </Button>
                  <Button className="comment-btn" variant="secondary" size="sm" onClick={() => noComments()}><i className="fas fa-comment-dots"></i>
                  </Button>
                </ButtonGroup>
                <br></br>
              </Card>

              {/* THIS IS COMMENTS

                {filteredComments.map((thisComment) => {
                  return (
                    <Card key={thisComment._id}> 
                      <Card.Body className="post-card" border="dark">
                      </Card.Body>
                      <p className='username'>Posted by:{post.username}</p>
                      <Card.Text>{thisComment.body}</Card.Text>


                      <br></br>

                    </Card>
 

                  )
                })}
              */}
            </>

          );
        })}
      </Card>
      {/* </Container> */}
    </>
  );
}

export default CommunityPosts;
