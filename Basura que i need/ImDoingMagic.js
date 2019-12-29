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
var Runni = ArrayBaseDeLaNaves(5);
/*
Crear una cookie
document.cookie = “name=valor”;
document.cookie = “name=valor; expires=fecha en UTC”;
Obtener cookies
document.cookie; //obtiene una cadena con todas las cookies
*/