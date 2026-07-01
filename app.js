/* ============================================================
   Arena de Estudio · Certificación Arquitecto Claude
   App 100% estática. Sin servidor, sin red. Bilingüe (ES / EN).
   ============================================================ */
(function () {
  "use strict";

  /* -------------------- i18n -------------------- */
  // Cada valor es un string o una función(params) -> string.
  const I18N = {
    es: {
      doc_title: "Claude Architect · Arena de Estudio",
      app_title: "Arena de Estudio",
      subtitle: n => `Certificación Arquitecto Claude · ${n} preguntas`,
      mode1_title: "Contra Reloj",
      mode1_desc: "Responde tantas preguntas como puedas antes de que se acabe el tiempo. Sin repetir hasta agotar el banco.",
      mode1_btn: "Iniciar Contra Reloj",
      duration_label: "Duración",
      mode2_title: "Supervivencia",
      mode2_desc: "Encadena respuestas correctas. Un solo fallo y vuelves al inicio. ¿Puedes completar el banco entero sin errar?",
      mode2_note: "Se registra tu racha y tu tiempo cada vez que fallas.",
      mode2_btn: "Iniciar Supervivencia",
      records_ta_title: "🏆 Récords · Contra Reloj",
      duration_filter: "Duración:",
      records_sv_title: "🔥 Récords · Supervivencia",
      records_sv_sub: "Mejores rachas sin fallar",
      clear_records: "Borrar récords",
      offline_note: "100% offline · tus datos se guardan solo en este navegador",
      quit: "← Salir",
      results_retry: "Jugar de nuevo",
      results_home: "Volver al menú",

      opt_minutes: n => `${n} minutos`,
      opt_min: n => `${n} min`,
      status_ta: (a, c) => `Respondidas: ${a} · Aciertos: ${c}`,
      status_sv: (s, t, best) => `Racha: ${s} / ${t}` + (best ? ` · Récord: ${best}` : ""),
      progress_label: (s, t, p) => `${s} de ${t} sin fallar (${p}%)`,

      ta_results_title: "⏱️ ¡Se acabó el tiempo!",
      stat_answered: "Respondidas",
      stat_correct: "Aciertos",
      stat_accuracy: "Precisión",
      ta_record: (dur, a) => `🎉 ¡Nuevo récord en ${dur} min: ${a} respondidas!`,
      failed_heading: n => `Preguntas falladas (${n})`,

      sv_win_title: "🏅 ¡Banco completo sin fallar!",
      stat_perfect_streak: "Racha perfecta",
      stat_total_time: "Tiempo total",
      sv_record: "🎉 ¡Nuevo récord de supervivencia!",
      review_label: "Repaso",
      sv_win_empty: n => `Impecable. Respondiste las ${n} preguntas sin un solo error.`,
      review_none: "Sin fallos. ¡Excelente trabajo! 🎯",

      fb_fail_head: s => `💥 Fallaste · racha de ${s}`,
      fb_you_chose: "Elegiste",
      fb_correct: "Correcta",
      fb_why: "Por qué:",
      fb_streak_time: t => `Tiempo de esta racha: <strong>${t}</strong>`,
      fb_new_streak_record: "¡nuevo récord de racha!",
      fb_retry: "Reintentar desde el inicio",
      fb_quit: "Salir al menú",
      review_your_answer: "Tu respuesta",

      rec_ta_empty: dur => `Aún no hay récords para ${dur} min. ¡Sé el primero!`,
      rec_answered: n => `${n} respondidas`,
      rec_ta_sub: (c, acc) => `${c} aciertos · ${acc}% precisión`,
      rec_sv_empty: "Aún no hay rachas registradas. ¡A por la primera!",
      rec_sv_main: s => `Racha de ${s}`,
      rec_sv_cleared: " · banco completo",
      rec_sv_sub: t => `en ${t}`,

      confirm_quit: "¿Salir de la partida? No se guardará este intento.",
      confirm_clear: "¿Borrar TODOS los récords guardados? Esta acción no se puede deshacer.",
      load_error: "No se pudo cargar el banco de preguntas. Ejecuta <code>python build-questions.py</code>.",
    },
    en: {
      doc_title: "Claude Architect · Study Arena",
      app_title: "Study Arena",
      subtitle: n => `Claude Architect Certification · ${n} questions`,
      mode1_title: "Time Attack",
      mode1_desc: "Answer as many questions as you can before time runs out. No repeats until the bank is exhausted.",
      mode1_btn: "Start Time Attack",
      duration_label: "Duration",
      mode2_title: "Survival",
      mode2_desc: "Chain correct answers. A single miss sends you back to the start. Can you clear the whole bank without a mistake?",
      mode2_note: "Your streak and time are recorded every time you fail.",
      mode2_btn: "Start Survival",
      records_ta_title: "🏆 Records · Time Attack",
      duration_filter: "Duration:",
      records_sv_title: "🔥 Records · Survival",
      records_sv_sub: "Best streaks without failing",
      clear_records: "Clear records",
      offline_note: "100% offline · your data is stored only in this browser",
      quit: "← Exit",
      results_retry: "Play again",
      results_home: "Back to menu",

      opt_minutes: n => `${n} minutes`,
      opt_min: n => `${n} min`,
      status_ta: (a, c) => `Answered: ${a} · Correct: ${c}`,
      status_sv: (s, t, best) => `Streak: ${s} / ${t}` + (best ? ` · Record: ${best}` : ""),
      progress_label: (s, t, p) => `${s} of ${t} without failing (${p}%)`,

      ta_results_title: "⏱️ Time's up!",
      stat_answered: "Answered",
      stat_correct: "Correct",
      stat_accuracy: "Accuracy",
      ta_record: (dur, a) => `🎉 New record for ${dur} min: ${a} answered!`,
      failed_heading: n => `Missed questions (${n})`,

      sv_win_title: "🏅 Whole bank cleared without failing!",
      stat_perfect_streak: "Perfect streak",
      stat_total_time: "Total time",
      sv_record: "🎉 New survival record!",
      review_label: "Review",
      sv_win_empty: n => `Flawless. You answered all ${n} questions without a single error.`,
      review_none: "No mistakes. Great job! 🎯",

      fb_fail_head: s => `💥 You missed · streak of ${s}`,
      fb_you_chose: "You chose",
      fb_correct: "Correct",
      fb_why: "Why:",
      fb_streak_time: t => `This streak's time: <strong>${t}</strong>`,
      fb_new_streak_record: "new streak record!",
      fb_retry: "Retry from the start",
      fb_quit: "Exit to menu",
      review_your_answer: "Your answer",

      rec_ta_empty: dur => `No records yet for ${dur} min. Be the first!`,
      rec_answered: n => `${n} answered`,
      rec_ta_sub: (c, acc) => `${c} correct · ${acc}% accuracy`,
      rec_sv_empty: "No streaks recorded yet. Go for the first!",
      rec_sv_main: s => `Streak of ${s}`,
      rec_sv_cleared: " · full bank",
      rec_sv_sub: t => `in ${t}`,

      confirm_quit: "Leave the game? This attempt won't be saved.",
      confirm_clear: "Delete ALL saved records? This cannot be undone.",
      load_error: "Could not load the question bank. Run <code>python build-questions.py</code>.",
    },
  };

  const DURATIONS = [15, 30, 45, 60, 90, 120];
  const LS_TA = "cca_records_ta";   // récords contra reloj (compartidos entre idiomas)
  const LS_SV = "cca_records_sv";   // récords supervivencia
  const LS_LANG = "cca_lang";
  const MAX_RECORDS = 10;

  // Estado global de idioma / datos.
  let LANG = "es";
  let QUESTIONS = [];
  let TOPIC_BY_ID = {};

  function t(key, ...args) {
    const v = (I18N[LANG] || I18N.es)[key];
    return typeof v === "function" ? v(...args) : (v == null ? key : v);
  }

  /* -------------------- utilidades -------------------- */
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function fmtClock(ms) {
    if (ms < 0) ms = 0;
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = n => String(n).padStart(2, "0");
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  }

  function fmtDate(ts) {
    const d = new Date(ts);
    const pad = n => String(n).padStart(2, "0");
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${String(d.getFullYear()).slice(2)}`;
  }

  function topicOf(q) { return TOPIC_BY_ID[q.topicId] || (q.scenario && q.scenario.title) || "—"; }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* -------------------- almacenamiento -------------------- */
  function loadRecords(key) {
    try { return JSON.parse(localStorage.getItem(key)) || null; }
    catch (e) { return null; }
  }
  function saveRecords(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); }
    catch (e) { /* modo privado / bloqueado */ }
  }

  function addTimeAttackRecord(duration, entry) {
    const all = loadRecords(LS_TA) || {};
    const list = all[String(duration)] || [];
    list.push(entry);
    list.sort((a, b) => b.answered - a.answered || b.correct - a.correct || a.ts - b.ts);
    all[String(duration)] = list.slice(0, MAX_RECORDS);
    saveRecords(LS_TA, all);
    return all[String(duration)][0] === entry;
  }

  function addSurvivalRecord(entry) {
    const list = loadRecords(LS_SV) || [];
    list.push(entry);
    list.sort((a, b) => b.streak - a.streak || a.timeMs - b.timeMs || a.ts - b.ts);
    const trimmed = list.slice(0, MAX_RECORDS);
    saveRecords(LS_SV, trimmed);
    return trimmed[0] === entry;
  }
  function bestSurvivalStreak() {
    const list = loadRecords(LS_SV) || [];
    return list.reduce((m, e) => Math.max(m, e.streak), 0);
  }

  /* -------------------- pantallas -------------------- */
  function showScreen(id) {
    $$(".screen").forEach(s => s.classList.remove("active"));
    $("#" + id).classList.add("active");
    window.scrollTo(0, 0);
  }

  /* ============================================================
     CARGA DINÁMICA DEL BANCO POR IDIOMA
     Inyecta questions.js (es) o questions.<lang>.js. Funciona en file://.
     ============================================================ */
  function bankFileFor(lang) {
    return lang === "es" ? "questions.js" : "questions." + lang + ".js";
  }

  function loadLanguage(lang) {
    return new Promise((resolve, reject) => {
      if (window.QUESTION_BANKS && window.QUESTION_BANKS[lang]) { resolve(); return; }
      const s = document.createElement("script");
      s.src = bankFileFor(lang);
      s.onload = () => {
        (window.QUESTION_BANKS && window.QUESTION_BANKS[lang])
          ? resolve() : reject(new Error("Sin datos para " + lang));
      };
      s.onerror = () => reject(new Error("No se pudo cargar " + s.src));
      document.head.appendChild(s);
    });
  }

  function setLanguage(lang, initial) {
    return loadLanguage(lang).then(() => {
      LANG = lang;
      try { localStorage.setItem(LS_LANG, lang); } catch (e) { /* noop */ }
      document.documentElement.lang = lang;

      const bank = window.QUESTION_BANKS[lang];
      QUESTIONS = bank.questions || [];
      TOPIC_BY_ID = {};
      (bank.topics || []).forEach(tp => { TOPIC_BY_ID[tp.id] = tp.title; });

      applyStaticI18n();
      updateLangButtons();
      updateSubtitle();
      relabelDurationOptions();
      renderHomeRecords();
      if (initial) showScreen("screen-home");
    }).catch(err => {
      console.error(err);
      $(".mode-grid").innerHTML = '<p style="color:var(--bad)">' + t("load_error") + "</p>";
    });
  }

  function updateLangButtons() {
    $$("#lang-switch .lang-btn").forEach(b => b.classList.toggle("active", b.dataset.lang === LANG));
  }

  function updateSubtitle() {
    $("#subtitle").textContent = t("subtitle", QUESTIONS.length);
  }

  function applyStaticI18n() {
    document.title = t("doc_title");
    $$("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (key === "doc_title") return;
      el.textContent = t(key);
    });
  }

  /* -------------------- selects de duración -------------------- */
  function buildDurationSelects() {
    const ta = $("#ta-time"), rec = $("#rec-ta-time");
    DURATIONS.forEach(d => {
      const o1 = document.createElement("option"); o1.value = d; ta.appendChild(o1);
      const o2 = document.createElement("option"); o2.value = d; rec.appendChild(o2);
    });
  }
  function relabelDurationOptions() {
    $$("#ta-time option").forEach(o => { o.textContent = t("opt_minutes", o.value); });
    $$("#rec-ta-time option").forEach(o => { o.textContent = t("opt_min", o.value); });
  }

  /* ============================================================
     ESTADO DE JUEGO
     ============================================================ */
  const game = {
    mode: null, queue: [], current: null, locked: false, lastId: null,
    duration: 0, endTime: 0, answered: 0, correct: 0, failures: [],
    startTime: 0, streak: 0, intId: null, lastRetry: null,
  };

  function refillQueue() {
    let q = shuffle(QUESTIONS);
    if (game.lastId && q.length > 1 && q[0].id === game.lastId) {
      [q[0], q[1]] = [q[1], q[0]];
    }
    game.queue = q;
  }

  function nextQuestion() {
    if (game.queue.length === 0) {
      if (game.mode === "timeattack") refillQueue();
      else return survivalWin();
    }
    game.current = game.queue.shift();
    game.lastId = game.current.id;
    game.locked = false;
    renderQuestion();
  }

  function renderQuestion() {
    const q = game.current;
    $("#feedback").hidden = true;
    $("#feedback").innerHTML = "";

    $("#q-topic").textContent = topicOf(q);
    const scen = (q.scenario && q.scenario.body) ? q.scenario.body : "";
    const scenEl = $("#q-scenario");
    if (scen) { scenEl.textContent = scen; scenEl.hidden = false; }
    else { scenEl.hidden = true; }
    $("#q-prompt").textContent = q.prompt;

    const opts = $("#q-options");
    opts.innerHTML = "";
    shuffle(q.options).forEach(o => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.dataset.key = o.key;
      btn.innerHTML = `<span class="option-key">${o.key}</span><span class="option-text"></span>`;
      btn.querySelector(".option-text").textContent = o.text;
      btn.addEventListener("click", () => onAnswer(o.key));
      opts.appendChild(btn);
    });

    updateGameStatus();
  }

  function updateGameStatus() {
    if (game.mode === "timeattack") {
      $("#game-status").textContent = t("status_ta", game.answered, game.correct);
    } else {
      $("#game-status").textContent = t("status_sv", game.streak, QUESTIONS.length, bestSurvivalStreak());
      updateProgress();
    }
  }

  function updateProgress() {
    const total = QUESTIONS.length || 1;
    const pct = Math.min(100, (game.streak / total) * 100);
    $("#progress-fill").style.width = pct + "%";
    $("#progress-label").textContent = t("progress_label", game.streak, total, Math.round(pct));
  }

  function onAnswer(chosenKey) {
    if (game.locked) return;
    game.locked = true;
    const q = game.current;
    const correctKey = q.answer.correctOptionKey;
    const isCorrect = chosenKey === correctKey;

    $$("#q-options .option").forEach(b => {
      b.disabled = true;
      if (b.dataset.key === correctKey) b.classList.add("correct");
      else if (b.dataset.key === chosenKey) b.classList.add("wrong");
    });

    if (game.mode === "timeattack") {
      game.answered++;
      if (isCorrect) game.correct++;
      else game.failures.push({ q, chosenKey });
      setTimeout(() => { if (game.mode === "timeattack") nextQuestion(); }, isCorrect ? 420 : 650);
    } else {
      if (isCorrect) {
        game.streak++;
        updateProgress();
        updateGameStatus();
        setTimeout(() => { if (game.mode === "survival") nextQuestion(); }, 420);
      } else {
        survivalFail(chosenKey);
      }
    }
  }

  /* ============================================================
     MODO 1 · CONTRA RELOJ
     ============================================================ */
  function startTimeAttack(minutes) {
    stopTimers();
    game.mode = "timeattack";
    game.duration = minutes;
    game.answered = 0; game.correct = 0; game.failures = [];
    game.lastId = null; game.locked = false;
    refillQueue();
    game.endTime = Date.now() + minutes * 60 * 1000;

    $("#progress-wrap").hidden = true;
    showScreen("screen-game");
    tickTimeAttack();
    game.intId = setInterval(tickTimeAttack, 250);
    nextQuestion();
  }

  function tickTimeAttack() {
    const remaining = game.endTime - Date.now();
    const el = $("#game-timer");
    el.textContent = fmtClock(remaining);
    el.classList.toggle("warn", remaining <= 60000 && remaining > 15000);
    el.classList.toggle("danger", remaining <= 15000);
    if (remaining <= 0) { el.textContent = "00:00"; endTimeAttack(); }
  }

  function endTimeAttack() {
    stopTimers();
    const accuracy = game.answered ? Math.round((game.correct / game.answered) * 100) : 0;
    const entry = { answered: game.answered, correct: game.correct, ts: Date.now() };
    const isRecord = addTimeAttackRecord(game.duration, entry);

    $("#results-title").textContent = t("ta_results_title");
    $("#results-summary").innerHTML = `
      <div class="stat"><div class="stat-value accent">${game.answered}</div><div class="stat-label">${t("stat_answered")}</div></div>
      <div class="stat"><div class="stat-value">${game.correct}</div><div class="stat-label">${t("stat_correct")}</div></div>
      <div class="stat"><div class="stat-value">${accuracy}%</div><div class="stat-label">${t("stat_accuracy")}</div></div>`;
    const recEl = $("#results-record");
    recEl.hidden = !isRecord;
    recEl.textContent = t("ta_record", game.duration, game.answered);

    $("#review-heading").textContent = t("failed_heading", game.failures.length);
    renderReview(game.failures);

    game.mode = null;
    game.lastRetry = () => startTimeAttack(game.duration);
    showScreen("screen-results");
  }

  /* ============================================================
     MODO 2 · SUPERVIVENCIA
     ============================================================ */
  function startSurvival() {
    stopTimers();
    game.mode = "survival";
    game.streak = 0; game.lastId = null; game.locked = false;
    game.startTime = Date.now();
    game.queue = shuffle(QUESTIONS);

    $("#progress-wrap").hidden = false;
    showScreen("screen-game");
    tickSurvival();
    game.intId = setInterval(tickSurvival, 250);
    updateProgress();
    nextQuestion();
  }

  function tickSurvival() {
    $("#game-timer").textContent = fmtClock(Date.now() - game.startTime);
  }

  function survivalFail(chosenKey) {
    stopTimers();
    const timeMs = Date.now() - game.startTime;
    const q = game.current;
    const isRecord = addSurvivalRecord({ streak: game.streak, timeMs, cleared: false, ts: Date.now() });

    const correctKey = q.answer.correctOptionKey;
    const chosenText = (q.options.find(o => o.key === chosenKey) || {}).text || "";
    const correctText = (q.options.find(o => o.key === correctKey) || {}).text || "";

    const fb = $("#feedback");
    fb.className = "feedback bad";
    fb.hidden = false;
    fb.innerHTML = `
      <div class="feedback-head">${t("fb_fail_head", game.streak)}</div>
      <div class="feedback-line">${t("fb_you_chose")} <span class="tag-key bad">${chosenKey}</span> — ${escapeHtml(chosenText)}</div>
      <div class="feedback-line">${t("fb_correct")} <span class="tag-key good">${correctKey}</span> — ${escapeHtml(correctText)}</div>
      <div class="feedback-just"><strong>${t("fb_why")}</strong> ${escapeHtml(q.answer.justification)}</div>
      <div class="feedback-line" style="margin-top:10px;">${t("fb_streak_time", fmtClock(timeMs))}${isRecord ? ' · <span style="color:var(--gold)">' + t("fb_new_streak_record") + '</span>' : ''}</div>
      <div class="feedback-actions">
        <button class="btn btn-primary" id="fb-retry">${t("fb_retry")}</button>
        <button class="btn-ghost" id="fb-quit">${t("fb_quit")}</button>
      </div>`;
    $("#fb-retry").addEventListener("click", startSurvival);
    $("#fb-quit").addEventListener("click", goHome);
    updateGameStatus();
  }

  function survivalWin() {
    stopTimers();
    const timeMs = Date.now() - game.startTime;
    const isRecord = addSurvivalRecord({ streak: game.streak, timeMs, cleared: true, ts: Date.now() });

    $("#results-title").textContent = t("sv_win_title");
    $("#results-summary").innerHTML = `
      <div class="stat"><div class="stat-value gold">${game.streak}</div><div class="stat-label">${t("stat_perfect_streak")}</div></div>
      <div class="stat"><div class="stat-value accent">${fmtClock(timeMs)}</div><div class="stat-label">${t("stat_total_time")}</div></div>`;
    const recEl = $("#results-record");
    recEl.hidden = !isRecord;
    recEl.textContent = t("sv_record");
    $("#review-heading").textContent = t("review_label");
    $("#results-review").innerHTML = `<div class="review-empty">${t("sv_win_empty", QUESTIONS.length)}</div>`;

    game.mode = null;
    game.lastRetry = startSurvival;
    showScreen("screen-results");
  }

  /* -------------------- repaso -------------------- */
  function renderReview(failures) {
    const wrap = $("#results-review");
    wrap.innerHTML = "";
    if (!failures.length) {
      wrap.innerHTML = `<div class="review-empty">${t("review_none")}</div>`;
      return;
    }
    failures.forEach(({ q, chosenKey }) => {
      const correctKey = q.answer.correctOptionKey;
      const chosenText = (q.options.find(o => o.key === chosenKey) || {}).text || "";
      const correctText = (q.options.find(o => o.key === correctKey) || {}).text || "";
      const item = document.createElement("div");
      item.className = "review-item";
      item.innerHTML = `
        <div class="review-topic">${escapeHtml(topicOf(q))}</div>
        <div class="review-prompt">${escapeHtml(q.prompt)}</div>
        <div class="review-line">${t("review_your_answer")} <span class="tag-key bad">${chosenKey}</span> — ${escapeHtml(chosenText)}</div>
        <div class="review-line">${t("fb_correct")} <span class="tag-key good">${correctKey}</span> — ${escapeHtml(correctText)}</div>
        <div class="review-just"><strong>${t("fb_why")}</strong> ${escapeHtml(q.answer.justification)}</div>`;
      wrap.appendChild(item);
    });
  }

  /* -------------------- timers -------------------- */
  function stopTimers() {
    if (game.intId) { clearInterval(game.intId); game.intId = null; }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) return;
    if (game.mode === "timeattack") tickTimeAttack();
    else if (game.mode === "survival") tickSurvival();
  });

  /* -------------------- navegación -------------------- */
  function goHome() {
    stopTimers();
    game.mode = null; game.locked = false;
    renderHomeRecords();
    showScreen("screen-home");
  }

  function quitGame() {
    if (game.mode && !confirm(t("confirm_quit"))) return;
    goHome();
  }

  /* ============================================================
     RÉCORDS EN EL MENÚ
     ============================================================ */
  function renderHomeRecords() {
    renderTimeAttackRecords();
    renderSurvivalRecords();
  }

  function renderTimeAttackRecords() {
    const dur = $("#rec-ta-time").value;
    const all = loadRecords(LS_TA) || {};
    const list = all[dur] || [];
    const wrap = $("#records-timeattack");
    if (!list.length) {
      wrap.innerHTML = `<div class="records-empty">${t("rec_ta_empty", dur)}</div>`;
      return;
    }
    wrap.innerHTML = list.map((e, i) => {
      const acc = e.answered ? Math.round((e.correct / e.answered) * 100) : 0;
      return `
        <div class="record-row ${i === 0 ? "top" : ""}">
          <div class="record-rank">${i === 0 ? "★" : i + 1}</div>
          <div>
            <div class="record-main">${t("rec_answered", e.answered)}</div>
            <div class="record-sub">${t("rec_ta_sub", e.correct, acc)}</div>
          </div>
          <div class="record-date">${fmtDate(e.ts)}</div>
        </div>`;
    }).join("");
  }

  function renderSurvivalRecords() {
    const list = loadRecords(LS_SV) || [];
    const wrap = $("#records-survival");
    if (!list.length) {
      wrap.innerHTML = `<div class="records-empty">${t("rec_sv_empty")}</div>`;
      return;
    }
    wrap.innerHTML = list.map((e, i) => `
      <div class="record-row ${i === 0 ? "top" : ""}">
        <div class="record-rank">${i === 0 ? "★" : i + 1}</div>
        <div>
          <div class="record-main">${t("rec_sv_main", e.streak)}${e.cleared ? " 🏅" : ""}</div>
          <div class="record-sub">${t("rec_sv_sub", fmtClock(e.timeMs))}${e.cleared ? t("rec_sv_cleared") : ""}</div>
        </div>
        <div class="record-date">${fmtDate(e.ts)}</div>
      </div>`).join("");
  }

  /* ============================================================
     WIRING
     ============================================================ */
  function loadSavedLang() {
    try {
      const l = localStorage.getItem(LS_LANG);
      if (l && I18N[l]) return l;
    } catch (e) { /* noop */ }
    // fallback: idioma del navegador
    const nav = (navigator.language || "es").slice(0, 2).toLowerCase();
    return I18N[nav] ? nav : "es";
  }

  function init() {
    buildDurationSelects();

    $("#start-timeattack").addEventListener("click", () => {
      startTimeAttack(parseInt($("#ta-time").value, 10));
    });
    $("#start-survival").addEventListener("click", startSurvival);
    $("#quit-game").addEventListener("click", quitGame);
    $("#results-home").addEventListener("click", goHome);
    $("#results-retry").addEventListener("click", () => {
      if (typeof game.lastRetry === "function") game.lastRetry();
    });
    $("#rec-ta-time").addEventListener("change", renderTimeAttackRecords);
    $("#clear-records").addEventListener("click", () => {
      if (confirm(t("confirm_clear"))) {
        saveRecords(LS_TA, {});
        saveRecords(LS_SV, []);
        renderHomeRecords();
      }
    });

    // Selector de idioma: al cambiar, carga el archivo de preguntas correspondiente.
    $$("#lang-switch .lang-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        if (lang === LANG || game.mode) return; // no cambiar en mitad de una partida
        setLanguage(lang, false);
      });
    });

    LANG = loadSavedLang();
    setLanguage(LANG, true);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
