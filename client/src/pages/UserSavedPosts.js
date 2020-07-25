import React, { useContext, useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Card,
  Button,
  CardColumns
} from 'react-bootstrap';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

import "./style.css";

function UserSavedPosts() {
  const token = AuthService.loggedIn() ? AuthService.getToken() : null;
  // const [posts, savedPosts] = useState([]);
  const [postArticles, setPostArticles] = useState([]); // used below
  const [userArticles, setUserArticles] = useState([]); // 
  const [name, setName] = useState([]);

  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);
  const { username } = useContext(UserInfoContext);

  // console.log("userData object --->", userData);
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeletePost = (_id) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deleteUserPost(_id, token)
      // upon success, update user data to reflect book change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // console.log("now try and get users posts");
  // const MyID = API.getMe(token)
  //   .then((myData) => {
  //     // console.log("myData");
  //     // console.log(myData.data._id);
  //     // console.log(myData.username);
  //     // console.log("test");
  //     // setUserArticles("test");
  //     //do I need to set this to state?
  //     setID(myData.data._id);
  //   }
  //   )

  useEffect(() => {
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    if (!token) {
      return;
    }
    console.log(token);
    API.getAllPosts(token) //api call to grab all posts and put them into "setPostArticles"
      .then((res) => {
        let posts = [];
        let myName;
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
        API.getMe(token).then((res) => {
          console.log(res.data.username);
          console.log("works to here");
          myName = res.data.username;
          console.log("my name " + myName);
          // works to here!
          console.log(postArticles); //this is still blank here.
          setName(myName);

        })
        if (posts.length) {
          setPostArticles([...postArticles, ...posts])  //cannot use .then here
          console.log("test!");//this happens before the above async functions return.
          console.log("after:" + myName);
          //   //will be xx.username from postArticles
          //   console.log(postArticles);  //post articles does not exist yet - so it cannot be used... AAAargh!
          //   const userPosts = postArticles.filter(p => p.username === myName); // fix this!
          //   console.log(userPosts);
          //   setUserArticles(...userArticles, ...userPosts);
          //   // I need to compare my username to the posts username...
          //   console.log(userArticles);
          // })


          // NOW I JUST NEED TO COMPARE name TO postArticle[i].username
        }
      })
      //add error handling here
      .catch(err => console.log("No posts found. Please add posts to database")); //not sure if this is catching the error.
  }, []);




  

  // // console.log("now try and get users posts");
  // API.getMe(token)
  // .then((myData) => {
  //   // console.log("myData");
  //   // console.log(myData.data._id);
  //   // console.log(myData.username);
  //   // console.log("test");
  //   // setUserArticles("test");
  //   //do I need to set this to state?
  //   setID(myData.data._id);
  // }
  // )

  return (
    <>
      <Jumbotron fluid className='viewing-liked text-light bg-light'>
        <Container>
          <h1 className="viewing-posts"><i className="fas fa-anchor"></i>  Viewing {username}'s Saved Posts!  <i className="fas fa-anchor"></i></h1>
        </Container>
      </Jumbotron>
      <Container>

        <CardColumns>
          <Card>
            {/*  change this to map a "visibleArticles" - but after tamara gives us the last push*/}
            {postArticles.filter(xxx => xxx.username === name).map((mypost) => {
              // if statement that makes sure only things that render are users own posts
              //oops, probably not user statement... ternary

              return (
                <Card key={mypost._id}>
                  <Card.Body className="post-card" key={mypost._id} border="dark">
                  </Card.Body>

                  <Card.Title>Title: {mypost.title}</Card.Title>
                  <p className='username'>Posted by:{mypost.username}</p>
                  <Card.Text>{mypost.body}</Card.Text>

                  <br></br>
                </Card>
              );
            })}
          </Card>


        </CardColumns>
      </Container>
    </>
  );
}

export default UserSavedPosts;
