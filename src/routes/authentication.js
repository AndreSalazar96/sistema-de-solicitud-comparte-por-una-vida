//Este documento me ayuda a definir otras URL
const express = require("express");
const router = express.Router();

const passport = require("passport");
const { isLoggedIn, isNotloggedIn } = require('../lib/auth');
const pool = require('../database');

router.get("/signup", isLoggedIn, async (req, res) => {
  const tipo_usuario = await pool.query('SELECT * FROM tipo_usuario');
  res.render("auth/signup", { tipo_usuario });
});

router.post("/signup", passport.authenticate("local.signup", {
  successRedirect: "/dashboard",
  failureRedirect: "/signup",
  failureFlash: true
})
);

router.get('/signin', isNotloggedIn, (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

router.get("/dashboard", isLoggedIn, async (req, res) => {
  // admin dashboar information
  const solicitudes = await pool.query('SELECT solicitudes.id_solicitudes, status.descripcion_status, tipo_usuario.descripcion_tipo_usuario, solicitudes.id_tipo_usuario, solicitudes.nombre_solicitante, solicitudes.ubicacion_solicitante, solicitudes.contacto, solicitudes.telefono, solicitudes.correo, solicitudes.razon_proveedor, solicitudes.create_at FROM solicitudes INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = solicitudes.id_tipo_usuario INNER JOIN status ON status.id_status = solicitudes.id_status WHERE id_tipo_solicitud = 2');
  const cart_list = await pool.query('SELECT cartas_ayuda.id_cartas_ayuda, cartas_ayuda.id_usuario, cartas_ayuda.created_at, cartas_ayuda.fullname, cartas_ayuda.telefono, cartas_ayuda.telefono, cartas_ayuda.correo, cartas_ayuda.nombre_razon, cartas_ayuda.direccion, cartas_ayuda.created_at, status.descripcion_status, tipo_usuario.descripcion_tipo_usuario FROM cartas_ayuda INNER JOIN status ON status.id_status = cartas_ayuda.id_status INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = cartas_ayuda.id_tipo_usuario');
  const listaDonaciones = await pool.query('SELECT status.descripcion_status, donaciones.id_usuario, donaciones.id_donaciones, donaciones.productname, donaciones.fechacaduc, donaciones.cantidadproduct, donaciones.descripcionproduct, donaciones.contacto, donaciones.ubicacion_solicitante, donaciones.direccion_entrega, donaciones.telefono, donaciones.correo, donaciones.identidicacioncaja, donaciones.create_at FROM donaciones INNER JOIN status ON status.id_status = donaciones.id_status');
  const listaSolicitudProveedores = await pool.query('SELECT solicitudes.id_solicitudes, status.descripcion_status, tipo_usuario.descripcion_tipo_usuario, solicitudes.id_tipo_usuario, solicitudes.nombre_solicitante, solicitudes.ubicacion_solicitante, solicitudes.contacto, solicitudes.telefono, solicitudes.correo, solicitudes.create_at FROM solicitudes INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = solicitudes.id_tipo_usuario INNER JOIN status ON status .id_status = solicitudes.id_status WHERE id_tipo_solicitud = 1');
  // End admin dashboar information
  
  // solicitante dashboard information
  // End solicitante dashboard information
  res.render('dashboard', { solicitudes, cart_list, listaDonaciones, listaSolicitudProveedores});
});

router.get('/dashboard/:id_cartas_ayuda', isLoggedIn, async (req, res) => {
  const { id_cartas_ayuda } = req.params;
  const cartas_ayuda = await pool.query('SELECT * FROM cartas_ayuda WHERE id_cartas_ayuda = ?', [id_cartas_ayuda] );
  console.log(cartas_ayuda[0]);
  res.render('/dashboard', { cartas_ayuda: cartas_ayuda[0] });
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logOut();
  res.redirect('/signin');
});

module.exports = router;
