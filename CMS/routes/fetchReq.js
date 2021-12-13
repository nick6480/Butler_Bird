var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/style', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  console.log('New req: ' + req);

});

module.exports = router;
