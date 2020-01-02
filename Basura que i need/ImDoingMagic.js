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
            function graficadora(x1, y1, x2, y2, limite){//Matriz de las balas
                var BalasDeLaMatriz = [new Array(50), new Array(50)];//sera el array de las balas la longitud que 
                //recorreran sera la longitud del array
                var m = (y2-y1)/(x2-x1);
                for (var i=x1; i<(50+x1); i++){
                ///el limite es de la matriz para que no haga un gasto innecesario de memoria
                    if(i != limite){
                        BalasDeLaMatriz[0][(i-x1)] = i;
                        BalasDeLaMatriz[1][(i-x1)] = Math.round((m*(i))+y1);
                    }else{
                        i= 50+x1
                    }
           
                }
                return BalasDeLaMatriz;
            }
        this.MatBalas = graficadora(this.WherX, this.WherY, this.ObjX, this.ObjY, this.limCampJue)
     }
    MidnightBlame(){
        var Coun = 0;
        //the gods loop
        //Posicion en donde debe comparar la matriz || la matriz del juego || 
        function GodsLoop(MatBalas, MatOfGame, WhatIs, Coun){
            setTimeout(function(){ 
                if(Coun != 50){//Para que el bucle no se haga infinito
                    if(WhatIs == 2){//para chcar si es nave enemiga o amiga
                        if(MatBalas[0][Coun] == MatOfGame[0][1] && MatBalas[1][Coun] == MatOfGame[0][2]){
                            console.log('impacto')
                        }else{
                        //MatOfGame = a las matriz del juego necesito hacer que sea la mas actualizada
                            GodsLoop(MatBalas, MatOfGame, WhatIs, Coun);
                        }                                              
                    }else{
                         for(i=1; i< MatOfGame.length; i++)//checar la matriz del juego para poder comparar si hay un impacto
                            if(MatBalas[0][Coun]==MatOfGame[i][1] && MatBalas[1][Coun]==MatOfGame[i][2]){//saber si impactaste
                                 console.log('impacto a una nave enemiga')///codigo del impacto
                            }//no se cuento se alargue este, creo que hare otro objeto para la destruccion
                            else{
                            //MatOfGame = a las matriz del juego necesito hacer que sea la mas actualizada
                                GodsLoop(MatBalas, MatOfGame, WhatIs, Coun);
                            }
                              
                    }
                }     
            },100);//velocidad de las balas se puede cambiar
        }//llave del fin de la funcion
//PARAMETROS || MatRIZbALAS Balas, Matratriz del juego, WhatIs, Coun
        GodsLoop();
    }//llave del fin del metodo  
 }
////---------------------------------------------------------------------------------------------------
///----------------------------------------------------------------------------------------------------
var tontaVariable = ArrayBaseDeLaNaves(8);
console.log(tontaVariable.length)
console.log("///////////////////////////////");
//PrincipalMat, whereX, whereY, ObjX, ObjY, Killed, limiteCampoJuego
var fernando = new balas(tontaVariable, 1,1,8,4,2,51)
fernando.MidnightBlame();



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
