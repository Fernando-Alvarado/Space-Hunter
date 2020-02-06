<?php

    $datos= $_POST;
    var_dump($datos);

    $conection = mysqli_connect("localhost","root","","spacehunter");
    $column='';
    $values=[];
    $action="SELECT Nickname FROM usuarios WHERE Nickname='".$datos['nick']. "'";
    echo $action;
    mysqli_query( $conection, $action);
    




?>