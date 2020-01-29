///Apartado de notas jajaja pondre lo que voy a hacer

//-------Fer-------
//unir el evento de la torreta con diego
//unir el objeto balas con el de las naves, necesito que beto me de la animacion
//empezar a hacer la funcion pa que dispare el personaje principal


//-------------Bibliotecas
//tree.js

//-------------DEclaracion de variables
var limit = 100;//Numero de casillas de la matriz
var velocidad = 1000;//Esta variable dira que tan rapido las naves reacionaran
var numnaves = 100; //numero de naves que hay declaradas
var rango = 25; //Nos dice que tanto ven las naves enemigas a su alrdedor
var velDisparo = 1000; //Velocidad de disparo de las naves.
var numasteroides = 100; //Cuantos asteroides se crean

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// THREE.PerspectiveCamera: primer parámetro es la apertura de la cámara en grados, el segundo es el
// aspect ratio, una buena explicación aquí  https://es.wikipedia.org/wiki/Relaci%C3%B3n_de_aspecto
//https://scsarquitecto.cl/importancia-relacion-aspecto/
// ,se puede dejar ese parámetro o el más usado 16:9; el siguiente es cercanía y el cuarto es lejanía,
//significa que nos se renderearan (shit of translation DX) objetos más cercanos al valor de cercanía
//ni objetos más lejanos al valor de lejanía.

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
//Es necesario determinar el tamaño del rendereado, el aspect ratio es sólo una escala, aquí daremos las
//dimensiones. El primer parámetro es el tamaño horizontal, el segundo vertical, hay un tercer parámetro,
//el cual es true o false, en caso de ser false, se ejecutará el render con la mitad de la calidad
//(suponiendo que las dimensiones del canvas son de 100% x 100%), si no se pasa parámetro, se considera
//que es true y se ejecuta el render con resolución normal.
document.body.appendChild( renderer.domElement );


//Creamos el fondo
//Página generadora de fondos:
//http://wwwtyro.github.io/space-3d/#animationSpeed=1&fov=45&nebulae=true&pointStars=true&resolution=1024&seed=Interprepas1erlugar&stars=true&sun=true
{
  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    'img/back.png',
    'img/front.png',
    'img/top.png',
    'img/bottom.png',
    'img/right.png',
    'img/left.png',
  ]);
  scene.background = texture;
}



var MatrizThatMakeMeCry = ArrayBaseDeLaNaves(numnaves,numasteroides, scene);//tipo instanciando la matriz principal

//Colocamos a el jugador en su posición Inicial
camera.position.x = MatrizThatMakeMeCry[0][1];
camera.position.y = MatrizThatMakeMeCry[0][2];
camera.position.z = MatrizThatMakeMeCry[0][3];

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

    //Quitare la funcion choose  where to move del mono, por que ya no es necesaria xd
      JustTheCreator(){
          var working = [this.matrizDondeSeTrabaja[0][1],this.matrizDondeSeTrabaja[0][2],this.matrizDondeSeTrabaja[0][3]];
          
          function mover(matriz){
            setTimeout(function(){
            //  var lol = [matriz[0][1], matriz[0][2],matriz[0][3]]
              //  MatrizThatMakeMeCry   //esta es la matriz con todas la posiciones
                matriz[0][1] = camera.position.x;
                matriz[0][2] = camera.position.y;
                matriz[0][3] = camera.position.z;
                matriz[0][4].position.x = matriz[0][1];
                matriz[0][4].position.y = matriz[0][2];
                matriz[0][4].position.z = matriz[0][3];
                matriz[0][4].rotation.x = camera.rotation.x;
                matriz[0][4].rotation.y = camera.rotation.y;
                matriz[0][4].rotation.z = camera.rotation.z;
                //Diego aqui iria tu codigo, que corria el movimiento de la camara
              mover(matriz);
            }, 50);
           
          }
          mover(this.matrizDondeSeTrabaja);
          renderer.domElement.addEventListener("click", function(){
            //var lol = [this.matrizDondeSeTrabaja[0][1], this.matrizDondeSeTrabaja[0][2],this.matrizDondeSeTrabaja[0][3]]
          //  console.log(lol)
          var resum = [MatrizThatMakeMeCry[0][1], MatrizThatMakeMeCry[0][2],MatrizThatMakeMeCry[0][3]];
         if(resum[0]==working[0]&&resum[1]==working[1]&&resum[2]==working[2])//validando pa que no se hagan el mismo punto al anicio
            resum[2]++;//o que en un futuro sea el mismo xd
           ///---Hciedno el disparo de la nave principal
           //whereX, whereY, whereZ, ObjX, ObjY, ObjZ, Killed, limiteCampoJuego
           console.log(working)///inicio punto fijo
           console.log(resum)//nave moviendose
            var JustAnotherBorringShoot = new balas(working[0], working[1],working[2],resum[0],resum[1],resum[2],1,limit)//constructro del objeto balas
            JustAnotherBorringShoot.MidnightBlame();
            console.log(JustAnotherBorringShoot)
          });

          
         
          
      }
            //Aqui iria el codigo del evento del mouse, pa que se mueva la camara con el mouse
    }
//este objeto controlara el movimiento de la nave usando el mouse, para subir y poder rotar la torreta
class CabinaDeControl {//cosa para que las neves puedan rotar y moverse hacia arriba y abajo
      constructor( canvas){//solo necesito el evento que haga que me regrese los valores de las posiciones del mouse
          ///aqui hayq ue poner la pantalla y no el canvas para
          this.WhereItWorks = canvas;
          //si ancho y alto son iguales se va uno
          this.inicioCamaraTorre = 5; //empieza a 90 grados jeje
          //Aqui hay que ejecutar funcion pa que este en 90 grados
      }
      Torreta(){//todo tiene que se se un loop para que se pregunte a cada si lo hace o no
          //si el mas esta a un tercio de la pantalla bajo, no se si sea mucho
          var WhereOnX = null; //posicon del mouse en X
          var WhereOnY = null; //posicon del mouse en Y
          var MedidaPantalla = this.WhereItWorks.width; //medidas de la pantalla
          var MedidaEnY = this.WhereItWorks.height; //el alto de la pantalla
          var OriginalPosition = this.inicioCamaraTorre; //EMPIEZA AQUI la vista de la camar
          //console.log(this.RotationPosition)//para ver donde esta funcionando el evento
          this.WhereItWorks.onmousemove = function(e){
              WhereOnX = e.pageX;//dice el valor de los eventos en tiempo real
              WhereOnY = e.pageY;//valor de y en real time
          }
          setInterval(CheckWhereTheHellIsIn, 100);
          function CheckWhereTheHellIsIn(){
                  //esto es para que pueda rotar la pantalla del jugador
                  if(WhereOnX< (MedidaPantalla)/4){//girar a la derecha
                      camera.rotation.y += .1;
                  }
                  else if(WhereOnX> ((MedidaPantalla)/4)*3){//girara a la girar a la izquierda
                      camera.rotation.y -= .1;
                  }
                   //   console.log(this.RotationPosition[OriginalPosition])
                  //the last thing to do
          }
          setInterval(updown, 100);//para que pueda rotrar lal camara de arriba hacia abajo
          function updown(){
            //para que la nave pueda subir o bajar
            if(WhereOnY < (MedidaEnY)/3 && camera.position.y != limit-1){ //hace que la nave baja
                var parametro = 0;

                camera.position.y +=1;

                //aqui se hara que la nave suba
            }else if(WhereOnY > ((MedidaEnY)/3)*2 && camera.position.y != 0){//si esta arriba de 2/3 la nave empezara asubir
                var parametro = 1;

                camera.position.y -=1;
                //Aqui se hara que la nave baje
            }
          }
        //  setInterval(adelante, 100); Para que la nave pueda avanzar hacia adelante sola
        //el chacador de si esta apto para para que se pueda mover solo va aqui
          setInterval(adelante,300);
          function adelante(){//arriba dice que hace


            var direction = camera.getWorldDirection();  //Obtenemos el vector director de la nave principal
            direction.x = Math.round(direction.x); //Rendondeamos ambas direcciones para que no tengamos posiciones no enteras
            direction.z = Math.round(direction.z);

            camera.position.add(direction.multiplyScalar(1)); //Agregamos ese vector multiplicándolo por un número para ajustar la velocidad

            //En caso de que se qwuiera salir de el área delimitada, lo regresamos
            if(camera.position.x >= limit-1){
              camera.position.x = limit-1;
            }
            if(camera.position.x <= 0){
              camera.position.x = 0;
            }

            if(camera.position.z >= limit-1){
              camera.position.z = limit-1;
            }
            if(camera.position.z <= 0){
              camera.position.z = 0;
            }

          }
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
            this.current_pattern = NumerosAleatorios(patterns.length)-1; //Dice que patrón está haciendo actualmente
            //disparar
        }
        JustTheCreator(){//este metodo ara que las naves se muevan y  si tiempo que disparen
            //usara la funcion switch que cree
            function MainBucle(velocidad, matriz, x, y , z,move, position,current_pattern,pattern_move,patterns){ //Aqui se tendra que correr el bucle de las naves
                if(matriz[position][0]!=0){
                  setTimeout(function(){
                    this.dist_player=DistFromPlayer(matriz,x,y,z);
                    //El parametro primer parametro sera cambiado por quien disparo xd, pero siento que se tendra que pasar
                    //un evento para disparar con el mouse
                    var numero = 0;
                    if(this.dist_player <=rango){
                      if(this.dist_player <= 15){//Aqui dispara la nave enemiga---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                          ///----------------------------------Parametros----------------------------------------------
                          //whereX, whereY, whereZ, ObjX, ObjY, ObjZ, Killed, limiteCampoJuego
         //kileed se refiere al indicador de la nave que se quiere matar
                //2 es la nave principal
                //MatrizThatMakeMeCry
                //necesito saber quien disparo
                //console.log('dispare')
                      var disparoNaveEnemiga = new balas(MatrizThatMakeMeCry[position][1], MatrizThatMakeMeCry[position][2], MatrizThatMakeMeCry[position][3], MatrizThatMakeMeCry[0][1], MatrizThatMakeMeCry[0][2], MatrizThatMakeMeCry[0][3] ,2,limit)//constructro del objeto balas
                      disparoNaveEnemiga.MidnightBlame();
                      numero = 0;
                      }
                      else{
                        numero = ChasePlayer(matriz,x,y,z);
                        velocidad = 200;
                      }
                    }
                    else{ //Si el personaje principal no está en rango, sigue con su patrón de movimiento o elige uno nuevo
                      if(pattern_move == patterns[current_pattern].length){
                        current_pattern = NumerosAleatorios(patterns.length)-1;
                        pattern_move = 1;
                      }
                      numero=patterns[current_pattern][pattern_move];
                      pattern_move++;
                      velocidad = patterns[current_pattern][0];
                    }

                    var itsRunnig = ChooseWhereToMove( x, y, z, move,  position);
                    //NMovemos el render
                    if(itsRunnig[0]!=null){
                      MatrizThatMakeMeCry[position][4].position.x = itsRunnig[0];
                      MatrizThatMakeMeCry[position][4].position.y = itsRunnig[1];
                      MatrizThatMakeMeCry[position][4].position.z = itsRunnig[2];
                    }
                    //lo añadimos a la escena
                    MainBucle(velocidad, matriz, itsRunnig[0], itsRunnig[1], itsRunnig[2],numero,  position,current_pattern,pattern_move,patterns);
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
        MainBucle(1000, this.workingMat, this.workingMat[this.number][1], this.workingMat[this.number][2], this.workingMat[this.number][3], this.numero, this.number,this.current_pattern, this.pattern_move,patterns);
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
                function MainBucle(velocidad, matriz, x, y, z, move, position){ //Aqui se tendra que correr el bucle de las naves
                  if(matriz[position][0]!=0){
                    setTimeout(function(){
                      var itsRunnig = ChooseWhereToMove(x, y, z, move,  position);//quite todos los parametros inecesarios
                      //Movemos el render
                      if(itsRunnig[0]!=null){
                        MatrizThatMakeMeCry[position][4].position.x = itsRunnig[0];
                        MatrizThatMakeMeCry[position][4].position.y = itsRunnig[1];
                        MatrizThatMakeMeCry[position][4].position.z = itsRunnig[2];
                      }
                      MainBucle(velocidad, matriz, itsRunnig[0], itsRunnig[1], itsRunnig[2], move,  position);
                    }, velocidad);
                  }
                }
            //console.log(this.number)
            MainBucle(1000, this.workingMat, this.workingMat[this.number][1], this.workingMat[this.number][2], this.workingMat[this.number][3], this.direction, this.number);
            }
      }
     ////-----------------------------JIJIJIIJIJ aQUI IRA EL OBJETO DE LAS BALAS
     class balas{//NOTE: la matriz del juego esta declarada arriba sera global, por que necesito que sea la actualizada para
      //la comparacion de las colisiones
//matriz donde corre el juego || cordenadas conde empezo a disparar || coordenadas a donde va
constructor(whereX, whereY, whereZ, ObjX, ObjY, ObjZ, Killed, limiteCampoJuego){
//kileed se refiere al indicador de la nave que se quiere matar
  function graficadoraBullet(x,y,z,x2,y2,z2, limite){
      //-Declaracion de los 3 array
      var ArrayX = new Array(0);//okey so, here i should push negative numbers that would be dump
      var ArrayY = new Array(0);
      var ArrayZ = new Array(0);
      var sinRedondear1 = new Array(0);
      var sinRedondear2 = new Array(0);
      function Tabulaciones (pun1, pun2, arrePun, limite, arreSalida1, arreSalida2, numSalida1, numSalida2, numPrincipal, leter1, leter2, ord1, ord2, ord3){
          var VectorDirector = [x2-x,y2-y,z2-z];//vector que dara la direccion
          var cont = pun1;
          if(pun2 < pun1)//compara donde esta los puntos, para poder los puntos para tabular
          while(cont != 0){
              arrePun.push(cont);
              cont--;
          }
      else
          while(cont != limite){
              arrePun.push(cont);
              cont++;
          }////
      for (let i = 0; i < arrePun.length; i++){//loop of arrayY
          if(VectorDirector[0]!= 0){
            //aqui esta el arreglo de l s poscicones sin redondear
              sinRedondear1.push((VectorDirector[numSalida1]*((arrePun[i]-pun1)/VectorDirector[numPrincipal]))+leter1);
              arreSalida1.push(Math.round((VectorDirector[numSalida1]*((arrePun[i]-pun1)/VectorDirector[numPrincipal]))+leter1));
              //arreglo 2 de posiciones sin redondear y redondeadas
               sinRedondear2.push((VectorDirector[numSalida2]*((arrePun[i]-pun1)/VectorDirector[numPrincipal]))+leter2);
              arreSalida2.push(Math.round((VectorDirector[numSalida2]*((arrePun[i]-pun1)/VectorDirector[numPrincipal]))+leter2));
          }else{
              arreSalida1.push(leter1)
              arreSalida2.push(leter2)
          }
          //para ver como esta funcioanndo la mamada
      }//ord te dice que teltra le corresponde el arreglo que saco para las balas
     var MyRegret = [ord1, arrePun, ord2,arreSalida1, ord3,arreSalida2, sinRedondear1,sinRedondear2  ] ;  //we are going to return 3 arrayS
      return MyRegret;
      }
                  //numeros de las letras x =0, y=1, z=2 ---El ultimo es del que se quiere sacar

      if(x != y){
          var takeMe = Tabulaciones(x, x2, ArrayX, limite,ArrayY, ArrayZ,1,2,0,y,z, "x","y","z" )
          var letMeFly = [takeMe[1], takeMe[3],takeMe[5], "y",takeMe[6], "z",takeMe[7]]//poniendo arden
      }else if(x == y){
          //console.log('salve una indeterminacion xd')
          var takeMe = Tabulaciones(z, z2, ArrayZ, limite,ArrayX, ArrayY,0,1,2,x,y, "z","x","y" )
          var letMeFly = [takeMe[3], takeMe[5],takeMe[1],"z",takeMe[6], "y",takeMe[7]]//ordenando lo que sale de los arreglos
      }
      return letMeFly;
  }
//----------------------------------------------------
this.MatrizBalas3d = graficadoraBullet(whereX, whereY, whereZ, ObjX, ObjY, ObjZ,limiteCampoJuego);
this.WhoToKill = Killed;//esto sera para que no exista el fuego amigo
function ordenaTabs(array){//funcion que te acomoda el arreglo pa que siempre tenga los valores de x, y, z
  //siempre considero que aqui se metrera un arreglo de 7 valores

  let JustMeAnotherTime = new Array(new Array(0), new Array(0), new Array(0));
    if(array[3]== "y"){
      JustMeAnotherTime[0] = array[0];
      JustMeAnotherTime[1] = array[4];
      JustMeAnotherTime[2] = array[6];
      return JustMeAnotherTime;
    }
    else {
      JustMeAnotherTime[0] = array[0];
      JustMeAnotherTime[1] = array[4];
      JustMeAnotherTime[2] = array[6];
      return JustMeAnotherTime;
    }
}
this.MatrizUnround = ordenaTabs(this.MatrizBalas3d);
}
MidnightBlame(){ //NOTE: la varaible de las naves es global tinee que estar declarada arriba
var Coun = 0;
var geometry = new THREE.SphereGeometry( .05, .05, .05 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphere = new THREE.Mesh( geometry, material );
geometry = null;
material = null;
scene.add( sphere );
function GodsLoop(MatBalas, Coun, WhoToKill, matUnround){


  setTimeout(function(){
      if(Coun < MatBalas[0].length){
          sphere.position.x=matUnround[0][Coun];
          sphere.position.y=matUnround[1][Coun];
          sphere.position.z=matUnround[2][Coun];
        
          var Everything = MatrizThatMakeMeCry; //Aqui tengo que poner la matriz de IWannaCry
          if( WhoToKill== 2){//cuendo le disparen a la nave principal
              //console.log('Im in')//ver si se mete al buble
              //Everything es la matriz donde estan todas la anves
              if(MatBalas[0][Coun]==Everything[0][1]&&MatBalas[1][Coun]==Everything[0][2]&&MatBalas[2][Coun]==Everything[0][3]){
                  console.log('impacto a la nave principal')
              }else{
                  Coun++;
                  GodsLoop(MatBalas, Coun, WhoToKill,matUnround);
              }
          }else if(this.WhoToKill == 1){//cuando le dispare a una nave enemiga
            console.log('disparo el wey')
            var who = 0;
              for (let i= 0; i <= numnaves; i++)
                if(MatBalas[0][Coun]== MatrizThatMakeMeCry[i][1]&&MatBalas[1][Coun]== MatrizThatMakeMeCry[i][2]&&MatBalas[2][Coun]== MatrizThatMakeMeCry[i][3]){
                  //aqui abria impacto xd jajaja 
                  who = i;///tal vez esta varaible who cause problemas
                  i = numnaves;//para acabar el ciclo 
                }
              if(who == 0){
                Coun++;
                GodsLoop(MatBalas, Coun, WhoToKill,matUnround);
              }else {
                console.log('no se como destruir la nave xd')
              }
              
              
                

                
            
          }
      }
      else {
        scene.remove(sphere);
        sphere = null;
      }
  },100);//velocidad de las balas se puede cambiar
}
GodsLoop(this.MatrizBalas3d ,Coun,this.WhoToKill,this.MatrizUnround);


}//llave del fin del metodo
}
////-----------------------------------------------------------------------------------------------------------------------
////----------------------------FUNCIONES----------------------------------------------------------------------------------
////-----------------------------------------------------------------------------------------------------------------------
//  value valie sirve para saber el indice donde se guardara el incie de la matriz que me hace llorar
function ChooseWhereToMove(x, y, z, event, value){//switch para elegir
    //donde se va a mover cada nave, servira para la principal y para las naves enemigas
    //y que la nave pueda moverse   ----  inicioX     inicioY
    var type = MatrizThatMakeMeCry[value][0];
    regreso = [null,null,null,0];

    //Revisa s su posición actual es la misma que otro objeto
    for(var i in MatrizThatMakeMeCry){
      if(MatrizThatMakeMeCry[i][1]==x && MatrizThatMakeMeCry[i][2]==y && MatrizThatMakeMeCry[i][3]==z){

        //En caso de que no sea la misma nave
        if(MatrizThatMakeMeCry[i][0]!=MatrizThatMakeMeCry[value][0]){
          //Si se choca con un objeto diferente del principal, se destruye
          if(MatrizThatMakeMeCry[i][0]!=2){
            scene.remove(MatrizThatMakeMeCry[i][4]);
            delete MatrizThatMakeMeCry[i][4];
            delete MatrizThatMakeMeCry[i][5];
            console.log('ded');
            MatrizThatMakeMeCry[i]=[0,null,null,null,null,null];
          }
          //Si el mismo objeto no es el principal, se destruye
          if(MatrizThatMakeMeCry[value][0]!=2){
            scene.remove(MatrizThatMakeMeCry[value][4]);
            delete MatrizThatMakeMeCry[value][4];
            delete MatrizThatMakeMeCry[value][5];
            console.log('ded');

            type = 0;
          }
          //En caso de que alguno de los dos objetos en la colision sean el principal, se manda un menaje de perder
          if(MatrizThatMakeMeCry[value][0]==2||MatrizThatMakeMeCry[i][0]==2)
            console.log("perdiste");
          color = "white";
        }

      }
   }
    if (type!=0){ //En caso de que no haya chocado, se mueve dependiento del parámetro recibido
      switch(event){
          case 1:if(y==0)
                          y = limit-1;
                      else
                          y--;
             break;
          case 2: if(y==limit-1)
                          y=0;
                      else
                          y++;
              break;
          case 3: if (x==0)
                          x = limit-1;
                      else
                          x--;
              break;
          case 4: if(x==limit-1)
                          x=0;
                      else
                          x++;
              break;
          case 5: if(z==0)
                          z = limit-1;
                      else
                          z--;
              break;
          case 6: if(z==limit-1)
                          z=0;
                      else
                          z++;
              break;
      }

      regreso = [x, y, z, type];
      //ponerLasNavesEnLaMatriz(matriz);/////////////////////////////////Arreglar
  }

  //Agregamos a la matriz los nuevos valores de posición
  MatrizThatMakeMeCry[value] = [regreso[3],regreso[0],regreso[1],regreso[2],MatrizThatMakeMeCry[value][4],MatrizThatMakeMeCry[value][5]];

   return regreso

}
function NumerosAleatorios(tope){
    return Math.floor((Math.random()*tope))+1;
}

function ArrayBaseDeLaNaves(numnaves,numast,scene){//declarando el array de las naves y sus posiciones
    var total = numnaves + numast;
    var MatrizPrincipal = new Array(total);
    for (let i = 0; i < total; i++)
        MatrizPrincipal[i]=new Array(5);//array que dira si es una nave enemiga y sus posiciones en X,Y y Z

    //Colocar naves
    for (i=0; i<numnaves; i++){
        MatrizPrincipal[i][0] = 1;
        for (e=1; e<4; e++){
            MatrizPrincipal[i][e] = NumerosAleatorios(limit)-1;
        }
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var color = 0xFF0000;
        if(i==0)
          color = 0x00FF00;
        var material = new THREE.MeshBasicMaterial( { color: color, wireframe: true } );
        MatrizPrincipal[i][4] = new THREE.Mesh(geometry, material);
        // Instanciamos un cubo con base en los parámetros anteriores
        scene.add(MatrizPrincipal[i][4]);
        MatrizPrincipal[i][4].position.x = MatrizPrincipal[i][1];
        MatrizPrincipal[i][4].position.y = MatrizPrincipal[i][2];
        MatrizPrincipal[i][4].position.z = MatrizPrincipal[i][3];
        //lo añadimos a la escena
    }
    //Colocar asteroides
    for (i=numnaves; i<total; i++){
        MatrizPrincipal[i][0] = 3;
        for (e=1; e<4; e++){
            MatrizPrincipal[i][e] = NumerosAleatorios(limit)-1;
        }
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0x0000FF, wireframe: true } );
        MatrizPrincipal[i][4] = new THREE.Mesh( geometry, material );
        // Instanciamos un cubo con base en los parámetros anteriores
        scene.add(MatrizPrincipal[i][4]);
        MatrizPrincipal[i][4].position.x = MatrizPrincipal[i][1];
        MatrizPrincipal[i][4].position.y = MatrizPrincipal[i][2];
        MatrizPrincipal[i][4].position.z = MatrizPrincipal[i][3];
        //lo añadimos a la escena

    }

    MatrizPrincipal[0][0] = 2;
return MatrizPrincipal;
}


 //poner posiones de las naves y ver donde vas a empezar funcion importante xd
function colocarPosicionesAleatorias(numNaves,numAst){//saber donde estaran las naves al inicio
    //tambien es medio la base de todo el juego espero que esto cambie
   // var Matriz = ArrayBaseDeLaNaves(numNaves);//tipo instanciando la matriz principal

    //-----------------Delcarando todas las naves enemigas que hay--------------------
    var total = numAst + numNaves;

    //Creamos y guardamos los objeetos naves en la matriz principal
    for(let i = 0; i< (numNaves-1); i++){//funcion para que los objetos se instancien con sus propiedades
        MatrizThatMakeMeCry[i][5] = new NavesEnemigas(MatrizThatMakeMeCry, i+1);
        MatrizThatMakeMeCry[i][5].JustTheCreator();//Js es una mamada jajaja
    }

    for(let i = numNaves; i< total; i++){//funcion para que los objetos se instancien con sus propiedades
        MatrizThatMakeMeCry[i][5] = new Asteroide(MatrizThatMakeMeCry, i);
        MatrizThatMakeMeCry[i][5].JustTheCreator();//Js es una mamada jajaja
    }

    //instanciando el objeto principal ----------------------
    const nave = new PersonajePrincipal(MatrizThatMakeMeCry);
    nave.JustTheCreator();
    var fer = new CabinaDeControl(renderer.domElement);
    fer.Torreta();
}

function animate(){
    requestAnimationFrame( animate );
    //el request animationFrame de toda la vida, recursivo, aprox. 60 ciclos por segundo, también deja
    //de ejecutarse la animación cuando no estás en la pestaña por lo que ahorras procesamiento
    //y batería usada.

    renderer.render( scene, camera );
    //ya que está la cámara y la escena, las ejecuta el render, boila.
}

///-----------------------------------------------------------------------------------------------
///--------------------Ejecuciones----------------------------------------------------------------
///-----------------------------------------------------------------------------------------------
//               Funcion principal que corre todo el juego
colocarPosicionesAleatorias(numnaves,numasteroides)//esta ganando mucha importancia esta funcion


//------------------------------------------------------------------------------------------------

animate();
