/////////////////////////////////////////
// 	  route handler index file
//      (first file called from main apps index.js)
//      adds all route handler files to the express app
////////////////////////////////////////

var router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/promotions', require('./promotions'));
router.use('/events', require('./events'));

module.exports = router;