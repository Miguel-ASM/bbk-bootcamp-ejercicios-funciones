let num = parseInt(prompt('Introduce un número para calcular su factorial'));
alert(`${num}! = ${factorial(num)}`);

// With recursiveness
// function factorial(numero) {
//     if (numero > 0){
//         return numero*factorial(--numero);
//     } else{
//         return 1;
//     }
// }

// With a while loop
function factorial(numero) {
    let factorial = 1;
    while(numero>0){
        factorial*=numero--;
    }
    return factorial;
}
