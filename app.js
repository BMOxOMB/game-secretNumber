let intentos = 0;
let numeroSecreto = generarNumeroSecreto();
let listaNumerosSorteados=[];
let numeroMaximo=10;

function asignarTextoElemento(elemento,texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML=texto;
    return;
}

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    console.log(numeroSecreto);
    console.log(numeroDeUsuario);
    if(numeroDeUsuario===numeroSecreto){
        asignarTextoElemento('p',`Acertaste el numero ${numeroSecreto} en ${intentos} ${(intentos===1)?'vez':'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        limpiarCaja('#valorUsuario');
    } else{
        //El usuario no acerto
        if(numeroDeUsuario>numeroSecreto){
            asignarTextoElemento('p',`El numero secreto es menor`);
        } else{
            asignarTextoElemento('p',`El numero secreto es mayor`);
        }
        intentos++;
        limpiarCaja('#valorUsuario');
    }
    return;
}

function limpiarCaja(elemento){
    return valorCaja = document.querySelector(elemento).value='';
}

//recursividad
function generarNumeroSecreto() {
    let numeroGenerado= Math.floor(Math.random()*numeroMaximo)+1;

    //Si ya sorteamos todos los numeros
    if(listaNumerosSorteados.length==numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los numeros posibles');
    }else{
        //Si el numero generado esta incluido en la lista
        if(listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del numero secreto!');
    asignarTextoElemento('p', `Indique un numero del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos=1;
}

function reiniciarJuego(){
    //limpiar caja
    limpiarCaja('#valorUsuario');
    //Indicar mensaje de intervalo de numeros
    //Deshabilitar el boton de nuevo juego
    //Inicializar el numero de intentos
    condicionesIniciales();
    //Generar el numero aleatorio
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();