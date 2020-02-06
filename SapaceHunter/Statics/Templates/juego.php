<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../CSS/main.css">
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap" rel="stylesheet">
    <title>Document</title>

   <style>
   
</style>
</head>
<body>
  <div id='arriba'>
    <div id="escudos"></div>
    <img id="imagenPrincipal" src="../Media/1155555ecuperado.png" alt="" width="100%" height="100%">
    <canvas height="22" width="202" id="me"></canvas>
    <canvas height="372" width="27" id="Barraescudos1" class="one"></canvas>
    <canvas height="372" width="27" id="Barraescudos2" class="two"></canvas>
  </div>
  <div style='display:none'>
  <div class='dif'>
  <?php
  $dif=$_POST['dif'];
  echo $dif;
  ?>
  </div>
  <div class='modo'>
  <?php
  $modo=$_POST['mod'];
  echo  $modo;
  ?>
  </div>
  </div>

  <div id="abajo">
    <div id="killsCounter">
    <p id="numberKills">Kills 0</p>
    </div>
    <script src="../../Dynamics/Librerías/three.min.js"></script>
    <script src="../../Dynamics/Librerías/jquery-3.4.1.min.js"></script>
    <script src="../../Dynamics/Librerías/three.js-master/examples/js/loaders/GLTFLoader.js"></script>
    <!-- <script src="Librerías/three.min.js"></script> -->
    <script src="../../Dynamics/world.js"></script>
    <script src="../../Dynamics/principal.js"></script>
    <script src="../../Dynamics/naves_enemigas.js"></script>
    <script src="../../Dynamics/asteroides.js"></script>
     <script src="../../Dynamics/juego.js"></script>
 
  </div>
</body>
</html>
