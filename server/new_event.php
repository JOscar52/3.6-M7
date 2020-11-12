<?php

require('./conector.php');

session_start();

if (isset($_SESSION['user'])) {
  $con = new ConectorBD('localhost', 't_selector', '1555');
  //if ($con->initConexion('transporte_db')=='OK') {
  if ($con->initConexion('m7-php')=='OK') {
    /*
    $resultado = $con->consultar(['ciudades'],['id'], "WHERE nombre ='" .$_POST['ciudad_origen']."'");
    $fila = $resultado->fetch_assoc();
    $data['fk_ciudad_origen'] = $fila['id'];
    $resultado = $con->consultar(['ciudades'],['id'], "WHERE nombre ='" .$_POST['ciudad_destino']."'");
    $fila = $resultado->fetch_assoc();
    $data['fk_ciudad_destino'] = $fila['id'];
    $data['fk_vehiculo'] = "'".$_POST['vehiculo']."'";
    $resultado = $con->consultar(['usuarios'],['id'], "WHERE nombre ='" .$_POST['conductor']."'");
    $fila = $resultado->fetch_assoc();
    $data['fk_conductor'] = $fila['id'];
    */
    $data['titulo'] = "'".$_POST['titulo']."'";
    $data['start_date'] = "'".$_POST['start_date']."'";
    $data['end_date'] = "'".$_POST['end_date']."'";
    $data['start_hour'] = "'".$_POST['start_hour']."'";
    $data['hora_llegada'] = "'".$_POST['end_hour']."'";

    if ($con->insertData('agenda', $data)) {
      $response['msg']= 'OK';
    }else {
      $response['msg']= 'No se pudo realizar la inserción de los datos';
    }
  }else {
    $response['msg']= 'No se pudo conectar a la base de datos';
  }
}else {
  $response['msg']= 'No se ha iniciado una sesión';
}

echo json_encode($response);


 ?>
