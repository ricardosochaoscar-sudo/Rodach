/* Mini-tests interactivos para los videos del curso */
(function () {
    "use strict";

    const quizzes = {
        "pT6tWYZOR0g": {
            number: "02",
            title: "¿CÓMO FUNCIONA LA COMUNICACIÓN?",
            intro: "¡Video terminado! Responde rápido y demuestra cuánto aprendiste.",
            questions: [
                { text: "¿Qué debe tener claro una persona para comunicarse mejor?", options: ["El mensaje que quiere transmitir", "El color de la pantalla", "La cantidad de efectos", "Hablar lo más rápido posible"], answer: 0, explanation: "Un mensaje claro ayuda a que la audiencia entienda la idea principal." },
                { text: "¿Qué elementos participan en el proceso comunicativo?", options: ["Emisor, mensaje y receptor", "Solo el volumen de la voz", "Únicamente el lugar", "El tamaño de la letra"], answer: 0, explanation: "La comunicación incluye quién emite, qué se comunica y quién recibe el mensaje." },
                { text: "Reto relámpago: ¿qué hace más efectiva una exposición?", options: ["Improvisar todo", "Organizar las ideas y expresarlas con claridad", "Leer sin mirar al público", "Usar palabras difíciles siempre"], answer: 1, explanation: "La organización y la claridad hacen que el mensaje sea más comprensible." }
            ]
        },
        "nsytT2-cems": {
            number: "03",
            title: "EL MIEDO A HABLAR EN PÚBLICO",
            intro: "¡Terminaste el video! Supera el reto y comprueba lo que recuerdas.",
            questions: [
                { text: "¿Qué es normal sentir al hablar frente a otras personas?", options: ["Nervios o miedo", "Que nunca se pueda mejorar", "Que no haya nada que preparar", "Que solo los extrovertidos puedan hacerlo"], answer: 0, explanation: "Los nervios son una reacción normal y pueden manejarse con preparación y práctica." },
                { text: "¿Cuál es una estrategia útil para afrontar el miedo?", options: ["Evitar hablar siempre", "Prepararse y practicar progresivamente", "Hablar sin saber el tema", "No mirar ni escuchar al público"], answer: 1, explanation: "La preparación y la exposición progresiva ayudan a ganar seguridad." },
                { text: "Reto relámpago: ¿qué puede ayudar antes de comenzar?", options: ["Respirar, organizar las ideas y practicar", "Pensar que todo saldrá mal", "Memorizar sin comprender", "Hablar cada vez más rápido"], answer: 0, explanation: "Respirar, ordenar el mensaje y practicar reduce la tensión y mejora la confianza." }
            ]
        }
    };

    function addQuizStyles() {
        if (document.getElementById("video-quiz-styles")) return;
        const style = document.createElement("style");
        style.id = "video-quiz-styles";
        style.textContent = `.video-quiz-launch{display:block;width:100%;margin:14px 0 0;padding:13px 16px;border:0;border-radius:10px;background:#5b4bdb;color:#fff;font-weight:800;cursor:pointer}.video-quiz-launch:hover{background:#6b5be7}.video-quiz-modal{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px}.video-quiz-overlay{position:absolute;inset:0;background:rgba(3,7,18,.84);backdrop-filter:blur(5px)}.video-quiz-window{position:relative;width:min(620px,100%);max-height:90vh;overflow:auto;padding:32px;background:#fff;color:#172033;border-radius:24px;box-shadow:0 25px 80px rgba(0,0,0,.35)}.video-quiz-close{position:absolute;right:18px;top:14px;border:0;background:#eef1f7;color:#172033;border-radius:50%;width:36px;height:36px;font-size:24px;cursor:pointer}.quiz-badge{display:inline-block;padding:6px 10px;border-radius:999px;background:#e0e7ff;color:#4338ca;font-size:.75rem;font-weight:800;letter-spacing:1px}.video-quiz-window h2{margin:14px 45px 8px 0;color:#111827}.quiz-intro{color:#64748b}.quiz-progress{margin:20px 0 14px;color:#5b4bdb;font-weight:800}.quiz-content h3{margin-bottom:18px;color:#111827}.quiz-options{display:grid;gap:10px}.quiz-options button,.quiz-finish{border:2px solid #e2e8f0;background:#f8fafc;color:#172033;border-radius:12px;padding:13px 15px;text-align:left;cursor:pointer;font-weight:600}.quiz-options button.correct{background:#dcfce7;border-color:#22c55e}.quiz-options button.incorrect{background:#fee2e2;border-color:#ef4444}.quiz-feedback{min-height:26px;margin-top:14px;font-weight:700}.quiz-result{text-align:center}.quiz-score{font-size:4rem;font-weight:800;color:#5b4bdb}.quiz-finish{display:inline-block;background:#5b4bdb;color:#fff;text-align:center;margin-top:12px}.quiz-finish:hover{background:#6b5be7}`;
        document.head.appendChild(style);
    }

    function loadYouTubeApi() {
        addQuizStyles();
        if (window.YT && window.YT.Player) { initPlayers(); return; }
        const previous = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function () {
            if (typeof previous === "function") previous();
            initPlayers();
        };
        if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
            const script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api";
            document.head.appendChild(script);
        }
    }

    function initPlayers() {
        document.querySelectorAll(".video-embed iframe").forEach((iframe) => {
            const match = iframe.src.match(/embed\/([^?&]+)/);
            if (!match || !quizzes[match[1]]) return;
            const videoId = match[1];
            const card = iframe.closest(".video-card");
            if (!iframe.dataset.quizReady) {
                iframe.dataset.quizReady = "true";
                const button = document.createElement("button");
                button.type = "button";
                button.className = "video-quiz-launch";
                button.textContent = `🧠 Hacer mini test del video ${quizzes[videoId].number}`;
                button.addEventListener("click", () => showQuiz(videoId));
                card.appendChild(button);
                new YT.Player(iframe, { events: { onStateChange: (event) => {
                    if (event.data === YT.PlayerState.ENDED) showQuiz(videoId);
                } } });
            }
        });
    }

    function showQuiz(videoId) {
        if (document.querySelector(`[data-quiz-for="${videoId}"]`)) return;
        const quiz = quizzes[videoId];
        let current = 0;
        let score = 0;
        const modal = document.createElement("div");
        modal.className = "video-quiz-modal";
        modal.dataset.quizFor = videoId;
        modal.innerHTML = `<div class="video-quiz-overlay"></div><div class="video-quiz-window" role="dialog" aria-modal="true" aria-labelledby="quiz-title"><button class="video-quiz-close" aria-label="Cerrar mini test">×</button><div class="quiz-badge">MINI TEST · VIDEO ${quiz.number}</div><h2 id="quiz-title">${quiz.title}</h2><p class="quiz-intro">${quiz.intro}</p><div class="quiz-progress"></div><div class="quiz-content"></div></div>`;
        document.body.appendChild(modal);
        const content = modal.querySelector(".quiz-content");
        const progress = modal.querySelector(".quiz-progress");
        const close = () => modal.remove();
        modal.querySelector(".video-quiz-close").onclick = close;
        modal.querySelector(".video-quiz-overlay").onclick = close;

        function render() {
            const question = quiz.questions[current];
            progress.textContent = `Pregunta ${current + 1} de ${quiz.questions.length} · ⭐ ${score} puntos`;
            content.innerHTML = `<h3>${question.text}</h3><div class="quiz-options">${question.options.map((option, i) => `<button type="button" data-option="${i}">${option}</button>`).join("")}</div><p class="quiz-feedback" aria-live="polite"></p>`;
            content.querySelectorAll("button").forEach((button) => button.onclick = () => answer(Number(button.dataset.option)));
        }
        function answer(choice) {
            const question = quiz.questions[current];
            content.querySelectorAll("button").forEach((button) => {
                button.disabled = true;
                if (Number(button.dataset.option) === question.answer) button.classList.add("correct");
                if (Number(button.dataset.option) === choice && choice !== question.answer) button.classList.add("incorrect");
            });
            const feedback = content.querySelector(".quiz-feedback");
            if (choice === question.answer) { score++; feedback.innerHTML = "✅ ¡Excelente! " + question.explanation; }
            else feedback.innerHTML = "💡 Casi: " + question.explanation;
            setTimeout(() => { current++; current < quiz.questions.length ? render() : finish(); }, 1200);
        }
        function finish() {
            const total = quiz.questions.length;
            const message = score === total ? "¡Nivel experto! Estuviste muy pendiente." : score >= 2 ? "¡Muy bien! Repasa el video para completar el reto." : "Buen intento. Puedes volver a mirar el video y probar otra vez.";
            progress.textContent = `Resultado final · ⭐ ${score}/${total}`;
            content.innerHTML = `<div class="quiz-result"><div class="quiz-score">${score}/${total}</div><h3>${message}</h3><p>¡Sigue con tu curso de oratoria!</p><button type="button" class="quiz-finish">Continuar aprendiendo</button></div>`;
            content.querySelector(".quiz-finish").onclick = close;
        }
        render();
    }

    function start() { loadYouTubeApi(); }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
