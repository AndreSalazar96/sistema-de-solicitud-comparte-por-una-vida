const express = require("express");
const router = express.Router();
const pool = require('../database'); //Pool refers to the connection to the database ✓

const { isLoggedIn, isNotloggedIn } = require('../lib/auth');

router.get('/realizarDonacion', isLoggedIn, async (req, res) => {
    res.render('donaciones/realizarDonacion');
});

router.get('/realizarDonacion/:id_usuario', async (req, res) => {
    const  { id_usuario } = req.params;
    const usuarioDonador = await pool.query('SELECT * FROM users WHERE id_usuario = ?', [id_usuario]);
    console.log(usuarioDonador[0])
    res.render('donaciones/realizarDonacion', {usuarioDonador: usuarioDonador[0]});
});

//Guardar datos de donacion
router.post('/proveedoresForm', isNotloggedIn, async (req, res) => {
    const {  } = req.body;
    const donacion = {

    }
    await pool.query('INSERT INTO donacion_proveedor set ?', [datosProveedor]);
    req.flash('success', 'Su solicitud ha sido enviada, se le estara notificando en las proximas horas mediante un correo electronico o llamada telefonica sus subscripción.');
    res.redirect('/donaciones/proveedoresForm'); 
});



module.exports = router;