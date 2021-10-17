//              LOGICA PRINCIPAL DEL PROGRAMA

// variables apuntando a elementos del html
let app = document.querySelector('#app');
let divPrincipal;
let divCarrito;
let divFinalizarPedido;
let resumenPedidoDiv;

// variables para el tipo de item añadido al pedido
let menu='menus', burger = 'burgers', fries = 'fries', drink='drinks';

// array que contiene todos los items añadidos al pedido
let pedido = [];

// item actual y tipo de productos que debe incluir
let itemActual = {};
let currentProductTypes = [];

// Variable con el total del carrito
let totalPedido = 0;




// Inicializa la página
initPage();


/////////////              DEFINICIONES DE FUNCIONES




//      CALLBACKS DE EVENTOS

// callback para el boton de iniciar pedido
function iniciarPedido() {
    crearHtmlEleccionTipoDeProducto();
}

// callback para la seleccion de un producto (click en boton de producto)
function selectProductEvent(event,productType,product){
    let productButton = event.currentTarget;
    let productButtonsContainer = productButton.parentElement;
    productButtonsContainer.querySelectorAll('button').forEach(button=>button.classList.remove('product-selected'));
    productButton.classList.add('product-selected');
    itemActual[productType] = product;
    // activate or disactivate the add-to-cart-button
    let disableAddToCartButton = !currentProductTypes.every(element => element in itemActual);
    document.querySelector('#add-to-cart-button').disabled = disableAddToCartButton;
}

// callback al hacer click en el booton de añadir item a la cesta
function addToCart(){
    // push itemActual into pedido array
    let itemIndex = pedido.findIndex(  element=>shallowEqual( itemActual,element.item_products )  );
    let quantity = 1*document.querySelector('select').value;
    if (itemIndex < 0){
        pedido.push(
            {   quantity: quantity,
                item_products:itemActual
            }
        );
    } else {
        pedido[itemIndex].quantity += quantity;
    }
    // clear the itemActual of products.
    clearActualItem();
    // recalcular totalPedido
    totalPedido = calcularTotalPedido();
    // añadir totalPedido al texto del carrito
    divCarrito.innerHTML = ` Total: ${totalPedido} €`
    // repintar el html de las opciones de tipo de producto
    crearHtmlEleccionTipoDeProducto();
}

// funcion callback que añade patatas al item en función del estado del checkbox '#addFries'
function addFries(){
    delete itemActual[fries];
    if (document.querySelector('#addFries').checked){
        itemActual[fries] = true;
    }
    console.log(itemActual);
}

// volver a la página principal
function goBackToMainPage(){
    // clear the itemActual of products.
    clearActualItem();
    // repintar el html de las opciones de tipo de producto
    crearHtmlEleccionTipoDeProducto();
}

// ir al carrito
function goToCart(){
    // clear the itemActual of products.
    clearActualItem();
    // Renderizar la página del carrito de compra
    createHtmlViewCart();
}

// eliminar un artículo del carrito
function removeItemFromCart(event,item){
    console.log(pedido.splice(pedido.indexOf(item),1));
    totalPedido = calcularTotalPedido();
    divCarrito.innerHTML = `Total: ${totalPedido} €`;
    document.querySelector('.big-price').innerHTML = `<p>Total: ${totalPedido} €</p>`
    if (pedido.length ===0){
        goBackToMainPage();
    } else if(event.currentTarget.closest('.resumen-tipo-producto').querySelectorAll('.resumen-item').length === 1){
        event.currentTarget.closest('.resumen-tipo-producto').remove();
    } else{
        event.currentTarget.closest('.resumen-item').remove();
    }
}


//      FUNCIONES PARA CALCULAR EL IMPORTE DEL PEDIDO

// Resetea el item actual
function clearActualItem() {
    itemActual = {};
    currentProductTypes = [];
}

// obtener el tipo de item (menu,burger,drink) de item-products
function getTypeOfItem(item_products) {
    if (menu in item_products){
        return menu;
    } else if (burger in item_products){
        return burger;
    } else if ( drink in item_products ){
        return drink;
    } else{
        alert('Invalid item' + item_products);
    }
}

// Precio de un item del pedido
function calcularSubTotal(item_products) {
    switch (getTypeOfItem(item_products)) {
        case menu:
            return productos.menus[item_products[menu]];
            break;
        case burger:
            return productos.burgers[item_products[burger]] + ( (fries in item_products) ? productos.fries : 0);
            break;
        case drink:
            return productos.drinks[item_products[drink]];
            break;
    }
}

// Precio total del pedido
function calcularTotalPedido(){
    let total = 0;
    for (let item of pedido) {
        total += item.quantity * calcularSubTotal( item.item_products );
    }
    return total;
}


//      FUNCIONES PARA GENERAR CONTENIDO Y ETIQUETAS

// Crea el html inicial de la página y inicializa sus elementos
function crearHtmlPagina() {
    app.innerHTML = `
    <div id="div-opciones-menus-productos-principal">
        <button id="boton-iniciar-pedido">Hacer un pedido</button>
    </div>
    <div id="carrito"> Total: ${totalPedido} €</div>
    `
    divPrincipal = document.querySelector('#div-opciones-menus-productos-principal');
    divCarrito   = document.querySelector('#carrito');
}

// Inicializar la página
function initPage() {
    // Initialize all variables
    pedido = [];
    itemActual = {};
    currentProductTypes = [];
    totalPedido = 0;
    // create the base html of the page
    crearHtmlPagina();
    // add events to the initially rendered components of the html
    document.querySelector('#boton-iniciar-pedido').addEventListener('click',iniciarPedido);
}

// crear html de pagina de seleccion de tipo de producto
function crearHtmlEleccionTipoDeProducto() {
    divPrincipal.innerHTML = '';
    for (let productType of [menu,burger,drink]) {
        let button = document.createElement('button');
        button.value = productType;
        button.innerHTML = productType;
        divPrincipal.appendChild(button);
        button.addEventListener('click',()=>{crearHtmlEleccionProductos(productType)});
    }
    // añadir un boton para finalizar el pedido si hay algo en el carrito
    if(pedido.length > 0){
        crearHtmlDivFinalizarPedido();
    }
    
}

// div con un boton para ir al carrito
function crearHtmlDivFinalizarPedido(){
    divFinalizarPedido = document.createElement('div');
    divFinalizarPedido.innerHTML = `
    <button>IR AL CARRITO</button>
    `;
    divPrincipal.appendChild(divFinalizarPedido);
    divFinalizarPedido.querySelector('button').addEventListener('click',goToCart);
}

function crearHtmlEleccionProductos(eleccion){
    let askForFries = false;
    switch (eleccion){
        case menu:
            currentProductTypes = [menu,drink];
            break;
        case burger:
            currentProductTypes = [burger];
            askForFries = true;
            break;
        case drink:
            currentProductTypes = [drink];
            break;
        default:
            currentProductTypes = [];
    }
    divPrincipal.innerHTML = '';
    for (let productType of currentProductTypes) {
        crearHtmlProductos(
            productType,
            !(currentProductTypes.includes(menu) && productType == drink)
        );
    }
    // Add a checkbox to ask for fries if the user chooses burger
    if (askForFries){
        createFriesCheckBoxHtml();
    }
    // Add an input to control the number of items to add to the cart.
    createHtmlItemquantity();
    // Add a button to add the items to the cart, initially disabled
    // until the choices of products are valid.
    createHtmlAddToCartButton();
}

function crearHtmlProductos(productType,price=true){
    let divTipoProducto = document.createElement('div');
    let divProductos = document.createElement('div');
    divTipoProducto.classList.add('contenedor-tipo-producto');
    divTipoProducto.innerHTML = `<h2>${productType}</h2>`;
    divProductos.classList.add('contenedor-productos');
    divPrincipal.appendChild(divTipoProducto);
    divTipoProducto.appendChild(divProductos);
    for (let producto in productos[productType]){
        let button = createProductButtonHtml(productType,producto,price);
        divProductos.appendChild(button);
        button.addEventListener('click',event=>selectProductEvent(event,productType,producto));
    } 
}

// Boton de seleccion de producto
function createProductButtonHtml(productType,product,price=true) {
    let priceTag = (price) ? `<p>${productos[productType][product]}  €</p>` : ''
    let button = document.createElement('button');
    button.innerHTML = `<p class="product-name">${product}</p>` + priceTag;
    return button;
}

function createFriesCheckBoxHtml(){
    let friesDiv = document.createElement('div');
    friesDiv.innerHTML = `
        <label for="addFries">Añadir patatas por ${productos.fries} €</label>
        <input type="checkbox" name="addFries" id="addFries">
    `;
    divPrincipal.appendChild(friesDiv);
    friesDiv.addEventListener('change',addFries);
}

function createHtmlItemquantity(){
    let quantityInputDiv = document.createElement('div');
    let quantityOptions  = '';
    for(let i = 1; i<=10; i++){
        quantityOptions += `<option value="${i}">${i}</option>`
    }
    quantityInputDiv.innerHTML = 
        `
        <label for="item-quantity">Cantidad</label>
        <select name="" id="item-quantity">
        ${quantityOptions}
        </select>`
    divPrincipal.appendChild(quantityInputDiv);
}

function createHtmlAddToCartButton(){
    let addToCartButtonDiv = document.createElement('div');
    addToCartButtonDiv.innerHTML = `
        <button id="go-back-button">
            VOLVER
        </button>
        <button id="add-to-cart-button" disabled="disabled">
            AÑADIR
        </button>
    `;
    divPrincipal.appendChild(addToCartButtonDiv);
    document.querySelector('#go-back-button').addEventListener('click',goBackToMainPage);
    document.querySelector('#add-to-cart-button').addEventListener('click',addToCart);
}


function createHtmlViewCart(){
    // empty the main Div
    divPrincipal.innerHTML = ''

    // render the total price in a big div
    showTotal();

    // render the summary of products and its prices, quantities
    createHtmlResumenProductos();

    // render the div to show the checkout or go back to main pave button
    createHtmlCheckOutOrGoBackButtonsDiv();
}

function showTotal(){
    let bigPriceDiv = document.createElement('div');
    bigPriceDiv.classList.add('big-price');
    bigPriceDiv.innerHTML = `<p>Total: ${totalPedido} €</p>`;
    divPrincipal.appendChild(bigPriceDiv);
}

function createHtmlResumenProductos(){
    resumenPedidoDiv = document.createElement('div');
    divPrincipal.appendChild(resumenPedidoDiv);
    for (let itemType of [menu,burger,drink]){
        createHtmlResumenTipoProducto(itemType);
    }
}

function createHtmlResumenTipoProducto(itemType) {
    let items = pedido.filter(item=>getTypeOfItem(item.item_products)==itemType);
    if (items.length === 0){
        return
    }
    let resumentTipoProductoDiv = document.createElement('div');
    resumentTipoProductoDiv.classList.add('resumen-tipo-producto');
    resumentTipoProductoDiv.innerHTML = `<h2>${itemType}</h2>`;
    resumenPedidoDiv.appendChild(resumentTipoProductoDiv);
    let divItems = document.createElement('div');
    resumentTipoProductoDiv.appendChild(divItems);
    for (let item of items){
        let itemDiv = createHtmlResumenItem(itemType,item);
        divItems.appendChild(itemDiv);
        itemDiv.querySelector('.item-resume-actions button[value="remove"]').addEventListener('click',event=>removeItemFromCart(event,item));
    }

}



function createHtmlResumenItem(itemType,item){
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('resumen-item')
    let itemProductsDiv = document.createElement('div');
    let itemPriceDiv = document.createElement('div');
    let itemActionsDiv = document.createElement('div');
    itemDiv.appendChild(itemProductsDiv);
    itemDiv.appendChild(itemPriceDiv);
    itemDiv.appendChild(itemActionsDiv);
    switch (itemType) {
        case menu:
            itemProductsDiv.innerHTML = `<p>${item.item_products[menu]} con ${item.item_products[drink]} y patatas</p>`;
            break;
        case burger:
            itemProductsDiv.innerHTML = `<p>${item.item_products[burger] + ((fries in item.item_products)? ' con patatas':'')} </p>`;
            break;
        case drink:
            itemProductsDiv.innerHTML = `<p>${item.item_products[drink]}</p>`;
        default:
            break;
    }
    itemPriceDiv.classList.add('item-resume-price');
    itemPriceDiv.innerHTML = `<p>${item.quantity} X <b>${calcularSubTotal(item.item_products)}€</b> = <b>${item.quantity * calcularSubTotal(item.item_products)}€</b> </p>`;
    itemActionsDiv.classList.add('item-resume-actions')
    itemActionsDiv.innerHTML = `<button value="remove">REMOVE</button>`;
    return itemDiv;
}

function createHtmlCheckOutOrGoBackButtonsDiv() {
    let checkOutOrGoBackButtonsDiv = document.createElement('div');
    divPrincipal.appendChild(checkOutOrGoBackButtonsDiv);
    checkOutOrGoBackButtonsDiv.innerHTML = `
    <button class="go-back-to-menu-button" value="goBackToMenu">VOLVER</button>
    <button class="checkout-button" value="checkOut">REALIZAR PEDIDO</button>
    `;
    checkOutOrGoBackButtonsDiv.querySelector('button[value="goBackToMenu"]').addEventListener('click',goBackToMainPage);
    checkOutOrGoBackButtonsDiv.querySelector('button[value="checkOut"]').addEventListener('click',()=>{
        alert('Gracias por comprar en Bootdonalds. ¡Hasta la próxima!');
        initPage();
    });

}

//      FUNCIONES AUXILIARES


// Comprobar si dos objetos son iguales
// por el valor de sus atributos
function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
}