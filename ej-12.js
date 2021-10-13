let año;

do{
    año = prompt('Introduce un año')
    if (año==0){
        alert('Hasta la próxima');
    }
    else if ( esBisiesto( parseInt(año) ) ){
        alert(`${año} es bisiesto`)
    } else {
        alert(`${año} NO es bisiesto`)
    }
} while(año!=0);

function esBisiesto(año){
    return ((año % 4 == 0) && (año % 100 != 0 )) || (año % 400 == 0)
}