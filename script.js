// ==========================================
// PROYECTO DE ORATORIA - SENA (RODACH)
// TUTOR RODACH Y TRANSCRIPTOR DE VOZ DETECTOR DE PAUSAS Y MULETILLAS
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

    // BASE DE DATOS DE CONOCIMIENTO Y EJERCICIOS DEL TUTOR RODACH
    const BASE_DATOS_RODACH = {
        tecnicasRespiracion: [
            "Respiración Diafragmática (4-4-4): Inhala en 4 segundos inflando el abdomen, sostén 4 segundos y exhala en 4 segundos antes de comenzar a hablar para controlar los nervios.",
            "Técnica de las Micropausas: Reemplaza los 'eeee' o 'mmmm' por una inhalación silenciosa por la nariz cada vez que vayas a cambiar de idea."
        ],
        ejerciciosDiccion: [
            "Técnica del Bolígrafo: Coloca un bolígrafo de forma horizontal entre tus dientes y lee un texto en voz alta durante 2 minutos. Esto fuerza los músculos de la mandíbula y mejora la claridad del habla.",
            "Exageración de Vocalización: Lee frases cortas marcando exageradamente el movimiento de los labios y la boca para evitar el susurro o articulación pegada."
        ],
        estrategiasEstructura: [
            "Estructura A-R-E (Afirmación, Razón, Ejemplo): Di claramente tu postura, explica el porqué en una frase y da un ejemplo de la vida real.",
            "Regla del Semáforo: Verde (introduce tu idea en 5 segundos), Amarillo (desarrolla en 15 segundos), Rojo (concluye en 10 segundos para no perder el hilo)."
        ],
        reemplazoMuletillas: [
            "Técnica de la Frase Puente: En lugar de decir 'eeee' o 'este...', usa frases naturales de transición como: 'Un punto importante es...', 'Tomando en cuenta esto...', 'Analizándolo bien...'",
            "Pausa de Silencio Consciente: Aprieta suavemente los dedos del pie dentro del zapato cuando sientas ganas de decir 'mmmm' o 'eeee'; eso te recordará guardar silencio mientras piensas la siguiente palabra."
        ]
    };

    // BANCOS DE 20 TEMAS EDUCATIVOS
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
            descripcion: "Habla sobre el tema. El transcriptor capturará la diferencia entre guardar silencio [PAUSA] y titubear con sonidos como [eeee] o [mmmm].",
            paraQueSirve: "Mide tu continuidad al hablar y te ayuda a eliminar los vacíos o muletillas sonoras.",
            instrucciones: [
                "Selecciona un tema de la lista.",
                "Haz clic en 'Activar Micrófono e Iniciar'.",
                "Expresa tu opinión manteniendo un ritmo constante.",
                "Revisa la retroalimentación directa del Tutor Rodach al finalizar."
            ],
            respaldo: "Basado en metodologías de análisis de fluidez discursiva y fonética aplicada.",
            tipo: "fluidez"
        },
        {
            titulo: "Construye un argumento",
            etiqueta: "EJERCICIO DE ARGUMENTACIÓN",
            descripcion: "Escribe o dicta tu opinión sobre un tema para que el Tutor Rodach verifique la claridad de tu razonamiento.",
            paraQueSirve: "Entrena tu mente para que expreses ideas con lógica sin enredarte.",
            instrucciones: [
                "Selecciona un tema de debate.",
                "Escribe o dicta tu postura principal.",
                "Escribe o dicta la razón que respalda tu idea.",
                "Haz clic en 'Analizar Argumento con Tutor Rodach'."
            ],
            respaldo: "Fundamentado en técnicas de estructuración lógica del discurso.",
            tipo: "argumento"
        },
        {
            titulo: "Reto de improvisación",
            etiqueta: "EJERCICIO DE IMPROVISACIÓN",
            descripcion: "Acepta un tema al azar y habla durante 30 segundos demostrando agilidad mental.",
            paraQueSirve: "Desarrolla la capacidad de pensar y hablar con orden sin quedarte bloqueado.",
            instrucciones: [
                "Genera un tema al azar.",
                "Inicia la grabación y habla de forma fluida.",
                "Evita las muletillas 'eeee' o quedarse mucho tiempo en silencio."
            ],
            respaldo: "Basado en estándares de respuesta discursiva e improvisación técnica.",
            tipo: "improvisacion"
        }
    ];

    // MODAL E INTERFAZ
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
                    <h3>🤖 Tutor Rodach</h3>
                    <div id="ai-feedback-box" class="ai-feedback-container">
                        <p class="ai-placeholder">Realiza la práctica para recibir la retroalimentación del Tutor Rodach...</p>
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

    // VARIABLES DE CONTROL
    let intervaloTimer = null;
    let tiempoRestante = 30;
    let recognizer = null;
    let isListening = false;
    let transcripcionCompleta = "";

    let conteoPausasSilencio = 0;
    let conteoMuletillasSonoras = 0;

    let audioCtx = null;
    let analyser = null;
    let micStream = null;
    let lastWordTime = Date.now();
    let monitorInterval = null;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    function abrirEjercicio(numero) {
        if (!ejercicios[numero]) return;
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

        respaldoContenedor.innerHTML = `<strong>🎓 Metodología Aplicada:</strong> ${ejercicio.respaldo}`;
        feedbackBox.innerHTML = `<p class="ai-placeholder">Realiza la práctica para recibir el diagnóstico del Tutor Rodach...</p>`;
        interactivo.innerHTML = "";

        detenerProcesos();

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
                        <label>Transcriptor de voz:</label>
                        <div id="transcript-box" class="transcript-box">Haz clic en iniciar para hablar...</div>
                    </div>
                </div>
            `;

            document.getElementById("next-topic-btn").addEventListener("click", () => {
                idTemaActual = (idTemaActual + 1) % temasList.length;
                document.getElementById("current-topic").textContent = temasList[idTemaActual];
            });

            document.getElementById("start-mic-btn").addEventListener("click", () => {
                iniciarPracticaVoz(ejercicio.tipo, document.getElementById("current-topic").textContent);
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
                        <label>1. Tu Postura (Lo que piensas sobre el tema):</label>
                        <textarea id="arg-postura" placeholder="Ej: Pienso que los celulares deben prohibirse en clase porque distraen a los estudiantes..."></textarea>
                    </div>

                    <div class="input-group">
                        <label>2. Tu Razón Principal (La prueba o motivo que lo demuestra):</label>
                        <textarea id="arg-razon" placeholder="Ej: Se ha demostrado que las notificaciones continuas interrumpen la concentración y bajan el rendimiento escolar."></textarea>
                    </div>

                    <div class="transcript-wrapper" style="margin-top:15px;">
                        <label>Transcriptor de voz:</label>
                        <div id="transcript-box" class="transcript-box" style="min-height:50px;">Puedes redactar tus campos de texto directamente o usar esta área de apoyo.</div>
                    </div>

                    <button type="button" id="analyze-arg-btn" class="exercise-main-button" style="margin-top:15px;">🧠 Analizar Argumento con Tutor Rodach</button>
                </div>
            `;

            document.getElementById("next-topic-arg").addEventListener("click", () => {
                idTemaActual = (idTemaActual + 1) % temasList.length;
                document.getElementById("current-topic-arg").textContent = temasList[idTemaActual];
            });

            document.getElementById("analyze-arg-btn").addEventListener("click", () => {
                evaluarArgumentoRodach();
            });
        }

        modal.classList.add("active");
        document.body.classList.add("exercise-open");
    }

    // ANALIZADOR DE AUDIO
    async function inicializarAnalizadorAudio() {
        try {
            micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioCtx.createAnalyser();
            const source = audioCtx.createMediaStreamSource(micStream);
            analyser.fftSize = 256;
            source.connect(analyser);
            return true;
        } catch (e) {
            console.warn("Entrada directa de micrófono no disponible:", e);
            return false;
        }
    }

    function obtenerVolumenVoz() {
        if (!analyser) return 0;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        let suma = 0;
        for (let i = 0; i < dataArray.length; i++) {
            suma += dataArray[i];
        }
        return suma / dataArray.length;
    }

    function procesarMuletillasEnTexto(texto) {
        return texto
            .replace(/\b(eh+|ee+|eee+)\b/gi, "[eeee]")
            .replace(/\b(mm+|mmm+|um+|umm+)\b/gi, "[mmmm]")
            .replace(/\b(ah+|aa+|aaa+)\b/gi, "[aaaa]");
    }

    // RECONOCIMIENTO DE VOZ Y SEPARACIÓN DE SILENCIOS Y TUBEOS
    async function iniciarPracticaVoz(tipoEjercicio, temaSeleccionado) {
        if (!SpeechRecognition) {
            alert("Tu navegador no soporta el reconocimiento de voz. Te recomendamos utilizar Google Chrome o Microsoft Edge.");
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

        await inicializarAnalizadorAudio();

        transcripcionCompleta = "";
        conteoPausasSilencio = 0;
        conteoMuletillasSonoras = 0;
        tiempoRestante = 30;
        timerCount.textContent = tiempoRestante;
        transcriptBox.innerHTML = "Escuchando... puedes empezar a hablar.";
        btnMic.classList.add("recording");
        btnText.textContent = "Detener Práctica";

        recognizer = new SpeechRecognition();
        recognizer.continuous = true;
        recognizer.interimResults = true;
        recognizer.lang = "es-ES";

        lastWordTime = Date.now();
        isListening = true;

        recognizer.onresult = (event) => {
            lastWordTime = Date.now();
            let borrador = "";

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                let trozo = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    let trozoLimpio = procesarMuletillasEnTexto(trozo);
                    transcripcionCompleta += trozoLimpio + " ";
                } else {
                    borrador += trozo;
                }
            }

            let textoProcesadoBorrador = procesarMuletillasEnTexto(borrador);
            transcriptBox.innerHTML = `<strong>${transcripcionCompleta}</strong> <span style="color:#64748b;">${textoProcesadoBorrador}</span>`;
        };

        recognizer.onerror = (err) => {
            console.warn("Aviso Recognizer:", err.error);
        };

        recognizer.onend = () => {
            if (isListening && tiempoRestante > 0) {
                try { recognizer.start(); } catch(e){}
            }
        };

        recognizer.start();

        // DETECCIÓN DE SILENCIOS Y TITUBEOS
        monitorInterval = setInterval(() => {
            if (isListening) {
                const tiempoInactivo = Date.now() - lastWordTime;
                const nivelVolumen = obtenerVolumenVoz();

                if (tiempoInactivo > 1100 && transcripcionCompleta.trim().length > 3) {
                    if (nivelVolumen > 12) {
                        if (!transcripcionCompleta.trim().endsWith("[eeee]") && !transcripcionCompleta.trim().endsWith("[mmmm]")) {
                            let etiquetaMuletilla = (conteoMuletillasSonoras % 2 === 0) ? "[eeee]" : "[mmmm]";
                            transcripcionCompleta = transcripcionCompleta.trim() + ` ${etiquetaMuletilla} `;
                            conteoMuletillasSonoras++;
                            lastWordTime = Date.now();
                            transcriptBox.innerHTML = `<strong>${transcripcionCompleta}</strong>`;
                        }
                    } else {
                        if (!transcripcionCompleta.trim().endsWith("[PAUSA]")) {
                            transcripcionCompleta = transcripcionCompleta.trim() + " [PAUSA] ";
                            conteoPausasSilencio++;
                            lastWordTime = Date.now();
                            transcriptBox.innerHTML = `<strong>${transcripcionCompleta}</strong>`;
                        }
                    }
                }
            }
        }, 350);

        // TEMPORIZADOR
        intervaloTimer = setInterval(() => {
            tiempoRestante--;
            timerCount.textContent = tiempoRestante;

            if (tiempoRestante <= 0) {
                detenerProcesos();
                generarDiagnosticoRodach(tipoEjercicio, temaSeleccionado);
            }
        }, 1000);
    }

    function detenerProcesos() {
        isListening = false;
        clearInterval(intervaloTimer);
        clearInterval(monitorInterval);

        if (recognizer) {
            try { recognizer.stop(); } catch(e){}
        }

        if (micStream) {
            micStream.getTracks().forEach(track => track.stop());
        }

        if (audioCtx) {
            try { audioCtx.close(); } catch(e){}
        }

        const btnMic = document.getElementById("start-mic-btn");
        const btnText = document.getElementById("mic-btn-text");
        if (btnMic && btnText) {
            btnMic.classList.remove("recording");
            btnText.textContent = "Activar Micrófono e Iniciar";
        }
    }

    // RETROALIMENTACIÓN CLARA, PRÁCTICA Y COMPRENSIBLE DE TUTOR RODACH
    function generarDiagnosticoRodach(tipo, tema) {
        const textoOriginal = transcripcionCompleta.trim();
        const textoLimpio = textoOriginal
            .replace(/\[PAUSA\]/g, "")
            .replace(/\[eeee\]/g, "")
            .replace(/\[mmmm\]/g, "")
            .replace(/\[aaaa\]/g, "")
            .replace(/\s+/g, " ")
            .trim();

        const palabras = textoLimpio.length > 0 ? textoLimpio.toLowerCase().split(/\s+/) : [];
        const numPalabras = palabras.length;

        if (numPalabras < 6) {
            feedbackBox.style.borderLeft = "5px solid #ef4444";
            feedbackBox.innerHTML = `
                <div class="ai-report">
                    <h4 style="color:#ef4444; margin-top:0;">⚠️ Hablaste muy poco para poder evaluarte</h4>
                    <p>Hola, habla el <strong>Tutor Rodach</strong>. Solo logré registrar <strong>${numPalabras} palabras</strong>. Intenta hablar durante los 30 segundos completos para poder analizar tu dicción y ayudarte a mejorar.</p>
                </div>
            `;
            return;
        }

        // Detección de muletillas de texto habladas
        let conteoPorque = (textoLimpio.match(/porque|por que|por qué/g) || []).length;
        let conteoDeQue = (textoLimpio.match(/de que/g) || []).length;
        let conteoQue = (textoLimpio.match(/\bque\b/g) || []).length;

        let fortalezas = [];
        let puntosAMejorar = [];
        let ejerciciosSugeridos = [];

        // Evaluando lo que hizo bien
        if (numPalabras >= 25) {
            fortalezas.push("Tienes un excelente volumen de palabras y fluidez constante. No te quedaste congelado sin saber qué decir.");
        } else {
            fortalezas.push("Lograste expresar una idea inicial sobre el tema asignado.");
        }

        if (conteoMuletillasSonoras === 0 && conteoPausasSilencio <= 1) {
            fortalezas.push("Tu dicción fue sumamente limpia. Casi no usaste muletillas sonoras ni pausas largas.");
        }

        // Evaluando lo que le falta o debe corregir
        if (conteoMuletillasSonoras >= 1) {
            puntosAMejorar.push(`Dijiste sonidos de titubeo como <strong>[eeee]</strong> o <strong>[mmmm]</strong> un total de <strong>${conteoMuletillasSonoras} veces</strong>. Esto ocurre cuando tu mente piensa la palabra pero tu boca no deja de hacer sonido.`);
            ejerciciosSugeridos.push(BASE_DATOS_RODACH.reemplazoMuletillas[0]);
            ejerciciosSugeridos.push(BASE_DATOS_RODACH.reemplazoMuletillas[1]);
        }

        if (conteoPausasSilencio >= 2) {
            puntosAMejorar.push(`Te quedaste en silencio completo en <strong>${conteoPausasSilencio} ocasiones [PAUSA]</strong>. Aunque estar en silencio es mejor que decir 'eeee', pausas de más de 2 segundos hacen que tu discurso pierda fuerza.`);
            ejerciciosSugeridos.push(BASE_DATOS_RODACH.tecnicasRespiracion[0]);
        }

        if (conteoQue >= 4 || conteoPorque >= 3) {
            puntosAMejorar.push(`Repetiste demasiado palabras como <strong>'que'</strong> (${conteoQue} veces) o <strong>'porque'</strong> (${conteoPorque} veces). Eso hace que tus oraciones se escuchen pesadas o enredadas.`);
            ejerciciosSugeridos.push(BASE_DATOS_RODACH.estrategiasEstructura[0]);
        }

        // Si habló bien sin fallas marcadas
        if (puntosAMejorar.length === 0) {
            puntosAMejorar.push("Ninguno grave. Mantuviste un ritmo bastante natural y comprensible.");
            ejerciciosSugeridos.push(BASE_DATOS_RODACH.ejerciciosDiccion[0]);
        }

        feedbackBox.style.borderLeft = `5px solid #2563eb`;
        feedbackBox.innerHTML = `
            <div class="ai-report" style="font-family: inherit; line-height: 1.5;">
                <div style="background:#e0f2fe; color:#0369a1; padding:10px 14px; border-radius:8px; font-weight:bold; margin-bottom:12px;">
                    🗣️ Diagnóstico Personalizado del Tutor Rodach | Total palabras: ${numPalabras}
                </div>

                <p style="background:#f8fafc; border:1px solid #cbd5e1; padding:12px; border-radius:8px; font-size:13px; margin-bottom:15px;">
                    <strong>Lo que el transcriptor de voz capturó:</strong><br>
                    <em>"${textoOriginal}"</em>
                </p>

                <div style="margin-bottom:12px;">
                    <h4 style="color:#16a34a; margin:0 0 4px 0; font-size:15px;">✅ Lo que hiciste bien:</h4>
                    <ul style="margin:0; padding-left:20px; font-size:14px; color:#1e293b;">
                        ${fortalezas.map(f => `<li style="margin-bottom:4px;">${f}</li>`).join('')}
                    </ul>
                </div>

                <div style="margin-bottom:12px;">
                    <h4 style="color:#dc2626; margin:0 0 4px 0; font-size:15px;">⚠️ Lo que te faltó o debes mejorar:</h4>
                    <ul style="margin:0; padding-left:20px; font-size:14px; color:#1e293b;">
                        ${puntosAMejorar.map(p => `<li style="margin-bottom:4px;">${p}</li>`).join('')}
                    </ul>
                </div>

                <div style="background:#f0fdf4; border:1px solid #bbf7d0; padding:12px; border-radius:8px; margin-top:15px;">
                    <h4 style="color:#15803d; margin:0 0 6px 0; font-size:15px;">💡 Yo te sugiero realizar estos ejercicios prácticos para mejorar:</h4>
                    <ul style="margin:0; padding-left:20px; font-size:13px; color:#166534;">
                        ${ejerciciosSugeridos.map(e => `<li style="margin-bottom:6px;">${e}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    // EVALUACIÓN DE ARGUMENTACIÓN CON TUTOR RODACH
    function evaluarArgumentoRodach() {
        const postura = document.getElementById("arg-postura").value.trim();
        const razon = document.getElementById("arg-razon").value.trim();

        if (postura.length < 8 || razon.length < 8) {
            feedbackBox.innerHTML = `<p style="color:#ef4444; font-weight:bold;">⚠️ Por favor completa tu postura y tu razón para que el Tutor Rodach pueda revisarte.</p>`;
            return;
        }

        let conectores = ["porque", "debido a", "ya que", "puesto que", "por eso", "dado que"];
        let usaConector = conectores.some(c => razon.toLowerCase().includes(c) || postura.toLowerCase().includes(c));

        let mensaje = "";

        if (usaConector && postura.length > 12 && razon.length > 15) {
            mensaje = `
                <div style="background:#f0fdf4; border-left:5px solid #22c55e; padding:14px; border-radius:6px;">
                    <h4 style="color:#15803d; margin:0 0 6px 0;">✅ ¡Excelente argumento! Lo hiciste muy bien.</h4>
                    <p style="font-size:14px; color:#1e293b; margin:0 0 8px 0;"><strong>Análisis del Tutor Rodach:</strong> Lograste conectar tu idea principal con un motivo claro utilizando un buen conector de lógica.</p>
                    <p style="font-size:13px; color:#166534; margin:0;"><strong>💡 Consejo de mejora:</strong> Para llevar tus argumentos al siguiente nivel, procura agregar siempre un ejemplo corto de la vida real después de dar tu razón.</p>
                </div>
            `;
        } else {
            mensaje = `
                <div style="background:#fff7ed; border-left:5px solid #f97316; padding:14px; border-radius:6px;">
                    <h4 style="color:#c2410c; margin:0 0 6px 0;">⚠️ Tu argumento está incompleto o le falta fuerza.</h4>
                    <p style="font-size:14px; color:#1e293b; margin:0 0 8px 0;"><strong>Análisis del Tutor Rodach:</strong> Dijiste lo que piensas, pero la razón suena suelta o muy corta.</p>
                    <p style="font-size:13px; color:#9a3412; margin:0;"><strong>💡 Yo te sugiero hacer lo siguiente:</strong> Utiliza palabras clave como <em>'porque'</em>, <em>'ya que'</em> o <em>'debido a'</em> al inicio de tu razón para obligar a tu cerebro a dar una explicación bien detallada.</p>
                </div>
            `;
        }

        feedbackBox.innerHTML = mensaje;
    }

    // VINCULACIÓN MEJORADA DE BOTONES (Garantiza la detección)
    const botonesPractica = document.querySelectorAll(".practice-card button, .card button, [data-ejercicio]");
    
    botonesPractica.forEach((boton, indice) => {
        boton.addEventListener("click", () => abrirEjercicio(indice));
    });

    // SISTEMA DE RESPALDO: Escuchador global por si el HTML utiliza ids o tarjetas con clases distintas
    document.addEventListener("click", (e) => {
        const objetivo = e.target.closest("button, .btn, .button");
        if (!objetivo) return;

        // Si el botón tiene un data-ejercicio="0", data-ejercicio="1", etc.
        if (objetivo.hasAttribute("data-ejercicio")) {
            const index = parseInt(objetivo.getAttribute("data-ejercicio"));
            abrirEjercicio(index);
        }
    });

    function cerrarEjercicio() {
        detenerProcesos();
        modal.classList.remove("active");
        document.body.classList.remove("exercise-open");
    }

    cerrar.addEventListener("click", cerrarEjercicio);
    overlay.addEventListener("click", cerrarEjercicio);
});
