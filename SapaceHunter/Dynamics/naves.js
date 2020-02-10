class Naves{
    constructor(matrizDondeSeTrabaja, number,velocidad,rango,velChase,velDisparo,rangoDisp){//el
        this.workingMat = matrizDondeSeTrabaja;
        this.number = number;//indice dentro de la matriz principal donde se guardara la nave
        this.numero =  0;//luego esto tengra que cambiar a 5 para que puedan
        this.dist_chase = 0; //Guarda la distancia de la nave al jugador
        this.dist_apuntando = 0; //Guarda la distancia a la nave que está apuntando
        this.apuntando = 0;
        this.pattern_move = 0; //Determina el siguiente movimiento
        this.enemigo = 0;
        this.color = null;  //Color de las balas
        this.current_pattern = NumerosAleatorios(patterns.length)-1; //Dice que patrón está haciendo actualmente
        //Variables de clase
        this.velocidad = velocidad; //Velocidad de reacción
        this.rango = rango; //determina el rango de visión;
        this.velChase = velChase  //Velocidad al perseguir al jugador
        this.velDisparo = velDisparo; //Velocidad de disparo
        this.rangoDisp = rangoDisp; //Distancia a la que empieza a disparar
    }
    JustTheCreator(){//este metodo ara que las naves se muevan y  si tiempo que disparen
        //usara la funcion switch que cree
        function MainBucle(obj, matriz, x, y , z,move, position,current_pattern,pattern_move,patterns){ //Aqui se tendra que correr el bucle de las naves
            if(matriz[position][0]!=null  && matriz[position][6]!=0){
              setTimeout(function(){
                this.dist_chase=DistFromPlayer(x,y,z,MatrizThatMakeMeCry[position][10]);
                this.dist_apuntando=DistFromPlayer(x,y,z,Apuntando[position]);
                //El parametro primer parametro sera cambiado por quien disparo xd, pero siento que se tendra que pasar
                //un evento para disparar con el mouse
                if(this.dist_chase <=obj.rango && matriz[position][0]!=null) {
                  
                  if(this.dist_apuntando <=obj.rangoDisp){//Aqui dispara la nave enemiga---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    console.log('pium');

                  //Obtenemos el límite más grande para el rango de vida de las balas.
                  var limit = limitx;
                  if(limitx > limity && limitx>limitz)
                    var limit = limitx;
                  else if(limity>limitx && limity>limitz)
                    var limit = limity;
                  else if(limitz>limitx && limitz>limity)
                    var limit = limitz;

                  ///----------------------------------Parametros----------------------------------------------
                  //whereX, whereY, whereZ, ObjX, ObjY, ObjZ, Killed, limiteCampoJuego
                  //kileed se refiere al indicador de la nave que se quiere matar
                  //2 es la nave principal
                  //MatrizThatMakeMeCry
                  //necesito saber quien disparo
                  var apuntando = Apuntando[position];
                  var disparoNaveEnemiga = new balas(MatrizThatMakeMeCry[position][1], MatrizThatMakeMeCry[position][2], MatrizThatMakeMeCry[position][3], MatrizThatMakeMeCry[apuntando][1], MatrizThatMakeMeCry[apuntando][2], MatrizThatMakeMeCry[apuntando][3] ,obj.enemigo,limit)//constructro del objeto balas
                  disparoNaveEnemiga.MidnightBlame(obj.velDisparo,obj.color,apuntando);
                  move = 0;
                  }else if(this.dist_chase>=obj.rangoDisp){
                    move = ChasePlayer(x,y,z,position);
                    obj.velocidad = obj.velChase;
                  }
                }
                else{ //Si el personaje principal no está en rango, sigue con su patrón de movimiento o elige uno nuevo
                  if(pattern_move == patterns[current_pattern].length){
                    current_pattern = NumerosAleatorios(patterns.length)-1;
                    pattern_move = 1;
                  }
                  move=patterns[current_pattern][pattern_move];
                  pattern_move++;
                  obj.velocidad = patterns[current_pattern][0];
                }

                var itsRunnig = ChooseWhereToMove(move,  position);
                //NMovemos el render
                if(itsRunnig[0]!=null && MatrizThatMakeMeCry[position][0]!=null){
                  MatrizThatMakeMeCry[position][4].position.x = itsRunnig[0];
                  MatrizThatMakeMeCry[position][4].position.y = itsRunnig[1];
                  MatrizThatMakeMeCry[position][4].position.z = itsRunnig[2];
                }
                //lo añadimos a la escena
                MainBucle(obj, matriz, itsRunnig[0], itsRunnig[1], itsRunnig[2],move,  position,current_pattern,pattern_move,patterns);
              }, obj.velocidad);
            }
        }

        function DistFromPlayer(x,y,z,whoToFollow){ //Nos da la distancia al jugador
          //Obtenemos los datos de a quien seguimos
          var dist = 0;
          if(whoToFollow!= null){
            var otherx = MatrizThatMakeMeCry[whoToFollow][1];
            var othery = MatrizThatMakeMeCry[whoToFollow][2];
            var otherz = MatrizThatMakeMeCry[whoToFollow][3];
            //Obtenemos la distancia
            var dist = Math.pow((otherx-x),2) + Math.pow((othery-y),2) + Math.pow((otherz-z),2);
            dist = Math.sqrt(dist);
          }
          return dist;
        }
        function ChasePlayer(x,y,z,position){ //Nos dice como perseguir al jugador, elige la distancia que sea menor entre    var dy = matrizDondeSeTrabaja[0][1]-y;
          //Obtenemos los datos de quien medimos
          var whoToFollow = MatrizThatMakeMeCry[position][10];
          var retur = 0;
          if(whoToFollow!= null){
            var otherx = MatrizThatMakeMeCry[whoToFollow][1];
            var othery = MatrizThatMakeMeCry[whoToFollow][2];
            var otherz = MatrizThatMakeMeCry[whoToFollow][3];

            //Obtenemos la distancia a quien seguimos
            var dx = otherx-x;
            var dy = othery-y;
            var dz = otherz-z;

            //Decidimos como seguirlo dependiendo de la distancia mas corta
            if( ( (Math.abs(dx) <= Math.abs(dy))  && (Math.abs(dx) <= Math.abs(dz)) ) || dy ==0){
              if(dx < 0)
                retur=3;
              if(dx > 0)
                retur=4;
            }
            if( ( (Math.abs(dy) < Math.abs(dx))  && (Math.abs(dy) < Math.abs(dz)) ) || dx ==0){
              if(dy < 0)
                retur=1;
              if(dy > 0)
                retur=2;
            }
            if( ( (Math.abs(dz) < Math.abs(dy))  && (Math.abs(dz) < Math.abs(dx)) ) || dz == 0){
              if(dz < 0)
                retur=5;
              if(dz > 0)
                retur=6;
            }
          }
          return retur;
        }

        function BucleParaSaberAQuienDisparar(position){
          var ini = null;
          var fin = null;
          if(MatrizThatMakeMeCry[position][0]==1){ //Si es enemiga
            ini = 0;
            fin = numamigas;
          }
          else if(MatrizThatMakeMeCry[position][0]==2){ //Si es amiga
            ini = numamigas+1;
            fin = numnaves;
          }
          setTimeout(()=>{
            Apuntando[position] = Math.floor((Math.random()*fin))+ini;
            BucleParaSaberAQuienDisparar(position);
            
        },2000);
       }

        BucleParaSaberAQuienDisparar(this.number);
        if(MatrizThatMakeMeCry[this.number][0]==1){//Si es enemiga
          this.enemigo = 2;
          this.color = 0xd11010;
        }
        else if(MatrizThatMakeMeCry[this.number][0]==2){ //Si es amiga
          this.enemigo = 1;
          this.color = 0x0450b2;
        }
        MainBucle(this, this.workingMat, this.workingMat[this.number][1], this.workingMat[this.number][2], this.workingMat[this.number][3], this.numero, this.number,this.current_pattern, this.pattern_move,patterns);
    }

}

////-----------------------------JIJIJIIJIJ aQUI IRA EL OBJETO DE LAS BALAS
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
         var sinRedondear1 = new Array(0);
         var sinRedondear2 = new Array(0);
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
               //aqui esta el arreglo de l s poscicones sin redondear
                 sinRedondear1.push((VectorDirector[numSalida1]*((arrePun[i]-pun1)/VectorDirector[numPrincipal]))+leter1);
                 arreSalida1.push(Math.round((VectorDirector[numSalida1]*((arrePun[i]-pun1)/VectorDirector[numPrincipal]))+leter1));
                 //arreglo 2 de posiciones sin redondear y redondeadas
                  sinRedondear2.push((VectorDirector[numSalida2]*((arrePun[i]-pun1)/VectorDirector[numPrincipal]))+leter2);
                 arreSalida2.push(Math.round((VectorDirector[numSalida2]*((arrePun[i]-pun1)/VectorDirector[numPrincipal]))+leter2));
             }else{
                 arreSalida1.push(leter1)
                 arreSalida2.push(leter2)
             }
             //para ver como esta funcioanndo la mamada
         }//ord te dice que teltra le corresponde el arreglo que saco para las balas
        var MyRegret = [ord1, arrePun, ord2,arreSalida1, ord3,arreSalida2, sinRedondear1,sinRedondear2  ] ;  //we are going to return 3 arrayS
         return MyRegret;
         }
                     //numeros de las letras x =0, y=1, z=2 ---El ultimo es del que se quiere sacar
   
         if(x != y){
             var takeMe = Tabulaciones(x, x2, ArrayX, limite,ArrayY, ArrayZ,1,2,0,y,z, "x","y","z" )
             var letMeFly = [takeMe[1], takeMe[3],takeMe[5], "y",takeMe[6], "z",takeMe[7]]//poniendo arden
         }else if(x == y){
             var takeMe = Tabulaciones(z, z2, ArrayZ, limite,ArrayX, ArrayY,0,1,2,x,y, "z","x","y" )
             var letMeFly = [takeMe[3], takeMe[5],takeMe[1],"z",takeMe[6], "y",takeMe[7]]//ordenando lo que sale de los arreglos
         }
         return letMeFly;
     }
   //----------------------------------------------------
   this.MatrizBalas3d = graficadoraBullet(whereX, whereY, whereZ, ObjX, ObjY, ObjZ,limiteCampoJuego);
   this.WhoToKill = Killed;//esto sera para que no exista el fuego amigo
   function ordenaTabs(array){//funcion que te acomoda el arreglo pa que siempre tenga los valores de x, y, z
     //siempre considero que aqui se metrera un arreglo de 7 valores
   
     let JustMeAnotherTime = new Array(new Array(0), new Array(0), new Array(0));
       if(array[3]== "y"){
         JustMeAnotherTime[0] = array[0];
         JustMeAnotherTime[1] = array[4];
         JustMeAnotherTime[2] = array[6];
         return JustMeAnotherTime;
       }
       else {
         JustMeAnotherTime[0] = array[0];
         JustMeAnotherTime[1] = array[4];
         JustMeAnotherTime[2] = array[6];
         return JustMeAnotherTime;
       }
   }
   this.MatrizUnround = ordenaTabs(this.MatrizBalas3d);
   }
   MidnightBlame(velDisparo,colorb,target){ //NOTE: la varaible de las naves es global tinee que estar declarada arriba
   var Coun = 0;
   
   var sonido_ene= new Audio(laser_ene);     //Variable tipo audio, con la referencia del laser del enemigo
   var sonido_daño_principal= new Audio(ship_damage);
   
   //Creamos el modelo para las balas y lo agregamos a la escena
   var geometry = new THREE.SphereGeometry( .05, .05, .05 );
   var material = new THREE.MeshBasicMaterial( {color: colorb} );
   var sphere = new THREE.Mesh( geometry, material );
   geometry = null;
   material = null;
   scene.add( sphere );
   
   sonido_ene.volume=.2;
   sonido_ene.play();            //Suene después de que la bala se crea en la escena.
   
   function GodsLoop(MatBalas, Coun, WhoToKill, matUnround,target){
   
   
     setTimeout(function(){
       
         if(Coun < MatBalas[0].length){
             sphere.position.x=matUnround[0][Coun];
             sphere.position.y=matUnround[1][Coun];
             sphere.position.z=matUnround[2][Coun];
   
             var Everything = MatrizThatMakeMeCry; //Aqui tengo que poner la matriz de IWannaCry

             if( WhoToKill== MatrizThatMakeMeCry[target][0]){//cuendo le disparen a la nave principal
                 //Everything es la matriz donde estan todas la anves


                /////si es la nave enemiga a la que se le disparo
                  if(MatBalas[0][Coun]==Everything[target][1]&&MatBalas[1][Coun]==Everything[target][2]&&MatBalas[2][Coun]==Everything[target][3]){
                   
                    scene.remove(sphere);
                    sphere = null;
                    MatrizThatMakeMeCry[target][6]--;
                    if(MatrizThatMakeMeCry[target][6]<=0){
                      delete MatrizThatMakeMeCry[target][5];
                      scene.remove(MatrizThatMakeMeCry[target][4]);
                      delete MatrizThatMakeMeCry[target][4];
                      MatrizThatMakeMeCry[target]= new Array(null,null,null,null,null,null,0);
                    }
                    //Cuando impactan la principal
                    sonido_daño_principal.play(); //Sonido cuando te da una bala enemiga.
                    LifeBar(MatrizThatMakeMeCry[0][6]);
                    if( MatrizThatMakeMeCry[0][6] <= 0)             
                      location.href="../Templates/EndMatch.html";////No se si esta ruta funcione
                  }else{
                      Coun++;
                      GodsLoop(MatBalas, Coun, WhoToKill,matUnround,target);
                  }
             }
         }
         else {
           scene.remove(sphere);
           sphere = null;
         }
     },velDisparo);//velocidad de las balas se puede cambiar
   }
   GodsLoop(this.MatrizBalas3d ,Coun,this.WhoToKill,this.MatrizUnround,target);
   
   
   }//llave del fin del metodo
   }