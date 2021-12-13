function authUser(req, res, next) {
  if (req.user == null) {
    res.status(403)
    return res.redirect('/')
  }
  next()
}


function authUserBool(req, res) {
  if (req.user == null) {
    res.status(403)
    return false
  }
  return true
}


function authRole(role) {
  return function(req, res, next) {
    if (req.user.role !== role) {
      res.status(401)
      return res.send('Not allowed')
    }

    next()
  }
}




const ROLE = {
  ADMIN: 'admin',
  BASIC: 'basic'
}



module.exports = {
  authUser,
  authUserBool,
  authRole,
  ROLE
}
