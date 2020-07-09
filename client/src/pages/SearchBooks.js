import React, { useState, useContext } from 'react';
import { Jumbotron, Container, Row, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';
import { saveBook, searchGoogleBooks } from '../utils/API';

function SearchBooks() {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // we ought to be able to use the above to hold the search results from clicking on a tag!

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
          authors: book.volumeInfo.authors || ['No author to display'],
          title: book.volumeInfo.title,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks?.thumbnail || '',
        }));
        console.log(bookData);

        return setSearchedBooks(bookData);
      })
      .then(() => setSearchInput(''))
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

const clickTag = (tagName) => {    //occurs onclick of any tag
  // what do I need as a parameter?
  //tagname needs to be switched out with a parameter from the specific component... 
  
  
  //calls an API function that 
  /* getPosts(tagName)
    .then(() => xxx_unknownMethodGoesHere...
    )
    .catch((err) => console.log(err));

      */


/*
  Will Need:
 * Each tag will be a component on the right side of the screen. when that component is clicked
    1. API call uses that components text value (title, etc) as a database query
      - db.posts.find({tags : "exampleTag"})
      - ...unrelated note, an "ExampleTag" would be a fun way to have instructions and clarifications on how to use the app show up! 
      - ...we could pin the ExampleTag as the first category (out of alphabetical order) so that instructions are always available
      - Database: right now database is a collection of users with id,username,email and a saved books array
      -> We need to add a posts collection and make it a many-to-one relationship with users
        - that way posts remain if a user is deleted
        - need to determine if users can post anonymously
      - we will change savedbooks into posts... but as a... relationship 
    2. Database Query returns all the Posts that meet the query
    3. Posts will be mapped onto components (called "ShortPost" or "PostSummary" for example, to differentiate it from viewing a single post)
    4. clicking on the ShortPost will send the user to a new page where the post and comments can be seen
    OH GODS HOW WILL WE DO COMMENTS?
      - as an array within post! simple!...?
   

 * A method that is called when a tag is clicked
    - api call: will get information from database about that tag...
      : api call returns an array of posts that contain that tag
      : fills out a new container with a bunch of posts, should be sorted by date... or something
      :hides the other containers open
  ..\\

  */

}


  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>{searchedBooks.length ? `Viewing ${searchedBooks.length} results:` : 'Search for a book to begin'}</h2>
        <CardColumns>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {userData.username && (
                    <Button
                      disabled={userData.savedBooks?.some((savedBook) => savedBook.bookId === book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}>
                      {userData.savedBooks?.some((savedBook) => savedBook.bookId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
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


// Gorm's Workspace

/*

Will Need:
 * Each tag will be a component on the right side of the screen. when that component is clicked
    1. API call uses that components text value (title, etc) as a database query
      - db.posts.find({tags : "exampleTag"})
      - ...unrelated note, an "ExampleTag" would be a fun way to have instructions and clarifications on how to use the app show up! 
      - ...we could pin the ExampleTag as the first category (out of alphabetical order) so that instructions are always available
      - Database: right now database is a collection of users with id,username,email and a saved books array
      -> We need to add a posts collection and make it a many-to-one relationship with users
        - that way posts remain if a user is deleted
        - need to determine if users can post anonymously
      - we will change savedbooks into posts... but as a... relationship 
    2. Database Query returns all the Posts that meet the query
    3. Posts will be mapped onto components (called "ShortPost" or "PostSummary" for example, to differentiate it from viewing a single post)
    4. clicking on the ShortPost will send the user to a new page where the post and comments can be seen
    OH GODS HOW WILL WE DO COMMENTS?
      - as an array within post! simple!...?
   

 * A method that is called when a tag is clicked
    - api call: will get information from database about that tag...
      : api call returns an array of posts that contain that tag
      : fills out a new container with a bunch of posts, should be sorted by date... or something
      :hides the other containers open
  ..\\

  * 

NOTES: I need to create a sorting algorithm. https://www.cs.cmu.edu/~adamchik/15-121/lectures/Sorting%20Algorithms/sorting.html

setSearchInput hook for setting 
will we need useEffect from react?

keys of the Posts/shortPosts components will need to match up with the Posts ids in database...





  // get token
    const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    if (!token) {
      return false;
    }


*/