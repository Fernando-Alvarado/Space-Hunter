function NumerosAleatorios(tope){
    return Math.floor((Math.random()*tope))+1
}

            function ArrayBaseDeLaNaves(numero){//declarando el array de las naves y sus posiciones
    var MatrizPrincipal = new Array(numero);
    for (let i = 0; i < numero; i++)
        MatrizPrincipal[i]=new Array(3);//array que dira si es una nave enemiga y sus posiciones en 
        //x,y  
    for (i=0; i<numero; i++){
        MatrizPrincipal[i][0] = 2;
        for (e=1; e<3; e++){
            MatrizPrincipal[i][e] = NumerosAleatorios(10);
        }
    }
    MatrizPrincipal[0][0] = 1;
  
return MatrizPrincipal;
}
////----------------------------------------------------------------------------------------
///----------------En produccion para exportar a juego.js-----------------------------------
////----------------------------------------------------------------------------------------
class balas{
    //matriz donde corre el juego || cordenadas conde empezo a disparar || coordenadas a donde va
    constructor(PrincipalMat, whereX, whereY, ObjX, ObjY, Killed){ //kileed se refiere a la nave a
        //que se le espero disparas, no se si quieran que se permita el fuego amigo    
     this.Matriz = PrincipalMat;
     this.WherX = whereX;
     this.WherY = whereY;
     this.ObjX = ObjX;
     this.ObjY = ObjY;
     this.Killed = Killed;
     }
    MidnightBlame(){
        function GodsLoop(){
            setTimeout(function(){ 
                       
                GodsLoop();
            }, 100);
        }
        GodsLoop(); 
    }  
 }
////---------------------------------------------------------------------------------------------------
///----------------------------------------------------------------------------------------------------
function graficadora(x1, y1, x2, y2){
    var m = (y2-y1)/(x2-x1)
    return m;
}
var prueba = graficadora(2,3,4,5)

console.log('iono')

for (i=2; i<=10; i++){
    var yo = (prueba*i)+4;
    console.log(yo)
}
console.log('io')



//var Runni = ArrayBaseDeLaNaves(4);



/*for (i=x1; i>=10; i++){
    console.log((m*i)+y1)
  }*/
/*
the gods loop
   function GodsLoop(){
                setTimeout(function(){ 
                           
                    GodsLoop();
                }, 100);
            }
        MainBucle();
        }
*/
/*
Crear una cookie
document.cookie = “name=valor”;
document.cookie = “name=valor; expires=fecha en UTC”;
Obtener cookies
document.cookie; //obtiene una cadena con todas las cookies
///////--------------------------------------------------------------------------------------------
///////--------------------------------------------------------------------------------------------
class PersonajePrincipal{
       constructor (matrizDondeSeTrabaja) {           
            this.matrizDondeSeTrabaja = matrizDondeSeTrabaja;         
        }
        mover(){
           
         
        }
    }
*/
