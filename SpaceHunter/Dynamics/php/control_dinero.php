<?php
    require_once('json_functions.php');

    $datos=$_POST;

    $tipo_busqueda=$datos['tipo'];
    // $newmoney=-4000;
    // $nickname="ALBERTO";

    $array_JSON=getArrayFromJSON();

    // $tipo_busqueda=2;

    //tipo 1: se regresará sólo el dinero que tiene el usuario.
    //tipo 2: se actualizará eel dinero del usuario en el JSON, de acuerdo al valor de entrada 
    if(intval($tipo_busqueda)==1)
    {
        // var_dump($datos);
        $index=searchNickname($array_JSON,$datos['nickname']);
        $dinero=$array_JSON[$index]['money'];
        echo $dinero;
    }
    else
    {
        if(intval($tipo_busqueda)==2)
        {
            $index=searchNickname($array_JSON,$datos['nickname']);
            // $index=searchNickname($array_JSON,$nickname);

            $array_JSON[$index]['money']=intval($datos['dinero']);
            // $array_JSON[$index]['money']=intval($newmoney)+($array_JSON[$index]['money']);


            updateJSONFile($array_JSON);

            echo "done";

        }
    }
    

    



?>