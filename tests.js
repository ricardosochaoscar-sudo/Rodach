// tests.js - Test UI + YouTube handling for Rodach

// Simple TestUI loader and renderer. Loads content/tests/module-<id>.json
const TestUI = (function() {
  async function loadTest(moduleId) {
    const res = await fetch(`/content/tests/module-${moduleId}.json`);
    if (!res.ok) throw new Error('No se encontró el test para el módulo ' + moduleId);
    return res.json();
  }

  function createOverlay() {
    let ov = document.getElementById('test-overlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'test-overlay';
      ov.className = 'test-overlay';
      ov.innerHTML = `<div class="test-window" role="dialog" aria-modal="true"><button id="close-test" class="close">×</button><div id="test-body"></div></div>`;
      document.body.appendChild(ov);
      document.getElementById('close-test').addEventListener('click', () => closeTestModal());
    }
    return ov;
  }

  function openTestModal(testJson) {
    const ov = createOverlay();
    document.getElementById('test-body').innerHTML = renderTestForm(testJson);
    ov.style.display = 'block';
    attachFormHandlers(testJson);
  }

  function closeTestModal() {
    const ov = document.getElementById('test-overlay');
    if (ov) ov.style.display = 'none';
  }

  function renderTestForm(test) {
    const questionsHtml = test.questions.map((q, idx) => {
      if (q.type === 'single_choice' || q.type === 'single_choice_with_text') {
        const options = q.options.map((opt,i) => `<label><input type="radio" name="${q.id}" value="${i}"> ${opt}</label>`).join('<br>');
        const extra = q.type==='single_choice_with_text' ? `<div><textarea name="${q.id}_text" placeholder="Justifica (opcional)"></textarea></div>` : '';
        return `<div class="q" id="${q.id}"><h4>${idx+1}. ${q.prompt}</h4>${options}${extra}</div>`;
      }
      if (q.type === 'true_false_set') {
        const items = q.items.map((it,i)=>`<div><label>${it.text}</label><select name="${q.id}_${i}"><option value="true">Verdadero</option><option value="false">Falso</option></select></div>`).join('');
        return `<div class="q" id="${q.id}"><h4>${idx+1}. ${q.prompt}</h4>${items}</div>`;
      }
      if (q.type === 'short_text' || q.type === 'constructive_short' || q.type === 'open_reflection' || q.type === 'action_plan') {
        return `<div class="q" id="${q.id}"><h4>${idx+1}. ${q.prompt}</h4><textarea name="${q.id}" rows="3"></textarea></div>`;
      }
      if (q.type === 'ordering') {
        const items = q.items.map((it,i)=>`<li data-index="${i}">${it}</li>`).join('');
        return `<div class="q" id="${q.id}"><h4>${idx+1}. ${q.prompt}</h4><ol class="ordering" data-qid="${q.id}">${items}</ol><small>Ordena arrastrando (si no implementas DnD, acepta numerar)</small></div>`;
      }
      if (q.type === 'matching') {
        const pairs = q.pairs.map((p,i)=>`<div><label>${p.left}</label><input name="${q.id}_pair_${i}" placeholder="Relaciona con..."></div>`).join('');
        return `<div class="q" id="${q.id}"><h4>${idx+1}. ${q.prompt}</h4>${pairs}</div>`;
      }
      if (q.type === 'image_hotspot') {
        return `<div class="q" id="${q.id}"><h4>${idx+1}. ${q.prompt}</h4><div><select name="${q.id}">${q.hotspots.map(h=>`<option value="${h.id}">${h.desc}</option>`).join('')}</select></div></div>`;
      }
      if (q.type === 'audio_analysis' || q.type === 'audio_quality') {
        return `<div class="q" id="${q.id}"><h4>${idx+1}. ${q.prompt}</h4><p>Use la práctica de 30s o sube un audio en la sección de prácticas para que Tutor Rodach lo analice.</p></div>`;
      }
      return `<div class="q" id="${q.id}"><h4>${idx+1}. ${q.prompt}</h4><p>Tipo no renderizado en la UI básica.</p></div>`;
    }).join('');
    return `<form id="test-form">${questionsHtml}<div style="margin-top:12px;"><button type="button" id="submit-test" class="primary-button">Enviar y evaluar</button></div></form>`;
  }

  function attachFormHandlers(testJson) {
    const submit = document.getElementById('submit-test');
    submit.onclick = async () => {
      const answers = collectAnswers(testJson);
      const result = evaluateAnswers(testJson, answers);
      alert(`Tu puntuación automática: ${result.score} / 100`);
      await submitAttempt(testJson.module_id, result, answers);
      if (result.passed) {
        alert('Aprobaste. Se desbloqueará el siguiente módulo.');
        unlockNextModule(testJson.module_id);
      } else {
        alert('No alcanzaste 60. Revisa las recomendaciones y vuelve a intentarlo.');
      }
      closeTestModal();
    };
  }

  function collectAnswers(testJson) {
    const form = document.getElementById('test-form');
    const fd = new FormData(form);
    const answers = {};
    testJson.questions.forEach(q => {
      if (q.type === 'single_choice' || q.type === 'single_choice_with_text') {
        answers[q.id] = {selected: fd.get(q.id), text: fd.get(`${q.id}_text`)};
      } else if (q.type === 'true_false_set') {
        answers[q.id] = [];
        q.items.forEach((it,i)=> answers[q.id].push(fd.get(`${q.id}_${i}`)));
      } else if (q.type === 'short_text' || q.type==='constructive_short' || q.type==='open_reflection' || q.type==='action_plan') {
        answers[q.id] = fd.get(q.id);
      } else if (q.type === 'ordering') {
        const ol = document.querySelector(`ol.ordering[data-qid="${q.id}"]`);
        if (ol) {
          answers[q.id] = Array.from(ol.children).map(li => li.dataset.index);
        } else answers[q.id] = [];
      } else if (q.type === 'matching') {
        answers[q.id] = q.pairs.map((p,i)=> fd.get(`${q.id}_pair_${i}`));
      } else if (q.type === 'image_hotspot') {
        answers[q.id] = fd.get(q.id);
      } else {
        answers[q.id] = null;
      }
    });
    return answers;
  }

  function evaluateAnswers(testJson, answers) {
    let total = 0;
    const details = {};
    testJson.questions.forEach(q => {
      const w = q.weight || 0;
      let score = 0;
      try {
        if (q.type === 'single_choice' || q.type === 'single_choice_with_text') {
          const selected = answers[q.id] && answers[q.id].selected;
          if (selected !== null && selected !== undefined && Number(selected) === Number(q.correct)) score = w;
          if (q.bonus_keywords && answers[q.id] && answers[q.id].text) {
            const text = (answers[q.id].text||'').toLowerCase();
            const has = q.bonus_keywords.some(k=>text.includes(k));
            if (has) score = Math.min(w, score + Math.round(w*0.33));
          }
        } else if (q.type === 'true_false_set') {
          const items = q.items;
          const resp = answers[q.id] || [];
          let c=0;
          items.forEach((it,i)=> { if ((resp[i]==='true') === Boolean(it.answer)) c++; });
          score = Math.round((c/items.length)*w);
        } else if (q.type === 'short_text' || q.type==='constructive_short') {
          const text = (answers[q.id]||'').toLowerCase();
          let got=0;
          if (q.scoring && q.scoring.keywords_title) {
            const t = q.scoring;
            const hasTitle = t.keywords_title.some(k=>text.includes(k));
            const hasTema = t.keywords_tema ? t.keywords_tema.some(k=>text.includes(k)) : false;
            if (hasTitle && hasTema) got = t.full; else if (hasTitle||hasTema) got = t.partial; else got = 0;
            score = Math.round((got/q.scoring.full || 0)*w);
          } else if (q.scoring && q.scoring.keywords) {
            const keys = q.scoring.keywords || [];
            const found = keys.filter(k=>text.includes(k)).length;
            if (found >= 2) score = w; else if (found===1) score = Math.round(w/2); else score = 0;
          } else {
            score = 0;
          }
        } else if (q.type === 'ordering') {
          const resp = answers[q.id] || [];
          const expected = q.correct_order || [];
          if (resp.length && expected.length && resp.every((v,i)=>Number(v)===Number(expected[i]))) score = w;
          else {
            let matches = 0;
            for (let i=0;i<Math.min(resp.length, expected.length); i++) if (Number(resp[i])===Number(expected[i])) matches++;
            score = Math.round((matches/expected.length)*w);
          }
        } else if (q.type === 'matching') {
          const resp = answers[q.id] || [];
          let correct=0;
          q.pairs.forEach((p,i)=> {
            const right = p.right.join('|').toLowerCase();
            if (resp[i] && right.includes((resp[i]||'').toLowerCase())) correct++;
          });
          score = Math.round((correct/q.pairs.length)*w);
        } else if (q.type === 'image_hotspot') {
          if (answers[q.id] === q.correct) score = w;
        } else if (q.type === 'audio_analysis' || q.type === 'audio_quality') {
          score = 0;
        } else {
          score = 0;
        }
      } catch (e) {
        score = 0;
      }
      total += score;
      details[q.id] = {score, max: w};
    });
    const scoreRounded = Math.round(total);
    const passed = scoreRounded >= (testJson.passing_score||60);
    return {score: scoreRounded, passed, details};
  }

  async function submitAttempt(moduleId, result, answers) {
    const payload = {
      user_id: window.CURRENT_USER_ID || null,
      module_id: moduleId,
      score: result.score,
      passed: result.passed,
      answers: answers,
      evaluated_feedback: result.details
    };
    try {
      await fetch('/api/quiz_attempts', {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
      });
    } catch (e) {
      console.warn('No se pudo enviar intento al servidor:', e);
    }
  }

  function unlockNextModule(moduleId) {
    const next = moduleId + 1;
    const btn = document.querySelector(`.course-card[data-module="${next}"] .video-button`);
    const status = document.getElementById(`course-status-${next}`);
    if (btn) {
      btn.removeAttribute('disabled');
      btn.textContent = 'Ver video';
    }
    if (status) status.textContent = 'Desbloqueado';
    try {
      fetch(`/api/unlock_module`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({module_id:next, user_id:window.CURRENT_USER_ID})});
    } catch(e){}
  }

  return { loadTest, openTestModal };
})();

// Expose abrirMiniTest for global use (YouTube event handlers call this)
async function abrirMiniTest(moduleId) {
  try {
    const test = await TestUI.loadTest(moduleId);
    TestUI.openTestModal(test);
  } catch(e) {
    alert('No se pudo cargar el test: ' + e.message);
  }
}
window.abrirMiniTest = abrirMiniTest;

// Click handler for quiz buttons
document.addEventListener('click', (e)=>{
  const qbtn = e.target.closest('.quiz-button');
  if (qbtn) {
    const mid = Number(qbtn.getAttribute('data-quiz'));
    abrirMiniTest(mid);
  }
});

// YouTube players setup: detect ended and call abrirMiniTest(moduleId)
function setupYouTubePlayers() {
  function initPlayers() {
    document.querySelectorAll('iframe[id^="player-"]').forEach(iframe => {
      const id = iframe.id;
      if (iframe.dataset.ytReady) return;
      iframe.dataset.ytReady = '1';
      new YT.Player(id, {
        events: {
          'onStateChange': function(e) {
            if (e.data === YT.PlayerState.ENDED) {
              const mid = Number(id.split('-')[1]);
              abrirMiniTest(mid);
            }
          }
        }
      });
    });
  }

  if (window.YT && YT.Player) initPlayers();
  else {
    window.onYouTubeIframeAPIReady = initPlayers;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setupYouTubePlayers();
});
