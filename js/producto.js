const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const producto = productos.find(p => p.id === id);

const contenedor = document.getElementById("detalle-producto");

if (!producto) {

    contenedor.innerHTML = "<h2>Producto no encontrado</h2>";

} else {

    // Si el producto tiene varias imágenes, usamos todas.
    // Si no tiene "imagenes", usamos solamente la imagen principal.
    const imagenesProducto = producto.imagenes || [producto.imagen];

    contenedor.innerHTML = `
        <div class="detalle">

            <div class="detalle-imagen">

                <img
                    id="imagen-principal"
                    src="${imagenesProducto[0]}"
                    alt="${producto.nombre}"
                >

                <div class="galeria-producto">
                    ${imagenesProducto.map((imagen, indice) => `
                        <img
                            src="${imagen}"
                            alt="${producto.nombre} ${indice + 1}"
                            class="miniatura-producto"
                            onclick="cambiarImagen('${imagen}')"
                        >
                    `).join("")}
                </div>

                <button class="boton-atras" onclick="history.back()" title="Volver">
                    ←
                </button>

            </div>

            <div class="detalle-info">

                <h1>${producto.nombre}</h1>

                <p>${producto.descripcion}</p>

                <h2>${producto.precio}</h2>

                <button class="comprar" id="agregar-carrito">
                    🛒 Añadir al carrito
                </button>

            </div>

        </div>
    `;
}

function cambiarImagen(imagen) {
    document.getElementById("imagen-principal").src = imagen;
}

const boton = document.getElementById("agregar-carrito");

if (boton) {

    boton.addEventListener("click", () => {

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        carrito.push(producto);

        localStorage.setItem("carrito", JSON.stringify(carrito));

        alert("Producto añadido al carrito");

    });

}