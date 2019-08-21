const express = require("express");
const router = express.Router();
const pool = require('../database'); //Pool refers to the connection to the database ✓

const { isLoggedIn, isNotloggedIn } = require('../lib/auth');

//RENDERIZA LA VISTA Y LA LISTA DE SOLICITUD DE PROVEEDORES
router.get('/lista_proveedores', isLoggedIn, async (req, res) => {
    const listaSolicitudProveedores = await pool.query('SELECT solicitudes.id_solicitudes, STATUS .descripcion_status, tipo_usuario.descripcion_tipo_usuario, solicitudes.id_tipo_usuario, solicitudes.nombre_solicitante, solicitudes.ubicacion_solicitante, solicitudes.contacto, solicitudes.telefono, solicitudes.correo, solicitudes.create_at FROM solicitudes INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = solicitudes.id_tipo_usuario INNER JOIN STATUS ON STATUS .id_status = solicitudes.id_status WHERE id_tipo_solicitud = 1');
    res.render('solicitud_proveedores/lista_proveedores', {listaSolicitudProveedores});
});

router.get('/realizarDonacion', isLoggedIn, async (req, res) => {
    const datosDeUsuarioDonador = await pool.query('SELECT solicitudes.id_solicitudes, STATUS .descripcion_status, tipo_usuario.descripcion_tipo_usuario, solicitudes.id_tipo_usuario, solicitudes.nombre_solicitante, solicitudes.ubicacion_solicitante, solicitudes.contacto, solicitudes.telefono, solicitudes.correo, solicitudes.create_at FROM solicitudes INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = solicitudes.id_tipo_usuario INNER JOIN STATUS ON STATUS .id_status = solicitudes.id_status WHERE id_tipo_solicitud = 1');
    console.log(datosDeUsuarioDonador[0]);
    res.render('solicitud_proveedores/realizarDonacion', {datosDeUsuarioDonador: datosDeUsuarioDonador[0]});
});

router.get('/proveedoresForm', isNotloggedIn, async (req, res) => {
    res.render('solicitud_proveedores/proveedoresForm');
});

router.get('/realizarDonacion', isLoggedIn, async (req, res) => {
    res.render('proveedores/realizarDonacion');
});


//Registro de solicitud de registro para donacion
router.post('/proveedoresForm', isNotloggedIn, async (req, res) => {
    const { contacto, ubicacion_solicitante, razon_proveedor, telefono, correo, nombre_solicitante, id_tipo_usuario, id_status, id_tipo_solicitud} = req.body;
    const datosProveedor = {
        contacto,
        ubicacion_solicitante,
        razon_proveedor,
        telefono,
        correo,
        nombre_solicitante,
        id_tipo_usuario,
        id_status,
        id_tipo_solicitud
    }
    await pool.query('INSERT INTO solicitudes set ?', [datosProveedor]);
    req.flash('success', 'Su solicitud ha sido enviada, se le estara notificando en las proximas horas mediante un correo electronico o llamada telefonica sus subscripción.');
    res.redirect('/solicitud_proveedores/proveedoresForm');
});

// Editar solicitud proveedor
router.get('/updateproveedor/:id_solicitudes', async (req,res) => {
    const {id_solicitudes} = req.params;
    const listarProveedores = await pool.query('SELECT solicitudes.id_solicitudes, status.descripcion_status, tipo_usuario.descripcion_tipo_usuario, solicitudes.contacto, solicitudes.ubicacion_solicitante, solicitudes.razon_proveedor, solicitudes.telefono, solicitudes.correo, solicitudes.nombre_solicitante, solicitudes.create_at FROM solicitudes INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = solicitudes.id_tipo_usuario INNER JOIN status ON status.id_status = solicitudes.id_status WHERE id_solicitudes = ?' , [id_solicitudes]);
    console.log(listarProveedores[0]);
    res.render('solicitud_proveedores/updateproveedor', {listarProveedores: listarProveedores[0] });
});

router.post('/updateproveedor/:id_solicitudes', async (req,res) => {
    const {id_solicitudes} = req.params;
    await pool.query('UPDATE solicitudes SET id_status = 3 WHERE id_solicitudes = ?', [id_solicitudes]);
    req.flash('success', 'La solicitud de donacion a sido Aprobada');
    res.redirect('/solicitud_proveedores/lista_proveedores');
});

router.get('/anular/:id_solicitudes', async (req, res) => {
    const { id_solicitudes } = req.params;
    await pool.query('UPDATE solicitudes SET id_status = 4 WHERE id_solicitudes = ?', [id_solicitudes]);
    req.flash('success', 'La solicitud  de donacion a sido Anulada');
    res.redirect('/solicitud_proveedores/lista_proveedores');
});

router.get('/enproceso/:id_solicitudes', async (req, res) => {
    const { id_solicitudes } = req.params;
    await pool.query('UPDATE solicitudes SET id_status = 2 WHERE id_solicitudes = ?', [id_solicitudes]);
    req.flash('success', 'La solicitud de donacion a sido revisada y esta en proceso.');
    res.redirect('/solicitud_proveedores/lista_proveedores');
});


//Registro de proveedor 
router.get('/auth/signup/:id_solicitudes', async (req,res) => {
    const { id_solicitudes } = req.params;
    const registro_proveedores = await pool.query('SELECT solicitudes.id_solicitudes, status.descripcion_status, tipo_usuario.id_tipo_usuario, tipo_usuario.descripcion_tipo_usuario, solicitudes.contacto, solicitudes.ubicacion_solicitante, solicitudes.razon_proveedor, solicitudes.telefono, solicitudes.correo, solicitudes.nombre_solicitante, solicitudes.create_at FROM solicitudes INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = solicitudes.id_tipo_usuario INNER JOIN status ON status.id_status = solicitudes.id_status WHERE id_solicitudes = ?', [id_solicitudes]);
    res.render('auth/signup', {registro_proveedores: registro_proveedores[0]});
});

//Guardar datos de donacion
router.post('/proveedoresForm', isNotloggedIn, async (req, res) => {
    const { contacto, ubicacion_solicitante, nombre_solicitante, razon_proveedor, telefono, correo, id_tipo_usuario, id_status, created_at } = req.body;
    const datosProveedor = {
        contacto,
        ubicacion_solicitante,
        razon_proveedor,
        telefono,
        correo,
        nombre_solicitante,
        created_at,
        id_tipo_usuario,
        id_status
    }
    await pool.query('INSERT INTO solicitudes set ?', [datosProveedor]);
    req.flash('success', 'Su solicitud ha sido enviada, se le estara notificando en las proximas horas mediante un correo electronico o llamada telefonica sus subscripción.');
    res.redirect('/solicitud_proveedores/proveedoresForm'); 
});




module.exports = router;

