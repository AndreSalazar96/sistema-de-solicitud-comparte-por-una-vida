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
    if (Array.isArray(nuevaDonacion.productname)) {
        for (var i = 0; i < nuevaDonacion.productname.length; i++) {
            await pool.query('INSERT INTO donaciones set ?', { productname: productname[i], fechacaduc: fechacaduc[i], cantidadproduct: cantidadproduct[i], descripcionproduct: descripcionproduct[i], contacto, ubicacion_solicitante, direccion_entrega, telefono, correo, identidicacioncaja, id_usuario: req.user.id_usuario });
        }
    } else {
        await pool.query('INSERT INTO donaciones set ?', [nuevaDonacion]);
    }
    req.flash('success', 'Donacion guardada satisfactoriamente'); //Modulo de connect flash
    res.redirect('/donaciones/realizarDonacion/');

});

// Lista de donaciones
router.get('/listaDonaciones/', isLoggedIn, async (req, res) => {
    const listaDonaciones = await pool.query('SELECT status.descripcion_status, donaciones.id_usuario, donaciones.id_donaciones, donaciones.productname, donaciones.fechacaduc, donaciones.cantidadproduct, donaciones.descripcionproduct, donaciones.contacto, donaciones.ubicacion_solicitante, donaciones.direccion_entrega, donaciones.telefono, donaciones.correo, donaciones.identidicacioncaja, donaciones.create_at FROM donaciones INNER JOIN status ON status.id_status = donaciones.id_status');
    res.render('donaciones/listaDonaciones', { listaDonaciones });
});

router.get('/editarDonacion/:id_usuario', isLoggedIn, async (req, res) => {
    const editarDonacion = await pool.query('SELECT * FROM donaciones');
    res.render('donaciones/editarDonacion', { editarDonacion: editarDonacion[0] });
});



module.exports = router;