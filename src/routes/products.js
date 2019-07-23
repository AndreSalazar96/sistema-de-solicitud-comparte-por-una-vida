const express = require('express');
const router = express.Router();

const pool = require('../database'); //Pool refers to the connection to the database ✓
const {isLoggedIn} = require('../lib/auth');

router.get('/add', isLoggedIn, (req,res) => {
    res.render('products/add');
});

router.post('/add', isLoggedIn, async (req,res) => {
    const { title, fecha_caducidad, id_tipe_product, cantidad_producto, description, id_status  } = req.body;
    const new_product = {
        title,
        fecha_caducidad,
        id_tipe_product,
        cantidad_producto,
        description,
        id_status,
        user_id: req.user.id_usuario
    };  //CAPTAMOS EL OBJETO EN LA CONSOLA PARA SABER QUE ESTAMOS ALMACENANDO
    await pool.query('INSERT INTO products set ?', [new_product]); 
    req.flash('success', 'Producto guardado satisfactoriamente');
    res.redirect('/products');
});

router.get('/', isLoggedIn, async (req, res) => {
    const products = await pool.query('SELECT * FROM products WHERE user_id = ?', [req.user.id_usuario]);
    console.log(products);
    res.render('products/list', { products });
});

router.get('/delete/:id_product', isLoggedIn, async (req,res) => {
    const {id_product} = req.params;
    await pool.query('DELETE FROM products WHERE id_product = ?', [id_product]);
    req.flash('success', 'Producto removido satisfactoriamente'); //Modulo de connect flash
    res.redirect('/products');
});

router.get('/edit/:id_product', async (req,res) => {
    const {id_product} = req.params;
    const products = await pool.query('SELECT * FROM products WHERE id_product = ?', [id_product]);
    res.render('products/edit', {product: products[0]});
});

router.post('/edit/:id_product', isLoggedIn, async (req, res) => {
    const { id_product } = req.params;
    const { title, fecha_caducidad, id_tipe_product, cantidad_producto, description, id_status} = req.body; 
    const newProduct = {
        title,
        fecha_caducidad,
        id_tipe_product,
        cantidad_producto,
        description,
        id_status,
        user_id: req.user.id_usuario
    };
    await pool.query('UPDATE products set ? WHERE id_product = ?', [newProduct, id_product]);
    req.flash('success', 'Producto actualizado satisfactoriamente'); //Modulo de connect flash
    res.redirect('/products');
});

module.exports = router;