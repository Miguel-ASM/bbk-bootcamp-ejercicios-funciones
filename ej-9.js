cifrasDeNumero();

function cifrasDeNumero() {
    let numero;
    do {
        numero = parseFloat(prompt('Introduce un numero entero positivo'));
    } while(numero < 0  || numero != Math.floor(numero) );
    alert(
        `El número tiene ${numero.toString().length} cifras`
    )
}