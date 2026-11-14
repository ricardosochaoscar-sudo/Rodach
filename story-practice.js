document.addEventListener("DOMContentLoaded", () => {
  const practiceDetails = {
    "everyday-story": {
      category: "EXPRESIÓN Y CREATIVIDAD",
      title: "El narrador de lo cotidiano",
      description: `<p id="practice-objective"><strong>Objetivo:</strong> Convertir una situación sencilla en una historia interesante.</p>
        <ol>
          <li>Escoge un objeto que tengas cerca.</li>
          <li>Inventa una historia sobre su origen, su importancia o un supuesto pasado.</li>
          <li>Utiliza pausas, cambios de entonación y descripciones.</li>
          <li>Practica y ejercita este ejercicio una y otra vez hasta que consigas dominar plenamente el arte de improvisar y así, no te quedarás atascado mentalmente en un discurso.</li>
        </ol>
        <img class="story-example-image" src="https://images.openai.com/static-rsc-4/o0NrI-eEVv-5pwmuHaZECJAXXWcH13qNSTUpQnRNoyDtJnL70aKUMrV20oG_9ePWsOyXXZgOHz8EiKuze53E1SPUiJNW8mYoAL9tJaK7UTrcQrCpRZsMlylr-HmKm329GBd5NqyzTvRgDbO8UkBUtDOk-YvUFIlG-hkCFDkjf5TsM0qAY7EtNmmcu10t-eCP?purpose=fullsize" alt="Personas conversando y compartiendo historias" loading="lazy">
        <p class="story-challenge"><strong>Desafío:</strong> Conseguir que alguien quiera escuchar la historia hasta el final.</p>`
    },
    "elevator-pitch": {
      category: "ORATORIA Y PERSUASIÓN",
      title: "El discurso del ascensor",
      description: `<p class="practice-intro"><strong>Situación hipotética:</strong> Imagínate que estás en un ascensor con un alto directivo o un inversor clave y solo tienes el tiempo que dura el trayecto (entre 30 y 45 segundos) para presentarle tu proyecto y captar toda su atención.</p>
        <p class="practice-intro"><strong>Qué es:</strong> Es una técnica de oratoria y persuasión diseñada para condensar la esencia de una idea, proyecto o propuesta de valor en muy poco tiempo, eliminando rodeos y yendo directo al grano.</p>
        <p class="practice-intro"><strong>Objetivo:</strong> Sintetizar y presentar un proyecto o idea clave de forma atractiva en menos de un minuto.</p>
        <ol>
          <li>Diseña un gancho potente para captar la atención de inmediato, en los primeros segundos.</li>
          <li>Explica la solución de tu proyecto de manera clara, directa y sin rodeos innecesarios.</li>
          <li>Controla el ritmo, mantén el contacto visual y modula la voz con seguridad.</li>
          <li>Practica y repite el ejercicio hasta dominar la capacidad de persuadir bajo presión de tiempo.</li>
        </ol>
        <img class="story-example-image" src="https://www.hiringourheroes.org/wp-content/uploads/2021/03/Elevator-Pitch-Tips-2.png" alt="Consejos visuales para preparar un discurso del ascensor" loading="lazy">
        <p class="story-challenge"><strong>Desafío:</strong> Lograr que tu mensaje sea tan claro y magnético que cualquier idea tuya tenga el máximo impacto en tiempo récord.</p>
        <div class="pitch-timer" role="group" aria-label="Cronómetro de 40 segundos">
          <div class="pitch-timer-display" aria-live="polite" aria-atomic="true">00:40</div>
          <div class="pitch-timer-controls">
            <button type="button" data-pitch-timer="start">Iniciar</button>
            <button type="button" data-pitch-timer="stop">Detener</button>
            <button type="button" data-pitch-timer="reset">Reiniciar</button>
          </div>
        </div>`
    },
    "everyday-analogies": {
      category: "CREATIVIDAD COMUNICATIVA",
      title: "La explicación con analogías",
      description: `<p class="practice-intro"><strong>Objetivo:</strong> Hacer comprensibles las ideas difíciles.</p>
        <p class="practice-intro">Escoge un concepto complicado, como la inteligencia artificial, la inflación o la gravedad, y explícalo utilizando tres comparaciones con situaciones cotidianas.</p>
        <img class="story-example-image" src="https://muyinteresante.okdiario.com/wp-content/uploads/sites/5/2023/10/17/652ebd6cbf532.jpeg" alt="Imagen para inspirar explicaciones de ideas complejas mediante analogías" loading="lazy">
        <p class="story-challenge"><strong>Desafío:</strong> Que alguien sin conocimientos del tema pueda comprenderlo gracias a tus explicaciones.</p>
        <div class="analogy-topic-picker" role="group" aria-label="Temas aleatorios para practicar">
          <span class="analogy-topic-label">Tema para explicar</span>
          <p class="analogy-topic" aria-live="polite" aria-atomic="true"></p>
          <div class="analogy-topic-controls">
            <button type="button" data-topic-navigation="previous" aria-label="Tema anterior">Atrás</button>
            <span class="analogy-topic-count" aria-live="polite"></span>
            <button type="button" data-topic-navigation="next" aria-label="Siguiente tema">Siguiente</button>
          </div>
        </div>`
    }
  };

  const analogyTopics = [
    "La administración del dinero y el presupuesto personal",
    "El manejo de las emociones y la inteligencia emocional",
    "La toma de decisiones bajo presión",
    "El hábito de la constancia y la disciplina diaria",
    "La comunicación asertiva en las relaciones",
    "El equilibrio entre el trabajo, el estudio y el tiempo libre",
    "La gestión del tiempo y la procrastinación",
    "El pensamiento crítico frente a la información en redes sociales",
    "La resolución de conflictos de forma pacífica",
    "La creación de hábitos saludables sostenibles"
  ];

  const openButtons = document.querySelectorAll("[data-story-practice]");
  if (!openButtons.length) return;

  const modal = document.createElement("div");
  modal.className = "story-practice-dialog";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="story-practice-backdrop" data-practice-close></div>
    <section class="story-practice-panel" role="dialog" aria-modal="true" aria-labelledby="story-practice-title" aria-describedby="practice-objective">
      <button type="button" class="story-dialog-close" aria-label="Cerrar práctica" data-practice-close>×</button>
      <span class="story-practice-tag" id="story-practice-category"></span>
      <h2 id="story-practice-title"></h2>
      <div id="story-practice-content"></div>
      <div class="story-dialog-actions">
        <button type="button" class="story-secondary-button" data-practice-close>Cerrar</button>
      </div>
    </section>`;
  document.body.appendChild(modal);

  let lastOpenButton = null;
  let timerInterval = null;
  let timerSeconds = 40;
  let currentTopicIndex = 0;

  function updateTimerDisplay() {
    const display = modal.querySelector(".pitch-timer-display");
    if (!display) return;
    const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
    const seconds = (timerSeconds % 60).toString().padStart(2, "0");
    display.textContent = `${minutes}:${seconds}`;
  }

  function stopTimer() {
    window.clearInterval(timerInterval);
    timerInterval = null;
  }

  function updateAnalogyTopic() {
    const topic = modal.querySelector(".analogy-topic");
    const count = modal.querySelector(".analogy-topic-count");
    if (!topic || !count) return;
    topic.textContent = analogyTopics[currentTopicIndex];
    count.textContent = `${currentTopicIndex + 1} / ${analogyTopics.length}`;
  }

  function closeModal() {
    stopTimer();
    timerSeconds = 40;
    modal.hidden = true;
    document.body.classList.remove("story-dialog-open");
    if (lastOpenButton) lastOpenButton.focus();
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const details = practiceDetails[button.dataset.storyPractice];
      if (!details) return;
      lastOpenButton = button;
      stopTimer();
      timerSeconds = 40;
      currentTopicIndex = 0;
      modal.querySelector("#story-practice-category").textContent = details.category;
      modal.querySelector("#story-practice-title").textContent = details.title;
      modal.querySelector("#story-practice-content").innerHTML = details.description;
      modal.hidden = false;
      document.body.classList.add("story-dialog-open");
      modal.querySelector(".story-dialog-close").focus();

      if (modal.querySelector(".pitch-timer-display")) {
        updateTimerDisplay();
        modal.querySelector('[data-pitch-timer="start"]').addEventListener("click", () => {
          if (timerInterval || timerSeconds <= 0) return;
          timerInterval = window.setInterval(() => {
            timerSeconds -= 1;
            updateTimerDisplay();
            if (timerSeconds <= 0) stopTimer();
          }, 1000);
        });
        modal.querySelector('[data-pitch-timer="stop"]').addEventListener("click", stopTimer);
        modal.querySelector('[data-pitch-timer="reset"]').addEventListener("click", () => {
          stopTimer();
          timerSeconds = 40;
          updateTimerDisplay();
        });
      }

      if (modal.querySelector(".analogy-topic-picker")) {
        updateAnalogyTopic();
        modal.querySelector('[data-topic-navigation="previous"]').addEventListener("click", () => {
          currentTopicIndex = (currentTopicIndex - 1 + analogyTopics.length) % analogyTopics.length;
          updateAnalogyTopic();
        });
        modal.querySelector('[data-topic-navigation="next"]').addEventListener("click", () => {
          currentTopicIndex = (currentTopicIndex + 1) % analogyTopics.length;
          updateAnalogyTopic();
        });
      }
    });
  });

  modal.querySelectorAll("[data-practice-close]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (!modal.hidden && event.key === "Escape") closeModal();
  });
});
