//-------------DEclaracion de variables
var limit = 50;//Numero de casillas de la matriz
var tamCanvas= 500;//Tama;o del canvas
var velocidad = 1000;//Esta variable dira que tan rapido las naves reacionaran
var matrizPrincipal = document.getElementById('matrizBase');//puede ser o no el canvas principal xd
var lienzoBase = matrizPrincipal.getContext('2d');
var numnaves = 50; //numero de naves que hay declaradas
var rango = 8; //Nos dice que tanto ven las naves enemigas a su alrdedor
var numasteroides = 50; //Cuantos asteroides se crean
var MatrizThatMakeMeCry = ArrayBaseDeLaNaves(numnaves,numasteroides);//tipo instanciando la matriz principal
var ArrayObjetos; //Aquí se guardan todas las naves y asteroides.
var patterns = new Array( //Array con todos los diferentes patrones, el primer número es la velocidad
                  new Array(100,2,2),
                  new Array(100,1,1),
                  new Array(100,3,3),
                  new Array(100,4,4),
                  new Array(200,2,2,2,2,2,2,2),
                  new Array(100,1,1,1,1,1,1,1),
                  new Array(100,2,2,2,2,2,2,2),
                  new Array(100,3,3,3,3,3,3,3),
                  new Array(100,4,4,4,4,4,4,4),
                  new Array(300,1,1,1,2,2,2),
                  new Array(300,3,3,3,4,4,4),
                  new Array(300,1,1,2,2,3,3),
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
            var corriendo =  ChooseWhereToMove("blue",matrizDondeSeTrabaja, matrizDondeSeTrabaja[0][2], matrizDondeSeTrabaja[0][1], event.code,"KeyW", "KeyS", "KeyA", "KeyD", 0);
            matrizDondeSeTrabaja[0][2]=corriendo[0];//se reinia la cuenta para que se pueda mover la neve
            matrizDondeSeTrabaja[0][1]=corriendo[1];//es algo idiota pero funciona jajajaja

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
            function MainBucle(velocidad, matriz, y, x ,move, ar1, ar2, ar3, ar4, position,current_pattern,pattern_move,patterns){ //Aqui se tendra que correr el bucle de las naves
                if(matriz[position][0]!=0){
                  setTimeout(function(){
                    this.dist_player=DistFromPlayer(matriz,y,x);
                    //El parametro primer parametro sera cambiado por quien disparo xd, pero siento que se tendra que pasar
                    //un evento para disparar con el mouse
                    var numero = 0;
                    if(this.dist_player <=rango){
                      if(this.dist_player <= 3){
                         console.log("pium");  //Aquí dispararía vavava ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                         numero = 0;
                      }
                      else{
                        numero = ChasePlayer(matriz,x,y);
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


                    var itsRunnig = ChooseWhereToMove("red",matriz, y, x, move, ar1, ar2, ar3, ar4, position);
                    MainBucle(velocidad, matriz, itsRunnig[0], itsRunnig[1], numero, ar1, ar2, ar3, ar4, position,current_pattern,pattern_move,patterns);
                  }, velocidad);
                }
            }

            function DistFromPlayer(matrizDondeSeTrabaja,y,x,rango){ //Nos da la distancia al jugador
              var dist = Math.pow((matrizDondeSeTrabaja[0][1]-x),2) + Math.pow((matrizDondeSeTrabaja[0][2]-y),2);
              dist = Math.sqrt(dist);
              return dist;
            }
            function ChasePlayer(matrizDondeSeTrabaja,x,y){ //Nos dice como perseguir al jugador
              var dy = matrizDondeSeTrabaja[0][2]-y;
              var dx = matrizDondeSeTrabaja[0][1]-x;
              var retur = 0;
              if((Math.abs(dx) <= Math.abs(dy)) || dy ==0){
                if(dx < 0)
                  retur=3;
                if(dx > 0)
                  retur=4;
              }
              if((Math.abs(dy) < Math.abs(dx)) || dx == 0){
                if(dy < 0)
                  retur=1;
                if(dy > 0)
                  retur=2;
              }
              return retur;
            }
        //console.log(this.number)
        MainBucle(1000, this.workingMat, this.workingMat[this.number][2], this.workingMat[this.number][1], this.numero, 1, 2, 3, 4, this.number,this.current_pattern, this.pattern_move,patterns);
        }

    }

    class Asteroide{
            constructor(matrizDondeSeTrabaja, number){//el
                this.workingMat = matrizDondeSeTrabaja;
                this.number = number;//indice dentro de la matriz principal donde se guardara el asteroide
                this.direction = NumerosAleatorios(4); //Dice hacia donde se mueve
                //disparar
            }
            JustTheCreator(){//este metodo ara que las naves se muevan y  si tiempo que disparen
                //usara la funcion switch que cree
                function MainBucle(velocidad, matriz, y, x ,move, ar1, ar2, ar3, ar4, position){ //Aqui se tendra que correr el bucle de las naves
                  if(matriz[position][0]!=0){
                    setTimeout(function(){
                      var itsRunnig = ChooseWhereToMove("black",matriz, y, x, move, ar1, ar2, ar3, ar4, position);
                      MainBucle(velocidad, matriz, itsRunnig[0], itsRunnig[1], move, ar1, ar2, ar3, ar4, position);
                    }, velocidad);
                  }
                }
            //console.log(this.number)
            MainBucle(1000, this.workingMat, this.workingMat[this.number][2], this.workingMat[this.number][1], this.direction, 1, 2, 3, 4, this.number);
            }
      }
      class balas{
        //matriz donde corre el juego || cordenadas conde empezo a disparar || coordenadas a donde va
        constructor(PrincipalMat, whereX, whereY, ObjX, ObjY, Killed, limiteCampoJuego){ //kileed se refiere a la nave a
            //que se le espero disparas, no se si quieran que se permita el fuego amigo    
            this.Matriz = PrincipalMat;//matris donde estan declaradas todas las naves
            this.WherX = whereX;//coordenadas iniciales
            this.WherY = whereY;
            this.ObjX = ObjX;//cordenadas a lo que se le disparo
            this.ObjY = ObjY;
            this.Killed = Killed;///a que va a matar, si es nave enemiga o no
            this.limCampJue = limiteCampoJuego;///limite de las dimensiones del campo de batalla
            function graficadora(x1, y1, x2, y2, limite){//Matriz de las balas
                var m = (y2-y1)/(x2-x1);
                const BalasDeLaMatriz = [new Array(0), new Array(0)];//sera el array de las balas la longitud que 
                var i = x1;
                while(i != limite && BalasDeLaMatriz[1][BalasDeLaMatriz[1].length-1] != limite){
                    if(m <= 2.5){
                        BalasDeLaMatriz[0].push(i);
                        BalasDeLaMatriz[1].push(Math.round((m*(i-x1))+y1));//la primera locacion siempre sera la nave donde
                        //se disparo
                    }else{
                        BalasDeLaMatriz[0].push(Math.round(i*.1));
                        BalasDeLaMatriz[1].push(Math.round(((m*(i-x1))+y1)*.1));
                    }
                    if(x1 > x2 && y1 > y2){//en caso de que la nave enemiga este a la izquierda
                        i--;
                        if(i == 0 || BalasDeLaMatriz[1][BalasDeLaMatriz[1].length-1] == 0)///para que encuentre el limite y no se haga
                            i = limite//un blucle infinito
                    }       
                    else 
                    i++;
               }//aqui se acaba la llave del while
                return BalasDeLaMatriz;
            }
            this.MatBalas = graficadora(this.WherX, this.WherY, this.ObjX, this.ObjY, this.limCampJue)
            console.log(this.MatBalas)
         }
        MidnightBlame(){
            var Coun = 0;
            function GodsLoop(MatBalas, MatOfGame, WhatIs, Coun){
                setTimeout(function(){ 
                    if(Coun != MatBalas[1].length){//Para que el bucle no se haga infinito
                        if(WhatIs == 2){//para chcar si es nave enemiga o amiga
                            if(MatBalas[0][Coun] == MatOfGame[0][1] && MatBalas[1][Coun] == MatOfGame[0][2]){
                                console.log('impacto a una nave')
                            }else{
                            MatOfGame = MatrizThatMakeMeCry; //a las matriz del juego necesito hacer que sea la mas actualizada
                            Coun++;
                                GodsLoop(MatBalas, MatOfGame, WhatIs, Coun);
                            }                                              
                        }else{
                             for(i=1; i< MatOfGame.length; i++)//checar la matriz del juego para poder comparar si hay un impacto
                                if(MatBalas[0][Coun]==MatOfGame[i][1] && MatBalas[1][Coun]==MatOfGame[i][2]){//saber si impactaste
                                     console.log('impacto a una nave enemiga')///codigo del impacto
                                }//no se cuento se alargue este, creo que hare otro objeto para la destruccion
                                else{
                                MatOfGame = MatrizThatMakeMeCry //a las matriz del juego necesito hacer que sea la mas actualizada
                                Coun++;
                                    GodsLoop(MatBalas, MatOfGame, WhatIs, Coun);
                                }
                                  
                        }
                    }     
                },100);//velocidad de las balas se puede cambiar
            }//Where func ends   PARAMETROS || MatRIZbALAS Balas, Matratriz del juego, WhatIs, Coun
            console.log("The object start");///solo para ver si sirve
            GodsLoop(this.MatBalas, this.Matriz, this.Killed, Coun);
        }//llave del fin del metodo  
     }

////-----------------------------------------------------------------------------------------------------------------------
////----------------------------FUNCIONES----------------------------------------------------------------------------------
////-----------------------------------------------------------------------------------------------------------------------
//  value valie sirve para saber el indice donde se guardara el incie de la matriz que me hace llorar
function ChooseWhereToMove(color,matriz,y, x, event, argu1, argu2, argu3, argu4, value){//switch para elegir
    //donde se va a mover cada nave, servira para la principal y para las naves enemigas
    LimpiarLaMatriz(y, x, "white");
    //y que la nave pueda moverse   ----  inicioX     inicioY
    var type =MatrizThatMakeMeCry[value][0];
    regreso = [null,null,0];

    for(var i in MatrizThatMakeMeCry){
      if(MatrizThatMakeMeCry[i][1]==x && MatrizThatMakeMeCry[i][2]==y){
        if(MatrizThatMakeMeCry[i][0]!=MatrizThatMakeMeCry[value][0]){
          if(MatrizThatMakeMeCry[i][0]!=2)
            MatrizThatMakeMeCry[i]=[0,null,null];
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
      regreso = [y, x, type];
      //ponerLasNavesEnLaMatriz(matriz);/////////////////////////////////Arreglar
  }
  MatrizThatMakeMeCry[value] = [regreso[2],regreso[1],regreso[0]];
  if(type!=0)
    LimpiarLaMatriz(y, x, color);
  //console.log(MatrizThatMakeMeCry)
   return regreso

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
    /*console.log('dipdup')
    console.log(matrizDeclarada)*/
    for(let i=0; i<matrizDeclarada.length; i++){ //colocar las cosas en su lugar
                lienzoBase.beginPath();//EMPEZAR EL DIBUJO
                if(matrizDeclarada[i][0] == 2)
                     lienzoBase.fillStyle = "blue";//color que quieran
                else if(matrizDeclarada[i][0] == 1)
                    lienzoBase.fillStyle = "red";//color que quieran
                else if(matrizDeclarada[i][0] == 3)
                  lienzoBase.fillStyle = "black"; //Color de asteroides

                lienzoBase.rect((matrizDeclarada[i][1]*10), (matrizDeclarada[i][2]*10), 10, 10);//poner las cuadrados tal ves hay que
                //tal vez hay que cambiar el cuadro de los cuaros 10
                lienzoBase.fill();// poder rellenar de color el fondo del canvas
                lienzoBase.closePath();
    }

}

function LimpiarLaMatriz(y, x, color){ //funcion para limpiar la pos anterior
    ///Funcion que hace que hace que se borre el rastro de la nave en la matriz de canvas
    lienzoBase.beginPath();//EMPEZAR EL DIBUJO
    lienzoBase.fillStyle = color;//color que quieran

    lienzoBase.rect((x*10), (y*10), 9, 9);//poner las cuadrados tal ves hay que
    lienzoBase.fill();// poder rellenar de color el fondo del canvas
    lienzoBase.closePath();
}

///----------------FUNCTIONS THAT I NEED TO COPY now they r modify---------------------------
function NumerosAleatorios(tope){
    return Math.floor((Math.random()*tope))+1;
}

function ArrayBaseDeLaNaves(numnaves,numast){//declarando el array de las naves y sus posiciones
    var total = numnaves + numast;
    var MatrizPrincipal = new Array(total);
    for (let i = 0; i < total; i++)
        MatrizPrincipal[i]=new Array(3);//array que dira si es una nave enemiga y sus posiciones en X,Y

    //Colocar naves
    for (i=0; i<numnaves; i++){
        MatrizPrincipal[i][0] = 1;
        for (e=1; e<3; e++){
            MatrizPrincipal[i][e] = NumerosAleatorios(limit);
        }
    }
    //Colocar asteroides
    for (i=numnaves; i<total; i++){
        MatrizPrincipal[i][0] = 3;
        for (e=1; e<3; e++){
            MatrizPrincipal[i][e] = NumerosAleatorios(limit);
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
lienzoBase.beginPath();//EMPEZAR EL DIBUJO
//dibujar la reticula
dibujarReticula();//esta es la reticula del
lienzoBase.closePath();
