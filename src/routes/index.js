// Almacenar rutas principales
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello word');
});
 
module.exports = router;