const express = require("express");
const router = express.Router();
const pool = require('../database'); //Pool refers to the connection to the database ✓

const passport = require("passport");
const {isLoggedIn, isNotloggedIn} = require('../lib/auth');

router.get('/user', isLoggedIn, async (req, res) => {
    const list_users = await pool.query('SELECT users.id_usuario, tipo_usuario.descripcion_tipo_usuario, users.fullname, users.username, users.telefono, users.correo, users.direccion, users.nombre_razon, users.id_tipo_usuario, users.avatar_image FROM users INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = users.id_tipo_usuario');
    res.render('users/user', {list_users});
  });

  router.get('/updateuser/:id_usuario', isLoggedIn, async (req,res) => {
    // res.render('users/updateuser');
    const {id_usuario} = req.params;
    const listusers = await pool.query('SELECT users.id_usuario, tipo_usuario.descripcion_tipo_usuario, users.fullname, users.username, users.telefono, users.correo, users.direccion, users.nombre_razon, users.id_tipo_usuario, users.avatar_image FROM users INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = users.id_tipo_usuario WHERE id_usuario = ?', [id_usuario]);
    res.render('users/updateuser', {listusers: listusers[0]});  

  });

  router.post('/updateuser/:id_usuario', async (req,res) => {
    const {id_usuario} = req.params;
    const {fullname, username, nombre_razon, id_tipo_usuario, telefono, correo, direccion} = req.body;
    const editUser = {
      fullname,
      username,
      nombre_razon,
      id_tipo_usuario,
      telefono,
      correo,
      direccion
    };
    console.log(editUser);
    await pool.query('UPDATE users set ? WHERE id_usuario = ?', [editUser, id_usuario]);
    res.redirect('/users/user')
  });


module.exports = router;