//Este documento me ayuda a definir otras URL
const express = require("express");
const router = express.Router();

const passport = require("passport");
const {isLoggedIn, isNotloggedIn} = require('../lib/auth');
const pool = require('../database');

router.get("/signup", isLoggedIn,async (req, res) => {
  const tipo_usuario = await pool.query('SELECT * FROM tipo_usuario');
  res.render("auth/signup", {tipo_usuario});
});

router.post("/signup", passport.authenticate("local.signup", {
    successRedirect: "/dashboard",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get('/signin', isNotloggedIn, (req, res) => {
    res.render('auth/signin');
  });

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get("/dashboard", isLoggedIn, (req, res) => {
  res.render('dashboard');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;
