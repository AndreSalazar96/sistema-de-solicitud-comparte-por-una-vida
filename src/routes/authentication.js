//Este documento me ayuda a definir otras URL
const express = require("express");
const router = express.Router();

const passport = require("passport");

router.get("/signup", (req, res) => {
  //Este enrutador le dira al usuario que cuando visite podra ver un formulario
  res.render("auth/signup"); //renderizamos una vista
});

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get('/signin', (req, res) => {
    res.render('auth/signin');
  });

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get("/profile", (req, res) => {
  res.send("this is your profile");
});

module.exports = router;
