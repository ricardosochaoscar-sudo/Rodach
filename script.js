// ==========================================
// PROYECTO DE ORATORIA - RODACH
// INTERACTIVIDAD Y AUTOEVALUACIÓN CIENTÍFICA (CON MICRÓFONO FUNCIONAL)
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

    // SISTEMA DE EJERCICIOS
    const botones = document.querySelectorAll(".practice-card button");

    const ejercicios = [
        {
            titulo: "Habla durante 30 segundos",
            etiqueta: "EJERCICIO DE FLUIDEZ",
            descripcion: "Elige un tema que conozcas y habla durante 30 segundos sin leer ni memorizar un texto.",
            paraQueSirve: "Este ejercicio ayuda a practicar la fluidez verbal, la organización espontánea de ideas y la capacidad de mantener un discurso sin depender de un texto escrito.",
            instrucciones: [
                "Elige un tema que conozcas bien.",
                "Pulsa el botón para iniciar el cronómetro y el micrófono.",
                "Habla durante 30 segundos sin leer.",
                "Intenta mantener una idea principal y desarrollarla.",
                "Al terminar, evalúa cómo fue tu desempeño leyendo la transcripción."
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
                    Hablar con fluidez no significa hablar rápidamente. La fluidez implica poder expresar las ideas de manera continua y comprensible, utilizando pausas cuando sean necesarias.
                </p>
            `,
            preguntas: [
                "Mantuve una producción verbal continua sin pausas mayores a 3 segundos.",
                "Enlacé mis oraciones con conectores lógicos evitando repetir muletillas.",
                "Sostuve la coherencia sobre el tema seleccionado de principio a fin.",
                "Articulé cada palabra con volumen y claridad comprensibles.",
                "Expresé una idea completa antes de que expirara el cronómetro."
            ],
            respaldo: "Este cuestionario de autoevaluación fue diseñado a partir de los estudios sobre competencia comunicativa del lingüista Dell Hymes (1972) y las rúbricas de fluidez oral de Peter Skehan (1998), las cuales demuestran que la fluidez real se mide analizando la tasa de articulación y la continuidad sintáctica en tiempo real.",
            tipo: "fluidez"
        },
        {
            titulo: "Construye un argumento",
            etiqueta: "EJERCICIO DE ARGUMENTACIÓN",
            descripcion: "Escribe o dicta una opinión sobre un tema y acompáñala con una razón que la respalde.",
            paraQueSirve: "Este ejercicio permite practicar la construcción de argumentos: presentar una postura y justificarla mediante razones que tengan relación con ella.",
            instrucciones: [
                "Elige un tema sobre el que tengas una opinión.",
                "Escribe o dicta con el micrófono tu postura.",
                "Escribe o dicta una razón que la respalde.",
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
                    Un argumento no se vuelve verdadero simplemente porque esté bien escrito. Para evaluar su solidez también es necesario revisar la calidad y veracidad de las razones y evidencias utilizadas.
                </p>
            `,
            preguntas: [
                "Mi afirmación o tesis expresa una postura clara, directa y definida.",
                "La razón aportada responde de forma lógica al '¿por qué?' de mi postura.",
                "Evité usar falacias, descalificaciones personales o generalizaciones injustificadas.",
                "Aporté una justificación objetiva y coherente en lugar de una mera opinión impulsiva.",
                "El argumento posee una estructura firme que permitiría a un interlocutor debatir con bases."
            ],
            respaldo: "Esta autoevaluación argumentativa se fundamenta en el Modelo Logístico-Discursivo desarrollado por el filósofo Stephen Toulmin en su obra 'The Uses of Argument' (1958). Este modelo establece que un argumento es válido cuando existe una garantía transparente y demostrable que vincula la postura con su justificación.",
            tipo: "argumento"
        },
        {
            titulo: "Reto de improvisación",
            etiqueta: "EJERCICIO DE IMPROVISACIÓN",
            descripcion: "Recibe un tema y prepara una respuesta en un tiempo limitado.",
            paraQueSirve: "La improvisación permite practicar la capacidad de organizar ideas rápidamente y responder ante situaciones en las que no se dispone de mucho tiempo para preparar un discurso.",
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
                    Improvisar correctamente no significa hablar sin pausas ni producir una respuesta perfecta. El objetivo es aprender a organizar y comunicar ideas bajo una limitación de tiempo.
                </p>
            `,
            preguntas: [
                "Establecí una idea o postura central dentro de los primeros 10 segundos.",
                "Conservé una postura corporal erguida y un contacto visual firme.",
                "Desarrollé la respuesta sin desviarme hacia aspectos secundarios ajenos al tema.",
                "Regulé la velocidad de mi voz controlando la ansiedad o los nervios.",
                "Cerré la exposición con una conclusión o frase final clara."
            ],
            respaldo: "Cuestionario elaborado según las normativas de comunicación extemporánea de la National Communication Association (NCA) y los principios de autorregulación del discurso formulados por el Dr. James McCroskey (1984) en sus investigaciones sobre oratoria impromptu.",
            tipo: "improvisacion"
        }
    ];

    // LISTA DE 20 TEMAS EDUCATIVOS
    const temasImprovisacion = [
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
    ];

    // CREAR INTERFAZ DEL EJERCICIO
    const modal = document.createElement("div");
    modal.className = "exercise-modal";
    modal.innerHTML = `
        <div class="exercise-overlay"></div>
        <div class="exercise-window">
            <button class="exercise-close" type="button" aria-label="Cerrar ejercicio">×</button>
            <div class="exercise-header">
                <p class="exercise-label">EJERCICIO DE ORATORIA</p>
                <h2 id="exercise-title">Ejercicio</h2>
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
                <div id="exercise-interactive" class="exercise-interactive"></div>
                <div id="exercise-check" class="exercise-check"></div>

                <!-- SECCIÓN DE RESULTADO REESTRUCTURADA -->
                <div class="exercise-result">
                    <h3>Mi resultado</h3>
                    <p>Evalúa tu desempeño marcando los criterios que lograste cumplir:</p>
                    
                    <div id="result-questions" class="result-options" style="display:flex; flex-direction:column; gap:12px; margin: 15px 0; text-align:left;"></div>
                    
                    <button id="save-result" class="exercise-main-button" type="button">Guardar resultado</button>
                    <div id="result-message" class="result-message" style="margin-top:15px; padding:15px; background:#eef4fc; border-radius:6px; font-size:0.92em; line-height:1.6; text-align:left; color:#1e293b; display:none;"></div>
                    
                    <div id="academic-backing" style="margin-top:20px; padding:15px; background:#f8f9fa; border-left:4px solid #0056b3; border-radius:4px; font-size:0.86em; color:#495057; text-align:left; line-height:1.5;"></div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const titulo = document.getElementById("exercise-title");
    const descripcion = document.getElementById("exercise-description");
    const proposito = document.getElementById("exercise-purpose-text");
    const instrucciones = document.getElementById("exercise-instructions-list");
    const interactivo = document.getElementById("exercise-interactive");
    const comprobacion = document.getElementById("exercise-check");
    const cerrar = document.querySelector(".exercise-close");
    const overlay = document.querySelector(".exercise-overlay");
    const guardar = document.getElementById("save-result");
    const mensaje = document.getElementById("result-message");
    const preguntasContenedor = document.getElementById("result-questions");
    const respaldoContenedor = document.getElementById("academic-backing");

    let intervalo = null;
    let tiempo = 30;
    let reconocedorVoz = null;

    // INICIALIZACIÓN DE API DE RECONOCIMIENTO DE VOZ
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    function iniciarTranscripcion(elementoDestino, alTerminarCallback = null) {
        if (!SpeechRecognition) {
            alert("Tu navegador no soporta el reconocimiento de voz. Usa Google Chrome o Edge.");
            return null;
        }

        const recon = new SpeechRecognition();
        recon.lang = 'es-ES';
        recon.continuous = true;
        recon.interimResults = true;

        recon.onresult = (e) => {
            let transcripcion = '';
            for (let i = e.resultIndex; i < e.results.length; i++) {
                transcripcion += e.results[i][0].transcript;
            }
            if (elementoDestino.tagName === "TEXTAREA" || elementoDestino.tagName === "INPUT") {
                elementoDestino.value = transcripcion;
            } else {
                elementoDestino.innerHTML = `<strong>Transcripción en vivo:</strong> <br><em>${transcripcion}</em>`;
            }
        };

        recon.onerror = (e) => {
            console.error("Error de reconocimiento de voz:", e.error);
        };

        recon.onend = () => {
            if (alTerminarCallback) alTerminarCallback();
        };

        recon.start();
        return recon;
    }

    function detenoVoz() {
        if (reconocedorVoz) {
            reconocedorVoz.stop();
            reconocedorVoz = null;
        }
    }

    function abrirEjercicio(numero) {
        detenoVoz();
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
        mensaje.style.display = "none";
        mensaje.innerHTML = "";

        // Insertar dinámicamente las 5 preguntas (Checkboxes)
        preguntasContenedor.innerHTML = "";
        ejercicio.preguntas.forEach((pregunta, idx) => {
            const label = document.createElement("label");
            label.style.display = "flex";
            label.style.alignItems = "flex-start";
            label.style.gap = "8px";
            label.style.cursor = "pointer";
            label.innerHTML = `<input type="checkbox" class="eval-check" value="${idx + 1}" style="margin-top: 3px;"> <span>${idx + 1}. ${pregunta}</span>`;
            preguntasContenedor.appendChild(label);
        });

        // Insertar cita científica de respaldo
        respaldoContenedor.innerHTML = `<strong>🎓 Respaldo e investigación de origen:</strong> ${ejercicio.respaldo}`;

        if (ejercicio.tipo === "fluidez") {
            interactivo.innerHTML = `
                <div class="timer-box">
                    <p class="timer-label">CRONÓMETRO Y MICRÓFONO</p>
                    <div id="timer" class="timer">30</div>
                    <button id="start-timer" class="exercise-main-button" type="button">🎙️ Comenzar a Hablar</button>
                    <p id="timer-status">Cuando esté listo, comience a hablar. El micrófono se activará automáticamente.</p>
                    <div id="speech-preview" style="margin-top:15px; padding:10px; background:#f1f5f9; border-radius:6px; min-height:50px; font-size:0.9em; color:#334155; text-align:left;">El texto que hables aparecerá aquí...</div>
                </div>
            `;
            const timer = document.getElementById("timer");
            const iniciar = document.getElementById("start-timer");
            const estado = document.getElementById("timer-status");
            const preview = document.getElementById("speech-preview");

            iniciar.addEventListener("click", () => {
                clearInterval(intervalo);
                detenoVoz();
                tiempo = 30;
                timer.textContent = tiempo;
                iniciar.disabled = true;
                estado.textContent = "🎙️ Micrófono ACTIVO. Hable ahora, intente mantener el hilo de sus ideas.";
                preview.innerHTML = "Escuchando...";

                reconocedorVoz = iniciarTranscripcion(preview);

                intervalo = setInterval(() => {
                    tiempo--;
                    timer.textContent = tiempo;
                    if (tiempo <= 0) {
                        clearInterval(intervalo);
                        detenoVoz();
                        timer.textContent = "✓";
                        estado.textContent = "Tiempo terminado. Micrófono apagado. Evalúe su desempeño en la sección inferior.";
                        iniciar.disabled = false;
                    }
                }, 1000);
            });
        }

        if (ejercicio.tipo === "argumento") {
            interactivo.innerHTML = `
                <div class="argument-box">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <label>Mi opinión</label>
                        <button id="mic-opinion" type="button" style="background:#0056b3; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:0.8em;">🎙️ Dictar por voz</button>
                    </div>
                    <textarea id="opinion" placeholder="Escriba o dicte aquí su opinión..."></textarea>
                    
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                        <label>Mi razón</label>
                        <button id="mic-razon" type="button" style="background:#0056b3; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:0.8em;">🎙️ Dictar por voz</button>
                    </div>
                    <textarea id="razon" placeholder="¿Por qué piensa eso?"></textarea>
                    
                    <button id="review-argument" class="exercise-main-button" type="button" style="margin-top:15px;">Revisar mi argumento</button>
                    <div id="argument-feedback" class="argument-feedback"></div>
                </div>
            `;

            const txtOpinion = document.getElementById("opinion");
            const txtRazon = document.getElementById("razon");
            const btnMicOp = document.getElementById("mic-opinion");
            const btnMicRaz = document.getElementById("mic-razon");

            btnMicOp.addEventListener("click", () => {
                detenoVoz();
                btnMicOp.textContent = "🛑 Escuchando...";
                reconocedorVoz = iniciarTranscripcion(txtOpinion, () => {
                    btnMicOp.textContent = "🎙️ Dictar por voz";
                });
            });

            btnMicRaz.addEventListener("click", () => {
                detenoVoz();
                btnMicRaz.textContent = "🛑 Escuchando...";
                reconocedorVoz = iniciarTranscripcion(txtRazon, () => {
                    btnMicRaz.textContent = "🎙️ Dictar por voz";
                });
            });

            document.getElementById("review-argument").addEventListener("click", () => {
                detenoVoz();
                const opinion = txtOpinion.value.trim();
                const razon = txtRazon.value.trim();
                const feedback = document.getElementById("argument-feedback");

                if (!opinion || !razon) {
                    feedback.innerHTML = "<p>Complete la opinión y la razón antes de revisar el argumento.</p>";
                    return;
                }
                feedback.innerHTML = `
                    <h4>Revisión inicial</h4>
                    <p>Su argumento tiene una postura y una razón. Ahora pregúntese:</p>
                    <ul>
                        <li>¿La razón realmente respalda mi opinión?</li>
                        <li>¿Podría explicar la relación entre ambas?</li>
                        <li>¿Tengo algún dato o ejemplo que pueda respaldar mi razón?</li>
                    </ul>
                `;
            });
        }

        if (ejercicio.tipo === "improvisacion") {
            let indiceActual = 0;

            interactivo.innerHTML = `
                <div class="improvisation-box">
                    <p class="topic-label">SU TEMA ES:</p>
                    <h3 id="topic-text">${temasImprovisacion[indiceActual]}</h3>
                    <p>Tiene unos segundos para organizar sus ideas y comenzar a hablar.</p>
                    
                    <div style="margin: 15px 0;">
                        <button id="start-impro-mic" class="exercise-main-button" type="button">🎙️ Gravar mi improvisación</button>
                        <button id="new-topic" class="exercise-secondary-button" type="button" style="margin-left:8px;">Otro tema</button>
                    </div>
                    <div id="impro-preview" style="margin-top:10px; padding:10px; background:#f1f5f9; border-radius:6px; min-height:50px; font-size:0.9em; color:#334155; text-align:left;">Presione grabar cuando empiece a responder...</div>
                </div>
            `;

            const topicText = document.getElementById("topic-text");
            const btnNewTopic = document.getElementById("new-topic");
            const btnImproMic = document.getElementById("start-impro-mic");
            const improPreview = document.getElementById("impro-preview");

            btnNewTopic.addEventListener("click", () => {
                detenoVoz();
                indiceActual = (indiceActual + 1) % temasImprovisacion.length;
                topicText.textContent = temasImprovisacion[indiceActual];
                improPreview.innerHTML = "Presione grabar cuando empiece a responder...";
            });

            btnImproMic.addEventListener("click", () => {
                if (reconocedorVoz) {
                    detenoVoz();
                    btnImproMic.textContent = "🎙️ Gravar mi improvisación";
                    improPreview.innerHTML += "<br><strong>[Grabación finalizada]</strong>";
                } else {
                    btnImproMic.textContent = "🛑 Detener Grabación";
                    improPreview.innerHTML = "Escuchando...";
                    reconocedorVoz = iniciarTranscripcion(improPreview);
                }
            });
        }

        modal.classList.add("active");
        document.body.classList.add("exercise-open");
    }

    botones.forEach((boton, indice) => {
        boton.addEventListener("click", () => abrirEjercicio(indice));
    });

    function cerrarEjercicio() {
        clearInterval(intervalo);
        detenoVoz();
        modal.classList.remove("active");
        document.body.classList.remove("exercise-open");
    }

    cerrar.addEventListener("click", cerrarEjercicio);
    overlay.addEventListener("click", cerrarEjercicio);

    // SISTEMA DE RETROALIMENTACIÓN CUALITATIVA DETALLADA
    guardar.addEventListener("click", () => {
        const marcados = document.querySelectorAll(".eval-check:checked").length;
        mensaje.style.display = "block";

        if (marcados === 0) {
            mensaje.style.borderLeft = "4px solid #ef4444";
            mensaje.innerHTML = `
                <strong>⚠️ Evaluación incompleta:</strong><br>
                No has marcado ningún criterio. Para realizar una autoevaluación efectiva, analiza conscientemente tu ejercicio y selecciona las metas que lograste cumplir.
            `;
            return;
        }

        let tituloDiagnostico = "";
        let analisis = "";
        let recomendacion = "";

        if (marcados === 1 || marcados === 2) {
            mensaje.style.borderLeft = "4px solid #f59e0b";
            tituloDiagnostico = "📌 Diagnóstico: Fase Inicial de Dominio";
            analisis = `Has logrado consolidar <strong>${marcados} de 5 criterios</strong> clave. Esto indica que existen bases iniciales en tu discurso, pero se presentan interrupciones en la fluidez, la estructura lógica o el control del tiempo. Es un punto de partida natural en el entrenamiento de la oratoria.`;
            recomendacion = "<strong>Recomendación pedagógica:</strong> En tu próxima práctica, concéntrate en cumplir un único aspecto a la vez. Prioriza sostener la idea principal sin desviarte antes de preocuparte por la velocidad o el volumen.";
        } else if (marcados === 3 || marcados === 4) {
            mensaje.style.borderLeft = "4px solid #3b82f6";
            tituloDiagnostico = "📈 Diagnóstico: Desempeño Competente";
            analisis = `Has alcanzado <strong>${marcados} de 5 criterios</strong>. Demuestras un manejo sólido de tu discurso, manteniendo la coherencia y transmitiendo tu mensaje de manera comprensible para el oyente.`;
            recomendacion = "<strong>Recomendación pedagógica:</strong> Revisa los criterios que no marcaste en esta ocasión. Trabajar en el control sintáctico y en la reducción gradual de pausas prolongadas te permitirá alcanzar la máxima solidez argumentativa.";
        } else if (marcados === 5) {
            mensaje.style.borderLeft = "4px solid #10b981";
            tituloDiagnostico = "🌟 Diagnóstico: Excelencia Discursiva";
            analisis = `¡Felicitaciones! Cumpliste los <strong>5 de 5 criterios de autoevaluación</strong>. Has mantenido una continuidad verbal efectiva, articulación clara, solidez conceptual y un adecuado control del tiempo.`;
            recomendacion = "<strong>Recomendación pedagógica:</strong> Mantén este nivel practicando con temas de mayor complejidad o reduciendo el tiempo de preparación. La constancia es la clave para fijar estos hábitos de forma automática.";
        }

        mensaje.innerHTML = `
            <h4 style="margin:0 0 8px 0; color:#0f172a; font-size:1.05em;">${tituloDiagnostico}</h4>
            <p style="margin:0 0 8px 0;">${analisis}</p>
            <p style="margin:0;">${recomendacion}</p>
        `;

        localStorage.setItem("resultado-oratoria", marcados);
    });
});
