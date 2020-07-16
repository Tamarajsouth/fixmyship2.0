import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Text, Form, Card } from 'react-bootstrap';
import * as API from '../utils/API';
import AuthService from "../utils/auth";

import "./style.css";

function CreatePost() {

  const [formObject, setFormObject] = useState({})

  function handleFormSubmit(event) {
    event.preventDefault();
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    if (!token) {
      return false;
    }
    if (formObject.title && formObject.author) {
      const book = {
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      };
      API.saveBook(book, token)
        .then(res => undefined)
        .catch(err => console.log(err));
      
    }
  };
  return (
    <>
      <hr></hr>
      <Card.Body className="welcome-heading">Create a Post!</Card.Body>
      <Card.Body>
        <Card.Title className="create-post-subject-line">
          <Form.Control as="textarea" placeholder='title goes here' rows="1" />
        </Card.Title>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label></Form.Label>
          <Form.Control as="textarea" placeholder='text goes here' rows="3" />
        </Form.Group>
        <p className="choose-category-heading">choose a category to post to:</p>
        <Button className="category-btn" variant="outline-secondary">Dating</Button>{' '}
        <Button className="category-btn" variant="outline-secondary">Breaking Up</Button>{' '}
        <Button className="category-btn" variant="outline-secondary">Marriage</Button>{' '}
        <Button className="category-btn" variant="outline-secondary">LGBTQ+</Button>{' '}
        <Button className="category-btn" variant="outline-secondary">Women</Button>{' '}
        <Button className="category-btn" variant="outline-secondary">Men</Button>{' '}
        <Button className="category-btn" variant="outline-secondary">Just Friends</Button>{' '}
        <Button type="submit-btn" size="sm">
          Submit Post</Button>
      </Card.Body>
    </>
  )
}
export default CreatePost;