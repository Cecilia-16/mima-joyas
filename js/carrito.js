let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("contenido-carrito");

if (carrito.length === 0) {

    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";

} else {

    let html = "";

let total = 0;

html += `<div class="productos-carrito">`;

carrito.forEach((producto, indice) => {

    const precio = parseFloat(producto.precio.replace("€", "").replace(",", "."));
    total += precio;

    html += `
        <div class="producto">

            <img src="${producto.imagen}" alt="${producto.nombre}">

            <h3>${producto.nombre}</h3>

            <p>${producto.descripcion}</p>

            <p class="precio">${producto.precio}</p>

            <button class="boton-eliminar" onclick="eliminar(${indice})">
                Eliminar
            </button>

        </div>
    `;

});

html += `</div>`;

let gastosEnvio = total >= 30 ? 0 : 5.80;
let totalFinal = total + gastosEnvio;

html += `
    <h2>Total: ${total.toFixed(2)} €</h2>

    <p class="gastos-envio">
        ${gastosEnvio === 0
            ? "Gastos de envío: GRATIS"
            : `Gastos de envío: ${gastosEnvio.toFixed(2)} €`
        }
    </p>

    <h2>Total final: ${totalFinal.toFixed(2)} €</h2>

    <button class="boton-comprar" onclick="comprar()">
        Comprar
    </button>
`;


    contenedor.innerHTML = html;

}

function eliminar(indice){

    carrito.splice(indice,1);

    localStorage.setItem("carrito",JSON.stringify(carrito));

    location.reload();

}
function comprar(){

    contenedor.innerHTML = `
        <div class="formulario-compra">

            <h2>Datos del pedido</h2>

            <form id="form-compra">

                <label>Nombre</label>
                <input type="text" id="nombre" name="nombre" required>

                <label>Apellidos</label>
                <input type="text" id="apellidos" name="apellidos" required>

                <label>Número de teléfono</label>
                <input type="tel" id="telefono" name="telefono" required>

                <label>Correo electrónico</label>
                <input type="email" id="correo" name="email" required>

                <label>Color elegido (si procede)</label>
                <input
                   type="text" 
                   id="color" 
                   name="color"
                   placeholder="Indica el color que quieres"
                >
                
                <label>Dirección</label>
                <input type="text" id="calle" name="calle" placeholder="Calle" required>

                <input type="text" id="portal" name="portal" placeholder="Número de portal" required>

                <input type="text" id="ciudad" name="ciudad" placeholder="Ciudad" required>

                <input type="text" id="codigo-postal" name="codigo_postal" placeholder="Código postal" required>

                <input type="hidden" name="_subject" value="Nuevo pedido - MIMA Joyas">

                <input type="hidden" name="_template" value="table">

                <button type="submit">
                    OK
                </button>

            </form>

        </div>
    `;

    document.getElementById("form-compra").addEventListener("submit", async function(event){

        event.preventDefault();

        const formulario = event.target;
        const datos = new FormData(formulario);

        // Preparar los productos del pedido
        const productosPedido = carrito.map(producto =>
            `${producto.nombre} - ${producto.precio}`
        ).join("\n");

        // Calcular el total
        let total = 0;

        carrito.forEach(producto => {
            const precio = parseFloat(
                producto.precio.replace("€", "").replace(",", ".")
            );

            total += precio;
        });

        datos.append("productos", productosPedido);
        datos.append("total", `${total.toFixed(2)} €`);

        try {

            const respuesta = await fetch(
                "https://formsubmit.co/ajax/anamcarreras@gmail.com",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json"
                    },
                    body: datos
                }
            );

            const resultado = await respuesta.json();

            if (resultado.success) {

                contenedor.innerHTML = `
                    <div class="formulario-compra">

                        <h2>¡Pedido registrado!</h2>

                        <p>
                            Su pedido ha sido registrado.
                        </p>

                        <p>
                            En breve recibirá un correo electrónico
                            para gestionar el pago.
                        </p>

                    </div>
                `;

                localStorage.removeItem("carrito");

            } else {

                alert("No se ha podido enviar el pedido. Inténtalo de nuevo.");

            }

        } catch (error) {

            console.error(error);

            alert("Ha ocurrido un error al enviar el pedido.");

        }

    });

}