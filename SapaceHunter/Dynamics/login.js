    var reg_pass= /^(?=.*[A-Z])(?=.*\d)(?=.*[!?/\\.,-]).{8,30}$/;

    var nickname_reg= /^[\w !?/\\.,-]{6,30}$/

    var inputs=document.querySelectorAll('input');

    var inputs_nickname=document.querySelectorAll(".nickname");

    function ChangePlace() {
        var tocaste = document.getElementById("JustPlay");
        tocaste.addEventListener("click", function(){
        location.href = "./Elegir_modo.html";    
        }); 
    }

    ChangePlace();
  
  
      $("#bigbox").css("display","none");
  
      document.getElementById("boton_registro").addEventListener('click',function(){
          $("#cajaGrande").css("display","none");
  
          $("img").attr("src","../Media/register_background.jpg");
          $("#bigbox").css("display","block");
      });
  
      //Validaciones
      inputs_nickname.forEach(input=>{
          $(input).keyup(function(){
            if(nickname_reg.test($(input).val()))
            {
                $(input).css("color","green");
                $(input).next().next().text("");
            }
            else
            {
                $(input).css("color","red");
                $(input).next().next().text("Necesario letras, números y caracteres especiales.");
            }
          })
      })


//Falta aplicar la validación bien.


      // Boton de registro
      document.getElementById("registrar_button").addEventListener("click",function(){
          var inputs_data=$("#form_reg").serialize();
          console.log(inputs_data);
  
          if($("#nick_pass").val()==$("#nick_passx2").val())
          {
              console.log("Contraseñas iguales");
              $.ajax({
                  url: '../Dynamics/PHP/new_user.php' , 
                  method: 'POST',
                  data: inputs_data,
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
          else
              console.log("Las contraseñas no son iguales.")
  
      })
  //    Botón de Return to LogIn
      document.getElementById("return_button").addEventListener("click",function(){
          inputs.forEach(casilla=>{
              casilla.value="";
          });
  
          $("#bigbox").css("display","none");
          $("img").attr("src","../Media/login_background.jpg");
  
          $("#cajaGrande").css("display","block");
  
      });
      
//Para que los inputs siempre escriban en mayúscula.
      inputs.forEach(campo=>{  
        $(campo).keyup(function(){
            $(campo).val($(campo).val().toUpperCase()); //El valor del input será igual a el valor del input, 
        })          //pero en mayúscula.
      })

      

      document.getElementById("boton_ingresar").addEventListener("click",function(){
          if($("#in_nick").val()!=""&&$("#in_pass").val()!="")
          {
              var log_data=$("#form_log").serialize();
              $.ajax({
                  url: '../Dynamics/PHP/search_user.php' , 
                  method: 'POST',
                  data: log_data,
                  statusCode: {
                  404: function(){
                      alert('No encontrado');
                  },
                  },
              }).done( function(response) {
                  console.log ("Respuesta del Ajax: "+response);
                  respuesta= JSON.parse(response);
                  if(respuesta=="yes")
                  {
                      location.href="Elegir_modo.html";
                  }
                  else //usuario no encontrado
                  {
                      console.log("Nel jasjj")
                  }
              }).fail( function(jqXHR, textStatus) {
                  alert('Error: ' + textStatus);
              });
              
          }
      });