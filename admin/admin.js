// Funciones para almacenar y traer los datos que se almacenan en el LocalStorage
function guardarAlmacenamientoLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar));
}

function obtenerAlmacenamientoLocal(llave) {
    const datos = JSON.parse(localStorage.getItem(llave));
    return datos;
}

// Obtener productos del LocalStorage o un array vacío si no hay datos almacenados
let productos = obtenerAlmacenamientoLocal('productos') || [];

// Elemento del DOM utilizado para mostrar mensajes
let mensaje = document.getElementById('mensaje');

// Elementos del formulario para añadir un producto
const añadirProducto = document.getElementById('productoAñadir');
const añadirValor = document.getElementById('valorAñadir');
const añadirExistencia = document.getElementById('existenciaAñadir');

// Evento al hacer clic en el botón de añadir producto
document.getElementById("botonAñadir").addEventListener("click", function (event) {
    event.preventDefault();

    // Obtener valores del formulario
    let productoAñadir = añadirProducto.value;
    let valorAñadir = añadirValor.value;
    let existenciaAñadir = añadirExistencia.value;

    // Validaciones y mensajes de error
    let van = true;
    if (productoAñadir == '' || valorAñadir == '' || existenciaAñadir == '') {
        mensaje.classList.add('llenarCampos');
        setTimeout(() => { mensaje.classList.remove('llenarCampos') }, 2500);
        van = false;
    } else {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].nombre == productoAñadir) {
                mensaje.classList.add('repetidoError');
                setTimeout(() => { mensaje.classList.remove('repetidoError') }, 2500);
                van = false;
            }
        }
    }

    // Si pasa las validaciones, añadir el producto
    if (van == true) {
        productos.push({
            nombre: productoAñadir,
            valor: valorAñadir,
            existencia: existenciaAñadir,
        });
        mensaje.classList.add('realizado');
        setTimeout(() => {
            mensaje.classList.remove('repetidoError');
            window.location.reload();
        }, 1500);
    }

    // Actualizar el LocalStorage
    guardarAlmacenamientoLocal('productos', productos);
});

// Elementos del formulario para editar un producto
const productoEd = document.getElementById('productoEditar');
const atributoEd = document.getElementById('atributoEditar');
const nuevoAtributoEd = document.getElementById('nuevoAtributo');

// Evento al hacer clic en el botón de editar producto
document.getElementById("botonEditar").addEventListener("click", function (event) {
    event.preventDefault();

    // Obtener valores del formulario
    let productoEditar = productoEd.value;
    let atributoEditar = atributoEd.value;
    let nuevoAtributo = nuevoAtributoEd.value;

    // Validaciones y mensajes de error
    let van = false;
    if (productoEditar == '' || atributoEditar == '' || nuevoAtributo == '') {
        mensaje.classList.add('llenarCampos');
        setTimeout(() => { mensaje.classList.remove('llenarCampos') }, 2500);
    } else {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].nombre == productoEditar) {
                productos[i][atributoEditar] = nuevoAtributo;
                van = true;
            }
        }
        if (van == true) {
            mensaje.classList.add('realizado');
            setTimeout(() => {
                mensaje.classList.remove('realizado');
                window.location.reload();
            }, 1500);
        } else {
            mensaje.classList.add('noExisteError');
            setTimeout(() => { mensaje.classList.remove('noExsiteError') }, 2500);
        }
        // Actualizar el LocalStorage
        guardarAlmacenamientoLocal('productos', productos);
    }
});

// Elemento del formulario para eliminar un producto
const productoE = document.getElementById('productoEliminar');

// Evento al hacer clic en el botón de eliminar producto
document.getElementById("botonEliminar").addEventListener("click", function (event) {
    event.preventDefault();

    // Obtener valor del formulario
    let productoEliminar = productoE.value;
    let van = false;

    // Eliminar el producto del array
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].nombre == productoEliminar) {
            productos.splice(i, 1);
            van = true;
        }
    }

    // Mostrar mensajes según el resultado
    if (van == false) {
        mensaje.classList.add('noExsiteError');
        setTimeout(() => { mensaje.classList.remove('noExsiteError') }, 2500);
    } else {
        mensaje.classList.add('realizado');
        setTimeout(() => {
            mensaje.classList.remove('realizado');
            window.location.reload();
        }, 1500);
    }

    // Actualizar el LocalStorage
    guardarAlmacenamientoLocal('productos', productos);
});

// Mostrar productos al cargar la página
window.addEventListener("load", () => {
    // Llenar selectores del formulario de editar y eliminar
    const productoEd = document.getElementById('productoEditar');
    const productoEl = document.getElementById('productoEliminar');
    for (let i = 0; i < productos.length; i++) {
        productoEd.innerHTML += `<option>${productos[i].nombre}</option>`;
        productoEl.innerHTML += `<option>${productos[i].nombre}</option>`;
    }
    
    // Llenar selector del formulario de editar con atributos disponibles
    Object.keys(productos[0]).forEach(element => {
        atributoEd.innerHTML += `<option>${element}</option>`;
    });

    // Mostrar productos en un contenedor en la página
    let mostraProductos = document.getElementById('mostrarProductos');
    mostraProductos.innerHTML = '';
    for (let i = 0; i < productos.length; i++) {
        mostraProductos.innerHTML += `<div class="contenedorProductos"><div class="informacion"><p>${productos[i].nombre}</p><p class="precio"><span>Precio: ${productos[i].valor}$</span></p> Existencia: ${productos[i].existencia}<p></p></div></div>`;
    }
});

