let answeredQuestions = new Set();
let totalQuestions = 0;
let timeinterval;
let globalscore = 0;

function updateProgressBar() {
    const progressText = document.getElementById("progress-text");
    const progressPercentage = document.getElementById("progress-percentage");
    const progressFill = document.getElementById("progress-fill");

    if (progressText && progressPercentage && progressFill) {
        const answered = answeredQuestions.size;
        const percentage = totalQuestions > 0 ? Math.round((answered / totalQuestions) * 100) : 0;
        progressText.textContent = `Progress: ${answered} / ${totalQuestions}`;
        progressPercentage.textContent = `${percentage}%`;
        progressFill.style.width = `${percentage}%`;
    }
}

function autoScrollToNext(currentIndex) {
    const nextIndex = currentIndex + 1;
    const nextQuestion = document.querySelector(`[data-question-index="${nextIndex}"]`);
    if (nextQuestion) {
        setTimeout(() => {
            nextQuestion.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }, 800);
    }
}

function updateGlobalScore(points) {
    const scoreElement = document.getElementById("scoree");
    if (scoreElement) {
        globalscore += points;
        scoreElement.textContent = globalscore;
    }
}

export function stopTimer() {
    clearInterval(timeinterval);
}

export function startTimer(questions) {
    let timeleft = 60;
    const timerElement = document.getElementById("timer");

    const updateTimerDisplay = () => {
        if (timerElement) timerElement.textContent = timeleft;
    };

    updateTimerDisplay();
    stopTimer();

    timeinterval = setInterval(() => {
        timeleft--;
        updateTimerDisplay();
        if (timeleft <= 0) {
            stopTimer();
            handleTimeUp(questions);
        }
    }, 1000);
}


function handleTimeUp(questions) {
    document.querySelectorAll('input[type="radio"]').forEach((input) => {
        input.disabled = true;
    });
    document.querySelectorAll(".check-answer-btn").forEach((btn) => {
        btn.disabled = true;
    });
    calculateTotalScore(questions);
}


function renderQuestion(question, index, sectionId) {
    const sectionContainer = document.getElementById(sectionId);
    if (!sectionContainer) return;

    const questionElem = document.createElement("div");
    questionElem.classList.add("question-container");
    questionElem.setAttribute("data-question-index", index);

    const questionText = document.createElement("p");
    questionText.textContent = `${index + 1}. ${question.question}`;
    questionElem.appendChild(questionText);

    const ul = document.createElement("ul");
    ul.className = "option-container";
    question.options.forEach((option, optionIndex) => {
        const li = document.createElement("li");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `question-${index}`;
        input.value = option;
        input.id = `q${index}_option${optionIndex}`;
        
        const label = document.createElement("label");
        label.htmlFor = `q${index}_option${optionIndex}`;
        label.textContent = option;

        li.appendChild(input);
        li.appendChild(label);
        ul.appendChild(li);
    });
    questionElem.appendChild(ul);

    const checkBtn = document.createElement("button");
    checkBtn.className = "check-answer-btn";
    checkBtn.dataset.index = index;
    checkBtn.textContent = "Check Answer";
    questionElem.appendChild(checkBtn);

    const resultDiv = document.createElement("div");
    resultDiv.className = "result";
    resultDiv.id = `result-${index}`;
    questionElem.appendChild(resultDiv);

    sectionContainer.appendChild(questionElem);
};

export function renderQuestions(questions, sectionId) {
    const sectionContainer = document.getElementById(sectionId);
    if (!sectionContainer) return;

    totalQuestions = questions.length;
    sectionContainer.innerHTML = '';
    answeredQuestions.clear();
    globalscore = 0;
    updateGlobalScore(0);

    questions.forEach((q, index) => renderQuestion(q, index, sectionId));

    const scoreElem = document.createElement("div");
    scoreElem.classList.add("score-container");
    scoreElem.innerHTML = `
      <h2>Quiz Complete!</h2>
      <div id="total-score" style="margin-top: 15px; font-weight: bold; font-size: 1.2rem;"></div>
      <div style="display: flex; justify-content: center; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 1rem;">
        <button id="calculate-score-btn" class="submit-btn">Show Final Score</button>
        <a href="contact.html" id="feedback-btn" class="submit-btn" style="background-color: var(--text-muted); text-decoration:none;">Feedback / Report</a>
      </div>`;
    sectionContainer.appendChild(scoreElem);

    updateProgressBar();
};

export function checkAnswer(questions, index) {
    const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
    const resultContainer = document.getElementById(`result-${index}`);
    const questionContainer = document.querySelector(`[data-question-index="${index}"]`);
    const button = document.querySelector(`button[data-index="${index}"]`);

    if (answeredQuestions.has(index)) return;

    if (!selectedOption) {
        resultContainer.textContent = "Please select an answer.";
        resultContainer.className = "result info";
        return;
    }

    answeredQuestions.add(index);
    questionContainer.classList.add("answered");
    button.classList.add("answered");
    button.textContent = "✓ Answered";
    button.disabled = true;

    if (selectedOption.value === questions[index].answer) {
        resultContainer.textContent = "✅ Correct!";
        resultContainer.className = "result correct";
        updateGlobalScore(1);
    } else {
        resultContainer.textContent = `❌ Wrong! Correct answer: ${questions[index].answer}`;
        resultContainer.className = "result wrong";
    }

    updateProgressBar();
    autoScrollToNext(index);
};


export function calculateTotalScore(questions) {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });

    const totalScoreContainer = document.getElementById("total-score");
    if(totalScoreContainer){
        totalScoreContainer.textContent = `Your final score is: ${score} out of ${questions.length}`;
        totalScoreContainer.style.color = score > questions.length / 2 ? "var(--success-color)" : "var(--danger-color)";
    }
};