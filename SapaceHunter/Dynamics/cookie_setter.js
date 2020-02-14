    var all_cookies=document.cookie.split(";");
    all_cookies.forEach(cookie=>{
        let cont=0;
        let parts=cookie.split("=");

    })
    function seekCookieValue(cookie_name) //Ingresas el nombre de la cookie de la cual quieres obtener su valor,
    //colocar un espacio antes del nombre de la cookie (" nombre"), sólo si no es l aprimer cookie del arreglo;
    {
        var cookie_value="";
        all_cookies.forEach(cookie=>{
            let parts=cookie.split("=");
            if(parts[0]==cookie_name)
            {
                cookie_value=parts[1];
            }
        })
        return cookie_value; //Regresa una cadena.
    }

    function setCookieValue(cookie_name,new_value) //colocar un espacio antes del nombre de la cookie " nombre" si no es
    //la primer cookie del arreglo
    {
        all_cookies.forEach(cookie=>{
            let parts=cookie.split("=");
            if(parts[0]==cookie_name)
            {
                console.log("Found it")
                document.cookie=cookie_name+"="+new_value+"; path=/"
            }
        })
    }

    function checkDaMoney()
    //Revisa el dinero del jugador en la base de datos, lo actualiza en la cookie.
    {
        var player_name=seekCookieValue("user_name");
        var player_money;

        $.ajax({
            url: '../Dynamics/PHP/money_controller.php' , 
            method: 'POST',
            data: "nickname="+player_name+"&tipo_busq="+1,
            statusCode: {
            404: function(){
                alert('No encontrado');
            },
            },
        }).done( function(response) {
            console.log ("Respuesta del Ajax: "+response);
           player_money=JSON.parse(response);

           console.log(player_money.Money);
           setCookieValue(" user_money",player_money.Money);
           console.log(document.cookie);

        }).fail( function(jqXHR, textStatus) {
            alert('Error: ' + textStatus);
        });

    }
    function updateMoney(money_increment) //el parámetro es un Int, cuánto dinero ganó en la partida.
    {
        var player_name=seekCookieValue("user_name");
        var player_money=seekCookieValue(" user_money");
        var total=parseInt(player_money)+parseInt(money_increment);
        console.log(total);

        $.ajax({
            url: '../Dynamics/PHP/money_controller.php' , 
            method: 'POST',
            data: "nickname="+player_name+"&tipo_busq="+2+"&money="+total,
            statusCode: {
            404: function(){
                alert('No encontrado');
            },
            },
        }).done( function(response) {
            console.log ("Respuesta del Ajax: "+response);
           

        }).fail( function(jqXHR, textStatus) {
            alert('Error: ' + textStatus);
        });
    }
    checkDaMoney();
    // updateMoney(1000);
