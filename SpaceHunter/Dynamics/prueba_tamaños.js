//Probamos que las naves tengan su tamaño definido

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
  
    var background = 'delta'
    {
      const loader = new THREE.CubeTextureLoader();
      const texture = loader.load([
        '../Media/Fondos_world/'+background+'/back.png',
        '../Media/Fondos_world/'+background+'/front.png',
        '../Media/Fondos_world/'+background+'/bottom.png',
        '../Media/Fondos_world/'+background+'/top.png',
        '../Media/Fondos_world/'+background+'/right.png',
        '../Media/Fondos_world/'+background+'/left.png',
      ]);
      scene.background = texture;
    }
    //Ponemos luces
    var ambient = new THREE.PointLight( 0x444444 );
    scene.add( ambient );
    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight );
    var directionalLight1 = new THREE.DirectionalLight( 0xffeedd );
    directionalLight1.position.set( -1, -1, -1 ).normalize();
    scene.add( directionalLight1 );

    camera.position.z = 5;

    var WhereOnX = null; //posicon del mouse en X
    var WhereOnY = null; //posicon del mouse en Y
    var MedidaPantalla = document.offsetWidth; //medidas de la pantalla
    var MedidaEnY = document.offsetHeight; //el alto de la pantalla
    var OriginalPosition = 5; //EMPIEZA AQUI la vista de la camar
    document.onmousemove = function(e){
      WhereOnX = e.pageX;//dice el valor de los eventos en tiempo real
       WhereOnY = e.pageY;//valor de y en real time
    }
    setInterval(CheckWhereTheHellIsIn, 1);
    function CheckWhereTheHellIsIn(){
     //esto es para que pueda rotar la pantalla del jugador
       if(WhereOnX< (MedidaPantalla)/4){//girar a la derecha
          camera.rotation.y += .005;
        }
       else if(WhereOnX> ((MedidaPantalla)/4)*3){//girara a la girar a la izquierda
          camera.rotation.y -= .005;
        }
     }
    


    document.addEventListener('keydown',function(e){
        if(e.code=='KeyA')
            camera.position.z-=1;
        if(e.code=='KeyD')
            camera.position.z+=1;
        if(e.code=='KeyW')
            camera.position.x-=1;
        if(e.code=='KeyS')
            camera.position.x+=1;
        if(e.code=='KeyR')
           camera.rotation.y+=.1;
        if(e.code=='KeyF')
           camera.rotation.y-=.1;
        if(e.code=='KeyT')
           camera.position.y+=.1;
        if(e.code=='KeyG')
           camera.position.y-=.1;
    });

    var model_p;
    var loader = new THREE.GLTFLoader();
      loader.load(
          "../Modelos/"+'asteroide_1_Pi.glb',//Aquí va el nombre del modelo

          function ( gltf ) {
              model_p = gltf.scene;

              //lo añadimos a la escena
              scene.add( model_p);
              model_p.position.x=1;
              model_p.position.y=1;
              model_p.position.z=1;

          },
          function ( xhr ) {
              console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
          },
          function ( error ) {
              //console.log( 'An error happened' );
          }
      );

      function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
    animate();