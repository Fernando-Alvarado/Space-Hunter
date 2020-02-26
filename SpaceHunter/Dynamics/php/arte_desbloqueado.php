<?php

    require_once('json_functions.php');

    $datos=$_POST;

    $array_JSON=getArrayFromJSON();

    $index=searchNickname($array_JSON,$datos['nickname']);

    echo json_encode($array_JSON[$index]['art']);

    

    




?>