//Variable globales necesarios
var MatrizThatMakeMeCry = null; //Matriz principal del juego, para cada objeto su tipo, posiciones, modelo, objeto, vidas y dimensiones
//Arrelgo a donde apunta, apunta a la nave,
var Apuntando = null;//delcarnado la variable con todas las posciones

var vidaDelEscudo = 30//seran los segundos que durar el escudo
//Dimensiones del munfo
var limitx = null;
var limity = null;
var limitz = null;
//Número de naves, asteroides y nave amigas
var numnaves = null;
var numasteroides = null; 
var numamigas = null;
var NumberOfTotalThings = null;
//Variables para modos de juego
var numkills = 0; //Cuantas naves destruidas lleva el jugador
var tiempo = null;  //Cuabto tiempo falta para ganar
//Variables para three.js
var scene = null;
var renderer = null;
var camera = null;
//Soinidos, rutas
var laser_ene="../Media/Recovered_laser5.mp3"; //https://freesound.org/people/DayCraftMC/sounds/337112/
var laser_ali="../Media/Recovered_77172__huvaakoodia__pulse-laser.wav"; //https://freesound.org/people/HuvaaKoodia/sounds/77172/
var space_music="../Media/Recovered_396231__romariogrande__tentacle-wedding.mp3"; //https://freesound.org/people/Romariogrande/sounds/396231/
var heal="../Media/Recovered_346116__lulyc__retro-game-heal-sound.wav";    //https://freesound.org/people/lulyc/sounds/346116/
var ship_damage="../Media/Recovered_211634__qubodup__damage.mp3";  //https://freesound.org/people/qubodup/sounds/211634/
ships_colission="../Media/Recovered_164569__adam-n__door-impact-6.wav" //https://freesound.org/people/Adam_N/sounds/164569/
var enemy_destroy="../Media/Recovered_458867__raclure__damage-sound-effect.mp3"; //https://freesound.org/people/Raclure/sounds/458867/
var gigantic_ene="../Media/Recovered_220533__the-very-real-horst__lithium-chloratum-3-min-binaural.mp3"; 
//https://freesound.org/people/the_very_Real_Horst/sounds/220533/
var is_playing=false; //Para preguntar si está sonando el fondo.
//Imágenes
var inside=document.getElementById("imagenPrincipal");
inside.setAttribute('draggable', false);


 //Array con todos los diferentes patrones, el primer número es la velocidad
var patterns = new Array(
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

//Definimos las clases de naves y asteroides
var clases_naves = {
  //velocidad,rango,velChase,velDisparo,rangoDisp,vida,largo,ancho,alto, modelo y nave a seguir
  'class1 1': new Array('nave',1000,60,500,200,10,2,1,1,1,'Tie.glb',0),
  'class1 2': new Array('nave',1000,40,300,150,15,3,1,1,1,'Tie.glb',0),
  'class1 3': new Array('nave',1000,20,100,100,20,4,1,1,1,'Tie.glb',0),

  'wanted 1': new Array('nave',1000,100,300,200,25,15,4,2,3,'Destructor.glb',0),
  'wanted 2': new Array('nave',1000,80,200,150,35,20,4,2,3,'Destructor.glb',0),
  'wanted 3': new Array('nave',1000,60,100,100,50,30,4,2,3,'Destructor.glb',0),

  'bodyguard 1': new Array('nave',1000,60,100,200,10,2,1,1,1,'Tie.glb','w'),
  'bodyguard 2': new Array('nave',1000,40,100,150,15,3,1,1,1,'Tie.glb','w'),
  'bodyguard 3': new Array('nave',1000,20,100,100,20,4,1,1,1,'Tie.glb','w'),
  ////Beto tenemos que cambiar el modelo de la nave
  'claseAmiga1': new Array('amiga',1000,200,100,100,20,4,1,1,1,'asteroide_1_Gre.glb',0),////Aqui va la nave amiga
  class2: new Array('nave',1000,40,300,100,15,2,1,1,1),
  class3: new Array('nave',1000,40,300,150,18,2,5,5,5),
  class4: new Array('nave',1000,40,300,100,15,2,1,1,3),
  class5: new Array('nave',1000,40,300,150,18,2,3,3,5),
  class6: new Array('nave',1000,40,300,100,15,2,3,1,3),
  class7: new Array('nave',1000,40,300,150,18,2,1,1,5),
  class8: new Array('nave',1000,40,300,100,18,2,5,5,1),
  class9: new Array('nave',1000,40,300,150,18,2,7,7,3),
  //velocidad,modelo y dimensiones
  ast1: new Array('ast',500,'asteroide_1_Gre.glb',1,1,1),
  ast2: new Array('ast',500,'asteroide_1_Pi.glb',1,1,1),
  ast3: new Array('ast',500,'asteroide_1_Re.glb',1,1,1),
  ast4: new Array('ast',500,'asteroide_1_Ye.glb',1,1,1),
  ast5: new Array('ast',500,'asteroide_3_Gre.glb',3,3,3),
  ast6: new Array('ast',500,'asteroide_3_Pi.glb',3,3,3),
  ast7: new Array('ast',500,'asteroide_3_Re.glb',3,3,3),
  ast8: new Array('ast',500,'asteroide_3_Ye.glb',3,3,3)
};

////-----------------------------------------------------------------------------------------------------------------------
////----------------------------FUNCIONES GLOBALES----------------------------------------------------------------------------------
////-----------------------------------------------------------------------------------------------------------------------
//  value valie sirve para saber el indice donde se guardara el incie de la matriz que me hace llorar



function ChooseWhereToMove(event, value){//switch para elegir
    //donde se va a mover cada nave, servira para la principal y para las naves enemigas
    //y que la nave pueda moverse   ----  inicioX     inicioY
    var type = MatrizThatMakeMeCry[value][0];
    regreso = [null,null,null,0];
    //Posiciones del objeto
    x = MatrizThatMakeMeCry[value][1];
    y = MatrizThatMakeMeCry[value][2];
    z = MatrizThatMakeMeCry[value][3];
    //Limites o dimensiones del objeto
    xlim = (MatrizThatMakeMeCry[value][7]-1)/2;
    ylim = (MatrizThatMakeMeCry[value][8]-1)/2;
    zlim = (MatrizThatMakeMeCry[value][9]-1)/2;

    //Revisa s su posición actual es la misma que otro objeto
    for(var i in MatrizThatMakeMeCry){
      if((MatrizThatMakeMeCry[i][1]>=x-xlim && MatrizThatMakeMeCry[i][1]<=x+xlim) && (MatrizThatMakeMeCry[i][2]>=y-ylim && MatrizThatMakeMeCry[i][2]<=y+ylim) && (MatrizThatMakeMeCry[i][3]>=z-zlim && MatrizThatMakeMeCry[i][3]<=z+zlim)){
        type = 0;
        //En caso de que no sea la misma nave
        if(MatrizThatMakeMeCry[i][0]!=MatrizThatMakeMeCry[value][0]){

          //Agregamos uno a numkills cuando una nave choca
          if(MatrizThatMakeMeCry[value][0]==1 || MatrizThatMakeMeCry[i][0]==1){
            numkills+=1;
          }
          //Si se choca con un objeto diferente del principal, se destruye o le baja la vida
          if(MatrizThatMakeMeCry[i][6]>0){
            MatrizThatMakeMeCry[i][6]-=3;
          }
          if(i!=0 && MatrizThatMakeMeCry[i][6]<=0){
            impact_sound(); //sonido de choque entre objetos
            destroy(i);//Eliminamos a la nave o asteroide de la matriz
            type=0; //Regresamos type para parar la ejecución desde el objeto
          }
          
          //Si el mismo objeto no es el principal, se destruye o le baja la vida
          if(MatrizThatMakeMeCry[value][6]>0){
            MatrizThatMakeMeCry[value][6]-=3;
          }
          if(value!=0 && MatrizThatMakeMeCry[value][6]<=0){
            //Eliminamos a la nave o asteroide de la matriz
            destroy(value);
            impact_sound();
            type = 0; //Regresamos type para parar la ejecución desde el objeto
          }
          //En caso de que alguno de los dos objetos en la colision sean el principal, se manda un menaje de perder
          if(value==0||i==0)
              MatrizThatMakeMeCry[0][6] = 3;////Aqui hize que la nave no pierda en caso de chocar
          LifeBar(MatrizThatMakeMeCry[0][6])
          color = "white";
        }else{
          type=MatrizThatMakeMeCry[value][0]; //Devolvemos el tipo para que la ejecución siga sin problemas
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
  }

  //Agregamos a la matriz los nuevos valores de posición
  MatrizThatMakeMeCry[value][0]=regreso[3];
  MatrizThatMakeMeCry[value][1]=regreso[0];
  MatrizThatMakeMeCry[value][2]=regreso[1];
  MatrizThatMakeMeCry[value][3]=regreso[2];
   return regreso

}

function destroy(position){ //Elimina una nave o asteroide del mundo
  scene.remove(MatrizThatMakeMeCry[position][4]);  //La quitamos de la escena
  delete MatrizThatMakeMeCry[position][4]; //Boramos el modelo
  delete MatrizThatMakeMeCry[position][5]; //Borramos el objeto
  MatrizThatMakeMeCry[position]=[null,null,null,null,null,null,0,null,null,null,null];  //Borramos la información en el array    
}

function NumerosAleatorios(tope){
    return Math.floor((Math.random()*tope))+1;
}

function NumKills(){  //Función que cuenta las kills
  setInterval(check,100);
  function check(){
    $('#numkills').html('Kills: '+numkills+'/'+numnaves); //Imprimimos las kills actuales y faltantes
    if(numkills == numnaves){ //Si destruyes todas las naves, redirecciona a ganar
      location.href="Win.html";
    }
  }
  check();
}
function Sobrevive(dif){  //Cuenta el tiempo para sosbrevivir
  tiempo = (dif*60)+10; //Tiempo dependiente de la dificultad
  setInterval(check,1000);
  function check(){
    tiempo--;
    $('#numkills').html('Tiempo restante: '+tiempo+'s');  //Imprimimos el tiempo restante
    if(tiempo == 0){
      location.href="Win.html"; //Redireccionamos si gana
    }
  }
  check();
}
function Wanted(dif){  //Checa si el objetivo fue destruido
  var wanted = MatrizThatMakeMeCry.length-1;
  var vida = clases_naves['wanted '+dif][6];
  setInterval(check,500);
  $('#wanted').show();
 $('#wantedname').show();
  function check(){
    if(MatrizThatMakeMeCry[wanted][0] == null || MatrizThatMakeMeCry[wanted][0] <= 0){
      location.href="Win.html"; //Redireccionamos si gana
    }
      
      var numero = MatrizThatMakeMeCry[wanted][6];
      //Se dibuja la vida del enemigo
      var canvasVida = document.getElementById("wanted");
      var life = canvasVida.getContext("2d");
      life.beginPath();
      //puntos iniciales // puntos finales
      life.rect(1, 1, 200, 20);//la tercera es la que tengo que modificar
      life.fillStyle = "#373737";
      life.fill();
      life.closePath();
      //la nave tendra 10 puntos de vida xd pero pueden ser mas 
      var vidaTotal = vida //es la vida que tendra el presonaje principal
      var anchoLife = ((numero * 200) / vidaTotal);
      life.beginPath();
      //puntos iniciales // puntos finales
      life.rect(1, 1, anchoLife, 20);//la tercera es la que tengo que modificar
      life.fillStyle = "#ff1a1a";
      life.fill();
      life.closePath();
  }
  check();
}

///-----------------------------------------------------------------------------------------------
///--------------------Ejecuciones----------------------------------------------------------------
///-----------------------------------------------------------------------------------------------
//               Funciones principales que corren todo el juego

$('#arriba').hide();  //Escondemos las barras de vida, ecudos y máscara de cabina
var world = new World();  //Creamos el objeto world
var dif = Number($('.dif').text()); //Obtenemos la dificultad especificada
var modo = Number($('.modo').text()); //Obtenemos el modo de juego
var data_world=null;  //Datos a mandar al objeto world
var msg = null; //Mensaje al inicio

//Dependiendo de modo ejecutamos cosas diferentes y cambiamos los valores para msg y data_world
if(modo == 1){  //Modo supervivencia
  //Objeto que guarda el tipo de objeto y cuántas unidades de este se crearán
  var obj = new Array(
    new Array(clases_naves['ast1'],12), 
    new Array(clases_naves['ast2'],12), 
    new Array(clases_naves['ast5'],12), 
    new Array(clases_naves['ast6'],12),
    new Array(clases_naves['class1 '+dif],10*dif)
  );
  data_world = new Array(60,60,60,'imperio',obj);
  msg = 'Localización: Sector K-3345  Sistema Alfa-C <br>Quedaste varado en territorio Imperial, vez a lo lejos los restos de una fragata rebelde.<br>Puedes sobrevivir el tiempo suficiente para que llegue la brigada de rescate?';
  Sobrevive(dif);
}
else if(modo == 4){ //Modo flota
  //Objeto que guarda el tipo de objeto y cuántas unidades de este se crearán
  var obj = new Array(
    new Array(clases_naves['ast3'],7*dif), 
    new Array(clases_naves['ast4'],7*dif), 
    new Array(clases_naves['ast7'],7*dif), 
    new Array(clases_naves['ast8'],7*dif), 
    new Array(clases_naves['class1 '+dif],5*dif)
  );
  data_world = new Array(100,100,100,'default',obj);
  msg = 'Localización: Sector D-1233  Estrella Delta-A <br> El imperio a tomado posesión de esta zona, acaba con ellos para que las tropas puedan pasar.<br>Buena suerte!';
  NumKills();
}
else if(modo == 5){ //Modo, el Rey ha Caído
  //Objeto que guarda el tipo de objeto y cuántas unidades de este se crearán
  var obj = new Array(
    new Array(clases_naves['ast1'],2*dif), 
    new Array(clases_naves['ast2'],2*dif), 
    new Array(clases_naves['ast7'],2*dif), 
    new Array(clases_naves['ast8'],2*dif),
    new Array(clases_naves['bodyguard '+dif],4*dif),
    new Array(clases_naves['wanted '+dif],1)
  );
  data_world = new Array(100,100,100,'default',obj);
  msg = 'Localización: Sector C-2  Sistema Rune <br> Después de una eternidad de batalla logras sacar a la nave del rey Hutt "Cosmos" de su escondite. Pero no viene solo, sus mejores guerreros lo acompañan, tal vez haga el trabjo un poco más difícil, procede con precaución.';
  setTimeout(function(){ 
    Wanted(dif);
  },11000);
}
//Vamos a trabajar sobre este mundo xd, es el modo mensajero, se supone
else if(modo == 2){ //Modo flota
  //Objeto que guarda el tipo de objeto y cuántas unidades de este se crearán
  var obj = new Array(
    //new Array(clases_naves['claseAmiga1'],10),
    new Array(clases_naves['class1 '+dif],1)
  );
  data_world = new Array(50,50,50,'default',obj);
  msg = 'prueba naves amigas xd';
}


$('#wanted').hide();
$('#wantedname').hide();
$('.texto_intro').html(msg); //Mostramos el mensaje acorde al modo
world.CreateWorld(data_world); //Creamos el mundo
setTimeout(function(){
  $('.texto_intro').hide(); //Ocultamos el mensaje
  $('#arriba').show();  //Mostramos la cabina y barras
  world.StartWorld(); //Empezamos el juego
},10000);
//------------------------------------------------------------------------------------------------