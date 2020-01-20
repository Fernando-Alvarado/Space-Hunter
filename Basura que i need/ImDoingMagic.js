///EMPIEZO A TRABAJR EN LA funcion para poder subir y bajar en el juegos
//agarrar elemento de html
//All I need of canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = '#990000';

ctx.strokeRect(0,0,200,200);



////----All the shit i need to get from html
var coordenadasPantalla = document.getElementById('coordenadas');//variable para poner las posiciones que saco
var AlturaPantalla = document.getElementById('Altura');
var AnchoPantalla =  document.getElementById('Ancho');
var subeOBaja = document.getElementById('subeOBaja');
var rotcionCamara = document.getElementById('rotacionCamara')
var vistasDefinidas = [0,90,180,270];//todos los valores que puede tomar la camara
//---Otras variables que necesito
var altura = 200; //es la altura del canvas
var ancho = 200 
var gradosPantalla = 0; //Estos son los grdos donde inicialmnte empieza a ver e tipo
//--------------Here it ends
AlturaPantalla.innerText=altura///Solo para representar la altura en pantalla
AnchoPantalla.innerText=ancho//solo queiro saber que pedo con el nacho de la pantalla

//Funciones de enventos, creo que solo necesito 2 y luego hare una funcion para que la nave suba o baje
canvas.addEventListener('mousemove', function(event){
    var WhereIsTheMouse = [event.pageX - 10,event.pageY -8]//Lo que
   if(WhereIsTheMouse[1] < (altura)/3)
        var parametro = 0;
    else if(WhereIsTheMouse[1] > ((altura)/3)*2)
        var parametro = 1;   
    subeOBaja.innerText= parametro;
    if(WhereIsTheMouse[0]< (altura)/4)//girara a la derecha
    setTimeout(function(){ 
        gradosPantalla -= 90
        rotcionCamara.innerText= gradosPantalla;
    }, 1000);
  
    coordenadasPantalla.innerText= 'x= '+WhereIsTheMouse[0]+' Y= '+WhereIsTheMouse[1]
    return WhereIsTheMouse;
});

document.addEventListener('keydown', function(){
    console.log('aaauch')
});


