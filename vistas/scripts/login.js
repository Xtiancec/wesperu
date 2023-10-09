$("#loginform").on('submit', function(e)
{
	e.preventDefault();
	logina=$("#logina").val();
	clavea=$("#clavea").val();

	$.post("../controlador/usuario.php?op=verificar",
        {"Usuarioa":Usuarioa, "passworda":passworda},
        function(data)
        {
           if (data!="null")
            {
            	$(location).attr("href","index.php");
            }else{
            	bootbox.alert("Usuario y/o Password incorrectos");
            }
        });
})