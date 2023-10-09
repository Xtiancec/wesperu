var tabla;
init();
//funcion que se ejecuta al inicio
function init() {
    listar();

    $.post("../controlador/salida.php?op=selectExistencia", function (r) {
        // Load options into the #idExistencia select element
        $("#idExistencia").html(r);
        $("#idExistencia").select2();
        
        // Add a default option
        $("#idExistencia").prepend('<option disabled selected value="">Seleccione o escriba una existencia</option>');
        
        // Refresh the select2 plugin
        $("#idExistencia").trigger('change');
      
        // Call the calcularPrecioUltimo function with the selected value from #idExistencia
        let idExistencia = $("#idExistencia").val();
        calcularPrecioUltimo(idExistencia);
      
        const inputCosto = document.getElementById('costoUnitario');
      
        inputCosto.addEventListener('change', function () {
          // Aquí puedes usar la variable idExistencia
          calcularPrecioUltimo(idExistencia);
        });
      });
    

    $.post("../controlador/salida.php?op=selectOT", function (r) {
        $("#idOT").html(r);
        $("#idOT").select2();
        $("#idOT").append('<option disabled selected value="">seleccione o escriba la OT</option>');
        $("#idOT").select2('refresh');
    });

    $.post("../controlador/salida.php?op=selectTipoSalida", function (r) {
        $("#idTiposalida").html(r);
        $("#idTiposalida").select2();
        $("#idTiposalida").append('<option disabled selected value="">seleccione el tipo de salida</option>');
        $("#idTiposalida").select2('refresh');
    });

    $.post("../controlador/salida.php?op=selectEmpleado", function (r) {
        $("#idEmpleado").html(r);
        $("#idEmpleado").select2();
        $("#idEmpleado").append('<option disabled selected value="">Seleccione o escriba el empleado</option>');
        $("#idEmpleado").select2('refresh');
    });

    $.post("../controlador/salida.php?op=selectExistencia", function (r) {
        $("#idExistenciaUpdate").html(r);
        $("#idExistenciaUpdate").select2();
        $("#idExistenciaUpdate").append('<option disabled selected value="">seleccione o escriba una existencia</option>');
        $("#idExistenciaUpdate").select2('refresh');

    });
    $.post("../controlador/salida.php?op=selectOT", function (r) {
        $("#idOTUpdate").html(r);
        $("#idOTUpdate").select2();
        $("#idOTUpdate").append('<option disabled selected value="">seleccione o escriba la OT</option>');
        $("#idOTUpdate").select2('refresh');
    });

    $.post("../controlador/salida.php?op=selectTipoSalida", function (r) {
        $("#idTiposalidaUpdate").html(r);
        $("#idTiposalidaUpdate").select2();
        $("#idTiposalidaUpdate").append('<option disabled selected value="">seleccione el tipo de salida</option>');
        $("#idTiposalidaUpdate").select2('refresh');
    });

    $.post("../controlador/salida.php?op=selectEmpleado", function (r) {
        $("#idEmpleadoUpdate").html(r);
        $("#idEmpleadoUpdate").select2();
        $("#idEmpleadoUpdate").append('<option disabled selected value="">Seleccione o escriba el empleado</option>');
        $("#idEmpleadoUpdate").select2('refresh');
    });


}


$(document).ready(function () {
    $("#idExistencia").on("change", function () {
      // Obtener el valor seleccionado de #idExistencia
      var idExistencia = $(this).val();
  
      $.ajax({
        data: { "idExistencia": idExistencia },
        url: '../controlador/salida.php?op=calcularPrecioUltimo',
        type: "POST",
        async: false,
        beforeSend: function () {},
        success: function (data) {
          // Parsear la respuesta JSON
          data = $.parseJSON(data);
          // Establecer el valor en #costoUnitario
          $("#costoUnitario").val(data.precioActual);
        },
        error: function (error) {
          // Maneja los errores aquí, por ejemplo, muestra un mensaje al usuario
          console.error(error);
          toastr.error("No se pudo obtener el precio actual", "Error");
        }
      });
    });
  });

function calcularPrecioUltimo(idExistencia) {
    var data = null;
    $.ajax({
        data: {"idExistencia": idExistencia},
        url: '../controlador/salida.php?op=calcularPrecioUltimo',
        type: "POST",
        async: false,
        beforeSend: function() {},
        success: function(data){
            $("#costoUnitario").val(data.precioActual);
        },
        error: function(error) {
            // Maneja los errores aquí, por ejemplo, muestra un mensaje al usuario
            console.error(error);
            toastr.error("No se pudo obtener el precio actual", "Error");
        }
    });
    return data;
}

function guardar(){
    var idExistencia = $('#idExistencia').val();
    var idTiposalida = $('#idTiposalida').val();
    var idOT = $('#idOT').val();
    var idEmpleado = $('#idEmpleado').val();
    var fecha = $('#fecha').val();
    var cantidad = $('#cantidad').val();
    var subTotal = $('#subTotal').val();

    // Realizar la llamada AJAX para obtener el costoUnitario de forma sincrónica
    var costoUnitario = $('#costoUnitario').val();


        var parametros = {
            "idExistencia": idExistencia,
            "idTiposalida": idTiposalida,
            "idOT": idOT,
            "idEmpleado": idEmpleado,
            "fecha": fecha,
            "cantidad": cantidad,
            "costoUnitario": costoUnitario,
            "subTotal": subTotal
        };

        $.ajax({
            data: parametros,
            url: '../controlador/salida.php?op=guardar',
            type: "POST",
            beforeSend:function(){},
            success:function(response){
                if(response == "success"){
                    $("#formularioregistro").modal("hide");
                    toastr.success("Se guardo correctamente los datos", "Registro exitoso");
                } else if(response == "requerid") {
                    toastr.error("Complete los campos requeridos", "Campos incompletos");
                } else {
                    toastr.error("Comuníquese con el- proveedor", "ERROR");
                }
            },
            error: function(error) {
                console.error(error);
            },
            complete: function() {
                tabla.ajax.reload();
            }
        });
    }

document.addEventListener('DOMContentLoaded', function () {
    let prec = document.getElementById('costoUnitario');
    let cant = document.getElementById('cantidad');
    let total = document.getElementById('subTotal');
    prec.addEventListener('input', calcular);
    cant.addEventListener('input', calcular);

    function calcular() {
        let valorprecio = parseFloat(prec.value);
        let valorcant = parseFloat(cant.value);
    
        if (!isNaN(valorcant) && !isNaN(valorprecio)) {
            let resultado = valorcant * valorprecio;
            total.value = resultado.toFixed(2);
        } else {
            total.value = '';
        }
    }
});








document.addEventListener('DOMContentLoaded', function () {
    let idExistencia = document.getElementById('idExistencia');
    let costoUnitario = document.getElementById('costoUnitario');
    
    idExistencia.addEventListener('input', function () {
        calcularPrecioUltimo(idExistencia.value);
    });

    function calcularPrecioUltimo(idExistencia) {
        $.ajax({
            data: { "idExistencia": idExistencia },
            url: '../controlador/salida.php?op=calcularPrecioUltimo',
            type: "POST",
            async: false,
            beforeSend: function () { },
            success: function (response) {
                let data = $.parseJSON(response);
                costoUnitario.value = data['precioActual']; // Asigna el valor directamente
            },
            error: function (error) {
                // Maneja los errores aquí, por ejemplo, muestra un mensaje al usuario
                console.error(error);
                toastr.error("No se pudo obtener el precio actual", "Error");
            }
        });
    }
});


function ingresoStock() {

}
//funcion listar
function listar() {

    tabla = $('#tbllistado').dataTable({
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
            url: '../controlador/salida.php?op=listar',
            type: "get",
            dataType: "json",
            error: function (e) {
                console.log(e.responseText);
            }
        },
        "columnDefs": [
            {
                "targets": 7, // Indica la columna "Monto"
                "render": function (data, type, row) {
                    return 'S/ ' + parseFloat(data).toFixed(2); // Agrega el símbolo y formatea el número
                }
            },
            {
                "targets": 8, // Indica la columna "Monto"
                "render": function (data, type, row) {
                    return 'S/ ' + parseFloat(data).toFixed(2); // Agrega el símbolo y formatea el número
                }
            }
        ],
        "bDestroy": true,

        "order": [[0, "desc"]]//ordenar (columna, orden)
    }).DataTable();
}



function mostrar(idSalida) {

    $.ajax({
        data: { "idSalida": idSalida },
        url: '../controlador/salida.php?op=mostrar',
        type: "post",
        beforeSend: function () { },
        success: function (response) {
            console.log(response)
            data = $.parseJSON(response);
            $("#idSalidaUpdate").val(data['idSalida']);
            $("#idExistenciaUpdate").val(data['idExistencia']);
            $("#idTiposalidaUpdate").val(data['idTiposalida']);
            $("#idOTUpdate").val(data['idOT']);
            $("#idEmpleadoUpdate").val(data['idEmpleado']);
            $("#fechaUpdate").val(data['fecha']);
            $("#cantidadUpdate").val(data['cantidad']);
            $("#costoUnitarioUpdate").val(data['costoUnitario']);
            $("#subTotalUpdate").val(data['subTotal']);
        }
    })
}



function Actualizar() {
    idSalida = $('#idSalidaUpdate').val();
    idExistencia = $('#idExistenciaUpdate').val();
    idTiposalida = $('#idTiposalidaUpdate').val();
    idOT = $('#idOTUpdate').val();
    idEmpleado = $('#idEmpleadoUpdate').val();
    fecha = $('#fechaUpdate').val();
    cantidad = $('#cantidadUpdate').val();
    costoUnitario = $('#costoUnitarioUpdate').val();
    subTotal = $('#subTotalUpdate').val();

    parametros = {
        "idSalida": idSalida,
        "idExistencia": idExistencia,
        "idTiposalida": idTiposalida,
        "idOT": idOT,
        "idEmpleado": idEmpleado,
        "fecha": fecha,
        "cantidad": cantidad,
        "costoUnitario": costoUnitario,
        "subTotal": subTotal
    }

    $.ajax({
        data: parametros,
        url: '../controlador/salida.php?op=editar',
        type: "POST",
        beforeSend: function () { },
        success: function (response) {
            console.log(response);
            if (response == "success") {
                tabla.ajax.reload();
                $("#formularioActualizar").modal("hide");
            } else if (response == "requerid") {
                toastr.error("Complete los datos por favor", "Datos incompletos");
            } else {
                toastr.error("Comuníquese con el administrador", "ERROR");
            }
        }
    });
}




