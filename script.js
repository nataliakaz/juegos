let palabras_aleatorias; //crea contenedor de palabras 
let cantErrores = 0; //letras incorrectas, equivocadas
let cantAciertos = 0; //letras acertadas

const palabras = [
    'libro', 'limon', 'corto', 
    'arcos', 'anime', 'vetar',
    'radio', 'estar', 'vendo',
    'rutas', 'arroz', 'toldo',
    'sillas', 'robot'
]; // lista de palabras para el ahorcado

const btn = id('jugar'); //llama al boton de jugar
const imagen = id ('imagenAhorcado'); //Busca imagen
const btn_letras = document.querySelectorAll("#letras button");

//Click en iniciar juero
btn.addEventListener('click', iniciar);

function id(string )
{
    return document.getElementById(string);
}

function obtener_random(menor, mayor)
{
    const amplitud_valores = mayor - menor; //valor mas alto menos el menor valor del randon
    const valor_al_azar = Math.floor(Math.random() * amplitud_valores) + menor;
    return valor_al_azar;
}

function iniciar (event)
{
    imagen.src = `img/img0.jpg` ;
    btn.disabled = true;
    cantErrores = 0; 
    cantAciertos = 0;
    const parrafo = id ('palabraAzar');
    parrafo.innerHTML = '';
    const cant_palabras = palabras.length;
    const valor_al_azar= obtener_random(0, cant_palabras); //obtiene las palabras de forma aleatoria
 
    palabras_aleatorias = palabras[valor_al_azar];
    console.log(palabras_aleatorias);
    const cant_letras = palabras_aleatorias.length; 

        for (let i = 0; i < cant_letras; i++){
            const span = document.createElement( 'span' );
            parrafo.appendChild( span );

        }    
}

    //click adivinar letra
  for(let i = 0; i < btn_letras.length; i++ ){
        btn_letras[i].addEventListener('click', click_letras);
  }

  function click_letras (event){
    const spans = document.querySelectorAll('#palabraAzar span');
    const button = event.target;//cual de todas las letras , llamo al presionar el boton
   
    button.disabled = true;
   
    const letra = button.innerHTML.toLowerCase(); // .ToUpperCase()
    const palabra = palabras_aleatorias.toLowerCase(); // .ToUpperCase()
   
    let acerto = false;
    for(let i = 0; i < palabra.length; i++){
        if(letra == palabra[i]){
            //la variable i es la posicion de la letra een la palabra que 
            //coincide con el span que contiene a la letra 
            spans[i].innerHTML = letra;
            cantAciertos++;
            acerto = true;
        } 
    }
    if(acerto == false){
        cantErrores++;
        const imagenError = `img/img${cantErrores}.jpg`;
        imagen.src = imagenError;

    } 
    if(cantErrores == 5){
       id('resultado').innerHTML = "Perdiste, la palabra era " + palabras_aleatorias;
       imagen.src = `img/img5.jpg` ;
        game_over();
    }else if (cantAciertos == palabras_aleatorias.length){
        id('resultado').innerHTML = "¡¡¡GANASTE!!!";
        imagen.src = `img/img6.jpg` ;
        game_over();
    }
    console.log("la letra: " + letra + "en la palabra" + palabra + "existe" + acerto);
 
  }
  //fin del juego
  function game_over(){
    for(let i = 0; i < btn_letras.length; i++){
        btn_letras[i].disabled = true;
    }
    button.disabled = false;
  }
