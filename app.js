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

      study_title: "Modo Estudio",
      study_desc: "Repasa todas las preguntas con su respuesta correcta y justificación, agrupadas por tema.",
      study_heading: "Modo Estudio · Todas las preguntas",
      study_back: "← Menú",
      study_correct: "Respuesta correcta",
      study_count: n => `${n} preguntas`,
      study_expand: "Expandir todo",
      study_collapse: "Contraer todo",

      exam_title: "Simulacro de Examen",
      exam_desc: "4 de 6 escenarios al azar · 60 preguntas · aprobar 720/1000",
      exam_cta_badge: "Lo más parecido al real",
      exam_btn_official: "Oficial · 2 h",
      exam_btn_practice: "Práctica · 90 min",
      exam_dur_official: "2 h",
      exam_dur_practice: "90 min",
      exam_records_title: "🎓 Récords · Examen",
      exam_records_sub: "Mejor puntaje sobre 1000",
      exam_rec_empty: "Aún no rendiste el simulacro. ¡Pruébalo!",
      exam_passed: "Aprobado",
      exam_failed: "No aprobado",
      exam_view_summary: "ver resumen ›",
      exam_rec_sub: (c, tot) => `${c}/${tot} correctas`,
      exam_progress: (i, n, ans) => `Pregunta ${i} de ${n} · ${ans} respondidas`,
      exam_prev: "← Anterior",
      exam_next: "Siguiente →",
      exam_mark: "⚑ Marcar",
      exam_marked: "⚑ Marcada",
      exam_submit: "Finalizar examen",
      exam_legend_answered: "respondida",
      exam_legend_pending: "sin responder",
      exam_legend_marked: "marcada",
      exam_confirm_quit: "¿Salir del examen? Se perderá el progreso.",
      exam_confirm_submit_all: "¿Finalizar el examen y ver tu resultado?",
      exam_confirm_submit_pending: n => `Te quedan ${n} preguntas sin responder (contarán como incorrectas). ¿Finalizar de todos modos?`,
      exam_pass_title: "🎉 ¡Aprobado!",
      exam_fail_title: "Examen no aprobado",
      exam_verdict_pass: "APROBADO",
      exam_verdict_fail: "NO APROBADO",
      exam_of_1000: "/ 1000",
      exam_passmark: "Corte para aprobar: 720 / 1000",
      exam_stat_correct: "Correctas",
      exam_stat_accuracy: "Precisión",
      exam_stat_time: "Tiempo",
      exam_breakdown_title: "Desglose por escenario",
      exam_review_title: "Repaso completo",
      exam_review_ok: "Correcta",
      exam_review_no: "Incorrecta",
      exam_no_answer: "(sin responder)",
      exam_new: "Nuevo examen",
      exam_timeup_note: "⏱️ Se acabó el tiempo · envío automático",

      qid_base: "base",
      qid_variant: "variante",
      qid_title: "Identificador de la pregunta · mismo nº Q = par casi idéntico",

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

      study_title: "Study Mode",
      study_desc: "Review all questions with their correct answer and justification, grouped by topic.",
      study_heading: "Study Mode · All questions",
      study_back: "← Menu",
      study_correct: "Correct answer",
      study_count: n => `${n} questions`,
      study_expand: "Expand all",
      study_collapse: "Collapse all",

      exam_title: "Exam Simulation",
      exam_desc: "4 of 6 random scenarios · 60 questions · pass 720/1000",
      exam_cta_badge: "Closest to the real thing",
      exam_btn_official: "Official · 2 h",
      exam_btn_practice: "Practice · 90 min",
      exam_dur_official: "2 h",
      exam_dur_practice: "90 min",
      exam_records_title: "🎓 Records · Exam",
      exam_records_sub: "Best score out of 1000",
      exam_rec_empty: "You haven't taken the simulation yet. Try it!",
      exam_passed: "Passed",
      exam_failed: "Not passed",
      exam_view_summary: "view summary ›",
      exam_rec_sub: (c, tot) => `${c}/${tot} correct`,
      exam_progress: (i, n, ans) => `Question ${i} of ${n} · ${ans} answered`,
      exam_prev: "← Previous",
      exam_next: "Next →",
      exam_mark: "⚑ Flag",
      exam_marked: "⚑ Flagged",
      exam_submit: "Finish exam",
      exam_legend_answered: "answered",
      exam_legend_pending: "unanswered",
      exam_legend_marked: "flagged",
      exam_confirm_quit: "Leave the exam? Your progress will be lost.",
      exam_confirm_submit_all: "Finish the exam and see your result?",
      exam_confirm_submit_pending: n => `You have ${n} unanswered questions (they will count as incorrect). Finish anyway?`,
      exam_pass_title: "🎉 Passed!",
      exam_fail_title: "Exam not passed",
      exam_verdict_pass: "PASSED",
      exam_verdict_fail: "NOT PASSED",
      exam_of_1000: "/ 1000",
      exam_passmark: "Passing score: 720 / 1000",
      exam_stat_correct: "Correct",
      exam_stat_accuracy: "Accuracy",
      exam_stat_time: "Time",
      exam_breakdown_title: "Scenario breakdown",
      exam_review_title: "Full review",
      exam_review_ok: "Correct",
      exam_review_no: "Incorrect",
      exam_no_answer: "(unanswered)",
      exam_new: "New exam",
      exam_timeup_note: "⏱️ Time's up · auto-submitted",

      qid_base: "base",
      qid_variant: "variant",
      qid_title: "Question identifier · same Q# = near-duplicate pair",

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
  const LS_EX = "cca_records_ex";   // récords examen
  const LS_LANG = "cca_lang";
  const MAX_RECORDS = 10;

  // Parámetros del simulacro de examen (fieles al CCA-F: 4 de 6 escenarios, corte 720/1000).
  const EXAM_SCENARIOS = 4;         // escenarios elegidos al azar de los disponibles
  const EXAM_PER_SCENARIO = 15;     // 4 escenarios x 15 = 60 preguntas (igual que el examen real)
  const EXAM_MIN_OFFICIAL = 120;    // examen oficial: 2 horas
  const EXAM_MIN_PRACTICE = 90;     // examen de práctica: 90 minutos
  const EXAM_PASS = 720;            // puntaje de aprobación sobre 1000

  // Estado global de idioma / datos.
  let LANG = "es";
  let QUESTIONS = [];
  let TOPIC_BY_ID = {};
  let QUESTION_BY_ID = {};   // id -> pregunta (en el idioma actual)
  let TOPICS = [];           // lista de temas en orden (idioma actual)

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

  function examDurLabel(mins) {
    if (mins === EXAM_MIN_OFFICIAL) return t("exam_dur_official");
    if (mins === EXAM_MIN_PRACTICE) return t("exam_dur_practice");
    return mins ? mins + " min" : "";
  }

  // Insignia con el identificador de la pregunta (para localizar y depurar duplicados).
  // El nº "Q<sourceOrder>" es común a una pregunta base y su variante reformulada.
  function qIdBadge(q) {
    if (!q) return "";
    const s = (q.sourceOrder != null) ? q.sourceOrder : (q.order != null ? q.order : "?");
    const kind = q.variant ? t("qid_variant") : t("qid_base");
    const cls = q.variant ? "qid-key is-variant" : "qid-key";
    return `<span class="qid" title="${t("qid_title")}">`
      + `<span class="${cls}">Q${s} · ${kind}</span>`
      + `<span class="qid-val">${escapeHtml(q.id)}</span></span>`;
  }

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

  // Examen: [ {scaled, passed, correct, total, ts} ]
  function addExamRecord(entry) {
    const list = loadRecords(LS_EX) || [];
    list.push(entry);
    list.sort((a, b) => b.scaled - a.scaled || a.ts - b.ts);
    const trimmed = list.slice(0, MAX_RECORDS);
    saveRecords(LS_EX, trimmed);
    return trimmed[0] === entry;
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
      QUESTION_BY_ID = {};
      TOPICS = bank.topics || [];
      TOPICS.forEach(tp => { TOPIC_BY_ID[tp.id] = tp.title; });
      QUESTIONS.forEach(q => { QUESTION_BY_ID[q.id] = q; });

      // Remapear el estado en curso a los objetos del nuevo idioma
      // (los ids son idénticos entre idiomas).
      remapGameToLanguage();
      remapExamToLanguage();

      applyStaticI18n();
      updateLangButtons();
      updateSubtitle();
      relabelDurationOptions();
      renderHomeRecords();
      if (initial) showScreen("screen-home");
      else refreshActiveScreen();
    }).catch(err => {
      console.error(err);
      $(".mode-grid").innerHTML = '<p style="color:var(--bad)">' + t("load_error") + "</p>";
    });
  }

  function updateLangButtons() {
    $$(".lang-btn").forEach(b => b.classList.toggle("active", b.dataset.lang === LANG));
  }

  function updateSubtitle() {
    $("#subtitle").textContent = t("subtitle", QUESTIONS.length);
  }

  // Reapunta las referencias de preguntas al idioma actual (por id).
  function remapGameToLanguage() {
    const byId = id => QUESTION_BY_ID[id] || null;
    if (game.current) game.current = byId(game.current.id) || game.current;
    if (game.queue && game.queue.length) {
      game.queue = game.queue.map(q => byId(q.id) || q);
    }
    if (game.failures && game.failures.length) {
      game.failures = game.failures.map(f => ({ q: byId(f.q.id) || f.q, chosenKey: f.chosenKey }));
    }
  }

  // Vuelve a dibujar la pantalla activa tras un cambio de idioma.
  function refreshActiveScreen() {
    const active = document.querySelector(".screen.active");
    if (!active) return;
    if (active.id === "screen-game") {
      if (game.awaitingRetry) renderSurvivalFeedback(true);
      else if (game.current && !game.locked) renderQuestion();
    } else if (active.id === "screen-results") {
      renderResults();
    } else if (active.id === "screen-study") {
      renderStudy();
    } else if (active.id === "screen-exam") {
      if (exam.questions.length) { renderExamQuestion(); renderExamPalette(); }
    } else if (active.id === "screen-exam-results") {
      renderExamResults();
    }
    // La pantalla de menú ya se actualiza dentro de setLanguage().
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
    // estado para re-render al cambiar idioma en cualquier momento:
    awaitingRetry: false,   // true mientras se muestra el feedback de fallo (supervivencia)
    feedbackData: null,     // { chosenKey, timeMs, isRecord, streak }
    resultsData: null,      // { kind:'ta'|'sv', ... } para la pantalla de resultados
  };

  // Estado del simulacro de examen (navegación libre, sin feedback inmediato).
  const exam = {
    running: false, submitted: false,
    questions: [], optionOrder: [], answers: [], marked: [],
    index: 0, scenarios: [], startTime: 0, endTime: 0, intId: null,
    resultData: null, recordView: null, durationMin: 0,
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

    $("#q-id").innerHTML = qIdBadge(q);
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
    game.awaitingRetry = false; game.feedbackData = null; game.resultsData = null;
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

    game.resultsData = {
      kind: "ta", duration: game.duration, answered: game.answered,
      correct: game.correct, accuracy, isRecord,
    };
    game.mode = null;
    game.lastRetry = () => startTimeAttack(game.resultsData.duration);
    renderResults();
    showScreen("screen-results");
  }

  /* ============================================================
     MODO 2 · SUPERVIVENCIA
     ============================================================ */
  function startSurvival() {
    stopTimers();
    game.mode = "survival";
    game.streak = 0; game.lastId = null; game.locked = false;
    game.awaitingRetry = false; game.feedbackData = null; game.resultsData = null;
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
    const isRecord = addSurvivalRecord({ streak: game.streak, timeMs, cleared: false, ts: Date.now() });

    game.awaitingRetry = true;
    game.feedbackData = { chosenKey, timeMs, isRecord, streak: game.streak };
    renderSurvivalFeedback(false); // onAnswer ya resaltó las opciones en su lugar
    updateGameStatus();
  }

  // Redibuja el enunciado y las opciones en estado "revelado" (respuesta correcta
  // y elección marcadas, deshabilitadas). Se usa al cambiar idioma tras un fallo.
  function renderRevealedQuestion(q, chosenKey) {
    $("#q-id").innerHTML = qIdBadge(q);
    $("#q-topic").textContent = topicOf(q);
    const scenEl = $("#q-scenario");
    const scen = q.scenario && q.scenario.body;
    if (scen) { scenEl.textContent = scen; scenEl.hidden = false; } else { scenEl.hidden = true; }
    $("#q-prompt").textContent = q.prompt;
    const opts = $("#q-options");
    opts.innerHTML = "";
    const correctKey = q.answer.correctOptionKey;
    q.options.forEach(o => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.disabled = true;
      btn.dataset.key = o.key;
      if (o.key === correctKey) btn.classList.add("correct");
      else if (o.key === chosenKey) btn.classList.add("wrong");
      btn.innerHTML = `<span class="option-key">${o.key}</span><span class="option-text"></span>`;
      btn.querySelector(".option-text").textContent = o.text;
      opts.appendChild(btn);
    });
  }

  // Dibuja el panel de fallo (se puede re-dibujar al cambiar idioma, sin re-registrar).
  function renderSurvivalFeedback(rebuildQuestion) {
    const q = game.current;
    const d = game.feedbackData;
    if (!q || !d) return;
    if (rebuildQuestion) renderRevealedQuestion(q, d.chosenKey);
    const correctKey = q.answer.correctOptionKey;
    const chosenText = (q.options.find(o => o.key === d.chosenKey) || {}).text || "";
    const correctText = (q.options.find(o => o.key === correctKey) || {}).text || "";

    const fb = $("#feedback");
    fb.className = "feedback bad";
    fb.hidden = false;
    fb.innerHTML = `
      <div class="feedback-head">${t("fb_fail_head", d.streak)}</div>
      <div class="feedback-line">${t("fb_you_chose")} <span class="tag-key bad">${d.chosenKey}</span> — ${escapeHtml(chosenText)}</div>
      <div class="feedback-line">${t("fb_correct")} <span class="tag-key good">${correctKey}</span> — ${escapeHtml(correctText)}</div>
      <div class="feedback-just"><strong>${t("fb_why")}</strong> ${escapeHtml(q.answer.justification)}</div>
      <div class="feedback-line" style="margin-top:10px;">${t("fb_streak_time", fmtClock(d.timeMs))}${d.isRecord ? ' · <span style="color:var(--gold)">' + t("fb_new_streak_record") + '</span>' : ''}</div>
      <div class="feedback-actions">
        <button class="btn btn-primary" id="fb-retry">${t("fb_retry")}</button>
        <button class="btn-ghost" id="fb-quit">${t("fb_quit")}</button>
      </div>`;
    $("#fb-retry").addEventListener("click", startSurvival);
    $("#fb-quit").addEventListener("click", goHome);
  }

  function survivalWin() {
    stopTimers();
    const timeMs = Date.now() - game.startTime;
    const isRecord = addSurvivalRecord({ streak: game.streak, timeMs, cleared: true, ts: Date.now() });

    game.resultsData = { kind: "sv", streak: game.streak, timeMs, isRecord };
    game.mode = null;
    game.lastRetry = startSurvival;
    renderResults();
    showScreen("screen-results");
  }

  // Dibuja la pantalla de resultados desde game.resultsData (re-dibujable por idioma).
  function renderResults() {
    const r = game.resultsData;
    if (!r) return;
    const recEl = $("#results-record");
    if (r.kind === "ta") {
      $("#results-title").textContent = t("ta_results_title");
      $("#results-summary").innerHTML = `
        <div class="stat"><div class="stat-value accent">${r.answered}</div><div class="stat-label">${t("stat_answered")}</div></div>
        <div class="stat"><div class="stat-value">${r.correct}</div><div class="stat-label">${t("stat_correct")}</div></div>
        <div class="stat"><div class="stat-value">${r.accuracy}%</div><div class="stat-label">${t("stat_accuracy")}</div></div>`;
      recEl.hidden = !r.isRecord;
      recEl.textContent = t("ta_record", r.duration, r.answered);
      $("#review-heading").textContent = t("failed_heading", game.failures.length);
      renderReview(game.failures);
    } else {
      $("#results-title").textContent = t("sv_win_title");
      $("#results-summary").innerHTML = `
        <div class="stat"><div class="stat-value gold">${r.streak}</div><div class="stat-label">${t("stat_perfect_streak")}</div></div>
        <div class="stat"><div class="stat-value accent">${fmtClock(r.timeMs)}</div><div class="stat-label">${t("stat_total_time")}</div></div>`;
      recEl.hidden = !r.isRecord;
      recEl.textContent = t("sv_record");
      $("#review-heading").textContent = t("review_label");
      $("#results-review").innerHTML = `<div class="review-empty">${t("sv_win_empty", QUESTIONS.length)}</div>`;
    }
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
        <div class="qid-wrap">${qIdBadge(q)}</div>
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
    if (exam.running) examTick();
  });

  /* ============================================================
     MODO ESTUDIO · todas las preguntas agrupadas por tema
     ============================================================ */
  function studyGroups() {
    // Usa el orden de TOPICS; agrega al final cualquier tema no listado.
    const seen = {};
    const groups = [];
    (TOPICS || []).forEach(tp => {
      const qs = QUESTIONS.filter(q => q.topicId === tp.id);
      if (qs.length) { groups.push({ id: tp.id, title: tp.title, qs }); seen[tp.id] = true; }
    });
    QUESTIONS.forEach(q => {
      if (seen[q.topicId]) return;
      seen[q.topicId] = true;
      groups.push({
        id: q.topicId,
        title: topicOf(q),
        qs: QUESTIONS.filter(x => x.topicId === q.topicId),
      });
    });
    return groups;
  }

  function buildStudyCard(q, num) {
    const correctKey = q.answer.correctOptionKey;
    const card = document.createElement("article");
    card.className = "study-q";
    const optsHtml = q.options.map(o => {
      const isC = o.key === correctKey;
      return `
        <div class="study-opt ${isC ? "correct" : ""}">
          <span class="option-key ${isC ? "good" : ""}">${o.key}</span>
          <span class="option-text">${escapeHtml(o.text)}</span>
          ${isC ? `<span class="study-badge">✓ ${t("study_correct")}</span>` : ""}
        </div>`;
    }).join("");
    card.innerHTML = `
      <div class="qid-wrap">${qIdBadge(q)}</div>
      <div class="study-q-prompt"><span class="study-q-num">${num}</span>${escapeHtml(q.prompt)}</div>`;
    card.innerHTML += `
      <div class="study-opts">${optsHtml}</div>
      <div class="study-just"><strong>${t("fb_why")}</strong> ${escapeHtml(q.answer.justification)}</div>`;
    return card;
  }

  function renderStudy() {
    const index = $("#study-index");
    const content = $("#study-content");
    index.innerHTML = "";
    content.innerHTML = "";

    studyGroups().forEach((g, gi) => {
      const secId = "study-topic-" + gi;

      const chip = document.createElement("a");
      chip.className = "study-chip";
      chip.href = "#" + secId;
      chip.textContent = `${g.title} (${g.qs.length})`;
      index.appendChild(chip);

      const sec = document.createElement("section");
      sec.className = "study-topic";
      sec.id = secId;

      const header = document.createElement("button");
      header.className = "study-topic-header";
      header.innerHTML = `
        <span class="chev">▾</span>
        <span class="study-topic-title">${escapeHtml(g.title)}</span>
        <span class="study-topic-count">${t("study_count", g.qs.length)}</span>`;
      header.addEventListener("click", () => sec.classList.toggle("collapsed"));
      sec.appendChild(header);

      const body = document.createElement("div");
      body.className = "study-topic-body";

      const scen = g.qs[0] && g.qs[0].scenario && g.qs[0].scenario.body;
      if (scen) {
        const s = document.createElement("div");
        s.className = "study-scenario";
        s.textContent = scen;
        body.appendChild(s);
      }

      g.qs.forEach((q, qi) => body.appendChild(buildStudyCard(q, qi + 1)));
      sec.appendChild(body);
      content.appendChild(sec);
    });
  }

  function openStudy() {
    renderStudy();
    showScreen("screen-study");
  }

  function setAllStudyCollapsed(collapsed) {
    $$("#study-content .study-topic").forEach(s => s.classList.toggle("collapsed", collapsed));
  }

  /* ============================================================
     MODO EXAMEN · simulacro fiel al CCA-F
     4 de 6 escenarios al azar, navegación libre, sin feedback
     inmediato, temporizado, puntaje /1000 con corte en 720.
     ============================================================ */
  function stopExamTimer() {
    if (exam.intId) { clearInterval(exam.intId); exam.intId = null; }
  }

  function startExam(minutes) {
    stopTimers();
    stopExamTimer();
    game.mode = null;
    const mins = minutes || exam.durationMin || EXAM_MIN_OFFICIAL;

    const topicIds = (TOPICS || []).map(tp => tp.id)
      .filter(id => QUESTIONS.some(q => q.topicId === id));
    const chosen = shuffle(topicIds).slice(0, Math.min(EXAM_SCENARIOS, topicIds.length));

    let qs = [];
    chosen.forEach(tid => {
      const pool = shuffle(QUESTIONS.filter(q => q.topicId === tid));
      qs = qs.concat(pool.slice(0, EXAM_PER_SCENARIO));
    });
    qs = shuffle(qs);

    exam.questions = qs;
    // Orden de opciones fijo por pregunta (no rebaraja al navegar ni al cambiar idioma).
    exam.optionOrder = qs.map(q => shuffle(q.options).map(o => o.key));
    exam.answers = qs.map(() => null);
    exam.marked = qs.map(() => false);
    exam.index = 0;
    exam.scenarios = chosen;
    exam.submitted = false;
    exam.running = true;
    exam.resultData = null;
    exam.recordView = null;
    exam.durationMin = mins;
    exam.startTime = Date.now();
    exam.endTime = Date.now() + mins * 60 * 1000;

    showScreen("screen-exam");
    examTick();
    exam.intId = setInterval(examTick, 250);
    renderExamQuestion();
    renderExamPalette();
  }

  function examTick() {
    const remaining = exam.endTime - Date.now();
    const el = $("#exam-timer");
    el.textContent = fmtClock(remaining);
    el.classList.toggle("warn", remaining <= 300000 && remaining > 60000);
    el.classList.toggle("danger", remaining <= 60000);
    if (remaining <= 0) { el.textContent = "00:00"; submitExam(true); }
  }

  function examAnsweredCount() {
    return exam.answers.filter(a => a !== null).length;
  }

  function updateExamProgress() {
    $("#exam-progress-info").textContent =
      t("exam_progress", exam.index + 1, exam.questions.length, examAnsweredCount());
  }

  function renderExamQuestion() {
    const i = exam.index;
    const q = exam.questions[i];
    if (!q) return;

    $("#exam-id").innerHTML = qIdBadge(q);
    $("#exam-topic").textContent = topicOf(q);
    const scenEl = $("#exam-scenario");
    const scen = q.scenario && q.scenario.body;
    if (scen) { scenEl.textContent = scen; scenEl.hidden = false; } else { scenEl.hidden = true; }
    $("#exam-prompt").textContent = q.prompt;

    const opts = $("#exam-options");
    opts.innerHTML = "";
    const order = exam.optionOrder[i] || q.options.map(o => o.key);
    order.forEach(key => {
      const o = q.options.find(x => x.key === key);
      if (!o) return;
      const btn = document.createElement("button");
      btn.className = "option" + (exam.answers[i] === key ? " selected" : "");
      btn.dataset.key = key;
      btn.innerHTML = `<span class="option-key">${key}</span><span class="option-text"></span>`;
      btn.querySelector(".option-text").textContent = o.text;
      btn.addEventListener("click", () => selectExamAnswer(key));
      opts.appendChild(btn);
    });

    $("#exam-prev").disabled = i === 0;
    $("#exam-next").disabled = i === exam.questions.length - 1;
    const markBtn = $("#exam-mark");
    markBtn.classList.toggle("marked", !!exam.marked[i]);
    markBtn.textContent = exam.marked[i] ? t("exam_marked") : t("exam_mark");

    updateExamProgress();
  }

  function selectExamAnswer(key) {
    exam.answers[exam.index] = key;
    $$("#exam-options .option").forEach(b => b.classList.toggle("selected", b.dataset.key === key));
    renderExamPalette();
    updateExamProgress();
  }

  function renderExamPalette() {
    const wrap = $("#exam-palette");
    wrap.innerHTML = "";
    exam.questions.forEach((q, idx) => {
      const b = document.createElement("button");
      b.className = "pal-btn"
        + (exam.answers[idx] ? " answered" : "")
        + (idx === exam.index ? " current" : "")
        + (exam.marked[idx] ? " marked" : "");
      b.textContent = idx + 1;
      b.addEventListener("click", () => examGoto(idx));
      wrap.appendChild(b);
    });
  }

  function examGoto(idx) {
    if (idx < 0 || idx >= exam.questions.length) return;
    exam.index = idx;
    renderExamQuestion();
    renderExamPalette();
  }

  function toggleExamMark() {
    exam.marked[exam.index] = !exam.marked[exam.index];
    renderExamQuestion();
    renderExamPalette();
  }

  function submitExam(auto) {
    if (!auto) {
      const pending = exam.answers.filter(a => a === null).length;
      const msg = pending > 0 ? t("exam_confirm_submit_pending", pending) : t("exam_confirm_submit_all");
      if (!confirm(msg)) return;
    }
    stopExamTimer();
    exam.running = false;
    exam.submitted = true;

    const total = exam.questions.length;
    let correct = 0;
    exam.questions.forEach((q, idx) => {
      if (exam.answers[idx] === q.answer.correctOptionKey) correct++;
    });
    const timeMs = Date.now() - exam.startTime;
    const scaled = total ? Math.round(100 + 900 * (correct / total)) : 0;
    const passed = scaled >= EXAM_PASS;

    exam.resultData = { total, correct, scaled, passed, timeMs, durationMin: exam.durationMin, autoSubmitted: !!auto };
    exam.recordView = null; // resultados en vivo (se re-traducen al cambiar idioma)

    // Snapshot autocontenido para poder reabrir este resultado desde los récords.
    const items = exam.questions.map((q, idx) => ({
      id: q.id, sourceOrder: q.sourceOrder, variant: q.variant, topicId: q.topicId,
      topicTitle: topicOf(q), prompt: q.prompt,
      options: q.options.map(o => ({ key: o.key, text: o.text })),
      correctKey: q.answer.correctOptionKey, justification: q.answer.justification,
      chosen: exam.answers[idx],
    }));
    addExamRecord({
      scaled, passed, correct, total, durationMin: exam.durationMin, ts: Date.now(),
      detail: { timeMs, autoSubmitted: !!auto, scenarios: exam.scenarios.slice(), items },
    });

    renderExamResults();
    showScreen("screen-exam-results");
  }

  // Normaliza el examen en vivo a la misma forma que un snapshot guardado.
  function liveExamData() {
    const r = exam.resultData || {};
    const items = exam.questions.map((q, idx) => ({
      id: q.id, sourceOrder: q.sourceOrder, variant: q.variant, topicId: q.topicId,
      topicTitle: topicOf(q), prompt: q.prompt,
      options: q.options.map(o => ({ key: o.key, text: o.text })),
      correctKey: q.answer.correctOptionKey, justification: q.answer.justification,
      chosen: exam.answers[idx],
    }));
    return {
      meta: {
        scaled: r.scaled, passed: r.passed, correct: r.correct, total: r.total,
        timeMs: r.timeMs, durationMin: r.durationMin, autoSubmitted: r.autoSubmitted,
        scenarios: exam.scenarios,
      },
      items,
    };
  }

  // Dispatcher: en vivo (re-traducible por idioma) o desde un récord guardado.
  function renderExamResults() {
    const d = exam.recordView || liveExamData();
    if (!d || !d.meta) return;
    paintExamResults(d.meta, d.items || []);
  }

  // Pinta la pantalla de resultados a partir de {meta, items} (fuente única).
  function paintExamResults(meta, items) {
    $("#exam-result-title").textContent = meta.passed ? t("exam_pass_title") : t("exam_fail_title");

    const card = $("#exam-score-card");
    card.className = "exam-score-card " + (meta.passed ? "pass" : "fail");
    const markPct = ((EXAM_PASS - 100) / 900 * 100).toFixed(1);
    const fillPct = Math.max(0, Math.min(100, (meta.scaled - 100) / 900 * 100)).toFixed(1);
    const note = meta.autoSubmitted ? `<div class="exam-passmark">${t("exam_timeup_note")}</div>` : "";
    card.innerHTML = `
      <div><span class="exam-score-value">${meta.scaled}</span> <span class="exam-score-max">${t("exam_of_1000")}</span></div>
      <div class="exam-verdict">${meta.passed ? t("exam_verdict_pass") : t("exam_verdict_fail")}</div>
      <div class="exam-passmark">${t("exam_passmark")}${examDurLabel(meta.durationMin) ? " · " + examDurLabel(meta.durationMin) : ""}</div>
      <div class="exam-score-bar"><div class="exam-score-fill" style="width:${fillPct}%"></div><div class="exam-score-mark" style="left:${markPct}%"></div></div>
      ${note}`;

    const acc = meta.total ? Math.round(meta.correct / meta.total * 100) : 0;
    $("#exam-result-summary").innerHTML = `
      <div class="stat"><div class="stat-value ${meta.passed ? "" : "accent"}">${meta.correct}/${meta.total}</div><div class="stat-label">${t("exam_stat_correct")}</div></div>
      <div class="stat"><div class="stat-value">${acc}%</div><div class="stat-label">${t("exam_stat_accuracy")}</div></div>
      <div class="stat"><div class="stat-value accent">${fmtClock(meta.timeMs)}</div><div class="stat-label">${t("exam_stat_time")}</div></div>`;

    // Desglose por escenario.
    const order = (meta.scenarios && meta.scenarios.length)
      ? meta.scenarios : items.map(i => i.topicId).filter((v, i, a) => a.indexOf(v) === i);
    const bd = $("#exam-breakdown");
    bd.innerHTML = "";
    order.forEach(tid => {
      const rows = items.filter(i => i.topicId === tid);
      if (!rows.length) return;
      const tot = rows.length;
      const cor = rows.filter(i => i.chosen === i.correctKey).length;
      const pct = Math.round(cor / tot * 100);
      const title = rows[0].topicTitle || TOPIC_BY_ID[tid] || "";
      const row = document.createElement("div");
      row.className = "bd-row";
      row.innerHTML = `
        <div class="bd-name">${escapeHtml(title)}</div>
        <div class="bd-score">${cor}/${tot} · ${pct}%</div>
        <div class="bd-bar"><div class="bd-fill" style="width:${pct}%"></div></div>`;
      bd.appendChild(row);
    });

    // Repaso completo.
    const rev = $("#exam-review");
    rev.innerHTML = "";
    items.forEach((it, idx) => {
      const chosen = it.chosen;
      const ok = chosen === it.correctKey;
      const chosenText = chosen ? (it.options.find(o => o.key === chosen) || {}).text || "" : "";
      const correctText = (it.options.find(o => o.key === it.correctKey) || {}).text || "";
      const item = document.createElement("div");
      item.className = "review-item" + (ok ? " correct-item" : "");
      const yourLine = chosen
        ? `<span class="tag-key ${ok ? "good" : "bad"}">${chosen}</span> — ${escapeHtml(chosenText)}`
        : `<span class="muted">${t("exam_no_answer")}</span>`;
      item.innerHTML = `
        <div class="qid-wrap">${qIdBadge(it)}</div>
        <div class="review-topic">${escapeHtml(it.topicTitle || TOPIC_BY_ID[it.topicId] || "")} · #${idx + 1}<span class="review-badge ${ok ? "ok" : "no"}">${ok ? t("exam_review_ok") : t("exam_review_no")}</span></div>`;
      item.innerHTML += `
        <div class="review-prompt">${escapeHtml(it.prompt)}</div>
        <div class="review-line">${t("review_your_answer")} ${yourLine}</div>
        <div class="review-line">${t("fb_correct")} <span class="tag-key good">${it.correctKey}</span> — ${escapeHtml(correctText)}</div>
        <div class="review-just"><strong>${t("fb_why")}</strong> ${escapeHtml(it.justification)}</div>`;
      rev.appendChild(item);
    });
  }

  // Reabre el resumen de un examen desde su récord (snapshot autocontenido).
  function openExamRecord(e) {
    if (!e || !e.detail) return;
    stopTimers();
    stopExamTimer();
    exam.running = false;
    game.mode = null;
    exam.durationMin = e.durationMin;
    exam.recordView = {
      meta: {
        scaled: e.scaled, passed: e.passed, correct: e.correct, total: e.total,
        timeMs: e.detail.timeMs, durationMin: e.durationMin,
        autoSubmitted: e.detail.autoSubmitted, scenarios: e.detail.scenarios || [],
      },
      items: e.detail.items || [],
    };
    renderExamResults();
    showScreen("screen-exam-results");
  }

  // Reapunta las preguntas del examen al idioma actual (por id).
  function remapExamToLanguage() {
    if (exam.questions && exam.questions.length) {
      exam.questions = exam.questions.map(q => QUESTION_BY_ID[q.id] || q);
    }
  }

  function quitExam() {
    if (exam.running && !confirm(t("exam_confirm_quit"))) return;
    stopExamTimer();
    exam.running = false;
    goHome();
  }

  /* -------------------- navegación -------------------- */
  function goHome() {
    stopTimers();
    stopExamTimer();
    exam.running = false;
    exam.recordView = null;
    game.mode = null; game.locked = false;
    game.awaitingRetry = false; game.feedbackData = null;
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
    renderExamRecords();
  }

  function renderExamRecords() {
    const list = loadRecords(LS_EX) || [];
    const wrap = $("#records-exam");
    if (!wrap) return;
    wrap.innerHTML = "";
    if (!list.length) {
      wrap.innerHTML = `<div class="records-empty">${t("exam_rec_empty")}</div>`;
      return;
    }
    list.forEach((e, i) => {
      const dur = examDurLabel(e.durationMin) ? " · " + examDurLabel(e.durationMin) : "";
      const clickable = !!e.detail;
      const row = document.createElement("div");
      row.className = "record-row" + (i === 0 ? " top" : "") + (clickable ? " clickable" : "");
      row.innerHTML = `
        <div class="record-rank">${i === 0 ? "★" : i + 1}</div>
        <div>
          <div class="record-main">${e.scaled} / 1000 · ${e.passed ? "✅ " + t("exam_passed") : t("exam_failed")}</div>
          <div class="record-sub">${t("exam_rec_sub", e.correct, e.total)}${dur}${clickable ? ` · <span class="rec-cta">${t("exam_view_summary")}</span>` : ""}</div>
        </div>
        <div class="record-date">${fmtDate(e.ts)}</div>`;
      if (clickable) {
        row.title = t("exam_view_summary");
        row.addEventListener("click", () => openExamRecord(e));
      }
      wrap.appendChild(row);
    });
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
    $("#open-study").addEventListener("click", openStudy);
    $("#study-home").addEventListener("click", goHome);
    $("#study-expand").addEventListener("click", () => setAllStudyCollapsed(false));
    $("#study-collapse").addEventListener("click", () => setAllStudyCollapsed(true));

    $("#exam-start-official").addEventListener("click", () => startExam(EXAM_MIN_OFFICIAL));
    $("#exam-start-practice").addEventListener("click", () => startExam(EXAM_MIN_PRACTICE));
    $("#exam-quit").addEventListener("click", quitExam);
    $("#exam-prev").addEventListener("click", () => examGoto(exam.index - 1));
    $("#exam-next").addEventListener("click", () => examGoto(exam.index + 1));
    $("#exam-mark").addEventListener("click", toggleExamMark);
    $("#exam-submit").addEventListener("click", () => submitExam(false));
    $("#exam-retry").addEventListener("click", () => startExam(exam.durationMin));
    $("#exam-results-home").addEventListener("click", goHome);

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
        saveRecords(LS_EX, []);
        renderHomeRecords();
      }
    });

    // Selector de idioma (presente en todas las pantallas): al cambiar, carga el
    // archivo de preguntas correspondiente y re-dibuja lo que esté en pantalla.
    // Se puede cambiar en cualquier momento: menú, durante la partida o en resultados.
    $$(".lang-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        if (lang === LANG) return;
        setLanguage(lang, false);
      });
    });

    LANG = loadSavedLang();
    setLanguage(LANG, true);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
