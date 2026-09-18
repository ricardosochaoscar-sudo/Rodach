// recorder.js
// Micrófono y grabación local para las prácticas de oratoria.
(function () {
  'use strict';

  async function requestMicrophonePermission() {
    if (!window.isSecureContext) {
      throw new Error('El micrófono solo funciona en una página HTTPS. Abre la página de GitHub Pages, no un archivo descargado.');
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Este navegador no permite acceder al micrófono. Usa Google Chrome o Microsoft Edge.');
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => track.stop());
    return true;
  }

  function installMicrophonePermissionFlow() {
    document.addEventListener('click', async event => {
      const acceptButton = event.target.closest('#accept-mic-btn');
      if (!acceptButton || acceptButton.dataset.permissionChecked === 'true') return;

      const startButton = document.getElementById('start-mic-btn');
      const originalText = acceptButton.textContent;
      acceptButton.disabled = true;
      acceptButton.textContent = 'Solicitando permiso...';

      try {
        await requestMicrophonePermission();
        acceptButton.dataset.permissionChecked = 'true';
        acceptButton.textContent = '✅ Micrófono autorizado';
        if (startButton) startButton.disabled = false;
        showMicrophoneMessage('Micrófono listo. Pulsa “Activar Micrófono e Iniciar” y comienza a hablar.', false);
      } catch (error) {
        acceptButton.disabled = false;
        acceptButton.textContent = originalText;
        showMicrophoneMessage(`⚠️ ${error.message || 'No se pudo acceder al micrófono.'} Revisa los permisos del navegador y vuelve a intentarlo.`, true);
      }
    }, true);

    document.addEventListener('click', async event => {
      const startButton = event.target.closest('#start-mic-btn');
      if (!startButton || startButton.disabled || startButton.dataset.permissionChecked === 'true') return;
      try {
        await requestMicrophonePermission();
        startButton.dataset.permissionChecked = 'true';
      } catch (error) {
        event.preventDefault();
        event.stopImmediatePropagation();
        showMicrophoneMessage(`⚠️ ${error.message || 'No se pudo acceder al micrófono.'}`, true);
      }
    }, true);
  }

  function showMicrophoneMessage(message, isError) {
    const box = document.getElementById('transcript-box');
    if (!box) return;
    box.textContent = message;
    box.style.color = isError ? '#b91c1c' : '#166534';
    box.style.fontWeight = '700';
  }

  function recordAudio(durationSeconds = 30) {
    return new Promise(async (resolve, reject) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const preferred = 'audio/webm;codecs=opus';
        const options = window.MediaRecorder && MediaRecorder.isTypeSupported(preferred) ? { mimeType: preferred } : {};
        const recorder = new MediaRecorder(stream, options);
        const chunks = [];
        recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
        recorder.onerror = event => reject(event.error || new Error('Error al grabar el audio.'));
        recorder.onstop = () => {
          stream.getTracks().forEach(track => track.stop());
          resolve(new Blob(chunks, { type: recorder.mimeType || 'audio/webm' }));
        };
        recorder.start();
        setTimeout(() => { if (recorder.state !== 'inactive') recorder.stop(); }, Math.max(1000, durationSeconds * 1000));
      } catch (error) {
        reject(new Error(`No se pudo iniciar el micrófono: ${error.message || error.name}`));
      }
    });
  }

  window.RodachRecorder = {
    requestMicrophonePermission,
    recordAudio
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installMicrophonePermissionFlow);
  else installMicrophonePermissionFlow();
})();
