const express = require("express");
const router = express.Router();
const pool = require('../database'); //Pool refers to the connection to the database ✓

const { isLoggedIn, isNotloggedIn } = require('../lib/auth');

router.get('/realizarDonacion', isLoggedIn, async (req, res) => {
    res.render('donaciones/realizarDonacion');
});

router.get('/realizarDonacion/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const usuarioDonador = await pool.query('SELECT * FROM users WHERE id_usuario = ?', [id_usuario]);
    res.render('donaciones/realizarDonacion', { usuarioDonador: usuarioDonador[0] });
});

//Guardar datos de donacion
router.post('/realizarDonaciones', isLoggedIn, async (req, res) => {
    const { productname, fechacaduc, cantidadproduct, descripcionproduct, contacto, ubicacion_solicitante, direccion_entrega, telefono, correo, identidicacioncaja } = req.body
    const nuevaDonacion = {
        productname,
        fechacaduc,
        cantidadproduct,
        descripcionproduct,
        contacto,
        ubicacion_solicitante,
        direccion_entrega,
        telefono,
        correo,
        identidicacioncaja,
        id_usuario: req.user.id_usuario
    }

        await pool.query("INSERT INTO donaciones (productname, fechacaduc, cantidadproduct, descripcionproduct, contacto, ubicacion_solicitante, direccion_entrega, telefono, correo, identidicacioncaja) VALUES ('" + productname + "', '" + fechacaduc + "', '" + cantidadproduct + "', '" + descripcionproduct + "', '" + contacto + "', '" + ubicacion_solicitante + "', '" + direccion_entrega + "', '" + telefono + "', '" + correo + "', '" + identidicacioncaja + "');");
        console.log(nuevaDonacion);
        res.send('recibido');    
});



module.exports = router;