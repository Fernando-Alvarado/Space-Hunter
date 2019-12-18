//-------------DEclaracion de variables 
var limit = 50;//Numero de casillas de la matriz
var tamCanvas= 500;//Tama;o del canvas
var matrizPrincipal = document.getElementById('matrizBase');//puede ser o no el canvas principal xd
var lienzoBase = matrizPrincipal.getContext('2d');

//--------------------------------OBJETOS------------------------------------------------------------
class PersonajePrincipal{
    constructor () { //poder las variables de constructor
       
     }

}
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
        console.log(arrayNavesEnemigas)         
    //colocando posicion de la nave principla
        Matriz[arrayNavesEnemigas[0]][arrayNavesEnemigas[1]] = 2;    
    //  Colocar las naves en la matriz de las naves enemigas  
   for(let i=2; i< (numNaves * 2); i+=2){   
        Matriz[arrayNavesEnemigas[i]][arrayNavesEnemigas[i+1]] = 1; 
    }
    console.log(Matriz);
    return arrayNavesEnemigas;
}

///-----------------------------------------------------------------------------------------------
///--------------------Ejecuciones----------------------------------------------------------------
///-----------------------------------------------------------------------------------------------
//MatrizBase(); ///this will be a mess


colocarPosicionesAleatorias(5);//si solo se pone 1, sera la principal xd

//console.log()

//---Creo que necesitaremos poner un funcion como setTimeout(function(){ alert("Hello"); }, 3000); --
//como ciclo principal


//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//-------------PURO CAMVAS------- (matriz de los monitos)--------------------------------
lienzoBase.beginPath();//EMPEZAR EL DIBUJO
       /* lienzoBase.fillStyle = "green";//color que quieran
        lienzoBase.rect(0, 0, 500, 500);// ver cuanto queremos rellenarlo
        lienzoBase.fill();// poder rellenar de color el fondo del canvas   */


//ciclo para dibujar

dibujarReticula();



lienzoBase.closePath();