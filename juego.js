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
       
          //  console.log(lol)
            console.log('----------------------')
            matrizDondeSeTrabaja[inicioY][inicioX] = 0;
        //y que la nave pueda moverse   ----  inicioX     inicioY  
        switch(event.code){
                case "KeyW": if (inicioY == 0) {
                                inicioY = 20;
                            }else{
                                inicioY--;
                            }
                    break;
                case "KeyS": if (inicioY == 20) {
                                inicioY = 0;
                            }else{
                                 inicioY++;
                            }
                    break;
                case "KeyA": if (inicioX == 0) {
                                 inicioX = 20;
                            }else{
                                 inicioX--;   
                            }
                    break;
                case "KeyD": if (inicioX == 20) {
                                inicioX = 20;
                            } else {
                                inicioX++;    
                            }              
                    break;
        }   
         matrizDondeSeTrabaja[inicioY][inicioX] = 1;
        console.log(matrizDondeSeTrabaja);
    });
    }
    }
////-------------------------------------------------------------------------------------------------------
////-------------------------------------------------------------------------------------------------------
////-------------------------------------------------------------------------------------------------------
function dibujarReticula(){//funcion que se puede quitar cuando se pase el juego
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
    // funcion para refrescar todo
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
function colocarPosicionesAleatorias(numNaves){
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
    return arrayNavesEnemigas;
}

///-----------------------------------------------------------------------------------------------
///--------------------Ejecuciones----------------------------------------------------------------
///-----------------------------------------------------------------------------------------------
//MatrizBase(); ///this will be a mess


colocarPosicionesAleatorias(8);//si solo se pone 1, sera la principal xd
//console.log(colocarPosicionesAleatorias(8));
console.log('------')
console.log(colocarPosicionesAleatorias(8))
/*const nave = new PersonajePrincipal (3,3,MatrizPrincipal);
nave.mover()*/

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