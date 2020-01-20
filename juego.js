///Apartado de notas jajaja pondre lo que voy a hacer

//-------Fer-------
///poner evento para que la nave pueda moverse hacia harriba y abajo con el pntero del mouse y uqe pueda dar vuelta
//mezclar lo de beto y lo mio para la rotacion de la camara
//Haver el objeto explosion que eliminara de la matriz del arreglo
//ver tree.js
//Acabar el objeto balas jajajaj

//--------Diego---------
//ver tree.js
////------Beto-------------
//ver tree.js
//-------IDEAS que tenga--------------

///-------
//-------------DEclaracion de variables
var limit = 20;//Numero de casillas de la matriz
var tamCanvas= 200;//Tama;o del canvas
var velocidad = 1000;//Esta variable dira que tan rapido las naves reacionaran
var matrizPrincipal = document.getElementById('matrizBase');//puede ser o no el canvas principal xd
var numnaves = 20; //numero de naves que hay declaradas
var rango = 1; //Nos dice que tanto ven las naves enemigas a su alrdedor
var velDisparo = 1000; //Velocidad de disparo de las naves.
var numasteroides = 20; //Cuantos asteroides se crean
var MatrizThatMakeMeCry = ArrayBaseDeLaNaves(numnaves,numasteroides);//tipo instanciando la matriz principal

//Declarar canvas para tres dimensiones
var matricesPrincipales= new Array();
for(let i=1; i<=limit; i++){
  matricesPrincipales[i-1] = document.getElementById('matrizBase'+i);
}
var lienzosBase = new Array();
for(let i in matricesPrincipales){
  lienzosBase[i]=matricesPrincipales[i].getContext('2d');
}

var ArrayObjetos; //Aquí se guardan todas las naves y asteroides.
var patterns = new Array( //Array con todos los diferentes patrones, el primer número es la velocidadf
                  new Array(100,2,2),
                  new Array(100,1,1),
                  new Array(100,3,3),
                  new Array(100,4,4),
                  new Array(200,2,2,2,2,2,2,2),
                  new Array(100,1,1,1,1,1,1,1),
                  new Array(100,2,2,2,2,2,2,2),
                  new Array(100,3,3,3,3,3,3,3),
                  new Array(100,4,4,4,4,4,4,4),
                  new Array(100,5,5,5,5,5,5,5),
                  new Array(100,6,6,6,6,6,6,6),
                  new Array(300,1,1,1,2,2,2),
                  new Array(300,3,3,3,4,4,4),
                  new Array(300,1,1,2,2,3,3),
                  new Array(100,3,3,5,5,5,1,1),
                  new Array(100,4,4,6,6,6,2,2),
                  new Array(300,1,1,1,1,3,3,3,3,2,2,2,4,4,4),
                  new Array(100,2,2,2,2,2,2,2,4,4,4,4,3),
                  new Array(200,3,3,3,3,3,4,4,3,2,1,2,1)
              );


//--------------------------------OBJETOS------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//Matriz[0][1], Matriz[0][2],
class PersonajePrincipal{
       constructor (matrizDondeSeTrabaja) {
            this.matrizDondeSeTrabaja = matrizDondeSeTrabaja;
        }
        mover(){
            var matrizDondeSeTrabaja = this.matrizDondeSeTrabaja;
            document.addEventListener('keydown', function(event) {//PARA RECONOCER LA tECLAS
            var corriendo =  ChooseWhereToMove('#00e0ff',matrizDondeSeTrabaja, matrizDondeSeTrabaja[0][1], matrizDondeSeTrabaja[0][2],matrizDondeSeTrabaja[0][3], event.code,"KeyW", "KeyS", "KeyA", "KeyD","KeyR","KeyF", 0);
            matrizDondeSeTrabaja[0][1]=corriendo[0];//se reinia la cuenta para que se pueda mover la neve
            matrizDondeSeTrabaja[0][2]=corriendo[1];//es algo idiota pero funciona jajajaja
            matrizDondeSeTrabaja[0][3]=corriendo[2];//es algo idiota pero funciona jajajaja

            });
        }
    }

class NavesEnemigas{
        constructor(matrizDondeSeTrabaja, number){//el
            this.workingMat = matrizDondeSeTrabaja;
            this.number = number;//indice dentro de la matriz principal donde se guardara la nave
            this.numero =  0;//luego esto tengra que cambiar a 5 para que puedan
            this.rango = rango; //determina el rango de visión;
            this.dist_player = 0; //Guarda la distancia de la nave al jugador
            this.pattern_move = 0; //Determina el siguiente movimiento
            this.current_pattern = NumerosAleatorios(8)-1; //Dice que patrón está haciendo actualmente
            //disparar
        }
        JustTheCreator(){//este metodo ara que las naves se muevan y  si tiempo que disparen
            //usara la funcion switch que cree
            function MainBucle(velocidad, matriz, x, y , z,move, ar1, ar2, ar3, ar4,ar5,ar6, position,current_pattern,pattern_move,patterns){ //Aqui se tendra que correr el bucle de las naves
                if(matriz[position][0]!=0){
                  setTimeout(function(){
                    this.dist_player=DistFromPlayer(matriz,x,y,z);
                    //El parametro primer parametro sera cambiado por quien disparo xd, pero siento que se tendra que pasar
                    //un evento para disparar con el mouse
                    var numero = 0;
                    if(this.dist_player <=rango){
                      if(this.dist_player <= 3){
                          velocidad = velDisparo;
                         console.log("pium");  //Aquí dispararía vavava ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                         numero = 0;
                      }
                      else{
                        numero = ChasePlayer(matriz,x,y,z);
                        velocidad = 200;
                      }
                    }
                    else{
                      if(pattern_move == patterns[current_pattern].length){
                        current_pattern = NumerosAleatorios(8)-1;
                        pattern_move = 1;
                      }
                      numero=patterns[current_pattern][pattern_move];
                      pattern_move++;
                      velocidad = patterns[current_pattern][0];
                    }

                    var itsRunnig = ChooseWhereToMove('red',matriz, x, y, z, move, ar1, ar2, ar3, ar4, ar5, ar6, position);
                    MainBucle(velocidad, matriz, itsRunnig[0], itsRunnig[1], itsRunnig[2],numero, ar1, ar2, ar3, ar4, ar5, ar6, position,current_pattern,pattern_move,patterns);
                  }, velocidad);
                }
            }

            function DistFromPlayer(matrizDondeSeTrabaja,x,y,z,rango){ //Nos da la distancia al jugador
              var dist = Math.pow((matrizDondeSeTrabaja[0][1]-x),2) + Math.pow((matrizDondeSeTrabaja[0][2]-y),2) + Math.pow((matrizDondeSeTrabaja[0][3]-z),2);
              dist = Math.sqrt(dist);
              return dist;
            }
            function ChasePlayer(matrizDondeSeTrabaja,x,y,z){ //Nos dice como perseguir al jugador, elige la distancia que sea menor entre los ejes x, y y z
              var dy = matrizDondeSeTrabaja[0][1]-y;
              var dx = matrizDondeSeTrabaja[0][2]-x;
              var dz = matrizDondeSeTrabaja[0][3]-z;
              var retur = 0;
              if( ( (Math.abs(dx) <= Math.abs(dy))  && (Math.abs(dx) <= Math.abs(dz)) ) || dy ==0){
                if(dx < 0)
                  retur=3;
                if(dx > 0)
                  retur=4;
              }
              if( ( (Math.abs(dy) < Math.abs(dx))  && (Math.abs(dy) < Math.abs(dz)) ) || dx ==0){
                if(dy < 0)
                  retur=1;
                if(dy > 0)
                  retur=2;
              }
              if( ( (Math.abs(dz) < Math.abs(dy))  && (Math.abs(dz) < Math.abs(dx)) ) || dz == 0){
                if(dz < 0)
                  retur=5;
                if(dz > 0)
                  retur=6;
              }
              return retur;
            }
        //console.log(this.number)
        MainBucle(1000, this.workingMat, this.workingMat[this.number][1], this.workingMat[this.number][2], this.workingMat[this.number][3], this.numero, 1, 2, 3, 4, 5, 6, this.number,this.current_pattern, this.pattern_move,patterns);
        }

    }

    class Asteroide{
            constructor(matrizDondeSeTrabaja, number){//el
                this.workingMat = matrizDondeSeTrabaja;
                this.number = number;//indice dentro de la matriz principal donde se guardara el asteroide
                this.direction = NumerosAleatorios(6); //Dice hacia donde se mueve
                //disparar
            }
            JustTheCreator(){//este metodo ara que las naves se muevan y  si tiempo que disparen
                //usara la funcion switch que cree
                function MainBucle(velocidad, matriz, x, y, z, move, ar1, ar2, ar3, ar4, ar5,ar6,position){ //Aqui se tendra que correr el bucle de las naves
                  if(matriz[position][0]!=0){
                    setTimeout(function(){
                      var itsRunnig = ChooseWhereToMove("black",matriz, x, y, z, move, ar1, ar2, ar3, ar4, ar5, ar6, position);
                      MainBucle(velocidad, matriz, itsRunnig[0], itsRunnig[1], itsRunnig[2], move, ar1, ar2, ar3, ar4, ar5, ar6, position);
                    }, velocidad);
                  }
                }
            //console.log(this.number)
            MainBucle(1000, this.workingMat, this.workingMat[this.number][1], this.workingMat[this.number][2], this.workingMat[this.number][3], this.direction, 1, 2, 3, 4, 5, 6, this.number);
            }
      }
      class balas{//NOTE: la matriz del juego esta declarada arriba sera global, por que necesito que sea la actualizada para
        //la comparacion de las colisiones
//matriz donde corre el juego || cordenadas conde empezo a disparar || coordenadas a donde va
constructor(whereX, whereY, whereZ, ObjX, ObjY, ObjZ, Killed, limiteCampoJuego){
 //kileed se refiere al indicador de la nave que se quiere matar
    function graficadoraBullet(x,y,z,x2,y2,z2, limite){
        var cont = x;
        var VectorDirector = [x2-x,y2-y,z2-z];//vector que dara la direccion 
        var ArrayX = new Array(0);//okey so, here i should push negative numbers that would be dump
        var ArrayY = new Array(0);
        var ArrayZ = new Array(0);
        if(x2 < x)
            while(cont != 0){
                ArrayX.push(cont);
                cont--;
            }
        else
            while(cont != limite){
                ArrayX.push(cont);
                cont++;   
            }////
        for (let i = 0; i < ArrayX.length; i++){//loop of arrayY
            if(VectorDirector[0]!= 0){
                ArrayY.push(Math.round((VectorDirector[1]*((ArrayX[i]-x)/VectorDirector[0]))+y));    
                ArrayZ.push(Math.round((VectorDirector[2]*((ArrayX[i]-x)/VectorDirector[0]))+z));      
            }else{
                ArrayY.push(y)
                ArrayZ.push(z)
            }
        }       
        var TheRegret = [ArrayX, ArrayY, ArrayZ] ;  //we are going to return 3 arrayS
        return TheRegret;

    }
this.MatrizBalas3d = graficadoraBullet(whereX, whereY, whereZ, ObjX, ObjY, ObjZ,limiteCampoJuego);
this.WhoToKill = Killed;//esto sera para que no exista el fuego amigo
console.log(this.MatrizBalas3d);
}
MidnightBlame(){ //NOTE: la varaible de las naves es global tinee que estar declarada arriba
var Coun = 0;
function GodsLoop(MatBalas, Coun, WhoToKill){
    
 
    setTimeout(function(){
        if(Coun < MatBalas[0].length){
           
            var Everything = tontaVariable; //Aqui tengo que poner la matriz de IWannaCry
            if( WhoToKill== 2){//cuendo le disparen a la nave principal
                console.log('Im in')//ver si se mete al buble
                //Everything es la matriz donde estan todas la anves
                if(MatBalas[0][Coun]==Everything[0][1]&&MatBalas[1][Coun]==Everything[0][2]&&MatBalas[2][Coun]==Everything[0][3]){
                    console.log('impacto a una nave')
                }else{
                    Coun++;
                    GodsLoop(MatBalas, Coun, WhoToKill);
                }  
            }else if(this.WhoToKill == 1){//cuando le dispare a una nave enemiga
                console.log('no se por que se  metio')
            }
        }        
    },100);//velocidad de las balas se puede cambiar
}
GodsLoop(this.MatrizBalas3d ,Coun,this.WhoToKill);
}//llave del fin del metodo
}
     ////-----------------------------JIJIJIIJIJ aQUI IRA EL OBJETO DE LAS BALAS
////-----------------------------------------------------------------------------------------------------------------------
////----------------------------FUNCIONES----------------------------------------------------------------------------------
////-----------------------------------------------------------------------------------------------------------------------
//  value valie sirve para saber el indice donde se guardara el incie de la matriz que me hace llorar
function ChooseWhereToMove(color,matriz, x, y, z, event, argu1, argu2, argu3, argu4, argu5, argu6, value){//switch para elegir
    //donde se va a mover cada nave, servira para la principal y para las naves enemigas
    LimpiarLaMatriz(x, y, z, "white");
    //y que la nave pueda moverse   ----  inicioX     inicioY
    var type =MatrizThatMakeMeCry[value][0];
    regreso = [null,null,null,0];

    for(var i in MatrizThatMakeMeCry){
      if(MatrizThatMakeMeCry[i][1]==x && MatrizThatMakeMeCry[i][2]==y && MatrizThatMakeMeCry[i][3]==z){

        if(MatrizThatMakeMeCry[i][0]!=MatrizThatMakeMeCry[value][0]){
          if(MatrizThatMakeMeCry[i][0]!=2)
            MatrizThatMakeMeCry[i]=[0,null,null,null];
          if(MatrizThatMakeMeCry[value][0]!=2)
            type = 0;
          if(MatrizThatMakeMeCry[value][0]==2||MatrizThatMakeMeCry[i][0]==2)
            console.log("perdiste");
          color = "white";
        }

      }
   }

    if (type!=0){
      switch(event){
          case argu1:if(y==0)
                          y = limit-1;
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
          case argu5: if(z==0)
                          z = limit-1;
                      else
                          z--;
              break;
          case argu6: if(z==limit-1)
                          z=0;
                      else
                          z++;
              break;
      }

      regreso = [x, y, z, type];
      //ponerLasNavesEnLaMatriz(matriz);/////////////////////////////////Arreglar
  }
  MatrizThatMakeMeCry[value] = [regreso[3],regreso[0],regreso[1],regreso[2]];
  if(type!=0)
    LimpiarLaMatriz(x, y, z, color);
  //console.log(MatrizThatMakeMeCry)
   return regreso

}

function dibujarReticula(lienzo){//funcion que se puede quitar cuando se pase el juego
    ///Solo sirve aqui en canvas esta funcion se ira muy lejos jajajaja
    //vertical
    for(let i = 0; i <= tamCanvas; i+=(tamCanvas/limit)){
        lienzo.moveTo(i, 0);
        lienzo.lineTo(i, tamCanvas);
    }
    //horizontal
    for(let i = 0; i <= tamCanvas; i+=(tamCanvas/limit)){
        lienzo.moveTo(0,i);
        lienzo.lineTo(tamCanvas, i);
    }
    lienzo.stroke();//el que las dibuja
}

function ponerLasNavesEnLaMatriz(matrizDeclarada){//cada que se mueva se tendra que correr esta
    ///Matriz solo de la de canvas
    // funcion para refrescar todo  //solo es para pintarla
    /*console.log('dipdup')
    console.log(matrizDeclarada)*/
    for(let i=0; i<matrizDeclarada.length; i++){ //colocar las cosas en su lugar
        var lienzo = lienzosBase[matrizDeclarada[i][3]];

        lienzo.beginPath();//EMPEZAR EL DIBUJO
        if(matrizDeclarada[i][0] == 2)
             lienzo.fillStyle = "blue";//color que quieran
        else if(matrizDeclarada[i][0] == 1){
              lienzo.fillStyle =  "red";//color que quieran
        }
        else if(matrizDeclarada[i][0] == 3)
              lienzo.fillStyle = "black"; //Color de asteroides

        var proporción = (tamCanvas/limit);
        lienzo.rect((matrizDeclarada[i][1]*(proporción)+(proporción/13)), (matrizDeclarada[i][2]*(proporción)+(proporción/13)), (proporción)-(proporción/10), (proporción)-(proporción/10));//poner las cuadrados tal ves hay que
        //tal vez hay que cambiar el cuadro de los cuaros 10
        lienzo.fill();// poder rellenar de color el fondo del canvas
        lienzo.closePath();
    }

}

function LimpiarLaMatriz(x, y, z, color){ //funcion para limpiar la pos anterior
    ///Funcion que hace que hace que se borre el rastro de la nave en la matriz de canvas
    var lienzo = lienzosBase[z];
    lienzo.beginPath();//EMPEZAR EL DIBUJO
    lienzo.fillStyle = color;//color que quieran

    var proporción = (tamCanvas/limit);
    lienzo.rect(((x*(proporción))+(proporción/13)), ((y*(proporción))+(proporción/13)), (proporción)-(proporción/10), (proporción)-(proporción/10));//poner las cuadrados tal ves hay que
    lienzo.fill();// poder rellenar de color el fondo del canvas
    lienzo.closePath();
}

///----------------FUNCTIONS THAT I NEED TO COPY now they r modify---------------------------
function NumerosAleatorios(tope){
    return Math.floor((Math.random()*tope))+1;
}

function ArrayBaseDeLaNaves(numnaves,numast){//declarando el array de las naves y sus posiciones
    var total = numnaves + numast;
    var MatrizPrincipal = new Array(total);
    for (let i = 0; i < total; i++)
        MatrizPrincipal[i]=new Array(4);//array que dira si es una nave enemiga y sus posiciones en X,Y y Z

    //Colocar naves
    for (i=0; i<numnaves; i++){
        MatrizPrincipal[i][0] = 1;
        for (e=1; e<4; e++){
            MatrizPrincipal[i][e] = NumerosAleatorios(limit)-1;
        }
    }
    //Colocar asteroides
    for (i=numnaves; i<total; i++){
        MatrizPrincipal[i][0] = 3;
        for (e=1; e<4; e++){
            MatrizPrincipal[i][e] = NumerosAleatorios(limit)-1;
        }
    }

    MatrizPrincipal[0][0] = 2;
return MatrizPrincipal;
}


 //poner posiones de las naves y ver donde vas a empezar funcion importante xd
function colocarPosicionesAleatorias(numNaves,numAst){//saber donde estaran las naves al inicio
    //tambien es medio la base de todo el juego espero que esto cambie
   // var Matriz = ArrayBaseDeLaNaves(numNaves);//tipo instanciando la matriz principal
    ponerLasNavesEnLaMatriz(MatrizThatMakeMeCry)//ibujar la matriz de nuemeros en esta de canvas
    //instanciando el objeto principal ----------------------
    const nave = new PersonajePrincipal(MatrizThatMakeMeCry);
    nave.mover()//haciendo que el objeto funcione  las teclas

    //-----------------Delcarando todas las naves enemigas que hay--------------------
    var total = numAst + numNaves;
    ArrayObjetos = new Array(total-1);//aqui correran todos los objetos de las naves enemigas
    for(let i = 0; i< (numNaves-1); i++){//funcion para que los objetos se instancien con sus propiedades
        ArrayObjetos[i] = new NavesEnemigas(MatrizThatMakeMeCry, i+1);
        ArrayObjetos[i].JustTheCreator();//Js es una mamada jajaja
    }

    for(let i = numNaves; i< total; i++){//funcion para que los objetos se instancien con sus propiedades
        ArrayObjetos[i] = new Asteroide(MatrizThatMakeMeCry, i);
        ArrayObjetos[i].JustTheCreator();//Js es una mamada jajaja
    }

}
///-----------------------------------------------------------------------------------------------
///--------------------Ejecuciones----------------------------------------------------------------
///-----------------------------------------------------------------------------------------------
//               Funcion principal que corre todo el juego
colocarPosicionesAleatorias(numnaves,numasteroides)//esta ganando mucha importancia esta funcion


//------------------------------------------------------------------------------------------------
//-------------PURO CAMVAS------- (matriz de los monitos)--------------------------------

for(var i in lienzosBase){
  lienzosBase[i].beginPath();//EMPEZAR EL DIBUJO
  //dibujar la reticula
  dibujarReticula(lienzosBase[i]);
  lienzosBase[i].closePath();
}
