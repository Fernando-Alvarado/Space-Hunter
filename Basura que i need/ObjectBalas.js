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
                //-Declaracion de los 3 array 
                var ArrayX = new Array(0);//okey so, here i should push negative numbers that would be dump
                var ArrayY = new Array(0);
                var ArrayZ = new Array(0);
                function Tabulaciones (pun1, pun2, arrePun, limite, arreSalida1, arreSalida2, numSalida1, numSalida2, numPrincipal, leter1, leter2, ord1, ord2, ord3){
                    var VectorDirector = [x2-x,y2-y,z2-z];//vector que dara la direccion 
                    var cont = pun1;
                    if(pun2 < pun1)//compara donde esta los puntos, para poder los puntos para tabular
                    while(cont != 0){
                        arrePun.push(cont);
                        cont--;
                    }
                else
                    while(cont != limite){
                        arrePun.push(cont);
                        cont++;   
                    }////
                for (let i = 0; i < arrePun.length; i++){//loop of arrayY
                    if(VectorDirector[0]!= 0){
                        arreSalida1.push(Math.round((VectorDirector[numSalida1]*((arrePun[i]-pun1)/VectorDirector[numPrincipal]))+leter1));    
                        arreSalida2.push(Math.round((VectorDirector[numSalida2]*((arrePun[i]-pun1)/VectorDirector[numPrincipal]))+leter2));      
                    }else{
                        arreSalida1.push(leter1)
                        arreSalida2.push(leter2)
                    }
                    //para ver como esta funcioanndo la mamada
                }
               var MyRegret = [ord1, arrePun, ord2,arreSalida1, ord3,arreSalida2] ;  //we are going to return 3 arrayS
                return MyRegret;
                }
                            //numeros de las letras x =0, y=1, z=2 ---El ultimo es del que se quiere sacar
              
                if(x != y){
                    var takeMe = Tabulaciones(x, x2, ArrayX, limite,ArrayY, ArrayZ,1,2,0,y,z, "x","y","z" )
                    var letMeFly = [takeMe[1], takeMe[3],takeMe[5]]//poniendo arden       
                }else if(x == y){
                    console.log('salve una indeterminacion xd')
                    var takeMe = Tabulaciones(z, z2, ArrayZ, limite,ArrayX, ArrayY,0,1,2,x,y, "z","x","y" )
                    var letMeFly = [takeMe[3], takeMe[5],takeMe[1]]//ordenando lo que sale de los arreglos
                }
                return letMeFly;     
            }
        //----------------------------------------------------
        this.MatrizBalas3d = graficadoraBullet(whereX, whereY, whereZ, ObjX, ObjY, ObjZ,limiteCampoJuego);
        console.log(this.MatrizBalas3d);
        this.WhoToKill = Killed;//esto sera para que no exista el fuego amigo
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
                        //Aqui meteria el evento para que se dibuje la bala
                        //que borre la anterior 
                        // tomando los cooredanas de  MatBalas[0][Coun], MatBalas[1][Coun], MatBalas[2][Coun]
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
/*
whereX, whereY, whereZ, ObjX, ObjY, ObjZ, Killed, limiteCampoJuego){
         //kileed se refiere al indicador de la nave que se quiere matar
            function graficadoraBullet(x,y,z,x2,y2,z2, limite){
                //2 es la nave principal
*/
var disparoNaveEnemiga = new balas(tontaVariable[1][1], tontaVariable[1][2], tontaVariable[1][3], tontaVariable[0][1], tontaVariable[0][2],tontaVariable[0][3],2,50)
disparoNaveEnemiga.MidnightBlame();


