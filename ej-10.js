let invalidOption;
do{
    invalidOption = false;
    switch (
        prompt('De qué figura quieres calcular el área? (circulo,triangulo,cuadrado)')
    ) {
        case 'circulo':
            alert(areaCirculo( prompt('radio')));
            break;
    
        case 'triangulo':
            alert(areaTriangulo(prompt('base'),prompt('altura')));
            break;
        case 'cuadrado':
            alert(areaCuadrado(prompt('altura')));
            break;
        default:
            alert('Invalid option');
            invalidOption = true;
    }
} while(invalidOption);

// Funciones
function areaCirculo(radio) {
    return Math.PI * radio**2;
}

function areaTriangulo(base,altura) {
    return 0.5 * base * altura;
}

function areaCuadrado(lado) {
    return lado**2;
}