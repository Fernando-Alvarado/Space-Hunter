//-------------DEclaracion de variables 
var limit = 50;//Numero de casillas de la matriz
var tamCanvas= 500;//Tama;o del canvas
var velocidad = 1000;//Esta variable dira que tan rapido las naves reacionaran
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
            inicioY=corriendo[0];//se reinia la cuenta para que se pueda mover la neve
            inicioX=corriendo[1];//es algo idiota pero funciona jajajaja
            });
        }
    }
class NavesEnemigas{
        constructor(ejeY, ejeX, matrizDondeSeTrabaja){//el 
            this.matrizDondeSeTrabaja = matrizDondeSeTrabaja;
            this.ejeY = ejeY;
            this.ejeX = ejeX;
            this.numero =  NumerosAleatorios(4);//luego esto tengra que cambiar a 5 para que puedan
            //disparar
        }
        JustTheCreator(){//este metodo ara que las naves se muevan y  si tiempo que disparen
            //usara la funcion switch que cree
            console.log(this.ejeY)
            function MainBucle(velocidad, matriz, y, x,num, move, ar1, ar2, ar3, ar4){ //Aqui se tendra que correr el bucle de las naves
                setTimeout(function(){ 
                    var itsRunnig = ChooseWhereToMove(matriz, y, x,num, move, ar1, ar2, ar3, ar4);
                    MainBucle(1000, this.matrizDondeSeTrabaja, itsRunnig[0], itsRunnig[1], this.numero, 1, 1, 2, 3, 4);
                }, velocidad);
            }
            MainBucle(1000, this.matrizDondeSeTrabaja, this.ejeY, this.ejeX, this.numero, 1, 1, 2, 3, 4);
        }
    }
////-------------------------------------------------------------------------------------------------------
////-------------------------------------------------------------------------------------------------------
////-------------------------------------------------------------------------------------------------------


function ChooseWhereToMove(matriz, y, x, event, value, argu1, argu2, argu3, argu4){//switch para elegir 
    //donde se va a mover cada nave, servira para la principal y para las naves enemigas
   // console.log(matriz)
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
    var Matriz = MatrizBase();//tipo instanciando la matriz principal
    var arrayNavesEnemigas = new Array(numNaves * 2)//Declaracion del array con las naves de todos
    for(let i = 0; i < (numNaves *2); i++){//colocando las posiciones enemigas
        arrayNavesEnemigas[i] = NumerosAleatorios(50);//metiendo esos valores
    }        
    Matriz[arrayNavesEnemigas[0]][arrayNavesEnemigas[1]] = 2;//colocando posicion de la nave principla       
    for(let i=2; i< (numNaves * 2); i+=2){//  Colocar las naves en la matriz de las naves enemigas  
        Matriz[arrayNavesEnemigas[i]][arrayNavesEnemigas[i+1]] = 1; 
    }
    ponerLasNavesEnLaMatriz(Matriz)//ibujar la matriz de nuemeros en esta de canvas     
    //instanciando el objeto principal ----------------------
    const nave = new PersonajePrincipal(arrayNavesEnemigas[1], arrayNavesEnemigas[0],Matriz);
    nave.mover()//haciendo que el objeto funcione  las teclas
    //-----------------Delcarando todas las naves enemigas que hay--------------------
    var ArrayObjetos = new Array(numNaves-1);//aqui correran todos los objetos de las naves enemigas
    console.log(arrayNavesEnemigas);
    for(let i = 0; i< numNaves-1; i++){//funcion para que los objetos se instancien con sus propiedades
        ArrayObjetos[i] = new NavesEnemigas(arrayNavesEnemigas[(i*1)+2+i], arrayNavesEnemigas[(i*1)+3+i],Matriz);
    }
  /*  for(let i = 0; i<numNaves-1; i++){//hacer que mi poderoso metodo funciones
        ArrayObjetos[i].JustTheCreator()//jalando
    }*/
    console.log(ArrayObjetos[0]);
    ArrayObjetos[0].JustTheCreator();
    ///   constructor(ejeX, ejeY, matrizDondeSeTrabaja)   
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
dibujarReticula();//esta es la reticula del 
lienzoBase.closePath();