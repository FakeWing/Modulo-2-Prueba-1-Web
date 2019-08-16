
function limpiar(){
    $(".divH").hide();
    $("#comment").val("");

}



function inicio() {

    $('input[name="opt"]').click(function(){
        limpiar();
        if($("#op4").is(":checked")){
            $(".divH").show();
        }
    });

    $("#frm").validate({
        rules: {
            rut : {required: true, rut: true},
            nombre : {required: true},
            email: {required: true, email: true},
            telefono: {required: true,  range: [900000000, 999999999 ]},
            opt: { required: true},
            consulta: {required: true},
            comment: {required: true},
        },    
        messages: {
            rut: {required : "Obligatorio"},
            nombre: {required : "Obligatorio"},
            email: {required : "Ingrese Email valido"},
            telefono: {required: "Ingrese un Numero valido"},

            opt: {required : "Indiquenos su actividad"},
            consulta: {required: "Indique el tipo de su consulta"},
            comment: {required:"Rellene el campo de texto"},
          
        }
    });

    jQuery.validator.addMethod(
        "rut", function(value, element){
            return this.optional(element) || validaRut(value);
        }, "Rut no valido");
}


function validaRut(txtrut) {
    if (txtrut.length == 0) { return false; }
    if (txtrut.length < 8) { return false; }

    txtrut = txtrut.replace('-', '');
    txtrut = txtrut.replace(/\./g, '');
    var suma = 0;
    var caracteres = "1234567890kK";
    var contador = 0;
    var u = '';
    for (var i = 0; i < txtrut.length; i++) {
        u = txtrut.substring(i, i + 1);
        if (caracteres.indexOf(u) != -1)
            contador++;
    }

    if (contador == 0) { return false }
    var rut = txtrut.substring(0, txtrut.length - 1)
    var drut = txtrut.substring(txtrut.length - 1)
    var dvr = '0';
    var factor = 2;
    for (i = rut.length - 1; i >= 0; i--) {
        suma = suma + rut.charAt(i) * factor
        if (factor == 7) { factor = 2; }
        else factor++
    }

    res = suma % 11
    if (res == 1) dvr = 'k'
    else if (res == 0) dvr = '0'
    else {
        dvi = 11 - res;
        dvr = dvi + "";
    }
    if (dvr != drut.toLowerCase()) { return false; }
    else { return true; }
}