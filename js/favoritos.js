// =====================================
// FAVORITOS DE MIMA JOYAS
// =====================================

const favoritosGuardados =
    JSON.parse(localStorage.getItem("favoritos")) || [];


// Guardar favoritos
function guardarFavoritos() {

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritosGuardados)
    );

}


// Crear una clave única para cada producto
function obtenerClaveFavorito(categoria, id) {

    return `${categoria}|${id}`;

}


// Añadir o quitar favorito
function cambiarFavorito(categoria, id) {

    const clave = obtenerClaveFavorito(categoria, id);

    const posicion = favoritosGuardados.indexOf(clave);

    if (posicion === -1) {

        favoritosGuardados.push(clave);
        guardarFavoritos();

        return true;

    } else {

        favoritosGuardados.splice(posicion, 1);
        guardarFavoritos();

        return false;

    }

}


// Comprobar si es favorito
function esFavorito(categoria, id) {

    const clave = obtenerClaveFavorito(categoria, id);

    return favoritosGuardados.includes(clave);

}


// Mostrar favoritos
function mostrarFavoritos() {

    const lista =
        document.getElementById("lista-favoritos");

    const mensaje =
        document.getElementById("sin-favoritos");

    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    const productosFavoritos =
        productos.filter(producto => {

            const clave =
                obtenerClaveFavorito(
                    producto.categoria,
                    producto.id
                );

            return favoritosGuardados.includes(clave);

        });


    if (productosFavoritos.length === 0) {

        mensaje.style.display = "block";
        return;

    }


    mensaje.style.display = "none";


    productosFavoritos.forEach(producto => {

        const tarjeta =
            document.createElement("div");

        tarjeta.className = "producto";


        tarjeta.innerHTML = `

            <div class="imagen-producto">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >

                <button
                    class="boton-favorito activo"
                    aria-label="Quitar de favoritos">
                    ❤
                </button>

            </div>

            <h3>${producto.nombre}</h3>

            <p>${producto.descripcion}</p>

            <p class="precio">${producto.precio}</p>

            ${
                producto.descripcion !== "AGOTADO"
                ? `<button class="boton-anadir">
                      Añadir al carrito
                   </button>`
                : ""
            }

        `;


        // BOTÓN FAVORITO
        const botonFavorito =
            tarjeta.querySelector(".boton-favorito");


        botonFavorito.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                cambiarFavorito(
                    producto.categoria,
                    producto.id
                );

                mostrarFavoritos();

            }
        );


        // BOTÓN AÑADIR AL CARRITO
        const botonAnadir =
            tarjeta.querySelector(".boton-anadir");


        if (botonAnadir) {

            botonAnadir.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    let carrito =
                        JSON.parse(
                            localStorage.getItem("carrito")
                        ) || [];

                    carrito.push(producto);

                    localStorage.setItem(
                        "carrito",
                        JSON.stringify(carrito)
                    );

                    alert(
                        "Producto añadido al carrito"
                    );

                }
            );

        }


        // ABRIR FICHA DEL PRODUCTO
        tarjeta.addEventListener(
            "click",
            () => {

                window.location.href =
                    `producto.html?id=${producto.id}`;

            }
        );


        lista.appendChild(tarjeta);

    });

}


document.addEventListener(
    "DOMContentLoaded",
    mostrarFavoritos
);