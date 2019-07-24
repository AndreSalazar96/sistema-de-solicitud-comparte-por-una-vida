// Almacenar rutas principales
const express = require('express');
const router = express.Router();
const passport = require("passport");
const {isLoggedIn, isNotloggedIn} = require('../lib/auth');

const pool = require('../database');

router.get('/',  isNotloggedIn, (req, res) => {
    res.render('index');
});

//Registro de solicitud de ayuda humanitaria
router.post('/', isNotloggedIn, async (req,res) =>{
    console.log(req.body);
    const {id_status, id_tipo_usuario, nombre_solicitante , ubicacion_solicitante, contacto, telefono, correo} = req.body;
    const new_solicitud = {
        id_status,
        id_tipo_usuario,
        nombre_solicitante,
        ubicacion_solicitante,
        contacto,
        telefono,
        correo
    };

    await pool.query('INSERT INTO solicitudes set ?', [new_solicitud]);
    req.flash('success', 'Su solicitud ha sido enviada con exito, la fundacion se estara comunicando con usted.')
    res.redirect('/');
});
 
module.exports = router;