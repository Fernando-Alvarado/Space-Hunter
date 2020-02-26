<?php
    

    $datos= $_POST;
    // var_dump($datos);

    $conection = mysqli_connect("localhost","root","","spacehunter");
    $column='';
    $values=[];
    // 1 es en caso de que sólo se busque si está ese nickname en la base, 2 para comprobar también la contraseña.
    if($datos['tipo_busq']=="2")
    {
        $action="SELECT Nickname FROM usuarios WHERE Nickname='".$datos['nick']. "' && Password='".$datos['pass']."'";

    }
    else
    {
        $action="SELECT Nickname FROM usuarios WHERE Nickname='".$datos['nick']. "'";

    }
    $action="SELECT Nickname FROM usuarios WHERE Nickname='".$datos['nick']. "' && Password='".$datos['pass']."'";
    // echo $action;
    $db_info=mysqli_query( $conection, $action);
    $nickanme=mysqli_fetch_array($db_info,MYSQLI_ASSOC);
    // var_dump($nickanme);
    $was_found="no";
    if($nickanme!=NULL)
        $was_found="yes";
    mysqli_close($conection);
    echo json_encode($was_found);
    //Devuleve yes o no, si encontró al usuario;





?>