const express = require('express');
const router = express.Router();

const pool = require('../database'); //Pool refers to the connection to the database ✓

router.get('/add', (req,res) => {
    res.render('links/add');
});

router.post('/add', async (req,res) => {
    const { title, url, description } = req.body;
    const new_link = {
        title,
        url,
        description
    };  //CAPTAMOS EL OBJETO EN LA CONSOLA PARA SABER QUE ESTAMOS ALMACENANDO
    // console.log(new_link); // aqui recibo el objeto 
    await pool.query('INSERT INTO links set ?', [new_link]); 
    res.redirect('/links');
});

router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    // console.log(links);
    res.render('links/list', { links });
});

router.get('/delete/:id', async (req,res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    res.redirect('/links');
});

router.get('/edit/:id', async (req,res) => {
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, url} = req.body; 
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated Successfully'); //Modulo de connect flash
    res.redirect('/links');
});

module.exports = router;