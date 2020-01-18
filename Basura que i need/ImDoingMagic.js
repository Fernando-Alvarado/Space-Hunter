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
////----------------------------------------------------------------------------------------
///----------------En produccion para exportar a juego.js-----------------------------------
////----------------------------------------------------------------------------------------
var yoyoyo = 10;
class GossipObject{
    constructor(varable){//cualquiere varaible que quieras meter
        this.var = varable;
    }
    TakingOut(){
        function rara(jajaj){
            jajaj+=  yoyoyo;
        return jajaj
    }
  rara(this.var)
    }

}

var me = new GossipObject("fernando");
me.TakingOut()
//var diego = 
//console.log(diego)

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
     }
    MidnightBlame(){ //NOTE: la varaible de las naves es global tinee que estar declarada arriba
        var Coun = 0;
        function GodsLoop(){
            setTimeout(function(){
                var Everything = tontaVariable; //Aqui tengo que poner la matriz de IWannaCry
                if(this.WhoToKill == 2){//cuendo le disparen a la nave principal
                    console.log('Im in')//ver si se mete al buble
                    //Everything es la matriz donde estan todas la anves
                    if(MatrizBalas3d[][][]== Everything[][][] && MatrizBalas3d[][][]== Everything[][][] && MatrizBalas3d[][][]== Everything[][][]){
                        console.log('impacto a una nave')
                    }else{
            
                    Coun++;
                        GodsLoop(MatBalas, MatOfGame, WhatIs, Coun);
                    }

                }else if(this.WhoToKill == 1){//cuando le dispare a una nave enemiga

                }
            },100);//velocidad de las balas se puede cambiar
        }//Where func ends   PARAMETROS || MatRIZbALAS Balas, Matratriz del juego, WhatIs, Coun
        GodsLoop();
    }//llave del fin del metodo
 }
////---------------------------------------------------------------------------------------------------
///----------------------------------------------------------------------------------------------------
var tontaVariable = ArrayBaseDeLaNaves(8);
console.log(tontaVariable);
//PrincipalMat, whereX, whereY, ObjX, ObjY, Killed, limiteCampoJuego
var fernando = new balas(tontaVariable, tontaVariable[1][1], tontaVariable[1][2], tontaVariable[1][3], tontaVariable[0][1], tontaVariable[0][2],tontaVariable[0][3],2,51)
