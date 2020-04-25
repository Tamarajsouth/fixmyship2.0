import React, { useContext } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// import context for global state
import SavedBookContext from '../utils/SavedBookContext';

// import getSavedBooks and deleteBook from API file
import * as API from '../utils/API';

function SavedBooks() {
  const { books: savedBooks, getSavedBooks } = useContext(SavedBookContext);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = (mongoId) => {
    API.deleteBook(mongoId)
      .then(() => getSavedBooks())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container fluid>
        <h2>{savedBooks.length ? `Viewing ${savedBooks.length} saved books:` : 'You have no saved books!'}</h2>
        <CardColumns>
          {savedBooks.map((book) => {
            return (
              <Card key={book._id} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book._id)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
}

export default SavedBooks;
