import React, { useState, useContext, useEffect } from "react";
import { Container, Nav, NavDropdown, Form, Button, Card, CardColumns } from "react-bootstrap";
import { Link } from 'react-router-dom';
import UserInfoContext from "../utils/UserInfoContext";
import AuthService from "../utils/auth";
import { saveBook, searchGoogleBooks } from "../utils/API";

import "./style.css";


function SearchBooks() {

// create state for holding returned google api data
const [searchedBooks, setSearchedBooks] = useState([]);
// create state for holding our search field data
const [searchInput, setSearchInput] = useState("");
const userData = useContext(UserInfoContext);
// create method to search for books and set state on form submit
const handleFormSubmit = (event) => {
  event.preventDefault();
  if (!searchInput) {
    return false;
  }
  searchGoogleBooks(searchInput)
    .then(({ data }) => {
      const bookData = data.items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ["No author to display"],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || "",
      }));
      console.log(bookData);
      return setSearchedBooks(bookData);
    })
    .then(() => setSearchInput(""))
    .catch((err) => console.log(err));
};
// create function to handle saving a book to our database
const handleSaveBook = (bookId) => {
  // find the book in `searchedBooks` state by the matching id
  const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
  // get token
  const token = AuthService.loggedIn() ? AuthService.getToken() : null;
  if (!token) {
    return false;
  }
  // send the books data to our api
  saveBook(bookToSave, token)
    .then(() => userData.getUserData())
    .catch((err) => console.log(err));
};
// END OF BOOKS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// BEGIN POST section   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

return (
  <>
    <hr></hr>
    <Card.Body className="welcome-heading">Welcome!</Card.Body>
      <Container className="welcome-container">
        <p className="welcome-text">
            Welcome to Fix My 'Ship, the relationship forum where real
            people give other people real advice.
            Sink or swim...only you can decide.
          </p>
        <Form onSubmit={handleFormSubmit}>
        <Form.Row> 
      {/* <Nav className="mr-center">
      <NavDropdown title="Search by Category" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Dates</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Marriage</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Break Ups</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">LGBTQ+</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Women</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Men</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Just Friends</NavDropdown.Item>
        <NavDropdown.Divider />
      </NavDropdown>
    </Nav> */}
    <Card.Body className="buttons-card">
        <Link className="create-post-link" as={Link} to='/createpost'> create post </Link>
        </Card.Body>
        </Form.Row>
        </Form>
      </Container>

    <Container>

      {/* <h2>{searchedBooks.length ? `Viewing ${searchedBooks.length} results:` : ''}</h2> */}
      <CardColumns>
        {searchedBooks.map((book) => {
          return (
            <Card key={book.bookId} border="none">
              {/* book image code - not relevent to our app but saving just in case */}
              {/* {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null} */}
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <p className="small">user: {book.authors}</p>
                <Card.Text>
                  {/* this is where the post text body should go */}
                  {book.description}
                </Card.Text>
                {userData.username && (
                  <Button
                    // like post with a heart of reply
                    disabled={userData.savedBooks?.some(
                      (savedBook) => savedBook.bookId === book.bookId
                    )}
                    className="btn-block btn-info"
                    onClick={() => handleSaveBook(book.bookId)}
                  >
                    {userData.savedBooks?.some(
                      (savedBook) => savedBook.bookId === book.bookId
                    )
                      ? "This book has already been saved!"
                      : "Save this Book!"}
                  </Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </CardColumns>
    </Container>
  </>
);
}

export default SearchBooks;
