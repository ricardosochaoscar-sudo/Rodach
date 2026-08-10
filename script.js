// ==========================================
// PROYECTO DE ORATORIA - RODACH
// Archivo principal de interactividad
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // NAVEGACIÓN SUAVE
    // ==========================================

    const enlaces = document.querySelectorAll('a[href^="#"]');

    enlaces.forEach(enlace => {
        enlace.addEventListener("click", evento => {
            evento.preventDefault();

            const destino = document.querySelector(enlace.getAttribute("href"));

            if (destino) {
                destino.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });


    // ==========================================
    // BOTÓN PARA VOLVER ARRIBA
    // ==========================================

    const botonArriba = document.getElementById("btn-arriba");

    if (botonArriba) {
        botonArriba.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // ==========================================
    // MENSAJE INICIAL EN CONSOLA
    // ==========================================

    console.log("Rodach - Proyecto de Oratoria iniciado correctamente.");

});
