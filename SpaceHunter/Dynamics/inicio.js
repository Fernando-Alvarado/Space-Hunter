$("#boton_start").click(function(){
    location.href="logIn.html";
});
"#boton_controles"
"#boton_credits"
$("#boton_salir").click(function(){
    window.location.href = "http://www.google.com";
});

$('.modal').hide();
$('#boton_credits').click(function(){
    $('.modal').toggle();
});
$('.close').click(function(){
    $('.modal').hide();
});

$('#boton_controles').click(function(){
    location.href='controles.html';
});