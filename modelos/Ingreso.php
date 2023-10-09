<?php 
//incluir la conexion de base de datos
require "../config/Conexion.php";
class Ingreso{
	//implementamos nuestro constructor
public function __construct(){
}


//metodo insertar regiustro
public function insertar($idExistencia,$idTipoingreso,$idComprobante,$idAlmacen,$cantidad,$precio,$subtotal){
	$sql="  ";
	return ejecutarConsulta($sql);
}

public function editar($idIngreso,$idExistencia,$idTipoingreso,$idComprobante,$idAlmacen,$cantidad,$precio,$subtotal){
	$sql="UPDATE ingreso SET 
     idIngreso='$idIngreso',
     idExistencia='$idExistencia',
     idTipoingreso='$idTipoingreso',
     idComprobante='$idComprobante',
     idAlmacen='$idAlmacen',
     cantidad='$cantidad',
     precio='$precio',
     subtotal='$subtotal'

	WHERE idIngreso='$idIngreso'";
	return ejecutarConsulta($sql);
}


//metodo para mostrar registros
public function mostrar($idIngreso){
	$sql="SELECT * FROM ingreso WHERE idIngreso='$idIngreso'";
	return ejecutarConsultaSimpleFila($sql);
}

//listar registros 
public function listar(){
	$sql="SELECT
    ingreso.idIngreso,
    ingreso.idExistencia,
    ingreso.idTipoingreso,
    ingreso.idComprobante,
    ingreso.idAlmacen,
    almacenes.nombre as almacen,
    comprobante.numero as comprobante,
    tipo_ingreso.nombre as tipoIngreso,
    existencia.nombre as existencia,
    unidad_medida_existencia.nombre as um,
    ingreso.precio,
    ingreso.cantidad,
    ingreso.subtotal
    from 
    ingreso

    inner join almacenes on almacenes.idAlmacen=ingreso.idAlmacen
    inner join comprobante on comprobante.idComprobante=ingreso.idComprobante
    inner join tipo_ingreso on tipo_ingreso.idTipoingreso=ingreso.idTipoingreso
    inner join existencia on existencia.idExistencia=ingreso.idExistencia
    inner join unidad_medida_existencia on unidad_medida_existencia.idUM=existencia.idUM
    GROUP BY idIngreso
    ";
	return ejecutarConsulta($sql);
}


}
 ?>
