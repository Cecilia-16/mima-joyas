const contenedor = document.getElementById("lista-productos");

const pagina = window.location.pathname
  .split("/")
  .pop()
  .replace(".html", "");

productos
  .filter(producto => producto.categoria === pagina)
  .forEach(producto => {

    const tarjeta = document.createElement("div");
    tarjeta.className = "producto";

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
     
      <p class="precio">${producto.precio}</p>

        ${
            producto.descripcion !== "AGOTADO"
            ? `<button class="boton-anadir">Añadir al carrito</button>`
            : ""
          }
    `;

     const botonAnadir = tarjeta.querySelector(".boton-anadir");

     if (botonAnadir) {

         botonAnadir.addEventListener("click", (event) => {

            event.stopPropagation();

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            carrito.push(producto);

            localStorage.setItem("carrito", JSON.stringify(carrito));

            alert("Producto añadido al carrito");

          });

      }

    tarjeta.addEventListener("click", () => {
      window.location.href = `producto.html?id=${producto.id}`;
    });

    contenedor.appendChild(tarjeta);

  });