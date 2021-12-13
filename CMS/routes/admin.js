var express = require('express');
var router = express.Router();

const {authUser, authRole, authUserBool, ROLE} = require("../private/auth");

const {Company} = require("../models/companys");
const {User} = require("../models/users");

/* GET users listing. */

router.get('/', authUser, authRole(ROLE.ADMIN), function(req, res, next) {

  Company.findOne({_id: req.user.company}, function (err, company) {
    if(err) console.log(err);
    if(company) {

      let data = {
        domain: company.butlerbird.url,
      }

      console.log(data);


      User.find({'company' :  company._id}, function(err, users){
           console.log(users);

             res.locals.isAuthenticated = authUserBool(req, res);

             let userArr = []



             for (var i = 0; i < users.length; i++) {
               let userObj = {
                 name : users[i].name,
                 email : users[i].email,
                 tlf : users[i].tlf,
                 role : users[i].role
               }

               userArr.push(userObj)

             }

             console.log(data);
             res.render('admin', {title: 'Admin', users: userArr, data: data});
      });


    }
  })



});




// Create new category
router.post('/update/url', function(req, res, next) {
  console.log(req.body.data);

  let regex = req.body.data.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

  //REGEX DISABLED FOR TESTING PURPOSE



  if (true) {

        Company.findOne({_id: req.user.company}, function (err, company) {
          if(err) console.log(err);
          if(company) {

            company.butlerbird.url = req.body.data;

            company.save();

          }
        })

        res.status(200)
    } else {
        res.status(400)
  }


})





























module.exports = router;
