import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

import "./style.css";

function PostModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
          
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                    add form here

                </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={handleClose()}>
                        Close
            </button>
                    <button variant="primary" /* onClick={props.handleClose()} */>
                     {/* {postComment}>  */}
                        Post Comment
            </button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default PostModal;

