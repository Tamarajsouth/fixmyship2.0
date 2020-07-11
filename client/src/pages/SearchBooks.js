import React, { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

import UserInfoContext from "../utils/UserInfoContext";
import AuthService from "../utils/auth";
import { saveBook, searchGoogleBooks, getTest, getAllTags } from "../utils/API";

import "./searchBooksStyle.css";


// BOOK RELATE FUCNTIONS - keep for reference!  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
  // BEGIN TAGS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // const renderTags = () => {
  // //  I need to figure out how to make tags set properly. Instead, I am using some temporary tags
  // console.log(tempTags)
  // }
  const [tempTags, setTempTags] = useState(["testTag1", "TestTag2"]); //switch this out with a function that gets tags from an api-call
  const clickTag = event => {                                                   //Working - GORM
    //should be set to activate "onClick" for each tag
    //... we might need to create a new model for tags... so that tags are easily searchable and can be pulled up in a container here

    // call api --> search database for specific tag
    //  - tag should be located within the component being clicked on. We should be able to grab this with something like "event.target.tagName"

    //return component via map!
    //need to create component in render...

    //BETTER WAY TO DO THIS: there is a component called BlogPosts (etc). That component displays all BlogPosts. 
    // this function here will simply set the tempTag/Tag state to the clicked 
    //...this need to relearn USeContext to do this.
    console.log("button clicked");  //why is this running on render instead of click?
    getTest();
    // getAllTags();
      //troubleshooting this particular function!
  };

  // END TAGS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // BEGIN POST section   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //this needs to simply do an api call based on what tempTags (or permanent equivalent) is set to,
  //then map the results into separate post containers.
  //... but map needs to be in rendered section and function needs to be out here?


  // END of BlogPosts ~~~~




  return (
    <>
      <hr></hr>
      <Card fluid className="welcome">
        <Container>
          <h1 className="welcome">
            {/* Hi there. Yes, you with the burning relationship questions you’re
            too worried to ask your friends about. We saw you low-key checking
            google for relationship advice like, “Am I a terrible friend because
            I get jealous?” and “Is snooping on my S.O. okay…sometimes?” We’ll
            admit it, Google is great for most things, like research papers and
            cat videos but, relationship advice? Not so much. */}
            Welcome to Fix My 'Ship, the relationship forum where real
            people give other people real advice.
            Sink or swim...only you can decide.
          </h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="sm"
                  placeholder="search posts by category"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="light" size="sm">
                  search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Card>

      <Container>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <h1>Tamara Please dont kill me, I swear this is temporary!</h1>

        <div>
          {/* this should benicely formated eventually */}
          {/* tags.map */}
          {tempTags.map((TTag) => {
            return (
              // needs to return something with a value to read...

              <button onClick={() => {clickTag()}}> {TTag} </button>
              
            );

          })}
        </div>
        <div>


        </div>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}



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

//Notes
/*
Need to add a container full of tags
Gorm is working on a function that should create a container full of post summaries.
*** lets create a temporary Tags Section with preset tags for Saturday
*/