<?php 
require_once "../modelos/Banco.php";

$banco=new Banco();

$idBanco=isset($_POST["idBanco"])? limpiarCadena($_POST["idBanco"]):"";
$nombre=isset($_POST["nombre"])? limpiarCadena($_POST["nombre"]):"";
$tipoBanco=isset($_POST["tipoBanco"])? limpiarCadena($_POST["tipoBanco"]):"";


switch ($_GET["op"]) {  
	case 'guardar':
		$rspta=$banco->insertar($nombre,$tipoBanco);
		echo $rspta ? "Datos registrados correctamente" : "No se pudo registrar los datos";
	break;

	case 'editar':
         $rspta=$banco->editar($idBanco,$nombre,$tipoBanco);
		echo $rspta ? "Datos actualizados correctamente" : "No se pudo actualizar los datos";
		break;

	case 'desactivar':
		$rspta=$banco->desactivar($idBanco);
		echo $rspta ? "Datos desactivados correctamente" : "No se pudo desactivar los datos";
		break;
	case 'activar':
		$rspta=$banco->activar($idBanco);
		echo $rspta ? "Datos activados correctamente" : "No se pudo activar los datos";
		break;
	
	case 'mostrar':
		$rspta=$banco->mostrar($idBanco);
		echo json_encode($rspta);
		break;

    case 'listar':
		$rspta=$banco->listar();
		$data=Array();
        
		while ($reg=$rspta->fetch_object()) {
			$data[]=array(
            "0"=>$reg->idBanco,
            "1"=>$reg->nombre,
            "2"=>$reg->tipoBanco,
            "3"=>($reg->estado)?'<span class="badge badge-success">Activado</span>':'<span class="badge badge-danger">Desactivado</span>',
            "4"=>($reg->estado)?
            '<button class="btn btn-warning btn-xs"  type="button" data-toggle="modal" data-target="#formularioActualizar" onclick="mostrar(' . $reg->idBanco . ')"">
                <i class="fa fa-edit"></i>
                </button>' . ' ' .

                    '<button id="desactivar" class="btn btn-danger btn-xs" onclick="confirmarEliminacion(' . $reg->idBanco . ')">
					<i class="fa fa-window-close"></i>
                </button>' :

                    '<button class="btn btn-warning btn-xs"  type="button" data-toggle="modal" data-target="#formularioActualizar" onclick="mostrar(' . $reg->idBanco . ')"">
                <i class="fa fa-edit"></i>
                </button>' . ' ' .

                    '<button id="activar" class="btn btn-primary btn-xs" onclick="confirmarActivacion(' . $reg->idBanco . ')">
                    <i class="fa fa-check-square"></i>
                    </button>',
           
        );
		}
		$results=array(
             "sEcho"=>1,//info para datatables
             "iTotalRecords"=>count($data),//enviamos el total de registros al datatable
             "iTotalDisplayRecords"=>count($data),//enviamos el total de registros a visualizar
             "aaData"=>$data); 
		echo json_encode($results);
		break;
}
 ?>