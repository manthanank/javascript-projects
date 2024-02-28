// script.js
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const submitButton = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');

let currentQuestionIndex = 0;
let score = 0;

loadQuestion();

function loadQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionContainer.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => {
      selectAnswer(answer.correct);
    });
    answerButtons.appendChild(button);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  submitButton.style.display = 'block';
  resultContainer.style.display = 'none';
}

function selectAnswer(correct) {
  if (correct) {
    score++;
  }
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.innerText = `Quiz completed! Your score is ${score}/${questions.length}`;
  submitButton.style.display = 'none';
  resultContainer.style.display = 'block';
  resultText.innerText = `Your score is ${score}/${questions.length}`;
}
