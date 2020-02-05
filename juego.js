//Variable globales necesarios
var MatrizThatMakeMeCry = null;
var vidaDelEscudo = 15//seran los segundos que durar el escudo
var limitx = null;
var limity = null;
var limitz = null;
var numnaves = null;
var numasteroides = null; 
var scene = null;
//Soinidos, rutas
var laser_ene="./Media/Recovered_laser5.mp3"; //https://freesound.org/people/DayCraftMC/sounds/337112/
var laser_ali="./Media/Recovered_77172__huvaakoodia__pulse-laser.wav"; //https://freesound.org/people/HuvaaKoodia/sounds/77172/
var space_music="./Media/Recovered_396231__romariogrande__tentacle-wedding.mp3"; //https://freesound.org/people/Romariogrande/sounds/396231/
var heal="./Media/Recovered_346116__lulyc__retro-game-heal-sound.wav";    //https://freesound.org/people/lulyc/sounds/346116/
var ship_damage="./Media/Recovered_211634__qubodup__damage.mp3";  //https://freesound.org/people/qubodup/sounds/211634/
var enemy_destroy="./Media/Recovered_458867__raclure__damage-sound-effect.mp3"; //https://freesound.org/people/Raclure/sounds/458867/
var gigantic_ene="./Media/Recovered_220533__the-very-real-horst__lithium-chloratum-3-min-binaural.mp3"; 
//https://freesound.org/people/the_very_Real_Horst/sounds/220533/
var is_playing=false; //Para preguntar si está sonando el fondo.

//Imágenes
var inside=document.getElementById("imagenPrincipal");
inside.setAttribute('draggable', false);

//comentarios
var renderer = null;
var camera = null;

///arreglo de 
var patterns = new Array( //Array con todos los diferentes patrones, el primer número es la velocidadf
  new Array(200,2,2),
  new Array(200,1,1),
  new Array(200,3,3),
  new Array(200,4,4),
  new Array(200,2,2,2,2,2,2,2),
  new Array(200,1,1,1,1,1,1,1),
  new Array(200,2,2,2,2,2,2,2),
  new Array(200,3,3,3,3,3,3,3),
  new Array(200,4,4,4,4,4,4,4),
  new Array(200,5,5,5,5,5,5,5),
  new Array(200,6,6,6,6,6,6,6),
  new Array(300,1,1,1,2,2,2),
  new Array(300,3,3,3,4,4,4),
  new Array(300,1,1,2,2,3,3),
  new Array(200,3,3,5,5,5,1,1),
  new Array(200,4,4,6,6,6,2,2),
  new Array(300,1,1,1,1,3,3,3,3,2,2,2,4,4,4),
  new Array(200,2,2,2,2,2,2,2,4,4,4,4,3),
  new Array(200,3,3,3,3,3,4,4,3,2,1,2,1)
);


//--------------------------------OBJETOS------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
class World{
  constructor () {
    
  }

 CreateWorld(lx,ly,lz,background){
  limitx = lx;//Numero de casillas de la matriz
  limity = ly;
  limitz = lz;
  numnaves = 100;
  numasteroides = 200; //Cuantos asteroides se crean
  scene = new THREE.Scene();
  // THREE.PerspectiveCamera: primer parámetro es la apertura de la cámara en grados, el segundo es el
  // aspect ratio, una buena explicación aquí  https://es.wikipedia.org/wiki/Relaci%C3%B3n_de_aspecto
  //https://scsarquitecto.cl/importancia-relacion-aspecto/
  // ,se puede dejar ese parámetro o el más usado 16:9; el siguiente es cercanía y el cuarto es lejanía,
  //significa que nos se renderearan (shit of translation DX) objetos más cercanos al valor de cercanía
  //ni objetos más lejanos al valor de lejanía.
  renderer = new THREE.WebGLRenderer();
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
      'img/'+background+'/back.png',
      'img/'+background+'/front.png',
      'img/'+background+'/bottom.png',
      'img/'+background+'/top.png',
      'img/'+background+'/right.png',
      'img/'+background+'/left.png',
    ]);
    scene.background = texture;
  }

  //Ponemos luces
  var ambient = new THREE.PointLight( 0x444444 );
  scene.add( ambient );
  var directionalLight = new THREE.DirectionalLight( 0xffeedd );
  directionalLight.position.set( 0, 0, 1 ).normalize();
  scene.add( directionalLight );

  //Ponemos el sonido de fondo
  var background_music= new Audio(space_music);
  if(!is_playing)
  {
    document.addEventListener('mousemove',function(){
      is_playing=true;
      background_music.loop=true;
      background_music.play();
    });
  }
  

  MatrizThatMakeMeCry = ArrayBaseDeLaNaves(numnaves,numasteroides);//tipo instanciando la matriz principal
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );  //Creamos la camara

 }

 StartWorld(){//Mostramos el mundo y creamos los objetos ecesarios para empezar el juego
  function animate(){
    requestAnimationFrame( animate );
  //el request animationFrame de toda la vida, recursivo, aprox. 60 ciclos por segundo, también deja
  //de ejecutarse la animación cuando no estás en la pestaña por lo que ahorras procesamiento
  //y batería usada.
  renderer.render( scene, camera );
  //ya que está la cámara y la escena, las ejecuta el render, boila.
  }
  setTimeout(function(){
    animate();
    colocarPosicionesAleatorias(numnaves,numasteroides)//esta ganando mucha importancia esta funcion
  },2000);
}
     
}


class PersonajePrincipal{
       constructor (matrizDondeSeTrabaja) {
            this.matrizDondeSeTrabaja = matrizDondeSeTrabaja;
        }

    //Quitare la funcion choose  where to move del mono, por que ya no es necesaria xd
      JustTheCreator(){
                  

          //Colocamos a el jugador en su posición Inicial
          camera.position.x = MatrizThatMakeMeCry[0][1];
          camera.position.y = MatrizThatMakeMeCry[0][2];
          camera.position.z = MatrizThatMakeMeCry[0][3];
          var working = [this.matrizDondeSeTrabaja[0][1],this.matrizDondeSeTrabaja[0][2],this.matrizDondeSeTrabaja[0][3]];
          LifeBar(MatrizThatMakeMeCry[0][6])//poniendo la barra de vida al tope
          function mover(matriz){
            setTimeout(function(){
            //  var lol = [matriz[0][1], matriz[0][2],matriz[0][3]]
              //  MatrizThatMakeMeCry   //esta es la matriz con todas la posiciones
                matriz[0][1] = camera.position.x;
                matriz[0][2] = camera.position.y;
                matriz[0][3] = camera.position.z;
                //Diego aqui iria tu codigo, que corria el movimiento de la camara
              mover(matriz);
            }, 50);

          }
          mover(this.matrizDondeSeTrabaja);
          document.addEventListener("click", function(){
            
           var bala = new BalasPrincipal();
           bala.disparo();
           bala.sonido();
          });
      }  //Aqui iria el codigo del evento del mouse, pa que se mueva la camara con el mouse
      vida(){
       

        function subirVida(){
          setTimeout(()=>{
            if (MatrizThatMakeMeCry[0][6] < 11) {

              MatrizThatMakeMeCry[0][6]++;////Aqui hize que la nave no pierda en caso de chocar
              LifeBar(MatrizThatMakeMeCry[0][6])
              subirVida();//para que se haga ciclo 
            }
          }, 1500)
        }//final de la funcion
       function Recargo(){//bucle para saber si recargo la funcion o no
          setTimeout(()=>{
              if (MatrizThatMakeMeCry[0][6] <= 3) {
                console.log("Recién subió vida");
                subirVida();
              }
              Recargo() 
          }, 2000)
             
        }
        Recargo();
      }
     Escudo(){
            function Resumida(num){//junta la funcion de el relleno de las doso funciones
                ShieldBar(num, 'Barraescudos1')
                ShieldBar(num, 'Barraescudos2')
            }
              ////Funcion bucle escudos
            function recargaShields(){//ciclo pa que se recarguen los escudos
              setTimeout(()=>{
                  if(vidaDelEscudo <= (15)){
                     vidaDelEscudo++;
                  }
                  recargaShields()
                  Resumida(vidaDelEscudo)
              },2000)
            }///Fata otra vez llamar esta funcion
    //--------------------------------  
            function ActivacionEscudos(){
                document.addEventListener('keydown', (event) => {
                if(event.key == "Enter" && vidaDelEscudo> 1){
                  var OwnLife = MatrizThatMakeMeCry[0][6];
                  LifeBar(OwnLife)//Se imprime el valor de la vida que se tenia para que no fluctue nada xd
                    document.getElementById("escudos").style.visibility = "visible";
                    function loopShield(){
                      setTimeout(()=>{
                        MatrizThatMakeMeCry[0][6]= OwnLife;//Pra que no se le vabe vida al tipo xd
                        LifeBar(OwnLife)//Se imprime el valor de la vida que se tenia para que no fluctue nada xd
                        if(vidaDelEscudo == 0){
                          MatrizThatMakeMeCry[0][6] = OwnLife
                          LifeBar(OwnLife)//Se imprime el valor de la vida que se tenia para que no fluctue nada xd
                          document.getElementById("escudos").style.visibility = "hidden";
                           Resumida(vidaDelEscudo)
                       }else{
                        MatrizThatMakeMeCry[0][6] = OwnLife
                        LifeBar(OwnLife)//Se imprime el valor de la vida que se tenia para que no fluctue nada xd
                          vidaDelEscudo--
                          Resumida(vidaDelEscudo)
                          loopShield()
                        }
                      },1200)
                    }
                loopShield()
                  }     
                  });
              }
              ActivacionEscudos()
              recargaShields()
              Resumida(vidaDelEscudo)
     }
      
    }//fin del metodo
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
          var MedidaPantalla = this.WhereItWorks.offsetWidth; //medidas de la pantalla
          var MedidaEnY = this.WhereItWorks.offsetHeight; //el alto de la pantalla
          var OriginalPosition = this.inicioCamaraTorre; //EMPIEZA AQUI la vista de la camar
          this.WhereItWorks.onmousemove = function(e){
              WhereOnX = e.pageX;//dice el valor de los eventos en tiempo real
              WhereOnY = e.pageY;//valor de y en real time
          }
          setInterval(CheckWhereTheHellIsIn, 1);
          function CheckWhereTheHellIsIn(){
                  //esto es para que pueda rotar la pantalla del jugador
                  if(WhereOnX< (MedidaPantalla)/4){//girar a la derecha
                      camera.rotation.y += .005;
                  }
                  else if(WhereOnX> ((MedidaPantalla)/4)*3){//girara a la girar a la izquierda
                      camera.rotation.y -= .005;
                  }
                  //the last thing to do
          }
          setInterval(updown, 150);//para que pueda rotrar lal camara de arriba hacia abajo
          function updown(){
            //para que la nave pueda subir o bajar
            if(WhereOnY < (MedidaEnY)/3 && camera.position.y != limity-1){ //hace que la nave baja
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
            direction.y = Math.round(direction.y);

            camera.position.add(direction.multiplyScalar(1)); //Agregamos ese vector multiplicándolo por un número para ajustar la velocidad

            //En caso de que se qwuiera salir de el área delimitada, lo regresamos
            if(camera.position.x >= limitx-1){
              camera.position.x = limitx-1;
            }
            if(camera.position.x <= 0){
              camera.position.x = 0;
            }

            if(camera.position.z >= limitz-1){
              camera.position.z = limitz-1;
            }
            if(camera.position.z <= 0){
              camera.position.z = 0;
            }

          }
      }
}

class BalasPrincipal{

  sonido(){                   //Método para que suene el laser al disparar.
    var sonido= new Audio(laser_ali);       //variable tipo audio, con la referencia del laser de las naves aliadas.
    sonido.play();          //Método para hacerlo sonar.

  } 
  

  

  disparo(){
    var direction = camera.getWorldDirection();

    function enemyDestroyedSound(){
      var snap = new Audio(enemy_destroy);
      snap.play();  
    }

    var geometry = new THREE.SphereGeometry( .05, .05, .05 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
    var sphere = new THREE.Mesh( geometry, material );
    geometry = null;
    material = null;
    scene.add( sphere );
    sphere.position.x = camera.position.x;
    sphere.position.y = camera.position.y;
    sphere.position.z = camera.position.z;

    function move(){ //Movemos a la bala y devolvemos valores enteros para revisar si hay alguna colision
      var x,y,z;
      sphere.position.add(direction.multiplyScalar(1));
    
      x = Math.round(sphere.position.x);
      y = Math.round(sphere.position.y);
      z = Math.round(sphere.position.z);

      var data = new Array();
      data[0] = x;
      data[1] = y;
      data[2] = z;

      return data;
    }
    
    function dispLoop(){
      setTimeout(()=>{ 
        var who = 0;
        var pos = move();
        for (let i= 1; i < numnaves; i++){
        if(pos[0]== MatrizThatMakeMeCry[i][1]&&pos[1]== MatrizThatMakeMeCry[i][2]&&pos[2]== MatrizThatMakeMeCry[i][3]){
          //Aqui le aumento 1 valor a la nave pricipal para que aumente de vida cada vez que impacta una nave enemiga
          if( MatrizThatMakeMeCry[0][6] < 13){          
          MatrizThatMakeMeCry[0][6]++;////Aqui hize que la nave no pierda en caso de chocar


          //Sonido de vida al matar a nave.
          healing_sound();




          LifeBar(MatrizThatMakeMeCry[0][6])
          }
         //aqui abria impacto xd jajaja
          if(MatrizThatMakeMeCry[i][6] <= 0){

            //Eliminamos a la nave de la matriz
            delete MatrizThatMakeMeCry[i][5];
            enemyDestroyedSound(); // sonido de destrucción de la nave enemiga.
            scene.remove(MatrizThatMakeMeCry[i][4]);
            delete MatrizThatMakeMeCry[i][4];
            MatrizThatMakeMeCry[i]= new Array(0,null,null,null,null,null,0)
            //Eliminamos la bala
            scene.remove(sphere);
            sphere = null;
            i = numnaves;//para acabar el ciclo
          }else{
           MatrizThatMakeMeCry[i][6]--;////Se le quita solo 1 punto de vida
          }
          who = null;
        }
      }
      if(who == 0){
        if(pos[0] == 0 || pos[0] == limitx || pos[1] == 0 || pos[1] == limity || pos[2] == 0 || pos[2] == limitz){
           scene.remove(sphere);
           sphere = null;
        }else{
          dispLoop();
        }
      }
    }, 100);
  }

  dispLoop();
  }
}

class NavesEnemigas{
        constructor(matrizDondeSeTrabaja, number,velocidad,rango,velChase,velDisparo,rangoDisp){//el
            this.workingMat = matrizDondeSeTrabaja;
            this.number = number;//indice dentro de la matriz principal donde se guardara la nave
            this.numero =  0;//luego esto tengra que cambiar a 5 para que puedan
            this.dist_player = 0; //Guarda la distancia de la nave al jugador
            this.pattern_move = 0; //Determina el siguiente movimiento
            this.current_pattern = NumerosAleatorios(patterns.length)-1; //Dice que patrón está haciendo actualmente
            //Variables de clase
            this.velocidad = velocidad; //Velocidad de reacción
            this.rango = rango; //determina el rango de visión;
            this.velChase = velChase  //Velocidad al perseguir al jugador
            this.velDisparo = velDisparo; //Velocidad de disparo
            this.rangoDisp = rangoDisp; //Distancia a la que empieza a disparar
        }
        JustTheCreator(){//este metodo ara que las naves se muevan y  si tiempo que disparen
            //usara la funcion switch que cree
            function MainBucle(obj, matriz, x, y , z,move, position,current_pattern,pattern_move,patterns){ //Aqui se tendra que correr el bucle de las naves
                if(matriz[position][0]!=0  && matriz[position][6]!=0){
                  setTimeout(function(){
                    this.dist_player=DistFromPlayer(matriz,x,y,z);
                    //El parametro primer parametro sera cambiado por quien disparo xd, pero siento que se tendra que pasar
                    //un evento para disparar con el mouse
                    var numero = 0;
                    if(this.dist_player <=obj.rango){
                      if(this.dist_player <=obj.rangoDisp){//Aqui dispara la nave enemiga---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                          ///----------------------------------Parametros----------------------------------------------
                          //whereX, whereY, whereZ, ObjX, ObjY, ObjZ, Killed, limiteCampoJuego
         //kileed se refiere al indicador de la nave que se quiere matar
                //2 es la nave principal
                //MatrizThatMakeMeCry
                //necesito saber quien disparo

                      //Obtenemos el límite más grande para el rango de vida de las balas.
                      var limit = limitx;
                      if(limitx > limity && limitx>limitz)
                        var limit = limitx;
                      else if(limity>limitx && limity>limitz)
                        var limit = limity;
                      else if(limitz>limitx && limitz>limity)
                        var limit = limitz;

                      var disparoNaveEnemiga = new balas(MatrizThatMakeMeCry[position][1], MatrizThatMakeMeCry[position][2], MatrizThatMakeMeCry[position][3], MatrizThatMakeMeCry[0][1], MatrizThatMakeMeCry[0][2], MatrizThatMakeMeCry[0][3] ,2,limit)//constructro del objeto balas
                      disparoNaveEnemiga.MidnightBlame(obj.velDisparo);
                      numero = 0;
                      }
                      else{
                        numero = ChasePlayer(matriz,x,y,z);
                        obj.velocidad = obj.velChase;
                      }
                    }
                    else{ //Si el personaje principal no está en rango, sigue con su patrón de movimiento o elige uno nuevo
                      if(pattern_move == patterns[current_pattern].length){
                        current_pattern = NumerosAleatorios(patterns.length)-1;
                        pattern_move = 1;
                      }
                      numero=patterns[current_pattern][pattern_move];
                      pattern_move++;
                      obj.velocidad = patterns[current_pattern][0];
                    }

                    var itsRunnig = ChooseWhereToMove( x, y, z, move,  position);
                    //NMovemos el render
                    if(itsRunnig[0]!=null && matriz[position][6]!=0){
                      MatrizThatMakeMeCry[position][4].position.x = itsRunnig[0];
                      MatrizThatMakeMeCry[position][4].position.y = itsRunnig[1];
                      MatrizThatMakeMeCry[position][4].position.z = itsRunnig[2];
                    }
                    //lo añadimos a la escena
                    MainBucle(obj, matriz, itsRunnig[0], itsRunnig[1], itsRunnig[2],numero,  position,current_pattern,pattern_move,patterns);
                  }, obj.velocidad);
                }
            }

            function DistFromPlayer(matrizDondeSeTrabaja,x,y,z){ //Nos da la distancia al jugador
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

            MainBucle(this, this.workingMat, this.workingMat[this.number][1], this.workingMat[this.number][2], this.workingMat[this.number][3], this.numero, this.number,this.current_pattern, this.pattern_move,patterns);
        }

    }

    class Asteroide{
            constructor(matrizDondeSeTrabaja, number,velocidad){//el
                this.workingMat = matrizDondeSeTrabaja;
                this.number = number;//indice dentro de la matriz principal donde se guardara el asteroide
                this.direction = NumerosAleatorios(6); //Dice hacia donde se mueve
                this.velocidad = velocidad;
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
            MainBucle(this.velocidad, this.workingMat, this.workingMat[this.number][1], this.workingMat[this.number][2], this.workingMat[this.number][3], this.direction, this.number);
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
MidnightBlame(velDisparo){ //NOTE: la varaible de las naves es global tinee que estar declarada arriba
var Coun = 0;

var sonido_ene= new Audio(laser_ene);     //Variable tipo audio, con la referencia del laser del enemigo
var sonido_daño_principal= new Audio(ship_damage);

var geometry = new THREE.SphereGeometry( .05, .05, .05 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphere = new THREE.Mesh( geometry, material );
geometry = null;
material = null;
scene.add( sphere );

sonido_ene.volume=.2;
sonido_ene.play();            //Suene después de que la bala se crea en la escena.

function GodsLoop(MatBalas, Coun, WhoToKill, matUnround){


  setTimeout(function(){
    
      if(Coun < MatBalas[0].length){
          sphere.position.x=matUnround[0][Coun];
          sphere.position.y=matUnround[1][Coun];
          sphere.position.z=matUnround[2][Coun];

          var Everything = MatrizThatMakeMeCry; //Aqui tengo que poner la matriz de IWannaCry
          if( WhoToKill== 2){//cuendo le disparen a la nave principal
              //Everything es la matriz donde estan todas la anves
              if(MatBalas[0][Coun]==Everything[0][1]&&MatBalas[1][Coun]==Everything[0][2]&&MatBalas[2][Coun]==Everything[0][3]){
                 
                MatrizThatMakeMeCry[0][6]--;////Aqui hize que la nave no pierda en caso de chocar
                //Cuando impactan la principal
                sonido_daño_principal.play(); //Sonido cuando te da una bala enemiga.
                LifeBar(MatrizThatMakeMeCry[0][6])
                if( MatrizThatMakeMeCry[0][6] == 0)             
                  location.href="SapaceHunter/Statics/Templates/EndMatch.html";////No se si esta ruta funcione
              }else{
                  Coun++;
                  GodsLoop(MatBalas, Coun, WhoToKill,matUnround);
              }
          }
      }
      else {
        scene.remove(sphere);
        sphere = null;
      }
  },velDisparo);//velocidad de las balas se puede cambiar
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
            MatrizThatMakeMeCry[i]=[0,null,null,null,null,null];
          }
          //Si el mismo objeto no es el principal, se destruye
          if(MatrizThatMakeMeCry[value][0]!=2){
            scene.remove(MatrizThatMakeMeCry[value][4]);
            delete MatrizThatMakeMeCry[value][4];
            delete MatrizThatMakeMeCry[value][5];
            type = 0;
          }
          //En caso de que alguno de los dos objetos en la colision sean el principal, se manda un menaje de perder
          if(MatrizThatMakeMeCry[value][0]==2||MatrizThatMakeMeCry[i][0]==2)
          MatrizThatMakeMeCry[0][6] = 3;////Aqui hize que la nave no pierda en caso de chocar
          LifeBar(MatrizThatMakeMeCry[0][6])
          color = "white";
        }

      }
   }
    if (type!=0){ //En caso de que no haya chocado, se mueve dependiento del parámetro recibido
      switch(event){
          case 1:if(y==0)
                          y = limity-1;
                      else
                          y--;
             break;
          case 2: if(y==limity-1)
                          y=0;
                      else
                          y++;
              break;
          case 3: if (x==0)
                          x = limitx-1;
                      else
                          x--;
              break;
          case 4: if(x==limitx-1)
                          x=0;
                      else
                          x++;
              break;
          case 5: if(z==0)
                          z = limitz-1;
                      else
                          z--;
              break;
          case 6: if(z==limitz-1)
                          z=0;
                      else
                          z++;
              break;
      }

      regreso = [x, y, z, type];
      //ponerLasNavesEnLaMatriz(matriz);/////////////////////////////////Arreglar
  }

  //Agregamos a la matriz los nuevos valores de posición
  MatrizThatMakeMeCry[value] = [regreso[3],regreso[0],regreso[1],regreso[2],MatrizThatMakeMeCry[value][4],MatrizThatMakeMeCry[value][5],MatrizThatMakeMeCry[value][6]];

   return regreso

}

function healing_sound(){
  var heal_sound= new Audio(heal);
  heal_sound.volume=0.012;
  heal_sound.play();
}

function NumerosAleatorios(tope){
    return Math.floor((Math.random()*tope))+1;
}
function ShieldBar(numero, where){///El numero seran las divisiones en que se dibujaran
  var canvasShiel = document.getElementById(where);
  var Shield = canvasShiel.getContext("2d");
  Shield.beginPath();
  //puntos iniciales // puntos finales
  Shield.rect(1, 1, 25, 370);//la tercera es la que tengo que modificar
  Shield.fillStyle = "#373737";
  Shield.fill();
  Shield.closePath();
///---------
  var vidaTotal = 15 //seran los segundos maximos que durara el escudo
  var alto = ((numero * 370) / vidaTotal);//cambiar eso xd
  Shield.beginPath();
  Shield.rect(1, (371- alto), 25, alto);//la tercera es la que tengo que modificar
  Shield.fillStyle = "#30F10E";//color verde pila 
  Shield.fill();
  Shield.closePath();

}
function ArrayBaseDeLaNaves(numnaves,numast){//declarando el array de las naves y sus posiciones
    var total = numnaves + numast;
    var MatrizPrincipal = new Array(total);
    for (let i = 0; i < total; i++)
    //la posicion 6 indicara la vida de cada nave
        MatrizPrincipal[i]=new Array(7);//array que dira si es una nave enemiga y sus posiciones en X,Y y Z

    //Colocar naves
    for (i=1; i<numnaves; i++){
        MatrizPrincipal[i][0] = 1;
        MatrizPrincipal[i][1] = NumerosAleatorios(limitx)-1;
        MatrizPrincipal[i][2] = NumerosAleatorios(limity)-1;
        MatrizPrincipal[i][3] = NumerosAleatorios(limitz)-1;
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
        MatrizPrincipal[i][6]= 2;/////------------------------------------------------Esto da la vida a todas las naves enemigas
    }
  
    //Colocar asteroides
    for (i=numnaves; i<total; i++){
        MatrizPrincipal[i][0] = 3;
        MatrizPrincipal[i][1] = NumerosAleatorios(limitx)-1; //coordenadas de asteroides
        MatrizPrincipal[i][2] = NumerosAleatorios(limity)-1;
        MatrizPrincipal[i][3] = NumerosAleatorios(limitz)-1;



        function loadObject(i){
            var model;
            var loader = new THREE.GLTFLoader();
            loader.load(
                "Modelos/asteroide__50.glb",

                function ( gltf ) {
                    model = gltf.scene;


                    //lo añadimos a la escena

                    scene.add( model);
                    MatrizPrincipal[i][4] = model;
                    // Instanciamos un cubo con base en los parámetros anteriores
                    scene.add(MatrizPrincipal[i][4]);
                    MatrizPrincipal[i][4].position.x = MatrizPrincipal[i][1];
                    MatrizPrincipal[i][4].position.y = MatrizPrincipal[i][2];
                    MatrizPrincipal[i][4].position.z = MatrizPrincipal[i][3];

                },
                function ( xhr ) {
                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },
                function ( error ) {
                    //console.log( 'An error happened' );
                }
            );
        }
        loadObject(i);

    }

     //Creamos al principal
     MatrizPrincipal[0][0] = 2;
     MatrizPrincipal[0][1] = NumerosAleatorios(limitx)-1;
     MatrizPrincipal[0][2] = NumerosAleatorios(limity)-1;
     MatrizPrincipal[0][3] = NumerosAleatorios(limitz)-1;
     MatrizPrincipal[0][6]= 13;/////------------------------------------------------Esto da la vida a todas la nave pricipla

  return MatrizPrincipal;
}
//dibujar la vida de la nave principal
function LifeBar(numero){///El numero seran las divisiones en que se dibujaran
  //la nave tendra 10 puntos de vida xd pero pueden ser mas 
  var canvasVida = document.getElementById("me");
  var life = canvasVida.getContext("2d");
  life.beginPath();
  //puntos iniciales // puntos finales
  life.rect(1, 1, 200, 20);//la tercera es la que tengo que modificar
  life.fillStyle = "#373737";
  life.fill();
  life.closePath();
  //la nave tendra 10 puntos de vida xd pero pueden ser mas 
  var vidaTotal = 13 //es la vida que tendra el presonaje principal
  var anchoLife = ((numero * 200) / vidaTotal);
  life.beginPath();
  //puntos iniciales // puntos finales
  life.rect(1, 1, anchoLife, 20);//la tercera es la que tengo que modificar
  life.fillStyle = "#1CBFFA";
  life.fill();
  life.closePath();

}

 //poner posiones de las naves y ver donde vas a empezar funcion importante xd
function colocarPosicionesAleatorias(numNaves,numAst){//saber donde estaran las naves al inicio
    //tambien es medio la base de todo el juego espero que esto cambie
   // var Matriz = ArrayBaseDeLaNaves(numNaves);//tipo instanciando la matriz principal

    //-----------------Delcarando todas las naves enemigas que hay--------------------
    var total = numAst + numNaves;

    //Creamos y guardamos los objeetos naves en la matriz principal
    for(let i = 1; i<numNaves; i++){//funcion para que los objetos se instancien con sus propiedades
        //Orden de Parametros: matrizDondeSeTrabaja, number,velocidad,rango,velChase,velDisparo,rangoDisp
        MatrizThatMakeMeCry[i][5] = new NavesEnemigas(MatrizThatMakeMeCry, i,1000,40,300,150,10);
        MatrizThatMakeMeCry[i][5].JustTheCreator();//Js es una mamada jajaja
    }

    for(let i = numNaves; i< total; i++){//funcion para que los objetos se instancien con sus propiedades
        MatrizThatMakeMeCry[i][5] = new Asteroide(MatrizThatMakeMeCry, i,500);
        MatrizThatMakeMeCry[i][5].JustTheCreator();//Js es una mamada jajaja
    }

    //instanciando el objeto principal ----------------------
    const nave = new PersonajePrincipal(MatrizThatMakeMeCry);
    nave.JustTheCreator();
    nave.vida();
    nave.Escudo()
    var fer = new CabinaDeControl(document.body);
    fer.Torreta();
}

///-----------------------------------------------------------------------------------------------
///--------------------Ejecuciones----------------------------------------------------------------
///-----------------------------------------------------------------------------------------------
//               Funciones principales que corren todo el juego

var world = new World();  //Creamos el objeto world
world.CreateWorld(100,100,100,'default'); //Creamos el mundo
world.StartWorld();
//------------------------------------------------------------------------------------------------