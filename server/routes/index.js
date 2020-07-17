const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');
// const { authMiddleware } = require('../../utils/auth');
//I'm wondering if putting this here gives it access to all
//if so I should remove from users


router.use('/api', apiRoutes);

// serve up react front-end in production
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;
