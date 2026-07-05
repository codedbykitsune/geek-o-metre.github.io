// All questions stay inside this array.
const questions = [
  {
    category: "Web Development",
    question: "Aşağidakilerden hangisi bir programlama dili değildir?",
    answers: [
      "Python",
      "JavaScript",
      "HTML",
      "C#"
    ],
    correctAnswer: "HTML",
    explanation:
      "HTML bir işaretleme dilidir. Bir web sayfasinin yapisini oluşturur."
  },
  {
    category: "Kitaplar",
    question:
      "42 sayisinin 'hayat, evren ve her şeyin cevabi' olmasi hangi esere dayanir?",
    answers: [
      "Dune",
      "Otostopçunun Galaksi Rehberi",
      "Vakif",
      "1984"
    ],
    correctAnswer: "Otostopçunun Galaksi Rehberi",
    explanation:
      "Douglas Adams'in eserinde süper bilgisayar Deep Thought bu cevabi verir."
  },
  {
    category: "Uzay",
    question: "Güneş Sistemi'ndeki en büyük gezegen hangisidir?",
    answers: [
      "Satürn",
      "Jüpiter",
      "Neptün",
      "Dünya"
    ],
    correctAnswer: "Jüpiter",
    explanation:
      "Jüpiter, Güneş Sistemi'ndeki en büyük ve en kütleli gezegendir."
  },
  {
    category: "Diziler",
    question:
      "Doctor Who dizisindeki TARDIS dişaridan genellikle neye benzer?",
    answers: [
      "Mavi bir polis kulübesine",
      "Kirmizi bir telefon kulübesine",
      "Eski bir trene",
      "Metal bir kapsüle"
    ],
    correctAnswer: "Mavi bir polis kulübesine",
    explanation:
      "TARDIS'in diş görünüşü, 1960'larda kullanilan mavi İngiliz polis kulübesi şeklinde sabitlenmiştir."
  },
  {
    category: "İnternet",
    question: "İnternette 404 hata kodu genel olarak ne anlama gelir?",
    answers: [
      "Sayfa bulunamadi",
      "Şifre yanliş",
      "İnternet tamamen kesildi",
      "Bilgisayar kapandi"
    ],
    correctAnswer: "Sayfa bulunamadi",
    explanation:
      "404, sunucunun istenen sayfayi veya kaynaği bulamadiğini belirtir."
  },
  {
    category: "Oyun Kültürü",
    question: "NPC kisaltmasinin açilimi nedir?",
    answers: [
      "New Player Controller",
      "Non-Player Character",
      "Network Play Character",
      "Next Player Command"
    ],
    correctAnswer: "Non-Player Character",
    explanation:
      "NPC, oyuncu tarafindan doğrudan kontrol edilmeyen karakter anlamina gelir."
  },
  {
    category: "Genel Kültür",
    question: "Aşağidakilerden hangisi gerçek bir hayvan değildir?",
    answers: [
      "Aksolotl",
      "Narval",
      "Ornitorenk",
      "Grifon"
    ],
    correctAnswer: "Grifon",
    explanation:
      "Grifon, kartal ve aslan özelliklerini birleştiren mitolojik bir yaratiktir."
  },
  {
    category: "Hayvanlar",
    question: "Bir ahtapotun kaç kalbi vardir?",
    answers: [
      "Bir",
      "İki",
      "Üç",
      "Sekiz"
    ],
    correctAnswer: "Üç",
    explanation:
      "Ahtapotlarin iki solungaç kalbi ve bir ana dolaşim kalbi bulunur."
  },
  {
    category: "Fantastik Dünyalar",
    question:
      "Yüzüklerin Efendisi evreninde Tek Yüzük nerede yok edilebilir?",
    answers: [
      "Ayrikvadi'de",
      "Miğfer Dibi'nde",
      "Hüküm Daği'nda",
      "Moria'da"
    ],
    correctAnswer: "Hüküm Daği'nda",
    explanation:
      "Tek Yüzük, yapildiği yer olan Mordor'daki Hüküm Daği'nin ateşinde yok edilebilir."
  },
  {
    category: "Web Development",
    question: "CSS temel olarak ne için kullanilir?",
    answers: [
      "Web sayfasinin görünümünü düzenlemek için",
      "Veritabani oluşturmak için",
      "E-posta göndermek için",
      "Bilgisayari yeniden başlatmak için"
    ],
    correctAnswer: "Web sayfasinin görünümünü düzenlemek için",
    explanation:
      "CSS; renk, yazi tipi, boşluk, boyut ve sayfa düzeni gibi görsel özellikleri kontrol eder."
  }
];

// Get the HTML elements once.
// This keeps the rest of the code cleaner.
const startScreen = document.querySelector("#start-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");

const startButton = document.querySelector("#start-button");
const nextButton = document.querySelector("#next-button");
const restartButton = document.querySelector("#restart-button");

const scoreElement = document.querySelector("#score");
const questionCounter = document.querySelector("#question-counter");
const questionCategory = document.querySelector("#question-category");
const questionText = document.querySelector("#question-text");
const answerButtonsContainer = document.querySelector("#answer-buttons");

const timerElement = document.querySelector("#timer");
const timeLeftElement = document.querySelector("#time-left");

const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector("#progress-bar");

const feedbackBox = document.querySelector("#feedback-box");
const feedbackTitle = document.querySelector("#feedback-title");
const feedbackExplanation = document.querySelector(
  "#feedback-explanation"
);

const resultIcon = document.querySelector("#result-icon");
const resultTitle = document.querySelector("#result-title");
const resultMessage = document.querySelector("#result-message");

const correctAnswerCount = document.querySelector(
  "#correct-answer-count"
);

const finalScore = document.querySelector("#final-score");
const successRate = document.querySelector("#success-rate");

// Quiz settings
const QUESTION_TIME = 15;
const POINTS_PER_QUESTION = 10;

// Quiz state
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let timeLeft = QUESTION_TIME;
let timerId = null;
let questionAnswered = false;

// Start the quiz when the user clicks the button.
startButton.addEventListener("click", startQuiz);

// Go to the next question.
nextButton.addEventListener("click", handleNextQuestion);

// Restart the complete quiz.
restartButton.addEventListener("click", startQuiz);

function startQuiz() {
  // Stop an old timer before starting a new game.
  clearInterval(timerId);

  currentQuestionIndex = 0;
  score = 0;
  correctAnswers = 0;
  questionAnswered = false;

  // Create a new shuffled array.
  // Do not change the original questions array.
  shuffledQuestions = shuffleArray([...questions]);

  scoreElement.textContent = score;

  showScreen(quizScreen);
  showQuestion();
}

function showScreen(screenToShow) {
  // Hide every screen first.
  startScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");

  // Show only the selected screen.
  screenToShow.classList.remove("hidden");
}

function showQuestion() {
  resetQuestionState();

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  questionCounter.textContent =
    `Soru ${currentQuestionIndex + 1} / ${shuffledQuestions.length}`;

  questionCategory.textContent = currentQuestion.category;
  questionText.textContent = currentQuestion.question;

  updateProgressBar();

  // Shuffle the answer choices too.
  const shuffledAnswers = shuffleArray([
    ...currentQuestion.answers
  ]);

  const answerLetters = ["A", "B", "C", "D"];

  shuffledAnswers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-button";

    // Save the answer on the button.
    // This makes checking the answer easier.
    button.dataset.answer = answer;

    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.textContent = answerLetters[index];

    const answerText = document.createElement("span");
    answerText.textContent = answer;

    button.append(letter, answerText);

    button.addEventListener("click", selectAnswer);

    answerButtonsContainer.appendChild(button);
  });

  startTimer();
}

function resetQuestionState() {
  clearInterval(timerId);

  questionAnswered = false;
  timeLeft = QUESTION_TIME;

  timeLeftElement.textContent = timeLeft;
  timerElement.classList.remove("warning");

  // The user cannot continue before answering.
  nextButton.disabled = true;
  nextButton.textContent = "Sonraki Soru";

  feedbackBox.className = "feedback-box hidden";
  feedbackTitle.textContent = "";
  feedbackExplanation.textContent = "";

  // Remove old answer buttons before adding new ones.
  answerButtonsContainer.replaceChildren();
}

function startTimer() {
  clearInterval(timerId);

  timeLeft = QUESTION_TIME;
  timeLeftElement.textContent = timeLeft;

  timerId = setInterval(() => {
    timeLeft -= 1;
    timeLeftElement.textContent = timeLeft;

    // Add a warning effect during the last 5 seconds.
    if (timeLeft <= 5) {
      timerElement.classList.add("warning");
    }

    if (timeLeft <= 0) {
      clearInterval(timerId);
      handleTimeOut();
    }
  }, 1000);
}

function selectAnswer(event) {
  // Do not allow two answers for the same question.
  if (questionAnswered) {
    return;
  }

  questionAnswered = true;
  clearInterval(timerId);

  const selectedButton = event.currentTarget;
  const selectedAnswer = selectedButton.dataset.answer;

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const isCorrect =
    selectedAnswer === currentQuestion.correctAnswer;

  if (isCorrect) {
    score += POINTS_PER_QUESTION;
    correctAnswers += 1;

    selectedButton.classList.add("correct");

    showFeedback(
      "correct",
      "Doğru cevap!",
      currentQuestion.explanation
    );
  } else {
    selectedButton.classList.add("wrong");

    showFeedback(
      "wrong",
      "Yanliş cevap.",
      `Doğru cevap: ${currentQuestion.correctAnswer}. ${currentQuestion.explanation}`
    );
  }

  scoreElement.textContent = score;

  revealCorrectAnswer(currentQuestion.correctAnswer);
  disableAnswerButtons();

  // The next button becomes active only after an answer.
  nextButton.disabled = false;

  updateNextButtonText();
}

function handleTimeOut() {
  // The time-out counts as an answered question.
  // This lets the user continue after the timer ends.
  if (questionAnswered) {
    return;
  }

  questionAnswered = true;

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  revealCorrectAnswer(currentQuestion.correctAnswer);
  disableAnswerButtons();

  showFeedback(
    "timeout",
    "Süre doldu.",
    `Doğru cevap: ${currentQuestion.correctAnswer}. ${currentQuestion.explanation}`
  );

  nextButton.disabled = false;

  updateNextButtonText();
}

function revealCorrectAnswer(correctAnswer) {
  const answerButtons = document.querySelectorAll(
    ".answer-button"
  );

  answerButtons.forEach((button) => {
    if (button.dataset.answer === correctAnswer) {
      button.classList.add("correct");
    }
  });
}

function disableAnswerButtons() {
  const answerButtons = document.querySelectorAll(
    ".answer-button"
  );

  answerButtons.forEach((button) => {
    button.disabled = true;
  });
}

function showFeedback(type, title, explanation) {
  feedbackBox.className = "feedback-box";

  if (type === "correct") {
    feedbackBox.classList.add("correct-feedback");
  } else if (type === "wrong") {
    feedbackBox.classList.add("wrong-feedback");
  } else {
    feedbackBox.classList.add("timeout-feedback");
  }

  feedbackTitle.textContent = title;
  feedbackExplanation.textContent = explanation;
}

function updateNextButtonText() {
  const isLastQuestion =
    currentQuestionIndex === shuffledQuestions.length - 1;

  nextButton.textContent = isLastQuestion
    ? "Sonucu Gör"
    : "Sonraki Soru";
}

function handleNextQuestion() {
  // This check is still useful even though the button is disabled.
  if (!questionAnswered) {
    return;
  }

  currentQuestionIndex += 1;

  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function updateProgressBar() {
  const progress =
    ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

  progressBar.style.width = `${progress}%`;

  progressContainer.setAttribute(
    "aria-valuenow",
    Math.round(progress)
  );
}

function showResults() {
  clearInterval(timerId);

  showScreen(resultScreen);

  const totalQuestions = shuffledQuestions.length;
  const rate = Math.round(
    (correctAnswers / totalQuestions) * 100
  );

  correctAnswerCount.textContent =
    `${correctAnswers} / ${totalQuestions}`;

  finalScore.textContent =
    `${score} / ${totalQuestions * POINTS_PER_QUESTION}`;

  successRate.textContent = `%${rate}`;

  const result = getResultLevel(correctAnswers);

  resultIcon.textContent = result.icon;
  resultTitle.textContent = result.title;
  resultMessage.textContent = result.message;
}

function getResultLevel(answerCount) {
  if (answerCount <= 2) {
    return {
      icon: "🧩",
      title: "Merak Yeni Başliyor",
      message:
        "Bazi cevaplar kaçti ama artik başlangiç noktan belli."
    };
  }

  if (answerCount <= 5) {
    return {
      icon: "🔍",
      title: "Merakli Gezgin",
      message:
        "Popüler kültür ve genel bilgi radarin çalişiyor. Bazi sinyaller kaybolmuş olabilir ama temel sistem gayet sağlam."
    };
  }

  if (answerCount <= 8) {
    return {
      icon: "🧠",
      title: "Bilgi Avcisi",
      message:
        "Detaylari fark ediyor, bağlantilari hizli kuruyorsun. Günlük hayatta gerekmeyen bilgileri saklama konusunda etkileyici derecede başarilisin."
    };
  }

  return {
    icon: "🌌",
    title: "Kozmik Arşivci",
    message:
      "Bilimden fantastik dünyalara kadar arşivin oldukça geniş. Beyninde kaç sekme açik olduğunu bilmiyoruz ama şimdilik sistem çökmedi."
  };
}

function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm.
  // It gives every item a fair chance.
  for (let index = array.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1)
    );

    [array[index], array[randomIndex]] = [
      array[randomIndex],
      array[index]
    ];
  }

  return array;
}