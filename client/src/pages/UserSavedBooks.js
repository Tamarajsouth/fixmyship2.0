import React, { useContext } from 'react';
import { Jumbotron, Container, Card, Button } from 'react-bootstrap';

// import context for global state
import UserInfoContext from '../utils/UserInfoContext';

import * as API from '../utils/API';
import AuthService from '../utils/auth';

import "./style.css";

function UserSavedBooks() {
  // get whole userData state object from App.js
  const userData = useContext(UserInfoContext);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = (bookId) => {
    // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    if (!token) {
      return false;
    }
    API.deleteBook(bookId, token)
      // upon succes, update user data to reflect book change
      .then(() => userData.getUserData())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Jumbotron fluid className='text-dark bg-light'>
        <Container>
          <h1 className='viewing-liked'><i class="fas fa-heart"></i>  Viewing Liked Posts!  <i class="fas fa-heart"></i></h1>
          <p className='user-instructions'> here you can comment on your liked posts or delete posts from your saved history. </p>
        </Container>
      </Jumbotron>
      <Container>
        <Card>
        <Card.Body className="post-card">
          <Card.Title className="post-subject">Post Subject</Card.Title>
          <p className="username">posted by:</p>
          <Card.Text>Body of text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. In metus vulputate eu scelerisque felis imperdiet proin. Ac felis donec et odio pellentesque diam. 
            Massa ultricies mi quis hendrerit dolor magna. Nulla facilisi nullam vehicula ipsum a arcu. Tristique senectus et netus et malesuada 
            fames ac. Enim sit amet venenatis urna cursus eget nunc. Lacus sed viverra tellus in. Tempus egestas sed sed risus pretium quam vulputate. Arcu vitae elementum curabitur vitae. 
            Vestibulum rhoncus est pellentesque elit ullamcorper. Augue mauris augue neque gravida.</Card.Text>
            <Button className="heart-btn"><i class="fas fa-heart"></i> like</Button><span>   </span>
            <Button className="comment-btn"><i className="fas fa-comment-dots"></i> comment</Button><span>   </span>
            <Button className="delete-btn"><i class="fas fa-trash-alt"></i> delete </Button>        </Card.Body>
        </Card>
        <Card>
        <Card.Body className="post-card">
          <Card.Title className="post-subject">Post Subject</Card.Title>
          <p className="username">posted by:</p>
          <Card.Text>Body of text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. In metus vulputate eu scelerisque felis imperdiet proin. Ac felis donec et odio pellentesque diam. 
            Massa ultricies mi quis hendrerit dolor magna. Nulla facilisi nullam vehicula ipsum a arcu. Tristique senectus et netus et malesuada 
            fames ac. Enim sit amet venenatis urna cursus eget nunc. Lacus sed viverra tellus in. Tempus egestas sed sed risus pretium quam vulputate. Arcu vitae elementum curabitur vitae. 
            Vestibulum rhoncus est pellentesque elit ullamcorper. Augue mauris augue neque gravida.</Card.Text>
            <Button className="heart-btn"><i class="fas fa-heart"></i> like</Button><span>   </span>
            <Button className="comment-btn"><i className="fas fa-comment-dots"></i> comment</Button><span>   </span>
            <Button className="delete-btn"><i class="fas fa-trash-alt"></i> delete </Button>        </Card.Body>
        </Card>
        <Card>
        <Card.Body className="post-card">
          <Card.Title className="post-subject">Post Subject</Card.Title>
          <p className="username">posted by:</p>
          <Card.Text>Body of text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. In metus vulputate eu scelerisque felis imperdiet proin. Ac felis donec et odio pellentesque diam. 
            Massa ultricies mi quis hendrerit dolor magna. Nulla facilisi nullam vehicula ipsum a arcu. Tristique senectus et netus et malesuada 
            fames ac. Enim sit amet venenatis urna cursus eget nunc. Lacus sed viverra tellus in. Tempus egestas sed sed risus pretium quam vulputate. Arcu vitae elementum curabitur vitae. 
            Vestibulum rhoncus est pellentesque elit ullamcorper. Augue mauris augue neque gravida.</Card.Text>
            <Button className="heart-btn"><i className="fas fa-heart"></i> like</Button><span>   </span>
            <Button className="comment-btn"><i className="fas fa-comment-dots"></i> comment</Button><span>   </span>
            <Button className="delete-btn"><i class="fas fa-trash-alt"></i> delete </Button>
        </Card.Body>
        </Card>
        {/* <h2 classname="saved-message">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'you have no liked posts!'}
        </h2> */}
        {/* <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns> */}
      </Container>
    </>
  );
}

export default UserSavedBooks;
