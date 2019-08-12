const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash'); 
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const {database} = require('./keys');


// Initializations
const app = express();
require('./lib/passport');

// settings
app.set('port', process.env.PORT || 5000);// Aqui cofiguramos el puerto
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

//middleware
app.use(session({
  secret: 'swcpuv',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//global Variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
  });


//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/products', require('./routes/products'));
app.use('/solicitud_proveedores', require('./routes/solicitud_proveedores'));
app.use('/users', require('./routes/listusers'));
app.use('/solicitudes', require('./routes/listsolicitudes'));
app.use('/tipo_producto', require('./routes/tipo_producto'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'));
}); //Aqui usamos el puerto con la variable port