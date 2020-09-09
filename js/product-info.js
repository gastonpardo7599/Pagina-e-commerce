//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productInfoArray = [];
var productComentary = [];
let parametros = new URLSearchParams(window.location.search);
let name = parametros.get('producto');


function showProductInfo(array){

    let htmlContentToAppend = "";
        
        htmlContentToAppend += `
        <div class="product_info_principal">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="nombre_auto" id="nombre_producto_info"> ` + name + ` </h4>
                    </div>    
                    <div>
                        <img src="` + array.images[3] + `" id="imagen_principal">
                    </div>
                    <div class="precio">` + array.cost +` `+ array.currency +`</div>
                    <div id="descripcion" class="descripcion_product_info">`+ array.description +`</div>
                    <h2 id="galeria_imagenes"> Galería de imagenes </h2>

                </div>
            </div>
        </div>
        `
    let htmlContentToAppendImages = ""   
    
    for(let i = 0; i < array.images.length; i++){
        let productImage = array.images[i];
    

        htmlContentToAppendImages += `
        
        <div>
            <div class="row">
                <div class="col-3">
                    <img src="` + productImage + `"  class="imagenesgaleria" >
                </div>
            </div>
        </div>
  
        ` 

        document.getElementById("car-list-container").innerHTML = htmlContentToAppend + htmlContentToAppendImages;

}
}

document.addEventListener("DOMContentLoaded", function(e){
    showSpinner();
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productInfoArray = resultObj.data;
            showProductInfo(productInfoArray);
        }
    hideSpinner();
    });
});


function showComentary(array){

    let htmlContentToAppendComentaryTitle = "";
       
        htmlContentToAppendComentaryTitle = `
        <h1 id="titulo_Comentario"> Comentarios </h1>
        `

    let htmlContentToAppendComentary = "";
    for(let i = 0; i < array.length; i++)    

        htmlContentToAppendComentary += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div>
                    <span class="fa fa-star checked">` + array[i].score + `</span>
                    </div>
                    <p >` + array[i].description + `</p>
                    <div>` + "User:" + " " +`` + array[i].user +`</div>
                    <div>`+ array[i].dateTime +`</div>
                </div>
            </div>
        </div>
        `
        
        document.getElementById("car2-list-container").innerHTML = htmlContentToAppendComentaryTitle + htmlContentToAppendComentary;
}




document.addEventListener("DOMContentLoaded", function(e){
    showSpinner();
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productComentary = resultObj.data;
            showComentary(productComentary);
        }
    hideSpinner();
    });
});

function dejarComentario(){
    let htmlContentToAppendNewComentary = `
    <form>
        <fieldset>
            <label for="User">User:</label>
            <input type="text" name="usuario" id="User" required>
        </fieldset>
        <fieldset>
            <label for="Rating">Puntuacion:</label>
            <input type="number" name="puntuacion" id="Rating" required>
        </fieldset>
        <fieldset>
            <label for="Nuevo_comentario">Comentario:</label>
            <textarea name="opinion" id="Nuevo_comentario" placeholder="Ingrese comentario" rows="4" cols="50" required></textarea>
        </fieldset>
        <input type="submit"  value="Enviar opinión" id="enviar_comentario" >
    </form>
    `
    document.getElementById("seccion_comentario").innerHTML = htmlContentToAppendNewComentary
}