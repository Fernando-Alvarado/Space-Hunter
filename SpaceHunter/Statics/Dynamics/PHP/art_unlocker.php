<?php

         $datos=$_POST;   

        $conection = mysqli_connect("localhost","root","","spacehunter");
        $column='Item'.$_POST['item'];
        $values=[];
        
        $action="UPDATE Usuarios SET $column=1 WHERE Nickname='".$datos['nickname']."'";

        
        echo $action;
        $db_info=mysqli_query( $conection, $action);
        // var_dump($nickanme);
        

        
           
        
        echo json_encode("Desbloqueado");
        mysqli_close($conection);
        //  Post['item'],

?>