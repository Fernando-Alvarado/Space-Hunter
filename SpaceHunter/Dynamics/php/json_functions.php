<?php

    //array base para registrar usuarios;
    $array_user=array(
        "nickname" =>"" ,
        "password" =>"",
        "money"=>1000,
        "art"=> [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    );

    function getArrayFromJSON() //Obtiene un Array del archivo usuarios.json
    {
        $json_string= file_get_contents("../js/usuarios.json");
        $datos=json_decode($json_string,true);       //El JSON hecho array.
        return $datos; // return Array()
    }

    function updateJSONFile(array $array_JSON)
    {
        $newJsonString = json_encode($array_JSON);
        file_put_contents('../js/usuarios.json', $newJsonString);
    }

    function searchNickname($array_JSON,string $nickname)
    {
        $counter=-1;
        for($x=0;$x<count($array_JSON);$x++)
        {
            if($array_JSON[$x]['nickname']==$nickname)
                $counter=$x;
        }

        return $counter; //return int
    }







?>