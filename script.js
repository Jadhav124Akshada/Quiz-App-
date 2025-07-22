/**
 * script.js
 * This script handles all the logic for the dynamic quiz interface.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if on a quiz page or home page
    if (document.querySelector('.quiz-container')) {
        initializeQuiz();
    } else {
        console.log("On the home page.");
    }
});

// --- Global State ---
let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let showAnswerInstantly = true;

// --- DOM Elements ---
const quizTitleEl = document.getElementById('quiz-title');
const progressBarEl = document.getElementById('progress-bar');
const progressTextEl = document.getElementById('progress-text');
const questionsSliderEl = document.getElementById('questions-slider');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const finishBtn = document.getElementById('finish-btn');
const answerModeToggle = document.getElementById('answer-mode-toggle');
const answerModeLabel = document.getElementById('answer-mode-label');
const reportModalEl = document.getElementById('report-modal');
const closeModalEl = document.getElementById('close-modal');

/**
 * Initializes the quiz by loading data and setting up the UI.
 */
function initializeQuiz() {
    // Get quiz type from URL (e.g., ?q=html)
    const urlParams = new URLSearchParams(window.location.search);
    const quizType = urlParams.get('q');

    if (!quizType || !quizData[quizType]) {
        quizTitleEl.textContent = "Quiz not found!";
        return;
    }

    questions = quizData[quizType];
    userAnswers = new Array(questions.length).fill(null);
    const quizName = quizType.charAt(0).toUpperCase() + quizType.slice(1);
    quizTitleEl.textContent = `${quizName} Quiz`;

    renderQuestions();
    setupEventListeners();
    updateProgress();
}

/**
 * Renders all question slides into the slider.
 */
function renderQuestions() {
    questionsSliderEl.innerHTML = '';
    questions.forEach((q, index) => {
        const slide = document.createElement('div');
        slide.className = 'question-slide';
        slide.dataset.index = index;

        const optionsHTML = q.options.map(option => `
            <li data-option="${option}">${option}</li>
        `).join('');

        slide.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            <ul class="options-container">${optionsHTML}</ul>
            <div class="answer-feedback"></div>
        `;
        questionsSliderEl.appendChild(slide);
    });
}

/**
 * Sets up all necessary event listeners for the quiz.
 */
function setupEventListeners() {
    nextBtn.addEventListener('click', () => navigate(1));
    prevBtn.addEventListener('click', () => navigate(-1));
    finishBtn.addEventListener('click', showReport);

    questionsSliderEl.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            handleOptionSelect(e.target);
        }
    });

    answerModeToggle.addEventListener('change', (e) => {
        showAnswerInstantly = e.target.checked;
        answerModeLabel.textContent = showAnswerInstantly ? 'Instantly' : 'At End';
    });
    
    closeModalEl.addEventListener('click', () => reportModalEl.style.display = 'none');
}

/**
 * Handles navigation between questions.
 * @param {number} direction - 1 for next, -1 for previous.
 */
function navigate(direction) {
    const newIndex = currentQuestionIndex + direction;
    if (newIndex >= 0 && newIndex < questions.length) {
        currentQuestionIndex = newIndex;
        updateProgress();
    }
}

/**
 * Updates the progress bar, text, and navigation buttons.
 */
function updateProgress() {
    // Update slider position
    questionsSliderEl.style.transform = `translateX(-${currentQuestionIndex * 100}%)`;

    // Update progress bar and text
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBarEl.style.width = `${progressPercentage}%`;
    progressTextEl.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;

    // Update button states
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
    finishBtn.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
}

/**
 * Handles the logic when a user clicks on an answer option.
 * @param {HTMLElement} selectedLi - The list item element that was clicked.
 */
function handleOptionSelect(selectedLi) {
    const slide = selectedLi.closest('.question-slide');
    const questionIndex = parseInt(slide.dataset.index);
    const options = slide.querySelectorAll('.options-container li');

    // Prevent re-answering
    if (slide.querySelector('.selected')) return;

    userAnswers[questionIndex] = selectedLi.dataset.option;
    selectedLi.classList.add('selected');

    if (showAnswerInstantly) {
        checkAndRevealAnswer(slide, questionIndex);
    }
}

/**
 * Checks the selected answer and provides immediate feedback.
 * @param {HTMLElement} slide - The current question slide element.
 * @param {number} questionIndex - The index of the current question.
 */
function checkAndRevealAnswer(slide, questionIndex) {
    const correctAnswer = questions[questionIndex].answer;
    const userAnswer = userAnswers[questionIndex];
    const options = slide.querySelectorAll('.options-container li');
    const feedbackEl = slide.querySelector('.answer-feedback');

    options.forEach(li => {
        li.classList.add('disabled'); // Disable all options
        if (li.dataset.option === correctAnswer) {
            li.classList.add('correct');
        } else if (li.dataset.option === userAnswer) {
            li.classList.add('incorrect');
        }
    });

    if (userAnswer === correctAnswer) {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = '#28a745';
    } else {
        feedbackEl.textContent = `Correct answer: ${correctAnswer}`;
        feedbackEl.style.color = '#dc3545';
    }
}

/**
 * Generates and displays the final report modal.
 */
function showReport() {
    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;

    const reportDetailsEl = document.getElementById('report-details');
    reportDetailsEl.innerHTML = '';

    questions.forEach((q, index) => {
        const userAnswer = userAnswers[index];
        const reportItem = document.createElement('div');
        reportItem.className = 'report-item';
        let statusText;

        if (userAnswer === null) {
            skippedCount++;
            reportItem.classList.add('skipped');
            statusText = 'Skipped';
        } else if (userAnswer === q.answer) {
            correctCount++;
            reportItem.classList.add('correct');
            statusText = 'Correct';
        } else {
            incorrectCount++;
            reportItem.classList.add('incorrect');
            statusText = 'Incorrect';
        }
        
        reportItem.innerHTML = `
            <p><strong>${index + 1}. ${q.question}</strong></p>
            <p>Your answer: <span class="user-answer">${userAnswer || 'Not answered'}</span></p>
            ${userAnswer !== q.answer ? `<p>Correct answer: ${q.answer}</p>` : ''}
        `;
        reportDetailsEl.appendChild(reportItem);
    });

    const summaryEl = document.getElementById('report-summary');
    summaryEl.innerHTML = `
        <div class="correct"><span>${correctCount}</span> Correct</div>
        <div class="incorrect"><span>${incorrectCount}</span> Incorrect</div>
        <div class="skipped"><span>${skippedCount}</span> Skipped</div>
    `;

    reportModalEl.style.display = 'flex';
}
