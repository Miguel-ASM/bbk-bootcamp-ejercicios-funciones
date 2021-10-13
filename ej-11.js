// Objeto con los factores de conversión
let conversion = {
    libras:0.86,
    dolares:1.28611,
    yenes:129.852,
}

// Lógica principal de la aplicación
let moneda;
let cantidad = parseFloat( prompt('Introduce la cantidad que quieres cambiar') );

do{
    moneda = prompt('Convertir a : yenes, libras, dolares?');
    if (moneda in conversion){
        convertirEuros(cantidad,moneda);
    } else {
        alert(`No sé convertir a ${moneda}`);
    }
} while(!(moneda in conversion))


// Función para convertir a dolares, yenes o libras
function convertirEuros(cantidad,monedaObjetivo) {
    alert(
        `${cantidad} € son ${cantidad*conversion[monedaObjetivo]} ${monedaObjetivo}`
    )
}