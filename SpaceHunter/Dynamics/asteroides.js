////-----------------------------------------------------------------------------------------------------------------------
////---------------------------OBJETOS----------------------------------------------------------------------------------
////-----------------------------------------------------------------------------------------------------------------------

class Asteroide{
    constructor(number,velocidad){
      this.number = number;//indice dentro de la matriz principal donde se guardara el asteroide
      this.direction = NumerosAleatorios(6); //Dice hacia donde se mueve
      this.velocidad = velocidad; //La velocidad del asteroide
     }
     JustTheCreator(){//El método para empezar el movimiento de los asteroides
       //usara la funcion switch que cree
       function MainBucle(velocidad, move, position){ // función para el ciclo de movimiento
        if(MatrizThatMakeMeCry[position][0]!=null){
           setTimeout(function(){
           var itsRunnig = ChooseWhereToMove(move, position);//Movemos el asteroide llamando a esta función

           //Movemos el render si la nave no ha sido detruida
           if(itsRunnig[0]!=null && MatrizThatMakeMeCry[position][0]!=null){
             MatrizThatMakeMeCry[position][4].position.x = itsRunnig[0];
             MatrizThatMakeMeCry[position][4].position.y = itsRunnig[1];
             MatrizThatMakeMeCry[position][4].position.z = itsRunnig[2];
            MainBucle(velocidad, move, position);
            }
       }, velocidad);
      }
    }
   MainBucle(this.velocidad, this.direction, this.number); //Llamamos a la función y empezamos el ciclo
  }
}