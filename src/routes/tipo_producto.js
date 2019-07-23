const express = require("express");
const router = express.Router();
const pool = require('../database'); //Pool refers to the connection to the database ✓

const { isLoggedIn, isNotloggedIn } = require('../lib/auth');

router.get('/tipo_producto', isLoggedIn, async (req, res) => {
    const tipo_de_productos = await pool.query('SELECT * FROM tipe_product');
    console.log(tipo_de_productos);
    res.render('tipo_producto/tipo_producto', {tipo_de_productos});
});

router.get('/editarproducto/:id_tipe_product', async (req, res) => {
    const {id_tipe_product} = req.params;
    const tipe_product = await pool.query('SELECT * FROM tipe_product WHERE id_tipe_product = ?', [id_tipe_product]);
    res.render('tipo_producto/editarproducto', {tipe_product: tipe_product[0]});
});


router.post('/editarproducto/:id_tipe_product', async (req,res) => {
    const {id_tipe_product} = req.params;
    const {titulo_tipo_producto, descripcion_tipo_producto} = req.body;
    const editTipeProduct = {
        titulo_tipo_producto,
        descripcion_tipo_producto
    };
    console.log(editTipeProduct);
    await pool.query('UPDATE tipe_product set ? WHERE id_tipe_product = ?', [editTipeProduct, id_tipe_product]);
    res.redirect('/tipo_producto/tipo_producto');
});


router.post('/tipo_producto', async (req,res) => {
    const {descripcion_tipo_producto, titulo_tipo_producto } = req.body;
    const newCategoryProduct = {
        descripcion_tipo_producto,
        titulo_tipo_producto
    };
    await pool.query('INSERT INTO tipe_product set ?', [newCategoryProduct]);
    req.flash('success', 'Se ha agregado una categoria nueva')
    res.redirect('/tipo_producto/tipo_producto');
});


module.exports = router;