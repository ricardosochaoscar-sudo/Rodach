// ==========================================
// PROYECTO DE ORATORIA - RODACH
// INTERACTIVIDAD
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
    // SISTEMA DE EJERCICIOS
    // ==========================================

    const botones = document.querySelectorAll(
        ".practice-card button"
    );

    const ejercicios = [

        {
            titulo: "Habla durante 30 segundos",
            etiqueta: "EJERCICIO DE FLUIDEZ",

            descripcion:
                "Elige un tema que conozcas y habla durante 30 segundos sin leer ni memorizar un texto.",

            paraQueSirve:
                "Este ejercicio ayuda a practicar la fluidez verbal, la organización espontánea de ideas y la capacidad de mantener un discurso sin depender de un texto escrito.",

            instrucciones: [
                "Elige un tema que conozcas bien.",
                "Pulsa el botón para iniciar el cronómetro.",
                "Habla durante 30 segundos sin leer.",
                "Intenta mantener una idea principal y desarrollarla.",
                "Al terminar, evalúa cómo fue tu desempeño."
            ],

            comprobacion: `
                <p><strong>¿Cómo saber si lo hiciste correctamente?</strong></p>

                <ul>
                    <li>¿Hablaste durante aproximadamente 30 segundos?</li>
                    <li>¿Pudiste mantener una idea sin quedarte completamente en blanco?</li>
                    <li>¿Evitaste leer o memorizar un texto?</li>
                    <li>¿Tus ideas pudieron entenderse?</li>
                    <li>¿Utilizaste pausas sin perder completamente el hilo?</li>
                </ul>

                <p class="exercise-note">
                    Hablar con fluidez no significa hablar rápidamente.
                    La fluidez implica poder expresar las ideas de manera
                    continua y comprensible, utilizando pausas cuando sean necesarias.
                </p>
            `,

            tipo: "fluidez"
        },


        {
            titulo: "Construye un argumento",
            etiqueta: "EJERCICIO DE ARGUMENTACIÓN",

            descripcion:
                "Escribe una opinión sobre un tema y acompáñala con una razón que la respalde.",

            paraQueSirve:
                "Este ejercicio permite practicar la construcción de argumentos: presentar una postura y justificarla mediante razones que tengan relación con ella.",

            instrucciones: [
                "Elige un tema sobre el que tengas una opinión.",
                "Escribe claramente tu postura.",
                "Escribe una razón que la respalde.",
                "Revisa si la razón realmente tiene relación con tu opinión.",
                "Comprueba si otra persona podría entender por qué piensas así."
            ],

            comprobacion: `
                <p><strong>¿Cómo saber si tu argumento está bien construido?</strong></p>

                <ul>
                    <li>¿Tu opinión está expresada claramente?</li>
                    <li>¿La razón realmente respalda esa opinión?</li>
                    <li>¿Existe una relación lógica entre ambas?</li>
                    <li>¿Puedes explicar por qué tu razón apoya tu postura?</li>
                    <li>¿Evitas contradecir tu propia posición?</li>
                </ul>

                <p class="exercise-note">
                    Un argumento no se vuelve verdadero simplemente porque
                    esté bien escrito. Para evaluar su solidez también es
                    necesario revisar la calidad y veracidad de las razones
                    y evidencias utilizadas.
                </p>
            `,

            tipo: "argumento"
        },


        {
            titulo: "Reto de improvisación",
            etiqueta: "EJERCICIO DE IMPROVISACIÓN",

            descripcion:
                "Recibe un tema y prepara una respuesta en un tiempo limitado.",

            paraQueSirve:
                "La improvisación permite practicar la capacidad de organizar ideas rápidamente y responder ante situaciones en las que no se dispone de mucho tiempo para preparar un discurso.",

            instrucciones: [
                "Elige uno de los temas disponibles.",
                "Lee el tema una sola vez.",
                "Piensa durante unos segundos qué quieres decir.",
                "Habla intentando mantener una estructura sencilla.",
                "Al finalizar, revisa cómo organizaste tus ideas."
            ],

            comprobacion: `
                <p><strong>¿Cómo saber si realizaste bien el reto?</strong></p>

                <ul>
                    <li>¿Pudiste comenzar a hablar sin necesitar un texto?</li>
                    <li>¿Presentaste una idea principal?</li>
                    <li>¿Pudiste desarrollar esa idea?</li>
                    <li>¿Mantuviste cierta coherencia?</li>
                    <li>¿Lograste terminar tu intervención con una conclusión?</li>
                </ul>

                <p class="exercise-note">
                    Improvisar correctamente no significa hablar sin pausas
                    ni producir una respuesta perfecta. El objetivo es
                    aprender a organizar y comunicar ideas bajo una
                    limitación de tiempo.
                </p>
            `,

            tipo: "improvisacion"
        }

    ];


    // ==========================================
    // CREAR INTERFAZ DEL EJERCICIO
    // ==========================================

    const modal = document.createElement("div");

    modal.className = "exercise-modal";

    modal.innerHTML = `
        <div class="exercise-overlay"></div>

        <div class="exercise-window">

            <button
                class="exercise-close"
                type="button"
                aria-label="Cerrar ejercicio">
                ×
            </button>

            <div class="exercise-header">

                <p class="exercise-label">
                    EJERCICIO DE ORATORIA
                </p>

                <h2 id="exercise-title">
                    Ejercicio
                </h2>

                <p id="exercise-description"></p>

            </div>


            <div class="exercise-content">

                <div class="exercise-purpose">

                    <span>¿PARA QUÉ SIRVE?</span>

                    <p id="exercise-purpose-text"></p>

                </div>


                <div class="exercise-instructions">

                    <h3>¿Cómo realizarlo?</h3>

                    <ol id="exercise-instructions-list"></ol>

                </div>


                <div
                    id="exercise-interactive"
                    class="exercise-interactive">
                </div>


                <div
                    id="exercise-check"
                    class="exercise-check">
                </div>


                <div class="exercise-result">

                    <h3>Mi resultado</h3>

                    <p>
                        Evalúa tu desempeño después de completar
                        el ejercicio.
                    </p>

                    <div class="result-options">

                        <label>
                            <input
                                type="radio"
                                name="resultado"
                                value="1">
                            Necesito practicar más
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="resultado"
                                value="2">
                            Lo hice parcialmente bien
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="resultado"
                                value="3">
                            Lo hice correctamente
                        </label>

                    </div>

                    <button
                        id="save-result"
                        class="exercise-main-button"
                        type="button">
                        Guardar resultado
                    </button>

                    <p
                        id="result-message"
                        class="result-message">
                    </p>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    // ==========================================
    // ELEMENTOS
    // ==========================================

    const titulo = document.getElementById("exercise-title");
    const descripcion =
        document.getElementById("exercise-description");

    const proposito =
        document.getElementById("exercise-purpose-text");

    const instrucciones =
        document.getElementById("exercise-instructions-list");

    const interactivo =
        document.getElementById("exercise-interactive");

    const comprobacion =
        document.getElementById("exercise-check");

    const cerrar =
        document.querySelector(".exercise-close");

    const overlay =
        document.querySelector(".exercise-overlay");

    const guardar =
        document.getElementById("save-result");

    const mensaje =
        document.getElementById("result-message");


    let intervalo = null;
    let tiempo = 30;


    // ==========================================
    // ABRIR EJERCICIO
    // ==========================================

    function abrirEjercicio(numero) {

        const ejercicio = ejercicios[numero];

        titulo.textContent = ejercicio.titulo;
        descripcion.textContent = ejercicio.descripcion;
        proposito.textContent = ejercicio.paraQueSirve;

        instrucciones.innerHTML = "";

        ejercicio.instrucciones.forEach(paso => {

            const li = document.createElement("li");

            li.textContent = paso;

            instrucciones.appendChild(li);

        });

        comprobacion.innerHTML = ejercicio.comprobacion;

        interactivo.innerHTML = "";

        mensaje.textContent = "";

        document
            .querySelectorAll('input[name="resultado"]')
            .forEach(input => {
                input.checked = false;
            });


        // ==========================================
        // EJERCICIO 30 SEGUNDOS
        // ==========================================

        if (ejercicio.tipo === "fluidez") {

            interactivo.innerHTML = `

                <div class="timer-box">

                    <p class="timer-label">
                        CRONÓMETRO
                    </p>

                    <div
                        id="timer"
                        class="timer">
                        30
                    </div>

                    <button
                        id="start-timer"
                        class="exercise-main-button"
                        type="button">
                        Comenzar
                    </button>

                    <p id="timer-status">
                        Cuando esté listo, comience a hablar.
                    </p>

                </div>

            `;

            const timer =
                document.getElementById("timer");

            const iniciar =
                document.getElementById("start-timer");

            const estado =
                document.getElementById("timer-status");

            tiempo = 30;

            iniciar.addEventListener("click", () => {

                clearInterval(intervalo);

                tiempo = 30;

                timer.textContent = tiempo;

                iniciar.disabled = true;

                estado.textContent =
                    "Hable ahora. Intente mantener el hilo de sus ideas.";

                intervalo = setInterval(() => {

                    tiempo--;

                    timer.textContent = tiempo;

                    if (tiempo <= 0) {

                        clearInterval(intervalo);

                        timer.textContent = "✓";

                        estado.textContent =
                            "Tiempo terminado. Ahora evalúe su desempeño.";

                        iniciar.disabled = false;
                    }

                }, 1000);

            });

        }


        // ==========================================
        // EJERCICIO DE ARGUMENTACIÓN
        // ==========================================

        if (ejercicio.tipo === "argumento") {

            interactivo.innerHTML = `

                <div class="argument-box">

                    <label>
                        Mi opinión
                    </label>

                    <textarea
                        id="opinion"
                        placeholder="Escriba aquí su opinión...">
                    </textarea>

                    <label>
                        Mi razón
                    </label>

                    <textarea
                        id="razon"
                        placeholder="¿Por qué piensa eso?">
                    </textarea>

                    <button
                        id="review-argument"
                        class="exercise-main-button"
                        type="button">
                        Revisar mi argumento
                    </button>

                    <div
                        id="argument-feedback"
                        class="argument-feedback">
                    </div>

                </div>

            `;

            document
                .getElementById("review-argument")
                .addEventListener("click", () => {

                    const opinion =
                        document
                        .getElementById("opinion")
                        .value.trim();

                    const razon =
                        document
                        .getElementById("razon")
                        .value.trim();

                    const feedback =
                        document
                        .getElementById("argument-feedback");

                    if (!opinion || !razon) {

                        feedback.innerHTML =
                            "<p>Complete la opinión y la razón antes de revisar el argumento.</p>";

                        return;
                    }

                    feedback.innerHTML = `
                        <h4>Revisión inicial</h4>

                        <p>
                            Su argumento tiene una postura y una razón.
                            Ahora pregúntese:
                        </p>

                        <ul>
                            <li>
                                ¿La razón realmente respalda mi opinión?
                            </li>

                            <li>
                                ¿Podría explicar la relación entre ambas?
                            </li>

                            <li>
                                ¿Tengo algún dato o ejemplo que pueda respaldar mi razón?
                            </li>

                            <li>
                                ¿Existe alguna contradicción entre lo que afirmo y mi razón?
                            </li>
                        </ul>

                        <p>
                            Esta revisión no determina automáticamente
                            si su opinión es verdadera o falsa. Evalúa
                            principalmente la estructura y coherencia
                            básica del argumento.
                        </p>
                    `;

                });

        }


        // ==========================================
        // IMPROVISACIÓN
        // ==========================================

        if (ejercicio.tipo === "improvisacion") {

            const temas = [
                "¿Deberían los estudiantes leer más?",
                "¿Es importante practicar un deporte?",
                "¿Qué hace que una persona sea un buen líder?",
                "¿Las redes sociales ayudan a comunicarnos?",
                "¿Qué habilidad debería aprender todo estudiante?"
            ];

            const tema =
                temas[Math.floor(Math.random() * temas.length)];

            interactivo.innerHTML = `

                <div class="improvisation-box">

                    <p class="topic-label">
                        SU TEMA ES:
                    </p>

                    <h3>
                        ${tema}
                    </h3>

                    <p>
                        Tiene unos segundos para organizar
                        sus ideas y comenzar a hablar.
                    </p>

                    <button
                        id="new-topic"
                        class="exercise-secondary-button"
                        type="button">
                        Otro tema
                    </button>

                </div>

            `;

            document
                .getElementById("new-topic")
                .addEventListener("click", () => {

                    const nuevoTema =
                        temas[Math.floor(
                            Math.random() * temas.length
                        )];

                    interactivo.querySelector("h3")
                        .textContent = nuevoTema;

                });

        }


        modal.classList.add("active");

        document.body.classList.add("exercise-open");

    }


    // ==========================================
    // BOTONES DE PRACTICA
    // ==========================================

    botones.forEach((boton, indice) => {

        boton.addEventListener("click", () => {

            abrirEjercicio(indice);

        });

    });


    // ==========================================
    // CERRAR
    // ==========================================

    function cerrarEjercicio() {

        clearInterval(intervalo);

        modal.classList.remove("active");

        document.body.classList.remove("exercise-open");

    }

    cerrar.addEventListener("click", cerrarEjercicio);

    overlay.addEventListener("click", cerrarEjercicio);


    // ==========================================
    // GUARDAR RESULTADO
    // ==========================================

    guardar.addEventListener("click", () => {

        const seleccionado =
            document.querySelector(
                'input[name="resultado"]:checked'
            );

        if (!seleccionado) {

            mensaje.textContent =
                "Seleccione una opción antes de guardar.";

            return;

        }

        const valor =
            seleccionado.value;

        const textos = {
            "1": "Debe seguir practicando. Lo importante es identificar qué aspecto necesita mejorar.",
            "2": "Buen comienzo. Ya logró realizar parte del ejercicio, pero todavía puede mejorar.",
            "3": "Buen trabajo. Puede intentar nuevamente para seguir desarrollando la habilidad."
        };

        mensaje.textContent =
            textos[valor];

        localStorage.setItem(
            "resultado-oratoria",
            valor
        );

    });

});
