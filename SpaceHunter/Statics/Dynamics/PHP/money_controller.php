<?php

    $datos= $_POST;
    // var_dump($datos);
    $tipo=$datos['tipo_busq'];
    // var_dump($datos);

    $conection = mysqli_connect("localhost","root","","spacehunter");
    $column='';
    $values=[];
    // 1 es en caso de que sólo se quiera obtener la cantidad de dinero, 2 para hacer update de la cantidad.
    if($tipo=="1")
    {
        $action="SELECT Money FROM usuarios WHERE Nickname='".$datos['nickname']. "'";

    }
    else
    {
        $action="UPDATE Usuarios SET Money=".intval($datos['money'])." WHERE Nickname='".$datos['nickname']."'";

    }
    // echo $action;
    $db_info=mysqli_query( $conection, $action);
    // var_dump($nickanme);
    if($tipo=="1")
    {

    
        $money=mysqli_fetch_array($db_info,MYSQLI_ASSOC);

        echo json_encode($money);
    }
    else
        echo json_encode("Money updated");
    mysqli_close($conection);


?>