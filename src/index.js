const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');


// Initializations
const app = express();

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//global Variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
  });


//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication')); //OJO SI ESTAS RUTAS ESTAN VACIAS LA TERMINAK DARA ERROR
app.use('/links', require('./routes/links'));// "" ""

//Public
app.use(express.static(path.join(__dirname, 'public')));

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'));
}); //Aqui usamos el puerto con la variable port