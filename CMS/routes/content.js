var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

const path = require('path');

const fs = require('fs');
const formidable = require('formidable');


const {Company} = require("../models/companys");

const {authUser, authUserBool} = require("../private/auth");

router.get('/', authUser, function(req, res, next) {

  console.log(req.user);
  Company.findOne({_id: req.user.company}, function (err, company) {
    if(err) console.log(err);
    if(company) {
      res.locals.isAuthenticated = authUserBool(req, res);
      res.render('content', { title: 'Content',  company : company});
    }
  })
});



router.get('/company', function(req, res, next) {

    Company.findOne({_id: req.user.company}, function (err, company) {
      if(err) console.log(err);
      if(company) {
        res.json({ company: company })
      }
    })
});



// Create new category
router.post('/createcat', function(req, res, next) {
  let id = new mongoose.Types.ObjectId()
  Company.findOneAndUpdate({ _id:req.user.company}, {
    $push: {"butlerbird.content.categorys": {"category": {catid: id, name: req.body.data}}}
  },{new: true, upsert: true }).exec();
})


// Create new box
router.post('/createbox', function(req, res, next) {

  let content = {
    name : req.body.data.value
  }

  Company.findOne({_id: req.user.company}, function (err, company) {
    if(err) console.log(err);
    if(company) {

      for (var i = 0; i < company.butlerbird.content.categorys.length; i++) {
        if (company.butlerbird.content.categorys[i].category.catid === req.body.data.id) {
          company.butlerbird.content.categorys[i].category.content.push(content)
          company.save()
        }
      }
    }
  })
})




//Update the category position
router.post('/updatecatpos', function(req, res, next) {
  let catArr = [];

  console.log(req.body.data);


  Company.findOne({ _id:req.user.company}, function(err,company) {
    //Finds the matching id and push it to an array
    for (var i = 0; i < req.body.data.length; i++) {
      for (var o = 0; o < company.butlerbird.content.categorys.length; o++) {
        if (req.body.data[i].id === company.butlerbird.content.categorys[o].category.catid) {
          catArr.push(company.butlerbird.content.categorys[o])
        }

        for (var a = 0; a < req.body.data[i].boxes.length; a++) {
          for (var u = 0; u < company.butlerbird.content.categorys[o].category.content.length; u++) {
            if (req.body.data[i].data[a] === company.butlerbird.content.categorys[o].category.content[u]) {
              boxArr.push(company.butlerbird.content.categorys[o].content[u])
              catArr[o].category.content.push(company.butlerbird.content.categorys[o].content[u])

            }
          //let q = `butlerbird.content.categorys${[o]}.category.content`
          //Company.findOneAndUpdate({ _id:req.user.company}, {`butlerbird.content.categorys${[o]}.category.content`: boxArr},{new: true, upsert: true }).exec();
          }
        }
      }
    }

    Company.findOneAndUpdate({ _id:req.user.company}, {"butlerbird.content.categorys": catArr},{new: true, upsert: true }).exec();
    console.log(catArr);
  });

})


// Update Content





router.post('/update', async function(req, res, next) {

  let form = new formidable.IncomingForm();
  console.log(req.user.company);
  form.parse(req, async function(err, fields, files) {
    if (err) {console.error(err);}

      Company.findOne({_id: req.user.company}, async function (err, company) {

        for (var i = 0; i < company.butlerbird.content.categorys.length; i++) {
          if (company.butlerbird.content.categorys[i].category.catid == fields.catId) {
            for (var o = 0; o < company.butlerbird.content.categorys[i].category.content.length; o++) {
              if (company.butlerbird.content.categorys[i].category.content[o]._id == fields.boxId) {

                // Preview
                company.butlerbird.content.categorys[i].category.content[o].preview.text = fields.previewtext
                company.butlerbird.content.categorys[i].category.content[o].preview.action = fields.action

                company.butlerbird.content.categorys[i].category.content[o].preview.action = fields.action


                company.butlerbird.content.categorys[i].category.content[o].preview.img.data = await fs.readFileSync(files.previewimg.filepath);
                company.butlerbird.content.categorys[i].category.content[o].preview.img.contentType = files.previewimg.mimetype;

                // Page
                company.butlerbird.content.categorys[i].category.content[o].page.text = fields.pagetext

                company.butlerbird.content.categorys[i].category.content[o].page.img.data = await fs.readFileSync(files.previewimg.filepath);
                company.butlerbird.content.categorys[i].category.content[o].page.img.contentType = files.previewimg.mimetype;


                company.save();
              }
            }
          }
        }


        //res.redirect('/restaurant');
        res.status(200)
      })

    })
  })













router.post('/update/content', async function(req, res, next) {

    let form = new formidable.IncomingForm();

   form.parse(req, async function(err, fields, files) {
      if (err) { console.error(err); }


     Company.findOne({ _id:req.user.company}, async function(err,company) {



      })
    })


});



router.post('/', function(req, res, next) {
  //console.log(req.body);



  res.status(200)
});








router.get('/get', function(req, res, next) {

  const page = req.query.page;
  const limit = req.query.limit;
  const id = req.query.id;


  Company.findOne({_id: id}, function (err, company) {
    if(err) console.log(err);
    if(company) {
      console.log(company);


      for (var i = 0; i < company.butlerbird.content.categorys.length; i++) {
        for (var o = 0; o < company.butlerbird.content.categorys[i].category.content.length; o++) {
          delete company.butlerbird.content.categorys[i].category.content[o].preview.img
          delete company.butlerbird.content.categorys[i].category.content[o].page.img
        }
      }
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      company.butlerbird.content.categorys.slice(startIndex, endIndex)
      const resultCompany = company.butlerbird.content.categorys;


      res.json(resultCompany);

    }
  })


  res.status(200)
});









module.exports = router;
