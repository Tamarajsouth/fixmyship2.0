import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

import "./style.css";

function PostModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                // keyboard={false}
            ></Modal>
            <h3>Title goes here</h3>
            <span>User goes here</span>
            <p>body goes here</p>


            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
        </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                    add form here

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={handleClose}>
                     {/* {postComment}>  */}
                        Post Comment
            </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default PostModal;

