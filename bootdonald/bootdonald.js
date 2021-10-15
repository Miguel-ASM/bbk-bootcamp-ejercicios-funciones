//              LOGICA PRINCIPAL DEL PROGRAMA

// variables apuntando a elementos del html
let app = document.querySelector('#app');
let divPrincipal;
let divCarrito;

// array que contiene todos los items añadidos al pedido
let itemActual = {};
let pedido = [];

// Variable con el total del carrito
let totalPedido = 0;

// variables para el tipo de item añadido al pedido
let menu='menus', burger = 'burgers', fries = 'fries', drink='drinks';


// Inicializa la página
initPage();


//              DEFINICIONES DE FUNCIONES

// Funciones relacionadas con la interfaz de usuario




function crearHtmlOpciones(eleccion){
    let productTypes;
    let askForFries = false;
    switch (eleccion){
        case menu:
            productTypes = [menu,drink];
            break;
        case burger:
            productTypes = [burger];
            askForFries = true;
            break;
        case drink:
            productTypes = [drink];
            break;
        default:
            productTypes = [];
    }
    divPrincipal.innerHTML = '';
    for (let productType of productTypes) {
        crearHtmlProductos(
            productType,
            !(productTypes.includes(menu) && productType == drink)
        );
    }
    
    // Add a checkbox to ask for fries if the user chooses burger
    if (askForFries){
        let friesDiv = document.createElement('div');
        friesDiv.innerHTML = `
            <label for="addFries">Añadir patatas por ${productos.fries} €</label>
            <input type="checkbox" name="addFries" id="addFries">
        `;
        divPrincipal.appendChild(friesDiv);
        friesDiv.addEventListener('change',()=>{
            if (document.querySelector('#addFries').checked){
                itemActual[fries] = true;
            } else{
                delete itemActual[fries];
            }
            console.log(itemActual);
        });
    }
    for (let div of divPrincipal.querySelectorAll('.contenedor-productos')){
        // console.log(div);
        for (let productDiv of div.querySelectorAll('button')){
            productDiv.addEventListener('click',(event)=>{
                div.querySelectorAll('button').forEach(button=>button.classList.remove('product-selected'));
                event.currentTarget.classList.add('product-selected');
                itemActual[event.currentTarget.name] = event.currentTarget.value;
                console.log(itemActual);
            })   
        }
    }
    
}


function crearHtmlProductos(productType,price=true){
    let div = document.createElement('div');
    let divProductos = document.createElement('div');
    div.classList.add('contenedor-tipo-producto');
    div.innerHTML = `<h2>${productType}</h2>`;
    divProductos.classList.add('contenedor-productos');
    div.appendChild(divProductos);
    for (producto in productos[productType]){
        let priceTag = (price) ? `<p>${productos[productType][producto]}  €</p>` : ''
        let button = document.createElement('button');
        button.innerHTML = `<p class="product-name">${producto}</p>` + priceTag;
        button.value = producto;
        button.name  = productType;
        divProductos.appendChild(button);
    }
    divPrincipal.appendChild(div);
}

// Crea el html inicial de la página y inicializa sus elementos
function crearHtmlPagina() {
    app.innerHTML = `
    <div id="div-opciones-menus-productos-principal">
        <button id="boton-iniciar-pedido">Hacer un pedido</button>
    </div>
    <div totalPedido="0" id="carrito"> Total: ${totalPedido} €</div>
    `
    divPrincipal = document.querySelector('#div-opciones-menus-productos-principal');
    divCarrito   = document.querySelector('#carrito');
}

// crear html de pagina de seleccion de tipo de producto
function crearHtmlTipoDeProducto() {
    divPrincipal.innerHTML = '';
    for (let productType of [menu,burger,drink]) {
        let button = document.createElement('button');
        button.value = productType;
        button.innerHTML = productType;
        divPrincipal.appendChild(button);
        button.addEventListener('click',()=>{crearHtmlOpciones(productType)});
    }
}

// Inicializar la página
function initPage() {
    // first create the base html of the page
    crearHtmlPagina();

    // add events to the initially rendered components of the html
    document.querySelector('#boton-iniciar-pedido').addEventListener('click',crearHtmlTipoDeProducto);
}


// Funciones para calcular el importe del pedido

// Precio de un item del pedido
function calcularSubTotal(item) {
    if (menu in item){
        return productos.menus[item.menu];
    } else if (burger in item){
        return productos.burgers[item.burger] + ( (fries in item) ? productos.fries : 0);
    } else if ( drink in item ){
        return productos.drinks[item.drink];
    } else{
        alert('Invalid item' + item);
    }
}

// Precio total del pedido
function calcularTotalPedido(pedido){
    let total = 0;
    for (let i = 0; i < pedido.length; i++) {
        total += calcularSubTotal( pedido[i] );
    }
    return total;
}