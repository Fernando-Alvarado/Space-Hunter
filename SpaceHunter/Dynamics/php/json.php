<?php
    



    $jsonString = file_get_contents('../js/usuarios.json');
    $data = json_decode($jsonString, true);
    var_dump($data);

    $array= array(
        "nickname" => "ElDieGazo",
        "password" => "ImDaMotherDuckerKing34!",
        "money"=>1000,
        "art"=> [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    );

    $counter;
    array_push($data,$array);
    var_dump($data);
    echo "Name".$data[2]['nickname'];
    for($x=0;$x<count($data);$x++)
    {
        if($data[$x]['nickname']=="ElDieGazo")
        {
            $counter=$x;

        }
    }

    echo $counter;

    $newJsonString = json_encode($data);
    file_put_contents('../js/usuarios.json', $newJsonString);


    //Cambiar el registro de usuarios y el login, la HunterShop.





?>