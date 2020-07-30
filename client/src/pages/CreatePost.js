import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Form, Card, ButtonGroup } from "react-bootstrap";
import * as API from "../utils/API";
import AuthService from "../utils/auth";
import UserInfoContext from "../utils/UserInfoContext";
import PropTypes from 'prop-types';

import "./style.css";
// import { InputGroupRadio } from 'react-bootstrap/InputGroup';

function CreatePost() {
  const [redirect, setRedirect] = useState(false);
  const [formObject, setFormObject] = useState({
    dating: false, 
    breakingup: false,
    marriage: false,
    lgbtq: false,
    women: false,
    men: false,
    justfriends: false,
  });
  const userData = useContext(UserInfoContext);

  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    setFormObject({ ...formObject, [name]: value });
  }

  function handleCheckBoxInputChange(event) {
    const { name, checked } = event.target;
    console.log(name, checked)
    setFormObject({ ...formObject, [name]: checked })
  }

  function handleFormSubmit(event) {
    console.log("event")
    event.preventDefault();
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    console.log("token", token)

    if (!token) {
      return false;
    }
    if (formObject.title && formObject.body) {
      const tags = [
        {
          name:"dating",
          isSelected: formObject.dating
        },

        {
          name:"breakingup",
          isSelected: formObject.breakingup
        },

        {
          name:"marriage",
          isSelected: formObject.marriage
        },

        {
          name:"lgbtq",
          isSelected: formObject.lgbtq
        },

        {
          name:"women",
          isSelected: formObject.women
        },

        {
          name:"men",
          isSelected: formObject.men
        },

        {
          name:"justfriends",
          isSelected: formObject.justfriends
        }

      ]

      const selectedTags= tags.filter(tag => {
        return tag.isSelected
      })
      
      const post = {
        title: formObject.title,
        body: formObject.body,
        // username: formObject.username,  
        username: userData.username, 
        tags: selectedTags.map(tag => tag.name)
      };
      
      API.createPost(post, token)  //where do I get this data from?
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setRedirect(true);
    }
  }

  return (
    <div style= { {overflow: "auto" }}>
      {/* loggedIn needs to be replaced with redirect...from state */}
      {redirect ? <Redirect to="/communityposts" /> : <p></p>}
      <hr></hr>
      <Card.Body className="welcome-heading">Create a Post!</Card.Body>
      <Card.Body>
        <form>
          <Form.Control
            className="create-post-form"
            onChange={handleInputChange}
            name="title"
            placeholder="Title"
          />
          <Form.Control
            className="checkbox"
            as="textarea"
            onChange={handleInputChange}
            name="body"
            placeholder="Synopsis"
          />

          <Form.Check className="checkbox" type="checkbox" name="dating" onClick={handleCheckBoxInputChange} checked={formObject.dating} label="Dating" />
          <Form.Check className="checkbox" type="checkbox" name="breakingup" onClick={handleCheckBoxInputChange} checked={formObject.breakingup} label="Breaking Up" />
          <Form.Check className="checkbox" type="checkbox" name="marriage" onClick={handleCheckBoxInputChange} checked={formObject.marriage} label="Marriage" label="Marriage" />
          <Form.Check className="checkbox" type="checkbox" name="lgbtq" onClick={handleCheckBoxInputChange} checked={formObject.lgbtq} label="LGBTQ+" label="LGBTQ+" />
          <Form.Check className="checkbox" type="checkbox" name="women" onClick={handleCheckBoxInputChange} checked={formObject.women} label="Women" label="Women" />
          <Form.Check className="checkbox" type="checkbox" name="men" onClick={handleCheckBoxInputChange} checked={formObject.men} label="Men" label="Men" />
          <Form.Check className="checkbox" type="checkbox" name="justfriends" onClick={handleCheckBoxInputChange} checked={formObject.justfriends} label="Just Friends" label="Just Friends" />
        </form>


        <p className="choose-category-heading">choose a category to post to:</p>
          <ButtonGroup className="submit-btn-group">
        <button
          className="submit-btn"
          size="sm"
          onClick={handleFormSubmit}
        >
          Create Post
        </button>
        </ButtonGroup>
      </Card.Body>
    </div>
  );
};

export default CreatePost;

