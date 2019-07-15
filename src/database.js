const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys'); //solo agarramos el objeto database que necesitamos

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTON WAS CLOSED ');
        }
        if(err.code === 'ER_CON_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTION ☃');
        }
        if(err.cde === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED ✘');
        }
    }

    if (connection) connection.release();
    console.log('Server and database is connected ❤'); // JEJEJE.. excuse me for the ❤ 

    return;
});

// Promisify pool querys
pool.query = promisify(pool.query);

module.exports = pool;