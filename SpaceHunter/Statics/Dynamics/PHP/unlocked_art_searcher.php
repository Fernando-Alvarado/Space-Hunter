<?php
        $datos=$_POST;

        $conection = mysqli_connect("localhost","root","","spacehunter");
        // $column='Item'.$_POST['item'];
        $values=[];
        
        $action="SELECT Item1,Item2,Item3,Item4,Item5,Item6,Item7,Item8,Item9,Item10,Item11,Item12,Item13,
        Item14,Item15 FROM  Usuarios WHERE Nickname='".$datos['nickname']."'";

        
        // echo $action;
        $db_info=mysqli_query( $conection, $action);
        // var_dump($nickanme);
        $unlocked=mysqli_fetch_array($db_info,MYSQLI_NUM);

        

        
           
        
        echo json_encode($unlocked);
        mysqli_close($conection);
        //  Post['item'],

?>