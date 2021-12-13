var express = require('express');
var router = express.Router();

const {authUser} = require("../private/auth");

/* GET home page. */
router.get('/', authUser, function(req, res, next) {
  res.render('styling', { title: 'Styling' });
});

module.exports = router;
