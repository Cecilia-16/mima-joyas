const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const producto = productos.find(p => p.id === id);

const contenedor = document.getElementById("detalle-producto");

if (!producto) {

    contenedor.innerHTML = "<h2>Producto no encontrado</h2>";

} else {

    contenedor.innerHTML = `
        <div class="detalle">

            <div class="detalle-imagen">

                <img src="${producto.imagen}" alt="${producto.nombre}">

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
const boton = document.getElementById("agregar-carrito");

if (boton) {

    boton.addEventListener("click", () => {

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        carrito.push(producto);

        localStorage.setItem("carrito", JSON.stringify(carrito));

        alert("Producto añadido al carrito");

    });

}