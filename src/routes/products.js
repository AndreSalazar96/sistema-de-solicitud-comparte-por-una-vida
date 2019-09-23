const express = require('express');
const router = express.Router();

const pool = require('../database'); //Pool refers to the connection to the database ✓
const {isLoggedIn} = require('../lib/auth');


// MOSTRAR VISTA PARA AGREGAR PRODUCTOS
router.get('/add', isLoggedIn, async (req,res) => {
    const tipe_product = await pool.query('SELECT tipe_product.id_tipe_product, tipe_product.descripcion_tipo_producto, tipe_product.titulo_tipo_producto from tipe_product');
    const status = await pool.query("SELECT status.id_status, status.descripcion_status FROM status WHERE status.tabla_padre = 'products'");
    res.render('products/add', {tipe_product, status});
});
//-----------------------------------


//AQUI HAGO LA CONSULTA PARA AGREGAR PRODUCTOS. NOTA: id_tipe_product y id_status no estan en newProduct porque no estan siendo listados por ser campos de otra tabla
router.post('/add', isLoggedIn, async (req,res) => {
    const {title, fecha_caducidad, id_tipe_product, cantidad_producto, description, id_status } = req.body;
    const newProduct = {
        id_tipe_product,
        id_status,
        title,
        fecha_caducidad,
        cantidad_producto,
        description,
        user_id: req.user.id_usuario
    };
    console.log(newProduct);
    console.log(req.file);
    await pool.query('INSERT INTO products set ?', [newProduct]);
    req.flash('success', 'Producto guardado satisfactoriamente');
    res.redirect('/products');
});
//-------------------------------------------


//AQUI MUESTRO LA LISTA DE PRODUCTOS EXISTENTES
router.get('/', isLoggedIn, async (req, res) => {
    const products = await pool.query('SELECT users.fullname, users.username, products.id_product, products.title, products.fecha_caducidad, products.description, products.created_at, products.cantidad_producto from products INNER JOIN users ON products.user_id = users.id_usuario');
    res.render('products/list', { products });
});
//---------------------------------------------


// ELIMINAR PRODUCTO
router.get('/delete/:id_product', isLoggedIn, async (req,res) => {
    const {id_product} = req.params;
    await pool.query('DELETE FROM products WHERE id_product = ?', [id_product]);
    req.flash('success', 'Producto removido satisfactoriamente'); //Modulo de connect flash
    res.redirect('/products');
});
//------------------


//PROCESO PARA EDITAR PRODUCTO, PRIMERO LO LISTO EN UNA VISTA Y POSTERIORMENTE HAGO UN UPDATE PARA EDITAR LOS CAMPOS
router.get('/edit/:id_product', async (req,res) => {
     const {id_product} = req.params;
     const products = await pool.query('SELECT products.id_product, tipe_product.titulo_tipo_producto, status.descripcion_status, products.title, products.fecha_caducidad, products.description, products.user_id, products.created_at, products.cantidad_producto FROM products INNER JOIN tipe_product ON tipe_product.id_tipe_product = products.id_tipe_product INNER JOIN status ON status.id_status = products.id_status WHERE id_product = ?', [id_product]);
     const categoria_producto = await pool.query('SELECT * FROM tipe_product');
     const status_product = await pool.query('SELECT * FROM status  WHERE tabla_padre = "products"');
     res.render('products/edit', {product: products[0], categoria_producto, status_product});
});

router.post('/edit/:id_product', isLoggedIn, async (req, res) => {
    const { id_product } = req.params;
    const { title, fecha_caducidad, id_tipe_product, cantidad_producto, description, id_status} = req.body; 
    const newProduct = {
        title,
        fecha_caducidad,
        cantidad_producto,
        description,
        id_tipe_product,
        id_status,
        user_id: req.user.id_usuario
    };
    await pool.query('UPDATE products set ? WHERE id_product = ?', [newProduct, id_product]);
    req.flash('success', 'Producto actualizado satisfactoriamente'); //Modulo de connect flash
    res.redirect('/products');
});



//---------------------------------------------------------------------------------

module.exports = router;