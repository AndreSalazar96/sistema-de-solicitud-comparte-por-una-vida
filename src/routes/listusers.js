const express = require("express");
const router = express.Router();
const pool = require('../database'); //Pool refers to the connection to the database ✓

const passport = require("passport");
const {isLoggedIn, isNotloggedIn} = require('../lib/auth');

router.get('/user', isLoggedIn, (req, res) => {
    res.render('users/user');
  });

  router.get('/updateuser', isLoggedIn, (req,res) => {
    res.render('users/updateuser');
  });


module.exports = router;