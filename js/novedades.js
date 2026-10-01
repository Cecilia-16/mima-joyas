const novedades = [
    "caballito-de-mar",
    "caballito-de-mar-collar",
    "corazon-punteado",
    "disco",
    "diseo",
    "erregina",
    "estrellitas-de-colores",
    "feier",
    "florenzada",
    "fluor-circulo",
    "fluor-corazon",
    "fluor-rectangulo",
    "infinity-rayons-du-soleil"
];

const contenedorNovedades = document.getElementById("lista-novedades");

if (contenedorNovedades) {

    novedades.forEach(id => {

        const producto = productos.find(p => p.id === id);

        if (!producto) return;

        contenedorNovedades.innerHTML += `
            <a href="producto.html?id=${producto.id}">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </a>
        `;
    });
}