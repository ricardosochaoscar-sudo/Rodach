document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.querySelector("[data-story-practice]");
  if (!openButton) return;

  const modal = document.createElement("div");
  modal.className = "story-practice-dialog";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="story-practice-backdrop" data-story-close></div>
    <section class="story-practice-panel" role="dialog" aria-modal="true" aria-labelledby="story-practice-title" aria-describedby="story-practice-objective">
      <button type="button" class="story-dialog-close" aria-label="Cerrar práctica" data-story-close>×</button>
      <span class="story-practice-tag">EXPRESIÓN Y CREATIVIDAD</span>
      <h2 id="story-practice-title">El narrador de lo cotidiano</h2>
      <p id="story-practice-objective"><strong>Objetivo:</strong> convertir una situación sencilla en una historia interesante.</p>
      <ol>
        <li>Escoge un objeto que tengas cerca.</li>
        <li>Inventa una historia sobre su origen, importancia o supuesto pasado.</li>
        <li>Cuéntala durante 3 minutos.</li>
        <li>Utiliza pausas, cambios de entonación y descripciones.</li>
      </ol>
      <img class="story-example-image" src="https://images.openai.com/static-rsc-4/o0NrI-eEVv-5pwmuHaZECJAXXWcH13qNSTUpQnRNoyDtJnL70aKUMrV20oG_9ePWsOyXXZgOHz8EiKuze53E1SPUiJNW8mYoAL9tJaK7UTrcQrCpRZsMlylr-HmKm329GBd5NqyzTvRgDbO8UkBUtDOk-YvUFIlG-hkCFDkjf5TsM0qAY7EtNmmcu10t-eCP?purpose=fullsize" alt="Ejemplo visual para inspirar una historia sobre un objeto cotidiano" loading="lazy">
      <p class="story-challenge"><strong>Desafío:</strong> conseguir que alguien quiera escuchar la historia hasta el final.</p>
      <div class="story-timer" aria-live="polite" aria-label="Tiempo restante">03:00</div>
      <div class="story-dialog-actions">
        <button type="button" data-story-start>Iniciar temporizador</button>
        <button type="button" class="story-secondary-button" data-story-close>Cerrar</button>
      </div>
    </section>`;
  document.body.appendChild(modal);

  const timer = modal.querySelector(".story-timer");
  const startButton = modal.querySelector("[data-story-start]");
  let intervalId = null;
  let secondsLeft = 180;

  function updateTimer() {
    const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
    const seconds = (secondsLeft % 60).toString().padStart(2, "0");
    timer.textContent = `${minutes}:${seconds}`;
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("story-dialog-open");
    window.clearInterval(intervalId);
    intervalId = null;
    secondsLeft = 180;
    updateTimer();
    startButton.disabled = false;
    startButton.textContent = "Iniciar temporizador";
    openButton.focus();
  }

  openButton.addEventListener("click", () => {
    modal.hidden = false;
    document.body.classList.add("story-dialog-open");
    modal.querySelector("[data-story-close].story-dialog-close").focus();
  });

  modal.querySelectorAll("[data-story-close]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  startButton.addEventListener("click", () => {
    if (intervalId) return;
    secondsLeft = 180;
    updateTimer();
    startButton.disabled = true;
    startButton.textContent = "Práctica en curso…";
    intervalId = window.setInterval(() => {
      secondsLeft -= 1;
      updateTimer();
      if (secondsLeft <= 0) {
        window.clearInterval(intervalId);
        intervalId = null;
        timer.textContent = "¡Tiempo!";
        startButton.disabled = false;
        startButton.textContent = "Repetir práctica";
      }
    }, 1000);
  });

  document.addEventListener("keydown", (event) => {
    if (!modal.hidden && event.key === "Escape") closeModal();
  });
});
