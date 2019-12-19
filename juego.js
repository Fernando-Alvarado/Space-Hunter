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
        this.matrizDondeSeTrabaja[this.inicioY][this.inicioX] = 2;
    }
    mover(){
        var inicioX = this.inicioX;///si no
        var inicioY = this.inicioY;
        var matrizDondeSeTrabaja = this.matrizDondeSeTrabaja;
    document.addEventListener('keydown', function(event) {//PARA RECONOCER LA tECLAS
          //aqui va el switch que puse DX
        var corriendo =  ChooseWhereToMove(matrizDondeSeTrabaja, inicioY, inicioX, event.code, 2, "KeyW", "KeyS", "KeyA", "KeyD");
        inicioY=corriendo[0];
        inicioX=corriendo[1];
        });
    }
    }
////-------------------------------------------------------------------------------------------------------
////-------------------------------------------------------------------------------------------------------
////-------------------------------------------------------------------------------------------------------
function ChooseWhereToMove(matriz, y, x, event, value, argu1, argu2, argu3, argu4){//switch para elegir 
    //donde se va a mover cada nave, servira para la principal y para las naves enemigas
    matriz[y][x] = 0;
LimpiarLaMatriz(y, x);
//y que la nave pueda moverse   ----  inicioX     inicioY  
switch(event){
    case argu1:if(y==0)
                    y=limit-1;
                else
                    y--;
        break;
    case argu2: if(y==limit-1)
                    y=0;
                else
                    y++;
        break;
    case argu3: if (x==0)
                    x = limit-1;
                else
                    x--;   
        break;
    case argu4: if(x==limit-1)
                    x=0;
                else
                    x++;                 
        break;
} 
matriz[y][x] = value;
ponerLasNavesEnLaMatriz(matriz);
var regreso = new Array(2);
regreso[0]=y;
regreso[1]=x;
return regreso;
}
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
function NumerosAleatorios(tope){
    return Math.floor((Math.random()*tope))+1
}
 //poner posiones de las naves y ver donde vas a empezar funcion importante xd
function colocarPosicionesAleatorias(numNaves){//saber donde estaran las naves al inicio
    //tambien es medio la base de todo el juego espero que esto cambie
   var Matriz = MatrizBase()
        var arrayNavesEnemigas = new Array(numNaves * 2)
        for(let i = 0; i < (numNaves *2); i++){
            arrayNavesEnemigas[i] = NumerosAleatorios(50);
        }        
    //colocando posicion de la nave principla
        Matriz[arrayNavesEnemigas[0]][arrayNavesEnemigas[1]] = 2;    
    //  Colocar las naves en la matriz de las naves enemigas  
   for(let i=2; i< (numNaves * 2); i+=2){   
        Matriz[arrayNavesEnemigas[i]][arrayNavesEnemigas[i+1]] = 1; 
    }
    ponerLasNavesEnLaMatriz(Matriz)//ibujar la matriz de nuemeros en esta de canvas     
    //instanciando el objeto principal ----------------------
    const nave = new PersonajePrincipal (arrayNavesEnemigas[1], arrayNavesEnemigas[0],Matriz);
    ////--------------------------------------------
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