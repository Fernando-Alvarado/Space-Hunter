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
var original;
class gossip{
    constructor (RunnigGame, number, ejex, ejey) {     
      //  this.original = original; //sera la matriz que se pase por parametro de la funcion              
        this.RunnigGame = RunnigGame;  //matriz modificada
        this.number = number; //numero en el eje y 
        this.ejex1 = ejex1;  //valores de sus posiciones que es lo que quiero sacar
        this.ejex2 = ejey2;  //
     }
     suck(){
//       original[this.number][]=   this.RunnigGame[this.number][]    
    }

 }
var Runni = ArrayBaseDeLaNaves(4);
console.log(Runni)
function pedorra(matriz, position){
    //console.log()
  matriz[position][1] +=30
  console.log(matriz)

}

console.log('-------------')
pedorra(Runni, 2)
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
