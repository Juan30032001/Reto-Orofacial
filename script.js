const questions = [
  {
    category: "Conceptos", art: "i-face",
    question: "¿Qué tienen en común la disquinesia y la distonía orofacial?",
    hint: "Piensa en qué característica comparten estos trastornos del movimiento.",
    answers: ["Afectan el control de músculos de la cara y la boca", "Son enfermedades exclusivas de los dientes", "Siempre se deben a una infección bucal"],
    correct: 0,
    explanation: "Ambas son trastornos del movimiento y pueden afectar músculos de la cara, la boca, la lengua y la mandíbula."
  },
  {
    category: "Diferencias", art: "i-face",
    question: "¿Cuál describe mejor la disquinesia orofacial?",
    hint: "Recuerda la palabra clave: movimientos repetitivos.",
    answers: ["Una postura fija de la mandíbula por una contracción", "Movimientos involuntarios, repetitivos e irregulares", "El hábito voluntario de apretar los dientes"],
    correct: 1,
    explanation: "La disquinesia suele producir movimientos repetitivos e irregulares, como fruncir los labios, sacar la lengua o simular la masticación."
  },
  {
    category: "Diferencias", art: "i-jaw",
    question: "¿Qué puede ocurrir en la distonía orofacial?",
    hint: "Piensa en las contracciones musculares y las posturas.",
    answers: ["La mandíbula o la boca puede quedar en una postura anormal", "Los dientes se mueven de forma independiente", "Solo aparecen movimientos voluntarios al comer"],
    correct: 0,
    explanation: "Las contracciones involuntarias de la distonía pueden abrir o cerrar la mandíbula y mantener posturas anormales."
  },
  {
    category: "Causas", art: "i-brain",
    question: "¿Cuál puede relacionarse con disquinesia, especialmente tras uso prolongado?",
    hint: "Considera los antecedentes y los medicamentos.",
    answers: ["El uso de ciertos medicamentos", "El cepillado dental diario", "La sensibilidad al frío en los dientes"],
    correct: 0,
    explanation: "Algunos medicamentos, incluidos ciertos fármacos usados para tratar problemas psiquiátricos, pueden relacionarse con disquinesia. No se deben suspender sin consultar al profesional que los indicó."
  },
  {
    category: "Señales", art: "i-face",
    question: "¿Cuál es un ejemplo de movimiento que puede aparecer en la disquinesia?",
    hint: "Imagina movimientos involuntarios de labios, lengua o mandíbula.",
    answers: ["Fruncir los labios o hacer movimientos como masticar sin comer", "Tener una caries sin dolor", "Apretar los dientes solo durante el sueño"],
    correct: 0,
    explanation: "Los movimientos pueden incluir gestos repetitivos de labios, sacar la lengua o simular la masticación, y pueden aparecer y desaparecer."
  },
  {
    category: "Diagnóstico", art: "i-brain",
    question: "¿Quién suele evaluar estos trastornos y qué puede revisar?",
    hint: "El diagnóstico se basa en valoración clínica, no solo en una prueba.",
    answers: ["Un odontólogo por radiografía exclusivamente", "Un médico, generalmente neurólogo, con historia clínica y examen", "Cualquier persona observando un video"],
    correct: 1,
    explanation: "El médico, generalmente un neurólogo, puede observar los movimientos, revisar la historia clínica y realizar un examen neurológico. En algunos casos se usa electromiografía."
  },
  {
    category: "Tratamiento", art: "i-jaw",
    question: "¿Qué afirmación sobre el tratamiento es correcta?",
    hint: "El plan depende de la causa y de cada persona.",
    answers: ["Siempre es igual para ambas condiciones", "Debe indicarlo un profesional según cada caso", "La persona debe dejar sus medicamentos por su cuenta"],
    correct: 1,
    explanation: "El tratamiento depende de la causa y la gravedad. Puede incluir medicamentos, seguimiento, terapia y, para algunas distonías, toxina botulínica indicada por un profesional."
  },
  {
    category: "En odontología", art: "i-toothbig",
    question: "¿Por qué es importante reconocer estos trastornos en odontología?",
    hint: "Piensa en las funciones necesarias durante una consulta dental.",
    answers: ["Pueden dificultar mantener la boca abierta y algunos procedimientos", "Evitan que se necesite conocer los antecedentes", "Solo afectan el color del esmalte"],
    correct: 0,
    explanation: "Los movimientos involuntarios pueden dificultar la apertura de la boca, la masticación o la deglución, y requieren adaptar la atención y coordinarse con otros profesionales."
  },
  {
    category: "En odontología", art: "i-toothbig",
    question: "¿Qué funciones pueden verse afectadas por estos trastornos?",
    hint: "Son funciones cotidianas que involucran boca y mandíbula.",
    answers: ["Hablar, comer, masticar y tragar", "Ver, oír y respirar únicamente", "Crecer el cabello y mover las manos"],
    correct: 0,
    explanation: "Los movimientos involuntarios o las contracciones pueden afectar el habla, la alimentación, la masticación y la deglución."
  },
  {
    category: "Diferencias", art: "i-jaw",
    question: "¿La distonía orofacial y el bruxismo son lo mismo?",
    hint: "Compara una contracción involuntaria neurológica con apretar o rechinar dientes.",
    answers: ["Sí, ambos significan rechinar los dientes", "No; el bruxismo es apretar o rechinar, la distonía causa contracciones involuntarias", "Sí, ambos son infecciones de la mandíbula"],
    correct: 1,
    explanation: "No son lo mismo. El bruxismo consiste en apretar o rechinar los dientes; la distonía es un trastorno del movimiento con contracciones musculares involuntarias."
  }
];

const leaderboardStorageKey = "reto-orofacial-leaderboard-v1";
const state = { current: 0, score: 0, answered: false, playerName: "" };
const views = {
  welcome: document.getElementById("welcome-view"),
  game: document.getElementById("game-view"),
  result: document.getElementById("result-view")
};
const answerLetters = ["A", "B", "C"];

function showView(name) {
  Object.entries(views).forEach(([key, view]) => {
    view.classList.toggle("active", key === name);
    view.setAttribute("aria-hidden", key !== name ? "true" : "false");
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function beginGame() {
  state.current = 0;
  state.score = 0;
  state.answered = false;
  document.getElementById("score").textContent = "0";
  document.getElementById("game-kicker").textContent = `¡Hola, ${state.playerName}!`;
  showView("game");
  renderQuestion();
}

function renderQuestion() {
  const question = questions[state.current];
  state.answered = false;
  document.getElementById("category").textContent = question.category;
  document.getElementById("q-number").textContent = `PREGUNTA ${String(state.current + 1).padStart(2, "0")}`;
  document.getElementById("question-title").textContent = question.question;
  document.getElementById("question-hint").textContent = question.hint;
  document.getElementById("question-art").innerHTML = `<svg><use href="#${question.art}"/></svg>`;
  document.getElementById("progress-label").textContent = `Pregunta ${state.current + 1} de ${questions.length}`;
  document.getElementById("progress-percent").textContent = `${Math.round((state.current / questions.length) * 100)}%`;
  document.getElementById("progress-fill").style.width = `${(state.current / questions.length) * 100}%`;
  document.querySelector('[role="progressbar"]').setAttribute("aria-valuenow", state.current);
  document.getElementById("feedback").className = "feedback";
  document.getElementById("next-button").disabled = true;
  document.getElementById("next-button").innerHTML = state.current === questions.length - 1
    ? 'Ver resultado <svg aria-hidden="true"><use href="#i-arrow"/></svg>'
    : 'Siguiente <svg aria-hidden="true"><use href="#i-arrow"/></svg>';

  const answerContainer = document.getElementById("answers");
  answerContainer.replaceChildren();
  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.innerHTML = `<span class="answer-letter">${answerLetters[index]}</span><span class="answer-text"></span><svg class="answer-mark" aria-hidden="true"></svg>`;
    button.querySelector(".answer-text").textContent = answer;
    button.addEventListener("click", () => chooseAnswer(index));
    answerContainer.appendChild(button);
  });
}

function chooseAnswer(selectedIndex) {
  if (state.answered) return;
  state.answered = true;
  const question = questions[state.current];
  const isCorrect = selectedIndex === question.correct;
  const buttons = [...document.querySelectorAll(".answer")];
  buttons.forEach((button, index) => {
    button.disabled = true;
    const mark = button.querySelector(".answer-mark");
    if (index === question.correct) {
      button.classList.add("correct");
      mark.innerHTML = '<use href="#i-check"/>';
    } else if (index === selectedIndex) {
      button.classList.add("incorrect");
      mark.innerHTML = '<use href="#i-cross"/>';
    }
  });

  if (isCorrect) {
    state.score += 1;
    document.getElementById("score").textContent = String(state.score);
  }

  const feedback = document.getElementById("feedback");
  feedback.className = `feedback visible ${isCorrect ? "good" : "try"}`;
  document.getElementById("feedback-icon").innerHTML = `<use href="${isCorrect ? "#i-check" : "#i-spark"}"/>`;
  document.getElementById("feedback-title").textContent = isCorrect ? "¡Correcto!" : "Repasa este concepto";
  document.getElementById("feedback-copy").textContent = question.explanation;
  document.getElementById("next-button").disabled = false;
}

function renderLeaderboard(entries) {
  const list = document.getElementById("leaderboard-list");
  list.replaceChildren();

  if (entries.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "leaderboard-empty";
    emptyItem.textContent = "Todavía no hay puntajes guardados.";
    list.appendChild(emptyItem);
    return;
  }

  entries.forEach((entry, index) => {
    const item = document.createElement("li");
    const rank = document.createElement("span");
    rank.className = "leaderboard-rank";
    rank.textContent = `${index + 1}.`;
    const name = document.createElement("span");
    name.className = "leaderboard-name";
    name.textContent = entry.name;
    const score = document.createElement("strong");
    score.className = "leaderboard-score";
    score.textContent = `${entry.score}/10`;
    item.append(rank, name, score);
    list.appendChild(item);
  });
}

function savePlayerScore() {
  const status = document.getElementById("leaderboard-status");
  let entries;
  try {
    const saved = window.localStorage.getItem(leaderboardStorageKey);
    entries = saved ? JSON.parse(saved) : [];
    if (!Array.isArray(entries) || !entries.every((entry) =>
      entry && typeof entry.name === "string" && entry.name.trim().length > 0 &&
      Number.isInteger(entry.score) && entry.score >= 0 && entry.score <= questions.length
    )) {
      throw new TypeError("El formato guardado no es válido.");
    }
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof TypeError || error instanceof DOMException) {
      renderLeaderboard([]);
      status.textContent = "No se pudo leer la tabla guardada en este dispositivo.";
      return;
    }
    throw error;
  }

  const playerKey = state.playerName.toLocaleLowerCase("es");
  const playerIndex = entries.findIndex((entry) => entry.name.toLocaleLowerCase("es") === playerKey);
  if (playerIndex === -1) {
    entries.push({ name: state.playerName, score: state.score });
  } else if (state.score >= entries[playerIndex].score) {
    entries[playerIndex] = { name: state.playerName, score: state.score };
  }

  entries.sort((first, second) =>
    second.score - first.score || first.name.localeCompare(second.name, "es", { sensitivity: "base" })
  );

  try {
    window.localStorage.setItem(leaderboardStorageKey, JSON.stringify(entries));
  } catch (error) {
    if (error instanceof DOMException) {
      renderLeaderboard(entries);
      status.textContent = "No se pudo guardar el puntaje en este dispositivo.";
      return;
    }
    throw error;
  }

  renderLeaderboard(entries);
  status.textContent = "Se muestra la mejor puntuación de cada nombre, guardada en este dispositivo.";
}

function nextQuestion() {
  if (!state.answered) return;
  if (state.current < questions.length - 1) {
    state.current += 1;
    renderQuestion();
    document.getElementById("question-title").focus({ preventScroll: true });
    return;
  }
  showResults();
}

function showResults() {
  const ratio = state.score / questions.length;
  const title = ratio === 1 ? "¡Excelente!" : ratio >= .7 ? "¡Buen trabajo!" : "¡Sigue practicando!";
  const copy = ratio === 1
    ? "Dominaste las diferencias clave y su importancia para una atención odontológica segura."
    : ratio >= .7
      ? "Tienes una buena base. Repasa las explicaciones para afianzar los conceptos que faltaron."
      : "Cada intento ayuda a aprender. Recuerda: disquinesia son movimientos repetitivos; distonía, contracciones que pueden sostener posturas.";
  document.getElementById("result-title").textContent = title;
  document.getElementById("result-copy").textContent = copy;
  document.getElementById("final-score").textContent = `${state.score}/${questions.length}`;
  document.getElementById("progress-fill").style.width = "100%";
  showView("result");
  savePlayerScore();
}

const playerNameInput = document.getElementById("player-name");
playerNameInput.addEventListener("input", () => playerNameInput.setCustomValidity(""));
document.getElementById("start-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const playerName = playerNameInput.value.trim();
  if (!playerName) {
    playerNameInput.setCustomValidity("Escribe tu nombre para comenzar.");
    playerNameInput.reportValidity();
    return;
  }
  playerNameInput.setCustomValidity("");
  state.playerName = playerName;
  beginGame();
});
document.getElementById("replay-button").addEventListener("click", beginGame);
document.getElementById("home-button").addEventListener("click", () => showView("welcome"));
document.getElementById("quit-button").addEventListener("click", () => showView("welcome"));
document.getElementById("next-button").addEventListener("click", nextQuestion);

renderLeaderboard([]);
