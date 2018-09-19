var router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/promotions', require('./promotions'));
router.use('/events', require('./events'));

module.exports = router;