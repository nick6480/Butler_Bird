var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')


const {Company} = require("../models/companys");
const {User} = require("../models/users");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/', async function (req, res, next) {
    console.log("TYPE: " + req.body.businessType);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 15)

    //Register company
    const company = new Company({
      business : req.body.businesstype,
      name: req.body.companyname,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country
    });


    company.save(function(err, companyA) {
      console.log(err);
      console.log(companyA);

      // Register user
      const user = new User({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        tlf: req.body.tlf,
        company: companyA._id,
        role : 'admin',
      });

      console.log(user);

      user.save()

    });



    res.redirect('/login');
  } catch {
    res.redirect('/register');
  };


});


module.exports = router;
