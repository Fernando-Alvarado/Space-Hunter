function NumerosAleatorios(tope){
    return Math.floor((Math.random()*tope))+1
}

            function ArrayBaseDeLaNaves(numero){//declarando el array de las naves y sus posiciones
    var MatrizPrincipal = new Array(numero);
    for (let i = 0; i < numero; i++)
        MatrizPrincipal[i]=new Array(3);//array que dira si es una nave enemiga y sus posiciones en 
        //x,y  
    for (i=0; i<numero; i++){
        MatrizPrincipal[i][0] = 1;
        for (e=1; e<3; e++){
            MatrizPrincipal[i][e] = NumerosAleatorios(10);
        }
    }
    MatrizPrincipal[0][0] = 2;
  
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
            var m = (y2-y1)/(x2-x1);
            const BalasDeLaMatriz = [new Array(0), new Array(0)];//sera el array de las balas la longitud que 
            var i = x1;
            while(i != limite && BalasDeLaMatriz[1][BalasDeLaMatriz[1].length-1] != limite){
                if(m <= 2.5){
                    BalasDeLaMatriz[0].push(i);
                    BalasDeLaMatriz[1].push(Math.round((m*(i-x1))+y1));//la primera locacion siempre sera la nave donde
                    //se disparo
                }else{
                    BalasDeLaMatriz[0].push(Math.round(i*.1));
                    BalasDeLaMatriz[1].push(Math.round(((m*(i-x1))+y1)*.1));
                }
                if(x1 > x2 && y1 > y2){//en caso de que la nave enemiga este a la izquierda
                    i--;
                    if(i == 0 || BalasDeLaMatriz[1][BalasDeLaMatriz[1].length-1] == 0)///para que encuentre el limite y no se haga
                        i = limite//un blucle infinito
                }       
                else 
                i++;
           }//aqui se acaba la llave del while
            return BalasDeLaMatriz;
        }
        this.MatBalas = graficadora(this.WherX, this.WherY, this.ObjX, this.ObjY, this.limCampJue)
        console.log(this.MatBalas)
     }
    MidnightBlame(){
        var Coun = 0;
        function GodsLoop(MatBalas, MatOfGame, WhatIs, Coun){
            setTimeout(function(){ 
                if(Coun != MatBalas[1].length){//Para que el bucle no se haga infinito
                    if(WhatIs == 2){//para chcar si es nave enemiga o amiga
                        console.log('Im in')
                        if(MatBalas[0][Coun] == MatOfGame[0][1] && MatBalas[1][Coun] == MatOfGame[0][2]){
                            console.log('impacto a una nave')
                        }else{
                        //MatOfGame = a las matriz del juego necesito hacer que sea la mas actualizada
                        Coun++;
                            GodsLoop(MatBalas, MatOfGame, WhatIs, Coun);
                        }                                              
                    }else{
                         for(i=1; i< MatOfGame.length; i++)//checar la matriz del juego para poder comparar si hay un impacto
                            if(MatBalas[0][Coun]==MatOfGame[i][1] && MatBalas[1][Coun]==MatOfGame[i][2]){//saber si impactaste
                                 console.log('impacto a una nave enemiga')///codigo del impacto
                            }//no se cuento se alargue este, creo que hare otro objeto para la destruccion
                            else{
                            //MatOfGame = a las matriz del juego necesito hacer que sea la mas actualizada
                            Coun++;
                                GodsLoop(MatBalas, MatOfGame, WhatIs, Coun);
                            }
                              
                    }
                }     
            },100);//velocidad de las balas se puede cambiar
        }//Where func ends   PARAMETROS || MatRIZbALAS Balas, Matratriz del juego, WhatIs, Coun
        console.log("The object start");///solo para ver si sirve
        GodsLoop(this.MatBalas, this.Matriz, this.Killed, Coun);
    }//llave del fin del metodo  
 }
////---------------------------------------------------------------------------------------------------
///----------------------------------------------------------------------------------------------------
var tontaVariable = ArrayBaseDeLaNaves(8);
console.log(tontaVariable);
//PrincipalMat, whereX, whereY, ObjX, ObjY, Killed, limiteCampoJuego
var fernando = new balas(tontaVariable, tontaVariable[1][1], tontaVariable[1][2], tontaVariable[0][1], tontaVariable[0][2],2,51)
fernando.MidnightBlame();


