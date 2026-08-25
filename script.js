// ==========================================
// PROYECTO DE ORATORIA - RODACH
// SISTEMA DE EJERCICIOS CON RESPALDO ACADÉMICO
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // Navegación suave
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

    // Escuchadores para abrir ejercicios
    const botonesEjercicio = document.querySelectorAll(".practice-card button");
    botonesEjercicio.forEach((boton, indice) => {
        boton.addEventListener("click", () => {
            if (indice === 0) abrirEjercicioHablar();
            if (indice === 1) abrirEjercicioArgumento();
            if (indice === 2) abrirEjercicioImprovisacion();
        });
    });

    // Gestión de resultados
    function obtenerResultados() {
        return JSON.parse(localStorage.getItem("rodachResultados")) || { hablar: 0, argumento: 0, improvisacion: 0 };
    }

    function guardarResultado(tipo) {
        const resultados = obtenerResultados();
        resultados[tipo]++;
        localStorage.setItem("rodachResultados", JSON.stringify(resultados));
    }

    // Estructura modal base
    function crearPantalla(titulo, contenido) {
        const pantallaAnterior = document.querySelector(".exercise-screen");
        if (pantallaAnterior) pantallaAnterior.remove();

        const pantalla = document.createElement("div");
        pantalla.className = "exercise-screen";
        pantalla.innerHTML = `
            <div class="exercise-container">
                <button class="exercise-close" aria-label="Cerrar ejercicio">×</button>
                <div class="exercise-header">
                    <span class="exercise-tag">PRÁCTICA DE ORATORIA SENA</span>
                    <h1>${titulo}</h1>
                </div>
                <div class="exercise-body">${contenido}</div>
                <div class="exercise-footer">
                    <button class="back-practice" type="button">← Volver a práctica</button>
                </div>
            </div>
        `;
        document.body.appendChild(pantalla);
        document.body.classList.add("exercise-open");

        const cerrar = pantalla.querySelector(".exercise-close");
        const volver = pantalla.querySelector(".back-practice");

        function cerrarPantalla() {
            pantalla.remove();
            document.body.classList.remove("exercise-open");
        }

        cerrar.addEventListener("click", cerrarPantalla);
        volver.addEventListener("click", cerrarPantalla);
    }

    // ==========================================
    // EJERCICIO 1: HABLA DURANTE 30 SEGUNDOS
    // ==========================================
    function abrirEjercicioHablar() {
        crearPantalla("Habla durante 30 segundos", `
            <div class="learning-box">
                <div class="learning-icon">🎤</div>
                <div>
                    <h2>Propósito del Ejercicio</h2>
                    <p>Desarrollar la fluidez verbal y reducir la latencia de respuesta sin dependencia de guiones escritos.</p>
                </div>
            </div>

            <div class="challenge-box">
                <span class="small-label">TU RETO</span>
                <h2>Habla sin parar durante 30 segundos</h2>
                <div class="timer-large">
                    <span id="talk-timer">30</span>
                    <small>segundos</small>
                </div>
                <button id="start-talk" class="main-exercise-button">Comenzar</button>
            </div>

            <div id="talk-evaluation" class="evaluation-box hidden">
                <span class="small-label">EVALUACIÓN DE COMPROMISO COMUNICATIVO</span>
                <h2>Autoevaluación de Fluidez</h2>
                <p>Responde con honestidad los 5 criterios de desempeño:</p>

                <label class="check-item"><input type="checkbox" class="talk-check"> 1. Mantuve una tasa de articulación continua sin silencios mayores a 3 segundos.</label>
                <label class="check-item"><input type="checkbox" class="talk-check"> 2. Utilicé conectores lógicos para hilar las ideas sin repetir muletillas excesivas.</label>
                <label class="check-item"><input type="checkbox" class="talk-check"> 3. Mantuve la coherencia temática con el asunto seleccionado durante todo el tiempo.</label>
                <label class="check-item"><input type="checkbox" class="talk-check"> 4. Articulé las palabras con volumen y proyección comprensible.</label>
                <label class="check-item"><input type="checkbox" class="talk-check"> 5. Logré finalizar una idea completa al sonar la señal de tiempo.</label>

                <button id="finish-talk" class="main-exercise-button">Ver mi resultado</button>
                <div id="talk-result" class="result-box"></div>

                <div class="academic-backstory" style="margin-top:20px; padding:15px; background:#f4f6f8; border-left:4px solid #0056b3; font-size:0.85em; color:#444;">
                    <strong>📚 Respaldo Académico:</strong> Esta autoevaluación se basa en la <em>Teoría de la Competencia Comunicativa de Dell Hymes (1972)</em> y en los parámetros de fluidez oral de <em>Peter Skehan (1998)</em>. Evalúa la capacidad del hablante para formular enunciados coherentes en tiempo real bajo presión temporal moderada.
                </div>
            </div>
        `);

        const boton = document.getElementById("start-talk");
        const contador = document.getElementById("talk-timer");
        const evaluacion = document.getElementById("talk-evaluation");
        const finalizar = document.getElementById("finish-talk");
        const resultado = document.getElementById("talk-result");
        let tiempo = 30;
        let intervalo = null;

        boton.addEventListener("click", () => {
            boton.disabled = true;
            boton.textContent = "En curso...";
            intervalo = setInterval(() => {
                tiempo--;
                contador.textContent = tiempo;
                if (tiempo <= 0) {
                    clearInterval(intervalo);
                    contador.textContent = "✓";
                    boton.textContent = "Tiempo finalizado";
                    evaluacion.classList.remove("hidden");
                }
            }, 1000);
        });

        finalizar.addEventListener("click", () => {
            const marcados = document.querySelectorAll(".talk-check:checked").length;
            guardarResultado("hablar");
            resultado.innerHTML = `<strong>Puntaje: ${marcados}/5 criterios cumplidos.</strong><br>${
                marcados >= 4 ? "¡Excelente desempeño! Demuestras alta fluidez verbal." : "Buen intento. Practica reducir las pausas lógicas para mejorar tu puntaje."
            }`;
        });
    }

    // ==========================================
    // EJERCICIO 2: CONSTRUYE UN ARGUMENTO
    // ==========================================
    function abrirEjercicioArgumento() {
        crearPantalla("Construye un argumento", `
            <div class="learning-box">
                <div class="learning-icon">🧠</div>
                <div>
                    <h2>Propósito del Ejercicio</h2>
                    <p>Estructurar razonamientos lógicos con validez discursiva evitando falacias comunes.</p>
                </div>
            </div>

            <div class="argument-inputs">
                <label>1. Tesis / Afirmación inicial:</label>
                <textarea id="arg-tesis" rows="2" placeholder="Escribe tu postura clara sobre un tema..."></textarea>
                
                <label>2. Razonamiento o Premisa base:</label>
                <textarea id="arg-razon" rows="2" placeholder="¿Por qué sostienes esta postura?"></textarea>
            </div>

            <button id="evaluar-argumento" class="main-exercise-button">Validar Estructura</button>

            <div id="arg-evaluation" class="evaluation-box hidden" style="margin-top:20px;">
                <span class="small-label">EVALUACIÓN DE ESTRUCTURA LÓGICA</span>
                <h2>Autoevaluación Argumentativa</h2>
                <p>Verifica si tu planteamiento cumple con los principios lógicos:</p>

                <label class="check-item"><input type="checkbox" class="arg-check"> 1. Mi afirmación presenta una postura clara y defendible (no ambigua).</label>
                <label class="check-item"><input type="checkbox" class="arg-check"> 2. La razón responde directamente a la pregunta '¿por qué?' respecto a mi tesis.</label>
                <label class="check-item"><input type="checkbox" class="arg-check"> 3. Evité incurrir en ataques personales o generalizaciones apresuradas.</label>
                <label class="check-item"><input type="checkbox" class="arg-check"> 4. La razón aporta evidencia lógica o factual, no solo una emoción personal.</label>
                <label class="check-item"><input type="checkbox" class="arg-check"> 5. Si un opositor me escuchara, mi argumento requeriría un contraargumento válido para ser debatido.</label>

                <button id="finish-arg" class="main-exercise-button">Registrar Evaluación</button>
                <div id="arg-result" class="result-box"></div>

                <div class="academic-backstory" style="margin-top:20px; padding:15px; background:#f4f6f8; border-left:4px solid #0056b3; font-size:0.85em; color:#444;">
                    <strong>📚 Respaldo Académico:</strong> Esta rúbrica toma como base el <em>Modelo Argumentativo de Stephen Toulmin (1958)</em>, utilizado internacionalmente en la enseñanza del debate analítico y la lógica formal para validar la solidez discursiva.
                </div>
            </div>
        `);

        const boton = document.getElementById("evaluar-argumento");
        const evaluacion = document.getElementById("arg-evaluation");
        const finalizar = document.getElementById("finish-arg");
        const resultado = document.getElementById("arg-result");

        boton.addEventListener("click", () => {
            const tesis = document.getElementById("arg-tesis").value.trim();
            const razon = document.getElementById("arg-razon").value.trim();

            if (!tesis || !razon) {
                alert("Por favor completa ambos campos antes de evaluar.");
                return;
            }
            evaluacion.classList.remove("hidden");
        });

        finalizar.addEventListener("click", () => {
            const marcados = document.querySelectorAll(".arg-check:checked").length;
            guardarResultado("argumento");
            resultado.innerHTML = `<strong>Estructura argumentativa: ${marcados}/5 elementos validados.</strong><br>${
                marcados >= 4 ? "Tu argumento posee solidez lógica formal." : "Revisa las razones aportadas para asegurar que respaldan directamente tu postura."
            }`;
        });
    }

    // ==========================================
    // EJERCICIO 3: RETO DE IMPROVISACIÓN
    // ==========================================
    function abrirEjercicioImprovisacion() {
        const temas = [
            "¿Por qué es fundamental escuchar antes de responder?",
            "¿La tecnología une o distorsiona el contacto humano?",
            "¿Qué cualidad define verdaderamente a un líder?",
            "¿Por qué el fracaso es una herramienta de aprendizaje?"
        ];
        const tema = temas[Math.floor(Math.random() * temas.length)];

        crearPantalla("Reto de improvisación", `
            <div class="learning-box">
                <div class="learning-icon">⏱️</div>
                <div>
                    <h2>Propósito del Ejercicio</h2>
                    <p>Capacidad de respuesta rápida, adaptabilidad del mensaje y estructuración bajo escenarios imprevistos.</p>
                </div>
            </div>

            <div class="challenge-box">
                <span class="small-label">TEMA ASIGNADO</span>
                <h2 style="color:#0056b3;">"${tema}"</h2>
                <div class="timer-large">
                    <span id="impro-timer">30</span>
                    <small>segundos de preparación</small>
                </div>
                <button id="start-impro" class="main-exercise-button">Comenzar preparación</button>
            </div>

            <div id="impro-evaluation" class="evaluation-box hidden" style="margin-top:20px;">
                <span class="small-label">EVALUACIÓN DE DISCURSO EXTEMPORÁNEO</span>
                <h2>Autoevaluación de Improvisación</h2>
                <p>Mide tu capacidad de respuesta impromptu:</p>

                <label class="check-item"><input type="checkbox" class="impro-check"> 1. Definí una idea central en los primeros 10 segundos de hablar.</label>
                <label class="check-item"><input type="checkbox" class="impro-check"> 2. Mantuve una postura corporal erguida y segura durante la intervención.</label>
                <label class="check-item"><input type="checkbox" class="impro-check"> 3. Respondí directamente al tema asignado sin desviarme a otros tópicos.</label>
                <label class="check-item"><input type="checkbox" class="impro-check"> 4. Utilicé un ritmo de voz constante sin acelerarme por el nerviosismo.</label>
                <label class="check-item"><input type="checkbox" class="impro-check"> 5. Concluí mi intervención con una frase de cierre definida.</label>

                <button id="finish-impro" class="main-exercise-button">Guardar Resultado</button>
                <div id="impro-result" class="result-box"></div>

                <div class="academic-backstory" style="margin-top:20px; padding:15px; background:#f4f6f8; border-left:4px solid #0056b3; font-size:0.85em; color:#444;">
                    <strong>📚 Respaldo Académico:</strong> Cuestionario basado en los parámetros de autoevaluación de habla impromptu desarrollados por la <em>National Communication Association (NCA)</em> y los modelos de adaptabilidad discursiva de <em>McCroskey (1984)</em>.
                </div>
            </div>
        `);

        const boton = document.getElementById("start-impro");
        const contador = document.getElementById("impro-timer");
        const evaluacion = document.getElementById("impro-evaluation");
        const finalizar = document.getElementById("finish-impro");
        const resultado = document.getElementById("impro-result");
        let tiempo = 30;
        let intervalo = null;

        boton.addEventListener("click", () => {
            boton.disabled = true;
            boton.textContent = "Preparándote...";
            intervalo = setInterval(() => {
                tiempo--;
                contador.textContent = tiempo;
                if (tiempo <= 0) {
                    clearInterval(intervalo);
                    contador.textContent = "¡HABLA!";
                    boton.textContent = "Presentación en curso";
                    evaluacion.classList.remove("hidden");
                }
            }, 1000);
        });

        finalizar.addEventListener("click", () => {
            const marcados = document.querySelectorAll(".impro-check:checked").length;
            guardarResultado("improvisacion");
            resultado.innerHTML = `<strong>Capacidad de respuesta: ${marcados}/5 criterios logrados.</strong><br>${
                marcados >= 4 ? "Excelente control discursivo bajo presión." : "Sigue practicando la estructuración rápida de ideas."
            }`;
        });
    }

    console.log("Rodach - Proyecto de Oratoria con respaldo académico cargado correctamente.");
});
