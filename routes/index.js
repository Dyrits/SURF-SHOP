const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (request, response, next) => {
  response.render('index', { title: 'Surf Shop - Home' });
});



module.exports = router;
