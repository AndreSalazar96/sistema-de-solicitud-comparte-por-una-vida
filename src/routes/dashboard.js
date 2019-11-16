const express = require("express");
const router = express.Router();
const pool = require('../database'); //Pool refers to the connection to the database ✓

const { isLoggedIn, isNotloggedIn } = require('../lib/auth');

router.get('/listsolicitudes', isLoggedIn, async (req, res) => {
    const solicitudes = await pool.query('SELECT solicitudes.id_solicitudes, status.descripcion_status, tipo_usuario.descripcion_tipo_usuario, solicitudes.id_tipo_usuario, solicitudes.nombre_solicitante, solicitudes.ubicacion_solicitante, solicitudes.contacto, solicitudes.telefono, solicitudes.correo, solicitudes.razon_proveedor, solicitudes.create_at FROM solicitudes INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = solicitudes.id_tipo_usuario INNER JOIN status ON status.id_status = solicitudes.id_status WHERE id_tipo_solicitud = 2');
    console.log(solicitudes);
    res.render('dashboard', { solicitudes });
});


module.exports = router;