<?php

    require_once('json_functions.php');

    $datos_formu=$_POST;

    $array_JSON=getArrayFromJSON();

    $index=searchNickname($array_JSON,$datos_formu['nick']);
    if($index=!-1)
    {
        if($array_JSON[$index]['password']==$datos_formu['pass'])
            echo true;
        else
            echo false;
    }
    else
        echo false;
    
    
    


?>