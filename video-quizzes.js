/* Mini-tests interactivos para los videos del curso */
(function () {
    "use strict";

    const quizzes = {
        pT6tWYZOR0g: {
            number: "02",
            title: "Título y tema: la diferencia",
            intro: "¡Video terminado! Demuestra que estuviste atento.",
            questions: [
                { text: "¿Cuál es la idea principal del video?", options: ["Título y tema significan exactamente lo mismo", "El título y el tema cumplen funciones diferentes", "El tema solo sirve para decorar", "El título siempre debe ser una pregunta"], answer: 1, explanation: "El título identifica o presenta; el tema indica de qué se hablará o desarrollará." },
                { text: "¿Qué ayuda a definir el tema de una exposición?", options: ["El asunto central que se va a desarrollar", "El color de las diapositivas", "La duración del saludo", "El tamaño de la letra"], answer: 0, explanation: "El tema es el asunto o idea central que se desarrollará." },
                { text: "Reto relámpago: ¿qué debe lograr un buen título?", options: ["Confundir al público", "Anticipar o identificar el contenido", "Reemplazar toda la explicación", "Ser siempre muy largo"], answer: 1, explanation: "Un buen título orienta al público y se relaciona con el contenido." }
            ]
        },
        nsytT2-cems: {
            number: "03",
            title: "Comunicación y expresión oral",
            intro: "¡Terminaste el video! Ahora juega y comprueba lo aprendido.",
            questions: [
                { text: "¿Qué elemento debe estar claro al comunicar una idea?", options: ["El mensaje principal", "El color del fondo", "La cantidad de animaciones", "El volumen más alto posible"], answer: 0, explanation: "Un mensaje claro ayuda a que la audiencia comprenda la idea central." },
                { text: "¿Qué demuestra que escuchamos activamente?", options: ["Interrumpir constantemente", "Ignorar al interlocutor", "Prestar atención y responder al mensaje", "Hablar más rápido"], answer: 2, explanation: "Escuchar activamente implica atender, comprender y responder de forma pertinente." },
                { text: "Reto relámpago: ¿qué hace más efectiva una exposición?", options: ["Improvisar todo", "Organizar las ideas y expresarlas con claridad", "Leer sin mirar al público", "Usar palabras difíciles siempre"], answer: 1, explanation: "La organización y la claridad hacen que el mensaje sea más comprensible." }
            ]
        }
    };

    let apiReady = false;
    const pending = [];

    function loadYouTubeApi() {
        if (window.YT && window.YT.Player) { apiReady = true; initPlayers(); return; }
        pending.push(true);
        if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) return;
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
        const previous = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function () {
            if (typeof previous === "function") previous();
            apiReady = true;
            initPlayers();
        };
    }

    function initPlayers() {
        document.querySelectorAll(".video-embed iframe").forEach((iframe) => {
            const match = iframe.src.match(/embed\/([^?]+)/);
            if (!match || !quizzes[match[1]] || iframe.dataset.quizReady) return;
            iframe.dataset.quizReady = "true";
            const separator = iframe.src.includes("?") ? "&" : "?";
            iframe.src += separator + "enablejsapi=1&playsinline=1";
            new YT.Player(iframe, { events: { onStateChange: (event) => {
                if (event.data === YT.PlayerState.ENDED) showQuiz(match[1]);
            } } });
        });
    }

    function showQuiz(videoId) {
        if (document.querySelector(`[data-quiz-for="${videoId}"]`)) return;
        const quiz = quizzes[videoId];
        let current = 0, score = 0;
        const modal = document.createElement("div");
        modal.className = "video-quiz-modal";
        modal.dataset.quizFor = videoId;
        modal.innerHTML = `<div class="video-quiz-overlay"></div><div class="video-quiz-window" role="dialog" aria-modal="true" aria-labelledby="quiz-title"><button class="video-quiz-close" aria-label="Cerrar mini test">×</button><div class="quiz-badge">MINI TEST · VIDEO ${quiz.number}</div><h2 id="quiz-title">${quiz.title}</h2><p class="quiz-intro">${quiz.intro}</p><div class="quiz-progress"></div><div class="quiz-content"></div></div>`;
        document.body.appendChild(modal);
        const content = modal.querySelector(".quiz-content"), progress = modal.querySelector(".quiz-progress");
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
            buttons.forEach((button) => { button.disabled = true; if (Number(button.dataset.option) === question.answer) button.classList.add("correct"); });
            const feedback = content.querySelector(".quiz-feedback");
            if (choice === question.answer) { score++; feedback.innerHTML = "✅ ¡Excelente! " + question.explanation; } else feedback.innerHTML = "💡 Casi: " + question.explanation;
            setTimeout(() => { current++; if (current < quiz.questions.length) render(); else finish(); }, 1200);
        }
        function finish() {
            const total = quiz.questions.length;
            const message = score === total ? "¡Nivel experto! Estuviste muy pendiente." : score >= 2 ? "¡Muy bien! Repasa el video para completar el reto." : "Buen intento. Vuelve a mirar el video y prueba otra vez.";
            progress.textContent = `Resultado final · ⭐ ${score}/${total}`;
            content.innerHTML = `<div class="quiz-result"><div class="quiz-score">${score}/${total}</div><h3>${message}</h3><p>Ahora puedes continuar con el siguiente video.</p><button type="button" class="quiz-finish">Continuar aprendiendo</button></div>`;
            content.querySelector(".quiz-finish").onclick = close;
        }
        render();
    }

    function start() { loadYouTubeApi(); }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
