////-----------------------------------------------------------------------------------------------------------------------
////---------------------------OBJETOS----------------------------------------------------------------------------------
////-----------------------------------------------------------------------------------------------------------------------

class Asteroide{
    constructor(matrizDondeSeTrabaja, number,velocidad){//el
      this.workingMat = matrizDondeSeTrabaja;
      this.number = number;//indice dentro de la matriz principal donde se guardara el asteroide
      this.direction = NumerosAleatorios(6); //Dice hacia donde se mueve
      this.velocidad = velocidad;
     }
     JustTheCreator(){//este metodo ara que las naves se muevan y  si tiempo que disparen
       //usara la funcion switch que cree
       function MainBucle(velocidad, matriz, x, y, z, move, position){ //Aqui se tendra que correr el bucle de las naves
        if(matriz[position][0]!=null){
           setTimeout(function(){
           var itsRunnig = ChooseWhereToMove(move, position);//quite todos los parametros inecesarios

           //Movemos el render
           if(itsRunnig[0]!=null){
             MatrizThatMakeMeCry[position][4].position.x = itsRunnig[0];
             MatrizThatMakeMeCry[position][4].position.y = itsRunnig[1];
             MatrizThatMakeMeCry[position][4].position.z = itsRunnig[2];
            }
            MainBucle(velocidad, matriz, itsRunnig[0], itsRunnig[1], itsRunnig[2], move,  position);
       }, velocidad);
      }
    }
   MainBucle(this.velocidad, this.workingMat, this.workingMat[this.number][1], this.workingMat[this.number][2], this.workingMat[this.number][3], this.direction, this.number);
  }
}