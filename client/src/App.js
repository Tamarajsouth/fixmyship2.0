import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import UserSavedPosts from "./pages/UserSavedPosts";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Footer from "./components/Footer";
import Rules from "./pages/Rules";
import CommunityPosts from "./pages/CommunityPosts";
import CreatePost from "./pages/CreatePost";
import { Container, Col, Row } from 'react-bootstrap';

import * as API from "./utils/API";
import AuthService from "./utils/auth";

import "./index.css";

// import our context object for state
import UserInfoContext from "./utils/UserInfoContext";

function App() {
  // set data to be used for UserInfoContext and make it available to all other components
  const [userInfo, setUserInfo] = useState({
    posts: [],
    username: "",
    email: "",
    // method to get user data after logging in
    getUserData: () => {
      // if user's logged in get the token or return null
      const token = AuthService.loggedIn() ? AuthService.getToken() : null;

      if (!token) {
        return false;
      }
      API.getMe(token)
        .then(({ data: { username, email, posts } }) =>
          setUserInfo({ ...userInfo, username, email, posts })
        )
        .catch((err) => console.log(err));
    },
  });

  // on load, get user data if a token exists
  useEffect(() => {
    userInfo.getUserData();
  }, []);

  return (
    <Container fluid className="page-container">
      <Row>
        <Col sm={12}>
      <div className="content-wrap">
        <Router>
          <>
            {/* wrap our entire app in context provider and provide userInfo state as value */}
            <UserInfoContext.Provider value={userInfo}>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Welcome} />
                <Route
                  exact
                  path="/communityposts"
                  component={CommunityPosts}
                />
                <Route exact path="/saved" component={UserSavedPosts} />
                <Route exact path="/about" component={About} />
                <Route exact path="/rules" component={Rules} />
                <Route exact path="/createpost" component={CreatePost} />
                <Route
                  render={() => <h1 className="display-2">Wrong page!</h1>}
                />
              </Switch>
            </UserInfoContext.Provider>
          </>
        </Router>
      </div>
      </Col>
      </Row>
      <div className="footer-push"></div>
      <Footer />
    </Container>
  );
}

export default App;
