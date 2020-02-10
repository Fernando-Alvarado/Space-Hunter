///Aislando el objeto de las naves pa poder trabjarlo

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
var ArayNaves = ArrayBaseDeLaNaves(10);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

NavesFalso(ArayNaves);
///cambiar el indice de las naves

//poner diferentes colores a las balas

function saberDistancia(x,x1,y,y1,){///esto estara en el constructor de las naves
   return  Math.sqrt( )
}