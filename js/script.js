//======================================
// BODA ANGIE & FREDY
//======================================

//------------------------------
// Loader
//------------------------------

const loader = document.getElementById("loader");
const entrar = document.getElementById("entrar");
const music = document.getElementById("music");

entrar.addEventListener("click", () => {

    if (music) {

        music.play();

    }

    loader.style.opacity = "0";

    setTimeout(() => {

        loader.style.display = "none";

    }, 800);

});

//------------------------------
// Cuenta regresiva
//------------------------------

const fechaBoda = new Date("June 19, 2027 18:30:00").getTime();

function actualizarContador(){

    const ahora = new Date().getTime();

    const diferencia = fechaBoda - ahora;

    if(diferencia < 0) return;

    const dias = Math.floor(diferencia/(1000*60*60*24));

    const horas = Math.floor((diferencia%(1000*60*60*24))/(1000*60*60));

    const minutos = Math.floor((diferencia%(1000*60*60))/(1000*60));

    const segundos = Math.floor((diferencia%(1000*60))/1000);

    document.getElementById("dias").textContent = dias;

    document.getElementById("horas").textContent = horas;

    document.getElementById("minutos").textContent = minutos;

    document.getElementById("segundos").textContent = segundos;

}

actualizarContador();

setInterval(actualizarContador,1000);
//==================================
// BOTÓN MÚSICA
//==================================

const musicBtn=document.getElementById("musicBtn");

musicBtn.addEventListener("click",()=>{

    if(music.paused){

        music.play();
        musicBtn.classList.add("playing");

        musicBtn.classList.add("playing");

    }else{

        music.pause();

        musicBtn.classList.remove("playing");

    }

});
//==================================
// ANIMACIÓN AL HACER SCROLL
//==================================

const reveals = document.querySelectorAll(".reveal");

function mostrarSecciones(){

    reveals.forEach((section)=>{

        const ventana = window.innerHeight;

        const posicion = section.getBoundingClientRect().top;

        if(posicion < ventana - 120){

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll", mostrarSecciones);

mostrarSecciones();
//==================================
// DATOS DEL INVITADO
//==================================

const parametros = new URLSearchParams(window.location.search);

const nombre = parametros.get("nombre");

const cupos = parametros.get("cupos");

if(nombre){

    document.getElementById("nombreInvitado").textContent = decodeURIComponent(nombre);

}

if(cupos){

    document.getElementById("numeroCupos").textContent = cupos + " PERSONA" + (cupos == 1 ? "" : "S");

}
//==============================
// INVITADO POR CÓDIGO
//==============================

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {

    fetch("./invitados.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar invitados.json");
            }
            return response.json();
        })
        .then(invitados => {

            const invitado = invitados.find(i => i.id.trim() === id.trim());

            if (invitado) {

                document.getElementById("nombreInvitado").textContent = invitado.nombre;

                document.getElementById("numeroCupos").textContent =
                    invitado.cupos + (invitado.cupos == 1 ? " PERSONA" : " PERSONAS");

            } else {

                document.getElementById("nombreInvitado").textContent = "Invitado no encontrado";
                document.getElementById("numeroCupos").textContent = "";

            }

        })
        .catch(error => {
            console.error(error);
        });

}
//==============================
// BOTÓN DE WHATSAPP PERSONALIZADO
//==============================

const botonWhatsapp = document.getElementById("btnWhatsapp");

if (botonWhatsapp) {

    botonWhatsapp.addEventListener("click", function (e) {

        e.preventDefault();

        const nombre = document.getElementById("nombreInvitado").textContent;

        const mensaje = `Hola Angie y Fredy.

Soy ${nombre}.

Con mucho gusto confirmo mi asistencia a su boda.

Nos vemos el 19 de junio de 2027.`;

        const url = `https://wa.me/573214918268?text=${encodeURIComponent(mensaje)}`;

        window.open(url, "_blank");

    });

}
