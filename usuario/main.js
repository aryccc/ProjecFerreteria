// Funciones para almacenar y traer los datos que se almacenan
function guardarAlmacenamientoLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar))
}

function obtenerAlmacenamientoLocal(llave) {
    const datos = JSON.parse(localStorage.getItem(llave))
    return datos
}

// Variable que almacena productos obtenidos del almacenamiento local
let productos = obtenerAlmacenamientoLocal('productos') || [];

// Variables que traemos de nuestro HTML
const informacionCompra = document.getElementById('informacionCompra');
const contenedorCompra = document.getElementById('contenedorCompra');
const productosCompra = document.getElementById('productosCompra');
const contenedor = document.getElementById('contenedor');
const carrito = document.getElementById('carrito');
const numero = document.getElementById("numero");
const header = document.querySelector("#header");
const total = document.getElementById('total');
const body = document.querySelector("body");
const x = document.getElementById('x')

// Variables que vamos a usar en nuestro proyecto
let lista = []
let valortotal = 0

// Scroll de nuestra página
window.addEventListener("scroll", function () {
    if (contenedor.getBoundingClientRect().top < 10) {
        header.classList.add("scroll")
    } else {
        header.classList.remove("scroll")
    }
})

window.addEventListener('load', () => {
    visualizarProductos();
    contenedorCompra.classList.add("none")
})

// Función para visualizar productos en el contenedor
function visualizarProductos() {
    contenedor.innerHTML = ""
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].existencia > 0) {
            contenedor.innerHTML += `<div><div class="informacion"><p>${productos[i].nombre}</p><p class="precio">$${productos[i].valor}</p><button onclick=comprar(${i})>Comprar</button></div></div>`
        } else {
            contenedor.innerHTML += `<div><div class="informacion"><p>${productos[i].nombre}</p><p class="precio">$${productos[i].valor}</p><p class="soldOut">Agotado</p></div></div>`
        }
    }
}

// Función para agregar productos a la lista de compra
function comprar(indice) {
    lista.push({ nombre: productos[indice].nombre, precio: productos[indice].valor })

    let van = true
    let i = 0
    while (van == true) {
        if (productos[i].nombre == productos[indice].nombre) {
            productos[i].existencia -= 1
            if (productos[i].existencia == 0) {
                visualizarProductos()
            }
            van = false
        }
        guardarAlmacenamientoLocal("productos", productos)
        i += 1
    }
    numero.innerHTML = lista.length
    numero.classList.add("diseñoNumero")
    return lista
}

// Evento al hacer clic en el carrito para mostrar la lista de compra
carrito.addEventListener("click", function(){
    body.style.overflow = "hidden" 
    contenedorCompra.classList.remove('none')
    contenedorCompra.classList.add('contenedorCompra')
    informacionCompra.classList.add('informacionCompra')
    mostrarElemtrosLista()
})

// Función para mostrar elementos en la lista de compra
function mostrarElemtrosLista() {
    productosCompra.innerHTML = ""
    valortotal = 0
    for (let i = 0; i < lista.length; i++){
        productosCompra.innerHTML += `<div><button onclick=eliminar(${i}) class="botonTrash"><img src="/img/trash.png"></button><p>${lista[i].nombre}</p></div><p> $${lista[i].precio}</p></div>`
        valortotal += parseInt(lista[i].precio)
    }
    total.innerHTML = `<p>Valor Total</p> <p><span>$${valortotal}</span></p>`
}

// Función para eliminar un producto de la lista de compra
function eliminar(indice){
    let van = true
    let i = 0
    while (van == true) {
        if (productos[i].nombre == lista[indice].nombre) {
            productos[i].existencia += 1
            lista.splice(indice, 1)
            van = false
        }
        i += 1
    }
    guardarAlmacenamientoLocal("productos", productos)

    numero.innerHTML = lista.length
    if (lista.length == 0){
        numero.classList.remove("diseñoNumero")
    }
    visualizarProductos()
    mostrarElemtrosLista()
}

// Evento al hacer clic en la 'x' para cerrar la lista de compra
x.addEventListener("click", function(){
    body.style.overflow = "auto"
    contenedorCompra.classList.add('none')
    contenedorCompra.classList.remove('contenedorCompra')
    informacionCompra.classList.remove('informacionCompra')
})

// Evento al hacer clic en el botón "Finalizar Compra
document.querySelector('button').addEventListener('click', function() {
    // Verificar si el carrito está vacío
    if (lista.length === 0) {
        // Mostrar un mensaje que el carrito está vacío
        alert('No es posible hacer esta acción ya que el carrito está vacío');
    } else {
        // Mostrar mensaje por la compra
        alert('Estamos realizando su pedido, gracias por su compra');

        // Limpiar la lista de productos y actualizar el almacenamiento local
        lista = [];
        guardarAlmacenamientoLocal("productos", productos);

        // Actualizar el número en el carrito
        numero.innerHTML = 0;
        numero.classList.remove("diseñoNumero");

        // Limpiar la lista de productos
        mostrarElemtrosLista();
    }
});
