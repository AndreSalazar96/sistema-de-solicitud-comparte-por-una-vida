 // TEMPORAL
const express = require('express');
const router = express.Router();

const pool = require('../database'); //Pool refers to the connection to the database ✓

router.get('/add', (req,res) => {
    res.render('links/add');
});

router.post('/add', (req,res) => {
    res.send('Received');
});

module.exports = router;