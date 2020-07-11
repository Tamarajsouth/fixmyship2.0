const router = require('express').Router();

const {
  getAllTags   
  
  } = require('../../controllers/tag-controller');

  router.route('/all').get(getAllTags);

module.exports = router;