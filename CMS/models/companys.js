const mongoose = require('mongoose');
const CompanySchema  = new mongoose.Schema({
  business : {
    type: String,
    required : true
  },
  businessType : {
    type: String,
  },
  name :{
      type  : String,
      required : true
  } ,
  address :{
      type : String,
      required : true,
  } ,
  city :{
    type : String,
    required : true
} ,
country :{
    type : String,
    required : true
} ,
paymentPlan :{
    type : String,
},
butlerbird : {
    content : {
      categorys : [{
        category: {
          catid: String,
          name : String,
          content : [{
            name : String,
            preview : {
              text : String,
              img : {
                data : Buffer,
                contentType : String
              },
              style : {
                alignment: String,
              },
            },
            page: {
              text : String,
              img : {
                data : Buffer,
                contentType : String
              }
            }
          }]
        }
      }]
    },
    style : {

    },
    defaultsettings: {
      accessiblity: {
        language: {
          type: String,
          default: 'English',
      },
        fontsize: {
          type: String,
          default: 'Normal',
      },
      },
      design: {
        theme: {
          type: String,
          default: 'Light',
      },
      },
      weather: {
        widget: {
          type: Boolean,
          default: true,
        },
        unit: {
          type: String,
          default: 'metric',
        }
      }
    }
},
butlerbirdRestaurant: {
  preview: {
    text: String,
    img: {
      data: Buffer,
      contentType: String
    },
    action: String,
  },
  page: {
    text: String,
    img: {
      data: Buffer,
      contentType: String
    }
  }
},
butlerbirdActivity : {
  preview: {
    text: String,
    img: {
      data: Buffer,
      contentType: String
    },
    action: String,
  },
  page: {
    text: String,
    img: {
      data: Buffer,
      contentType: String
    }
  }
},
}, {timestamps: true});
const Company = mongoose.model('Company',CompanySchema);

module.exports = {
  Company
}
