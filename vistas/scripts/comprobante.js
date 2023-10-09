var tabla;

//funcion que se ejecuta al inicio
function init(){
   mostrarform(false);
   listar();

   $("#formulario").on("submit",function(e){
   	guardaryeditar(e);
   });

   //cargamos los items al select cliente
   $.post("../controlador/comprobante.php?op=selectProveedor", function(r){
	$("#idEmpresa").html(r);
	$("#idEmpresa").select2();
	$("#idEmpresa").append('<option disabled selected value="">seleccione un proveedor</option>');
   });

   $.post("../controlador/comprobante.php?op=selectAlmacen", function(r){
	$("#idAlmacen").html(r);
	$("#idAlmacen").select2();
	$("#idAlmacen").append('<option disabled selected value="">seleccione un almacen</option>');
   });

   $.post("../controlador/comprobante.php?op=selectTipoIngreso", function(r){
	$("#idTipoingreso").html(r);
	$("#idTipoingreso").select2();
	$("#idTipoingreso").append('<option disabled selected value="">seleccione tipo de ingreso</option>');
   });

   $.post("../controlador/comprobante.php?op=selectTipoComprobante", function(r){
	$("#idTipocomprobante").html(r);
	$("#idTipocomprobante").select2();
	$("#idTipocomprobante").append('<option disabled selected value="">seleccione tipo de comprobante</option>');
   });
}

//funcion limpiar
function limpiar(){


	$("#numero").val("");

	$("#total_venta").val("");
	$(".filas").remove();
	$("#total").html("0");

	//obtenemos la fecha actual
	var now = new Date();
	var day =("0"+now.getDate()).slice(-2);
	var month=("0"+(now.getMonth()+1)).slice(-2);
	var today=now.getFullYear()+"-"+(month)+"-"+(day);
	$("#fecha").val(today);

}

//funcion mostrar formulario
function mostrarform(flag){
	limpiar();
	if(flag){
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		//$("#btnGuardar").prop("disabled",false);
		$("#btnagregar").hide();
		listarArticulos();

		$("#btnGuardar").hide();
		$("#btnCancelar").show();
		detalles=0;
		$("#btnAgregarArt").show();

	}else{
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
		$("#btnagregar").show();
	}
}

//cancelar form
function cancelarform(){
	limpiar();
	mostrarform(false);
}

//funcion listar
function listar(){
	tabla=$('#tbllistado').DataTable({
		"aProcessing": true,//activamos el procedimiento del datatable
		"aServerSide": true,//paginacion y filrado realizados por el server
		dom: 'Bfrtip',//definimos los elementos del control de la tabla
		buttons: [
                  'copyHtml5',
                  'excelHtml5',
                  'csvHtml5',
                  'pdf'
		],
		"ajax":
		{
			url:'../controlador/comprobante.php?op=listar',
			type: "get",
			dataType : "json",
			error:function(e){
				console.log(e.responseText);
			}
		},
		"bDestroy":true,
		"iDisplayLength":10,//paginacion
		"order":[[0,"desc"]]//ordenar (columna, orden)
	});
	console.log(tabla);
}

function listarArticulos() {
    // Inicializamos la tabla utilizando DataTables
    tabla = $('#tblexistencias').DataTable({
		dom: '<"row"<"col-md-12"<"row"<"col-md-6"B><"col-md-6"f> > ><"col-md-12"rt> <"col-md-12"<"row"<"col-md-5"i><"col-md-7"p>>> >',
		 // Definimos los elementos del control de la tabla
        buttons: [], // Aquí puedes agregar botones personalizados si es necesario

        // Configuración de la obtención de datos a través de una solicitud AJAX
        "ajax": {
            url: '../controlador/comprobante.php?op=listarExistencias',
            type: "get",
            dataType: "json",
            error: function (e) {
                console.log(e.responseText);
            }
        },
        
        "destroy": true, // Destruye la tabla existente si ya existe
        "displayLength": 10, // Configuración de la paginación
        "order": [0, "desc"] // Ordenar por columna 0 en orden descendente
    });
}

//funcion para guardaryeditar
function guardaryeditar(e){
     e.preventDefault();//no se activara la accion predeterminada 
     //$("#btnGuardar").prop("disabled",true);
     var formData=new FormData($("#formulario")[0]);

     $.ajax({
     	url: "../controlador/comprobante.php?op=guardaryeditar",
     	type: "POST",
     	data: formData,
     	contentType: false,
     	processData: false,

     	success: function(datos){
			console.log(datos);
     		mostrarform(false);
     		listar();
     	}
     });

     limpiar();
}

function mostrar(idComprobante) {
    $.post("../controlador/comprobante.php?op=mostrar", { idComprobante: idComprobante },
        function (data, status) {
            data = JSON.parse(data);
            mostrarform(true);

            $("#idTipocomprobante").val(data.idTipocomprobante);
            $("#idTipoingreso").val(data.idTipoingreso);
            $("#idEmpresa").val(data.idEmpresa);
            $("#idAlmacen").val(data.idAlmacen);
            $("#fecha").val(data.fecha);
            $("#numero").val(data.numero);
            $("#precioTotal").val(data.precioTotal);

            // Ocultar y mostrar los botones
            $("#btnGuardar").hide();
            $("#btnCancelar").show();
            $("#btnAgregarArt").hide();
        });
    $.post("../controlador/comprobante.php?op=listarDetalle&id=" + idComprobante, function (r) {
        $("#detalles").html(r);
    });
}


//funcion para desactivar
function anular(idComprobante){
	bootbox.confirm("¿Esta seguro de desactivar este dato?", function(result){
		if (result) {
			$.post("../controlador/comprobante.php?op=anular", {idComprobante : idComprobante}, function(e){
				bootbox.alert(e);
				tabla.ajax.reload();
			});
		}
	})
}

//declaramos variables necesarias para trabajar con las compras y sus detalles
var cont=0;
var detalles=0;

$("#btnGuardar").hide();


function agregarDetalle(idExistencia, existencia) {
    var precio = 1;
	var cantidad = 1;	

    if (idExistencia !== "") {
        var subtotal = cantidad * precio;
        var fila = '<tr class="filas" id="fila' + cont + '">' +
            '<td><button type="button" class="btn btn-danger" onclick="eliminarDetalle(' + cont + ')">X</button></td>' +
            
			'<td><input type="hidden" name="idExistencia[]" value="' + idExistencia + '">' + existencia + '</td>' +
            '<td><input type="number" name="cantidad[]" id="cantidad[]" value="' + cantidad + '"></td>' +
            '<td><input type="number" name="precio[]" id="precio[]" value="' + precio + '"></td>' +
            
			'<td><span id="subtotal' + cont + '" name="subtotal">' + subtotal + '</span></td>' +
            '<td><button type="button" onclick="modificarSubtotales()" class="btn btn-info"><i class="fa fa-refresh"></i></button></td>' +
            '</tr>';
        cont++;
        detalles++;
        $('#detalles').append(fila);
        modificarSubtotales();

    } else {
        alert("Error al ingresar el detalle, revisar los datos del artículo");
    }
}


function modificarSubtotales(){
	var cant=document.getElementsByName("cantidad[]");
	var prev=document.getElementsByName("precio[]");
	var sub=document.getElementsByName("subtotal");


	for (var i = 0; i < cant.length; i++) {
		var inpV=cant[i];
		var inpP=prev[i];
		var inpS=sub[i];


		inpS.value=inpV.value*inpP.value;
		document.getElementsByName("subtotal")[i].innerHTML=inpS.value;
	}

	calcularTotales();
}

function calcularTotales(){
	var sub = document.getElementsByName("subtotal");
	var total=0.0;

	for (var i = 0; i < sub.length; i++) {
		total += document.getElementsByName("subtotal")[i].value;
	}
	$("#total").html("S/." + total);
	$("#precioTotal").val(total);
	evaluar();
}

function evaluar(){
	if (detalles>0) 
	{
		$("#btnGuardar").show();
	}
	else
	{
		$("#btnGuardar").hide();
		cont=0;
	}
}

function eliminarDetalle(indice){
$("#fila"+indice).remove();
calcularTotales();
detalles=detalles-1;

}

init();