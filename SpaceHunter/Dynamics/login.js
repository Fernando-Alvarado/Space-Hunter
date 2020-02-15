    //Regex inputs
    var reg_pass= /^(?=.*[A-Z])(?=.*\d)(?=.*[!?/\\.,-]).{8,30}$/;
    var nickname_reg= /^[\w !?/\\.,-]{6,30}$/

    var inputs=document.querySelectorAll('input');
    var inputs_nickname=document.querySelectorAll(".nickname");
    var inputs_pass=document.querySelectorAll(".password");

    class User{
        money;
        nickname;
        constructor(nickname)
        {
            this.nickname=nickname;
        }
        
    }



    //Mensaje a desplegar si la regex no se cumple.
    var mensaje_nick="Necesario letras, números y caracteres especiales. Min: 6, Max: 30.";
    var mensaje_pass="Necesario letras, números y caracteres especiales. Min:8, Max:30.";

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

      editionInput(inputs_nickname,mensaje_nick,nickname_reg);
      editionInput(inputs_pass,mensaje_pass,reg_pass);


    

      function registerUser(datos_form)
      {
        $.ajax({
            url: '../Dynamics/PHP/new_user.php' , 
            method: 'POST',
            data: datos_form+"&money=1000",
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


      function seekingUser(datos_form,tipo_busqueda) 
      //   tipo_busqueda==1 para ver si ya hay un nickname en la base con ese nombre.
      //   tipo_busqueda==2 para var si el nombre y la contraseña son correctas.
        {
          $.ajax({
              url: '../Dynamics/PHP/search_user.php' , 
              method: 'POST',
              data: datos_form+"&tipo_busq="+tipo_busqueda,
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
                  if(tipo_busqueda==1)
                  {
                      alert("Nombre de usuario en uso");
                      $("#nick_input").val("");
                  }
                  else
                  {
                      let objeto_usuario=new User($("#in_nick").val());
                      console.log(JSON.stringify(objeto_usuario))
                      document.cookie="user_name="+objeto_usuario.nickname+";max-age="+30*60+";path=/";
                      document.cookie="user_money=;max-age="+30*60+";path=/";

                      console.log("Cookies= "+document.cookie);
                      location.href="Elegir_modo.html";

                  }
              }
              else //usuario no encontrado
              {
                  if(tipo_busqueda==1)
                      registerUser(datos_form);               
                  else
                      alert("Usuario no encontrado, asegurate de haber escrito bien tu Nickname.")
              }
          }).fail( function(jqXHR, textStatus) {
              alert('Error: ' + textStatus);
          });
        }


//Falta aplicar la validación bien.


      // Boton de registro
      document.getElementById("registrar_button").addEventListener("click",function(){
          var inputs_data=$("#form_reg").serialize();
          console.log(inputs_data);
  
          if($("#nick_input").attr("correct")=="true"&&$("#nick_pass").attr("correct")=="true"&&
          $("#nick_pass").val()==$("#nick_passx2").val())
          {
              console.log("Contraseñas iguales");          
            //   registerUser(inputs_data);
             seekingUser(inputs_data,1);
          }
          else
            alert("Debe rellenar correctamente todo el formulario.");
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



      

        //Boton de LogIn
      document.getElementById("boton_ingresar").addEventListener("click",function(){
          if($("#in_nick").attr("correct")=="true"&&$("#in_pass").attr("correct")=="true")
          {
              var log_data=$("#form_log").serialize();            
              seekingUser(log_data,2);
              
          }
          else
          {
            alert("Debe llenar correctamente el formulario.")
          }
      });