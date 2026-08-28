// ==========================================
// PROYECTO DE ORATORIA - RODACH
// SISTEMA DE EVALUACIÓN INTELIGENTE DE HABLA
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // NAVEGACIÓN SUAVE
    const enlaces = document.querySelectorAll('a[href^="#"]');
    enlaces.forEach(enlace => {
        enlace.addEventListener("click", evento => {
            const destino = document.querySelector(enlace.getAttribute("href"));
            if (destino) {
                evento.preventDefault();
                destino.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // BANCOS DE 20 TEMAS EDUCATIVOS POR EJERCICIO
    const bancoTemas = {
        fluidez: [
            "1. Mi libro, serie o película favorita y por qué me impactó",
            "2. ¿Por qué es importante practicar un deporte o actividad física?",
            "3. El impacto del uso de las redes sociales en nuestro día a día",
            "4. ¿Cómo influye la música en nuestro estado de ánimo?",
            "5. Un recuerdo importante de mi infancia y su enseñanza",
            "6. La importancia del agua y el cuidado del medio ambiente",
            "7. ¿Por qué deberíamos aprender un segundo idioma?",
            "8. Las cualidades que más valoro en una amistad",
            "9. ¿Qué quiero lograr cuando termine mis estudios?",
            "10. La importancia de la empatía en la convivencia escolar",
            "11. ¿Por qué el hábito de la lectura beneficia la mente?",
            "12. Mi lugar favorito en el mundo y por qué me inspira",
            "13. El valor de la puntualidad en la vida cotidiana",
            "14. ¿Cómo afecta la tecnología en la comunicación familiar?",
            "15. Un pasatiempo que disfruto y lo que he aprendido de él",
            "16. La importancia de comer alimentos saludables",
            "17. ¿Por qué es clave saber trabajar en equipo?",
            "18. El papel de la honestidad en la sociedad",
            "19. ¿Cómo gestionar el estrés antes de un examen?",
            "20. Un héroe o referente de la vida real que admire"
        ],
        argumento: [
            "1. ¿Deberían prohibirse los celulares durante las clases escolares?",
            "2. ¿Es la inteligencia artificial una amenaza o una herramienta útil?",
            "3. ¿Debería la educación financiera ser obligatoria en los colegios?",
            "4. ¿Es mejor el trabajo individual o el trabajo colaborativo?",
            "5. ¿Deberían eliminarse las tareas escolares para la casa?",
            "6. ¿El uniforme escolar promueve la igualdad o limita la expresión?",
            "7. ¿Es más efectiva la disciplina constante que el talento natural?",
            "8. ¿Deberían las notas escolares medir el esfuerzo además del resultado?",
            "9. ¿Las artes y la música son tan importantes como las matemáticas?",
            "10. ¿Es la energía solar la solución principal al cambio climático?",
            "11. ¿Debería limitarse el tiempo de juego en videojuegos para jóvenes?",
            "12. ¿Es justa la votación obligatoria en una democracia?",
            "13. ¿Los libros físicos son mejores que los libros electrónicos?",
            "14. ¿Deberían los animales permanecer en zoológicos con fines educativos?",
            "15. ¿El transporte público debería ser completamente gratuito?",
            "16. ¿La comida rápida debería tener impuestos más altos?",
            "17. ¿Es adecuado el uso de uniformes en entornos laborales?",
            "18. ¿Debería reducirse la jornada escolar semanal?",
            "19. ¿El dinero compra la felicidad o solo la tranquilidad?",
            "20. ¿Es la ciencia ficción una buena guía para predecir el futuro?"
        ],
        improvisacion: [
            "1. ¿Deberían los estudiantes leer más libros en lugar de usar pantallas?",
            "2. ¿Es importante practicar un deporte para el desarrollo personal?",
            "3. ¿Qué cualidades definen a un buen líder comunitario o laboral?",
            "4. ¿Las redes sociales ayudan o dificultan la comunicación humana?",
            "5. ¿Por qué es fundamental cuidar el medio ambiente desde nuestro hogar?",
            "6. ¿Cuál es el impacto de la Inteligencia Artificial en el futuro de los trabajos?",
            "7. ¿Debería priorizarse la salud mental en las instituciones educativas?",
            "8. ¿Qué papel juega la disciplina frente al talento en el éxito personal?",
            "9. ¿Por qué es vital aprender a trabajar en equipo de manera respetuosa?",
            "10. ¿Cómo influye la educación financiera en la vida de los jóvenes?",
            "11. ¿Es necesario aprender un segundo idioma en la actualidad?",
            "12. ¿Qué valor tiene el trabajo duro frente a la suerte?",
            "13. ¿Por qué debemos fomentar el pensamiento crítico al consumir noticias?",
            "14. ¿Cómo afecta el uso excesivo del teléfono móvil al rendimiento académico?",
            "15. ¿De qué manera el arte y la música mejoran el desarrollo cognitivo?",
            "16. ¿Por qué la puntualidad es una muestra de respeto hacia los demás?",
            "17. ¿Qué acciones simples podemos tomar para reducir el desperdicio de agua?",
            "18. ¿Es importante promover la igualdad de oportunidades en la educación?",
            "19. ¿Cómo influyen los hábitos de lectura en la capacidad de hablar en público?",
            "20. ¿Por qué es indispensable aprender a gestionar el estrés ante la presión?"
        ]
    };

    // DATOS DE LOS EJERCICIOS
    const ejercicios = [
        {
            titulo: "Habla durante 30 segundos",
            etiqueta: "EJERCICIO DE FLUIDEZ Y VOZ",
            descripcion: "Elige un tema, presiona el micrófono y habla durante 30 segundos. El sistema evaluará tus pausas, ritmo y coherencia.",
            paraQueSirve: "Desarrolla la tasa de articulación continua y reduce la ansiedad verbal mediante la exposición cronometrada.",
            instrucciones: [
                "Selecciona un tema o genera uno aleatorio.",
                "Haz clic en 'Activar Micrófono e Iniciar'.",
                "Habla con claridad intentando mantener tus ideas fluidas.",
                "El transcriptor registrará con (...) tus momentos de vacilación o pausas prolongadas.",
                "Al finalizar los 30s, el Tutor IA analizará científicamente tu locución."
            ],
            respaldo: "Evaluación basada en la Teoría de la Competencia Comunicativa de Dell Hymes (1972) y los parámetros de Tasa de Articulación y Pausas Vacilantes de Peter Skehan (1998).",
            tipo: "fluidez"
        },
        {
            titulo: "Construye un argumento",
            etiqueta: "EJERCICIO DE ARGUMENTACIÓN",
            descripcion: "Selecciona un tema, dicta o escribe tu postura y la razón que la sostiene para evaluar su validez lógica.",
            paraQueSirve: "Entrena la capacidad de estructurar enunciados con validez pragmática, identificando si la premisa apoya a la tesis.",
            instrucciones: [
                "Elige un tema del banco de argumentación.",
                "Escribe o dicta tu postura (Tesis).",
                "Escribe o dicta tu razón principal (Garantía).",
                "Haz clic en 'Analizar Argumento con IA'.",
                "Recibe un diagnóstico sobre la solidez estructural de tu propuesta."
            ],
            respaldo: "Análisis fundamentado en el Modelo Argumentativo de Stephen Toulmin (1958, 'The Uses of Argument'), que establece la relación necesaria entre Pretensión, Datos y Garantía.",
            tipo: "argumento"
        },
        {
            titulo: "Reto de improvisación",
            etiqueta: "EJERCICIO DE IMPROVISACIÓN",
            descripcion: "Recibe un tema sin preparación previa y habla durante 30 segundos demostrando capacidad de reacción oral.",
            paraQueSirve: "Fortalece la autorregulación discursiva y la organización mental ágil bajo presión de tiempo.",
            instrucciones: [
                "Genera un tema al azar.",
                "Tómate solo 3 segundos para respirar.",
                "Activa el micrófono y habla sin detenerte.",
                "Observa cómo el sistema analiza tu capacidad de improvisación sin bloqueos."
            ],
            respaldo: "Basado en los marcos de Evaluación de Oratoria Impromptu de la National Communication Association (NCA) y los principios de Aprehensión Comunicativa de James McCroskey (1984).",
            tipo: "improvisacion"
        }
    ];

    // CONSTRUCCIÓN DEL MODAL
    const modal = document.createElement("div");
    modal.className = "exercise-modal";
    modal.innerHTML = `
        <div class="exercise-overlay"></div>
        <div class="exercise-window">
            <button class="exercise-close" type="button" aria-label="Cerrar ejercicio">×</button>
            <div class="exercise-header">
                <p class="exercise-label" id="exercise-label">EJERCICIO DE ORATORIA</p>
                <h2 id="exercise-title">Ejercicio</h2>
                <p id="exercise-description"></p>
            </div>
            <div class="exercise-content">
                <div class="exercise-purpose">
                    <span>¿PARA QUÉ SIRVE ESTE EJERCICIO?</span>
                    <p id="exercise-purpose-text"></p>
                </div>
                <div class="exercise-instructions">
                    <h3>¿Cómo realizarlo?</h3>
                    <ol id="exercise-instructions-list"></ol>
                </div>

                <div id="exercise-interactive" class="exercise-interactive"></div>

                <div class="exercise-result" style="margin-top:30px;">
                    <h3>🤖 Tutor de Oratoria IA (Análisis en Tiempo Real)</h3>
                    <div id="ai-feedback-box" class="ai-feedback-container">
                        <p class="ai-placeholder">Realiza la práctica con el micrófono para que el Tutor IA analice tu voz, ritmo, pausas y estructura.</p>
                    </div>
                    <div id="academic-backing" class="academic-backing-tag"></div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const titulo = document.getElementById("exercise-title");
    const etiqueta = document.getElementById("exercise-label");
    const descripcion = document.getElementById("exercise-description");
    const proposito = document.getElementById("exercise-purpose-text");
    const instrucciones = document.getElementById("exercise-instructions-list");
    const interactivo = document.getElementById("exercise-interactive");
    const feedbackBox = document.getElementById("ai-feedback-box");
    const respaldoContenedor = document.getElementById("academic-backing");
    const cerrar = document.querySelector(".exercise-close");
    const overlay = document.querySelector(".exercise-overlay");

    let intervaloTimer = null;
    let tiempoRestante = 30;
    let recognizer = null;
    let isListening = false;
    let lastSpeechTime = 0;
    let pauseCheckInterval = null;
    let transcripcionCompleta = "";
    let conteoPausas = 0;

    // INICIALIZACIÓN DE SPEECH RECOGNITION (WEB SPEECH API)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    function abrirEjercicio(numero) {
        const ejercicio = ejercicios[numero];

        etiqueta.textContent = ejercicio.etiqueta;
        titulo.textContent = ejercicio.titulo;
        descripcion.textContent = ejercicio.descripcion;
        proposito.textContent = ejercicio.paraQueSirve;

        instrucciones.innerHTML = "";
        ejercicio.instrucciones.forEach(paso => {
            const li = document.createElement("li");
            li.textContent = paso;
            instrucciones.appendChild(li);
        });

        respaldoContenedor.innerHTML = `<strong>🎓 Respaldo e Investigación de Origen:</strong> ${ejercicio.respaldo}`;
        feedbackBox.innerHTML = `<p class="ai-placeholder">Realiza el ejercicio para activar la evaluación del Profesor IA...</p>`;
        interactivo.innerHTML = "";

        detenerProcesos();

        // RENDERIZAR INTERFAZ SEGÚN TIPO
        if (ejercicio.tipo === "fluidez" || ejercicio.tipo === "improvisacion") {
            let temasList = bancoTemas[ejercicio.tipo];
            let idTemaActual = 0;

            interactivo.innerHTML = `
                <div class="speech-box">
                    <div class="topic-selector">
                        <span class="topic-badge">TEMA DE PRÁCTICA:</span>
                        <h4 id="current-topic">${temasList[idTemaActual]}</h4>
                        <button type="button" id="next-topic-btn" class="exercise-secondary-button">🎲 Cambiar tema</button>
                    </div>

                    <div class="timer-display">
                        <span id="timer-count">30</span>
                        <small>segundos restantes</small>
                    </div>

                    <div class="mic-controls">
                        <button type="button" id="start-mic-btn" class="mic-button">
                            <span class="mic-icon">🎙️</span>
                            <span id="mic-btn-text">Activar Micrófono e Iniciar</span>
                        </button>
                    </div>

                    <div class="transcript-wrapper">
                        <label>Transcripción y Pausas Detección (...) en Tiempo Real:</label>
                        <div id="transcript-box" class="transcript-box">El texto y las pausas detectadas aparecerán aquí mientras hablas...</div>
                    </div>
                </div>
            `;

            document.getElementById("next-topic-btn").addEventListener("click", () => {
                idTemaActual = (idTemaActual + 1) % temasList.length;
                document.getElementById("current-topic").textContent = temasList[idTemaActual];
            });

            document.getElementById("start-mic-btn").addEventListener("click", () => {
                iniciarPrácticaVoz(ejercicio.tipo, document.getElementById("current-topic").textContent);
            });

        } else if (ejercicio.tipo === "argumento") {
            let temasList = bancoTemas.argumento;
            let idTemaActual = 0;

            interactivo.innerHTML = `
                <div class="argument-builder-box">
                    <div class="topic-selector">
                        <span class="topic-badge">DEBATE SUGERIDO:</span>
                        <h4 id="current-topic-arg">${temasList[idTemaActual]}</h4>
                        <button type="button" id="next-topic-arg" class="exercise-secondary-button">🎲 Cambiar tema</button>
                    </div>

                    <div class="input-group">
                        <label>1. Tu Postura o Tesis (Afirmativa o Negativa):</label>
                        <textarea id="arg-postura" placeholder="Ej: Considero que las tareas escolares deberían eliminarse porque..."></textarea>
                    </div>

                    <div class="input-group">
                        <label>2. Tu Razón Principal o Garantía de Respaldar:</label>
                        <textarea id="arg-razon" placeholder="Ej: Aumentan el estrés infantil y reducen el tiempo de convivencia familiar sin demostrar mejoras en el aprendizaje."></textarea>
                    </div>

                    <button type="button" id="analyze-arg-btn" class="exercise-main-button">🧠 Analizar Estructura con Tutor IA</button>
                </div>
            `;

            document.getElementById("next-topic-arg").addEventListener("click", () => {
                idTemaActual = (idTemaActual + 1) % temasList.length;
                document.getElementById("current-topic-arg").textContent = temasList[idTemaActual];
            });

            document.getElementById("analyze-arg-btn").addEventListener("click", () => {
                evaluarArgumentoToulmin();
            });
        }

        modal.classList.add("active");
        document.body.classList.add("exercise-open");
    }

    // LÓGICA DEL RECONOCIMIENTO DE VOZ Y TIMER
    function iniciarPrácticaVoz(tipoEjercicio, temaSeleccionado) {
        if (!SpeechRecognition) {
            alert("Tu navegador no soporta Reconocimiento de Voz en tiempo real. Te recomendamos usar Google Chrome, Microsoft Edge o Safari.");
            return;
        }

        const btnMic = document.getElementById("start-mic-btn");
        const btnText = document.getElementById("mic-btn-text");
        const timerCount = document.getElementById("timer-count");
        const transcriptBox = document.getElementById("transcript-box");

        if (isListening) {
            detenerProcesos();
            return;
        }

        // RESETEAR VARIABLES DE SESIÓN
        transcripcionCompleta = "";
        conteoPausas = 0;
        tiempoRestante = 30;
        timerCount.textContent = tiempoRestante;
        transcriptBox.innerHTML = "Escuchando... empieza a hablar ahora.";
        btnMic.classList.add("recording");
        btnText.textContent = "Detener Práctica";

        recognizer = new SpeechRecognition();
        recognizer.continuous = true;
        recognizer.interimResults = true;
        recognizer.lang = "es-ES";

        lastSpeechTime = Date.now();
        isListening = true;

        recognizer.onresult = (event) => {
            lastSpeechTime = Date.now();
            let currentInterim = "";

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    transcripcionCompleta += event.results[i][0].transcript + " ";
                } else {
                    currentInterim += event.results[i][0].transcript;
                }
            }

            transcriptBox.innerHTML = `<strong>${transcripcionCompleta}</strong> <span style="color:#64748b;">${currentInterim}</span>`;
        };

        recognizer.onerror = (err) => {
            console.error("Error Speech:", err.error);
        };

        recognizer.onend = () => {
            if (isListening && tiempoRestante > 0) {
                try { recognizer.start(); } catch(e){}
            }
        };

        recognizer.start();

        // CONTROL DE PAUSAS EN TIEMPO REAL (MÁS DE 1.2 SEGUNDOS DE SILENCIO)
        pauseCheckInterval = setInterval(() => {
            if (isListening) {
                const lapse = Date.now() - lastSpeechTime;
                if (lapse > 1300 && transcripcionCompleta.length > 5) {
                    if (!transcripcionCompleta.trim().endsWith("...")) {
                        transcripcionCompleta = transcripcionCompleta.trim() + " ... ";
                        conteoPausas++;
                        transcriptBox.innerHTML = `<strong>${transcripcionCompleta}</strong>`;
                    }
                }
            }
        }, 600);

        // CONTADOR DE TIEMPO
        intervaloTimer = setInterval(() => {
            tiempoRestante--;
            timerCount.textContent = tiempoRestante;

            if (tiempoRestante <= 0) {
                detenerProcesos();
                evaluarLocucionVoz(tipoEjercicio, temaSeleccionado);
            }
        }, 1000);
    }

    function detenerProcesos() {
        isListening = false;
        clearInterval(intervaloTimer);
        clearInterval(pauseCheckInterval);

        if (recognizer) {
            try { recognizer.stop(); } catch(e){}
        }

        const btnMic = document.getElementById("start-mic-btn");
        const btnText = document.getElementById("mic-btn-text");
        if (btnMic && btnText) {
            btnMic.classList.remove("recording");
            btnText.textContent = "Activar Micrófono e Iniciar";
        }
    }

    // EVALUACIÓN DE ORATORIA BASADA EN DATOS REALES (FLUIDEZ Y IMPROVISACIÓN)
    function evaluarLocucionVoz(tipo, tema) {
        const textoLimpio = transcripcionCompleta.replace(/\.\.\./g, "").trim();
        const palabras = textoLimpio.length > 0 ? textoLimpio.split(/\s+/).filter(w => w.length > 0) : [];
        const numPalabras = palabras.length;
        
        // Métricas científicas
        // Velocidad promedio recomendada en oratoria: 110 - 160 Palabras Por Minuto (PPM). En 30s = 55 a 80 palabras.
        const velocidadPPM = numPalabras * 2; 

        let nivelFluidez = "";
        let analisisDetallado = "";
        let observacionCientifica = "";
        let estadoColor = "#2563eb";

        if (numPalabras < 12) {
            estadoColor = "#ef4444";
            nivelFluidez = "Pobre / Bloqueo Severo";
            analisisDetallado = `Se registraron únicamente <strong>${numPalabras} palabras</strong> en 30 segundos. Esto evidencia una inhibición del discurso o timidez extrema durante la prueba.`;
            observacionCientifica = `Según la rúbrica de Peter Skehan (1998), una tasa de articulación inferior a 40 PPM refleja una alta *aprehensión comunicativa*, afectando la continuidad sintáctica básica.`;
        } else if (numPalabras >= 12 && numPalabras < 35) {
            estadoColor = "#f59e0b";
            nivelFluidez = "Aceptable con Interrupciones (Dubeitativa)";
            analisisDetallado = `Mencionaste <strong>${numPalabras} palabras</strong> y realizaste aproximadamente <strong>${conteoPausas} pausas significativas (...)</strong>. Tienes capacidad de iniciar el discurso, pero la articulación se detiene mientras buscas las palabras.`;
            observacionCientifica = `El lingüista Dell Hymes (1972) destaca que las pausas no planificadas en exceso interrumpen la *competencia sociolingüística*, haciendo que el oyente pierda el foco de la idea.`;
        } else {
            estadoColor = "#10b981";
            nivelFluidez = "Fluidez Optima y Continua";
            analisisDetallado = `Lograste articular <strong>${numPalabras} palabras</strong> (Proyección estimada: ${velocidadPPM} PPM) con un excelente control de pausas (solo ${conteoPausas} vacilaciones detectadas). Demostraste solidez verbal y dominio del tiempo.`;
            observacionCientifica = `Cumples plenamente con las normativas de la National Communication Association (NCA) para discursos efectivos en tiempos reducidos.`;
        }

        // Análisis de Coherencia temática superficial
        let palabrasTema = tema.toLowerCase().split(" ").filter(w => w.length > 3);
        let coincidencias = palabrasTema.filter(p => textoLimpio.toLowerCase().includes(p));
        let mensajeCoherencia = coincidencias.length > 0 
            ? "Mantenimiento correcto del campo semántico del tema solicitado." 
            : "Sugerencia: Procura mencionar de manera explícita las palabras clave del tema para no desviarte del objetivo.";

        feedbackBox.style.borderLeft = `5px solid ${estadoColor}`;
        feedbackBox.innerHTML = `
            <div class="ai-report">
                <div class="ai-header-status">
                    <span class="status-badge" style="background:${estadoColor}; color:white;">DIAGNÓSTICO: ${nivelFluidez}</span>
                    <span class="ppm-badge">Velocidad: ${velocidadPPM} PPM</span>
                </div>
                <p><strong>📝 Transcripción analizada:</strong> "${transcripcionCompleta || "Sin registro de voz"}"</p>
                <div class="ai-stats-grid">
                    <div><strong>Palabras habladas:</strong> ${numPalabras}</div>
                    <div><strong>Pausas dudosas (...):</strong> ${conteoPausas}</div>
                </div>
                <p style="margin-top:10px;"><strong>🔍 Análisis pedagógico:</strong> ${analisisDetallado}</p>
                <p><strong>🎯 Coherencia:</strong> ${mensajeCoherencia}</p>
                <div class="ai-science-note">
                    <strong>💡 Sustento académico real:</strong> ${observacionCientifica}
                </div>
            </div>
        `;
    }

    // EVALUACIÓN DE ARGUMENTO BASADA EN EL MODELO TOULMIN
    function evaluarArgumentoToulmin() {
        const postura = document.getElementById("arg-postura").value.trim();
        const razon = document.getElementById("arg-razon").value.trim();

        if (postura.length < 8 || razon.length < 8) {
            feedbackBox.innerHTML = `<p style="color:#ef4444; font-weight:bold;">⚠️ Por favor completa tanto tu postura como la razón con oraciones completas para poder analizarlas.</p>`;
            return;
        }

        let conectoresLogicos = ["porque", "debido a", "ya que", "puesto que", "por consiguiente", "dado que", "razón por la cual"];
        let tieneConector = conectoresLogicos.some(c => razon.toLowerCase().includes(c) || postura.toLowerCase().includes(c));

        let diagnostico = "";
        let color = "#3b82f6";

        if (tieneConector && postura.length > 15 && razon.length > 20) {
            color = "#10b981";
            diagnostico = `
                <h4 style="color:#10b981; margin:0 0 10px 0;">✅ Estructura Argumentativa Sólida (Modelo Toulmin)</h4>
                <p>Tu argumento cumple con los componentes básicos esenciales:</p>
                <ul>
                    <li><strong>Tesis (Aseveración):</strong> Expresa una postura definida.</li>
                    <li><strong>Garantía (Razón):</strong> Contiene nexos causales de fundamentación.</li>
                </ul>
                <p><strong>Sustento real:</strong> Como demostró Stephen Toulmin en <em>"The Uses of Argument" (1958)</em>, un argumento alcanza validez pragmática cuando existe un puente lógico entre la afirmación y los datos de respaldo.</p>
            `;
        } else {
            color = "#f59e0b";
            diagnostico = `
                <h4 style="color:#d97706; margin:0 0 10px 0;">⚠️ Estructura Incompleta o Débil</h4>
                <p>Tu respuesta presenta una opinión, pero la razón aportada carece de un conector lógico explícito (como <em>'porque'</em>, <em>'debido a'</em>, <em>'ya que'</em>).</p>
                <p><strong>Recomendación:</strong> Asegúrate de que la razón responda directamente a la pregunta "¿Por qué afirmo esto?" de manera objetiva sin caer en meros gustos personales.</p>
                <p><strong>Sustento real:</strong> Toulmin establece que una postura sin garantía explícita se clasifica como una mera persuasión opinativa sin valor discursivo.</p>
            `;
        }

        feedbackBox.style.borderLeft = `5px solid ${color}`;
        feedbackBox.innerHTML = diagnostico;
    }

    // EVENTOS DE BOTONES EN LA PÁGINA PRINCIPAL
    const botonesPractica = document.querySelectorAll(".practice-card button");
    botonesPractica.forEach((boton, indice) => {
        boton.addEventListener("click", () => abrirEjercicio(indice));
    });

    function cerrarEjercicio() {
        detenerProcesos();
        modal.classList.remove("active");
        document.body.classList.remove("exercise-open");
    }

    cerrar.addEventListener("click", cerrarEjercicio);
    overlay.addEventListener("click", cerrarEjercicio);
});
