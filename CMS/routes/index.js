var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');
const {Company} = require("../models/companys");
const {User} = require("../models/users");

const {authUser, authUserBool} = require("../private/auth");

/* GET home page. */
router.get('/', function(req, res, next) {


  if (authUserBool(req, res) == true) {
    res.redirect('/dashboard')
  } else {
      res.locals.isAuthenticated = authUserBool(req, res);
      res.render('index', {user: req.user, title: 'Index'});
  }


});



router.get('/dashboard', authUser, function(req, res, next) {
  res.locals.isAuthenticated = authUserBool(req, res);
  res.render('dashboard', { name: req.user.name, title: 'Dashboard' });
});



// LOGIN
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login'});
});


router.post('/', passport.authenticate('local', {successRedirect: '/',failureRedirect: '/login',failureFlash: true}));




// LOGOUT
router.get('/logout', function(req, res, next) {
  req.logout();
  //req.session.destroy();
  res.render('index', { title: 'Index'});
});







module.exports = router;
