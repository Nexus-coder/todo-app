function checkLoggedIn(req, res, next) {
  let loggedIn = req.isAuthenticated() && req.user
  if (!loggedIn) {
    console.log('Not logged in')
    return res.status(401).json({
      error: 'Authorization required'
    })
  }
  next()
}

module.exports = checkLoggedIn