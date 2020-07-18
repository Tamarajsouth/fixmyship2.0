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

//get books
// export const getBooks = function (bookData, token) {
//   return axios.post(`/api/users/books/${bookId}`, { headers: { authorization: `Bearer ${token}` } });
// };
// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = function (query) {
  return axios.get('https://www.googleapis.com/books/v1/volumes', { params: { q: query } });
};


// POSTS (articles)


export const getAllPosts = function (token) {
  console.log("retrieving all posts");
  return axios.get('/api/posts/all', { headers: { authorization: `Bearer ${token}` } });
}

export const createPost = function (postData) {
  console.log("post created");
  return axios.post('/api/posts/', postData);
}


export const getOnePost = function () {
  console.log("retrieving all posts");
  return axios.get('/api/posts/post/:_id');
}

// Tags
export const getTest = function () {
  console.log("API hit");
  return axios.get('/api/posts/');

};

export const getAllTags = function () {
 console.log("getting tags from server");
  return axios.get('/api/tags/all');
  
};
// comments
export const getAllComments = function () {
  console.log("getting comments from server");
   return axios.get('/api/comments/all');
   
 };
 export const getCommentsByUser = function (userId) { // search by username?
  console.log("getting comments from server");
   return axios.get(`/api/comments/user/${userId}`);
   
 };

 export const getCommentsByPost = function (postId) { //not sure if this is the correct data
  console.log("getting comments from server");
   return axios.get(`/api/comments/post/${postId}`);
   
 };
 