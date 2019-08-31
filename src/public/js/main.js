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


function addProductEach() {
    var addProductFormEl = document.getElementById('addProductForm'),
        productNameInputEl = document.getElementById('productName'),
        productPriceInputEl = document.getElementById('productPrice'),
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

    function Product(name, price) {
        this.id = +new Date()
        this.name = name
        this.price = price
        this.count = counter.increment()
    }

    function UI() { }

    UI.prototype.addProduct = function (name, price) {
        var product = new Product(name, price),
            html = document.createElement('div')

        html.id = product.id
        html.className = 'card my-2 p-2'
        html.innerHTML =
            '<div class="card-title">Item &#8470; ' +
            product.count +
            '</br>ID: ' +
            product.id +
            '</div>' +
            '<div class="form-group">' +
            '<input type="text" class="form-control" value="' +
            product.name +
            '">' +
            '</div>' +
            '<div class="form-group">' +
            '<input type="number" class="form-control" value="' +
            product.price +
            '">' +
            '</div>' +
            '<button class="btn btn-danger" data-id="' +
            product.id +
            '">Remove item &#8470; ' +
            product.count +
            '</button>'

        productsEl.insertBefore(html, productsEl.childNodes[0])
    }

    UI.prototype.clearFormFields = function () {
        productNameInputEl.value = ''
        productPriceInputEl.value = ''
        productNameInputEl.focus()
    }

    UI.prototype.deleteProduct = function (id) {
        document.getElementById(id).remove()
    }

    addProductFormEl.addEventListener('submit', function (e) {
        e.preventDefault()

        var name = productNameInputEl.value,
            price = productPriceInputEl.value

        if (!name || !price) {
            return false
        }

        var ui = new UI()
        ui.addProduct(name, price)
        ui.clearFormFields()
    })

    productsEl.addEventListener('click', function (e) {
        e.preventDefault()
        if (e.target.className === 'btn btn-danger') {
            var ui = new UI()
            ui.deleteProduct(e.target.getAttribute('data-id'))
        }
    })

}

