class World{
    constructor () {
      this.objetos = null;
    }
  
   CreateWorld(lx,ly,lz,background,objetos){
    limitx = lx;//Numero de casillas de la matriz
    limity = ly;
    limitz = lz;
    scene = new THREE.Scene();
    // THREE.PerspectiveCamera: primer parámetro es la apertura de la cámara en grados, el segundo es el
    // aspect ratio, una buena explicación aquí  https://es.wikipedia.org/wiki/Relaci%C3%B3n_de_aspecto
    //https://scsarquitecto.cl/importancia-relacion-aspecto/
    // ,se puede dejar ese parámetro o el más usado 16:9; el siguiente es cercanía y el cuarto es lejanía,
    //significa que nos se renderearan (shit of translation DX) objetos más cercanos al valor de cercanía
    //ni objetos más lejanos al valor de lejanía.
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    //Es necesario determinar el tamaño del rendereado, el aspect ratio es sólo una escala, aquí daremos las
    //dimensiones. El primer parámetro es el tamaño horizontal, el segundo vertical, hay un tercer parámetro,
    //el cual es true o false, en caso de ser false, se ejecutará el render con la mitad de la calidad
    //(suponiendo que las dimensiones del canvas son de 100% x 100%), si no se pasa parámetro, se considera
    //que es true y se ejecuta el render con resolución normal.
    document.body.appendChild( renderer.domElement );
  
    //Creamos el fondo
    //Página generadora de fondos:
    //http://wwwtyro.github.io/space-3d/#animationSpeed=1&fov=45&nebulae=true&pointStars=true&resolution=1024&seed=Interprepas1erlugar&stars=true&sun=true
    {
      const loader = new THREE.CubeTextureLoader();
      const texture = loader.load([
        '../Media/Fondos/'+background+'/back.png',
        '../Media/Fondos/'+background+'/front.png',
        '../Media/Fondos/'+background+'/bottom.png',
        '../Media/Fondos/'+background+'/top.png',
        '../Media/Fondos/'+background+'/right.png',
        '../Media/Fondos/'+background+'/left.png',
      ]);
      scene.background = texture;
    }
  
    //Ponemos luces
    var ambient = new THREE.PointLight( 0x444444 );
    scene.add( ambient );
    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight );
  
    //Ponemos el sonido de fondo
    var background_music= new Audio(space_music);
    if(!is_playing)
    {
      document.addEventListener('mousemove',function(){
        is_playing=true;
        background_music.loop=true;
        background_music.play();
      });
    }
  
    //Nos dirá que tipo de objetos y cuántos ¿
    this.objetos = objetos;
    
    for(let a of this.objetos){
      if(a[0][0]=='nave'){
        numnaves+=a[1];
      }
      else if(a[0][0]=='ast')
        numasteroides+=a[1];
    }
  
    MatrizThatMakeMeCry = CargarModelos(this.objetos);//tipo instanciando la matriz principal
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );  //Creamos la camara
  
   }
  
   StartWorld(){//Mostramos el mundo y creamos los objetos ecesarios para empezar el juego
    function animate(){
      requestAnimationFrame( animate );
    //el request animationFrame de toda la vida, recursivo, aprox. 60 ciclos por segundo, también deja
    //de ejecutarse la animación cuando no estás en la pestaña por lo que ahorras procesamiento
    //y batería usada.
    renderer.render( scene, camera );
    //ya que está la cámara y la escena, las ejecuta el render, boila.
    }
    CrearObjetos(this.objetos)//esta ganando mucha importancia esta funcion
    animate();
  }
       
  }


////-----------------------------------------------------------------------------------------------------------------------
////----------------------------FUNCIONES----------------------------------------------------------------------------------
////-----------------------------------------------------------------------------------------------------------------------


  function CargarModelos(objetos){//declarando el array de las naves y sus posiciones
    var current_celda = 1;
    var total = 1;
    for(let a of objetos){
      total += a[1];
    }
    var MatrizPrincipal = new Array(total);

    for (let i = 0; i < total; i++)
        MatrizPrincipal[i]=new Array(10);//array que guardará su tipo, sus posiciones en X,Y y Z, modelo 3d, objeto, vida y dimensiones
    
    //Vamos recorriendo el array de objetos creando cada uno
    for(let obj of objetos){
      //En caso de ser una nave
      if(obj[0][0]=='nave'){
        var lim = current_celda;
        for(let i = lim; i<(obj[1]+lim);i++){
          MatrizPrincipal[i][0] = 1;
          //Le asignamos posiciones aleatorias
          MatrizPrincipal[i][1] = NumerosAleatorios(limitx)-1;
          MatrizPrincipal[i][2] = NumerosAleatorios(limity)-1;
          MatrizPrincipal[i][3] = NumerosAleatorios(limitz)-1;
          
          //Creamos el modelo
          var geometry = new THREE.BoxGeometry( obj[0][7], obj[0][8], obj[0][9] );
          var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
          var model = new THREE.Mesh( geometry, material );
          geometry = null;
          material = null;
          scene.add( model );
          MatrizPrincipal[i][4] = model;
          //Colocamos el modelo en las posiciones correctas
          MatrizPrincipal[i][4].position.x = MatrizPrincipal[i][1];
          MatrizPrincipal[i][4].position.x = MatrizPrincipal[i][2];
          MatrizPrincipal[i][4].position.x = MatrizPrincipal[i][3];
          //Le damos su vida correspondiente
          MatrizPrincipal[i][6] = obj[0][6];

          //Asignamos sus dimensiones
          MatrizPrincipal[i][7] = obj[0][7];
          MatrizPrincipal[i][8] = obj[0][8];
          MatrizPrincipal[i][9] = obj[0][9];

          current_celda++;
        }

      }else if(obj[0][0]=='ast'){ //En caso de ser un asteroide
        var lim = current_celda;
        for(let i = lim; i<(obj[1]+lim);i++){
          //Le damos una posición aleatoria
          MatrizPrincipal[i][0] = 3;
          MatrizPrincipal[i][1] = NumerosAleatorios(limitx)-1; //coordenadas de asteroides
          MatrizPrincipal[i][2] = NumerosAleatorios(limity)-1;
          MatrizPrincipal[i][3] = NumerosAleatorios(limitz)-1;
          //Creamos el modelo
          loadModelo(i,obj[0][2]);
          //Asignamos sus dimensiones
          MatrizPrincipal[i][7] = obj[0][3];
          MatrizPrincipal[i][8] = obj[0][4];
          MatrizPrincipal[i][9] = obj[0][5];
          current_celda++;
        }  
      }

    }

     //Creamos al principal
     MatrizPrincipal[0][0] = 2;
     MatrizPrincipal[0][1] = NumerosAleatorios(limitx)-1;
     MatrizPrincipal[0][2] = NumerosAleatorios(limity)-1;
     MatrizPrincipal[0][3] = NumerosAleatorios(limitz)-1;
     MatrizPrincipal[0][6]= 15;/////------------------------------------------------Esto da la vida a todas la nave pricipla
     MatrizPrincipal[0][7] = 1;
     MatrizPrincipal[0][8] = 1;
     MatrizPrincipal[0][9] = 1
    
     //Función para cargar modelos de blender
     function loadModelo(i,arch){
      var model;
      var loader = new THREE.GLTFLoader();
      loader.load(
          "../Modelos/"+arch,

          function ( gltf ) {
              model = gltf.scene;

              //lo añadimos a la escena
              MatrizPrincipal[i][4] = model;
              scene.add(MatrizPrincipal[i][4]);
              MatrizPrincipal[i][4].position.x = MatrizPrincipal[i][1];
              MatrizPrincipal[i][4].position.y = MatrizPrincipal[i][2];
              MatrizPrincipal[i][4].position.z = MatrizPrincipal[i][3];

          },
          function ( xhr ) {
              console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
          },
          function ( error ) {
              //console.log( 'An error happened' );
          }
      );
    }
  return MatrizPrincipal;
}
//dibujar la vida de la nave principal


 //poner posiones de las naves y ver donde vas a empezar funcion importante xd
function CrearObjetos(objetos){//saber donde estaran las naves al inicio
    //tambien es medio la base de todo el juego espero que esto cambie
   // var Matriz = ArrayBaseDeLaNaves(numNaves);//tipo instanciando la matriz principal

    //-----------------Delcarando todas los objetos que hay--------------------
    var current_celda = 1;
    var total = 1;
    for(let a of objetos){
      total += a[1];
    }

    //Creamos y guardamos los objeetos naves y asteroides en la matriz principal
    for(let obj of objetos){
      //Creamos los objetos nave
      if(obj[0][0]=='nave'){
        var lim = current_celda;
        for(let i = lim; i<(obj[1]+lim);i++){
          //Orden de Parametros: matrizDondeSeTrabaja, number,velocidad,rango,velChase,velDisparo,rangoDisp
          MatrizThatMakeMeCry[i][5] = new NavesEnemigas(MatrizThatMakeMeCry, i,obj[0][1],obj[0][2],obj[0][3],obj[0][4],obj[0][5]);
          MatrizThatMakeMeCry[i][5].JustTheCreator();//Js es una mamada jajaja

          current_celda++;
        }
      }else if(obj[0][0]=='ast'){//Creamos los ovjetos asteroide
        var lim = current_celda;
        for(let i = lim; i<(obj[1]+lim);i++){
          MatrizThatMakeMeCry[i][5] = new Asteroide(MatrizThatMakeMeCry, i,obj[0][1]);
          MatrizThatMakeMeCry[i][5].JustTheCreator();//Js es una mamada jajaja

          current_celda++;
        }
      }
    }

    //instanciando el objeto principal ----------------------
    const nave = new PersonajePrincipal(MatrizThatMakeMeCry);
    nave.JustTheCreator();
    nave.vida();
    nave.Escudo()
    var fer = new CabinaDeControl(document.body);
    fer.Torreta();
}