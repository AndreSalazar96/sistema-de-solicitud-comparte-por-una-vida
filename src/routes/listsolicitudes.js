const express = require("express");
const router = express.Router();
const pool = require('../database'); //Pool refers to the connection to the database ✓

const { isLoggedIn, isNotloggedIn } = require('../lib/auth');

router.get('/listsolicitudes', isLoggedIn, async (req, res) => {
    const solicitudes = await pool.query('SELECT solicitudes.id_solicitudes, status.descripcion_status, tipo_usuario.descripcion_tipo_usuario, solicitudes.id_tipo_usuario, solicitudes.nombre_solicitante, solicitudes.ubicacion_solicitante, solicitudes.contacto, solicitudes.telefono, solicitudes.correo, solicitudes.razon_proveedor, solicitudes.create_at FROM solicitudes INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = solicitudes.id_tipo_usuario INNER JOIN status ON status.id_status = solicitudes.id_status WHERE id_tipo_solicitud = 2');
    res.render('solicitudes/listsolicitudes', { solicitudes });
});


router.get('/anular/:id_solicitudes', async (req, res) => {
    const { id_solicitudes } = req.params;
    await pool.query('UPDATE solicitudes SET id_status = 4 WHERE id_solicitudes = ?', [id_solicitudes]);
    req.flash('success', 'La solicitud  a sido Anulada');
    res.redirect('/solicitudes/listsolicitudes');
});

router.get('/enproceso/:id_solicitudes', async (req, res) => {
    const { id_solicitudes } = req.params;
    await pool.query('UPDATE solicitudes SET id_status = 2 WHERE id_solicitudes = ?', [id_solicitudes]);
    req.flash('success', 'La solicitud a sido revisada y esta en proceso a ser aprobada');
    res.redirect('/solicitudes/listsolicitudes');
});

router.get('/editarsolicitud/:id_solicitudes', async(req,res) => {
    const {id_solicitudes} = req.params;
    const solicitudes = await pool.query('SELECT solicitudes.id_solicitudes, status.descripcion_status, tipo_usuario.descripcion_tipo_usuario, solicitudes.id_tipo_usuario, solicitudes.nombre_solicitante, solicitudes.ubicacion_solicitante, solicitudes.razon_proveedor, solicitudes.contacto, solicitudes.telefono, solicitudes.correo, solicitudes.create_at FROM solicitudes INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = solicitudes.id_tipo_usuario INNER JOIN status ON status.id_status = solicitudes.id_status WHERE id_solicitudes = ?', [id_solicitudes]);
    res.render('solicitudes/editarsolicitud', {solicitud: solicitudes[0]});
});

router.post('/editarsolicitud/:id_solicitudes', async (req,res) =>{
    const { id_solicitudes } = req.params;
    await pool.query('UPDATE solicitudes SET id_status = 3 WHERE id_solicitudes = ?', [id_solicitudes]);
    req.flash('success', 'La solicitud  a sido Aprobada');
    res.redirect('/solicitudes/listsolicitudes');
});

//Registro de solicitante 
router.get('/auth/signup/:id_solicitudes', async (req,res) => {
    const { id_solicitudes } = req.params;
    const registro_proveedores = await pool.query('SELECT solicitudes.id_solicitudes, status.descripcion_status, tipo_usuario.id_tipo_usuario, tipo_usuario.descripcion_tipo_usuario, solicitudes.contacto, solicitudes.ubicacion_solicitante, solicitudes.razon_proveedor, solicitudes.telefono, solicitudes.correo, solicitudes.nombre_solicitante, solicitudes.create_at FROM solicitudes INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = solicitudes.id_tipo_usuario INNER JOIN status ON status.id_status = solicitudes.id_status WHERE id_solicitudes = ?', [id_solicitudes]);
    res.render('auth/signup', {registro_proveedores: registro_proveedores[0]});
});



module.exports = router;
