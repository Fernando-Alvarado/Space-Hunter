<?php
    require_once('json_functions.php');

    $mensaje="false";
    $datos_formu=$_POST;        //POST del ajax

    $array_JSON= getArrayFromJSON();   //convertimos usarios.json en array()

    if(searchNickname($array_JSON,$datos_formu['nick'])==-1)  //si no hay un usuario con ese nickname...
    {
        $array_user['nickname']=$datos_formu['nick'];
        $array_user['password']=$datos_formu['pass'];   //completamos la estructura array, del archivo 
        //json_functions.php (línea 4) con el nickname y password enviados.
        array_push($array_JSON,$array_user);//completamos el archivo usuarios.json hecho array con lo recién llegado
        updateJSONFile($array_JSON);
        $mensaje= "true";

    }
    
    echo $mensaje;  



?>