// ==========================================
// PROYECTO DE ORATORIA - SENA (RODACH)
// TUTOR RODACH Y TRANSCRIPTOR DE VOZ EN TIEMPO REAL
// Mejores prácticas: robustez, accesibilidad y consentimiento de micrófono
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

    // BANCO EXTENDIDO DE CONSEJOS DINÁMICOS DE TUTOR RODACH (MAS DE 20 CONSEJOS)
    const BANCO_CONSEJOS_RODACH = {
        muletillasSonoras: [
            "Técnica de la Frase Puente: En lugar de decir 'eeee' o 'mmmm', usa frases de transición como: 'Un punto clave es...', 'Analizando esto...', 'Por otro lado...',",
            "Pausa de Silencio Consciente: Si sientes ganas de titubear, usa una pausa breve y respira para recuperar el hilo.",
            "Técnica de Respiración de Respaldo: Inhala profundamente por la nariz antes de iniciar una nueva frase; el aire en los pulmones evita el gemido vacilante.",
            "Sustitución por Asentimiento: Haz una leve pausa visual mirando a tu audiencia y asintiendo antes de lanzar la siguiente idea.",
            "Visualización del Punto Final: Al terminar una oración, imagina un punto final gigante. Cierra la boca completamente antes de articular la siguiente palabra."
        ],
        muletillasPalabra: [
            "Eliminación de Muletillas Léxicas: Evita muletillas repetitivas como 'o sea', 'este', 'bueno' o 'básicamente'. Reemplázalas por conectores formales como 'es decir', 'en consecuencia'.",
            "Técnica de Variación Sintáctica: Si notas que repites mucho 'que' o 'porque', divide tu oración en dos frases cortas e independientes.",
            "Control de Coletillas: Elimina preguntas de validación al final de las frases como '¿sí?', '¿me entiendes?' o '¿verdad?'. Confía en la claridad de tu afirmación."
        ],
        pausasYLagunas: [
            "Regla de la Inhalación Silenciosa: Si pierdes el hilo, detén la voz por completo, inhala en 1 segundo y retoma. El silencio genera expectativa positiva en el público.",
            "Mapa Mental Sintético: Antes de hablar, estructura visualmente 3 puntos principales en tu mente (Inicio, Desarrollo y Conclusión).",
            "Anclaje Visual: Mira fijamente un objeto o punto neutro en el espacio mientras recuperas el hilo de tu idea para no dar la sensación de desorientación."
        ],
        ritmoYVelocidad: [
            "Ajuste de Marcación de Silabación: Si hablas muy rápido, enfatiza deliberadamente la última sílaba de cada palabra clave para autorregular la velocidad.",
            "Técnica del Metrónomo Mental: Mantén un ritmo pausado imaginando el latido de un corazón tranquilo mientras pronuncias tu discurso.",
            "Uso del Énfasis Tónico: Reduce la velocidad bajando ligeramente el volumen e incrementando la fuerza tónica en los verbos principales."
        ],
        estructuraYVocabulario: [
            "Estructura A-R-E (Afirmación, Razón, Ejemplo): Expresa tu idea, explica el motivo en una frase corta y remata inmediatamente con un caso práctico.",
            "Regla del Semáforo: Verde (introduce en 5s), Amarillo (desarrolla en 15s), Rojo (concluye firmemente en 10s).",
            "Técnica del Bolígrafo (Práctica previa): Lee durante 2 minutos con un bolígrafo cruzado en los dientes para liberar tensión mandibular y ganar claridad vocal.",
            "Técnica de Exageración Gesticular: Articula marcando exageradamente el movimiento de tus labios para mejorar la proyección de las consonantes.",
            "Regla de la Conclusión Directa: Finaliza siempre con una afirmación contundente en vez de dejar que la idea se disipe lentamente."
        ]
    };

    // BANCOS DE TEMAS
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
            "10. La importancia de la empatía en la convivencia escolar"
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
            "10. ¿Es la energía solar la solución principal al cambio climático?"
        ]
    };

    // EJERCICIOS Y ESTUDIOS ACADÉMICOS (solo 2 prácticas: fluidez y argumento)
    const ejercicios = [
        {
            titulo: "Habla durante 30 segundos",
            etiqueta: "EJERCICIO DE FLUIDEZ Y VOZ",
            descripcion: "Habla sobre el tema. El transcriptor capturará con precisión los patrones vocales y las muletillas detectadas.",
            paraQueSirve: "Mide tu continuidad al hablar y te ayuda a identificar vacíos o muletillas sonoras.",
            instrucciones: [
                "Selecciona un tema de la lista.",
                "Haz clic en 'Aceptar y usar micrófono' y luego en 'Activar Micrófono e Iniciar'.",
                "Expresa tu opinión manteniendo un ritmo constante.",
                "Revisa la retroalimentación directa de Tutor Rodach al finalizar."
            ],
            respaldo: "Estudios sobre fluidez y pausas llenas (ejemplos académicos) y prácticas de evaluación formativa en oratoria.",
            tipo: "fluidez"
        },
        {
            titulo: "Construye un argumento",
            etiqueta: "EJERCICIO DE ARGUMENTACIÓN",
            descripcion: "Escribe o dicta tu opinión sobre un tema para que Tutor Rodach verifique la claridad de tu razonamiento.",
            paraQueSirve: "Entrena tu mente para que expreses ideas con lógica sin enredarte.",
            instrucciones: [
                "Selecciona un tema de debate.",
                "Escribe o dicta tu postura principal.",
                "Escribe o dicta la razón que respalda tu idea.",
                "Haz clic en 'Analizar Argumento con Tutor Rodach'."
            ],
            respaldo: "Modelo de Argumentación Pragma-Dialéctica y prácticas de evaluación de argumentos.",
            tipo: "argumento"
        }
    ];

    // MODAL E INTERFAZ
    const modal = document.createElement("div");
    modal.className = "exercise-modal";
    modal.innerHTML = `
        <div class="exercise-overlay" tabindex="-1"></div>
        <div class="exercise-window" role="dialog" aria-modal="true" aria-labelledby="exercise-title" aria-describedby="exercise-description">
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
                    <h3>Tutor Rodach</h3>
                    <div id="ai-feedback-box" class="ai-feedback-container">
                        <p class="ai-placeholder">Realiza la práctica para recibir la retroalimentación de Tutor Rodach...</p>
                    </div>
                    <div id="academic-backing" class="academic-backing-tag" style="margin-top:15px; font-size:13px; color:#475569; background:#f1f5f9; padding:12px; border-radius:8px; border:1px solid #e2e8f0;">
                    </div>
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
    let ultimaPalabraTiempo = Date.now();
    let monitorPausasInterval = null;

    let ultimoElementoFocal = null;
    let consentGiven = false; // consentimiento para usar micrófono

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

        respaldoContenedor.innerHTML = `<strong>🎓 Base Científica y Académica:</strong> ${ejercicio.respaldo}`;
        feedbackBox.innerHTML = `<p class="ai-placeholder">Realiza la práctica para recibir el diagnóstico de Tutor Rodach...</p>`;
        interactivo.innerHTML = "";

        detenerProcesos();

        if (ejercicio.tipo === "fluidez") {
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

                    <div id="mic-consent" class="mic-consent" role="region" aria-live="polite">
                        <p style="margin:0 0 8px 0;">Para usar la transcripción por voz debes aceptar que tu audio pueda ser procesado por el servicio de reconocimiento del navegador. No almacenamos audio en nuestros servidores.</p>
                        <button type="button" id="accept-mic-btn" class="exercise-main-button">Aceptar y usar micrófono</button>
                    </div>

                    <div class="mic-controls" style="margin-top:12px;">
                        <button type="button" id="start-mic-btn" class="mic-button" disabled>
                            <span class="mic-icon">🎙️</span>
                            <span id="mic-btn-text">Activar Micrófono e Iniciar</span>
                        </button>
                    </div>

                    <div class="transcript-wrapper">
                        <label>Transcriptor de voz en tiempo real:</label>
                        <div id="transcript-box" class="transcript-box">Haz clic en aceptar y luego en iniciar para hablar...</div>
                    </div>
                </div>
            `;

            const acceptBtn = document.getElementById("accept-mic-btn");
            const startBtn = document.getElementById("start-mic-btn");

            if (acceptBtn && startBtn) {
                acceptBtn.addEventListener("click", () => {
                    consentGiven = true;
                    startBtn.removeAttribute("disabled");
                    acceptBtn.textContent = "Micrófono listo";
                    acceptBtn.setAttribute("aria-disabled", "true");
                });

                startBtn.addEventListener("click", () => {
                    iniciarPracticaVoz(ejercicio.tipo, document.getElementById("current-topic").textContent);
                });
            }

            document.getElementById("next-topic-btn").addEventListener("click", () => {
                idTemaActual = (idTemaActual + 1) % temasList.length;
                document.getElementById("current-topic").textContent = temasList[idTemaActual];
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

                    <button type="button" id="analyze-arg-btn" class="exercise-main-button" style="margin-top:15px;">Analizar Argumento con Tutor Rodach</button>
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

        // gestionar foco y accesibilidad
        ultimoElementoFocal = document.activeElement;
        modal.classList.add("active");
        document.body.classList.add("exercise-open");

        const btnClose = document.querySelector(".exercise-close");
        if (btnClose) btnClose.focus();

        document.addEventListener("keydown", handleKeyDownForModal);
    }

    // PROCESAMIENTO FONÉTICO EN TIEMPO REAL STRICTO
    function procesarMuleteosReales(texto) {
        return texto
            .replace(/\b(e{2,}|e-e+|eh+)\b/gi, "[eeee]")
            .replace(/\b(m{2,}|m-m+|mm+|um+|umm+)\b/gi, "[mmmm]")
            .replace(/\b(a{2,}|a-a+|ah+)\b/gi, "[aaaa]")
            .replace(/\b(o{2,}|oh+)\b/gi, "[oooo]");
    }

    // TRANSCRIPCIÓN DIRECTA Y RÁPIDA DE VOZ
    function iniciarPracticaVoz(tipoEjercicio, temaSeleccionado) {
        if (!SpeechRecognition) {
            // Mostrar mensaje accesible en UI si no hay soporte
            const transcriptBox = document.getElementById("transcript-box");
            if (transcriptBox) {
                transcriptBox.innerHTML = "Tu navegador no soporta reconocimiento de voz. Usa Google Chrome o Microsoft Edge para esta práctica.";
            } else {
                alert("Tu navegador no soporta SpeechRecognition. Por favor utiliza Google Chrome o Microsoft Edge.");
            }
            return;
        }

        if (!consentGiven) {
            alert("Debes aceptar el uso del micrófono (botón 'Aceptar y usar micrófono') antes de iniciar la práctica.");
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

        transcripcionCompleta = "";
        tiempoRestante = 30;
        ultimaPalabraTiempo = Date.now();
        if (timerCount) timerCount.textContent = tiempoRestante;
        if (transcriptBox) transcriptBox.innerHTML = "Escuchando... habla de forma natural.";
        if (btnMic) btnMic.classList.add("recording");
        if (btnText) btnText.textContent = "Detener Práctica";

        recognizer = new SpeechRecognition();
        recognizer.continuous = true;
        recognizer.interimResults = true;
        recognizer.lang = "es-ES";

        isListening = true;

        recognizer.onresult = (event) => {
            ultimaPalabraTiempo = Date.now();
            let borrador = "";

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                let trozo = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    let trozoLimpio = procesarMuleteosReales(trozo);
                    transcripcionCompleta += trozoLimpio + " ";
                } else {
                    borrador += trozo;
                }
            }

            let borradorProcesado = procesarMuleteosReales(borrador);
            if (transcriptBox) transcriptBox.innerHTML = `<strong>${transcripcionCompleta}</strong> <span style="color:#2563eb;">${borradorProcesado}</span>`;
        };

        recognizer.onerror = (err) => {
            console.warn("Aviso Recognizer:", err.error);
            // Mostrar aviso breve en UI
            if (feedbackBox) feedbackBox.innerHTML = `<p style="color:#ef4444;">Error en el reconocimiento de voz: ${err.error}</p>`;
        };

        // REINICIO CONTROLADO EN ONEND
        recognizer.onend = () => {
            if (isListening && tiempoRestante > 0) {
                // reintentar con pequeña espera, controlando excepciones
                setTimeout(() => {
                    try { if (recognizer && typeof recognizer.start === 'function') recognizer.start(); } catch(e){ console.warn('No se pudo reiniciar recognizer:', e); }
                }, 150);
            }
        };

        try {
            recognizer.start();
        } catch(e) {
            console.warn('Error al iniciar recognizer:', e);
        }

        // CAPTURA ÚNICAMENTE DE PAUSAS LARGAS DE SILENCIO (MÁS DE 1.8 SEGUNDOS)
        monitorPausasInterval = setInterval(() => {
            if (isListening) {
                const tiempoSinHablar = Date.now() - ultimaPalabraTiempo;
                if (tiempoSinHablar > 1800) {
                    if (!transcripcionCompleta.trim().endsWith("[PAUSA]")) {
                        transcripcionCompleta = transcripcionCompleta.trim() + " [PAUSA] ";
                        ultimaPalabraTiempo = Date.now();
                        const transcriptBoxLocal = document.getElementById("transcript-box");
                        if (transcriptBoxLocal) transcriptBoxLocal.innerHTML = `<strong>${transcripcionCompleta}</strong>`;
                    }
                }
            }
        }, 300);

        // TEMPORIZADOR DE 30 SEGUNDOS
        intervaloTimer = setInterval(() => {
            tiempoRestante--;
            const timerCountLocal = document.getElementById("timer-count");
            if (timerCountLocal) timerCountLocal.textContent = tiempoRestante;

            if (tiempoRestante <= 0) {
                detenerProcesos();
                generarDiagnosticoRodach(tipoEjercicio, temaSeleccionado);
            }
        }, 1000);
    }

    function detenerProcesos() {
        isListening = false;
        clearInterval(intervaloTimer);
        clearInterval(monitorPausasInterval);

        if (recognizer) {
            try { recognizer.stop(); } catch(e) { console.warn('stop error', e); }
            try { recognizer.abort && recognizer.abort(); } catch(e) { }
            recognizer = null; // evitar referencias antiguas
        }

        const btnMic = document.getElementById("start-mic-btn");
        const btnText = document.getElementById("mic-btn-text");
        if (btnMic && btnText) {
            btnMic.classList.remove("recording");
            btnText.textContent = "Activar Micrófono e Iniciar";
        }
    }

    // OBTENER ELEMENTOS ALEATORIOS SIN REPETIR
    function obtenerConsejosAleatorios(lista, cantidad) {
        let copia = [...lista];
        let seleccionados = [];
        for (let i = 0; i < cantidad && copia.length > 0; i++) {
            let index = Math.floor(Math.random() * copia.length);
            seleccionados.push(copia.splice(index, 1)[0]);
        }
        return seleccionados;
    }

    // ANÁLISIS 100% DINÁMICO Y VINCULADO REAL DE TUTOR RODACH
    function generarDiagnosticoRodach(tipo, tema) {
        const textoOriginal = transcripcionCompleta.trim();

        const coincidenciasEEEE = (textoOriginal.match(/\[eeee\]/g) || []).length;
        const coincidenciasMMMM = (textoOriginal.match(/\[mmmm\]/g) || []).length;
        const coincidenciasAAAA = (textoOriginal.match(/\[aaaa\]/g) || []).length;
        const coincidenciasOOOO = (textoOriginal.match(/\[oooo\]/g) || []).length;
        const coincidenciasPAUSA = (textoOriginal.match(/\[PAUSA\]/g) || []).length;

        const totalMuletillasSonoras = coincidenciasEEEE + coincidenciasMMMM + coincidenciasAAAA + coincidenciasOOOO;

        const textoLimpio = textoOriginal
            .replace(/\[PAUSA\]/g, "")
            .replace(/\[eeee\]/g, "")
            .replace(/\[mmmm\]/g, "")
            .replace(/\[aaaa\]/g, "")
            .replace(/\[oooo\]/g, "")
            .replace(/\s+/g, " ")
            .trim();

        const palabras = textoLimpio.length > 0 ? textoLimpio.toLowerCase().split(/\s+/) : [];
        const numPalabras = palabras.length;
        const ppm = Math.round(numPalabras * 2);

        if (numPalabras < 6) {
            if (feedbackBox) {
                feedbackBox.style.borderLeft = "5px solid #ef4444";
                feedbackBox.innerHTML = `
                    <div class="ai-report">
                        <h4 style="color:#ef4444; margin-top:0;">⚠️ Captura insuficiente para evaluación</h4>
                        <p>Hola, habla <strong>Tutor Rodach</strong>. Solo logré registrar <strong>${numPalabras} palabras</strong>. Intenta hablar con voz clara durante los 30 segundos completos para una evaluación más fiable.</p>
                    </div>
                `;
            }
            return;
        }

        let conteoQue = (textoLimpio.match(/\bque\b/gi) || []).length;
        let conteoPorque = (textoLimpio.match(/\bpor\s*qué\b|\bporque\b/gi) || []).length;
        let conteoEste = (textoLimpio.match(/\beste\b|\bestee\b/gi) || []).length;
        let conteoOsea = (textoLimpio.match(/\bo sea\b|\bosea\b/gi) || []).length;

        let fortalezas = [];
        let puntosAMejorar = [];
        let poolConsejos = [];

        if (ppm >= 80 && ppm <= 140) {
            fortalezas.push(`Tuviste un ritmo de vocalización excelente (${ppm} Palabras Por Minuto). Mantuviste un balance ideal entre velocidad y comprensión.`);
        } else if (ppm > 140) {
            puntosAMejorar.push(`Hablaste demasiado rápido (${ppm} PPM). La aceleración puede hacer que tu audiencia pierda detalles de tu mensaje.`);
            poolConsejos.push(...BANCO_CONSEJOS_RODACH.ritmoYVelocidad);
        } else {
            puntosAMejorar.push(`Tu ritmo fue algo lento (${ppm} PPM). Intenta imprimir mayor dinamismo a tus oraciones.`);
            poolConsejos.push(...BANCO_CONSEJOS_RODACH.pausasYLagunas);
        }

        if (totalMuletillasSonoras === 0) {
            fortalezas.push("¡Dicción impecable! No articulaste sonido alguno de vacilatorio como [eeee] o [mmmm].");
        } else {
            let detallesMuletillas = [];
            if (coincidenciasEEEE > 0) detallesMuletillas.push(`[eeee]: ${coincidenciasEEEE}`);
            if (coincidenciasMMMM > 0) detallesMuletillas.push(`[mmmm]: ${coincidenciasMMMM}`);
            if (coincidenciasAAAA > 0) detallesMuletillas.push(`[aaaa]: ${coincidenciasAAAA}`);
            if (coincidenciasOOOO > 0) detallesMuletillas.push(`[oooo]: ${coincidenciasOOOO}`);

            puntosAMejorar.push(`Articulaste un total exacto de <strong>${totalMuletillasSonoras} muletillas sonoras</strong> (${detallesMuletillas.join(", ")}).`);
            poolConsejos.push(...BANCO_CONSEJOS_RODACH.muletillasSonoras);
        }

        if (coincidenciasPAUSA > 0) {
            puntosAMejorar.push(`Se detectaron <strong>${coincidenciasPAUSA} pausas prolongadas [PAUSA]</strong> donde interrumpiste el flujo del habla.`);
            poolConsejos.push(...BANCO_CONSEJOS_RODACH.pausasYLagunas);
        } else {
            fortalezas.push("Mantuviste una hilación continua sin interrupciones ni vacíos prolongados.");
        }

        if (conteoQue >= 4 || conteoPorque >= 3 || conteoEste >= 2 || conteoOsea >= 2) {
            let repeticiones = [];
            if (conteoQue >= 4) repeticiones.push(`'que' (${conteoQue} veces)`);
            if (conteoPorque >= 3) repeticiones.push(`'porque' (${conteoPorque} vezes)`);
            if (conteoEste >= 2) repeticiones.push(`'este' (${conteoEste} veces)`);
            if (conteoOsea >= 2) repeticiones.push(`'o sea' (${conteoOsea} veces)`);

            puntosAMejorar.push(`Abusaste de la repetición de palabras enlace: ${repeticiones.join(", ")}.`);
            poolConsejos.push(...BANCO_CONSEJOS_RODACH.muletillasPalabra);
        }

        if (poolConsejos.length === 0) {
            poolConsejos.push(...BANCO_CONSEJOS_RODACH.estructuraYVocabulario);
        }

        const consejosFinales = obtenerConsejosAleatorios(poolConsejos, 3);

        if (feedbackBox) {
            feedbackBox.style.borderLeft = `5px solid #2563eb`;
            feedbackBox.innerHTML = `
                <div class="ai-report" style="font-family: inherit; line-height: 1.5;">
                    <div style="background:#e0f2fe; color:#0369a1; padding:10px 14px; border-radius:8px; font-weight:bold; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
                        <span>Diagnóstico Dinámico de Tutor Rodach</span>
                        <span style="font-size:12px; background:#0284c7; color:white; padding:3px 8px; border-radius:4px;">${ppm} PPM</span>
                    </div>

                    <p style="background:#f8fafc; border:1px solid #cbd5e1; padding:12px; border-radius:8px; font-size:13px; margin-bottom:15px;">
                        <strong>Transcripción exacta en tiempo real:</strong><br>
                        <em>"${textoOriginal}"</em>
                    </p>

                    <div style="margin-bottom:12px;">
                        <h4 style="color:#16a34a; margin:0 0 4px 0; font-size:15px;">✅ Aspectos Destacados:</h4>
                        <ul style="margin:0; padding-left:20px; font-size:14px; color:#1e293b;">
                            ${fortalezas.map(f => `<li style="margin-bottom:4px;">${f}</li>`).join('')}
                        </ul>
                    </div>

                    <div style="margin-bottom:12px;">
                        <h4 style="color:#dc2626; margin:0 0 4px 0; font-size:15px;">⚠️ Oportunidades de Mejora Detectadas:</h4>
                        <ul style="margin:0; padding-left:20px; font-size:14px; color:#1e293b;">
                            ${puntosAMejorar.map(p => `<li style="margin-bottom:4px;">${p}</li>`).join('')}
                        </ul>
                    </div>

                    <div style="background:#f0fdf4; border:1px solid #bbf7d0; padding:12px; border-radius:8px; margin-top:15px;">
                        <h4 style="color:#15803d; margin:0 0 6px 0; font-size:15px;">💡 Plan de Acción Específico Recomendado:</h4>
                        <ul style="margin:0; padding-left:20px; font-size:13px; color:#166534;">
                            ${consejosFinales.map(e => `<li style="margin-bottom:6px;">${e}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }
    }

    // EVALUACIÓN DE ARGUMENTACIÓN
    function evaluarArgumentoRodach() {
        const postura = document.getElementById("arg-postura").value.trim();
        const razon = document.getElementById("arg-razon").value.trim();

        if (postura.length < 8 || razon.length < 8) {
            if (feedbackBox) feedbackBox.innerHTML = `<p style="color:#ef4444; font-weight:bold;">⚠️ Por favor completa tu postura y tu razón para que Tutor Rodach pueda revisarte.</p>`;
            return;
        }

        let conectores = ["porque", "debido a", "ya que", "puesto que", "por eso", "dado que", "en vista de"];
        let usaConector = conectores.some(c => razon.toLowerCase().includes(c) || postura.toLowerCase().includes(c));

        let mensaje = "";

        if (usaConector && postura.length > 12 && razon.length > 15) {
            mensaje = `
                <div style="background:#f0fdf4; border-left:5px solid #22c55e; padding:14px; border-radius:6px;">
                    <h4 style="color:#15803d; margin:0 0 6px 0;">✅ Estructura Lógica Correcta</h4>
                    <p style="font-size:14px; color:#1e293b; margin:0 0 8px 0;">Has articulado tu tesis y la has sostenido con un conector de causalidad.
                    <p style="font-size:13px; color:#166534; margin:0;"><strong>💡 Recomendación:</strong> Añade un dato cuantitativo o un ejemplo empírico para reforzar la validez de tu razón.</p>
                </div>
            `;
        } else {
            mensaje = `
                <div style="background:#fff7ed; border-left:5px solid #f97316; padding:14px; border-radius:6px;">
                    <h4 style="color:#c2410c; margin:0 0 6px 0;">⚠️ Nexo Causal Débil</h4>
                    <p style="font-size:14px; color:#1e293b; margin:0 0 8px 0;"><strong>Análisis de Tutor Rodach:</strong> Tu afirmación y tu razón carecen de un conector lógico explícito que los una.
                    <p style="font-size:13px; color:#9a3412; margin:0;"><strong>💡 Sugerencia:</strong> Conecta ambas oraciones con términos como <em>'debido a que'</em> o <em>'puesto que'</em> y aporta un ejemplo concreto.</p>
                </div>
            `;
        }

        if (feedbackBox) feedbackBox.innerHTML = mensaje;
    }

    // MEJORA: VINCULACIÓN ROBUSTA DE BOTONES CON ATRIBUTOS DATA O TEXTOS FLEXIBLES
    function conectarBotonesGlobales() {
        const todosLosBotones = document.querySelectorAll("button, a.btn, .button, [data-ejercicio]");

        todosLosBotones.forEach((btn) => {
            if (btn.closest(".exercise-modal")) return;

            btn.addEventListener("click", (e) => {
                const attrEjercicio = btn.getAttribute("data-ejercicio");

                if (attrEjercicio !== null) {
                    e.preventDefault();
                    abrirEjercicio(parseInt(attrEjercicio, 10));
                    return;
                }

                const textoBoton = (btn.innerText || "").toLowerCase();
                const contenedorTexto = btn.parentElement ? (btn.parentElement.innerText || "").toLowerCase() : "";

                if (textoBoton.includes("1") || textoBoton.includes("fluidez") || contenedorTexto.includes("fluidez") || contenedorTexto.includes("30 segundos")) {
                    e.preventDefault();
                    abrirEjercicio(0);
                } else if (textoBoton.includes("2") || textoBoton.includes("argumento") || contenedorTexto.includes("argumento") || contenedorTexto.includes("construye")) {
                    e.preventDefault();
                    abrirEjercicio(1);
                }
            });
        });
    }

    conectarBotonesGlobales();

    function cerrarEjercicio() {
        detenerProcesos();
        modal.classList.remove("active");
        document.body.classList.remove("exercise-open");

        document.removeEventListener("keydown", handleKeyDownForModal);

        // devolver foco al control anterior
        if (ultimoElementoFocal && typeof ultimoElementoFocal.focus === "function") {
            ultimoElementoFocal.focus();
        }
    }

    overlay.addEventListener("click", cerrarEjercicio);

    cerrar.addEventListener("click", cerrarEjercicio);

    function handleKeyDownForModal(e) {
        if (e.key === "Escape") {
            cerrarEjercicio();
        }
        // Nota: para un focus trap completo habría que interceptar Tab/Shift+Tab y mantener foco dentro del modal.
    }
});
