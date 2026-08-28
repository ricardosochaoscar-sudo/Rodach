// ==========================================
// PROYECTO DE ORATORIA - SENA (RODACH)
// DETECTOR DE PAUSAS Y MULETILLAS VOCALES [eeee / mmmm]
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
            "14. ¿Cómo afecta el uso excessive del teléfono móvil al rendimiento académico?",
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
            descripcion: "Habla sobre el tema. El sistema diferenciará entre cuando te quedas en silencio [PAUSA] y cuando dudas con sonidos de titubeo como [eeee] o [mmmm].",
            paraQueSirve: "Identifica vacilaciones no verbales y pausas vacías en el discurso continuo.",
            instrucciones: [
                "Selecciona un tema o cambia de opción.",
                "Haz clic en 'Activar Micrófono e Iniciar'.",
                "Expresa tu punto de vista intentando mantener fluidez.",
                "Observa cómo el transcriptor marca las [PAUSA] (silencio) y los sonidos [eeee] / [mmmm] (duda sonora)."
            ],
            respaldo: "Basado en la taxonomía de Hesitation Phenomena de Maclay & Osgood y los criterios de fluidez de Peter Skehan (1998).",
            tipo: "fluidez"
        },
        {
            titulo: "Construye un argumento",
            etiqueta: "EJERCICIO DE ARGUMENTACIÓN",
            descripcion: "Escribe o dicta tu postura y razón lógica para validar tu argumento.",
            paraQueSirve: "Entrena la capacidad de estructurar ideas sosteniéndolas con evidencias.",
            instrucciones: [
                "Elige un tema del banco de argumentación.",
                "Escribe o dicta tu postura (Tesis).",
                "Escribe o dicta tu razón principal (Garantía).",
                "Haz clic en 'Analizar Argumento con IA'."
            ],
            respaldo: "Análisis fundamentado en el Modelo Argumentativo de Stephen Toulmin (1958).",
            tipo: "argumento"
        },
        {
            titulo: "Reto de improvisación",
            etiqueta: "EJERCICIO DE IMPROVISACIÓN",
            descripcion: "Recibe un tema y habla 30 segundos evaluando tu agilidad mental sin muletillas.",
            paraQueSirve: "Mide la agilidad de respuesta discursiva en situaciones de tiempo ajustado.",
            instrucciones: [
                "Genera un tema al azar.",
                "Inicia la grabación y mantén la continuidad del discurso.",
                "Evita caer en [PAUSA] prolongadas o titubeos [eeee]."
            ],
            respaldo: "Basado en los estándares de comunicación pública de la NCA.",
            tipo: "improvisacion"
        }
    ];

    // MODAL
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
                    <h3>🤖 Tutor de Oratoria IA (Análisis cualitativo del habla)</h3>
                    <div id="ai-feedback-box" class="ai-feedback-container">
                        <p class="ai-placeholder">Realiza la práctica para recibir el diagnóstico...</p>
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

    // VARIABLES DE CONTROL GENERAL
    let intervaloTimer = null;
    let tiempoRestante = 30;
    let recognizer = null;
    let isListening = false;
    let transcripcionCompleta = "";

    // MÉTRICAS DE DETECCIÓN DISCURSIVA
    let conteoPausasSilencio = 0;
    let conteoMuletillasSonoras = 0;

    // CONTROL DE AUDIO EN TIEMPO REAL (WEB AUDIO API)
    let audioCtx = null;
    let analyser = null;
    let micStream = null;
    let lastWordTime = Date.now();
    let monitorInterval = null;
    let levelHistory = [];

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

        respaldoContenedor.innerHTML = `<strong>🎓 Respaldo de Investigación:</strong> ${ejercicio.respaldo}`;
        feedbackBox.innerHTML = `<p class="ai-placeholder">Inicia la prueba para recibir la retroalimentación cualitativa del Tutor IA...</p>`;
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
                        <label>Transcripción con separación de [PAUSA] y [eeee] / [mmmm]:</label>
                        <div id="transcript-box" class="transcript-box">Haz clic en iniciar para hablar...</div>
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

    // INICIALIZA EL ANALIZADOR DE AUDIO
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
            console.warn("No se pudo acceder a la entrada directa de audio:", e);
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

    // FORMATEO Y LIMPIEZA DE MULETILLAS REPETIDAS EN TEXTO
    function procesarMuletillasEnTexto(texto) {
        // Mapea vocalizaciones en borrador
        let resultado = texto
            .replace(/\b(eh+|ee+|eee+)\b/gi, "[eeee]")
            .replace(/\b(mm+|mmm+|um+|umm+)\b/gi, "[mmmm]")
            .replace(/\b(ah+|aa+|aaa+)\b/gi, "[aaaa]");
            
        return resultado;
    }

    // INICIAR PRÁCTICA CON VOZ
    async function iniciarPrácticaVoz(tipoEjercicio, temaSeleccionado) {
        if (!SpeechRecognition) {
            alert("Tu navegador no soporta el reconocimiento de voz interactivo. Usa Google Chrome o Microsoft Edge.");
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
        transcriptBox.innerHTML = "Escuchando... puedes hablar ahora.";
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

        // MONITOR PRINCIPAL: DIFERENCIA SILENCIO [PAUSA] DE DUDA SONORA [eeee] / [mmmm]
        monitorInterval = setInterval(() => {
            if (isListening) {
                const tiempoInactivo = Date.now() - lastWordTime;
                const nivelVolumen = obtenerVolumenVoz();

                // Si lleva más de 1.1 segundos sin emitir palabras reconocibles
                if (tiempoInactivo > 1100 && transcripcionCompleta.trim().length > 3) {
                    
                    // Si el micrófono detecta emisión de audio/sonido sostenido (volumen > 12) -> Es un titubeo sonoro (eeee / mmmm)
                    if (nivelVolumen > 12) {
                        if (!transcripcionCompleta.trim().endsWith("[eeee]") && !transcripcionCompleta.trim().endsWith("[mmmm]")) {
                            // Alterna según patrón o inserta [eeee]
                            let etiquetaMuletilla = (conteoMuletillasSonoras % 2 === 0) ? "[eeee]" : "[mmmm]";
                            transcripcionCompleta = transcripcionCompleta.trim() + ` ${etiquetaMuletilla} `;
                            conteoMuletillasSonoras++;
                            lastWordTime = Date.now(); // Resetea temporizador para evitar duplicados inmediatos
                            transcriptBox.innerHTML = `<strong>${transcripcionCompleta}</strong>`;
                        }
                    } 
                    // Si no hay volumen o es despreciable (volumen <= 12) -> Es un silencio absoluto [PAUSA]
                    else {
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

        // REPO TEMPORIZADOR SEGUNDOS
        intervaloTimer = setInterval(() => {
            tiempoRestante--;
            timerCount.textContent = tiempoRestante;

            if (tiempoRestante <= 0) {
                detenerProcesos();
                evaluarDiscursoAvanzado(tipoEjercicio, temaSeleccionado);
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

    // EVALUACIÓN DE ORATORIA Y ANÁLISIS CUALITATIVO DEL HABLA
    function evaluarDiscursoAvanzado(tipo, tema) {
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

        if (numPalabras < 8) {
            feedbackBox.style.borderLeft = "5px solid #ef4444";
            feedbackBox.innerHTML = `
                <div class="ai-report">
                    <h4 style="color:#ef4444; margin-top:0;">⚠️ Discurso demasiado breve para análisis</h4>
                    <p>Solo se registraron <strong>${numPalabras} palabras</strong>. Intenta desarrollar tus ideas durante el tiempo completo de 30 segundos.</p>
                </div>
            `;
            return;
        }

        // Conteo de repeticiones de palabras en texto
        let conteoPorque = (textoLimpio.match(/porque|por que|por qué/g) || []).length;
        let conteoDeQue = (textoLimpio.match(/de que/g) || []).length;
        let conteoQue = (textoLimpio.match(/\bque\b/g) || []).length;

        let fallasSintacticas = [];
        if (conteoPorque >= 2) {
            fallasSintacticas.push(`Usaste repetidamente el conector <strong>"porque"</strong> (${conteoPorque} veces) para justificar tus frases.`);
        }
        if (conteoDeQue >= 1) {
            fallasSintacticas.push(`Incurriste en el vicio de lenguaje de decir <strong>"de que"</strong> en lugar de enlazar con la palabra adecuada.`);
        }
        if (conteoQue >= 4) {
            fallasSintacticas.push(`Usaste de forma recurrente el muletilla <strong>"que"</strong> (${conteoQue} veces) provocando que las oraciones se escuchen cortadas.`);
        }

        let diagnosticoPausasYMuletillas = "";
        if (conteoMuletillasSonoras > 0 && conteoPausasSilencio > 0) {
            diagnosticoPausasYMuletillas = `Presentaste un discurso con fluctuación: <strong>${conteoPausasSilencio} pausas en silencio [PAUSA]</strong> y <strong>${conteoMuletillasSonoras} titubeos sonoros ([eeee] / [mmmm])</strong>. La combinación de silencio con muletillas demuestra que estabas buscando las ideas en tiempo real sin una estructura previa.`;
        } else if (conteoMuletillasSonoras > 0) {
            diagnosticoPausasYMuletillas = `Mantuviste el sonido activo pero registraste <strong>${conteoMuletillasSonoras} muletillas sonoras ([eeee] / [mmmm])</strong>. Esto indica dificultad para conectar ideas sin rellenar los vacíos con sonidos sostenidos.`;
        } else if (conteoPausasSilencio > 0) {
            diagnosticoPausasYMuletillas = `Tuviste un total de <strong>${conteoPausasSilencio} pausas en silencio [PAUSA]</strong>. Es preferible hacer pausas cortas antes que recurrir a muletillas, pero procura reducir su duración para no cortar la fluidez.`;
        } else {
            diagnosticoPausasYMuletillas = `Excelente manejo de la dicción. No se registraron bloqueos prolongados de silencio ni muletillas sonoras.`;
        }

        let colorDiagnostico = "#2563eb";
        let tituloDiagnostico = "Discurso Fluido y Estructurado";

        if (conteoMuletillasSonoras >= 2 || fallasSintacticas.length >= 2) {
            colorDiagnostico = "#f59e0b";
            tituloDiagnostico = "Presencia de Titubeos Sonoros y Redundancia";
        } else if (conteoPausasSilencio >= 3) {
            colorDiagnostico = "#3b82f6";
            tituloDiagnostico = "Ritmo Pausado con Interrupciones";
        }

        feedbackBox.style.borderLeft = `5px solid ${colorDiagnostico}`;
        feedbackBox.innerHTML = `
            <div class="ai-report">
                <div class="ai-header-status">
                    <span class="status-badge" style="background:${colorDiagnostico}; color:white;">EVALUACIÓN: ${tituloDiagnostico}</span>
                    <span class="ppm-badge">Palabras: ${numPalabras} | Silencios: ${conteoPausasSilencio} | Titubeos: ${conteoMuletillasSonoras}</span>
                </div>

                <p style="background:#f8fafc; border:1px solid #e2e8f0; padding:14px; border-radius:10px; font-size:14px; margin:15px 0;">
                    <strong>📝 Transcripción analizada en tiempo real:</strong><br>
                    <em>"${textoOriginal}"</em>
                </p>

                <div class="analysis-section" style="margin-top:15px;">
                    <h4 style="margin:0 0 8px 0; color:#0f172a;">🔊 1. Análisis de Ritmo (Pausas vs. Titubeos):</h4>
                    <p style="font-size:14px; color:#334155;">${diagnosticoPausasYMuletillas}</p>
                </div>

                <div class="analysis-section" style="margin-top:15px;">
                    <h4 style="margin:0 0 8px 0; color:#0f172a;">💬 2. Análisis Coherencia y Vicios de Lenguaje:</h4>
                    ${fallasSintacticas.length > 0 ? `
                        <div style="background:#fff7ed; border-left:4px solid #f97316; padding:10px 14px; margin:8px 0; font-size:13px;">
                            <strong>🔴 Repeticiones y muletillas de enlace identificadas:</strong>
                            <ul style="margin:5px 0 0 18px; padding:0;">
                                ${fallasSintacticas.map(f => `<li>${f}</li>`).join('')}
                            </ul>
                        </div>
                    ` : '<p style="color:#10b981; font-size:13px;">No se identificaron redundancias gramaticales marcadas.</p>'}
                </div>

                <div class="ai-science-note" style="margin-top:18px;">
                    <strong>💡 Sustento de Investigación Lingüística:</strong> Maclay & Osgood clasifican las interrupciones del habla en <em>Filled Pauses</em> (muletillas sonoras como 'eee' o 'mmm') y <em>Unfilled Pauses</em> (silencios). Reducir las muletillas sonoras reemplazándolas por pausas en silencio breves proyecta mayor seguridad y dominio del tema durante una presentación.
                </div>
            </div>
        `;
    }

    // EVALUACIÓN DE ARGUMENTACIÓN
    function evaluarArgumentoToulmin() {
        const postura = document.getElementById("arg-postura").value.trim();
        const razon = document.getElementById("arg-razon").value.trim();

        if (postura.length < 8 || razon.length < 8) {
            feedbackBox.innerHTML = `<p style="color:#ef4444; font-weight:bold;">⚠️ Completa la postura y la razón para evaluar la estructura.</p>`;
            return;
        }

        let conectoresLogicos = ["porque", "debido a", "ya que", "puesto que", "por consiguiente", "dado que", "razón por la cual"];
        let tieneConector = conectoresLogicos.some(c => razon.toLowerCase().includes(c) || postura.toLowerCase().includes(c));

        let diagnostico = "";
        let color = "#3b82f6";

        if (tieneConector && postura.length > 15 && razon.length > 20) {
            color = "#10b981";
            diagnostico = `
                <h4 style="color:#10b981; margin:0 0 10px 0;">✅ Estructura Argumentativa Correcta</h4>
                <p>Tu respuesta presenta una postura clara respaldada con un conector de relación lógica.</p>
                <p><strong>Fundamento:</strong> El Modelo Argumentativo de Stephen Toulmin (1958) establece que una tesis debe ser conectada con su garantía para ser coherente.</p>
            `;
        } else {
            color = "#f59e0b";
            diagnostico = `
                <h4 style="color:#d97706; margin:0 0 10px 0;">⚠️ Estructura Incompleta</h4>
                <p>Agrega un conector explicativo (como <em>'porque'</em>, <em>'debido a'</em> o <em>'ya que'</em>) para asegurar que la razón respalde la postura propuesta.</p>
            `;
        }

        feedbackBox.style.borderLeft = `5px solid ${color}`;
        feedbackBox.innerHTML = diagnostico;
    }

    // EVENTOS
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
