import axios from 'axios';

export const getAllUsers = function () {
  return axios.get('/api/users');
};

// route to get logged in user's info (needs the token)
export const getMe = function (token) { //is this working at all
  return axios.get('/api/users/me', { headers: { authorization: `Bearer ${token}` } });
};

// get a user by their username, not being used in the app just showing how it could work
export const getUser = function (username) {
  return axios.get(`/api/users/${username}`);
};

export const createUser = function (userData) {
  return axios.post('/api/users', userData);
};

export const loginUser = function (userData) {
  return axios.post('/api/users/login', userData);
};

// save book data for a logged in user
export const saveBook = function (bookData, token) {
  return axios.put('/api/users', bookData, { headers: { authorization: `Bearer ${token}` } });
};
// remove saved book data for a logged in user
export const deleteBook = function (bookId, token) {
  return axios.delete(`/api/users/books/${bookId}`, { headers: { authorization: `Bearer ${token}` } });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = function (query) {
  return axios.get('https://www.googleapis.com/books/v1/volumes', { params: { q: query } });
};


/*
POSTS AND NEW STUFF
estimated function:

export const getPosts = function (TagName) {
  return axios.get(`/api/tags/${TagName}`);
};


*/

export const getTest = function () {
  console.log("API hit");
  return axios.get('/api/posts/');
  // return axios.get('/api/users/test');
  //does index make the /api/users  part appear in front of everything in user-routes?
  //maybe try '/test' if above fails
};

export const getAllTags = function () {
 console.log("getting tags from server");
  return axios.get('/api/tags/all');
  
};