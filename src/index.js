const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');


// Initializations
const app = express();

// settings
app.set('port', process.env.PORT || 5000); //aqui definimos el puerto con una condicion
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.use('view engine', '.hbs');

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//global Variables


//Routes
app.use(require('./routes'));

//Public


//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'));
}); //Aqui usamos el puerto con la variable port