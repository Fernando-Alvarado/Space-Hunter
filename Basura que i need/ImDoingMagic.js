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
//---Otras variables que necesito
var altura = screen.height;
var ancho = screen.width;
//--------------Here it ends
AlturaPantalla.innerText=altura///Solo para representar la altura en pantalla
AnchoPantalla.innerText=ancho//solo queiro saber que pedo con el nacho de la pantalla

//Funciones de enventos, creo que solo necesito 2 y luego hare una funcion para que la nave suba o baje
document.addEventListener('mousemove', function(event){
    var WhereIsTheMouse = [event.pageX,event.pageY]

  
    coordenadasPantalla.innerText= 'x= '+WhereIsTheMouse[0]+' Y= '+WhereIsTheMouse[1]
    return WhereIsTheMouse;
});

document.addEventListener('keydown', function(){
    console.log('aaauch')
});


