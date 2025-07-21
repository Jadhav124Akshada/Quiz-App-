/* /quiz-app/quiz.js */
import quizzes from './questions.js';

// --- DOM ELEMENTS (for quiz.html) ---
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const quizTitle = document.getElementById('quiz-title');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const nextBtn = document.getElementById('next-btn');
const finalScore = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

// --- STATE VARIABLES ---
let currentQuizData = null;
let currentQuestionIndex = 0;
let score = 0;

/**
 * Reads the 'topic' from the URL query parameter to determine which quiz to load.
 */
function getTopicFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('topic');
}

/**
 * Initializes the quiz based on the topic from the URL.
 */
function init() {
    const topicKey = getTopicFromURL();
    
    // Check if the topic is valid and exists in our quizzes object
    if (topicKey && quizzes[topicKey]) {
        currentQuizData = quizzes[topicKey];
        startQuiz();
    } else {
        // Handle cases where the topic is invalid or not provided
        quizTitle.textContent = 'Quiz Not Found!';
        questionText.textContent = 'Please select a valid topic from the home page.';
        document.querySelector('.quiz-header .back-btn').style.display = 'block';
    }

    nextBtn.addEventListener('click', handleNextQuestion);
    restartBtn.addEventListener('click', () => {
        // Redirect back to the home page to choose another quiz
        window.location.href = 'index.html';
    });
}

/**
 * Starts the quiz, showing the first question.
 */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizScreen.classList.remove('hidden');
    endScreen.classList.add('hidden');
    showQuestion();
}

/**
 * Displays the current question, options, and updates the progress bar.
 */
function showQuestion() {
    resetState();
    const question = currentQuizData.questions[currentQuestionIndex];
    
    quizTitle.innerHTML = `<span class="icon">${currentQuizData.icon}</span> ${currentQuizData.title}`;
    questionText.textContent = `${currentQuestionIndex + 1}. ${question.question}`;

    question.options.forEach(optionText => {
        const optionElement = document.createElement('li');
        optionElement.className = 'option';
        optionElement.textContent = optionText;
        optionElement.addEventListener('click', () => handleOptionSelect(optionElement, optionText, question.answer));
        optionsContainer.appendChild(optionElement);
    });

    updateProgressBar();
}

/**
 * Resets the UI state for the next question.
 */
function resetState() {
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';
}

/**
 * Handles the logic when a user clicks an option.
 */
function handleOptionSelect(selectedOptionElement, selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
        selectedOptionElement.classList.add('correct');
    } else {
        selectedOptionElement.classList.add('incorrect');
        // Highlight the correct answer for the user
        Array.from(optionsContainer.children).forEach(option => {
            if (option.textContent === correctAnswer) {
                option.classList.add('correct');
            }
        });
    }

    // Disable all options after a selection is made
    Array.from(optionsContainer.children).forEach(option => {
        option.classList.add('disabled');
    });

    // Show the "Next" button, or "Show Results" on the last question
    if (currentQuestionIndex < currentQuizData.questions.length - 1) {
        nextBtn.textContent = 'Next Question →';
    } else {
        nextBtn.textContent = 'Show Results';
    }
    nextBtn.classList.remove('hidden');
}

/**
 * Handles the click of the "Next" or "Show Results" button.
 */
function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuizData.questions.length) {
        showQuestion();
    } else {
        showEndScreen();
    }
}

/**
 * Updates the visual progress bar.
 */
function updateProgressBar() {
    const progressPercent = ((currentQuestionIndex + 1) / currentQuizData.questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

/**
 * Hides the quiz and displays the final score screen.
 */
function showEndScreen() {
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    finalScore.textContent = `${score} / ${currentQuizData.questions.length}`;
}

// --- INITIALIZATION ---
// Start the application when the DOM is ready.
document.addEventListener('DOMContentLoaded', init);