const express = require('express');
const router = express.Router();

const path = require('path')
const passport = require("passport");
require('dotenv').config();

const checkLoggedIn = require('./auth.middleware')

const CONFIG = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2
}

const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Use the google strategy for the ouath2 authorization flow
//This needs to be done before the passport chain to identify the chain of things to use.

passport.use(new GoogleStrategy({
  clientID: CONFIG.GOOGLE_CLIENT_ID,
  clientSecret: CONFIG.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
  //This is a
  function (accessToken, refreshToken, profile, done) {
    //You can use this object to store our user in the database.
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log('google profile', profile)
    //We call done to supply passport with the user that was authenticated
    done(null, profile)
  }
));

//Saving the session to the cookie
//We decide what to save from what comes back from google
passport.serializeUser((user, done) => {
  //Sets the user as the value of our session
  done(null, user)
})

//Reads the session from the cookie
passport.deserializeUser((obj, done) => {
  //Sets the whole object as the value set which is availbale via the req.user
  done(null, obj)
})

// const sessionConfig = {
//   secret: "thisismysecret",
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     httpOnly: true,
//     expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//     maxAge: 1000 * 60 * 60 * 24 * 7,
//   },
// };

// app.use(cookieSession({
//   name: 'session',
//   maxAge: 24 * 60 * 60 * 1000,
//   //it is stored as an array becoz we might need to change the key
//   //Changing the secret key will invalidate all the sessions
//   //We need our cooies to be signed by the server because we are using client side sessions
//   keys: [CONFIG.COOKIE_KEY_2, CONFIG.COOKIE_KEY_1]
// }))

// app.use(session(sessionConfig))

//This is to adds the passport middleware that helps us configure the passport session.
//NOTE:
//Passport has a function to serialize data to the session and it
//It also has another one to deserialize data from the session and sets the value of the cookie to something that has been made available to us by express
router.use(passport.initialize())
//validates that the session sent by the browser is true
//It also ensures that the deserialize function is called and that the req.user is populated
router.use(passport.session())

router.get('/google', passport.authenticate('google', {
  scope: ['email']
}))

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/failure',
  successRedirect: '/',
  session: true
}), (req, res) => {
  console.log('google called us back')
})

router.get('/logout', function (req, res, next) {
  // logout logic
  req.logout(() =>{
    return res.redirect('/')
  })
})

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

module.exports = router;