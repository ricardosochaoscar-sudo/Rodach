// ==========================================
// PROYECTO DE ORATORIA - RODACH
// INTERACTIVIDAD PRINCIPAL
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // NAVEGACIÓN SUAVE
    // ==========================================

    const enlaces = document.querySelectorAll('a[href^="#"]');

    enlaces.forEach(enlace => {
        enlace.addEventListener("click", evento => {

            const destino = document.querySelector(
                enlace.getAttribute("href")
            );

            if (destino) {
                evento.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });


    // ==========================================
    // EJERCICIOS DE ORATORIA
    // ==========================================

    const botonesEjercicio = document.querySelectorAll(
        ".practice-card button"
    );

    botonesEjercicio.forEach((boton, indice) => {

        boton.addEventListener("click", () => {

            if (indice === 0) {
                ejercicioHablar();
            }

            if (indice === 1) {
                ejercicioArgumento();
            }

            if (indice === 2) {
                ejercicioImprovisacion();
            }

        });

    });


    // ==========================================
    // CREAR VENTANA DEL EJERCICIO
    // ==========================================

    function crearVentana(titulo, contenido) {

        const ventanaExistente =
            document.querySelector(".exercise-modal");

        if (ventanaExistente) {
            ventanaExistente.remove();
        }

        const modal = document.createElement("div");

        modal.className = "exercise-modal";

        modal.innerHTML = `
            <div class="exercise-box">

                <button class="close-exercise">
                    ✕
                </button>

                <p class="exercise-label">
                    EJERCICIO DE ORATORIA
                </p>

                <h2>
                    ${titulo}
                </h2>

                <div class="exercise-content">
                    ${contenido}
                </div>

            </div>
        `;

        document.body.appendChild(modal);

        const cerrar = modal.querySelector(".close-exercise");

        cerrar.addEventListener("click", () => {
            modal.remove();
        });

        modal.addEventListener("click", evento => {

            if (evento.target === modal) {
                modal.remove();
            }

        });
    }


    // ==========================================
    // EJERCICIO 1
    // HABLA DURANTE 30 SEGUNDOS
    // ==========================================

    function ejercicioHablar() {

        crearVentana(
            "Habla durante 30 segundos",

            `
            <p>
                Elige un tema que conozcas y habla durante
                30 segundos sin leer ni memorizar.
            </p>

            <p>
                Puedes hablar sobre:
            </p>

            <ul>
                <li>Tu película favorita.</li>
                <li>Un deporte que practiques.</li>
                <li>Un lugar que te gustaría visitar.</li>
                <li>Una persona que admires.</li>
            </ul>

            <div class="timer">
                <span id="timer-number">30</span>
                <small>segundos</small>
            </div>

            <button id="start-timer" class="exercise-action">
                Comenzar
            </button>

            <p id="timer-message"></p>
            `
        );


        const botonInicio =
            document.getElementById("start-timer");

        const contador =
            document.getElementById("timer-number");

        const mensaje =
            document.getElementById("timer-message");

        let tiempo = 30;
        let intervalo = null;

        botonInicio.addEventListener("click", () => {

            botonInicio.disabled = true;
            botonInicio.textContent = "En curso...";

            intervalo = setInterval(() => {

                tiempo--;

                contador.textContent = tiempo;

                if (tiempo <= 0) {

                    clearInterval(intervalo);

                    contador.textContent = "✓";

                    mensaje.textContent =
                        "¡Excelente! Terminaste los 30 segundos. ¿Qué tan fácil te resultó hablar sin leer?";

                    botonInicio.textContent =
                        "Ejercicio terminado";

                }

            }, 1000);

        });

    }


    // ==========================================
    // EJERCICIO 2
    // CONSTRUYE UN ARGUMENTO
    // ==========================================

    function ejercicioArgumento() {

        crearVentana(
            "Construye un argumento",

            `
            <p>
                Escribe una opinión sobre un tema y
                acompáñala con una razón que la respalde.
            </p>

            <p>
                <strong>Ejemplo:</strong>
                "Creo que los estudiantes deberían leer más
                porque la lectura mejora la comprensión."
            </p>

            <label>
                Tu opinión:
            </label>

            <textarea
                id="opinion"
                rows="4"
                placeholder="Escribe aquí tu opinión..."
            ></textarea>

            <label>
                Tu razón:
            </label>

            <textarea
                id="razon"
                rows="4"
                placeholder="¿Por qué piensas eso?"
            ></textarea>

            <button id="evaluar-argumento"
                    class="exercise-action">
                Revisar mi argumento
            </button>

            <p id="resultado-argumento"></p>
            `
        );


        const boton =
            document.getElementById("evaluar-argumento");

        boton.addEventListener("click", () => {

            const opinion =
                document.getElementById("opinion").value.trim();

            const razon =
                document.getElementById("razon").value.trim();

            const resultado =
                document.getElementById("resultado-argumento");


            if (!opinion || !razon) {

                resultado.textContent =
                    "Completa tanto la opinión como la razón para construir tu argumento.";

                return;
            }


            if (opinion.length < 15 || razon.length < 15) {

                resultado.textContent =
                    "Tu argumento tiene una buena base, pero intenta desarrollar un poco más tus ideas.";

                return;
            }


            resultado.textContent =
                "¡Muy bien! Presentaste una opinión acompañada de una razón. Ese es un elemento fundamental de la argumentación.";

        });

    }


    // ==========================================
    // EJERCICIO 3
    // RETO DE IMPROVISACIÓN
    // ==========================================

    function ejercicioImprovisacion() {

        const temas = [
            "¿Por qué es importante aprender a escuchar?",
            "¿Las redes sociales ayudan o perjudican la comunicación?",
            "¿Qué hace que una persona sea un buen líder?",
            "¿Por qué debemos cuidar el medio ambiente?",
            "¿Es importante saber trabajar en equipo?",
            "¿Qué significa tener confianza en uno mismo?",
            "¿La tecnología mejora nuestra forma de comunicarnos?",
            "¿Por qué es importante expresar nuestras ideas?"
        ];

        const tema =
            temas[Math.floor(Math.random() * temas.length)];


        crearVentana(
            "Reto de improvisación",

            `
            <p>
                Tendrás que pensar rápidamente y preparar
                una respuesta sobre el siguiente tema:
            </p>

            <div class="random-topic">
                ${tema}
            </div>

            <div class="timer">
                <span id="prep-time">30</span>
                <small>segundos para prepararte</small>
            </div>

            <button id="start-improvisacion"
                    class="exercise-action">
                Comenzar reto
            </button>

            <p id="impro-message"></p>

            <button id="new-topic"
                    class="exercise-secondary">
                Generar otro tema
            </button>
            `
        );


        const boton =
            document.getElementById("start-improvisacion");

        const contador =
            document.getElementById("prep-time");

        const mensaje =
            document.getElementById("impro-message");

        const nuevoTema =
            document.getElementById("new-topic");

        let tiempo = 30;
        let intervalo = null;


        boton.addEventListener("click", () => {

            boton.disabled = true;
            boton.textContent = "Prepárate...";

            intervalo = setInterval(() => {

                tiempo--;

                contador.textContent = tiempo;

                if (tiempo <= 0) {

                    clearInterval(intervalo);

                    contador.textContent = "¡YA!";

                    mensaje.textContent =
                        "¡Comienza a hablar! Intenta mantener tu respuesta durante al menos 30 segundos.";

                    boton.textContent =
                        "Reto iniciado";

                }

            }, 1000);

        });


        nuevoTema.addEventListener("click", () => {

            if (intervalo) {
                clearInterval(intervalo);
            }

            ejercicioImprovisacion();

        });

    }


    // ==========================================
    // MENSAJE EN CONSOLA
    // ==========================================

    console.log(
        "Rodach - Proyecto de Oratoria iniciado correctamente."
    );

});
