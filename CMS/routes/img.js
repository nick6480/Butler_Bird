var express = require('express');
var router = express.Router();

const {Company} = require("../models/companys");

const {authUser} = require("../private/auth");



  router.get('/:catid/:boxid/:type', function(req, res, next) { // Displays images on node app

    Company.findOne({_id: req.user.company}, function (err, company) {

      console.log("REQ");

      // BUG: CRASH IF NO IMG


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



module.exports = router;
