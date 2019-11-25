
// esconder botones solicitud
function showOrHiddeButton(){
	if($('div').hasClass('espera')){
        $('button.btn.btn-success').css({'display':'none'});
        $('a.btn.btn-secondary.enespera').css({'display':'none'});
	}else if($('div').hasClass('proceso')){
        $('a.btn.btn-warning.en-proceso').css({'display':'none'});
        $('textarea.form-control').after('<p class="visto-mensaje">En este momento la solicitus fue revisada</p>')
        $('a.btn.btn-secondary.enespera').css({'display':'none'})
    }else if($('div').hasClass('Anulada')){
        $('a.btn.btn-warning.en-proceso').css({'display':'none'});
        $('button.btn.btn-success').css({'display':'none'});
        $('a.btn.btn-danger.anaular').css({'display':'none'});
        $('textarea.form-control').after('<p class="visto-mensaje">La solicitud fue anulada. </p>')
    }else if($('div').hasClass('Aprobada')){
        $('textarea.form-control').after("<div class='img-gif-approved-container'><img class='approved-status-gif' src='/img/tenor.gif'></div>" + '<p class="descripcion-status ">Solicitud Aprobada</p>')
        $('a.btn.btn-warning.en-proceso').css({'display':'none'});
        $('a.btn.btn-danger.anaular').css({'display':'none'});
        $('button.btn.btn-success').css({'display':'none'})
        $('a.btn.btn-secondary.enespera').css({'display':'none'})
    }
}

showOrHiddeButton();


// contandor de caracteres textarea
function countChars(obj){
    var maxLength = 900;
    var strLength = obj.value.length;
    var charRemain = (maxLength - strLength);
    
    if(charRemain <= 0){
        document.getElementById("charNum").innerHTML = '<span class="count-text-span" style="color: red;">Llegaste al limite de '+maxLength+' carácteres</span>';
    }else{
        document.getElementById("charNum").innerHTML = charRemain+' caracteres restantes';
    }
}

// close menu
function closeAndOpenMenu() {
    $('ul.nav.flex-column.main-vertical-menu').addClass('menu-open');
        $('li#close-li').click(function () {
            $('ul.nav.flex-column.main-vertical-menu').addClass('menu-close');
            $('ul.nav.flex-column.main-vertical-menu').removeClass('menu-open');
            $('.nav-item.li-open').css({ 'display': 'block', 'position': 'absolute', 'left': '0%', 'top': '13%', 'width': 'auto', 'padding': '12px' });
            $('.container').css({'max-width':'100%'});
            $('ul.nav.flex-column.main-vertical-menu').toggle();
        });
   
        $('li#open-li').click(function () {
            $('ul.nav.flex-column.main-vertical-menu.menu-close').removeClass('menu-close');
            $('ul.nav.flex-column.main-vertical-menu').addClass('menu-open');
            $('.nav-item.li-open').css({ 'display': 'none', 'position': 'absolute', 'left': '0%', 'top': '13%', 'width': 'auto',  'padding': '12px' });
            $('li.nav-item a').css({ 'display': 'block' });
            $('ul.nav.flex-column.main-vertical-menu').toggle();

        });
   
}
closeAndOpenMenu();

//search tabla
function filtertable() {
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr.tr-content").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

        $("div#carta-donacion").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

    });
}
filtertable();

//End search tabla

// gif
function aprobacionCarta() {
    if ($('strong').hasClass('solicitud-class-Aprobada')) {
        $("strong.solicitud-class-Aprobada").after("<div class='img-gif-approved-container'><img class='approved-status-gif' src='/img/tenor.gif'></div>" + '<p class="descripcion-status ">Su solicitud ha sido aprobada, estaremos en comunicacion con usted en las proximas horas.</p>');
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



