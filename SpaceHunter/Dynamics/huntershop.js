
    var buttons= document.querySelectorAll(".buy");

     //global, cambiará su valor de acuerdo al precio de la pintura/foto, servirá para moneyUpdate.
    
    let dinero_disp=parseInt(seekCookieValue(" user_money"));
    $('#dinero').html('Dinero disponible: $'+dinero_disp);
    buttons.forEach(boton=>{
        $(boton).click(function(){
            console.log("Cookies1: "+document.cookie);

            precio=parseInt($(boton).parent().parent().attr("precio"));
            console.log("Precio arte: "+precio);
            num_item=parseInt($(boton).parent().parent().attr("number"));
            console.log("Número Item: "+num_item);
            nickname=seekCookieValue("user_name");
            console.log("nickname: "+nickname);

            dinero_disp=parseInt(seekCookieValue(" user_money"));
            console.log("Dinero disponible: "+dinero_disp);
            if(dinero_disp>=precio)
            {
                //código pa meter un modal.
                $.ajax({
                    url: '../Dynamics/PHP/art_unlocker.php' , 
                    method: 'POST',
                    data: "item="+num_item+"&nickname="+nickname,
                    statusCode: {
                    404: function(){
                        alert('No encontrado');
                    },
                    },
                }).done( function(response) {
                    console.log ("Respuesta del Ajax: "+response);
                //    player_money=JSON.parse(response);
                    updateMoney(-precio);
                    setCookieValue(" user_money",dinero_disp-precio);
                    console.log("Cookies depués Ajax: "+document.cookie);
                    location.href="HunterShop.html";


        
                }).fail( function(jqXHR, textStatus) {
                    alert('Error: ' + textStatus);
                });
            }
            else
            {
                alert("Dinero insuficiente, sigue jugando :]")
            }
        })
    });

    $("#back").click(function(){
        location.href="Elegir_modo.html";
    });
    

    