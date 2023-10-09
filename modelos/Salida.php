<?php 
//incluir la conexion de base de datos
require "../config/Conexion.php";
class Salida{
	//implementamos nuestro constructor
public function __construct(){
}



public function calcularPrecioUltimo($idExistencia){
    $sql="SELECT precioActual from existencia WHERE idExistencia='$idExistencia'";
    return ejecutarConsultaSimpleFila($sql);
 
}


//metodo insertar SALIDA
public function insertar($idExistencia,$idTiposalida,$idOT,$idEmpleado,$fecha,$cantidad,$costoUnitario,$subTotal){
	$sql="CALL prc_RegistrarSalida('$idExistencia','$idTiposalida','$idOT','$idEmpleado','$fecha','$cantidad','$costoUnitario','$subTotal')";
	return ejecutarConsulta($sql);
}

public function editar($idSalida,$idExistencia,$idTiposalida,$idOT,$idEmpleado,$fecha,$cantidad,$costoUnitario,$subTotal){
	$sql="UPDATE salida SET 
     idSalida='$idSalida',
     idExistencia='$idExistencia',
     idTiposalida='$idTiposalida',
     idOT='$idOT',
     idEmpleado='$idEmpleado',
     fecha='$fecha',
     cantidad='$cantidad',
     costoUnitario='$costoUnitario',
     subTotal='$subTotal'

	WHERE idSalida='$idSalida'";
	return ejecutarConsulta($sql);
}


//metodo para mostrar registros
public function mostrar($idSalida){
	$sql="SELECT * FROM salida WHERE idSalida='$idSalida'";
	return ejecutarConsultaSimpleFila($sql);
}

//listar registros 
public function listar(){
	$sql="SELECT
    salida.idSalida,
    salida.idExistencia,
    salida.idTiposalida,
    salida.idOT,
    salida.idEmpleado,
    almacenes.nombre as almacen,
    CONCAT(empleado.apellidoPaterno,' ',empleado.apellidoMaterno,' ',empleado.nombre) AS empleado,
    ordentrabajo.numero as ot,
    tipo_salida.nombre as tipoSalida,
    existencia.nombre as existencia,
    salida.fecha,
    salida.cantidad,
    salida.costoUnitario,
    salida.subTotal
    from 
    salida

    inner join ordentrabajo on ordentrabajo.idOT=salida.idOT
    inner join empleado on empleado.idEmpleado=salida.idEmpleado
    inner join tipo_salida on tipo_salida.idTiposalida=salida.idTiposalida
    inner join existencia on existencia.idExistencia=salida.idExistencia
    inner join almacenes on almacenes.idAlmacen=ordentrabajo.idAlmacen
    GROUP BY idSalida
    
    
 
    ";
	return ejecutarConsulta($sql);
}


}
 ?>
