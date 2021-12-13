require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
var cors = require('cors')



const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const fetchRouter = require('./routes/fetchReq');
const contentRouter = require('./routes/content');
const stylingRouter = require('./routes/styling');
const dataRouter = require('./routes/data');

const restaurantRouter = require('./routes/restaurant');
const activityRouter = require('./routes/activity');

//const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');


const imgRouter = require('./routes/img');


const app = express();

const MONGODB_URI = 'mongodb+srv://nick6480:wAgSixmVpWK7!Kh@cluster0.i3xsl.mongodb.net/butlerbird?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI || 'mongodb://localhost/hotels', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database successfully'));




// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))



//Passport

const bcrypt = require('bcrypt');

const {User} = require("./models/users");
const LocalStrategy = require('passport-local').Strategy

app.use(passport.initialize())
app.use(passport.session())



passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use(new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
  console.log(email);
  User.findOne({ email: email}, function (err, user) {
    console.log(err);
    if (err) return done(err);
    if (!user) {
      console.log('email');
      return done(null, false, { message: 'Incorrect email or password'});
    }

    bcrypt.compare(password, user.password, function  (err, res) {
      if (err) {
        console.log(err);
        return done(err)
    }

    if (res === false ) {
      console.log('password')
        return done(null, false, {message: 'Incorrect email or password'})

        };

        console.log(user.email + ' successfully logged in');
        return done(null, user);
      })


  })
}));

/*
app.use(function(req, res, next) {

  res.locals.login = req.isAuthenticated();
  next();
});
*/


var cors = require('cors')

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/fetchReq', fetchRouter);
app.use('/content', contentRouter);
app.use('/restaurant', restaurantRouter);
app.use('/activity', activityRouter);
app.use('/styling', stylingRouter);
app.use('/data', dataRouter);

app.use('/login', indexRouter);
app.use('/register', registerRouter);


app.use('/getimg', imgRouter);

app.use(cors())

app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(cors())


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
