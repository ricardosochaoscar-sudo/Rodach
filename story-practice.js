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
      <p id="story-practice-objective"><strong>Objetivo:</strong> Convertir una situación sencilla en una historia interesante.</p>
      <ol>
        <li>Escoge un objeto que tengas cerca.</li>
        <li>Inventa una historia sobre su origen, su importancia o un supuesto pasado.</li>
        <li>Cuéntala durante 3 minutos.</li>
        <li>Utiliza pausas, cambios de entonación y descripciones.</li>
      </ol>
      <img class="story-example-image" src="https://images.openai.com/static-rsc-4/o0NrI-eEVv-5pwmuHaZECJAXXWcH13qNSTUpQnRNoyDtJnL70aKUMrV20oG_9ePWsOyXXZgOHz8EiKuze53E1SPUiJNW8mYoAL9tJaK7UTrcQrCpRZsMlylr-HmKm329GBd5NqyzTvRgDbO8UkBUtDOk-YvUFIlG-hkCFDkjf5TsM0qAY7EtNmmcu10t-eCP?purpose=fullsize" alt="Ejemplo visual para inspirar una historia sobre un objeto cotidiano" loading="lazy">
      <p class="story-challenge"><strong>Desafío:</strong> Conseguir que alguien quiera escuchar la historia hasta el final.</p>
      <div class="story-dialog-actions">
        <button type="button" class="story-secondary-button" data-story-close>Cerrar</button>
      </div>
    </section>`;
  document.body.appendChild(modal);

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("story-dialog-open");
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

  document.addEventListener("keydown", (event) => {
    if (!modal.hidden && event.key === "Escape") closeModal();
  });
});
