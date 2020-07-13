import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Image, Container, Card } from 'react-bootstrap';

function About(){
return (
    <>
      <Card>
    <Card.Body>
      <Card.Text>
        <h3 className="about-header">Some quick example text to build on the card title and make up the bulk
        of the card's content.</h3>
        Frontend Wizard: Tamara South
    Backend Extraordinaire: Megan Murphy
    Backend 2: Geordin Soucie
      </Card.Text>
    </Card.Body>
  </Card>

</>
)
}
export default About;