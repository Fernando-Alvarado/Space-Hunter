<?php

    $datos= $_POST;
    // var_dump($datos);

    $conection = mysqli_connect("localhost","root","","spacehunter");
    $column='';
    $values=[];
    $action="SELECT Nickname FROM usuarios WHERE Nickname='".$datos['nick']. "' && Password='".$datos['pass']."'";
    // echo $action;
    $db_info=mysqli_query( $conection, $action);
    $nickanme=mysqli_fetch_array($db_info,MYSQLI_ASSOC);
    // var_dump($nickanme);
    $was_found="no";
    if($nickanme!=NULL)
        $was_found="yes";
    echo json_encode($was_found);




?>