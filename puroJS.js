///
///
///COSAS PARA PODER MOVER LA NAVE JAJAJAJAJ
///
///


var limit = 20;
var inicioX = 1;
var inicioY = 19;
var MatrizPrincipal = new Array(limit);
for (let i = 0; i <= 19; i++) {///----------------------------------------------------
    MatrizPrincipal[i]=new Array(limit);
}//-----------------------------------------------------------------------------------
//rellenar de ceros las cosas los 1 seran la nave buena
for (i=0; i<limit; i++){
    for (e=0; e<limit; e++){
        MatrizPrincipal[i][e] = 0;
    }
}//------------------------------Reyenar el arreglo de ceros





MatrizPrincipal[inicioY][inicioX] = 1; ///imprimirla ahi para ver la nave
console.log(MatrizPrincipal);//--Arrancando el arreglo


document.addEventListener('keydown', function(event) {//PARA RECONOCER LA tECLAS
    MatrizPrincipal[inicioY][inicioX] = 0;
//y que la nave pueda moverse   ----  inicioX     inicioY  
     console.log(event);
    switch(event.code){
        case "KeyW": if (inicioY == 0) {
                           inicioY = limit;
                      }else{
                            inicioY--;
                           }
           break;
        case "KeyS": if (inicioY == limit) {
                            inicioY = 0;
                       }else{
                            inicioY++;
                            }
            break;
        case "KeyA": if (inicioX == 0) {
                            inicioX = limit;
                        }else{
                            inicioX--;   
                        }
            break;
        case "KeyD": if (inicioX == limit) {
                             inicioX = limit;
                        } else {
                            inicioX++;    
                        }              
            break;
    } 
    console.log('----------------------------');
    MatrizPrincipal[inicioY][inicioX] = 1;
    console.log(MatrizPrincipal);
});
    //KeyS
    //Space