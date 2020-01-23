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
    constructor(borrarEnX, borrarEnY, alturaPantalla, anchoPantalla, canvas){//solo necesito el evento que haga que me regrese los valores de las posiciones del mouse
        ///aqui hayq ue poner la pantalla y no el canvas para
        this.RotationPosition = [0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360]
        this.borrarEnX=borrarEnX
        this.borrarEnY =borrarEnY
        //si ancho y alto son iguales se va uno
        this.alturaPantalla = alturaPantalla;//dive el valor de la pantalla del juego
        this.anchoPantalla = anchoPantalla;//dice el ancho de la pantalla
        this.inicioCamaraTorre = 5; //empieza a 90 grados jeje
        //Aqui hay que ejecutar funcion pa que este en 90 grados
    }
    subir(){//todo tiene que se se un loop para que se pregunte a cada si lo hace o no
        //si el mas esta a un tercio de la pantalla bajo, no se si sea mucho
        console.log(this.alturaPantalla)
        function LoopOfTheCamera(){
            
            setTimeout(function(){ 
                canvas.addEventListener('mousemove', function(event){      
                    var WhereIsTheMouse = [event.pageX,event.pageY]//partes donde no se adapta bien la pantalla
                    if(WhereIsTheMouse[1] < (200)/3){ //hace que la nave baja
                        var parametro = 0;
                        //aqui se hara que la nave suba
                    }else if(WhereIsTheMouse[1] > ((200)/3)*2){//si esta arriba de 2/3 la nave empezara asubir
                        var parametro = 1;  
                        //Aqui se hara que la nave baje    
                    }
                    if(parametro == 1 || parametro == 0)//pa que no se impriman un chingo jajajajaj              
                        console.log(parametro); 
                        LoopOfTheCamera()
                    }); 
            }, 4000);   
     
        }
           LoopOfTheCamera();//iniciando 
    }
    rotacion360(){
        function LoopOfMouse(OriginalPosition){
            setTimeout(function(){ 
                if(this.Posiciones[0]< (this.anchoPantalla)/4){//girar a la derecha
                    if(OriginalPosition == 0)
                        OriginalPosition =  this.RotationPosition.length-1;
                    OriginalPosition--;
            }
            if(this.Posiciones[0]> ((this.anchoPantalla)/4)*3){//girara a la girar a la izquierda 
                    if(OriginalPosition == this.RotationPosition.length-1)
                    OriginalPosition = 0;
                    OriginalPosition++;
            } 
            console.log(this.RotationPosition[OriginalPosition])
            LoopOfMouse(OriginalPosition)
             }, 1500);
           }
        LoopOfMouse(this.inicioCamaraTorre);

    }
}


        var fer = new CabinaDeControl(8,10,200,200, canvas);
      fer.subir()
     //   fer.rotacion360()
       
         
       


