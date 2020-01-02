//-------------DEclaracion de variables 
var limit = 50;//Numero de casillas de la matriz
var tamCanvas= 500;//Tama;o del canvas
var velocidad = 1000;//Esta variable dira que tan rapido las naves reacionaran
var matrizPrincipal = document.getElementById('matrizBase');//puede ser o no el canvas principal xd
var lienzoBase = matrizPrincipal.getContext('2d');
var numnaves = 8; //numero de naves que hay declaradas 
var MatrizThatMakeMeCry = ArrayBaseDeLaNaves(numnaves);//tipo instanciando la matriz principal
//--------------------------------OBJETOS------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//Matriz[0][1], Matriz[0][2],
class PersonajePrincipal{
       constructor (matrizDondeSeTrabaja) {           
            this.matrizDondeSeTrabaja = matrizDondeSeTrabaja;         
        }
        mover(){
            var matrizDondeSeTrabaja = this.matrizDondeSeTrabaja;
            document.addEventListener('keydown', function(event) {//PARA RECONOCER LA tECLAS
            var corriendo =  ChooseWhereToMove("black",matrizDondeSeTrabaja, matrizDondeSeTrabaja[0][2], matrizDondeSeTrabaja[0][1], event.code,"KeyW", "KeyS", "KeyA", "KeyD", 0);
            matrizDondeSeTrabaja[0][2]=corriendo[0];//se reinia la cuenta para que se pueda mover la neve
            matrizDondeSeTrabaja[0][1]=corriendo[1];//es algo idiota pero funciona jajajaja
         
            });
        }
    }
class NavesEnemigas{
        constructor(matrizDondeSeTrabaja, number){//el 
            this.workingMat = matrizDondeSeTrabaja;
            this.number = number;//indice dentro de la matriz principal donde se guardara la nave
            this.numero =  NumerosAleatorios(4);//luego esto tengra que cambiar a 5 para que puedan
            //disparar
        }
        JustTheCreator(){//este metodo ara que las naves se muevan y  si tiempo que disparen
            //usara la funcion switch que cree
            function MainBucle(velocidad, matriz, y, x ,move, ar1, ar2, ar3, ar4, position){ //Aqui se tendra que correr el bucle de las naves
                setTimeout(function(){ 
                    var itsRunnig = ChooseWhereToMove("red",matriz, y, x, move, ar1, ar2, ar3, ar4, position);
                   var numero = NumerosAleatorios(4);                  
                    MainBucle(velocidad, matriz, itsRunnig[0], itsRunnig[1], numero, ar1, ar2, ar3, ar4, position);
                }, velocidad);
            }
        //console.log(this.number)
        MainBucle(1000, this.workingMat, this.workingMat[this.number][2], this.workingMat[this.number][1], this.numero, 1, 2, 3, 4, this.number);
        }
    }
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
                var m = (y2-y1)/(x2-x1);//sacar la pendiente de la funcion jaja
                for (var i=x1; i<(50+x1); i++){///50 es el limite
                    ///el limite es de la matriz para que no haga un gasto innecesario de memoria
                   if(i != limite){
                        BalasDeLaMatriz[0][(i-x1)] = i;//posiciones en el eje x
                        BalasDeLaMatriz[1][(i-x1)] = Math.round((m*(i))+y1);//posiciones en el eje y
                    }else{
                        i= 50+x1/// en caso de que se llegue a limite del mapa
                    }                  
                }
                return BalasDeLaMatriz;
            }
            var prueba = graficadora(this.WherX, this.WherY, this.ObjX, this.ObjY, this.limCampJue)
            /*
            //Este sera el loop donde se irea coparando las matrices para chacar coliciones
            function GodsLoop(){
                setTimeout(function(){ 
                 ///codigo donde ira la comparacion              
                    GodsLoop();
                },100);//velocidad
            }
            MainBucle();           
                */              
            }
}
////-------------------------------------------------------------------------------------------------------
////-------------------------------------------------------------------------------------------------------
////---------------------------------------------------------------------------------------------------
//  value valie sirve para saber el indice donde se guardara el incie de la matriz que me hace llorar
function ChooseWhereToMove(color,matriz,y, x, event, argu1, argu2, argu3, argu4, value){//switch para elegir 
    //donde se va a mover cada nave, servira para la principal y para las naves enemigas
    LimpiarLaMatriz(y, x, "white");
    //y que la nave pueda moverse   ----  inicioX     inicioY  
    switch(event){
        case argu1:if(y==0)
                        y=limit-1;
                    else
                        y--;
           break;
        case argu2: if(y==limit-1)
                        y=0;
                    else
                        y++;
            break;
        case argu3: if (x==0)
                        x = limit-1;
                    else
                        x--;   
            break;
        case argu4: if(x==limit-1)
                        x=0;
                    else
                        x++;                 
            break;
    } 
    //ponerLasNavesEnLaMatriz(matriz);/////////////////////////////////Arreglar
    LimpiarLaMatriz(y, x, color);
    var regreso = new Array(2);
   regreso = [y, x, matriz];
   MatrizThatMakeMeCry[value][1] = x;//reasignando los valores x y de a el array
   MatrizThatMakeMeCry[value][2] = y;//principl
   //console.log(MatrizThatMakeMeCry)
   return regreso
  
}
function dibujarReticula(){//funcion que se puede quitar cuando se pase el juego
    ///Solo sirve aqui en canvas esta funcion se ira muy lejos jajajaja
    //vertical
    for(let i = 0; i <= tamCanvas; i+=(tamCanvas/limit)){
        lienzoBase.moveTo(i, 0);
        lienzoBase.lineTo(i, tamCanvas);
    }
    //horizontal
    for(let i = 0; i <= tamCanvas; i+=(tamCanvas/limit)){
        lienzoBase.moveTo(0,i);
        lienzoBase.lineTo(tamCanvas, i);
    }
    lienzoBase.stroke();//el que las dibuja
}
function ponerLasNavesEnLaMatriz(matrizDeclarada){//cada que se mueva se tendra que correr esta
    ///Matriz solo de la de canvas
    // funcion para refrescar todo  //solo es para pintarla
    /*console.log('dipdup')
    console.log(matrizDeclarada)*/
    for(let i=0; i<matrizDeclarada.length; i++){ //colocar las cosas en su lugar
                lienzoBase.beginPath();//EMPEZAR EL DIBUJO
                if(matrizDeclarada[i][0] == 2)
                     lienzoBase.fillStyle = "black";//color que quieran
                else
                    lienzoBase.fillStyle = "red";//color que quieran
                lienzoBase.rect((matrizDeclarada[i][1]*10), (matrizDeclarada[i][2]*10), 10, 10);//poner las cuadrados tal ves hay que
                //tal vez hay que cambiar el cuadro de los cuaros 10
                lienzoBase.fill();// poder rellenar de color el fondo del canvas
                lienzoBase.closePath();
    }

}
function LimpiarLaMatriz(y, x, color){ //funcion para limpiar la pos anterior
    ///Funcion que hace que hace que se borre el rastro de la nave en la matriz de canvas
    lienzoBase.beginPath();//EMPEZAR EL DIBUJO
    lienzoBase.fillStyle = color;//color que quieran
    lienzoBase.rect((x*10), (y*10), 9, 9);//poner las cuadrados tal ves hay que
    lienzoBase.fill();// poder rellenar de color el fondo del canvas
    lienzoBase.closePath();
}
///----------------FUNCTIONS THAT I NEED TO COPY now they r modify---------------------------
function NumerosAleatorios(tope){
    return Math.floor((Math.random()*tope))+1;
}
function ArrayBaseDeLaNaves(numero){//declarando el array de las naves y sus posiciones
    var MatrizPrincipal = new Array(numero);
    for (let i = 0; i < numero; i++)
        MatrizPrincipal[i]=new Array(3);//array que dira si es una nave enemiga y sus posiciones en X,Y 
    for (i=0; i<numero; i++){
        MatrizPrincipal[i][0] = 1;
        for (e=1; e<3; e++){
            MatrizPrincipal[i][e] = NumerosAleatorios(limit);
        }
    }
    MatrizPrincipal[0][0] = 2;
return MatrizPrincipal;
}
 //poner posiones de las naves y ver donde vas a empezar funcion importante xd
function colocarPosicionesAleatorias(numNaves){//saber donde estaran las naves al inicio
    //tambien es medio la base de todo el juego espero que esto cambie
   // var Matriz = ArrayBaseDeLaNaves(numNaves);//tipo instanciando la matriz principal
    ponerLasNavesEnLaMatriz(MatrizThatMakeMeCry)//ibujar la matriz de nuemeros en esta de canvas        
    //instanciando el objeto principal ----------------------
    const nave = new PersonajePrincipal(MatrizThatMakeMeCry);
    nave.mover()//haciendo que el objeto funcione  las teclas
    //-----------------Delcarando todas las naves enemigas que hay--------------------
    var ArrayObjetos = new Array(numNaves-1);//aqui correran todos los objetos de las naves enemigas
    for(let i = 0; i< ArrayObjetos.length; i++){//funcion para que los objetos se instancien con sus propiedades
        ArrayObjetos[i] = new NavesEnemigas(MatrizThatMakeMeCry, i+1);
        ArrayObjetos[i].JustTheCreator();//Js es una mamada jajaja
    } 
}
///-----------------------------------------------------------------------------------------------
///--------------------Ejecuciones----------------------------------------------------------------
///-----------------------------------------------------------------------------------------------
//               Funcion principal que corre todo el juego
colocarPosicionesAleatorias(numnaves)//esta ganando mucha importancia esta funcion 


//------------------------------------------------------------------------------------------------
//-------------PURO CAMVAS------- (matriz de los monitos)--------------------------------
lienzoBase.beginPath();//EMPEZAR EL DIBUJO
//dibujar la reticula 
dibujarReticula();//esta es la reticula del 
lienzoBase.closePath();