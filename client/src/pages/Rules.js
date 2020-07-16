import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Text, Button, Card } from 'react-bootstrap';

import "./style.css";

function Rules(){
return (
    <>
        <Card>
        <Card.Body className="rules-card-1">
          <Card.Title></Card.Title>
          <Card.Text><h3 className="rules-heading">Code of Conduct</h3></Card.Text>
          <p className="rules-body">This Forum is a friendly, honest and mature place 
            where it's members can openly discuss their problems with other like-minded individuals. 
            It has been created to provide advice, have some fun and share tips. We like to consider 
            our forum as, non-judgemental, positive environment to chat about all things concerning love.
            <hr></hr>
            Cool & and now the rules! Most of these are self-explanatory, so please use your brains. :)
            <hr></hr>
            <ul className="rule-items">- No personal attacks or inflammatory behaviour</ul>
            <ul className="rule-items">- Refrain from using unnecessary swear words</ul>
            <ul className="rule-items">- Respect the privacy of other members</ul>
            <ul className="rule-items">- Respect the privacy of other members</ul>
            <ul className="rule-items">- Keep the conversation open and free for all to join in</ul>
            </p>
            </Card.Body>
        </Card>
        </>
)
}
export default Rules;