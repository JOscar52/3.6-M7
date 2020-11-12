<?php

  require('conector.php');

  session_start();

  if (isset($_SESSION['user'])) {

    $con = new ConectorBD('localhost', 't_selector', '1555');
    if ($con->initConexion('m7-php')=='OK') {

      $resultado = $con->consultar(['usuarios'], ['nombre', 'id'], "WHERE email ='".$_SESSION['user']."'");
      $fila = $resultado->fetch_assoc();
      $response['nombre']=$fila['nombre'];
      /****************************************************/
      $resultado = $con->getAgendaUser($fila['id']);
      $response['sq'] = $con->getAgendaUser($fila['id']);
      $i=0;
      while ($fila = $resultado->fetch_assoc()) {

        $response['infoAgenda'][$i]['titulo']=$fila['titulo'];
        $response['infoAgenda'][$i]['start_date']=$fila['start_date'];
        $response['infoAgenda'][$i]['end_date']=$fila['end_date'];
        $response['infoAgenda'][$i]['start_hour']=$fila['start_hour'];
        $response['infoAgenda'][$i]['end_hour']=$fila['hora_llegada'];
        
        $i++;
      }
      $response['msg'] = "OK";

    }else {
      $response['msg'] = "No se pudo conectar a la Base de Datos";
    }
  }else {
    $response['msg'] = "No se ha iniciado una sesión";
  }

  echo json_encode($response);


 ?>
