// Quiz App Logic
const params = new URLSearchParams(window.location.search);
const topic = params.get('topic');
const quizTitle = document.getElementById('quiz-title');
const questionArea = document.getElementById('question-area');
const resultEl = document.getElementById('result');
const reviewArea = document.getElementById('review-area');
const submitModal = document.getElementById('submit-modal');
const submitSummary = document.getElementById('submit-summary');
const finalSubmitBtn = document.getElementById('final-submit-btn');
const cancelSubmitBtn = document.getElementById('cancel-submit-btn');
const exitBtn = document.getElementById('exit-btn');

const topicNames = {
  html: 'HTML', css: 'CSS', js: 'JavaScript', python: 'Python', cpp: 'C++', dbms: 'DBMS',
  react: 'React', nextjs: 'Next.js', git: 'Git & GitHub', dsa: 'DSA', django: 'Django'
};

let questions = [];
let current = 0;
let userAnswers = [];
let questionStatus = [];
let quizSubmitted = false;

function setQuizTitle() {
  quizTitle.textContent = topicNames[topic] ? `${topicNames[topic]} Quiz` : 'Quiz';
}

function loadQuestions() {
  // Show loading state
  questionArea.innerHTML = '<div style="text-align: center; padding: 2rem;">Loading questions...</div>';
  
  fetch(`../data/${topic}.json`)  // Updated path to correctly point to data directory
    .then(res => {
      if (!res.ok) {
        throw new Error(`Failed to load questions (${res.status} ${res.statusText})`);
      }
      return res.json();
    })
    .then(data => {
      if (!data || !data.questions || !Array.isArray(data.questions)) {
        throw new Error('Invalid question data format');
      }
      questions = data.questions;
      current = 0;
      userAnswers = Array(questions.length).fill(null);
      questionStatus = Array(questions.length).fill('not-visited');
      showQuestion();
      resultEl.textContent = '';
      reviewArea.style.display = 'none';
      renderQuestionGrid();
    })
    .catch((error) => {
      console.error('Error loading questions:', error);
      questionArea.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <p style="color: #f44336; margin-bottom: 1rem;">Could not load questions for this topic.</p>
          <p style="margin-bottom: 1rem;">Error: ${error.message}</p>
          <button onclick="window.location.href='index.html'" class="action-btn">Back to Topics</button>
        </div>`;
    });
}

function updateStatus(idx, action) {
        if (!this.questionStatus[idx] || this.questionStatus[idx] === 'not-visited') {
            this.questionStatus[idx] = 'not-answered';
        }
        
        switch(action) {
            case 'answer':
                this.questionStatus[idx] = this.questionStatus[idx] === 'marked' || 
                    this.questionStatus[idx] === 'answered-marked' ? 
                    'answered-marked' : 'answered';
                break;
            case 'clear':
                this.questionStatus[idx] = this.questionStatus[idx] === 'marked' || 
                    this.questionStatus[idx] === 'answered-marked' ? 
                    'marked' : 'not-answered';
                this.userAnswers[idx] = null;
                break;
            case 'mark':
                this.questionStatus[idx] = this.userAnswers[idx] !== null ? 
                    'answered-marked' : 'marked';
                break;
            case 'save-mark':
                this.questionStatus[idx] = 'answered-marked';
                break;
            case 'visit':
                if (!this.questionStatus[idx] || this.questionStatus[idx] === 'not-visited') {
                    this.questionStatus[idx] = 'not-answered';
                }
                break;
        }
    }

function showQuestion() {
  if (!questions.length) return;
  
  if (current >= questions.length) {
    showReview();
    return;
  }

  updateStatus(current, 'visit');
  const q = questions[current];
  questionArea.innerHTML = `
    <div class="question">Question ${current + 1}:</div>
    <div class="question-text">${q.question}</div>
    <div class="options">
      ${q.options.map((opt, i) => {
        const isCode = /[<>]/.test(opt) ? 'data-code="true"' : '';
        return `<button class="option" data-idx="${i}" ${userAnswers[current] !== null ? 'disabled' : ''} ${isCode}>
          ${opt.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
        </button>`;
      }).join('')}
    </div>
  `;

  document.querySelectorAll('.option').forEach(btn => {
    btn.addEventListener('click', selectOption);
    if (userAnswers[current] !== null && Number(btn.dataset.idx) === userAnswers[current]) {
      btn.classList.add('selected');
    }
  });

  renderQuestionGrid();
}

function selectOption(e) {
        const idx = Number(e.target.dataset.idx);
        userAnswers[current] = idx;
        updateStatus(current, 'answer');
        
        document.querySelectorAll('.option').forEach((btn, i) => {
            btn.disabled = true;
            btn.classList.remove('selected');
            if (i === idx) btn.classList.add('selected');
        });
        
        renderQuestionGrid();
    }

function renderQuestionGrid() {
        const grid = document.getElementById('question-grid');
        if (!questions.length) {
            grid.innerHTML = '';
            return;
        }

        let html = '';
        for (let i = 0; i < questions.length; i++) {
            let status = questionStatus[i] || 'not-visited';
            let cls = `question-grid-btn ${status}`;
            if (i === current && !quizSubmitted) cls += ' current';
            
            html += `
                <button class="${cls}" data-idx="${i}" 
                    ${quizSubmitted ? 'disabled' : ''}>
                    ${(i + 1).toString().padStart(2, '0')}
                </button>`;
        }
        
        grid.innerHTML = html;
        
        if (!quizSubmitted) {
            grid.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', () => {
                    current = Number(btn.dataset.idx);
                    showQuestion();
                });
            });
        }
    }

function showReview() {
        const correctCount = userAnswers.filter((ans, i) => 
            ans === questions[i].options.indexOf(questions[i].answer)).length;
        
        let html = `
            <h2>Quiz Completed!</h2>
            <div class="score">Your Score: ${correctCount} / ${questions.length}</div>
            <div class="review-list">
        `;

        questions.forEach((q, i) => {
            const userIdx = userAnswers[i];
            const correctIdx = q.options.indexOf(q.answer);
            const isCorrect = userIdx === correctIdx;
            
            html += `
                <div class="review-question">
                    <div class="question">Q${i + 1}. ${q.question}</div>
                    <div class="review-answer">
                        Your answer: <span class="${isCorrect ? 'review-correct' : 'review-wrong'}">
                            ${userIdx !== null ? q.options[userIdx] : 'No answer'}
                        </span><br>
                        Correct answer: <span class="review-correct">${q.answer}</span>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        reviewArea.innerHTML = html;
        reviewArea.style.display = 'block';
        questionArea.style.display = 'none';
        document.querySelector('.quiz-action-row').style.display = 'none';
        document.querySelector('.quiz-nav-row').style.display = 'none';
        
        if (quizSubmitted) {
            exitBtn.style.display = 'block';
        }
    }

function handleSaveNext() {
        if (userAnswers[current] !== null) {
            updateStatus(current, 'answer');
        }
        if (current < questions.length - 1) {
            current++;
            showQuestion();
        }
    }

function handleClear() {
        userAnswers[current] = null;
        updateStatus(current, 'clear');
        showQuestion();
    }

function handleSaveMark() {
        if (userAnswers[current] !== null) {
            updateStatus(current, 'save-mark');
        } else {
            updateStatus(current, 'mark');
        }
        if (current < questions.length - 1) {
            current++;
            showQuestion();
        }
    }

function handleMarkNext() {
        updateStatus(current, 'mark');
        if (current < questions.length - 1) {
            current++;
            showQuestion();
        }
    }

function handleBack() {
        if (current > 0) {
            current--;
            showQuestion();
        }
    }

function handleNext() {
        if (current < questions.length - 1) {
            current++;
            showQuestion();
        }
    }

function handleSubmit() {
        const counts = getStatusCounts();
        submitSummary.innerHTML = `
            <div><b>Answered:</b> ${counts['answered'] + counts['answered-marked']}</div>
            <div><b>Not Answered:</b> ${counts['not-answered']}</div>
            <div><b>Marked for Review:</b> ${counts['marked'] + counts['answered-marked']}</div>
            <div><b>Not Visited:</b> ${counts['not-visited']}</div>
        `;
        submitModal.style.display = 'flex';
    }

function handleFinalSubmit() {
        submitModal.style.display = 'none';
        quizSubmitted = true;
        document.querySelector('.quiz-action-row').style.display = 'none';
        document.querySelector('.quiz-nav-row').style.display = 'none';
        document.querySelector('.quiz-main-layout').classList.add('quiz-locked');
        showReview();
        renderQuestionGrid();
        exitBtn.style.display = 'block';
    }

function handleCancelSubmit() {
        submitModal.style.display = 'none';
    }

function handleExit() {
        window.location.href = '../../public/index.html';
    }

function getStatusCounts() {
        return questionStatus.reduce((counts, status) => {
            if (counts[status] !== undefined) counts[status]++;
            return counts;
        }, {
            'not-visited': 0,
            'not-answered': 0,
            'answered': 0,
            'marked': 0,
            'answered-marked': 0
        });
    }

// Initialize
setQuizTitle();
if (topic) {
  loadQuestions();
} else {
  questionArea.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <p style="margin-bottom: 1rem;">No topic selected.</p>
      <button onclick="window.location.href='index.html'" class="action-btn">Back to Topics</button>
    </div>`;
} 