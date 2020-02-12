$('#mod_s').change(function(){  //En caso de cambiar el modo, mostrar la información de este
    var mod = $('#mod_s').val();
    console.log(mod);
    if(mod==1){
        $('img').attr("src","../Media/Supervivencia_background.jpg");
        $('#modo').html('Supervivencia');
        $('.descript').html('Quedaste varado en el sector K-3345 Sistema Alfa-C, los enemigos te flanquean, puedes sobrevivir el tiempo necesario para que llegue la brigada de rescate?');
    }else if(mod==2){
        $('img').attr("src","../Media/Mensajero_background.jpg");
        $('#modo').html('Mensajero');
        $('.descript').html('');
    }else if(mod==3){
        $('img').attr("src","../Media/Guardian_background.jpg");
        $('#modo').html('Guardián Supremo');
        $('.descript').html('');
    }else if(mod==4){
        $('img').attr("src","../Media/Flota_background.jpg");
        $('#modo').html('Flota');
        $('.descript').html('Fuiste enviado a la estrella Delta-A, actualmente en posesión del imperio, tienes que limpiar la zona para que las tropas rebeldes puedan entrar.');
    }else if(mod==5){
        $('img').attr("src","../Media/Flota_background.jpg");
        $('#modo').html('El Rey Ha Caído');
        $('.descript').html('El sistema Rune es controlado por el jefe Hutt "Cosmos". Este tirano mandamás no obedece a nadie y el imperio está pagando muy bien por su cabeza, o mejor dicho, su nave.');
    }
});

$('#Go').click(function(){  //Cuano el usuario aprieta el botón de empezar, lo direccionamos a juego.php, enviándole la dificultad y el modo seleccionado
    var mod = $('#mod_s').val();
    var dif = $('#dif').val();

    var url = 'juego.php';
    var form = $('<form style="display:none" action="' + url + '" method="post">' +
    '<input type="text" name="dif" value="'+dif+'" />' +
    '<input type="text" name="mod" value="'+mod+'" />' +
    '</form>');
    $('body').append(form);
    form.submit();
});