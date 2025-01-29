const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris"
    },
    {
        question: "Who developed JavaScript?",
        answers: ["Brendan Eich", "Guido van Rossum", "James Gosling", "Dennis Ritchie"],
        correct: "Brendan Eich"
    },
    {
        question: "Which is the largest planet in our Solar System?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Jupiter"
    },
    {
        question: "Which programming language is primarily used for web development?",
        answers: ["Java", "C#", "JavaScript", "Python"],
        correct: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        answers: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correct: "Cascading Style Sheets"
    },
    {
        question: "Who is the founder of Microsoft?",
        answers: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"],
        correct: "Bill Gates"
    },
    {
        question: "What is the boiling point of water?",
        answers: ["90°C", "100°C", "110°C", "120°C"],
        correct: "100°C"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Venus", "Jupiter"],
        correct: "Mars"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Homer"],
        correct: "William Shakespeare"
    },
    {
        question: "What is the speed of light?",
        answers: ["300,000 km/s", "150,000 km/s", "100,000 km/s", "50,000 km/s"],
        correct: "300,000 km/s"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const timerText = document.getElementById("time");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");
    nextBtn.disabled = true;
    loadQuestion();
}

function loadQuestion() {
    resetTimer();
    nextBtn.disabled = true;
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    answerButtons.innerHTML = "";
    
    currentQuestion.answers.forEach(answer => {
        const li = document.createElement("li");
        li.innerText = answer;
        li.addEventListener("click", () => checkAnswer(answer, li));
        answerButtons.appendChild(li);
    });

    startTimer();
}

function checkAnswer(answer, button) {
    let correctAnswer = questions[currentQuestionIndex].correct;
    if (answer === correctAnswer) {
        button.style.background = "green";
        score++;
    } else {
        button.style.background = "red";
    }

    document.querySelectorAll("#answer-buttons li").forEach(btn => btn.style.pointerEvents = "none");
    nextBtn.disabled = false;
}

function startTimer() {
    timeLeft = 15;
    timerText.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerText.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.querySelectorAll("#answer-buttons li").forEach(btn => btn.style.pointerEvents = "none");
            nextBtn.disabled = false;
            // Automatically move to the next question when time runs out
            setTimeout(() => {
                nextBtn.click();
            }, 500);
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        endQuiz();
    }
});

function endQuiz() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreText.innerText = `You scored ${score} out of ${questions.length}`;
}

restartBtn.addEventListener("click", startQuiz);

startQuiz();
