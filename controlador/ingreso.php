<?php
require_once "../modelos/Ingreso.php";

$ingreso = new Ingreso();

$idIngreso = isset($_POST["idIngreso"]) ? limpiarCadena($_POST["idIngreso"]) : "";
$idExistencia = isset($_POST["idExistencia"]) ? limpiarCadena($_POST["idExistencia"]) : "";
$idTipoingreso = isset($_POST["idTipoingreso"]) ? limpiarCadena($_POST["idTipoingreso"]) : "";
$idComprobante = isset($_POST["idComprobante"]) ? limpiarCadena($_POST["idComprobante"]) : "";
$idAlmacen = isset($_POST["idAlmacen"]) ? limpiarCadena($_POST["idAlmacen"]) : "";
$cantidad = isset($_POST["cantidad"]) ? limpiarCadena($_POST["cantidad"]) : "";
$precio = isset($_POST["precio"]) ? limpiarCadena($_POST["precio"]) : "";
$subtotal = isset($_POST["subtotal"]) ? limpiarCadena($_POST["subtotal"]) : "";

switch ($_GET["op"]) {

    case 'guardar':
        $rspta = $ingreso->insertar($idExistencia, $idTipoingreso, $idComprobante, $idAlmacen, $cantidad, $precio, $subtotal);
        echo $rspta ? "Datos registrados correctamente" : "No se pudo registrar los datos";
        break;

    case 'editar':
        $rspta = $ingreso->editar($idIngreso,$idExistencia, $idTipoingreso, $idComprobante, $idAlmacen, $cantidad, $precio, $subtotal);
        echo $rspta ? "Datos actualizados correctamente" : "No se pudo actualizar los datos";

        break;

    case 'mostrar':
        $rspta = $ingreso->mostrar($idIngreso);
        echo json_encode($rspta);
        break;


    case 'listar':
        $rspta = $ingreso->listar();
        $data = array();
        $total=0;


        while ($reg = $rspta->fetch_object()) {
            $data[] = array(
                "0" => $reg->idIngreso,
                "1" => $reg->almacen,
                "2" => $reg->tipoIngreso,
                "3" => $reg->comprobante,
                "4" => $reg->existencia,
                "5" => $reg->precio,
                "6" => $reg->cantidad,
                "7" => $reg->um,
                "8" => $reg->precio*$reg->cantidad,    
                "9" => ($reg->subtotal)?    
                    '<button class="btn btn-warning btn-xs"  type="button" data-toggle="modal" data-target="#formularioActualizar" onclick="mostrar(' . $reg->idIngreso . ')">
                <i class="far fa-edit"></i>
                </button>' . ' '
                    :

                    '<button class="btn btn-warning btn-xs"  type="button" data-toggle="modal" data-target="#formularioActualizar" onclick="mostrar(' . $reg->idIngreso . ')">
                <i class="far fa-edit"></i>
                </button>' ,

                    
            );
        }

        $results = array(
            "sEcho" => 1, //info para datatables
            "iTotalRecords" => count($data), //enviamos el total de registros al datatable
            "iTotalDisplayRecords" => count($data), //enviamos el total de registros a visualizar
            "aaData" => $data
        );
        echo json_encode($results);
        break;

    case 'selectExistencia':
        require_once "../modelos/Existencia.php";
        $existencia = new Existencia();

        $rspta = $existencia->listarActivos();

        while ($reg = $rspta->fetch_object()) {
            echo '<option value=' . $reg->idExistencia . '>' . $reg->nombre . '</option>';
        }
        break;



        case 'selectTipoIngreso':
            require_once "../modelos/TipoIngreso.php";
            $tipoingreso = new TipoIngreso();
    
            $rspta = $tipoingreso->select();
    
            while ($reg = $rspta->fetch_object()) {
                echo '<option value=' . $reg->idTipoingreso . '>' . $reg->nombre . '</option>';
            }
            break;



            case 'selectComprobante':
                require_once "../modelos/Comprobante.php";
                $comprobante = new Comprobante();
        
                $rspta = $comprobante->listar();
        
                while ($reg = $rspta->fetch_object()) {
                    echo '<option value=' . $reg->idComprobante . '>' . $reg->numero . '</option>';
                }
                break;

                case 'selectAlmacen':
                    require_once "../modelos/Almacen.php";
                    $almacen = new Almacen();
            
                    $rspta = $almacen->select();
            
                    while ($reg = $rspta->fetch_object()) {
                        echo '<option value=' . $reg->idAlmacen . '>' . $reg->nombre . '</option>';
                    }
                    break;
}
