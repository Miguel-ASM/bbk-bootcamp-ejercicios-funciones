//              LOGICA PRINCIPAL DEL PROGRAMA
alert('Bienvenido a Bootdonald.');

// array que contiene todos los items añadidos al pedido
let pedido = [];

// variables para el tipo de item añañdido al pedido
let menu='menu', burger = 'burger', fries = 'fries', drink='drink';


// Mostrar el menu en la página web
mostrarMenu();


//              DEFINICIONES DE FUNCIONES

// Funciones relacionadas con la interfaz de usuario
function mostrarMenu() {
    let html = `
    <button onclick="alert(\`Hey,don't click me again!\`)">
    DON'T CLICK ME
    </button>
    `
    document.querySelector('#app').innerHTML = html;
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