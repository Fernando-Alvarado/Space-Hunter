<?php

    $datos_form=$_POST;
    var_dump( $datos_form);

    $conection = mysqli_connect("localhost","root","","spacehunter");
    $column='';
    $values=[];
    $action="INSERT INTO usuarios(Nickname,Password,Money)  VALUES ('".$datos_form['nick']."','".$datos_form['pass']."',
    '".intval($datos_form['money'])."') ";
    echo $action;
    mysqli_query( $conection, $action);
    mysqli_close($conection);

    // INSERT INTO usuarios(Nickname,Password,Money) VALUES (
    //     -> "Jebucristo","Elmerhomero2!!",3000);


?>