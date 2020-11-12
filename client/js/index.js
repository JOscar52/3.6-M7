$(function(){
  var l = new Login();
})


class Login {
  constructor() {
    this.submitEvent()
  }

  submitEvent(){
    $('form').submit((event)=>{
      event.preventDefault()
      this.sendForm()
    })
  }

  sendForm(){
    let form_data = new FormData();
    //form_data.append('user', $('#user').val());
    //form_data.append('password', $('#password').val());
    var user = $('#login-form').find('#user').val();
    var password = $('#login-form').find('#password').val();
    //var user=form_data['user'];
    //var user2=form_data['password'];
    alert("AJAX 1 "+user+" "+password);
    $.ajax({
      url: '../server/check_login.php',
      dataType: "json",
      cache: false,
      //processData: false,
      //contentType: false,
      //data: form_data,
      data: {user: user, password: password},
      type: 'POST',
      success: function(php_response){
        alert("success conexión "+php_response.conexion);
        alert("success acceso VVVV "+php_response.acceso);
        alert("mensaje 2 ****** "+php_response.msg2);
        if (php_response.acceso == "concedido") {
          alert("voy a main.html mensaje OK "+php_response.msg);
          window.location.href = 'main.html';
        }else {
          alert(php_response.motivo);
        }
      },
      error: function(){
        alert("error en la comunicación con el servidor");
      }
    })
  }
}
