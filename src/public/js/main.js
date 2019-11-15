function filterTableFunction() {
    // Declare variables 
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


function filterTableFunctionList() {
    // Declare variables 
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


function login_no_login() {
    if ($('td').hasClass('solicitud-class-Aprobada')) {
        $('td.registro-accion-table.Aprobada').css({ 'display': 'block' });
    }
}
login_no_login();


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

