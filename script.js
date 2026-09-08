// SIEMPRE ABRIR LA INVITACIÓN DESDE LA PORTADA

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

// Quitar #contador si quedó en la dirección
if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname);
}

function volverArriba() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });
}

document.addEventListener("DOMContentLoaded", volverArriba);

window.addEventListener("load", function () {
    volverArriba();

    // Algunos navegadores restauran la posición después de cargar
    setTimeout(volverArriba, 100);
    setTimeout(volverArriba, 500);
});

window.addEventListener("pageshow", volverArriba);
function obtenerProximoCumple() {

    const ahora = new Date();

    let año = ahora.getFullYear();

    // Septiembre es 8 porque JavaScript empieza:
    // enero = 0, febrero = 1, etc.
    let cumpleaños = new Date(año, 8, 25, 0, 0, 0);

    // Si el 25 de septiembre de este año ya pasó,
    // utilizamos el del próximo año.
    if (ahora > cumpleaños) {
        cumpleaños = new Date(año + 1, 8, 25, 0, 0, 0);
    }

    return cumpleaños;
}


const fechaCumple = obtenerProximoCumple();


function actualizarContador() {

    const ahora = new Date();

    const diferencia = fechaCumple - ahora;


    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );


    const horas = Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
    );


    const minutos = Math.floor(
        (diferencia / (1000 * 60)) % 60
    );


    const segundos = Math.floor(
        (diferencia / 1000) % 60
    );


    document.getElementById("dias").textContent =
        String(dias).padStart(2, "0");

    document.getElementById("horas").textContent =
        String(horas).padStart(2, "0");

    document.getElementById("minutos").textContent =
        String(minutos).padStart(2, "0");

    document.getElementById("segundos").textContent =
        String(segundos).padStart(2, "0");
}


actualizarContador();

setInterval(actualizarContador, 1000);

/* ======================================
   CONFIRMAR ASISTENCIA
====================================== */

const cantidadPersonas =
    document.getElementById("cantidadPersonas");

const listaInvitados =
    document.getElementById("listaInvitados");

const formAsistencia =
    document.getElementById("formAsistencia");

const mensajeEnviado =
    document.getElementById("mensajeEnviado");


/* CUANDO CAMBIA LA CANTIDAD */

cantidadPersonas.addEventListener("change", function () {

    const cantidad = Number(this.value);

    listaInvitados.innerHTML = "";


    for (let i = 1; i <= cantidad; i++) {

        crearInvitado(i);

    }

});


/* CREAR CADA INVITADO */

function crearInvitado(numero) {

    const invitado = document.createElement("div");

    invitado.classList.add("invitado");


    invitado.innerHTML = `

        <h3 class="titulo-invitado">
            INVITADO ${numero}
        </h3>


        <div class="tarjeta-invitado">


            <!-- NOMBRE -->

            <div class="grupo-campo">

                <label>
                    NOMBRE *
                </label>

                <input
                    type="text"
                    name="nombre${numero}"
                    placeholder="Escribí tu nombre"
                    required
                >

            </div>


            <!-- APELLIDO -->

            <div class="grupo-campo">

                <label>
                    APELLIDO *
                </label>

                <input
                    type="text"
                    name="apellido${numero}"
                    placeholder="Escribí tu apellido"
                    required
                >

            </div>


            <!-- ASISTENCIA -->

            <div class="opciones-asistencia">


                <label class="opcion-asistencia">

                    <input
                        type="radio"
                        name="asistencia${numero}"
                        value="Si"
                        required
                    >

                    <span>
                        ¡CONFIRMO!
                    </span>

                </label>


                <label class="opcion-asistencia">

                    <input
                        type="radio"
                        name="asistencia${numero}"
                        value="No"
                    >

                    <span>
                        NO PODRÉ ASISTIR
                    </span>

                </label>


            </div>


         
<!-- ALIMENTACIÓN -->

<div class="grupo-campo">

    <label>
        ¿ALGÚN REQUERIMIENTO EN LA ALIMENTACIÓN? *
    </label>

    <select name="alimentacion${numero}" required>

        <option value="Ninguno">NINGUNO</option>
        <option value="Vegetariano">VEGETARIANO</option>
        <option value="Vegano">VEGANO</option>
        <option value="Sin gluten">SIN GLUTEN</option>
        <option value="Otro">OTRO</option>

    </select>

</div>


<!-- 👇 PEGÁ LO NUEVO DESDE ACÁ -->




<!-- CANCIÓN -->

<div class="grupo-campo">

    <label>
        SUGERÍ TU CANCIÓN
    </label>

    <input
        type="text"
        name="cancion${numero}"
    >

</div>


<!-- BUENOS DESEOS -->

<div class="grupo-campo">

    <label>
        COMENTÁ TUS BUENOS DESEOS
    </label>

    <textarea
        name="deseos${numero}"
        rows="1"
    ></textarea>

</div>

            <!-- OTRO REQUERIMIENTO -->

            <div class="grupo-campo">

                <label>
                    COMENTARIO O ACLARACIÓN
                </label>

                <input
                    type="text"
                    name="comentario${numero}"
                    placeholder="Opcional"
                >

            </div>


        </div>

    `;


    listaInvitados.appendChild(invitado);

}
/* ======================================
   ENVIAR RESPUESTAS A GOOGLE FORMS
====================================== */

formAsistencia.addEventListener("submit", async function (event) {

    event.preventDefault();

    const invitados = document.querySelectorAll(".invitado");

    const urlGoogleForms =
        "https://docs.google.com/forms/d/e/1FAIpQLSf6mvW0ZYs3HmnToFRerpOrIB-6mRi1Pt4aPNbvsXKr9cKwPw/formResponse";


    for (const invitado of invitados) {

        const nombre =
            invitado.querySelector('[name^="nombre"]').value;

        const apellido =
            invitado.querySelector('[name^="apellido"]').value;

        const asistenciaSeleccionada =
            invitado.querySelector('input[type="radio"]:checked');

        const asistencia =
            asistenciaSeleccionada
                ? asistenciaSeleccionada.value
                : "";

        const alimentacion =
            invitado.querySelector('[name^="alimentacion"]').value;

        const cancion =
            invitado.querySelector('[name^="cancion"]').value;

        const deseos =
            invitado.querySelector('[name^="deseos"]').value;


        const datos = new FormData();

        datos.append("entry.169091250", nombre);

        datos.append("entry.578583661", apellido);

        datos.append("entry.1106193342", asistencia);

        datos.append("entry.914881243", alimentacion);

        datos.append("entry.181476155", cancion);

        datos.append("entry.1777711009", deseos);


        await fetch(urlGoogleForms, {
            method: "POST",
            mode: "no-cors",
            body: datos
        });

    }


    mensajeEnviado.style.display = "block";

    mensajeEnviado.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});
