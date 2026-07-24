const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const producto = productos.find(p => p.id === id);

const contenedor = document.getElementById("detalle-producto");

if (producto) {

    contenedor.innerHTML = `
        <div class="producto-detalle">

            <img src="${producto.imagen}" alt="${producto.nombre}">

            <div class="info-producto">

                <h1>${producto.nombre}</h1>

                <p>${producto.descripcion}</p>

                <h2>${producto.precio}</h2>

            </div>

        </div>
    `;

}