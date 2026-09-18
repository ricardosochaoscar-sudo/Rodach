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
                { text: "¿Qué elemento participa en el proceso comunicativo?", options: ["Emisor, mensaje y receptor", "Solo el volumen de la voz", "Únicamente el lugar", "El tamaño de la letra"], answer: 0, explanation: "La comunicación incluye quién emite, qué se comunica y quién recibe el mensaje." },
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

    function loadYouTubeApi() {
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
            const match = iframe.src.match(/embed\/([^?]+)/);
            if (!match || !quizzes[match[1]] || iframe.dataset.quizReady) return;
            iframe.dataset.quizReady = "true";
            const separator = iframe.src.includes("?") ? "&" : "?";
            iframe.src += separator + "enablejsapi=1&playsinline=1&origin=" + encodeURIComponent(location.origin);
            new YT.Player(iframe, { events: { onStateChange: (event) => {
                if (event.data === YT.PlayerState.ENDED) showQuiz(match[1]);
            } } });
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
            const buttons = [...content.querySelectorAll("button")];
            buttons.forEach((button) => {
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
