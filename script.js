// ... (Código anterior de navegación y definición del array de ejercicios se mantiene IGUAL)

        // Insertar cita científica de respaldo
        respaldoContenedor.innerHTML = `<strong>🎓 Respaldo e investigación de origen:</strong> ${ejercicio.respaldo}`;

        // ==============================================================================
        // INICIO MODIFICACIÓN ÚNICA: EJERCICIO 1 (FLUIDEZ CON MICRÓFONO FUNCIONAL)
        // ==============================================================================
        if (ejercicio.tipo === "fluidez") {
            interactivo.innerHTML = `
                <div class="timer-box">
                    <p class="timer-label">CONTROL DE GRABACIÓN</p>
                    <div class="rec-controls" style="display: flex; flex-direction: column; align-items: center; gap: 15px; margin-bottom: 15px;">
                        <!-- Botón del micrófono con icono SVG (puedes cambiarlo por una imagen si prefieres) -->
                        <button id="start-record" class="exercise-main-button" type="button" style="background-color: #ef4444; display: flex; align-items: center; gap: 8px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                            Permitir Micrófono y Grabar
                        </button>
                        <div id="timer" class="timer" style="display: none;">30</div>
                        
                        <!-- Elementos que se mostrarán dinámicamente -->
                        <p id="timer-status" class="status-text">Haga clic en el botón para comenzar la práctica. Necesitará dar permisos de micrófono.</p>
                        <div id="audio-playback-container" style="display: none; width: 100%; text-align: center;">
                            <p style="font-size: 0.9em; color: #475569; margin-bottom: 8px;">Escucha tu grabación antes de evaluarte:</p>
                            <audio id="audio-playback" controls style="width: 100%; max-width: 300px; margin: 0 auto;"></audio>
                        </div>
                    </div>
                </div>
            `;
            
            // Referencias a los nuevos elementos HTML
            const btnRecord = document.getElementById("start-record");
            const timerDisplay = document.getElementById("timer");
            const statusText = document.getElementById("timer-status");
            const audioPlaybackContainer = document.getElementById("audio-playback-container");
            const audioPlayback = document.getElementById("audio-playback");

            // Variables para la lógica de grabación (Tecnología verídica: MediaStream Recording API)
            let mediaRecorder = null;
            let audioChunks = []; // Guardará los fragmentos de audio
            let audioBlob = null; // El archivo de audio final
            let recordingTimer = null;
            let timeLeft = 30;

            // Función principal para gestionar la grabación
            async function gestionarGrabacion() {
                // ESTADO: DETENIDO / LISTO PARA GRABAR
                if (!mediaRecorder || mediaRecorder.state === "inactive") {
                    try {
                        statusText.textContent = "Solicitando permisos de micrófono...";
                        
                        // 1. Solicitar acceso al micrófono del usuario (Verídico, requiere HTTPS)
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                        
                        // 2. Crear el objeto MediaRecorder con el flujo del micrófono
                        mediaRecorder = new MediaRecorder(stream);
                        audioChunks = []; // Reiniciar fragmentos anteriores

                        // 3. Definir qué hacer cuando haya datos de audio disponibles
                        mediaRecorder.ondataavailable = (event) => {
                            if (event.data.size > 0) {
                                audioChunks.push(event.data);
                            }
                        };

                        // 4. Definir qué hacer al detener la grabación
                        mediaRecorder.onstop = () => {
                            // Crear el "Blob" (Binary Large Object) de audio final (formato dependiente del navegador, ej. webm u ogg)
                            audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType || 'audio/webm' });
                            
                            // Crear una URL temporal para el audio y ponerla en el reproductor
                            const audioUrl = URL.createObjectURL(audioBlob);
                            audioPlayback.src = audioUrl;
                            
                            // Mostrar el reproductor de audio
                            audioPlaybackContainer.style.display = "block";
                            statusText.textContent = "Grabación finalizada. Escucha tu audio arriba y luego realiza tu autoevaluación científica más abajo.";
                            
                            // Detener todas las pistas de audio para apagar el icono del micrófono del navegador
                            stream.getTracks().forEach(track => track.stop());
                        };

                        // 5. Iniciar la grabación real
                        mediaRecorder.start();
                        
                        // 6. Actualizar Interfaz (UI)
                        btnRecord.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg> Detener Grabación`;
                        btnRecord.style.backgroundColor = "#1e293b"; // Color oscuro para detener
                        audioPlaybackContainer.style.display = "none"; // Ocultar reproductor anterior si existe
                        timerDisplay.style.display = "block"; // Mostrar cronómetro
                        timerDisplay.textContent = timeLeft;
                        statusText.textContent = "Grabando... Hable ahora durante 30 segundos.";

                        // 7. Iniciar el cronómetro de 30 segundos
                        timeLeft = 30;
                        recordingTimer = setInterval(() => {
                            timeLeft--;
                            timerDisplay.textContent = timeLeft;
                            
                            if (timeLeft <= 0) {
                                detenerGrabacionAutomatica();
                            }
                        }, 1000);

                    } catch (error) {
                        console.error("Error al acceder al micrófono:", error);
                        statusText.textContent = "Error: No se pudo acceder al micrófono. Asegúrese de dar permisos y usar una conexión segura (HTTPS).";
                        btnRecord.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg> Reintentar Grabar`;
                        btnRecord.style.backgroundColor = "#ef4444";
                    }
                } 
                // ESTADO: GRABANDO (El usuario hace clic para detener antes de tiempo)
                else if (mediaRecorder.state === "recording") {
                    detenerGrabacionAutomatica();
                }
            }

            // Función auxiliar para detener la grabación limpiamente
            function detenerGrabacionAutomatica() {
                if (mediaRecorder && mediaRecorder.state === "recording") {
                    mediaRecorder.stop(); // Esto dispara el evento onstop definido arriba
                    clearInterval(recordingTimer);
                    timerDisplay.textContent = "✓";
                    btnRecord.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg> Grabar de Nuevo`;
                    btnRecord.style.backgroundColor = "#ef4444";
                }
            }

            // Evento click del botón principal
            btnRecord.addEventListener("click", gestionarGrabacion);
            
            // Asegurar que la grabación se detenga si se cierra el modal
            const checkCloseInterval = setInterval(() => {
                if (!modal.classList.contains("active") && mediaRecorder && mediaRecorder.state === "recording") {
                    detenerGrabacionAutomatica();
                    clearInterval(checkCloseInterval);
                }
            }, 500);
        }
        // ==============================================================================
        // FIN MODIFICACIÓN ÚNICA
        // ==============================================================================

        if (ejercicio.tipo === "argumento") {
// ... (El resto del código se mantiene EXACTAMENTE IGUAL)
