/* Feedback visual inmediato y carga de los tests publicados en JSON. */
(function () {
  "use strict";

  const feedbackStyles = document.createElement("style");
  feedbackStyles.textContent = `
    .options .option.answer-correct { border-color: #16a34a !important; background: #f0fdf4 !important; color: #166534 !important; }
    .options .option.answer-incorrect { border-color: #dc2626 !important; background: #fef2f2 !important; color: #991b1b !important; }
    .quiz-answer-feedback { margin: 12px 0 0; font-weight: 700; }
    .quiz-answer-feedback.is-correct { color: #15803d; }
    .quiz-answer-feedback.is-incorrect { color: #b91c1c; }
  `;
  document.head.appendChild(feedbackStyles);

  // Load module quiz data from the same JSON files used by all three tests.
  TestUI.loadTest = function (moduleId) {
    return fetch(`content/tests/module-${moduleId}.json`)
      .then((response) => {
        if (!response.ok) throw new Error("No se encontró el test para el módulo " + moduleId);
        return response.json();
      });
  };

  document.addEventListener("change", (event) => {
    const selected = event.target;
    if (!selected.matches('.options input[type="radio"]') || !currentTest) return;

    const question = currentTest.questions[currentIndex];
    if (!question || question.type !== "single_choice") return;

    const options = Array.from(document.querySelectorAll(".options .option"));
    options.forEach((option, index) => {
      option.classList.toggle("answer-correct", index === Number(question.correct));
      option.classList.toggle("answer-incorrect", index === Number(selected.value) && Number(selected.value) !== Number(question.correct));
    });

    let feedback = document.querySelector(".quiz-answer-feedback");
    if (!feedback) {
      feedback = document.createElement("p");
      feedback.className = "quiz-answer-feedback";
      feedback.setAttribute("role", "status");
      feedback.setAttribute("aria-live", "polite");
      document.querySelector(".question-card .options").after(feedback);
    }

    const correct = Number(selected.value) === Number(question.correct);
    feedback.classList.toggle("is-correct", correct);
    feedback.classList.toggle("is-incorrect", !correct);
    feedback.textContent = correct ? "¡Correcto! Tu respuesta es la adecuada." : "Respuesta incorrecta. La opción correcta está marcada en verde.";
  });
})();
