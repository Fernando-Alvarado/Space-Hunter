//Variable globales necesarios
var MatrizThatMakeMeCry = null;
var vidaDelEscudo = 15//seran los segundos que durar el escudo
var limitx = null;
var limity = null;
var limitz = null;
var numnaves = null;
var numasteroides = null; 
var numkills = 0; 
var tiempo = null;
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

//Definimos las clases de naves y asteroides
var clases_naves = {
  //velocidad,rango,velChase,velDisparo,rangoDisp,vida,largo,ancho,alto y modelo
  'class1 1': new Array('nave',1000,60,500,200,10,2,1,1,1,'Tie.glb'),
  'class1 2': new Array('nave',1000,40,300,150,15,3,1,1,1,'Tie.glb'),
  'class1 3': new Array('nave',1000,20,100,100,20,4,1,1,1,'Tie.glb'),
  class2: new Array('nave',1000,40,300,100,15,2,1,1,1),
  class3: new Array('nave',1000,40,300,150,18,2,5,5,5),
  class4: new Array('nave',1000,40,300,100,15,2,1,1,3),
  class5: new Array('nave',1000,40,300,150,18,2,3,3,5),
  class6: new Array('nave',1000,40,300,100,15,2,3,1,3),
  class7: new Array('nave',1000,40,300,150,18,2,1,1,5),
  class8: new Array('nave',1000,40,300,100,18,2,5,5,1),
  class9: new Array('nave',1000,40,300,150,18,2,7,7,3),
  //velocidad,modelo y dimensiones
  ast1: new Array('ast',10000,'asteroide_1_Gre.glb',1,1,1),
  ast2: new Array('ast',500,'asteroide_1_Pi.glb',1,1,1)
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
          if(MatrizThatMakeMeCry[value][0]==1 || MatrizThatMakeMeCry[i][0]==1){
            numkills+=1;
          }
          //Si se choca con un objeto diferente del principal, se destruye
          if(MatrizThatMakeMeCry[i][0]!=2){
            scene.remove(MatrizThatMakeMeCry[i][4]);
            delete MatrizThatMakeMeCry[i][4];
            delete MatrizThatMakeMeCry[i][5];
            impact_sound(); //sonido de choque entre objetos
            MatrizThatMakeMeCry[i]=[0,null,null,null,null,null,0];
            type=0;
          }
          //Si el mismo objeto no es el principal, se destruye
          if(MatrizThatMakeMeCry[value][0]!=2){
            scene.remove(MatrizThatMakeMeCry[value][4]);
            delete MatrizThatMakeMeCry[value][4];
            delete MatrizThatMakeMeCry[value][5];
            MatrizThatMakeMeCry[value]=[0,null,null,null,null,null,0];
            impact_sound();
            type = 0;
          }
          //En caso de que alguno de los dos objetos en la colision sean el principal, se manda un menaje de perder
          if(MatrizThatMakeMeCry[value][0]==2||MatrizThatMakeMeCry[i][0]==2)
              MatrizThatMakeMeCry[0][6] = 3;////Aqui hize que la nave no pierda en caso de chocar
          LifeBar(MatrizThatMakeMeCry[0][6])
          color = "white";
        }else{
          type=MatrizThatMakeMeCry[value][0];
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
  MatrizThatMakeMeCry[value][0]=regreso[3];
  MatrizThatMakeMeCry[value][1]=regreso[0];
  MatrizThatMakeMeCry[value][2]=regreso[1];
  MatrizThatMakeMeCry[value][3]=regreso[2];
   return regreso

}

function NumerosAleatorios(tope){
    return Math.floor((Math.random()*tope))+1;
}

function NumKills(){  //Función que cuenta las kills
  setInterval(check,100);
  function check(){
    $('#numkills').html('Kills: '+numkills+'/'+numnaves);
    if(numkills == numnaves){ //Si destruyes todas las naves, redirecciona a ganar
      location.href="Win.html";
    }
  }
  check();
}
function Sobrevive(dif){
  tiempo = (dif*60)+10;
  setInterval(check,1000);
  function check(){
    tiempo--;
    $('#numkills').html('Tiempo restante: '+tiempo+'s');
    if(tiempo == 0){
      location.href="Win.html";
    }
  }
  check();
}

///-----------------------------------------------------------------------------------------------
///--------------------Ejecuciones----------------------------------------------------------------
///-----------------------------------------------------------------------------------------------
//               Funciones principales que corren todo el juego

$('#arriba').hide();
var world = new World();  //Creamos el objeto world

var dif = Number($('.dif').text());
var modo = Number($('.modo').text());
var data_world=null;
var msg = null;
if(modo == 1){
  var obj = new Array(
    new Array(clases_naves['ast1'],50), 
    new Array(clases_naves['class1 '+dif],30*dif),
  );
  data_world = new Array(60,60,60,'imperio',obj);
  msg = 'Localización: Sector K-3345 Sistema Alfa-C <br>Quedaste varado en territorio Imperial, vez a lo lejos los restos de una fragata rebelde.<br>Puedes sobrevivir el tiempo suficiente para que llegue la brigada de rescate?';
  Sobrevive(dif);
}
else if(modo == 4){
  var obj = new Array(
    new Array(clases_naves['ast1'],50), 
    new Array(clases_naves['class1 '+dif],5*dif),
  );
  data_world = new Array(100,100,100,'default',obj);
  msg = 'Localización: Sector D-1233 Estrella Delta-A <br> El imperio a tomado posesión de esta zona, acaba con ellos para que las tropas puedan pasar.<br>Buena suerte!';
  NumKills()
}

$('.texto_intro').html(msg);
world.CreateWorld(data_world); //Creamos el mundo
setTimeout(function(){
  $('.texto_intro').hide();
  $('#arriba').show();
  world.StartWorld();
},10000);
//------------------------------------------------------------------------------------------------