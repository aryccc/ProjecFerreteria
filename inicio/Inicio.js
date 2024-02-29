document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtén los valores ingresados por el usuario
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Verifica el usuario y la contraseña
        const role = localStorage.getItem('role');
        if (username === "admin" && password === "1234") {
            localStorage.setItem('role', 'admin'); // Asegúrate de establecer el rol en 'admin'
            window.location.href = 'index.html';
            alert("Inicio de sesión exitoso entrando como admin");
            
        } else if (username === "cliente" && password === "1234") {
            localStorage.setItem('role', 'empleado'); // Asegúrate de establecer el rol en 'empleado'
            window.location.href = 'index.html';
            alert("Inicio de sesión exitoso entrando como empleado");
            
        } else {
            // Cuando ingresen mal el usuario o contraseña, saltará el alert
            alert("Usuario o contraseña incorrecta");

            // Borrar el texto de los campos de usuario y contraseña
            usernameInput.value = '';
            passwordInput.value = '';
        }
        
        // Actualizar el enlace de administrador según el rol del usuario
        updateAdminLink();
    });

    //Hace visible la contraseña
    const visi = document.getElementById("visible");
    document.addEventListener("change", (e)=>{
        if(e.target === visi){
            if(visi.checked === false) passwordInput.type = "password";
            else passwordInput.type = "text";
        }
    });

    // Función para actualizar el enlace de administrador
    function updateAdminLink() {
        const adminLinkContainer = document.getElementById('adminLinkContainer');
        const role = localStorage.getItem('role');

        // Eliminar el enlace de administrador existente (si hay alguno)
        adminLinkContainer.innerHTML = '';

        // Crear el enlace de administrador solo si el usuario es un administrador
        if (role === 'admin') {
            const adminLink = document.createElement('a');
            adminLink.href = 'admin.html';
            adminLink.textContent = 'Admin';
            adminLinkContainer.appendChild(adminLink);
        }
    }

    // Llamar a la función al cargar la página para reflejar el estado actual del usuario
    updateAdminLink();
});