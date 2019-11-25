const express = require("express");
const router = express.Router();
const pool = require('../database'); //Pool refers to the connection to the database ✓
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);

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
    const listaDonaciones = await pool.query('SELECT status.descripcion_status, users.id_usuario, donaciones.id_usuario, donaciones.id_donaciones, donaciones.productname, donaciones.fechacaduc, donaciones.cantidadproduct, donaciones.descripcionproduct, donaciones.contacto, donaciones.ubicacion_solicitante, donaciones.direccion_entrega, donaciones.telefono, donaciones.correo, donaciones.identidicacioncaja, donaciones.create_at FROM donaciones INNER JOIN status ON status.id_status = donaciones.id_status INNER JOIN users ON users.id_usuario = donaciones.id_usuario WHERE users.id_usuario = ?', [req.user.id_usuario]);
    console.log(listaDonaciones);
    // Listado sin arreglo
    listaDonaciones.forEach(function (elemento, indice, array) {
        var dateActual = new Date();
        var stringDateactual = dateActual.getDate() + "/" + (dateActual.getMonth() + 1) + "/" + dateActual.getFullYear();
        //   console.log(stringDateactual + ' actual')
        var stringDate = elemento.create_at.getDate() + "/" + (elemento.create_at.getMonth() + 1) + "/" + elemento.create_at.getFullYear();
        if (stringDate === stringDateactual ) {
            
            const after = $('#carta-donacion').after('<p class="producto-donado-nuevo">Publicado Hoy</p>');
            console.log(after + ' Este registro es nuevo ' + stringDate);
        }
        //   console.log(stringDate + ' base de datos');
        // end conficion
    });
    // End Listado sin arreglo
    res.render('donaciones/listaDonaciones', { listaDonaciones });
});

// End Lista de donaciones

router.get('/editarDonacion/:id_donaciones', isLoggedIn, async (req, res) => {
    const { id_donaciones } = req.params
    const editarDonacion = await pool.query('SELECT donaciones.id_donaciones, donaciones.id_usuario, donaciones.productname, donaciones.fechacaduc, donaciones.cantidadproduct, donaciones.descripcionproduct, status.descripcion_status, donaciones.contacto, donaciones.ubicacion_solicitante, donaciones.direccion_entrega, donaciones.telefono, donaciones.correo, donaciones.identidicacioncaja, donaciones.create_at FROM donaciones INNER JOIN status ON status.id_status = donaciones.id_status WHERE id_donaciones = ?', [id_donaciones]);
    res.render('donaciones/editarDonacion', { editarDonacion: editarDonacion[0] });
});



module.exports = router;