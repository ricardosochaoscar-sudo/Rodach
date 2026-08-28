if (ejercicio.tipo === "fluidez") {
            interactivo.innerHTML = `
                <div class="timer-box" style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
                    <p class="timer-label">CONTROL DE GRABACIÓN</p>
                    <div id="timer" class="timer">30</div>
                    
                    <button id="start-mic-timer" class="exercise-main-button" type="button" style="background-color: #ef4444; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        🎤 Iniciar Micrófono y Cronómetro
                    </button>
                    
                    <p id="timer-status" style="font-size: 0.9em; margin-top: 5px;">Haga clic para solicitar permisos de micrófono e iniciar los 30 segundos.</p>
                    
                    <div id="audio-playback-container" style="display: none; width: 100%; text-align: center; margin-top: 10px;">
                        <p style="font-size: 0.88em; color: #475569; margin-bottom: 6px;">Escucha tu grabación antes de autoevaluarte:</p>
                        <audio id="audio-playback" controls style="width: 100%; max-width: 280px; margin: 0 auto;"></audio>
                    </div>
                </div>
            `;

            const btnMicTimer = document.getElementById("start-mic-timer");
            const timerDisplay = document.getElementById("timer");
            const statusText = document.getElementById("timer-status");
            const audioContainer = document.getElementById("audio-playback-container");
            const audioPlayback = document.getElementById("audio-playback");

            let mediaRecorder = null;
            let audioChunks = [];
            let streamRef = null;

            btnMicTimer.addEventListener("click", async () => {
                // Si ya está grabando y se presiona de nuevo, se detiene manualmente
                if (mediaRecorder && mediaRecorder.state === "recording") {
                    detenerTodo();
                    return;
                }

                try {
                    statusText.textContent = "Solicitando acceso al micrófono...";
                    
                    // Capturar el micrófono del usuario
                    streamRef = await navigator.mediaDevices.getUserMedia({ audio: true });
                    audioChunks = [];
                    mediaRecorder = new MediaRecorder(streamRef);

                    mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            audioChunks.push(event.data);
                        }
                    };

                    mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType || 'audio/webm' });
                        audioPlayback.src = URL.createObjectURL(audioBlob);
                        audioContainer.style.display = "block";
                        statusText.textContent = "Grabación finalizada. Escúchate arriba y realiza la autoevaluación.";
                        
                        // Apagar la luz del micrófono
                        if (streamRef) {
                            streamRef.getTracks().forEach(track => track.stop());
                        }
                    };

                    // Iniciar grabación y cronómetro
                    mediaRecorder.start();
                    clearInterval(intervalo);
                    tiempo = 30;
                    timerDisplay.textContent = tiempo;
                    audioContainer.style.display = "none";
                    
                    btnMicTimer.textContent = "🛑 Detener Grabación";
                    btnMicTimer.style.backgroundColor = "#1e293b";
                    statusText.textContent = "Grabando... Habla ahora durante 30 segundos.";

                    intervalo = setInterval(() => {
                        tiempo--;
                        timerDisplay.textContent = tiempo;

                        if (tiempo <= 0) {
                            detenerTodo();
                        }
                    }, 1000);

                } catch (err) {
                    console.error("Error al acceder al micrófono:", err);
                    statusText.textContent = "No se pudo acceder al micrófono. Asegúrate de dar los permisos en el navegador y usar HTTPS.";
                }
            });

            function detenerTodo() {
                clearInterval(intervalo);
                timerDisplay.textContent = "✓";
                btnMicTimer.textContent = "🎤 Grabar de Nuevo";
                btnMicTimer.style.backgroundColor = "#ef4444";

                if (mediaRecorder && mediaRecorder.state === "recording") {
                    mediaRecorder.stop();
                }
            }
        }
