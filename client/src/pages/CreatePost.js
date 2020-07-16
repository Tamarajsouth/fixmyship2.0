import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Text, Form, Card } from 'react-bootstrap';

import "./style.css";

function CreatePost(){
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
            <p className="choose-category-heading">Select a category to post to:</p>
            <div className="btn-group">
            <Button className="category-btn" variant="outline-secondary">Dating</Button>{' '}
            <Button className="category-btn" variant="outline-secondary">Breaking Up</Button>{' '}
            <Button className="category-btn" variant="outline-secondary">Marriage</Button>{' '}
            <Button className="category-btn" variant="outline-secondary">LGBTQ+</Button>{' '}
            <Button className="category-btn" variant="outline-secondary">Women</Button>{' '}
            <Button className="category-btn" variant="outline-secondary">Men</Button>{' '}
            <Button className="category-btn" variant="outline-secondary">Just Friends</Button>{' '}
            </div>
            <hr></hr>
            <div className="submit-btn">
            <Button className="submit-btn" variant="outline-secondary">Submit Post</Button>{' '}
            </div>
        </Card.Body>
</>
)
}
export default CreatePost;
