
//search tabla
function filtertable() {
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr.tr-content").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}
filtertable();
//End search tabla


// gif

function aprobacionCarta(){
	if($('strong').hasClass('solicitud-class-Aprobada')){
		$( "strong.solicitud-class-Aprobada" ).after( "<img src='/img/tenor.gif'>" );
	}else{
        console.log('nope');
	}
}
aprobacionCarta();

// End gif


// a href active
function ahrefActive() {
    var loc = window.location.pathname;
    $('ul.nav.flex-column.main-vertical-menu').find('a').each(function () {
        $(this).toggleClass('active', $(this).attr('href') == loc);
    });
    
}

ahrefActive();
// end a href active


//Button login table
function login_no_login() {
    if ($('td').hasClass('solicitud-class-Aprobada')) {
        $('td.registro-accion-table.Aprobada').css({ 'display': 'block' });
    }
}
login_no_login();
//End button login table



//Each product donaciones
var addProductFormEl = document.getElementById('addProductForm'),
    productNameInputEl = document.getElementById('productName'),
    productDateInputEl = document.getElementById('fechCaduc'),
    productCantInputEl = document.getElementById('cantidad'),
    productDescriptiEl = document.getElementById('descripcion'),
    btnSubmitEl = document.getElementById('btnSubmit'),
    productsEl = document.getElementById('products')

var counter = (function () {
    var count = 3

    return {
        increment: function () {
            return count++
        }
    }
})()

function Product(productName, fechacaduc, cantidadproduct, descripcionproduct) {
    this.id = +new Date()
    this.productName = productName
    this.fechacaduc = fechacaduc
    this.cantidadproduct = cantidadproduct
    this.descripcionproduct = descripcionproduct
    this.count = counter.increment()
}

function UI() { }

UI.prototype.addProduct = function (productName, fechacaduc, cantidadproduct, descripcionproduct) {
    var product = new Product(productName, fechacaduc, cantidadproduct, descripcionproduct),
        html = document.createElement('div')

    html.id = product.id
    html.className = 'card my-2 p-2 col-md-6'
    html.innerHTML =
        '<div class="card-title">Producto &#8470; ' +
        product.count +
        '</br>ID: ' +
        product.id +
        '</div>' +
        '<div class="form-group">' +
        '<input type="text" class="form-control" value="' +
        product.productName +
        '" name="productname">' +
        '</div>' +
        '<div class="form-group">' +
        '<input type="date" class="form-control" value="' +
        product.fechacaduc +
        '" name="fechacaduc">' +
        '</div>' +
        '<div class="form-group">' +
        '<input type="number" class="form-control" value="' +
        product.cantidadproduct +
        '" name="cantidadproduct">' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea class="form-control" name="descripcionproduct">' + product.descripcionproduct + '</textarea>' +
        '</br>' +
        '<button class="btn btn-danger" data-id="' +
        product.id +
        '">Borrar Producto &#8470; ' +
        product.count +
        '</button>'

    productsEl.insertBefore(html, productsEl.childNodes[0])
}

UI.prototype.clearFormFields = function () {
    productNameInputEl.value = ''
    productDateInputEl.value = ''
    productCantInputEl.value = ''
    productDescriptiEl.value = ''
    productNameInputEl.focus()
}

UI.prototype.deleteProduct = function (id) {
    document.getElementById(id).remove()
}

addProductFormEl.addEventListener('submit', function (e) {
    e.preventDefault()

    var productName = productNameInputEl.value,
        fechacaduc = productDateInputEl.value
    cantidadproduct = productCantInputEl.value
    descripcionproduct = productDescriptiEl.value

    if (!productName || !fechacaduc || !cantidadproduct || !descripcionproduct) {
        return false
    }

    var ui = new UI()
    ui.addProduct(productName, fechacaduc, cantidadproduct, descripcionproduct)
    // alert('Se agrego el producto ' + productName);
    ui.clearFormFields()

})

productsEl.addEventListener('click', function (e) {
    e.preventDefault()
    if (e.target.className === 'btn btn-danger') {
        var ui = new UI()
        ui.deleteProduct(e.target.getAttribute('data-id'))
    }
})


// Disable button donacion

function validateInput() {
    document.getElementById('btn-donaciones').disabled = !document.getElementById('productName').value.length;
    document.getElementById('btn-donaciones').disabled = !document.getElementById('fechCaduc').value.length;
    document.getElementById('btn-donaciones').disabled = !document.getElementById('cantidad').value.length;
    document.getElementById('btn-donaciones').disabled = !document.getElementById('descripcion').value.length;
}

validateInput();

// End Each product donaciones



