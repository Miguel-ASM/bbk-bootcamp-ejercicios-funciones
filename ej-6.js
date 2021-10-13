let numerador;
let denominador;

do{
    numerador = parseInt(prompt('Introduce el numerador'));
    denominador = parseInt(prompt('Introduce el denominador'));

    if (denominador!=0){
        alert(`${numerador} / ${denominador} = ${division(numerador,denominador)}`)
    } else {
        alert('YOU JUST DIVIDED BY ZERO! DIDN\'T YOU?!?!?!')
    }
} while (denominador!=0)


function division(num,den) {
    return num/den;
}