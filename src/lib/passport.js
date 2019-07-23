const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');


passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      done(null, user, req.flash('success', 'Bienvenido ' + user.username));
    } else {
      done(null, false, req.flash('message', 'Contrasena Incorrecta'));
    }
  } else {
    return done(null, false, req.flash('message', 'El usuario no  existe.'));
  }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const {fullname,nombre_razon,id_tipo_usuario,direccion,telefono,correo,avatar_image} = req.body;
    const newUser = {
        username,
        password,
        fullname,
        nombre_razon,
        id_tipo_usuario,
        direccion,
        telefono,
        correo,
        avatar_image
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ? ', newUser);
    newUser.id_usuario = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user,done) => {
    done(null, user.id_usuario);
});

passport.deserializeUser(async (id_usuario,done) => {
    const rows =  await pool.query('SELECT * FROM users WHERE id_usuario = ?', [id_usuario]);
    done(null, rows[0]);
});
