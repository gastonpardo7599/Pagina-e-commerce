var articulosArray = [];
var cambioADolar = 0.025
let envio ={
    premium: 1.15,
    express: 1.07,
    standard: 1.05
}

function showArticulosCarrito(array){
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++){
        let article = array[i];

        if(article.currency === "UYU"){

             article.unitCost = cambioADolar * article.unitCost 
        }
        
        htmlContentToAppend += `<div class="container mb-4">
        <div class="row">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" class="tabla"> </th>
                                <th scope="col" class="tabla">Producto</th>
                                <th scope="col" class="tabla" type="number">Cantidad</th>
                                <th scope="col" class="tabla">Precio (USD)</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="tabla"><img src="` + article.src + `" / class="imagen_carrito"> </td>
                                <td class="tabla">` + article.name + `</td>
                                <td class="tabla"><label id="label-cantidad` + i + `"></label> <input id="cantidad` + i + `" type="number" class="form-control" value="` + article.count + `"></td>
                                <td class="tabla">` + article.unitCost + `</td>
                                <td class="tabla"></td>
                                </tr>
                                <tr>
                                <td colspan="4"></td>
                            </tr>
                        </tbody>
                    </table>    
                </div>
                <p id="sub">SUBTOTAL (USD) : <span id="subtotal` + i + `"></span></p>
            </div>
        </div>                            `
        
    }

    document.getElementById("carrito").innerHTML = htmlContentToAppend;
    

}



function compraExitosa(){
    if (document.getElementById("direccionEnvio").value === "" ){
        alert ("Completar datos de envio")
    } else {
        mensaje = alerta.msg
        alert(mensaje)
    }
}

function envioTotal(tipoenvio){
    subtotales = document.getElementById("subtotales").textContent
    total = subtotales * tipoenvio 
    document.getElementById("totales").innerHTML = total.toFixed(2)
    document.getElementById("porcentaje").innerHTML = (tipoenvio * 100 - 100).toFixed(0)
    
}

function validar(event){


let creditInput = document.getElementById("numero-tarjeta").value;
let creditExpress = /^\d{16}$/;
let cvvInput = document.getElementById("cvv").value;
let cvvExpress = /^\d{3}$/;
let monthInput = document.getElementById("mesVencimiento").value;
let monthExpress = /^(0[1-9])|(1[0-2])$/;
let yearInput = document.getElementById("añoVencimiento").value;
let yearExpress = /^\d{4}$/;
let bancariaInput = document.getElementById("nroCuenta").value;
let bancariaExpress = /^\d{7}$/;

if (!creditExpress.test(creditInput)){
    alert("Información invalida. Deben ser 16 dígitos");
    document.getElementById("numero-tarjetaCheck").innerHTML = "❌"
    event.preventDefault();
} else {
    document.getElementById("numero-tarjetaCheck").innerHTML = "✅"
}
if (!cvvExpress.test(cvvInput)){
    alert("Información invalida. Deben ser 3 dígitos");
    document.getElementById("cvvCheck").innerHTML = "❌"
    event.preventDefault();
} else {
    document.getElementById("cvvCheck").innerHTML = "✅"
}
if (!monthExpress.test(monthInput)){
    alert("Información invalida. Debe seleccionar un mes");
    event.preventDefault();
} 
if (!yearExpress.test(yearInput)){
    alert("Información invalida. Debe seleccionar un año");
    document.getElementById("añoVencimientoCheck").innerHTML = "❌"
    event.preventDefault();
} else {
    document.getElementById("añoVencimientoCheck").innerHTML = "✅"
    return true
}

}

function validar1(event){
    let bancariaInput = document.getElementById("nroCuenta").value;
    let bancariaExpress = /^\d{7}$/;

    if (!bancariaExpress.test(bancariaInput)){
        alert("Información invalida. Debe ingresar 7 digitos");
        event.preventDefault();
    } else {
        return true
    }

}



document.addEventListener("DOMContentLoaded", function (e) {
    
    getJSONData(CART_2).then(function(resultObj){
        
        if (resultObj.status === "ok");
        {
            articulosArray = resultObj.data.articles;
            showArticulosCarrito(articulosArray);
           
        }

        function sumatoriaTotal(){
            var total = 0;
            for (let i=0; i<articulosArray.length;i++){
                total += parseInt(document.getElementById("subtotal"+ i).textContent); 
            }
            document.getElementById("subtotales").innerHTML = total;
        }
        
        function costo() {
            for (let i=0; i<articulosArray.length;i++){
                var cantidad = document.getElementById("cantidad" + i).value;
                var article = articulosArray[i];
            var precio   = article.unitCost;
            var cuenta = parseInt(cantidad) * precio;
            document.getElementById("subtotal"+i).textContent = cuenta;
                
            }         
            
            sumatoriaTotal();
            
        
        }

        for (let i=0; i<articulosArray.length;i++){
            document.getElementById("cantidad"+i).addEventListener("change",costo)
        }

        
       
    });
    getJSONData(CART_BUY_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            alerta = resultObj.data
        }
    });

})

function guardarCambios(){
    console.log(document.getElementById("mes-tarjeta").value)
    if ((!document.getElementById("propietario").value == "") && (!document.getElementById("numero-tarjeta").value == "") && (!document.getElementById("cvv").value == "") && (!document.getElementById("mes-tarjeta").value == "00") && (!document.getElementById("año-tarjeta").value == "00")) {
        window.location.href = "cart.html"
    } else {
        alert ("llenar bien los datos")
    }
}

