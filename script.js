const questions = [
    {
        question: "Jakim słowem kluczowym deklarujemy funkcję w Kotlinie?",
        answers: [
            { text: "function", correct: false },
            { text: "void", correct: false },
            { text: "fun", correct: true },
            { text: "def", correct: false }
        ]
    },
    {
        question: "Jak określamy typ zwracany przez funkcję?",
        answers: [
            { text: "Po dwukropku za nawiasami", correct: true },
            { text: "Przed słowem fun", correct: false },
            { text: "Wewnątrz nawiasów", correct: false },
            { text: "Kotlin nie obsługuje typów", correct: false }
        ]
    },
    {
        question: "Co to jest funkcja 'Single-expression'?",
        answers: [
            { text: "Funkcja bez nazwy", correct: false },
            { text: "Funkcja zwracająca wynik znakiem '='", correct: true },
            { text: "Funkcja, która ma tylko jeden parametr", correct: false },
            { text: "Funkcja typu private", correct: false }
        ]
    },
    {
        question: "Który parametr jest poprawnie zdefiniowany?",
        answers: [
            { text: "String name", correct: false },
            { text: "name: String", correct: true },
            { text: "val name: String", correct: false },
            { text: "String: name", correct: false }
        ]
    }
];

const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const questionContainer = document.getElementById('question-container');
const scoreSpan = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('quiz-btn');
        button.addEventListener('click', () => selectAnswer(answer.correct));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(isCorrect) {
    if (isCorrect) score++;
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreSpan.innerText = score;
}

restartBtn.addEventListener('click', startQuiz);

// Inicjalizacja
startQuiz();