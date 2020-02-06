$('#mod_s').change(function(){
    var mod = $('#mod_s').val();
    console.log(mod);
    if(mod==1){
        $('#modo').html('Supervivencia');
        $('.descript').html('Quedaste varado en el sector D-143, los enemigos te flanquean, puedes sobrevivir el tiempo necesario para que llegue la brigada de rescate?');
    }else if(mod==2){
        $('#modo').html('Mensajero');
        $('.descript').html('');
    }else if(mod==3){
        $('#modo').html('Guardián Supremo');
        $('.descript').html('');
    }else if(mod==4){
        $('#modo').html('Flota');
        $('.descript').html('');
    }
});

$('#Go').click(function(){
    var mod = $('#mod_s').val();
    var dif = $('#dif').val();

    var url = 'juego.php';
    var form = $('<form style="display:none" action="' + url + '" method="post">' +
    '<input type="text" name="dif" value="' + dif + '" />' +
    '<input type="text" name="mod" value="' + mod + '" />' +
    '</form>');
    $('body').append(form);
    form.submit();
});