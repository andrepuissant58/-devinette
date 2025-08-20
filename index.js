const baseQuestions = [
  // Afrique
  { q: "Quelle est la capitale du Ghana ?", a: ["Accra", "Lomé", "Bamako"], correct: 0 },
  { q: "Quelle est la date d'indépendance du Sénégal ?", a: ["1960", "1958", "1965"], correct: 0 },
  { q: "Quelle est la capitale du Maroc ?", a: ["Rabat", "Casablanca", "Fès"], correct: 0 },
  { q: "Quelle est la date d'indépendance de l'Algérie ?", a: ["1962", "1954", "1970"], correct: 0 },

  // Europe
  { q: "Quelle est la capitale de l'Allemagne ?", a: ["Berlin", "Munich", "Francfort"], correct: 0 },
  { q: "Quelle est la date d'indépendance de la Grèce ?", a: ["1821", "1912", "1945"], correct: 0 },
  { q: "Quelle est la capitale de la France ?", a: ["Paris", "Lyon", "Marseille"], correct: 0 },
  { q: "Quelle est la date d'indépendance de la Norvège ?", a: ["1905", "1945", "1814"], correct: 0 },

  // Asie
  { q: "Quelle est la capitale du Japon ?", a: ["Tokyo", "Kyoto", "Osaka"], correct: 0 },
  { q: "Quelle est la date d'indépendance de l'Inde ?", a: ["1947", "1950", "1935"], correct: 0 },
  { q: "Quelle est la capitale de la Chine ?", a: ["Beijing", "Shanghai", "Hong Kong"], correct: 0 },
  { q: "Quelle est la date d'indépendance du Pakistan ?", a: ["1947", "1956", "1962"], correct: 0 }
];

const questions = Array.from({ length: 500 }, (_, i) => baseQuestions[i % baseQuestions.length]);

let currentStep = 0;
let score = 0;
let seconds = 0;
let isPaused = false;
let timerInterval;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const pauseBtn = document.getElementById("pause-btn");
const coinAnim = document.getElementById("coin-animation");

function updateScore() {
  scoreEl.textContent = `Score : ${score} 💰`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (!isPaused) {
      seconds++;
      const min = String(Math.floor(seconds / 60)).padStart(2, "0");
      const sec = String(seconds % 60).padStart(2, "0");
      timerEl.textContent = `Temps : ${min}:${sec}`;
    }
  }, 1000);
}

function showQuestion() {
  const q = questions[currentStep];
  questionEl.textContent = `Étape ${currentStep + 1} : ${q.q}`;
  answersEl.innerHTML = "";
  q.a.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = `${String.fromCharCode(65 + i)} - ${ans}`;
    btn.onclick = () => handleAnswer(i);
    answersEl.appendChild(btn);
  });
  feedbackEl.textContent = "";
  nextBtn.disabled = true;
}

function handleAnswer(index) {
  const q = questions[currentStep];
  if (index === q.correct) {
    score += 10;
    feedbackEl.textContent = "✅ Bonne réponse ! +10 pièces";
    animateCoins();
  } else {
    feedbackEl.textContent = `❌ Mauvaise réponse. La bonne était : ${q.a[q.correct]}`;
  }
  updateScore();
  nextBtn.disabled = false;
}

function animateCoins() {
  coinAnim.style.animation = "coin 1s ease-out";
  coinAnim.style.opacity = "1";
  setTimeout(() => {
    coinAnim.style.animation = "none";
    coinAnim.style.opacity = "0";
  }, 1000);
}

function nextQuestion() {
  currentStep++;
  if (currentStep < questions.length) {
    showQuestion();
  } else {
    questionEl.textContent = "🎉 Félicitations ! Tu as terminé les 500 étapes.";
    answersEl.innerHTML = "";
    feedbackEl.textContent = "";
    nextBtn.disabled = true;
    clearInterval(timerInterval);
  }
}

startBtn.onclick = () => {
  currentStep = 0;
  score = 0;
  seconds = 0;
  isPaused = false;
  updateScore();
  showQuestion();
  clearInterval(timerInterval);
  startTimer();
};

nextBtn.onclick = nextQuestion;

pauseBtn.onclick = () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "Reprendre" : "Pause";
};
