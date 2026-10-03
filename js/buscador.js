const botonBuscar = document.getElementById("boton-buscar");
const buscador = document.getElementById("buscador");
const campoBusqueda = document.getElementById("campo-busqueda");
const cerrarBusqueda = document.getElementById("cerrar-busqueda");
const resultadosBusqueda = document.getElementById("resultados-busqueda");

botonBuscar.addEventListener("click", () => {
    buscador.style.display = "block";
    campoBusqueda.focus();
});

cerrarBusqueda.addEventListener("click", () => {
    buscador.style.display = "none";
    resultadosBusqueda.style.display = "none";
    campoBusqueda.value = "";
});

campoBusqueda.addEventListener("input", () => {

    const texto = campoBusqueda.value.toLowerCase().trim();

    if (texto === "") {
        resultadosBusqueda.innerHTML = "";
        resultadosBusqueda.style.display = "none";
        return;
    }

    const encontrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto)
    );

    resultadosBusqueda.innerHTML = "";

    encontrados.forEach(producto => {

        resultadosBusqueda.innerHTML += `
            <a class="resultado-busqueda" href="producto.html?id=${producto.id}">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
            </a>
        `;
    });

    if (encontrados.length > 0) {
        resultadosBusqueda.style.display = "block";
    } else {
        resultadosBusqueda.innerHTML = "<p>No se han encontrado productos.</p>";
        resultadosBusqueda.style.display = "block";
    }
});