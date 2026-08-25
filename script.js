// ==========================================
// PROYECTO DE ORATORIA - RODACH
// CUESTIONARIOS DE AUTOEVALUACIÓN CON RESPALDO
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

    // Gestión de ejercicios
    const botonesEjercicio = document.querySelectorAll(".practice-card button");
    botonesEjercicio.forEach((boton, indice) => {
        boton.addEventListener("click", () => {
            if (indice === 0) abrirEjercicioHablar();
            if (indice === 1) abrirEjercicioArgumento();
            if (indice === 2) abrirEjercicioImprovisacion();
        });
    });

    function obtenerResultados() {
        return JSON.parse(localStorage.getItem("rodachResultados")) || { hablar: 0, argumento: 0, improvisacion: 0 };
    }

    function guardarResultado(tipo) {
        const resultados = obtenerResultados();
        resultados[tipo]++;
        localStorage.setItem("rodachResultados", JSON.stringify(resultados));
    }

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

    // EJERCICIO 1: HABLA DURANTE 30 SEGUNDOS
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
                <span class="small-label">AUTOEVALUACIÓN DE FLUIDEZ</span>
                <h2>Criterios de Desempeño</h2>
                <p>Evalúa tu intervención marcando las casillas según corresponda:</p>

                <label class="check-item"><input type="checkbox" class="talk-check"> 1. Mantuve el flujo del habla sin pausas o silencios superiores a 3 segundos.</label>
                <label class="check-item"><input type="checkbox" class="talk-check"> 2. Utilicé conectores lógicos para hilar las ideas sin repetir muletillas excesivas.</label>
                <label class="check-item"><input type="checkbox" class="talk-check"> 3. Conservé la coherencia temática con el asunto seleccionado durante todo el tiempo.</label>
                <label class="check-item"><input type="checkbox" class="talk-check"> 4. Articulé las palabras con volumen y claridad comprensible.</label>
                <label class="check-item"><input type="checkbox" class="talk-check"> 5. Logré expresar una idea completa al finalizar la señal del cronómetro.</label>

                <button id="finish-talk" class="main-exercise-button">Guardar Resultado</button>
                <div id="talk-result" class="result-box"></div>

                <div class="academic-backstory" style="margin-top:20px; padding:15px; background:#f4f6f8; border-left:4px solid #0056b3; font-size:0.85em; color:#444;">
                    <strong>📚 Fundamentación Científica:</strong> Esta evaluación se diseñó con base en la <em>Teoría de la Competencia Comunicativa de Dell Hymes (1972)</em> y los parámetros de fluidez oral de <em>Peter Skehan (1998)</em> para medir la producción del lenguaje en tiempo real bajo presión temporal.
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
            resultado.innerHTML = `<strong>Puntaje obtenida: ${marcados}/5 criterios logrados.</strong>`;
        });
    }

    // EJERCICIO 2: CONSTRUYE UN ARGUMENTO
    function abrirEjercicioArgumento() {
        crearPantalla("Construye un argumento", `
            <div class="learning-box">
                <div class="learning-icon">🧠</div>
                <div>
                    <h2>Propósito del Ejercicio</h2>
                    <p>Estructurar razonamientos lógicos con validez discursiva evitando sesgos o falacias.</p>
                </div>
            </div>

            <div class="argument-inputs">
                <label>1. Tesis o Afirmación:</label>
                <textarea id="arg-tesis" rows="2" placeholder="Escribe tu postura clara sobre un tema..."></textarea>
                
                <label>2. Razonamiento o Premisa base:</label>
                <textarea id="arg-razon" rows="2" placeholder="¿Por qué sostienes esta postura?"></textarea>
            </div>

            <button id="evaluar-argumento" class="main-exercise-button">Evaluar Estructura</button>

            <div id="arg-evaluation" class="evaluation-box hidden" style="margin-top:20px;">
                <span class="small-label">AUTOEVALUACIÓN ARGUMENTATIVA</span>
                <h2>Criterios de Validez</h2>
                <p>Verifica si tu planteamiento cumple con los principios lógicos básicos:</p>

                <label class="check-item"><input type="checkbox" class="arg-check"> 1. Planteé una postura inicial comprensible y declarativa.</label>
                <label class="check-item"><input type="checkbox" class="arg-check"> 2. La razón responde de manera directa al '¿por qué?' de mi postura.</label>
                <label class="check-item"><input type="checkbox" class="arg-check"> 3. Evité incurrir en ataques personales o generalizaciones sin sustento.</label>
                <label class="check-item"><input type="checkbox" class="arg-check"> 4. Aporté información o datos concretos y no únicamente una opinión subjetiva.</label>
                <label class="check-item"><input type="checkbox" class="arg-check"> 5. La estructura permite ser debatida o analizada por un interlocutor.</label>

                <button id="finish-arg" class="main-exercise-button">Guardar Resultado</button>
                <div id="arg-result" class="result-box"></div>

                <div class="academic-backstory" style="margin-top:20px; padding:15px; background:#f4f6f8; border-left:4px solid #0056b3; font-size:0.85em; color:#444;">
                    <strong>📚 Fundamentación Científica:</strong> Cuestionario basado en el <em>Modelo Argumentativo de Stephen Toulmin (1958)</em>, estándar académico para la validación de la lógica discursiva y la argumentación crítica.
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
                alert("Completa ambos campos para validar.");
                return;
            }
            evaluacion.classList.remove("hidden");
        });

        finalizar.addEventListener("click", () => {
            const marcados = document.querySelectorAll(".arg-check:checked").length;
            guardarResultado("argumento");
            resultado.innerHTML = `<strong>Puntaje obtenido: ${marcados}/5 criterios validados.</strong>`;
        });
    }

    // EJERCICIO 3: RETO DE IMPROVISACIÓN
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
                    <p>Desarrollar adaptabilidad discursiva y capacidad de respuesta impromptu.</p>
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
                <span class="small-label">AUTOEVALUACIÓN DE IMPROVISACIÓN</span>
                <h2>Criterios de Adaptabilidad</h2>
                <p>Analiza tu desempeño extemporáneo:</p>

                <label class="check-item"><input type="checkbox" class="impro-check"> 1. Definí un eje central en los primeros segundos de mi intervención.</label>
                <label class="check-item"><input type="checkbox" class="impro-check"> 2. Mantuve una postura corporal erguida y segura durante la respuesta.</label>
                <label class="check-item"><input type="checkbox" class="impro-check"> 3. Atendí directamente el tema asignado sin desviarme a tópicos ajenos.</label>
                <label class="check-item"><input type="checkbox" class="impro-check"> 4. Conservé un ritmo de voz constante sin acelerarme por el nerviosismo.</label>
                <label class="check-item"><input type="checkbox" class="impro-check"> 5. Finalicé mi exposición con una conclusión o frase de cierre definida.</label>

                <button id="finish-impro" class="main-exercise-button">Guardar Resultado</button>
                <div id="impro-result" class="result-box"></div>

                <div class="academic-backstory" style="margin-top:20px; padding:15px; background:#f4f6f8; border-left:4px solid #0056b3; font-size:0.85em; color:#444;">
                    <strong>📚 Fundamentación Científica:</strong> Rúbrica elaborada conforme a las directrices de habla extemporánea de la <em>National Communication Association (NCA)</em> y el modelo de autocontrol comunicativo de <em>James McCroskey (1984)</em>.
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
            resultado.innerHTML = `<strong>Puntaje obtenido: ${marcados}/5 criterios cumplidos.</strong>`;
        });
    }

});
