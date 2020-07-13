import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, Card, Image, Col } from 'react-bootstrap';
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
          <Image className="logo1" src={require("./assets/img/logo1.png")}/></Col>
        <Container>
          <Navbar className="nav-main" as={Link} to='/'>
            Fix My 'Ship
          </Navbar>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              {/* <Nav.Link as={Link} to='/'>
                profile
              </Nav.Link> */}
              {/* if user is logged in show saved books and logout */}
              {username ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    view {username}'s profile
                  </Nav.Link>
                  <Nav.Link onClick={AuthService.logout}>logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>login | sign up</Nav.Link>
              )}
            </Nav>
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
        <Navbar className="about-footer" as={Link} to='/about'>
        <i class="fas fa-info-circle"></i>
          </Navbar>
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
