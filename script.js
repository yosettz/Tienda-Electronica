class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }

    mostrarInfo() {
        return `${this.nombre} - $${this.precio}`;
    }
}

const productos = [
    new Producto(1, "Notebook Gamer", 650000),
    new Producto(2, "Mouse RGB", 25000),
    new Producto(3, "Teclado Mecánico", 45000),
    new Producto(4, "Monitor 24''", 180000),
    new Producto(5, "Audífonos Gamer", 30000)
];

const resultsContainer = document.getElementById("results-container");
const searchInput = document.getElementById("product-search");
const searchBtn = document.getElementById("search-btn");
const cartCount = document.getElementById("cart-count");
const orderBtn = document.getElementById("order-btn");

let carrito = [];

function mostrarProductos(lista) {

    resultsContainer.innerHTML = "";

    lista.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">
                Agregar al carrito
            </button>
        `;

        resultsContainer.appendChild(div);
    });
}

function buscarProductos() {

    const texto = searchInput.value.toLowerCase();

    const filtrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto)
    );

    mostrarProductos(filtrados);
}

searchBtn.addEventListener("click", buscarProductos);

function agregarAlCarrito(id) {

    const producto = productos.find(producto => producto.id === id);

    const productoYaExiste = carrito.some(
        productoCarrito => productoCarrito.id === id
    );

    if (productoYaExiste) {
        mostrarNotificacion(
            `${producto.nombre} ya está en el carrito`
        );
        return;
    }

    carrito.push(producto);

    cartCount.textContent = carrito.length;

    mostrarNotificacion(
        `${producto.nombre} agregado al carrito`
    );
}

function gestionarPedido() {

    if (carrito.length === 0) {
        mostrarNotificacion("El carrito está vacío");
        return;
    }

    const pedido = {
        id: Date.now(),
        productos: carrito,
        estado: "Pendiente",
        fecha: new Date().toLocaleDateString()
    };

    console.log("Pedido creado:", pedido);

    mostrarNotificacion(
        `Pedido #${pedido.id} creado correctamente`
    );

    carrito = [];

    cartCount.textContent = carrito.length;
}

orderBtn.addEventListener("click", gestionarPedido);

function mostrarNotificacion(mensaje) {

    const notif = document.getElementById("notification");

    notif.textContent = mensaje;

    setTimeout(() => {
        notif.textContent = "";
    }, 3000);
}

window.addEventListener("load", () => {

    mostrarProductos(productos);

    setTimeout(() => {
        mostrarNotificacion(
            "🔥 Oferta: 20% de descuento en productos gamer"
        );
    }, 2000);
});
