///EMPIEZO A TRABAJR EN LA funcion para poder subir y bajar en el juegos
//agarrar elemento de html
//All I need of canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = '#990000';

ctx.strokeRect(0,0,200,200);

var altura = 200; //es la altura del canvas
var ancho = 200;//este valor se puede cambiar en un futurp
var posInicial = 1;
var gradosPantalla = 0; //Estos son los grdos donde inicialmnte empieza a ver e tipo
//--------------Here it ends

//Funciones de enventos, creo que solo necesito 2 y luego hare una funcion para que la nave suba o baje
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
        var MedidaPantalla = 200 //medidas de la pantalla
        var OriginalPosition = this.inicioCamaraTorre; //EMPIEZA AQUI la vista de la camar
        console.log(this.RotationPosition)//para ver donde esta funcionando el evento
        this.WhereItWorks.onmousemove = function(e){
            WhereOnX = e.pageX;//dice el valor de los eventos en tiempo real
            WhereOnY = e.pageY;//valor de y en real time
        }
        setInterval(CheckWhereTheHellIsIn, 1000);
        function CheckWhereTheHellIsIn(){
            var rotation= [0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360]
                //para que la nave pueda subir o bajar
                if(WhereOnY < (MedidaPantalla)/3){ //hace que la nave baja
                    var parametro = 0;
                    //aqui se hara que la nave suba
                }else if(WhereOnY > ((MedidaPantalla)/3)*2){//si esta arriba de 2/3 la nave empezara asubir
                    var parametro = 1;  
                    //Aqui se hara que la nave baje    
                }
                //esto es para que pueda rotar la pantalla del jugador
                if(WhereOnX< (MedidaPantalla)/4){//girar a la derecha
                    if(OriginalPosition == 0)//checar si es el final de arreglo de posiciones
                        OriginalPosition =  24;//el final del arreglo
                    OriginalPosition--;
                }
                else if(WhereOnX> ((MedidaPantalla)/4)*3){//girara a la girar a la izquierda 
                    if(OriginalPosition == 24)//checar si es el final de arreglo de posiciones
                        OriginalPosition = 0;//regresa al inicio de la matriz
                    OriginalPosition++;
                } 
                if(parametro == 1 || parametro == 0)//pa que no se impriman un chingo jajajajaj              
                    console.log(parametro + " sube o bajar");
                    console.log('la posicion de la camara es: ' + rotation[OriginalPosition]) 
                 //   console.log(this.RotationPosition[OriginalPosition])
                //the last thing to do       
        }
    }
}


        var fer = new CabinaDeControl(canvas);
      fer.Torreta()
     //   fer.rotacion360()
       
         
       


