import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Modal, Tab, Card, Image, Col } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';

import "./style.css";

function AppNavbar() {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  // get username out of context object to display in nav
  const { username } = useContext(UserInfoContext);

  return (
    <>
      <Navbar bg='light' variant='light' expand='lg'>
      <Col>
          <Image className="logo1" src={require("./assets/img/logo1.png")} /></Col>
        <Container>
          <Navbar className="nav-main" as={Link} to='/'>
            Fix My 'Ship
          </Navbar>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              {username ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    view {username}'s profile
                  </Nav.Link>
                  <Nav.Link onClick={AuthService.logout}>logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login | Sign Up</Nav.Link>
              )}
            </Nav>
            <Nav className="mr-right">
      <NavDropdown title="Search" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Dates</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Marriage</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Break Ups</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">LGBTQ+</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Women</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Men</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Just Friends</NavDropdown.Item>
        <NavDropdown.Item className="CommunityPosts" as={Link} to='/CommunityPosts'>View All</NavDropdown.Item>
      </NavDropdown>
    </Nav>
            <Navbar className="about-link" as={Link} to='/about'>
                <i className="fas fa-info-circle"></i></Navbar>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal size='lg' show={showModal} onHide={() => setShowModal(false)} aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>sign up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
      <Card className='footer mt-auto py-3 bg-light text-white'>
        <div className='container'>
          <div className="line line-1">
        <div className="wave wave1"></div>
      </div>
      <div className="line line-2">
        <div className="wave wave2"></div>
      </div>
      <div className="line line-3">
        <div className="wave wave3">
        </div>
      </div>
    </div>
      </Card>
    </>
  );
}

export default AppNavbar;
