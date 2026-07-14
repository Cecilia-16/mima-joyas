let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("contenido-carrito");

if (carrito.length === 0) {

    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";

} else {

    let html = "";

    let total = 0;

    carrito.forEach((producto, indice) => {

        const precio = parseFloat(producto.precio.replace("€", "").replace(",", "."));

        total += precio;

        html += `
            <div class="producto">

                <img src="${producto.imagen}" alt="${producto.nombre}">

                <h3>${producto.nombre}</h3>

                <p>${producto.descripcion}</p>

                <p class="precio">${producto.precio}</p>

                <button onclick="eliminar(${indice})">
                    Eliminar
                </button>

            </div>
        `;

    });

    html += `<h2>Total: ${total.toFixed(2)} €</h2>`;

    contenedor.innerHTML = html;

}

function eliminar(indice){

    carrito.splice(indice,1);

    localStorage.setItem("carrito",JSON.stringify(carrito));

    location.reload();

}