// Almacenar rutas principales
const express = require('express');
const router = express.Router();
const passport = require("passport");
const {isLoggedIn, isNotloggedIn} = require('../lib/auth');

router.get('/',  isNotloggedIn, (req, res) => {
    res.render('index');
});
 
module.exports = router;