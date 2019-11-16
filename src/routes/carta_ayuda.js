const express = require("express");
const router = express.Router();
const pool = require('../database'); //Pool refers to the connection to the database ✓

const { isLoggedIn, isNotloggedIn } = require('../lib/auth');
//  -------------------------------------------------------------------

//Realizar carta
router.get('/formulario-ayuda-humanitaria', isLoggedIn, (req, res) => {
    res.render('ayuda-humanitaria/formulario-ayuda-humanitaria');
});

router.get('/formulario-ayuda-humanitaria/:id_usuario', isLoggedIn, async (req, res) => {
    const { id_usuario } = req.params;
    const info_carta = await pool.query('SELECT * FROM users WHERE id_usuario = ?', [id_usuario]);
    res.render('ayuda-humanitaria/formulario-ayuda-humanitaria', { info_carta: info_carta[0] });
});


router.post('/formulario-ayuda-humanitaria', isLoggedIn, async (req,res) => {
        const {fullname, direccion, telefono, correo, descripcion, nombre_razon, id_tipo_usuario } = req.body;
        const newCartHelp = {
            id_usuario: req.user.id_usuario,
            fullname,
            direccion,
            telefono,
            correo,
            descripcion,
            nombre_razon,
            id_tipo_usuario
        }
        await pool.query('INSERT INTO cartas_ayuda set ? ', [newCartHelp]);
        req.flash('success', 'Carta enviada satisfactoriamente'); 
        res.redirect('/ayuda-humanitaria/formulario-ayuda-humanitaria');
});


//Lista de cartas
router.get('/lista-ayuda-humanitaria', isLoggedIn, async (req,res) => {
    const cart_list = await pool.query('SELECT cartas_ayuda.id_cartas_ayuda, cartas_ayuda.id_usuario, cartas_ayuda.created_at, cartas_ayuda.fullname, cartas_ayuda.telefono, cartas_ayuda.telefono, cartas_ayuda.correo, cartas_ayuda.nombre_razon, cartas_ayuda.direccion, cartas_ayuda.created_at, status.descripcion_status, tipo_usuario.descripcion_tipo_usuario FROM cartas_ayuda INNER JOIN status ON status.id_status = cartas_ayuda.id_status INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = cartas_ayuda.id_tipo_usuario');
    res.render('ayuda-humanitaria/lista-ayuda-humanitaria', { cart_list });
});


router.get('/status-ayuda-humanitaria/:id_cartas_ayuda', isLoggedIn, async (req, res) => {
    const { id_cartas_ayuda } = req.params;
    const cartas_ayuda = await pool.query('SELECT * FROM cartas_ayuda WHERE id_cartas_ayuda = ?', [id_cartas_ayuda] );
    console.log(cartas_ayuda[0]);
    res.render('ayuda-humanitaria/status-ayuda-humanitaria', { cartas_ayuda: cartas_ayuda[0] });
});

// Status

// router.post('/aprobar/:id_cartas_ayuda', async (req,res) =>{
//     const { id_cartas_ayuda } = req.params;
//     await pool.query('UPDATE cartas_ayuda SET id_status = 3 WHERE id_cartas_ayuda = ?', [id_cartas_ayuda]);
//     req.flash('success', 'La carta  a sido Aprobada');
//     res.redirect('/ayuda-humanitaria/lista-ayuda-humanitaria');
// });

router.get('/aprobar/:id_cartas_ayuda', async (req, res) => {
    const { id_cartas_ayuda } = req.params;
    await pool.query('UPDATE cartas_ayuda SET id_status = 3 WHERE id_cartas_ayuda = ?', [id_cartas_ayuda]);
    req.flash('success', 'La carta  a sido Anulada');
    res.redirect('/ayuda-humanitaria/lista-ayuda-humanitaria');
});



router.get('/anular/:id_cartas_ayuda', async (req, res) => {
    const { id_cartas_ayuda } = req.params;
    await pool.query('UPDATE cartas_ayuda SET id_status = 4 WHERE id_cartas_ayuda = ?', [id_cartas_ayuda]);
    req.flash('success', 'La carta  a sido Anulada');
    res.redirect('/ayuda-humanitaria/lista-ayuda-humanitaria');
});

router.get('/enproceso/:id_cartas_ayuda', async (req, res) => {
    const { id_cartas_ayuda } = req.params;
    await pool.query('UPDATE cartas_ayuda SET id_status = 2 WHERE id_cartas_ayuda = ?', [id_cartas_ayuda]);
    req.flash('success', 'La carta a sido revisada y esta en proceso a ser aprobada');
    res.redirect('/ayuda-humanitaria/lista-ayuda-humanitaria');
});




module.exports = router;