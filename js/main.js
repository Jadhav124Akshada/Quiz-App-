import { quizData } from './questions.js';
import { renderQuestions, checkAnswer, calculateTotalScore, startTimer, stopTimer } from './quiz-engine.js';

const themeToggleBtn = document.getElementById('theme-toggle-btn');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

themeToggleBtn?.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const pagePath = window.location.pathname;

    if (pagePath.includes("quiz.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const topic = urlParams.get('topic');
        const quiz = quizData[topic];
        const quizTitleEl = document.getElementById("quiz-title");

        if (quiz) {
            if(quizTitleEl) quizTitleEl.textContent = quiz.title;
            renderQuestions(quiz.questions, "quiz-section");

            document.getElementById("quiz-section").addEventListener("click", (event) => {
                 if (event.target.classList.contains("check-answer-btn")) {
                    const index = parseInt(event.target.dataset.index, 10);
                    checkAnswer(quiz.questions, index);
                }
            });

            document.getElementById("calculate-score-btn")?.addEventListener("click", () => {
                stopTimer();
                calculateTotalScore(quiz.questions);
            });
            
            startTimer(quiz.questions);

        } else {
            if(quizTitleEl) quizTitleEl.textContent = "Quiz not found!";
        }
        
        const restartBtn = document.getElementById("restartQuizBtn");
        if (restartBtn) {
            restartBtn.addEventListener("click", () => {
                if (confirm("Are you sure you want to restart the quiz? All progress will be lost.")) {
                    window.location.reload();
                }
            });
        }
    }

    if (pagePath.includes("contact.html")) {
        const reasonSelect = document.getElementById("reason");
        const feedbackSection = document.getElementById("feedback-Section");
        const issueSection = document.getElementById("issue-Section");
        const contactForm = document.getElementById("contact-Form");

        function toggleFormSections() {
            if (!reasonSelect) return;
            const selectedReason = reasonSelect.value;
            feedbackSection.style.display = selectedReason === "feedback" ? "block" : "none";
            issueSection.style.display = selectedReason === "issue" ? "block" : "none";
        }

        if (contactForm) {
            toggleFormSections();
            reasonSelect.addEventListener("change", toggleFormSections);
            contactForm.addEventListener("submit", (e) => {
                e.preventDefault();
                sessionStorage.setItem("formSubmissionSuccess", "Thank you! Your submission has been received.");
                window.location.href = "index.html";
            });
        }
    }

    if (pagePath.includes("index.html") || pagePath === '/') {
        const submissionMessageDiv = document.getElementById("submission-message");
        const message = sessionStorage.getItem("formSubmissionSuccess");
        if (submissionMessageDiv && message) {
            submissionMessageDiv.textContent = message;
            submissionMessageDiv.className = "result correct";
            sessionStorage.removeItem("formSubmissionSuccess");
        }
    }
});