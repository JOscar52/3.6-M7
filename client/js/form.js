
 alert("estoy en form.js");
$(function(){
    alert("FEcha");
  $('select').material_select();
  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 50,
    format: 'yyyy-mm-dd'
  });


  $('#formulario').submit(function(event){
      alert("Formulario");
    event.preventDefault();
    checkContrasena();
  })
})

function checkContrasena(){
    alert("Contraseña ");
  var contrasena = $('#contrasena').val();
  var repContrasena = $('#contrasenaRepetida').val();

  if (contrasena===repContrasena) {
    alert("Contraseña bien");
    getDatos();

  }else {
    alert('Las contraseñas no coinciden')
  }
}

function getDatos(){
  alert("GetDatos");
  var form_data = new FormData();
  form_data.append('nombre', $('#nombre').val());
  //alert("getNombre para Usuarios "+form_data['nombre']+" "+$('#nombre').val());
  form_data.append('fechaNacimiento', $('#fechaNacimiento').val());
  form_data.append('sexo', $('input[name="sexo"]').val());
  //form_data.append('automovil', document.getElementById('check1').checked);
  //form_data.append('bus', document.getElementById('check2').checked);
  form_data.append('email', $('#email').val());
  //form_data.append('fueraCiudad', document.getElementById('fueraCiudad').checked);
  form_data.append('experiencia', $('#experiencia').val());
  form_data.append('contrasena', $('#contrasena').val());
  /********************************************************
  /********************************************************/
  //var pbauto="si";var pabus="no";
  if(document.getElementById("check1").checked == true){
     pbauto= 'si';
  }else{pbauto='no';}
  if(document.getElementById("check2").checked == true){
    pabus= 'si';
  }else{pabus='no';}
  form_data.append('automovil', pbauto);
  form_data.append('bus', pabus);
  alert(" auto="+pbauto+" bus="+pabus);
  var fciu="no";
  if(document.getElementById('fueraCiudad').checked==true){fciu='si';}
  form_data.append('fueraCiudad', fciu);

  /********************************************************
  /********************************************************/
  //var nombre = $('#formulario').find('#nombre').val();
  //var nombre = $('#formulario').find('#nombre').val();
  //form_data.append('nombre', nombre);
  sendForm(form_data);
}

function sendForm(formData){
alert("ajax Usuarios para Usuarios");
var user=$('#formulario').find('#nombre').val();
alert("ajax Usuarios para Usuarios "+formData.nombre+" "+user);
var password="password";
//var nombre = $('#formulario').find('#nombre').val();
//form_data.append('nombre', $('#nombre').val());
  $.ajax({
    url: '../server/create_user.php',
    dataType: "json",
    cache: false,
    processData: false,
    contentType: false,
    data: formData,
    //data: {user: user, password: password},
    type: 'POST',
    success: function(php_response){
      //alert("php_response "+'php_response');
      alert("conexion "+php_response.con+" "+php_response.con);
      //alert("conexion "+php_response.con+" "+php_response.cond);
      if (php_response.msg == "exito en la inserción") {
        window.location.href = 'index.html';
      }else {
        alert(php_response.msg);
      }
    },
    error: function(){
      alert("php_response MIO "+php_response.msg);
      alert("error en la comunicación con el servidor AAAA");
    }
  })
}
