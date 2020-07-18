import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Card, CardColumns } from "react-bootstrap";

import UserInfoContext from "../utils/UserInfoContext";
import AuthService from "../utils/auth";
import { savePost, getAllPosts } from "../utils/API";

import "./style.css";

function SearchPosts() {
  // create state for holding returned api data
  const [searchedPosts, setSearchedPosts] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  const userData = useContext(UserInfoContext);

  // create method to search for posts and set state on form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    getAllPosts(searchInput) // Gorm changed the name to reflect waht is in API.js
      //this was "searchAllPosts"
      .then(({ data }) => {
        const postData = data.items.map((post) => ({
          // display post subject line
          postId: post.id,
          // display post username (author of post)
          authors: book.volumeInfo.authors || ["No author to display"],
          // display post body (main content of card)
          description: post.body,
        }));
        console.log(postData);

        return setSearchedPosts(postData);
      })
      .then(() => setSearchInput(""))
      .catch((err) => console.log(err));
  };

  // create function to handle saving a post to our database
  const handleSavePost = (postId) => {
    // find the post in `searchedPosts` state by the matching id
    const postToSave = searchedPosts.find((post) => post.postId === postId);

    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }

    // send the post data to our api
    savePost(ToSave, token)
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <hr></hr>
      <Card fluid className="welcome">
        <Container>
          <h1 className="welcome">
            Welcome to Fix My 'Ship, the relationship forum where real
            people give other people real advice. 
            Sink or swim...only you can decide. 
          </h1>

          {/* SEARCH POSTS FUNCTION - UTILIZE EVENTUALLY TO SEARCH BY CATEGORIES */}
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="sm"
                  placeholder="search posts by category"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="light" size="sm">
                  search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Card>

      <Container>
        {/* <h2>{searchedBooks.length ? `Viewing ${searchedBooks.length} results:` : ''}</h2> */}
        <CardColumns>
          {searchedPosts.map((post) => {
            return (
              <Card key={post.postId} border="none">
                {/* book image code - not relevent to our app but saving just in case */}
                {/* {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null} */}
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <p className="small">user: {post.authors}</p>
                  <Card.Text>
                    {/* this is where the post text body should go */}
                    {post.description}
                  </Card.Text>
                  {userData.username && (
                    <Button
                      // like post with a heart of reply
                      disabled={userData.savedPosts?.some(
                        (savedPost) => savedPost.postId === post.postId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSavePost(post.postId)}
                    >
                      {userData.savedPosts?.some(
                        (savedPost) => savedPost.PostId === post.postId
                      )
                        ? "This post has already been saved!"
                        : "Save this post!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
}

export default SearchPosts;
