import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

import * as API from './utils/API';
import AuthService from './utils/auth';

// import our context object for state
import UserInfoContext from './utils/UserInfoContext';

function App() {
  const [userInfo, setUserInfo] = useState({
    savedBooks: [],
    username: '',
    email: '',
    bookCount: 0,
    getUserData: () => {
      const token = AuthService.loggedIn() ? AuthService.getToken() : null;

      if (!token) {
        return false;
      }
      API.getMe(token)
        .then(({ data: { username, email, savedBooks, bookCount } }) =>
          setUserInfo({ ...userInfo, username, email, savedBooks, bookCount })
        )
        .catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    userInfo.getUserData();
  });

  return (
    <Router>
      <>
        <UserInfoContext.Provider value={userInfo}>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </UserInfoContext.Provider>
      </>
    </Router>
  );
}

export default App;
