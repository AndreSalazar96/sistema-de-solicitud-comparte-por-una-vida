//Este documento me ayuda a definir otras URL
const express = require("express");
const router = express.Router();

const passport = require("passport");
const {isLoggedIn, isNotloggedIn} = require('../lib/auth');

router.get("/signup", isNotloggedIn, (req, res) => {
  //Este enrutador le dira al usuario que cuando visite podra ver un formulario
  res.render("auth/signup"); //renderizamos una vista
});

router.post("/signup", isNotloggedIn, passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get('/signin', isNotloggedIn, (req, res) => {
    res.render('auth/signin');
  });

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render('profile');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;
