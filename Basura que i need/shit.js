function ChooseWhereToMove(y, x, event, value, argu1, argu2, argu3, argu4){//switch para elegir 
    //donde se va a mover cada nave, servira para la principal y para las naves enemigas
    matrizDondeSeTrabaja[y][x] = 0;
LimpiarLaMatriz(y, x);
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
matrizDondeSeTrabaja[y][x] = value;
ponerLasNavesEnLaMatriz(matrizDondeSeTrabaja);
}

/*OLD SHIT THAT NOBODY WILL USE FOR A LONG TIME
  matrizDondeSeTrabaja[inicioY][inicioX] = 0;
            LimpiarLaMatriz(inicioY, inicioX);
        //y que la nave pueda moverse   ----  inicioX     inicioY  
        switch(event.code){
                case "KeyW": if (inicioY == 0) {
                                inicioY = limit-1;
                            }else{
                                inicioY--;
                            }
                    break;
                case "KeyS": if (inicioY == limit-1) {
                                inicioY = 0;
                            }else{
                                 inicioY++;
                            }
                    break;
                case "KeyA": if (inicioX == 0) {
                                 inicioX = limit-1;
                            }else{
                                 inicioX--;   
                            }
                    break;
                case "KeyD": if (inicioX == limit-1) {
                                inicioX = 0;
                            } else {
                                inicioX++;    
                            }              
                    break;
        } 
         matrizDondeSeTrabaja[inicioY][inicioX] = 2;
         ponerLasNavesEnLaMatriz(matrizDondeSeTrabaja);
        console.log(event.code);
*/