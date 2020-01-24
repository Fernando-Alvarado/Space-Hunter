//la verda no se si salgo esto de disparar con la nave principal pero ill try
//Codigo usado en Imdoing magic, 
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = '#990000';
ctx.strokeRect(0,0,200,200);

var WhereOnX = null; //posicon del mouse en X
var WhereOnY = null; //posicon del mouse en Y
canvas.onmousemove = function(e){
    WhereOnX = e.pageX;//dice el valor de los eventos en tiempo real
    WhereOnY = e.pageY;//valor de y en real time
}
//-----------------------------------------------------------------------
//Variable de las naves, posiciones
var navePrincipal = [15,30,40];
var enemiga1 = [33, 38, 50];

//-----------------------------------------------------------------------
function KnowWhereToMove(PosicionNave, AlturaMatriz){
    var borde = 60;
    var cuantosPuntos =  10;
                    //X,  Y,  Z
     //x = altura
     //Y = lados  
var puntoNaveEnemiga = [null, null, borde]; //eston cambiara cuando la nave gire
//tomando que si aumentamos en y avanzamos acia delante
//distancia entre el piso del juego y l

//con esto saco el Ca
/*var DistanciaNavePrinYBorde = Math.abs(borde - PosicionNave[2])//distancia que ay entre las dos
//sacamos la hipotenusa con esto
var distancia2Puntos = Math.sqrt(Math.pow(7, 2)+  Math.pow(7, 2)); */
canvas.addEventListener("click", function(){
    console.log("la nave en X esta en "+ WhereOnX +" Posicon en Y "+  WhereOnY );

    var puntoNaveEnemiga = [Math.round(WhereOnY/cuantosPuntos),Math.round(WhereOnX/cuantosPuntos),  borde]; 
    console.log(puntoNaveEnemiga);
});


}
KnowWhereToMove(navePrincipal);
