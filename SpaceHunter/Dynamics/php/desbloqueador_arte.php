<?php

    require_once('json_functions.php');

    $datos=$_POST;

    $array_JSON=getArrayFromJSON();

    $index=searchNickname($array_JSON,$datos['nickname']);

    $array_JSON[$index]['art'][$datos['item']]=1;

    updateJSONFile($array_JSON);
    echo "Fucking ya";

    


?>