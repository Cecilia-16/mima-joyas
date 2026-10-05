const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");

// Buscar solamente por ID
const producto = productos.find(p => p.id === id);

const contenedor =
    document.getElementById("detalle-producto");

if (!producto) {

    contenedor.innerHTML =
        "<h2>Producto no encontrado</h2>";

} else {

    const imagenesProducto =
        producto.imagenes || [producto.imagen];

    const favorito =
        esFavorito(producto.categoria, producto.id);

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

                <button
                    class="boton-atras"
                    onclick="history.back()"
                    title="Volver">
                    ←
                </button>

            </div>

            <div class="detalle-info">

                <h1>${producto.nombre}</h1>

                <p>${producto.descripcion}</p>

                <h2>${producto.precio}</h2>

                ${
                    producto.descripcion === "AGOTADO"
                    ? ""
                    : `
                        <button
                            class="comprar"
                            id="agregar-carrito">
                            🛒 Añadir al carrito
                        </button>
                    `
                }
                        <button
                            id="favorito-ficha"
                            class="boton-favorito-ficha ${favorito ? "favorito-activo" : ""}">

                            <span class="corazon-ficha">
                                ${favorito ? "❤" : "♡"}
                            </span>

                            <span class="texto-favorito-ficha">
                                ${favorito ? "Quitar de favoritos" : "Añadir a favoritos"}
                            </span>

                       </button>

            </div>

        </div>
    `;
}


// Cambiar imagen de la galería
function cambiarImagen(imagen) {

    document.getElementById(
        "imagen-principal"
    ).src = imagen;

}


// BOTÓN FAVORITO DE LA FICHA
const botonFavoritoFicha =
    document.getElementById("favorito-ficha");

if (botonFavoritoFicha) {

botonFavoritoFicha.addEventListener("click", () => {

    const ahoraEsFavorito =
        cambiarFavorito(
            producto.categoria,
            producto.id
        );

    botonFavoritoFicha.querySelector(".corazon-ficha").textContent =
        ahoraEsFavorito ? "❤" : "♡";

    botonFavoritoFicha.querySelector(".texto-favorito-ficha").textContent =
        ahoraEsFavorito
        ? "Quitar de favoritos"
        : "Añadir a favoritos";

    botonFavoritoFicha.classList.toggle(
        "favorito-activo",
        ahoraEsFavorito
    );

});

}


// BOTÓN CARRITO
const boton =
    document.getElementById("agregar-carrito");

if (boton) {

    boton.addEventListener("click", () => {

        let carrito =
            JSON.parse(localStorage.getItem("carrito")) || [];

        carrito.push(producto);

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

        alert("Producto añadido al carrito");

    });

}