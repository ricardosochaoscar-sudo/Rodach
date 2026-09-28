// tests.js — improved: embedded tests data, polished modal UI, per-question navigation,
// YouTube player integration, play buttons and accessible controls.

// Embedded test definitions to avoid exposing raw JSON endpoints on the page.
const RODACH_TESTS = {
  2: {
    "module_id": 2,
    "title": "¿Cómo funciona la comunicación?",
    "passing_score": 60,
    "questions": [
      {"id":"q1","type":"single_choice","weight":12,"prompt":"¿Cuál NO forma parte básica del proceso de comunicación?","options":["Emisor","Mensaje","Refrigerador","Receptor"],"correct":2},
      {"id":"q2","type":"matching","weight":8,"prompt":"Relaciona cada elemento con su ejemplo correcto (4 pares).","pairs":[{"left":"Mensaje","right":["una propuesta de proyecto","una gráfica"]},{"left":"Público","right":["compañeros de clase","público general"]},{"left":"Contexto","right":["auditorio escolar","chat de WhatsApp"]},{"left":"Propósito","right":["informar","persuadir"]}]},
      {"id":"q3","type":"single_choice_with_text","weight":12,"prompt":"Caso: quieres convencer al colegio de reciclar. ¿Qué combinación es más efectiva?","options":["Solo facts","Facts + emociones","Solo pathos","Solo autoridad"],"correct":1,"bonus_keywords":["compañeros","datos","beneficio","emocion","ejemplo"]},
      {"id":"q4","type":"ordering","weight":10,"prompt":"Ordena las preguntas que debe hacerse el orador antes de hablar.","items":["¿Qué quiero comunicar?","¿A quién?","¿Por qué importa?","¿Qué canal usar?"],"correct_order":[0,1,2,3]},
      {"id":"q5","type":"short_text","weight":8,"prompt":"En 1‑2 frases, diferencia 'título' y 'tema'.","scoring":{"keywords_title":["específico","breve","título"],"keywords_tema":["amplio","tema","contexto"],"full":8,"partial":4}},
      {"id":"q6","type":"single_choice","weight":10,"prompt":"En la frase de ejemplo, ¿cuál es el problema principal?","options":["Mala elección de palabras","Público objetivo incorrecto","Falta de evidencia","Problema de tono"],"correct":2},
      {"id":"q7","type":"true_false_set","weight":8,"prompt":"Marca Verdadero/Falso sobre ethos, pathos, logos y contexto.","items":[{"text":"Ethos está relacionado con la credibilidad.","answer":true},{"text":"Pathos se refiere a datos estadísticos.","answer":false},{"text":"Logos implica argumentos racionales.","answer":true},{"text":"Contexto no influye en la interpretación del mensaje.","answer":false}]},
      {"id":"q8","type":"constructive_short","weight":12,"prompt":"Redacta 2 frases: una con logos (dato/razón) y otra con pathos (elemento emocional) para convencer sobre reciclar.","scoring":{"require_logo":true,"require_pathos":true,"full":12,"partial":6}},
      {"id":"q9","type":"image_hotspot","weight":10,"prompt":"Selecciona en la imagen qué falla en la comunicación (marca el hotspot correcto).","hotspots":[{"id":"A","desc":"Mensaje mal ubicado"},{"id":"B","desc":"Público equivocado"},{"id":"C","desc":"Falta de evidencia"}],"correct":"B"},
      {"id":"q10","type":"open_reflection","weight":10,"prompt":"Reflexión: ¿Qué cambiarías mañana en tu forma de comunicar?","manual_review":true}
    ]
  },
  3: {
    "module_id": 3,
    "title": "El miedo a hablar en público",
    "passing_score": 60,
    "questions": [
      {"id":"q1","type":"single_choice","weight":10,"prompt":"¿Cuál es una respuesta fisiológica típica ante nervios?","options":["Corazón acelerado","Ganas de dormir","Verborrea"],"correct":0},
      {"id":"q2","type":"audio_analysis","weight":10,"prompt":"Sube o graba 30s de tu práctica. Detectaremos muletillas y pausas.","rules":{"muletillas_full":2,"score_map":{"<=2":10,"3-5":6,">5":2}}},
      {"id":"q3","type":"true_false_set","weight":8,"prompt":"Verdadero/Falso sobre ansiedad y pausas.","items":[{"text":"Más pausas = siempre más ansiedad.","answer":false},{"text":"Entrenar reduce la frecuencia de muletillas.","answer":true},{"text":"Una pausa ocasional no significa mal orador.","answer":true},{"text":"El público nunca nota las pausas breves.","answer":false}]},
      {"id":"q4","type":"single_choice_with_text","weight":12,"prompt":"Mejor estrategia para reducir ansiedad en una exposición breve","options":["Respiración + ensayar","Improvisar sin ensayo","Memorizar palabra por palabra","Solo notas"],"correct":0,"bonus_keywords":["respira","ensayar","practica"]},
      {"id":"q5","type":"self_scale","weight":10,"prompt":"Autoevalúa del 1 al 5 cuánto nervioso te sentiste antes de hablar."},
      {"id":"q6","type":"matching","weight":10,"prompt":"Empareja técnica con efecto.","pairs":[{"left":"Respiración diafragmática","right":"Controla ritmo"},{"left":"Anclaje visual","right":"Reduce vacilación"},{"left":"Ensayo escalonado","right":"Aumenta confianza"}]},
      {"id":"q7","type":"ordering","weight":12,"prompt":"Ordena 3 pasos para responder si te quedas en blanco.","items":["Respira","Reformula la pregunta","Pide un momento"],"correct_order":[2,0,1]},
      {"id":"q8","type":"constructive_short","weight":8,"prompt":"Construye una mini‑rutina de preparación de 30s antes de hablar (3 pasos).","scoring":{"keywords":["respira","visualiza","ensaya"],"full":8,"partial":4}},
      {"id":"q9","type":"audio_quality","weight":10,"prompt":"Auto‑grabación: se analizará PPM y muletillas. (Si integras servidor de transcripción, devolverá timestamps y puntaje)."},
      {"id":"q10","type":"action_plan","weight":10,"prompt":"Plan de mejora 2 semanas — escribe 2 acciones concretas (manual review).","manual_review":true}
    ]
  }
};

// Test UI implementation
const TestUI = (function(){
  function loadTest(moduleId){
    return new Promise((resolve, reject)=>{
      const t = RODACH_TESTS[moduleId];
      if(t) return resolve(t);
      // fallback: try to fetch (in case newer tests are stored externally)
      fetch(`content/tests/module-${moduleId}.json`).then(r=>{
        if(!r.ok) throw new Error('No se encontró el test para el módulo ' + moduleId);
        return r.json();
      }).then(j=>resolve(j)).catch(err=>reject(err));
    });
  }

  function createModal(){
    let ov = document.getElementById('test-overlay');
    if(ov) return ov;
    ov = document.createElement('div');
    ov.id = 'test-overlay';
    ov.className = 'test-overlay';
    ov.innerHTML = `
      <div class="test-window" role="dialog" aria-modal="true">
        <button id="close-test" class="test-close" aria-label="Cerrar test">×</button>
        <div id="test-header" class="test-header"></div>
        <div id="test-body" class="test-body"></div>
      </div>`;
    document.body.appendChild(ov);
    document.getElementById('close-test').addEventListener('click', closeModal);
    return ov;
  }

  function openTestModal(testJson){
    const ov = createModal();
    document.getElementById('test-header').innerHTML = `<div class="test-title">${escapeHtml(testJson.title)}<span class="test-score-badge">Min. ${testJson.passing_score}</span></div><div class="test-progress"><div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div></div>`;
    currentTest = testJson;
    currentAnswers = {};
    currentIndex = 0;
    renderQuestion(currentIndex);
    ov.style.display = 'flex';
    document.body.classList.add('test-open');
  }

  function closeModal(){
    const ov = document.getElementById('test-overlay');
    if(ov) ov.style.display = 'none';
    document.body.classList.remove('test-open');
  }

  // helpers to render question cards and navigation
  function renderQuestion(index){
    const q = currentTest.questions[index];
    const body = document.getElementById('test-body');
    const total = currentTest.questions.length;
    const pct = Math.round(((index)/total)*100);
    const fill = document.querySelector('.progress-fill');
    if(fill) fill.style.width = pct + '%';

    let html = `<div class="question-card"><h3 class="q-number">Pregunta ${index+1} / ${total}</h3><h4 class="q-prompt">${escapeHtml(q.prompt)}</h4>`;
    if(q.type==='single_choice' || q.type==='single_choice_with_text'){
      html += `<div class="options">`;
      q.options.forEach((opt,i)=> html += `<label class="option"><input type="radio" name="${q.id}" value="${i}"> <span>${escapeHtml(opt)}</span></label>`);
      html += `</div>`;
      if(q.type==='single_choice_with_text') html += `<textarea name="${q.id}_text" class="option-text" placeholder="Justifica tu respuesta (opcional)"></textarea>`;
    } else if(q.type==='true_false_set'){
      html += `<div class="tf-list">`;
      q.items.forEach((it,i)=> html += `<div class="tf-row"><label>${escapeHtml(it.text)}</label><select name="${q.id}_${i}"><option value="true">Verdadero</option><option value="false">Falso</option></select></div>`);
      html += `</div>`;
    } else if(q.type==='short_text' || q.type==='constructive_short' || q.type==='open_reflection' || q.type==='action_plan'){
      html += `<textarea name="${q.id}" class="long-text" placeholder="Escribe tu respuesta aquí..."></textarea>`;
    } else if(q.type==='ordering'){
      html += `<ol class="ordering-list">`;
      q.items.forEach((it,i)=> html += `<li data-index="${i}">${escapeHtml(it)}</li>`);
      html += `</ol><p class="muted">Si tu navegador no soporta arrastrar, escribe el orden en el campo de abajo.</p><input name="${q.id}_order" placeholder="Ej: 1,2,3,4">`;
    } else if(q.type==='matching'){
      html += `<div class="matching-grid">`;
      q.pairs.forEach((p,i)=> html += `<div class="match-row"><label>${escapeHtml(p.left)}</label><input name="${q.id}_pair_${i}" placeholder="Relaciona..."></div>`);
      html += `</div>`;
    } else if(q.type==='image_hotspot'){
      html += `<div class="hotspot-select"><select name="${q.id}">` + q.hotspots.map(h=>`<option value="${h.id}">${escapeHtml(h.desc)}</option>`).join('') + `</select></div>`;
    } else if(q.type==='audio_analysis' || q.type==='audio_quality'){
      html += `<div class="audio-instruction">Usa la sección de práctica para grabar tu audio de 30s. Cuando lo subas, vuelve y finalizarás este ítem.</div>`;
    } else {
      html += `<div class="muted">Tipo de pregunta no soportado en esta versión.</div>`;
    }

    html += `<div class="nav-row"><button class="secondary-button" id="prev-q">Atrás</button><button class="primary-button" id="next-q">Siguiente</button></div>`;
    html += `</div>`;
    body.innerHTML = html;

    // rehydrate answers if present
    rehydrateAnswers(q);

    // attach handlers
    document.getElementById('prev-q').addEventListener('click', ()=>{ if(index>0){ saveAnswer(q); currentIndex--; renderQuestion(currentIndex);} });
    document.getElementById('next-q').addEventListener('click', ()=>{ saveAnswer(q); if(index < currentTest.questions.length-1){ currentIndex++; renderQuestion(currentIndex);} else { finalizeAndScore(); } });
  }

  function rehydrateAnswers(q){
    const a = currentAnswers[q.id];
    if(!a) return;
    if(q.type==='single_choice' || q.type==='single_choice_with_text'){
      const radios = document.getElementsByName(q.id);
      radios.forEach(r=> { if(r.value == a.selected) r.checked = true; });
      const ta = document.querySelector(`textarea[name="${q.id}_text"]`);
      if(ta) ta.value = a.text || '';
    } else if(q.type==='true_false_set'){
      q.items.forEach((it,i)=>{ const sel = document.querySelector(`select[name="${q.id}_${i}"]`); if(sel) sel.value = a[i]; });
    } else if(q.type==='short_text' || q.type==='constructive_short' || q.type==='open_reflection' || q.type==='action_plan'){
      const ta = document.querySelector(`textarea[name="${q.id}"]`);
      if(ta) ta.value = a || '';
    } else if(q.type==='ordering'){
      const input = document.querySelector(`input[name="${q.id}_order"]`);
      if(input && a && Array.isArray(a)) input.value = a.map(x=>Number(x)+1).join(',');
    } else if(q.type==='matching'){
      q.pairs.forEach((p,i)=>{ const input = document.querySelector(`input[name="${q.id}_pair_${i}"]`); if(input) input.value = (a[i]||''); });
    } else if(q.type==='image_hotspot'){
      const sel = document.querySelector(`select[name="${q.id}"]`); if(sel) sel.value = a;
    }
  }

  function saveAnswer(q){
    if(q.type==='single_choice' || q.type==='single_choice_with_text'){
      const sel = document.querySelector(`input[name="${q.id}"]:checked`);
      const text = document.querySelector(`textarea[name="${q.id}_text"]`);
      currentAnswers[q.id] = { selected: sel ? sel.value : null, text: text ? text.value : '' };
    } else if(q.type==='true_false_set'){
      const vals = [];
      q.items.forEach((it,i)=>{ const v = document.querySelector(`select[name="${q.id}_${i}"]`); vals.push(v ? v.value : null); });
      currentAnswers[q.id] = vals;
    } else if(q.type==='short_text' || q.type==='constructive_short' || q.type==='open_reflection' || q.type==='action_plan'){
      const v = document.querySelector(`textarea[name="${q.id}"]`);
      currentAnswers[q.id] = v ? v.value : '';
    } else if(q.type==='ordering'){
      const input = document.querySelector(`input[name="${q.id}_order"]`);
      if(input && input.value) currentAnswers[q.id] = input.value.split(',').map(s=>Number(s.trim())-1);
    } else if(q.type==='matching'){
      const arr=[]; q.pairs.forEach((p,i)=>{ const input = document.querySelector(`input[name="${q.id}_pair_${i}"]`); arr.push(input ? input.value : ''); }); currentAnswers[q.id]=arr;
    } else if(q.type==='image_hotspot'){
      const sel = document.querySelector(`select[name="${q.id}"]`); currentAnswers[q.id] = sel ? sel.value : null;
    }
  }

  function finalizeAndScore(){
    // compute score using evaluator rules similar to previous impl
    const result = evaluate(currentTest, currentAnswers);
    showResultScreen(result);
    // submit attempt to backend
    submitAttempt(currentTest.module_id, result, currentAnswers).catch(()=>{});
    if(result.passed) unlockNextModule(currentTest.module_id);
  }

  function showResultScreen(result){
    const body = document.getElementById('test-body');
    const html = `
      <div class="result-screen">
        <h3>Resultado: ${result.score} / 100</h3>
        <p class="muted">${result.passed ? '¡Felicidades! Has aprobado este mini-test.' : 'No alcanzaste el 60. Te recomendamos revisar las recomendaciones.'}</p>
        <div class="result-details">${Object.keys(result.details).map(k=>`<div class="res-row">${k}: ${result.details[k].score} / ${result.details[k].max}</div>`).join('')}</div>
        <div class="result-actions"><button class="primary-button" id="close-result">Cerrar</button><button class="secondary-button" id="retry-test">Reintentar</button></div>
      </div>
    `;
    body.innerHTML = html;
    document.getElementById('close-result').addEventListener('click', closeModal);
    document.getElementById('retry-test').addEventListener('click', ()=>{ currentAnswers={}; currentIndex=0; renderQuestion(0); });
  }

  // Basic evaluator (same rules as previous)
  function evaluate(testJson, answers){
    let total = 0; const details = {};
    testJson.questions.forEach(q=>{
      const w = q.weight || 0; let score = 0;
      try{
        if(q.type==='single_choice' || q.type==='single_choice_with_text'){
          const sel = answers[q.id] && answers[q.id].selected;
          if(sel!=null && Number(sel)===Number(q.correct)) score = w;
          if(q.bonus_keywords && answers[q.id] && answers[q.id].text){ const txt = (answers[q.id].text||'').toLowerCase(); const has = q.bonus_keywords.some(k=>txt.includes(k)); if(has) score = Math.min(w, score + Math.round(w*0.33)); }
        } else if(q.type==='true_false_set'){
          const resp = answers[q.id]||[]; let c=0; q.items.forEach((it,i)=>{ if((resp[i]==='true')===Boolean(it.answer)) c++; }); score = Math.round((c/q.items.length)*w);
        } else if(q.type==='short_text' || q.type==='constructive_short'){
          const txt = (answers[q.id]||'').toLowerCase(); if(q.scoring && q.scoring.keywords_title){ const t=q.scoring; const hasTitle = t.keywords_title.some(k=>txt.includes(k)); const hasTema = t.keywords_tema? t.keywords_tema.some(k=>txt.includes(k)) : false; if(hasTitle && hasTema) score = w; else if(hasTitle||hasTema) score = Math.round(w/2); else score = 0; } else if(q.scoring && q.scoring.keywords){ const keys=q.scoring.keywords; const found = keys.filter(k=>txt.includes(k)).length; if(found>=2) score = w; else if(found===1) score = Math.round(w/2); else score=0; } else score=0;
        } else if(q.type==='ordering'){
          const resp = answers[q.id]||[]; const expected = q.correct_order||[]; if(resp.length && resp.every((v,i)=>Number(v)===Number(expected[i]))) score = w; else { let matches=0; for(let i=0;i<Math.min(resp.length, expected.length); i++) if(Number(resp[i])===Number(expected[i])) matches++; score = Math.round((matches/expected.length)*w);} }
        else if(q.type==='matching'){ const resp=answers[q.id]||[]; let correct=0; q.pairs.forEach((p,i)=>{ const right = p.right.join('|').toLowerCase(); if(resp[i] && right.includes((resp[i]||'').toLowerCase())) correct++; }); score = Math.round((correct/q.pairs.length)*w); }
        else if(q.type==='image_hotspot'){ if(answers[q.id]===q.correct) score = w; }
        else score = 0;
      }catch(e){ score = 0; }
      total += score; details[q.id] = {score, max: w};
    });
    const rounded = Math.round(total);
    return {score: rounded, passed: rounded >= (testJson.passing_score||60), details};
  }

  async function submitAttempt(moduleId, result, answers){
    const payload = { user_id: window.CURRENT_USER_ID || null, module_id: moduleId, score: result.score, passed: result.passed, answers, evaluated_feedback: result.details };
    try { await fetch('/api/quiz_attempts', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)}); } catch(e){ console.warn('No se pudo enviar intento:', e); }
  }

  function unlockNextModule(moduleId){ const next = moduleId + 1; const btn = document.querySelector(`.course-card[data-module="${next}"] .video-button`); const status = document.getElementById(`course-status-${next}`); if(btn){ btn.removeAttribute('disabled'); btn.textContent = 'Ver video'; } if(status) status.textContent = 'Desbloqueado'; try{ fetch(`/api/unlock_module`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({module_id:next, user_id:window.CURRENT_USER_ID})}); }catch(e){}
  }

  return { loadTest, openTestModal };
})();

// Utility
function escapeHtml(str){ if(!str) return ''; return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }

// Global state for modal
let currentTest = null; let currentAnswers = {}; let currentIndex = 0;

// Expose abrirMiniTest for YouTube handlers and buttons
async function abrirMiniTest(moduleId){ try{ const test = await TestUI.loadTest(moduleId); TestUI.openTestModal(test); } catch(e){ alert('No se pudo cargar el test: ' + e.message); } }
window.abrirMiniTest = abrirMiniTest;

// Attach click handler to quiz buttons
document.addEventListener('click',(e)=>{ const qbtn = e.target.closest('.quiz-button'); if(qbtn){ const mid = Number(qbtn.getAttribute('data-quiz')); abrirMiniTest(mid); } });

// Setup play functionality: store YT players map
window._rodachPlayers = window._rodachPlayers || {};
function handlePlayButtonClick(e){ const vbtn = e.target.closest('.video-button'); if(!vbtn) return; const card = vbtn.closest('.course-card'); if(!card) return; const moduleId = Number(card.getAttribute('data-module'));
  const yt = window._rodachPlayers[moduleId]; if(yt && typeof yt.playVideo === 'function'){ try{ yt.playVideo(); }catch(err){console.warn('YT play error',err);} return; }
  const vid = document.getElementById(`html5-${moduleId}`); if(vid && typeof vid.play === 'function'){ vid.play().catch(err=>console.warn('HTML5 play error',err)); return; }
  const iframe = card.querySelector('iframe'); if(iframe) iframe.scrollIntoView({behavior:'smooth', block:'center'});
}
document.addEventListener('click', handlePlayButtonClick);

// YouTube player setup: instantiate players and map them
function setupYouTubePlayers(){ function initPlayers(){ document.querySelectorAll('iframe[id^="player-"]').forEach(iframe=>{ const id = iframe.id; if(iframe.dataset.ytReady) return; iframe.dataset.ytReady = '1'; const player = new YT.Player(id, { events: { 'onStateChange': function(e){ if(e.data === YT.PlayerState.ENDED){ const mid = Number(id.split('-')[1]); abrirMiniTest(mid); } } } }); const mid = Number(id.split('-')[1]); window._rodachPlayers[mid] = player; }); }
  if(window.YT && YT.Player) initPlayers(); else { window.onYouTubeIframeAPIReady = initPlayers; }
}
window.addEventListener('DOMContentLoaded', ()=>{ setupYouTubePlayers(); });
