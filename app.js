let attempts = 0;
let secretNumber = 0;
let guessedNumbersArray=[];
let limitNumber=10;
let maxAttempts=5;

function assignTextelement(element,text){
    let elementHTML = document.querySelector(element);
    elementHTML.innerHTML=text;
    return;
}

function verifyAttempt(){
    let numberChosen = parseInt(document.getElementById('enteredValue').value);
    console.log(secretNumber);
    if(numberChosen===secretNumber){
        assignTextelement('p',`You guessed the number ${secretNumber} in ${attempts} ${(attempts===1)?'guess':'guesses'}`);
        document.getElementById('restart').removeAttribute('disabled');
        emptyBox('#enteredValue');
    } else{
        //El usuario no acerto
        if(numberChosen>secretNumber){
            assignTextelement('p',`The secret number is lower`);
        } else{
            assignTextelement('p',`The secret number is greater`);
        }
        attempts++;
        emptyBox('#enteredValue');
        
    }

    if(attempts>maxAttempts){
        assignTextelement('p',`Limit reached with ${maxAttempts} attempts`);
        document.querySelector('#try').setAttribute('disabled','true');
        document.getElementById('restart').removeAttribute('disabled');
        generateSecretNumber();
        return;
    }
    return;
}

function emptyBox(element){
    return boxValue = document.querySelector(element).value='';
}

//recursividad
function generateSecretNumber() {
    let numberGenerated= Math.floor(Math.random()*limitNumber)+1;

    //Si ya sorteamos todos los numeros
    if(guessedNumbersArray.length==limitNumber){
        assignTextelement('p','All possible numbers have already been drawn');
    }else{
        //Si el numero generado esta incluido en la lista
        if(guessedNumbersArray.includes(numberGenerated)){
            return generateSecretNumber();
        }else{
            guessedNumbersArray.push(numberGenerated);
            return numberGenerated;
        }
    }
    
}

function startConditions(){
    assignTextelement('h1', 'Guess the secret number!');
    assignTextelement('p', `Choose a number from 1 to ${limitNumber}`);
    document.querySelector('#try').removeAttribute('disabled');
    secretNumber = generateSecretNumber();
    attempts=1;
}

function restartGame(){
    //limpiar caja
    emptyBox('#enteredValue');
    //Indicar mensaje de intervalo de numeros
    //Deshabilitar el boton de nuevo juego
    //Inicializar el numero de attempts
    startConditions();
    //Generar el numero aleatorio
    document.querySelector('#restart').setAttribute('disabled','true');
}

startConditions();