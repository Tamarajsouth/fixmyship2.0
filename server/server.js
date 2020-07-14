const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

require('./models/User')
require('./models/Post')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('./routes/api/user-routes'));
app.use(require('./routes/api/post-routes'));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
