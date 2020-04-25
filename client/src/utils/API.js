import axios from 'axios';

export const getSavedBooks = function () {
  return axios.get('/api/books');
};
export const saveBook = function (bookData) {
  return axios.post('/api/books', bookData);
};
export const deleteBook = function (bookId) {
  return axios.delete(`/api/books/${bookId}`);
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = function (query) {
  return axios.get('https://www.googleapis.com/books/v1/volumes', { params: { q: query } });
};
