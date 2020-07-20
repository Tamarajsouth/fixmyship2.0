import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import * as API from "../utils/API";
import AuthService from "../utils/auth";

import "./style.css";
// import { InputGroupRadio } from 'react-bootstrap/InputGroup';

function CreatePost() {
  const [formObject, setFormObject] = useState({});

   // LOAD ALL BOOKS TO STORE THEM WITH SETBOOKS
  //  useEffect(() => {
  //   loadBooks()
  // }, [])

  // // LOAD BOOK DATA
  // function loadBooks() {
  //   API.getBooks()
  //     .then(res => 
  //       setBooks(res.data)
  //     )
  //     .catch(err => console.log(err));
  // };

  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    console.log("event")
    event.preventDefault();
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    console.log("token", token)
    if (!token) {
      return false;
    }
    if (formObject.title && formObject.username) {
      const book = {
        title: formObject.title,
        body: formObject.body,
        username: formObject.username,
      };
      API.saveBook(book, token)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      API.createPost(book, token)  //where do I get this data from?
        .then((res) => console.log(res))
        .catch((err) => console.log(err));  
    }
  }
  return (
    <>
      <hr></hr>
      <Card.Body className="welcome-heading">Create a Post!</Card.Body>
      <Card.Body>
        <form>
          <Form.Control
            onChange={handleInputChange}
            name="title"
            placeholder="Title (required)"
          />
          <Form.Control
            onChange={handleInputChange}
            name="username"
            placeholder="Author (required)"
          />
          <Form.Control
            as="textarea"
            onChange={handleInputChange}
            name="body"
            placeholder="Synopsis (Optional)"
          />
        </form>
        {/* <Card.Title className="create-post-subject-line">
        <Card.Title
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
          <Form.Control as="textarea" placeholder='title goes here' rows="1" />
        </Card.Title>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label></Form.Label>
          <Form.Control as="textarea" placeholder='text goes here' rows="3" />
        </Form.Group> */}
        <p className="choose-category-heading">choose a category to post to:</p>
        <Button className="category-btn" variant="outline-secondary">
          Dating
        </Button>{" "}
        <Button className="category-btn" variant="outline-secondary">
          Breaking Up
        </Button>{" "}
        <Button className="category-btn" variant="outline-secondary">
          Marriage
        </Button>{" "}
        <Button className="category-btn" variant="outline-secondary">
          LGBTQ+
        </Button>{" "}
        <Button className="category-btn" variant="outline-secondary">
          Women
        </Button>{" "}
        <Button className="category-btn" variant="outline-secondary">
          Men
        </Button>{" "}
        <Button className="category-btn" variant="outline-secondary">
          Just Friends
        </Button>{" "}
        <button
          className="submit-btn"
          size="sm"
          // ={!(formObject.title && formObject.body && formObject.username)}
          onClick={handleFormSubmit}
        >
          Create Post
        </button>
      </Card.Body>
    </>
  );
}
export default CreatePost;
