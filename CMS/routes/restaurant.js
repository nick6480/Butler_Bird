var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

const path = require('path');

const fs = require('fs');
const formidable = require('formidable');


const {Company} = require("../models/companys");

const {authUser, authUserBool} = require("../private/auth");

router.get('/', authUser, function(req, res, next) {
  Company.findOne({_id: req.user.company}, function (err, company) {
    if(err) console.log(err);
    if(company) {
      res.locals.isAuthenticated = authUserBool(req, res);

      if (company.butlerbirdRestaurant.preview.img) {
        delete company.butlerbirdRestaurant.preview.img.data
      }
      if (company.butlerbirdRestaurant.preview.img) {
        delete company.butlerbirdRestaurant.preview.img.data
      }
      res.render('restaurant', { title: 'Restaurant',  company : company});
    }
  })
});



router.post('/update', async function(req, res, next) {
  let form = new formidable.IncomingForm();
  console.log(req.user.company);
  form.parse(req, async function(err, fields, files) {
    if (err) {console.error(err);}
    console.log(fields.previewoverlay);
      Company.findOne({_id: req.user.company}, async function (err, company) {
        console.log('found it ' + company);

        // Preview
        company.butlerbirdRestaurant.preview.subheading = fields.previewsubheading
        company.butlerbirdRestaurant.preview.text = fields.previewtext
        company.butlerbirdRestaurant.preview.align = fields.previewalign
        company.butlerbirdRestaurant.preview.overlay = fields.previewoverlay


        if (files.previewimg.mimetype.includes('image')) {
          company.butlerbirdRestaurant.preview.img.data = await fs.readFileSync(files.previewimg.filepath);
          company.butlerbirdRestaurant.preview.img.contentType = files.previewimg.mimetype;
        }


        // Page
        company.butlerbirdRestaurant.page.text = fields.pagetext

        company.butlerbirdRestaurant.page.img.data = await fs.readFileSync(files.previewimg.filepath);
        company.butlerbirdRestaurant.page.img.contentType = files.previewimg.mimetype;


        company.save()
        //res.redirect('/restaurant');
        res.status(200)
      })

    })
  })




router.get('/img/:type/:id', function(req, res, next) { // Displays images on node app


  Company.findOne({_id: req.params.id}, function (err, company) {
    if (req.params.type == 'preview') {
      res.contentType(company.butlerbirdRestaurant.preview.img.contentType);
      res.send(company.butlerbirdRestaurant.preview.img.data);
    } else if (req.params.type == 'page') {
      res.contentType(company.butlerbirdRestaurant.page.img.contentType);
      res.send(company.butlerbird.page.img.data);
    }
  })

})





module.exports = router;
