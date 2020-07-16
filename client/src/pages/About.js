import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Text, Button, Card } from 'react-bootstrap';

import "./style.css";

function About(){
return (
    <>
        <Card>
        <Card.Body className="about-card-1">
          <Card.Title className="about-site"></Card.Title>
          <Card.Text><h3 className="about-site-heading">Love, Dating, Marriage & Relation'ship Advice</h3></Card.Text>
          <p className="about-body">We would like to take the opportunity to welcome you to this forum.
          <br></br>
          <b>A relationship forum for all: heterosexual; bisexual; homosexual; LGBTQ+; everyone is welcome!</b>
          <br></br>
          We're relatively new, therefore, as we grow, we will continue to introduce new forum areas and 
          other cool additions to this love relationship forum, whether you're considering marriage, 
          or you're not sure about something in your relationship, suffering from a break up or have something 
          to get off your chest, please, we're here to listen - shout about it! There may be others in your 
          shoes that can offer some useful relationship advice..
          <br></br>
          We're all friends here, so, we encourage you to read our 
          <Link className="rules-link" as={Link} to='/rules'> rules </Link>
            carefully before registering. This advice forum is monitored and offenders will be banned.</p>
            <div className="author-info">
              Front End:<a className="author-link" href='https://github.com/Tamarajsouth'> Tamara South</a><br></br>
              Back End:<a className="author-link" href='https://github.com/childovhurin'> Megan Murphy</a> |  
              <a className="author-link" href='https://github.com/GormTheWyrm'> Geordin Soucie</a>
            </div>
        </Card.Body>
        </Card>
        </>
)
}
export default About;