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
      description: `<p><strong>Situación hipotética:</strong> Imagínate que estás en un ascensor con un alto directivo o un inversor clave y solo tienes el tiempo que dura el trayecto (entre 30 y 45 segundos) para presentarle tu proyecto y captar toda su atención.</p>
        <p><strong>Qué es:</strong> Es una técnica de oratoria y persuasión diseñada para condensar la esencia de una idea, proyecto o propuesta de valor en muy poco tiempo, eliminando rodeos y yendo directo al grano.</p>
        <p><strong>Objetivo:</strong> Sintetizar y presentar un proyecto o idea clave de forma atractiva en menos de un minuto.</p>
        <ol>
          <li>Diseña un gancho potente para captar la atención de inmediato, en los primeros segundos.</li>
          <li>Explica la solución de tu proyecto de manera clara, directa y sin rodeos innecesarios.</li>
          <li>Controla el ritmo, mantén el contacto visual y modula la voz con seguridad.</li>
          <li>Practica y repite el ejercicio hasta dominar la capacidad de persuadir bajo presión de tiempo.</li>
        </ol>
        <img class="story-example-image" src="https://www.hiringourheroes.org/wp-content/uploads/2021/03/Elevator-Pitch-Tips-2.png" alt="Consejos visuales para preparar un discurso del ascensor" loading="lazy">
        <p class="story-challenge"><strong>Desafío:</strong> Lograr que la otra persona quiera saber más y pida tu contacto al terminar el trayecto.</p>`
    }
  };

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

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("story-dialog-open");
    if (lastOpenButton) lastOpenButton.focus();
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const details = practiceDetails[button.dataset.storyPractice];
      if (!details) return;
      lastOpenButton = button;
      modal.querySelector("#story-practice-category").textContent = details.category;
      modal.querySelector("#story-practice-title").textContent = details.title;
      modal.querySelector("#story-practice-content").innerHTML = details.description;
      modal.hidden = false;
      document.body.classList.add("story-dialog-open");
      modal.querySelector(".story-dialog-close").focus();
    });
  });

  modal.querySelectorAll("[data-practice-close]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (!modal.hidden && event.key === "Escape") closeModal();
  });
});
