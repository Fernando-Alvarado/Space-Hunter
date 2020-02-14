<?php

    $datos_form=$_POST;
    var_dump( $datos_form);

    $conection = mysqli_connect("localhost","root","","spacehunter");
    $column='';
    $values=[];
    $action="INSERT INTO usuarios  VALUES ('".$datos_form['nickname']."','".$datos_form['password']."') ";
    echo $action;
    mysqli_query( $conection, $action);


?>