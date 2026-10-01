const novedades = [
    "bullion",
    "dalia",
    "essence",
    "fleur",
    "sami"
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