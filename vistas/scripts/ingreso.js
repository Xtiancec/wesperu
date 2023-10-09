var tabla;
init();
//funcion que se ejecuta al inicio
function init() {
    listar();
    
    $.post("../controlador/ingreso.php?op=selectExistencia", function (r) {
        $("#idExistencia").html(r);
        $("#idExistencia").select2();
        $("#idExistencia").append('<option disabled selected value="">seleccione o escriba una existencia</option>');
        $("#idExistencia").select2('refresh');

    }); $.post("../controlador/ingreso.php?op=selectAlmacen", function (r) {
        $("#idAlmacen").html(r);
        $("#idAlmacen").select2();
        $("#idAlmacen").append('<option disabled selected value="">seleccione un almacen</option>');
        $("#idAlmacen").select2('refresh');
    });
    
    $.post("../controlador/ingreso.php?op=selectTipoIngreso", function (r) {
        $("#idTipoingreso").html(r);
        $("#idTipoingreso").select2();
        $("#idTipoingreso").append('<option disabled selected value="">seleccione un tipo de ingreso</option>');
        $("#idTipoingreso").select2('refresh');
    });

    $.post("../controlador/ingreso.php?op=selectComprobante", function (r) {
        $("#idComprobante").html(r);
        $("#idComprobante").select2();
        $("#idComprobante").append('<option disabled selected value="">Seleccione el comprobante</option>');
        $("#idComprobante").select2('refresh');
    });

    $.post("../controlador/ingreso.php?op=selectExistencia", function (r) {
        $("#idExistenciaUpdate").html(r);
        $("#idExistenciaUpdate").select2();
        $("#idExistenciaUpdate").append('<option disabled selected value="">seleccione o escriba una existencia</option>');
        $("#idExistenciaUpdate").select2('refresh');

    }); $.post("../controlador/ingreso.php?op=selectAlmacen", function (r) {
        $("#idAlmacenUpdate").html(r);
        $("#idAlmacenUpdate").select2();
        $("#idAlmacenUpdate").append('<option disabled selected value="">seleccione un almacen</option>');
        $("#idAlmacenUpdate").select2('refresh');
    });
    
    $.post("../controlador/ingreso.php?op=selectTipoIngreso", function (r) {
        $("#idTipoingresoUpdate").html(r);
        $("#idTipoingresoUpdate").select2();
        $("#idTipoingresoUpdate").append('<option disabled selected value="">seleccione un tipo de ingreso</option>');
        $("#idTipoingresoUpdate").select2('refresh');
    });

    $.post("../controlador/ingreso.php?op=selectComprobante", function (r) {
        $("#idComprobanteUpdate").html(r);
        $("#idComprobanteUpdate").select2();
        $("#idComprobanteUpdate").append('<option disabled selected value="">Seleccione el comprobante</option>');
        $("#idComprobanteUpdate").select2('refresh');
    });
}

document.addEventListener('DOMContentLoaded',function(){
    let prec=document.getElementById('precio');
    let cant=document.getElementById('cantidad');
    let total=document.getElementById('subtotal');
    prec.addEventListener('input',calcular);
    cant.addEventListener('input',calcular);

    function calcular(){
        let valorprecio=parseFloat(prec.value).toFixed(2);
        let valorcant=parseFloat(cant.value).toFixed(2);
        
        if(!isNaN(valorcant)&&!isNaN(valorprecio)){
            let resultado=valorcant*valorprecio;
            
            total.value=parseFloat(resultado).toFixed(2);
        }else{
            total.value='';
        }
    }
});


function ingresoStock(){
    
}
//funcion listar
function listar(){

	tabla=$('#tbllistado').dataTable({
		dom: '<"row"<"col-md-12"<"row"<"col-md-6"B><"col-md-6"f> > ><"col-md-12"rt> <"col-md-12"<"row"<"col-md-5"i><"col-md-7"p>>> >',
            buttons: {
                buttons: [
                    { extend: 'copy', className: 'btn' },
                    { extend: 'csv', className: 'btn' },    
                    { extend: 'excel', className: 'btn' },
                    { extend: 'print', className: 'btn' },
                    { extend: 'pageLength', className: 'btn' }
                ]
            },
            "oLanguage": {
                "oPaginate": { "sPrevious": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>', "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' },
                "sInfo": "Mostrando página _PAGE_ de _PAGES_",
                "sSearch": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
                "sSearchPlaceholder": "Buscar...",
               "sLengthMenu": "Results :  _MENU_",
            },
            "stripeClasses": [],
            "lengthMenu": [10, 10, 20, 50],
            "pageLength": 10,
			
		"ajax":
		{
			url:'../controlador/ingreso.php?op=listar',
			type: "get",
			dataType : "json",
			error:function(e){
				console.log(e.responseText);
			}
		},
        "columnDefs": [
            {
                "targets": 5, // Indica la columna "Monto"
                "render": function (data, type, row) {
                    return 'S/ ' + parseFloat(data).toFixed(2); // Agrega el símbolo y formatea el número
                }
            },
            {
                "targets":8 , // Indica la columna "Monto"
                "render": function (data, type, row) {
                    return 'S/ ' + parseFloat(data).toFixed(2); // Agrega el símbolo y formatea el número
                }
            }
        ],
		"bDestroy":true,
		
		"order":[[0,"desc"]]//ordenar (columna, orden)
	}).DataTable();
}



function mostrar(idIngreso){

	$.ajax({
		data:{"idIngreso":idIngreso},
		url:'../controlador/ingreso.php?op=mostrar',
		type:"post",
		beforeSend:function(){},
		success: function(response){
			console.log(response)
			data=$.parseJSON(response);
				$("#idIngresoUpdate").val(data['idIngreso']);
				$("#idExistenciaUpdate").val(data['idExistencia']);
                $("#idTipoingresoUpdate").val(data['idTipoingreso']);
				$("#idComprobanteUpdate").val(data['idComprobante']);	
                $("#idAlmacenUpdate").val(data['idAlmacen']);
				$("#cantidadUpdate").val(data['cantidad']);
                $("#precioUpdate").val(data['precio']);
				$("#subtotalUpdate").val(data['subtotal']);	
		}
	})
}





function guardar(){
	idExistencia = $('#idExistencia').val();
	idTipoingreso = $('#idTipoingreso').val();
    idComprobante = $('#idComprobante').val();
	idAlmacen = $('#idAlmacen').val();
    cantidad = $('#cantidad').val();
    precio = $('#precio').val();
	subtotal = $('#subtotal').val(); 
	parametros = {
    "idExistencia":idExistencia,
    "idTipoingreso":idTipoingreso,
    "idComprobante":idComprobante,
    "idAlmacen":idAlmacen,
    "cantidad":cantidad,
    "precio":precio,
    "subtotal":subtotal}
	
	$.ajax({
		data: parametros,
		url: '../controlador/ingreso.php?op=guardar',
		type: "POST",
		beforeSend:function(){},
		success:function(response){
			if(response == "success"){
				console.log(response);
                tabla.ajax.reload();
				$("#formularioregistro").modal("hide");
				toastr.success("Se guardo correctamente los datos","Registro exitoso");

            } else if (response =="requerid") {
                toastr.error("Complete todos los requeridos porfavor","Campos incompletos!");
            } else {
                toastr.error("Comuniquese con su proveedor","Error!");
            }
		}
	})
	tabla.ajax.reload();		
}


function Actualizar(){

    idIngreso = $('#idIngresoUpdate').val();
    idExistencia = $('#idExistenciaUpdate').val();
	idTipoingreso = $('#idTipoingresoUpdate').val();
    idComprobante = $('#idComprobanteUpdate').val();
	idAlmacen = $('#idAlmacenUpdate').val();
    cantidad = $('#cantidadUpdate').val();
	precio = $('#precioUpdate').val();
    subtotal = $('#subtotalUpdate').val();

	parametros ={
    "idIngreso":idIngreso,
    "idExistencia":idExistencia,
    "idTipoingreso":idTipoingreso,
    "idComprobante":idComprobante,
    "idAlmacen":idAlmacen,
    "cantidad":cantidad,
    "precio":precio,
    "subtotal":subtotal}

    $.ajax({
		data: parametros,
		url: '../controlador/ingreso.php?op=editar',
		type: "POST",
		beforeSend: function(){},
		success:function(response){
	
			console.log(response);
			if(response=="success"){		
				tabla.ajax.reload();
				$("#formularioActualizar").modal("hide");
				
			} else if(response=="requerid"){
				toast.error("complete los datos por favor","Datos incompletos");

			}else{
				toast.error("Comuniquese con el administrador","ERROR");
			}
		}
	})
}




