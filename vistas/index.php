<?php

include "layout/header.php";

include "layout/navbar.php";
include "layout/sidebar.php";
require_once "../modelos/Consultas.php";
    $consulta = new Consultas();
    $rsptac = $consulta->totalcomprahoy();
    $regc=$rsptac->fetch_object();
    $totalc=$regc->total_de_ingresos_hoy;


    $rsptacm = $consulta->ingresosmes();
    $regcm=$rsptacm->fetch_object();
    $totalcm=$regcm->ingresoMes;

    $rsptaAnual = $consulta->ingresoAnual();
    $regAnual=$rsptaAnual->fetch_object();
    $totalAnual=$regAnual->ingresoAnual;

    $rsptaSemanal = $consulta->ingresoSemanal();
    $regSemanal=$rsptaSemanal->fetch_object();
    $totalSemanal=$regSemanal->ingresoSemanal;
    
?>

            <!-- ============================================================== -->
            <!-- Container fluid  -->
            <!-- ============================================================== -->
    
            <!-- ============================================================== -->
            <!-- Bread crumb and right sidebar toggle -->
            <!-- ============================================================== -->
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h3 class="text-themecolor">INDICADORES ALMACEN</h3>
                </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.php">Inicio</a></li>
                        <li class="breadcrumb-item">DASHBOARD</li>
                        <li class="breadcrumb-item active">Consultas Almacen</li>
                    </ol>
                </div>
                <div class="">
                    <button class="right-side-toggle waves-effect waves-light btn-inverse btn btn-circle btn-sm pull-right m-l-10"><i class="ti-settings text-white"></i></button>
                </div>
            </div>
            <!-- ============================================================== -->
            <!-- End Bread crumb and right sidebar toggle -->
            <!-- ============================================================== -->
            
                <!-- ============================================================== -->
                <!-- Stats box -->
                <!-- ============================================================== -->
                <div class="row">
                    <div class="col-lg-3">
                        <div class="card bg-info">
                            <div class="card-body">

                                <div class="d-flex no-block">

                                    <div class="align-self-center">
                                         
                                        <h3 class="text-white m-t-10 m-b-0">Ingresos de Existencias Hoy</h3>
                                        <h2 class="m-t-0 text-white">S/. <?php echo $totalc; ?> </h2></div>
                                        <i class="fa fa-arrow-up display-5 op-3 text-dark"></i>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="card bg-success">
                            <div class="card-body">
                                <div class="d-flex no-block">
                                    <div class="align-self-center">
                                        <h3 class="text-white m-t-10 m-b-0">Salidas de Existencias hoy</h3>
                                        <h2 class="m-t-0 text-white">S/. 1,000</h2></div>
                                        <i class="fa fa-arrow-down display-5 op-3 text-dark"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="card bg-primary">
                            <div class="card-body">
                                <div class="d-flex no-block">
                                    <div class="align-self-center">
                                        <h3 class="text-white m-t-10 m-b-0">Total Compras Mes Actual</h3>
                                        <h2 class="m-t-0 text-white">S/. <?php echo $totalcm; ?></h2></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="card bg-danger">
                            <div class="card-body">
                                <div class="d-flex no-block">
                                    <div class="align-self-center">
                                        <h3 class="text-white m-t-10 m-b-0">Total Salidas Mes Actual</h3>
                                        <h2 class="m-t-0 text-white">S/. 74 ,563</h2></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ============================================================== -->
                <!-- Sales overview chart -->
                <!-- ============================================================== -->
                <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex">
                                    <div>
                                        <h3 class="card-title m-b-5"><span class="lstick"></span>Compras de Existencias por mes </h3>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="bg-theme stats-bar">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4">
                                        <div class="p-20 active">
                                            <h6 class="text-white">Este Año</h6>
                                            <h3 class="text-white m-b-0">S/. <?php echo $totalAnual; ?></h3>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4">
                                        <div class="p-20">
                                            <h6 class="text-white">Este Mes</h6>
                                            <h3 class="text-white m-b-0">S/. <?php echo $totalcm; ?></h3>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4">
                                        <div class="p-20">
                                            <h6 class="text-white">Esta Semana</h6>
                                            <h3 class="text-white m-b-0">S/. <?php echo $totalSemanal; ?></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="consultaIngresos" class="p-relative" style="height:330px;"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex">
                                    <div>
                                        <h3 class="card-title m-b-5"><span class="lstick"></span>Salidas por mes </h3>
                                    </div>
                                    <div class="ml-auto">
                                        <select class="custom-select b-0">
                                            <option selected="">Enero 2023</option>
                                            <option value="1">Febrero 2023</option>
                                            <option value="2">Marzo 2023</option>
                                            <option value="3">Abril 2023</option>
                                            <option value="4">Mayo 2023</option>
                                            <option value="5">Junio 2023</option>
                                            <option value="6">Julio 2023</option>
                                            <option value="7">Agosto 2023</option>
                                            <option value="8">Setiembre 2023</option>
                                            <option value="9">Octubre 2023</option>
                                            <option value="10">Noviembre 2023</option>
                                            <option value="11">Diciembre 2023</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-theme stats-bar">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4">
                                        <div class="p-20 active">
                                            <h6 class="text-white">Total Sales</h6>
                                            <h3 class="text-white m-b-0">$10,345</h3>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4">
                                        <div class="p-20">
                                            <h6 class="text-white">This Month</h6>
                                            <h3 class="text-white m-b-0">$7,589</h3>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4">
                                        <div class="p-20">
                                            <h6 class="text-white">This Week</h6>
                                            <h3 class="text-white m-b-0">$1,476</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="consultaSalidas" class="p-relative" style="height:330px;"></div>
                            </div>
                        </div>
                    </div>

                </div>
                 
                <div class="row">
 <!-- ============================================================== -->
                    <!-- visit charts-->
                    <!-- ============================================================== -->
                    <div class="col-lg-6 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"><span class="lstick"></span>Clases de Existencias</h4>
                                <div id="claseExistencia" style="height:280px; width:100%;"></div>
                                <table class="table vm font-14 m-b-0">
                                    <tr>
                                        <td class="b-0">Materia Prima</td>
                                        <td class="text-right font-medium b-0">38.5%</td>
                                    </tr>
                                    <tr>
                                        <td>Consumibles</td>
                                        <td class="text-right font-medium">30.8%</td>
                                    </tr>
                                    <tr>
                                        <td>EPP</td>
                                        <td class="text-right font-medium">7.7%</td>
                                    </tr>
                                    <tr>
                                        <td>Otros</td>
                                        <td class="text-right font-medium">23.1%</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                
                    <!-- ============================================================== -->
                    <!-- visit charts-->
                    <!-- ============================================================== -->
                    <div class="col-lg-6 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"><span class="lstick"></span>Visit Separation</h4>
                                <div id="visitor" style="height:280px; width:100%;"></div>
                                <table class="table vm font-14 m-b-0">
                                    <tr>
                                        <td class="b-0">Mobile</td>
                                        <td class="text-right font-medium b-0">38.5%</td>
                                    </tr>
                                    <tr>
                                        <td>Tablet</td>
                                        <td class="text-right font-medium">30.8%</td>
                                    </tr>
                                    <tr>
                                        <td>Desktop</td>
                                        <td class="text-right font-medium">7.7%</td>
                                    </tr>
                                    <tr>
                                        <td>Other</td>
                                        <td class="text-right font-medium">23.1%</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
               
                   

               
                <!-- ============================================================== -->
                <!-- Subscribe -->
                <!-- ============================================================== -->
                <div class="row">
                    <div class="col-lg-4">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card bg-success text-white">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="stats">
                                                <h1 class="text-white">9062+</h1>
                                                <h6 class="text-white">Subscribe</h6>
                                                <button class="btn btn-rounded btn-outline btn-light m-t-10 font-14">Check list</button>
                                            </div>
                                            <div class="stats-icon text-right ml-auto"><i class="fa fa-envelope display-5 op-3 text-dark"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="card bg-primary text-white">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="stats">
                                                <h1 class="text-white">6509+</h1>
                                                <h6 class="text-white">Facebook Likes</h6>
                                                <button class="btn btn-rounded btn-outline btn-light m-t-10 font-14">Check list</button>
                                            </div>
                                            <div class="stats-icon text-right ml-auto"><i class="fa fa-facebook display-5 op-3 text-dark"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="card bg-info text-white">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="stats">
                                                <h1 class="text-white">3257+</h1>
                                                <h6 class="text-white">Twitter Followers</h6>
                                                <button class="btn btn-rounded btn-outline btn-light m-t-10 font-14">Check list</button>
                                            </div>
                                            <div class="stats-icon text-right ml-auto"><i class="fa fa-twitter display-5 op-3 text-dark"></i></div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex">
                                    <h4 class="card-title"><span class="lstick"></span>Website Visit</h4>
                                    <ul class="list-inline m-b-0 ml-auto">
                                        <li>
                                            <h6 class="text-muted text-success"><i class="fa fa-circle font-10 m-r-10 "></i>Site A view</h6> </li>
                                        <li>
                                            <h6 class="text-muted text-info"><i class="fa fa-circle font-10 m-r-10"></i>Site B view</h6> </li>
                                    </ul>
                                </div>
                                <div class="text-center m-t-30">
                                    <div class="btn-group " role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-sm btn-secondary">PAGEVIEWS</button>
                                        <button type="button" class="btn btn-sm btn-secondary">REFERRALS</button>
                                    </div>
                                </div>
                                <div class="website-visitor p-relative m-t-30" style="height:355px; width:100%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ============================================================== -->
                <!-- Projects of the month -->
                <!-- ============================================================== -->

                <!-- ============================================================== -->
                <!-- End Right sidebar -->
                <!-- ============================================================== -->
            
            <!-- ============================================================== -->
            <!-- End Container fluid  -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- footer -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- End footer -->
            <!-- ============================================================== -->
  




    <?php
    include "layout/footer.php";

    ?>

    <script>
        new Chartist.Line('#consultaSalidas', {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul','Ago','Set','Oct','Nov','Dic']
        , series: [
          {meta:"Salidas (S/.)", data: [
            150,
            200, 
            44, 
            60, 
            405,
            300, 
            134, 
            210, 
            280, 
            150, 
            250, 
            500]}
      ]
    }, {
        low: 0
        , high:600
        , showArea: true
        , divisor: 10
        , lineSmooth:false
        , fullWidth: true
        , showLine: true
        , chartPadding: 30
        , axisX: {
            showLabel: true
            , showGrid: false
            , offset: 50
        }
        , plugins: [
        	Chartist.plugins.tooltip()
      	], 
      	// As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
        axisY: {
        	onlyInteger: true
            , showLabel: true
            , scaleMinSpace: 50 
            , showGrid: true
            , offset: 10,
            labelInterpolationFnc: function(value) {
		      return (value / 100) + 'k'
		    },

        }
        
    });
    </script>

<?php
$consulta = new Consultas();

$rsptaEnero = $consulta->ingresoEnero();
$regEnero=$rsptaEnero->fetch_object();
$totalEnero=$regEnero->ingresoEnero;

$rsptaFebrero = $consulta->ingresoFebrero();
$regFebrero=$rsptaFebrero->fetch_object();
$totalFebrero=$regFebrero->ingresoFebrero;

$rsptaMarzo = $consulta->ingresoMarzo();
$regMarzo=$rsptaMarzo->fetch_object();
$totalMarzo=$regMarzo->ingresoMarzo;

$rsptaAbril = $consulta->ingresoAbril();
$regAbril=$rsptaAbril->fetch_object();
$totalAbril=$regAbril->ingresoAbril;

$rsptaMayo = $consulta->ingresoMayo();
$regMayo=$rsptaMayo->fetch_object();
$totalMayo=$regMayo->ingresoMayo;

$rsptaJunio = $consulta->ingresoJunio();
$regJunio=$rsptaJunio->fetch_object();
$totalJunio=$regJunio->ingresoJunio;

$rsptaJulio = $consulta->ingresoJulio();
$regJulio=$rsptaJulio->fetch_object();
$totalJulio=$regJulio->ingresoJulio;

$rsptaAgosto = $consulta->ingresoAgosto();
$regAgosto=$rsptaAgosto->fetch_object();
$totalAgosto=$regAgosto->ingresoAgosto;

$rsptaSetiembre = $consulta->ingresoSetiembre();
$regSetiembre=$rsptaSetiembre->fetch_object();
$totalSetiembre=$regSetiembre->ingresoSetiembre;

$rsptaOctubre = $consulta->ingresoOctubre();
$regOctubre=$rsptaOctubre->fetch_object();
$totalOctubre=$regOctubre->ingresoOctubre;

$rsptaNoviembre = $consulta->ingresoNoviembre();
$regNoviembre=$rsptaNoviembre->fetch_object();
$totalNoviembre=$regNoviembre->ingresoNoviembre;


$rsptaDiciembre = $consulta->ingresoDiciembre();
$regDiciembre=$rsptaDiciembre->fetch_object();
$totalDiciembre=$regDiciembre->ingresoDiciembre;



?>

<script>
    
        new Chartist.Line('#consultaIngresos', {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre']
        , series: [
          {meta:"Ingresos (S/)", data: 
            [ 
            <?php echo $totalEnero; ?>, 
            <?php echo $totalFebrero; ?>,
            <?php echo $totalMarzo; ?>,
            <?php echo $totalAbril; ?>,
            <?php echo $totalMayo; ?>,
            <?php echo $totalJunio; ?>,
            <?php echo $totalJulio; ?>,
            <?php echo $totalAgosto; ?>,
            <?php echo $totalSetiembre; ?>,
            <?php echo $totalOctubre; ?>,
            <?php echo $totalNoviembre; ?>,
            <?php echo $totalDiciembre; ?>
        ]}
      ]
    }, {
        low: 0
        , high:50000
        , showArea: true
        , divisor: 10
        , lineSmooth:false
        , fullWidth: true
        , showLine: true
        , chartPadding: 30
        , axisX: {
            showLabel: true
            , showGrid: false
            , offset: 50
        }
        , plugins: [
        	Chartist.plugins.tooltip()
      	], 
      	// As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
        axisY: {
        	onlyInteger: true
            , showLabel: true
            , scaleMinSpace: 50 
            , showGrid: true
            , offset: 10
           

        }
        
    });


    // Visitor
    // ============================================================== 
    
    var chart = c3.generate({
        bindto: '#claseExistencia',
        data: {
            columns: [
                ['Other', 30],
                ['EPP', 10],
                ['Consumibles', 40],
                ['Materia Prima', 50],
            ],
            
            type : 'donut',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
            label: {
                show: false
              },
            title:"Clases",
            width:20,
            
        },
        
        legend: {
          hide: true
          //or hide: 'data1'
          //or hide: ['data1', 'data2']
        },
        color: {
              pattern: ['#eceff1', '#745af2', '#26c6da', '#1e88e5']
        }
    });
    </script>