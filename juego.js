//-------------DEclaracion de variables 
var limit = 50;//Numero de casillas de la matriz
var tamCanvas= 500;//Tama;o del canvas
var matrizPrincipal = document.getElementById('matrizBase');//puede ser o no el canvas principal xd
var lienzoBase = matrizPrincipal.getContext('2d');

//--------------------------------OBJETOS------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

class PersonajePrincipal{
    constructor (inicioX, inicioY, matrizDondeSeTrabaja) {
        this.inicioX = inicioX;
        this.inicioY = inicioY;              
        this.matrizDondeSeTrabaja = matrizDondeSeTrabaja;             
        this.matrizDondeSeTrabaja[this.inicioY][this.inicioX] = 1;
    }
    mover(){
        var inicioX = this.inicioX;
        var inicioY = this.inicioY;
        var matrizDondeSeTrabaja = this.matrizDondeSeTrabaja;
    document.addEventListener('keydown', function(event) {//PARA RECONOCER LA tECLAS
            matrizDondeSeTrabaja[inicioY][inicioX] = 0;
            LimpiarLaMatriz(inicioY, inicioX);
        //y que la nave pueda moverse   ----  inicioX     inicioY  
        switch(event.code){
                case "KeyW": if (inicioY == 0) {
                                inicioY = limit-1;
                            }else{
                                inicioY--;
                            }
                    break;
                case "KeyS": if (inicioY == limit-1) {
                                inicioY = 0;
                            }else{
                                 inicioY++;
                            }
                    break;
                case "KeyA": if (inicioX == 0) {
                                 inicioX = limit-1;
                            }else{
                                 inicioX--;   
                            }
                    break;
                case "KeyD": if (inicioX == limit-1) {
                                inicioX = 0;
                            } else {
                                inicioX++;    
                            }              
                    break;
        } 
         matrizDondeSeTrabaja[inicioY][inicioX] = 2;
         ponerLasNavesEnLaMatriz(matrizDondeSeTrabaja);
        console.log(event.code);
    });
    }
    }
////-------------------------------------------------------------------------------------------------------
////-------------------------------------------------------------------------------------------------------
////-------------------------------------------------------------------------------------------------------
function dibujarReticula(){//funcion que se puede quitar cuando se pase el juego
    ///Solo sirve aqui en canvas esta funcion se ira muy lejos jajajaja
    //vertical
    for(let i = 0; i <= tamCanvas; i+=(tamCanvas/limit)){
        lienzoBase.moveTo(i, 0);
        lienzoBase.lineTo(i, tamCanvas);
    }
    //horizontal
    for(let i = 0; i <= tamCanvas; i+=(tamCanvas/limit)){
        lienzoBase.moveTo(0,i);
        lienzoBase.lineTo(tamCanvas, i);
    }
    lienzoBase.stroke();//el que las dibuja
}
function ponerLasNavesEnLaMatriz(matrizDeclarada){//cada que se mueva se tendra que correr esta
    ///Matriz solo de la de canvas
    // funcion para refrescar todo  //solo es para pintarla
    for(let i=0; i<limit; i++){ //colocar las cosas en su lugar
        for(let e=0; e<limit; e++){
            if(matrizDeclarada[i][e] != 0){
                lienzoBase.beginPath();//EMPEZAR EL DIBUJO
                if(matrizDeclarada[i][e] == 2)
                     lienzoBase.fillStyle = "black";//color que quieran
                else
                    lienzoBase.fillStyle = "red";//color que quieran
                lienzoBase.rect((e*10), (i*10), 10, 10);//poner las cuadrados tal ves hay que
                //tal vez hay que cambiar el cuadro de los cuaros 10
                lienzoBase.fill();// poder rellenar de color el fondo del canvas
                lienzoBase.closePath();
           }
        } 
    }

}
function LimpiarLaMatriz(PosInicial, PosFinal){ //funcion para limpiar la pos anterior
    ///Funcion que hace que hace que se borre el rastro de la nave en la matriz de canvas
    lienzoBase.beginPath();//EMPEZAR EL DIBUJO
        lienzoBase.fillStyle = "white";//color que quieran
    lienzoBase.rect((PosFinal*10), (PosInicial*10), 9, 9);//poner las cuadrados tal ves hay que
    lienzoBase.fill();// poder rellenar de color el fondo del canvas
    lienzoBase.closePath();
}
function MatrizBase(){
      var MatrizPrincipal = new Array(limit);
        for (let i = 0; i < limit; i++) {///----------------
            MatrizPrincipal[i]=new Array(limit);
        }//--------------------------------
        for (i=0; i<limit; i++){//rellenar de ceros las cosas los 1 seran la nave buena
            for (e=0; e<limit; e++){
                MatrizPrincipal[i][e] = 0;
            }
        }//------------------------------Reyenar el arreglo de ceros
    return MatrizPrincipal;
}
 //poner posiones de las naves y ver donde vas a empezar funcion importante xd
function colocarPosicionesAleatorias(numNaves){//saber donde estaran las naves al inicio
    //tambien es medio la base de todo el juego espero que esto cambie
   var Matriz = MatrizBase()
        var arrayNavesEnemigas = new Array(numNaves * 2)
        for(let i = 0; i < (numNaves *2); i++){
            arrayNavesEnemigas[i] = Math.floor((Math.random()*50)+1)
        }        
    //colocando posicion de la nave principla
        Matriz[arrayNavesEnemigas[0]][arrayNavesEnemigas[1]] = 2;    
    //  Colocar las naves en la matriz de las naves enemigas  
   for(let i=2; i< (numNaves * 2); i+=2){   
        Matriz[arrayNavesEnemigas[i]][arrayNavesEnemigas[i+1]] = 1; 
    }
    ponerLasNavesEnLaMatriz(Matriz)
    console.log(arrayNavesEnemigas)
    console.log(arrayNavesEnemigas[0])
    const nave = new PersonajePrincipal (arrayNavesEnemigas[1], arrayNavesEnemigas[0],Matriz);
    nave.mover()
   
}

///-----------------------------------------------------------------------------------------------
///--------------------Ejecuciones----------------------------------------------------------------
///-----------------------------------------------------------------------------------------------

//
colocarPosicionesAleatorias(8)//esta ganando mucha importancia esta funcion 
//tal vez sea la principal el juego idk

//console.log()

//---Creo que necesitaremos poner un funcion como setTimeout(function(){ alert("Hello"); }, 3000); --
//como ciclo principal






//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//-------------PURO CAMVAS------- (matriz de los monitos)--------------------------------
lienzoBase.beginPath();//EMPEZAR EL DIBUJO
//dibujar la reticula 
dibujarReticula();
lienzoBase.closePath();