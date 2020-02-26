    //Regex inputs
    var reg_pass= /^((?=.*[A-Z])(?=.*\d)(?=.*[!?/\\.,-])).{8,30}$/;
    var nickname_reg= /^[\w !?/\\.,-]{6,30}$/

    var inputs=document.querySelectorAll('input');
    var inputs_nickname=document.querySelectorAll(".nickname");
    var inputs_pass=document.querySelectorAll(".password");

     //Mensaje a desplegar si la regex no se cumple.
     var mensaje_nick="Necesario letras, números o caracteres especiales(!?/\.,-). Min: 6, Max: 30.";
     var mensaje_pass="Necesario letras, números y caracteres especiales(!?/\.,-). Min:8, Max:30.";

    class User{
        money;
        nickname;
        constructor(nickname)
        {
            this.nickname=nickname;
        }
    }


   

    function ChangePlace() {
        var tocaste = document.getElementById("JustPlay");
        tocaste.addEventListener("click", function(){
            location.href = "./Elegir_modo.html";    
        }); 
        var tocaste2 = document.getElementById("Return");
        tocaste2.addEventListener("click", function(){
        location.href = "./inicio.html";    
        }); 
    }


   

      function displayNav(message,color)
      {

      }
  
      //Validaciones para los inputs del nickname y contraseña.
    

      function editionInput(array_input_tipo,mensaje,regex)
      {
          array_input_tipo.forEach(input=>{
            $(input).keyup(function(){
                if(regex.test($(input).val()))
                {
                    $(input).css("color","green");
                    $(input).attr("correct","true");
                    $(input).next().next().text("");
                }
                else
                {
                    $(input).css("color","red");
                    $(input).next().next().text(mensaje);
                    $(input).attr("correct","false");
    
                }
              })
          })
      }

      


    

      function registerUser(datos_form)
      {
        $.ajax({
            url: '../../Dynamics/php/registrar_usuario.php' , 
            method: 'POST',
            data: datos_form,
            statusCode: {
            404: function(){
                alert('No encontrado');
            },
            },
        }).done( function(response) {
            console.log ("Respuesta del Ajax: "+response);

            var mensaje=response;
            if(mensaje=="true") //Sí se registró
            {
                //Meter el nav con fade in y fade out
            }
            else
            {
                //NAv con mensaje de no se pudo.
            }
            // location.href="logIn.html";
        }).fail( function(jqXHR, textStatus) {
            alert('Error: ' + textStatus);
        });
      }


      function seekingUser(datos_form)   
        {
          $.ajax({
              url: '../../Dynamics/php/buscar_usuario.php' , 
              method: 'POST',
              data: datos_form,
              statusCode: {
              404: function(){
                  alert('No encontrado');
              },
              },
          }).done( function(response) {
              console.log ("Respuesta del Ajax: "+response);
              respuesta= JSON.parse(response);
  
              if(respuesta==true)
              {
                  
                    //   let objeto_usuario=new User($("#in_nick").val());
                    //   console.log(JSON.stringify(objeto_usuario))
                      document.cookie="user_name="+$("#in_nick").val()+";max-age="+60*60*24+";path=/";
                      document.cookie="user_money=;max-age="+60*60*24+";path=/";

                      console.log("Cookies= "+document.cookie);
                      location.href="Elegir_modo.html";

                  
              }
              else //usuario no encontrado
              {
                  alert("Usuario no encontrado, asegurate de haber escrito bien tu Nickname.");
              }
          }).fail( function(jqXHR, textStatus) {
              alert('Error: ' + textStatus);
          });
        }


     ChangePlace();
  
  
      $("#bigbox").css("display","none");
  
      document.getElementById("boton_registro").addEventListener('click',function(){
          $("#cajaGrande").css("display","none");
  
          $("img").attr("src","../Media/register_background.jpg");
          $("#bigbox").css("display","block");
      });

      editionInput(inputs_nickname,mensaje_nick,nickname_reg);
      editionInput(inputs_pass,mensaje_pass,reg_pass);

      //Para que los inputs siempre escriban en mayúscula.
      inputs.forEach(campo=>{  
        $(campo).keyup(function(){
            $(campo).val($(campo).val().toUpperCase()); //El valor del input será igual a el valor del input, 
        })          //pero en mayúscula.
      })

      ////////Botón de Return to LogIn
      document.getElementById("return_button").addEventListener("click",function(){
        inputs.forEach(casilla=>{
            casilla.value="";
        });

        $("#bigbox").css("display","none");
        $("img").attr("src","../Media/login_background.jpg");

        $("#cajaGrande").css("display","block");

    });








 /////// Boton de registro
      document.getElementById("registrar_button").addEventListener("click",function(){
          var inputs_data=$("#form_reg").serialize();
          console.log(inputs_data);
  
          if($("#nick_input").attr("correct")=="true"&&$("#nick_pass").attr("correct")=="true"&&
          $("#nick_pass").val()==$("#nick_passx2").val())
          {
              console.log("Contraseñas iguales");          
            
              registerUser(inputs_data);
          }
          else
              alert("Debe rellenar correctamente todo el formulario.");
      })

      
////////Boton de LogIn
      document.getElementById("boton_ingresar").addEventListener("click",function(){
          if($("#in_nick").attr("correct")=="true"&&$("#in_pass").attr("correct")=="true")
          {
              var log_data=$("#form_log").serialize();            
              seekingUser(log_data);
              
          }
          else
          {
            alert("Debe llenar correctamente el formulario.")
          }
      });