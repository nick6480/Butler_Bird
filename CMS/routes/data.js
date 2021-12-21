var express = require('express');
var router = express.Router();


const {Company} = require("../models/companys");


// Display data on Butlerbird
router.get('/company/get', function(req, res, next) { // GET Company data

  const id = req.query.id;

  Company.findOne({'_id' : id}, function (err, company) {
    if(err) console.log(err);
    if(company) {
        let obj = {
          business: company.business,
          name: company.name,
          address: company.address,
          city: company.city,
          country: company.country
        }
      res.json(obj);
    }
  })
  res.status(200)
});



router.get('/settings/get', function(req, res, next) {// Get the default settings
  Company.findOne({'butlerbird.url' : req.hostname}, function (err, company) {
    if(err) console.log(err);
    if(company) {

      res.json(company.defaultsettings);
    }
  })


  res.status(200)
});



router.get('/img/:id/:catid/:boxid/:type', function(req, res, next) {

    Company.findOne({_id : req.params.id}, function (err, company) {

    if(err) console.log(err);
    if(company) {


      for (var i = 0; i < company.butlerbird.content.categorys.length; i++) {
        if (company.butlerbird.content.categorys[i].category.catid == req.params.catid) {
          for (var o = 0; o < company.butlerbird.content.categorys[i].category.content.length; o++) {
            if (company.butlerbird.content.categorys[i].category.content[o]._id == req.params.boxid) {
              if (req.params.type == 'preview') {
                if (company.butlerbird.content.categorys[i].category.content[o].preview.img) {
                  res.contentType(company.butlerbird.content.categorys[i].category.content[o].preview.img.contentType);
                  res.send(company.butlerbird.content.categorys[i].category.content[o].preview.img.data);
                }
              } else if (req.params.type == 'page') {
                  if (company.butlerbird.content.categorys[i].category.content[o].page.img) {
                    res.contentType(company.butlerbird.content.categorys[i].category.content[o].page.img.contentType);
                    res.send(company.butlerbird.content.categorys[i].category.content[o].page.img.data);
                  }
              }
            }
          }
        }
      }

    }
  })
})





router.get('/img/restaurant/:id/:type', function(req, res, next) {
    Company.findOne({_id : req.params.id}, function (err, company) {
    if(err) console.log(err);
    if(company) {






      switch (req.params.type) {
      case 'preview':
        res.contentType(company.butlerbirdRestaurant.preview.img.contentType);
        res.send(company.butlerbirdRestaurant.preview.img.data);
      break;

      }
    }
  })
})

router.get('/img/activity/:id/:type', function(req, res, next) {
    Company.findOne({_id : req.params.id}, function (err, company) {
    if(err) console.log(err);
    if(company) {


      switch (req.params.type) {
      case 'preview':
        res.contentType(company.butlerbirdActivity.preview.img.contentType);
        res.send(company.butlerbirdActivity.preview.img.data);

      break;

      }
    }
  })
})





router.get('/get', function(req, res, next) {

  const page = req.query.page;
  const limit = req.query.limit;
  const id = req.query.id;
  const business = req.query.q




  switch (business) {
    case 'restaurant':
      console.log('NEW RESTAURANT REQ');
      Company.findOne({_id: id}, function (err, hotel) {

        if (hotel) {
          Company.find({city: hotel.city})
          Company.find({business: business, city: hotel.city}, function(err, restaurants) {


            let all = [];

            for (var i = 0; i < restaurants.length; i++) {

              if (all.length == 0) {
                let cat = []
                cat.push(restaurants[i])
                all.push(cat)
              } else {
                let length = all.length
                for (var o = 0; o < length; o++) {
                  if (all[o][0].businessType == restaurants[i].businessType) {
                    all[o].push(restaurants[i])
                  } else {
                    let cat = []
                    cat.push(restaurants[i])
                    all.push(cat)
                  }
                }
              }

            }



            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            all.slice(startIndex, endIndex)
            const resultRestaurant = all;



            res.json(resultRestaurant);

          })
        }

      })


    break;
    case  'hotel':
      Company.findOne({_id: id}, function (err, company) {
        if(err) console.log(err);
        if(company) {

          const categorys = company.butlerbird.content.categorys

          for (var i = 0; i < categorys.length; i++) {
          }


          const startIndex = (page - 1) * limit;
          const endIndex = page * limit;
          company.butlerbird.content.categorys.slice(startIndex, endIndex)
          const resultCompany = company.butlerbird.content.categorys;

          console.log(resultCompany);

          res.json(resultCompany);

        }
      })
    break;
    case 'activity':
      Company.findOne({_id: id}, function (err, hotel) {

        if (hotel) {
          Company.find({city: hotel.city})
          Company.find({business: business, city: hotel.city}, function(err, restaurants) {


            let all = [];

            for (var i = 0; i < restaurants.length; i++) {
              if (all.length == 0) {
                let cat = []
                cat.push(restaurants[i])
                all.push(cat)
              } else {
                let length = all.length
                for (var o = 0; o < length; o++) {
                  if (all[o][0].businessType == restaurants[i].businessType) {
                    all[o].push(restaurants[i])
                  } else {
                    let cat = []
                    cat.push(restaurants[i])
                    all.push(cat)
                  }
                }
              }

            }



            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            all.slice(startIndex, endIndex)
            const resultRestaurant = all;


            res.json(resultRestaurant);

          })
        }

      })


    break;

  }





  res.status(200)
});











module.exports = router;
