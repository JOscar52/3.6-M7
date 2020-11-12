<?php


  require('./conector.php');

  $con = new ConectorBD('localhost','t_selector','1555');

  $response['conexion'] = $con->initConexion('m7-php');


  if ($response['conexion']=='OK') {
      $response['msg']="Estoy conectado con m7";
      $use1 = $_POST['user'];
      $use2= $_POST['password'];
    $resultado_consulta = $con->consultar(['usuarios'],
    ['email', 'psw'], 'WHERE email="'.$_POST['user'].'"');


    if ($resultado_consulta->num_rows != 0) {
      $fila = $resultado_consulta->fetch_assoc();
      $paw=$fila['psw'];
      //$pas= password_verify($_POST['passw'], $fila['psw']);
      //$response['msg2']="m7 aaaaa paw= ".$paw." ".$use2." ".$_POST['password'];

      if (password_verify($_POST['password'], $fila['psw'])) {
      //if ($_POST['password']==$fila['psw']) {
        $response['acceso'] = 'concedido';
        session_start();
        $_SESSION['user']=$fila['email'];
      }else {
        $response['motivo'] = 'Contraseña incorrecta';
        $response['acceso'] = 'rechazado ';
      }
    }else{
      $response['motivo'] = 'Email incorrecto';
      $response['acceso'] = 'rechazado';
    }

  }

  echo json_encode($response);

  $con->cerrarConexion();

 ?>
