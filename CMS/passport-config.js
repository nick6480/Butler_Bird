/*const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(email, getUserByEmail, getUserById) {

  const authenticateUser = async (email, password, done) => {


    var email = req.fields.email;
    var password = req.fields.password;

    User.findOne({email: email}).exec((err, user) => {
      if (user) { // if user exists

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return done(err)
          if (isMatch) { // if passwords match
            passport.serializeUser((user, done) => done(null, user.id))
            return done(null, user)

          } else { // if passwords don't match
            return done(null, false, { message: 'No user with that email' })
          }
        })

      } else { // if user dosent exist
            return done(null, false, { message: 'No user with that email' })

      }
    })


  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  //passport.serializeUser((user, done) => done(null, user.id))
  //passport.deserializeUser((id, done) => {return done(null, getUserById(id))})
}

module.exports = initialize
*/
