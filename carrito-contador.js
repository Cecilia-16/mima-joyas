function actualizarContadorCarrito() {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const contador = document.getElementById("menu-carrito");

    if (contador) {
        contador.textContent = `🛒 Carrito (${carrito.length})`;
    }

}

actualizarContadorCarrito();