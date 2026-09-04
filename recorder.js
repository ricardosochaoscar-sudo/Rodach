// recorder.js
// Small client-side recorder + Supabase upload helper.
// Usage:
//  - Create a file `supabase-config.js` (not committed publicly) that sets:
//      window.SUPABASE_URL = 'https://your-project.supabase.co'
//      window.SUPABASE_ANON_KEY = 'public-anon-key'
//  - In the page call: await startAndUploadRecording({duration:30, videoId: 1, userId: null})

(function () {
  'use strict';

  // Ensure Supabase client is loaded (UMD bundle). If not, load it dynamically.
  function ensureSupabaseClient() {
    return new Promise((resolve, reject) => {
      if (window.supabase) return resolve(window.supabase);

      const url = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/dist/umd/supabase.min.js';
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => {
        if (window.supabase) return resolve(window.supabase);
        reject(new Error('Supabase library loaded but window.supabase is not available'));
      };
      script.onerror = () => reject(new Error('Failed to load supabase client from CDN'));
      document.head.appendChild(script);
    });
  }

  async function getSupabaseClient() {
    if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
      throw new Error('Supabase configuration missing. Create supabase-config.js setting window.SUPABASE_URL and window.SUPABASE_ANON_KEY');
    }
    await ensureSupabaseClient();
    // The UMD build exposes a createClient factory as supabase.createClient
    return window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  }

  // Record audio (webm) using MediaRecorder. Returns blob.
  function recordAudio(durationSeconds = 30) {
    return new Promise(async (resolve, reject) => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return reject(new Error('API de audio no soportada en este navegador'));
      }

      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        return reject(new Error('Permiso de micrófono denegado o no disponible: ' + (err && err.message)));
      }

      const options = { mimeType: 'audio/webm' };
      let mediaRecorder;
      let chunks = [];

      try {
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e) {
        // fallback to default
        try { mediaRecorder = new MediaRecorder(stream); } catch (err) { return reject(err); }
      }

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onerror = (e) => {
        console.warn('Recorder error', e);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        // stop all tracks
        stream.getTracks().forEach(t => t.stop());
        resolve(blob);
      };

      mediaRecorder.start();

      // Stop after duration
      setTimeout(() => {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
      }, Math.max(1000, durationSeconds * 1000));

      // In case user wants to stop earlier, provide stop function via returned object (handled externally)
    });
  }

  // Upload blob to Supabase storage
  async function uploadAudioToSupabase({ blob, bucket = 'audio', path }) {
    const supabase = await getSupabaseClient();
    // path example: `attempts/{userId}/{filename}`
    const file = new File([blob], path.split('/').pop(), { type: blob.type });
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
    if (error) throw error;
    return data; // contains { Key, ... }
  }

  // Save attempt metadata to Supabase table 'attempts'
  async function saveAttemptMetadata({ videoId = null, userId = null, audioPath = null, transcription = null, feedback = null }) {
    const supabase = await getSupabaseClient();
    const payload = {
      user_id: userId,
      video_id: videoId,
      audio_path: audioPath,
      transcription: transcription,
      feedback: feedback,
      created_at: new Date().toISOString()
    };
    const { data, error } = await supabase.from('attempts').insert([payload]);
    if (error) throw error;
    return data;
  }

  // Convenience: start recording for duration, upload to Supabase and save attempt metadata (if configured)
  async function startAndUploadRecording({ duration = 30, videoId = null, userId = null } = {}) {
    // record
    const blob = await recordAudio(duration);
    // filename with timestamp
    const ts = Date.now();
    const filename = `attempt_${videoId || 'unknown'}_${ts}.webm`;
    const path = `attempts/${userId || 'anonymous'}/${filename}`;

    // upload
    const uploadResult = await uploadAudioToSupabase({ blob, bucket: 'audio', path });

    // For now transcription is empty — server-side processing is recommended (Whisper)
    const transcription = null;

    // save metadata
    const saved = await saveAttemptMetadata({ videoId, userId, audioPath: path, transcription, feedback: null });

    return { uploadResult, saved, path };
  }

  // Expose functions on window
  window.RodachRecorder = {
    recordAudio,
    uploadAudioToSupabase,
    saveAttemptMetadata,
    startAndUploadRecording
  };

})();
