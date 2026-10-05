const contenedor = document.getElementById("lista-productos");

if (contenedor) {

  const pagina = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");

  productos
    .filter(producto => producto.categoria === pagina)
    .forEach(producto => {

      const tarjeta = document.createElement("div");
      tarjeta.className = "producto";

      const favorito = esFavorito(producto.categoria, producto.id);

      tarjeta.innerHTML = `
        <div class="imagen-producto">

          <img src="${producto.imagen}" alt="${producto.nombre}">

          <button class="boton-favorito ${favorito ? "activo" : ""}" 
                  aria-label="Favorito">
            ${favorito ? "❤" : "♡"}
          </button>

        </div>

        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="precio">${producto.precio}</p>

        ${
          producto.descripcion !== "AGOTADO"
          ? `<button class="boton-anadir">Añadir al carrito</button>`
          : ""
        }
      `;

      // BOTÓN FAVORITO
      const botonFavorito = tarjeta.querySelector(".boton-favorito");

      botonFavorito.addEventListener("click", (event) => {

        event.stopPropagation();

        const ahoraEsFavorito = cambiarFavorito(
          producto.categoria,
          producto.id
        );

        botonFavorito.textContent = ahoraEsFavorito ? "❤" : "♡";
        botonFavorito.classList.toggle("activo", ahoraEsFavorito);

      });

      // BOTÓN AÑADIR AL CARRITO
      const botonAnadir = tarjeta.querySelector(".boton-anadir");

      if (botonAnadir) {

        botonAnadir.addEventListener("click", (event) => {

          event.stopPropagation();

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

      // ABRIR FICHA DEL PRODUCTO
      tarjeta.addEventListener("click", () => {

        window.location.href =
          `producto.html?id=${producto.id}`;

      });

      contenedor.appendChild(tarjeta);

    });

}