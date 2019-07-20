const express = require('express');
const router = express.Router();

const pool = require('../database'); //Pool refers to the connection to the database ✓
const {isLoggedIn} = require('../lib/auth');

router.get('/add', isLoggedIn, (req,res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req,res) => {
    const { title, url, description } = req.body;
    const new_link = {
        title,
        url,
        description,
        user_id: req.user.id
    };  //CAPTAMOS EL OBJETO EN LA CONSOLA PARA SABER QUE ESTAMOS ALMACENANDO
    await pool.query('INSERT INTO links set ?', [new_link]); 
    req.flash('success', 'Producto guardado satisfactoriamente');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    console.log(links);
    res.render('links/list', { links });
});

router.get('/delete/:id', isLoggedIn, async (req,res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Producto removido satisfactoriamente'); //Modulo de connect flash
    res.redirect('/links');
});

router.get('/edit/:id', async (req,res) => {
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, description, url} = req.body; 
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Producto actualizado satisfactoriamente'); //Modulo de connect flash
    res.redirect('/links');
});

module.exports = router;