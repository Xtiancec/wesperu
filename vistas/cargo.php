<?php
//activamos almacenamiento en el buffer



require 'layout/header.php';
require 'layout/navbar.php';
require 'layout/sidebar.php';
?>

<div class="row page-titles">
    <div class="col-md-5 align-self-center">
        <h3 class="text-themecolor">Gestionar Cargos</h3>
    </div>
    <div class="col-md-7 align-self-center">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.php">Inicio</a></li>
            <li class="breadcrumb-item">Configuracion</li>
            <li class="breadcrumb-item active">Cargos</li>
        </ol>
    </div>
    <div>
        <button class="right-side-toggle waves-effect waves-light btn-inverse btn btn-circle btn-sm pull-right m-l-10"><i class="ti-settings text-white"></i></button>
    </div>
</div>
<!-- ============================================================== -->
<!-- End Bread crumb and right sidebar toggle -->
<!-- ============================================================== -->

<!-- ============================================================== -->
<!-- Start Page Content -->
<!-- ============================================================== -->
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                
                <div id="accordionBasic" class="widget-header">
                    <div class="row">
                        <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                            <h4>Administrar Cargos</h4>
                        </div>
                    </div>
                </div>
                        <!-- Button trigger modal -->
                        <div class="text-left">
                            <button type="button" class="btn btn-primary mb-2 mr-2" data-toggle="modal" data-target="#formularioregistros">
                                Agregar un Cargo
                            </button>
                        </div>
                        <div class="table-responsive mb-4 mt-4" id="listadoregistros">
                            <table id="tbllistado" class="table table-striped table-bordered table-condensed table-hover">
                                <thead>
                                    <th width="10%">ID</th>
                                    <th width="25%">Area</th>
                                    <th width="25%">Cargo</th>
                                    <th width="30%">Estado</th>
                                    <th width="10%">Opciones</th>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>


                        <!--  Guardar Modal -->
                        <div class="modal fade" id="formularioregistros" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Agregar el cargo</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>

                                    <div class="modal-body">
                                        <form action="" name="formulario" id="formulario" method="POST">
                                            <div class="row">
                                                <div class="form-group col-lg-12 col-md-12 col-xs-12">
                                                    <label for=""> Area</label>
                                                    <select id="idArea" class="select2 form-control custom-select"  style="width:100%; height:100%;" > 
                                                        
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="form-group col-lg-12 col-md-12 col-xs-12">
                                                    <label for=""> Cargo</label>
                                                    <input class="form-control" type="hidden" id="idCargo" nombre="idCargo">
                                                    <input class="form-control" type="text" id="nombre" nombre="nombre" maxlength="50" placeholder="Nombre del cargo" required>
                                                </div>
                                            </div>




                                            <button type="submit" class="btn btn-primary"  onclick="guardar();">Guardar</button>
                                            <button class="btn" data-dismiss="modal"><i class="flaticon-cancel-12"></i>Cancelar</button>

                                        </form>
                                    </div>
                                    <div class="modal-footer">

                                    </div>

                                </div>
                            </div>
                        </div>

                        <!--  Actualizar Modal -->
                        <div class="modal fade" id="formularioActualizar"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Actualizar Cargo</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>

                                    <div class="modal-body">
                                        <form action="" name="formActualizar" id="formActualizar" method="POST">
                                        <div class="row">
                                                <div class="form-group col-lg-12 col-md-12 col-xs-12">
                                                    <label for=""> Area</label>
                                                    <select id="idAreaUpdate" class="select2 form-control custom-select"  style="width:100%; height:100%;" > 
                                                        
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="form-group col-lg-12 col-md-12 col-xs-12">
                                                    <label for=""> Cargo</label>
                                                    <input class="form-control" type="hidden" id="idCargoUpdate" nombre="idCargoUpdate">
                                                    <input class="form-control" type="text" id="nombreUpdate" nombre="nombreUpdate" maxlength="50" placeholder="Nombre del cargo" required>
                                                </div>
                                            <button type="submit" class="btn btn-primary actualizar" onclick="Actualizar();" >Guardar Cambios</button>
                                            <button class="btn" data-dismiss="modal"><i class="flaticon-cancel-12"></i>Cancelar</button>

                                        </form>
                                    </div>


                                    <div class="modal-footer">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

<?php
require 'layout/footer.php';
?>
<script src="scripts/cargo.js">
</script>
<?php
?>