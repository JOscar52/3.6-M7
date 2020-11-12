<?php

  //include('conector.php');
  require('./conector.php');

  $data['nombre'] = "'".$_POST['nombre']."'";
  $data['fecha_nacimiento'] = "'".$_POST['fechaNacimiento']."'";
  $data['sexo'] = "'".$_POST['sexo']."'";
  $data['email'] = "'".$_POST['email']."'";
  $data['experiencia'] = "'".$_POST['experiencia']."'";
  //$data['psw'] = "'".password_hash($_POST['contrasena'], PASSWORD_DEFAULT)."'";
  $data['psw'] = "'".password_hash($_POST['contrasena'], PASSWORD_DEFAULT)."'";

  //$data['psw'] = "'".$_POST['contrasena']."'";

  if ($_POST['automovil'] == 'si' && $_POST['bus'] == 'si') {
    $data['tipo_vehiculo']= "'".'automovil y bus'."'";
  }
  if ($_POST['automovil'] == 'si' && $_POST['bus'] == 'no') {
    $data['tipo_vehiculo']= "'".'automovil'."'";
  }
  if ($_POST['automovil'] == 'no' && $_POST['bus'] == 'si') {
    $data['tipo_vehiculo']= "'".'bus'."'";
  }

  if ($_POST['fueraCiudad']== 'si') {
    $data['fuera_ciudad']=1;
  }else {
    $data['fuera_ciudad']=0;
  }
  //******************************************************/

  /*$con = new ConectorBD('localhost','t_general','1529');
  //$response['conexion'] = $con->initConexion('transporte_db');
  $response['conexion'] = $con->initConexion('transporte');*/

  $con = new ConectorBD('localhost', 't_selector', '1555');
  $response['conexion'] = $con->initConexion('m7-php');
  // NO VA if ($con->initConexion('m7-php')=='OK')

  $response['con']="conexion en usuario agenda .data['nombre']";
  //$response['cond']="Ddata "."data['nombre']";

  if ($response['conexion']=='OK') {
    $response['con']="conexion ==OK";
    if($con->insertData('usuarios', $data)){
      $response['msg']="exito en la inserción";
        $response['con']="exito en AAAAA conexion en usuario agenda Conexión ==OK";
    }else {
      $response['msg']= "Hubo un error y los datos no han sido cargados";
    }
  }else {
    $response['msg']= "No se pudo conectar a la base de datos";
  }

  echo json_encode($response);


 ?>
