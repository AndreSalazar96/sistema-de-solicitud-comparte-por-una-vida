const express = require("express");
const router = express.Router();
const pool = require('../database'); //Pool refers to the connection to the database ✓

const { isLoggedIn, isNotloggedIn } = require('../lib/auth');

router.get('/proveedores', isLoggedIn, async (req, res) => {
    const listaSolicitudProveedores = await pool.query('SELECT solicitud_proveedor.id_solicitud_proveedor, status.descripcion_status, tipo_usuario.descripcion_tipo_usuario, solicitud_proveedor.nombre_proveedor, solicitud_proveedor.direccion_proveedor, solicitud_proveedor.razon_proveedor, solicitud_proveedor.telefono_proveedor, solicitud_proveedor.correo_proveedor, solicitud_proveedor.empresa_proveedor, solicitud_proveedor.created_at FROM solicitud_proveedor INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = solicitud_proveedor.id_tipo_usuario INNER JOIN status ON status.id_status = solicitud_proveedor.id_status');
    res.render('proveedores/proveedores', {listaSolicitudProveedores});
});

router.get('/realizarDonacion', isLoggedIn, async (req, res) => {
    const datosDeUsuarioDonador = await pool.query('SELECT solicitud_proveedor.id_solicitud_proveedor, status.descripcion_status, tipo_usuario.descripcion_tipo_usuario, solicitud_proveedor.nombre_proveedor, solicitud_proveedor.direccion_proveedor, solicitud_proveedor.razon_proveedor, solicitud_proveedor.telefono_proveedor, solicitud_proveedor.correo_proveedor, solicitud_proveedor.empresa_proveedor, solicitud_proveedor.created_at FROM solicitud_proveedor INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = solicitud_proveedor.id_tipo_usuario INNER JOIN status ON status.id_status = solicitud_proveedor.id_status');
    console.log(datosDeUsuarioDonador[0]);
    res.render('proveedores/realizarDonacion', {datosDeUsuarioDonador: datosDeUsuarioDonador[0]});
});

router.get('/proveedoresForm', isNotloggedIn, async (req, res) => {
    res.render('proveedores/proveedoresForm');
});

router.get('/realizarDonacion', isLoggedIn, async (req, res) => {
    res.render('proveedores/realizarDonacion');
});


//Registro de solicitud de registro para donacion
router.post('/proveedoresForm', isNotloggedIn, async (req, res) => {
    const { nombre_proveedor, direccion_proveedor, empresa_proveedor, razon_proveedor, telefono_proveedor, correo_proveedor, id_tipo_usuario, id_status, created_at } = req.body;
    const datosProveedor = {
        nombre_proveedor,
        direccion_proveedor,
        razon_proveedor,
        telefono_proveedor,
        correo_proveedor,
        empresa_proveedor,
        created_at,
        id_tipo_usuario,
        id_status
    }
    await pool.query('INSERT INTO solicitud_proveedor set ?', [datosProveedor]);
    req.flash('success', 'Su solicitud ha sido enviada, se le estara notificando en las proximas horas mediante un correo electronico o llamada telefonica sus subscripción.');
    res.redirect('/proveedores/proveedoresForm');
});

// Editar solicitud proveedor
router.get('/updateproveedor/:id_solicitud_proveedor', async (req,res) => {
    const {id_solicitud_proveedor} = req.params;
    const listarProveedores = await pool.query('SELECT solicitud_proveedor.id_solicitud_proveedor, status.descripcion_status, tipo_usuario.descripcion_tipo_usuario, solicitud_proveedor.nombre_proveedor, solicitud_proveedor.direccion_proveedor, solicitud_proveedor.razon_proveedor, solicitud_proveedor.telefono_proveedor, solicitud_proveedor.correo_proveedor, solicitud_proveedor.empresa_proveedor, solicitud_proveedor.created_at FROM solicitud_proveedor INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = solicitud_proveedor.id_tipo_usuario INNER JOIN status ON status.id_status = solicitud_proveedor.id_status WHERE id_solicitud_proveedor = ?' , [id_solicitud_proveedor]);
    console.log(listarProveedores[0]);
    res.render('proveedores/updateproveedor', {listarProveedores: listarProveedores[0] });
});

router.post('/updateproveedor/:id_solicitud_proveedor', async (req,res) => {
    const {id_solicitud_proveedor} = req.params;
    await pool.query('UPDATE solicitud_proveedor SET id_status = 3 WHERE id_solicitud_proveedor = ?', [id_solicitud_proveedor]);
    req.flash('success', 'La solicitud de donacion a sido Aprobada');
    res.redirect('/proveedores/proveedores');
});

router.get('/anular/:id_solicitud_proveedor', async (req, res) => {
    const { id_solicitud_proveedor } = req.params;
    await pool.query('UPDATE solicitud_proveedor SET id_status = 4 WHERE id_solicitud_proveedor = ?', [id_solicitud_proveedor]);
    req.flash('success', 'La solicitud  de donacion a sido Anulada');
    res.redirect('/proveedores/proveedores');
});

router.get('/enproceso/:id_solicitud_proveedor', async (req, res) => {
    const { id_solicitud_proveedor } = req.params;
    await pool.query('UPDATE solicitud_proveedor SET id_status = 2 WHERE id_solicitud_proveedor = ?', [id_solicitud_proveedor]);
    req.flash('success', 'La solicitud de donacion a sido revisada y esta en proceso.');
    res.redirect('/proveedores/proveedores');
});


//Guardar datos de donacion
router.post('/proveedoresForm', isNotloggedIn, async (req, res) => {
    const { nombre_proveedor, direccion_proveedor, empresa_proveedor, razon_proveedor, telefono_proveedor, correo_proveedor, id_tipo_usuario, id_status, created_at } = req.body;
    const datosProveedor = {
        nombre_proveedor,
        direccion_proveedor,
        razon_proveedor,
        telefono_proveedor,
        correo_proveedor,
        empresa_proveedor,
        created_at,
        id_tipo_usuario,
        id_status
    }
    await pool.query('INSERT INTO solicitud_proveedor set ?', [datosProveedor]);
    req.flash('success', 'Su solicitud ha sido enviada, se le estara notificando en las proximas horas mediante un correo electronico o llamada telefonica sus subscripción.');
    res.redirect('/proveedores/proveedoresForm'); 
});




module.exports = router;

