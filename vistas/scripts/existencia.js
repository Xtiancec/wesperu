var tabla;
init();
//funcion que se ejecuta al inicio
function init() {
    listar();
    $.post("../controlador/existencia.php?op=selectSubclase", function (r) {
        $("#idSubclase").html(r);
        $("#idSubclase").select2();
        $("#idSubclase").append('<option disabled selected value="">subclase</option>');
       
    });

    
    $.post("../controlador/existencia.php?op=selectUM", function (r) {
        $("#idUM").html(r);
        $("#idUM").select2();
        $("#idUM").append('<option disabled selected value="">Unidad Medida</option>');
        
    });

    $.post("../controlador/existencia.php?op=selectSubclase", function (r) {
        $("#idSubclaseUpdate").html(r);        
        $("#idSubclaseUpdate").select2();
        $("#idSubclase").Select2('refresh');


    });

    $.post("../controlador/existencia.php?op=selectUM", function (r) {
        $("#idUMUpdate").html(r);
        $("#idUMUpdate").select2();
        $("#idSubclase").Select2('refresh');


    });

}



function mostrar(idExistencia){

	$.ajax({
		data:{"idExistencia":idExistencia},
		url:'../controlador/existencia.php?op=mostrar',
		type:"post",
		beforeSend:function(){},
		success: function(response){

			console.log(response)
			data=$.parseJSON(response);
                $("#idExistenciaUpdate").val(data['idExistencia']);
				$("#idSubclaseUpdate").val(data['idSubclase']);
				$("#idUMUpdate").val(data['idUM']);
				$("#nombreUpdate").val(data['nombre']);	
		}
	})
}


function guardar() {
    
   
        idSubclase = $('#idSubclase').val();
        idUM = $('#idUM').val();
        nombre = $('#nombre').val();
        stockInicial = $('#stockInicial').val();
        precioActual = $('#precioActual').val();

        parametros={"idSubclase":idSubclase,"idUM":idUM,"nombre":nombre,"stockInicial":stockInicial,"precioActual":precioActual}
        $.ajax({
            data:parametros,
            type: 'POST',
            url: '../controlador/existencia.php?op=guardar',
            beforeSend:function(){},
		        success:function(response){
			    if(response == "success"){
				console.log(response);
                tabla.ajax.reload();
				$("#formularioregistro").modal("hide");
				toastr.success("Se guardo correctamente los datos","Registro exitoso");

                } else if (response =="requerid") {
                toastr.error("Complete todos los requeridos porfavor","Campos incompletos!");
                }    else {
                toastr.error("Comuniquese con su proveedor","Error!");
                }
		    }

        });
       
        tabla.ajax.reload();
    
}


function Actualizar(){
    idExistencia=$('#idExistenciaUpdate').val();
	idUM=$('#idUMUpdate').val();
	idSubclase=$('#idSubclaseUpdate').val();
	nombre=$('#nombreUpdate').val();
	parametros ={"idExistencia":idExistencia,"idUM":idUM,"idSubclase":idSubclase,"nombre":nombre}
	$.ajax({
		data: parametros,
		url: '../controlador/existencia.php?op=editar',
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

//funcion listar
function listar() {
    tabla = $('#tbllistado').DataTable({
        dom: '<"row"<"col-md-12"<"row"<"col-md-6"B><"col-md-6"f> > ><"col-md-12"rt> <"col-md-12"<"row"<"col-md-5"i><"col-md-7"p>>> >',
        buttons: {
            buttons: [
                { extend: 'copy', className: 'btn' },
                { extend: 'csv', className: 'btn' },
                { extend: 'excel', className: 'btn' },
                { extend: 'print', className: 'btn' }
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
            url: '../controlador/existencia.php?op=listar',
            type: "get",
            dataType: "json",
            error: function (e) {
                console.log(e.responseText);
            }
        },
        "bDestroy": true,

        "order": [[0, "desc"]]//ordenar (columna, orden)
    });
}





//funcion para desactivar
function confirmarEliminacion(idExistencia) {
	$('#desactivar').click(function(){
		swal({
			title: 'Esta seguro de eliminar el registro?',
			text: "Este registro se dara de baja hasta que se vuelva activar!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor:"#DD6B55", 
			confirmButtonText: 'si, Eliminalo!',
			cancelButtonText: 'No, cancelar!',
			closeOnConfirm:false,
			closeOnCancel:false

		},function(isConfirm) {
			if(isConfirm){
				swal("Eliminado","el registro fue eliminado","success");
				desactivar(idExistencia);
				tabla.ajax.reload();

			}else{
				swal("cancelado","el registro no fue eliminado","error");
			}
		});
	});
}


function desactivar(idExistencia) {
	$.ajax({
		data: { "idExistencia": idExistencia },
		url: '../controlador/existencia.php?op=desactivar',
		type: "POST",
		beforeSend: function () { }
		
	});
}

//funcion para desactivar
function confirmarActivacion(idExistencia) {

	$('#activar').click(function(){
		swal({
			title: 'Esta seguro de activar el registro?',
			text: "Este registro se activará",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor:"#002A52E", 
			confirmButtonText: 'si, Activalo!',
			cancelButtonText: 'No, cancelar!',
			closeOnConfirm:false,
			closeOnCancel:false

		},function(isConfirm) {
			if(isConfirm){
				swal("Activado","el registro fue activado","success");
				activar(idExistencia);
				tabla.ajax.reload();

			}else{
				swal("cancelado","el registro no fue activado","error");
			}
		});
	});

}
function activar(idExistencia) {
	$.ajax({
		data: { "idExistencia": idExistencia },
		url: '../controlador/existencia.php?op=activar',
		type: "POST",
		beforeSend: function () { }
	});
}
