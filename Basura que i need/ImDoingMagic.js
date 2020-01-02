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
    constructor(PrincipalMat, whereX, whereY, ObjX, ObjY, Killed, limiteCampoJuego){ //kileed se refiere a la nave a
        //que se le espero disparas, no se si quieran que se permita el fuego amigo    
     this.Matriz = PrincipalMat;//matris donde estan declaradas todas las naves
     this.WherX = whereX;//coordenadas iniciales
     this.WherY = whereY;
     this.ObjX = ObjX;//cordenadas a lo que se le disparo
     this.ObjY = ObjY;
     this.Killed = Killed;///a que va a matar, si es nave enemiga o no
     this.limCampJue = limiteCampoJuego;///limite de las dimensiones del campo de batalla
     }
    MidnightBlame(){
        function graficadora(x1, y1, x2, y2, limite){
            var BalasDeLaMatriz = [new Array(50), new Array(50)];//sera el array de las balas la longitud que 
            //recorreran sera la longitud del array
            var m = (y2-y1)/(x2-x1);
            for (var i=x1; i<(50+x1); i++){
                ///el limite es de la matriz para que no haga un gasto innecesario de memoria
               if(i != limite){
                   console.log('bipbup')
                BalasDeLaMatriz[0][(i-x1)] = i;
                BalasDeLaMatriz[1][(i-x1)] = Math.round((m*(i))+y1);
               }else{
                   i= 50+x1
               }
               
            }
            return BalasDeLaMatriz;
        }
        var prueba = graficadora(this.WherX, this.WherY, this.ObjX, this.ObjY, this.limCampJue)
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
    }  
 }
////---------------------------------------------------------------------------------------------------
///----------------------------------------------------------------------------------------------------
var tontaVariable = NumerosAleatorios(10);
//PrincipalMat, whereX, whereY, ObjX, ObjY, Killed, limiteCampoJuego
var fernando = new balas(tontaVariable, 1,1,8,4,2,51)
fernando.Prueba();



//console.log()



//var Runni = ArrayBaseDeLaNaves(4);



/*for (i=x1; i>=10; i++){
    console.log((m*i)+y1)
  }*/

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
