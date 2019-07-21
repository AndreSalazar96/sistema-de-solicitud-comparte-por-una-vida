const express = require("express");
const router = express.Router();
const pool = require('../database'); //Pool refers to the connection to the database ✓

const {isLoggedIn, isNotloggedIn} = require('../lib/auth');

router.get('/listsolicitudes', isLoggedIn, async (req,res) => {
    const solicitudes = await pool.query('SELECT solicitudes.id_solicitudes, solicitudes.id_status, solicitudes.id_tipo_usuario, solicitudes.nombre_solicitante, solicitudes.ubicacion_solicitante, solicitudes.contacto, solicitudes.telefono, solicitudes.correo, solicitudes.create_at FROM solicitudes LEFT JOIN tipo_usuario ON tipo_usuario.descripcion = solicitudes.id_tipo_usuario LEFT JOIN status ON status.descripcion = solicitudes.id_status');
    res.render('solicitudes/listsolicitudes', {solicitudes}); 
});


module.exports = router;
