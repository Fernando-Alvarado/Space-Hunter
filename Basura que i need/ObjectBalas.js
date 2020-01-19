///CONECCION HTML
//  <script src="ObjectBalas.js"></script>


function NumerosAleatorios(tope){
    return Math.floor((Math.random()*tope))+1
}

            function ArrayBaseDeLaNaves(numero){//declarando el array de las naves y sus posiciones
    var MatrizPrincipal = new Array(numero);
    for (let i = 0; i < numero; i++)
        MatrizPrincipal[i]=new Array(4);//array que dira si es una nave enemiga y sus posiciones en
        //x,y
    for (i=0; i<numero; i++){
        MatrizPrincipal[i][0] = 1;
        for (e=1; e<4; e++){
            MatrizPrincipal[i][e] = NumerosAleatorios(10);
        }
    }
    MatrizPrincipal[0][0] = 2;

return MatrizPrincipal;
}
//--------DECLARADNO LA MATRIZ XD
var tontaVariable = ArrayBaseDeLaNaves(8);
console.log(tontaVariable);

////----------------------------------------------------------------------------------------
///----------------En produccion para exportar a juego.js-----------------------------------
////----------------------------------------------------------------------------------------

class balas{//NOTE: la matriz del juego esta declarada arriba sera global, por que necesito que sea la actualizada para
                //la comparacion de las colisiones
    //matriz donde corre el juego || cordenadas conde empezo a disparar || coordenadas a donde va
    constructor(whereX, whereY, whereZ, ObjX, ObjY, ObjZ, Killed, limiteCampoJuego){
         //kileed se refiere al indicador de la nave que se quiere matar
            function graficadoraBullet(x,y,z,x2,y2,z2, limite){
                var cont = x;
                var VectorDirector = [x2-x,y2-y,z2-z];//vector que dara la direccion 
                var ArrayX = new Array(0);//okey so, here i should push negative numbers that would be dump
                var ArrayY = new Array(0);
                var ArrayZ = new Array(0);
                if(x2 < x)
                    while(cont != 0){
                        ArrayX.push(cont);
                        cont--;
                    }
                else
                    while(cont != limite){
                        ArrayX.push(cont);
                        cont++;   
                    }////
                for (let i = 0; i < ArrayX.length; i++){//loop of arrayY
                    if(VectorDirector[0]!= 0){
                        ArrayY.push(Math.round((VectorDirector[1]*((ArrayX[i]-x)/VectorDirector[0]))+y));    
                        ArrayZ.push(Math.round((VectorDirector[2]*((ArrayX[i]-x)/VectorDirector[0]))+z));      
                    }else{
                        ArrayY.push(y)
                        ArrayZ.push(z)
                    }
                }       
                var TheRegret = [ArrayX, ArrayY, ArrayZ] ;  //we are going to return 3 arrayS
                return TheRegret;

            }
        this.MatrizBalas3d = graficadoraBullet(whereX, whereY, whereZ, ObjX, ObjY, ObjZ,limiteCampoJuego);
        this.WhoToKill = Killed;//esto sera para que no exista el fuego amigo
        console.log(this.MatrizBalas3d);
     }
    MidnightBlame(){ //NOTE: la varaible de las naves es global tinee que estar declarada arriba
        var Coun = 0;
        function GodsLoop(MatBalas, Coun, WhoToKill){
            
         
            setTimeout(function(){
                if(Coun < MatBalas[0].length){
                   
                    var Everything = tontaVariable; //Aqui tengo que poner la matriz de IWannaCry
                    if( WhoToKill== 2){//cuendo le disparen a la nave principal
                        console.log('Im in')//ver si se mete al buble
                        //Everything es la matriz donde estan todas la anves
                        if(MatBalas[0][Coun]==Everything[0][1]&&MatBalas[1][Coun]==Everything[0][2]&&MatBalas[2][Coun]==Everything[0][3]){
                            console.log('impacto a una nave')
                        }else{
                            Coun++;
                            GodsLoop(MatBalas, Coun, WhoToKill);
                        }  
                    }else if(this.WhoToKill == 1){//cuando le dispare a una nave enemiga
                        console.log('no se por que se  metio')
                    }
                }        
            },100);//velocidad de las balas se puede cambiar
        }
        GodsLoop(this.MatrizBalas3d ,Coun,this.WhoToKill);
    }//llave del fin del metodo
 }
////---------------------------------------------------------------------------------------------------
///----------------------------------Parametros----------------------------------------------
//whereX, whereY, whereZ, ObjX, ObjY, ObjZ, Killed, limiteCampoJuego

var fernando = new balas(tontaVariable[1][1], tontaVariable[1][2], tontaVariable[1][3], tontaVariable[0][1], tontaVariable[0][2],tontaVariable[0][3],2,50)
fernando.MidnightBlame();


/*

Codigo viejito de las balas anteriores xxxxdxxx
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
            },100);//velocidad de las 

*/