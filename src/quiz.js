// quiz.js
const params = new URLSearchParams(window.location.search);
const topic = params.get('topic');
const quizTitle = document.getElementById('quiz-title');
const questionArea = document.getElementById('question-area');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const backBtn = document.getElementById('back-btn');
const reviewArea = document.getElementById('review-area');
const submitModal = document.getElementById('submit-modal');
const submitSummary = document.getElementById('submit-summary');
const finalSubmitBtn = document.getElementById('final-submit-btn');
const cancelSubmitBtn = document.getElementById('cancel-submit-btn');
const exitBtn = document.getElementById('exit-btn');

const topicNames = {
  html: 'HTML', css: 'CSS', js: 'JavaScript', python: 'Python',  java: 'Java' , cpp: 'C++', dbms: 'DBMS',
  react: 'React', nextjs: 'Next.js', git: 'Git & GitHub', dsa: 'DSA', django: 'Django',  cprogramming: "C(programming)"
};

let questions = [];
let current = 0;
let userAnswers = [];
let markedForReview = [];
let questionStatus = [];
// Status: 'not-visited', 'not-answered', 'answered', 'marked', 'answered-marked'
let quizSubmitted = false;

function setQuizTitle() {
  quizTitle.textContent = topicNames[topic] ? `${topicNames[topic]} Quiz` : 'Quiz';
}

function renderSidePanel() {
  const panel = document.getElementById('side-panel');
  if (!questions.length) { panel.innerHTML = ''; return; }
  let html = '';
  for (let i = 0; i < questions.length; i++) {
    let cls = 'question-nav-btn';
    if (i === current) cls += ' current';
    if (markedForReview[i]) cls += ' marked';
    else if (userAnswers[i] !== null) cls += ' answered';
    html += `<button class="${cls}" data-idx="${i}">${i + 1}</button>`;
  }
  panel.innerHTML = html;
  panel.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      current = Number(btn.dataset.idx);
      showQuestion();
    });
  });
}

function renderQuestionGrid() {
  const grid = document.getElementById('question-grid');
  if (!questions.length) { grid.innerHTML = ''; return; }
  let html = '';
  for (let i = 0; i < questions.length; i++) {
    let status = questionStatus[i] || 'not-visited';
    let cls = 'question-grid-btn ' + status;
    if (i === current && !quizSubmitted) cls += ' current';
    html += `<button class="${cls}" data-idx="${i}" ${quizSubmitted ? 'disabled' : ''}>${(i+1).toString().padStart(2,'0')}</button>`;
  }
  grid.innerHTML = html;
  if (!quizSubmitted) {
    grid.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        current = Number(btn.dataset.idx);
        showQuestion();
      });
    });
  }
}

function updateStatus(idx, action) {
  // action: 'answer', 'clear', 'mark', 'save-mark', 'visit'
  if (!questionStatus[idx] || questionStatus[idx] === 'not-visited') questionStatus[idx] = 'not-answered';
  if (action === 'answer') {
    if (questionStatus[idx] === 'marked' || questionStatus[idx] === 'answered-marked') questionStatus[idx] = 'answered-marked';
    else questionStatus[idx] = 'answered';
  } else if (action === 'clear') {
    if (questionStatus[idx] === 'marked' || questionStatus[idx] === 'answered-marked') questionStatus[idx] = 'marked';
    else questionStatus[idx] = 'not-answered';
    userAnswers[idx] = null;
  } else if (action === 'mark') {
    if (userAnswers[idx] !== null) questionStatus[idx] = 'answered-marked';
    else questionStatus[idx] = 'marked';
  } else if (action === 'save-mark') {
    questionStatus[idx] = 'answered-marked';
  } else if (action === 'visit') {
    if (!questionStatus[idx] || questionStatus[idx] === 'not-visited') questionStatus[idx] = 'not-answered';
  }
}

function loadQuestions() {
  // Show loading state
  questionArea.innerHTML = '<div style="text-align: center; padding: 2rem;">Loading questions...</div>';
  
  fetch(`./data/${topic}.json`)  // Updated path to correctly point to data directory
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
          <p style="color: #666; margin-bottom: 1rem;">Error: ${error.message}</p>
          <button onclick="window.location.href='index.html'" class="action-btn">Back to Topics</button>
        </div>`;
    });
}

function showQuestion() {
  if (!questions.length) return;  // Added check
  if (current >= questions.length) {
    showReview();
    document.getElementById('question-area').style.display = 'none';
    document.querySelector('.quiz-action-row').style.display = 'none';
    document.querySelector('.quiz-nav-row').style.display = 'none';
    renderQuestionGrid();
    return;
  }
  updateStatus(current, 'visit');
  const q = questions[current];
  questionArea.innerHTML = `
    <div class="question">
      <h3>Question ${current + 1}:</h3>
      <p>${q.question}</p>
    </div>
    <div class="options">
      ${q.options.map((opt, i) => {
        const isCode = /[<>]/.test(opt) ? 'data-code="true"' : '';
        return `<button class="option" data-idx="${i}" ${userAnswers[current] !== null ? 'disabled' : ''} ${isCode}>${opt.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</button>`;
      }).join('')}
    </div>
  `;
  document.querySelectorAll('.option').forEach(btn => {
    btn.addEventListener('click', selectOption);
    if (userAnswers[current] !== null && Number(btn.dataset.idx) === userAnswers[current]) {
      btn.classList.add('selected');
    }
  });
  document.querySelector('.quiz-action-row').style.display = '';
  document.querySelector('.quiz-nav-row').style.display = '';
  document.getElementById('question-area').style.display = '';
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

function showResult(msg) {
  resultEl.textContent = msg;
}

function disableOptions() {
  document.querySelectorAll('.option').forEach(btn => btn.disabled = true);
}

function getStatusCounts() {
  let counts = { 'not-visited': 0, 'not-answered': 0, 'answered': 0, 'marked': 0, 'answered-marked': 0 };
  questionStatus.forEach(s => { if (counts[s] !== undefined) counts[s]++; });
  return counts;
}

document.getElementById('save-next-btn').onclick = function() {
  if (userAnswers[current] !== null) updateStatus(current, 'answer');
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  }
  renderQuestionGrid();
};
document.getElementById('clear-btn').onclick = function() {
  userAnswers[current] = null;
  updateStatus(current, 'clear');
  showQuestion();
  renderQuestionGrid();
};
document.getElementById('save-mark-btn').onclick = function() {
  if (userAnswers[current] !== null) updateStatus(current, 'save-mark');
  else updateStatus(current, 'mark');
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  }
  renderQuestionGrid();
};
document.getElementById('mark-next-btn').onclick = function() {
  updateStatus(current, 'mark');
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  }
  renderQuestionGrid();
};
document.getElementById('back-btn').onclick = function() {
  if (current > 0) {
    current--;
    showQuestion();
  }
  renderQuestionGrid();
};
document.getElementById('next-btn').onclick = function() {
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  }
  renderQuestionGrid();
};
document.getElementById('submit-btn').onclick = function() {
  // Show modal with summary
  const counts = getStatusCounts();
  submitSummary.innerHTML = `
    <div><b>Answered:</b> ${counts['answered'] + counts['answered-marked']}</div>
    <div><b>Not Answered:</b> ${counts['not-answered']}</div>
    <div><b>Marked for Review:</b> ${counts['marked'] + counts['answered-marked']}</div>
    <div><b>Not Visited:</b> ${counts['not-visited']}</div>
  `;
  submitModal.style.display = 'flex';
};

finalSubmitBtn.onclick = function() {
  submitModal.style.display = 'none';
  // Hide all quiz controls
  document.querySelector('.quiz-action-row').style.display = 'none';
  document.querySelector('.quiz-nav-row').style.display = 'none';
  document.getElementById('question-area').style.display = 'none';
  quizSubmitted = true;
  document.querySelector('.quiz-main-layout').classList.add('quiz-locked');
  showReview();
  renderQuestionGrid();
  exitBtn.style.display = 'block';
};

exitBtn.onclick = function() {
  window.location.href = 'index.html';
};

cancelSubmitBtn.onclick = function() {
  submitModal.style.display = 'none';
};

// Add this function to improve score display
function showScore(correctCount, totalQuestions) {
  const reviewArea = document.getElementById('review-area');
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  let performanceMessage = '';
  
  // Determine performance level
  if (percentage >= 90) {
    performanceMessage = 'Excellent! Outstanding performance! 🏆';
  } else if (percentage >= 75) {
    performanceMessage = 'Great job! Well done! 🌟';
  } else if (percentage >= 60) {
    performanceMessage = 'Good effort! Keep practicing! 👍';
  } else {
    performanceMessage = 'Keep learning! You can do better! 💪';
  }

  const scoreHtml = `
    <div class="score-card">
      <h2 class="score-title">Quiz Completed!</h2>
      <div class="score-value">${correctCount} / ${totalQuestions}</div>
      <div class="performance-message">${performanceMessage}</div>
      <div class="score-details">
        <div class="score-detail-item">
          <div class="detail-label">Correct Answers</div>
          <div class="detail-value" style="color: #4caf50;">${correctCount}</div>
        </div>
        <div class="score-detail-item">
          <div class="detail-label">Incorrect Answers</div>
          <div class="detail-value" style="color: #f44336;">${totalQuestions - correctCount}</div>
        </div>
        <div class="score-detail-item">
          <div class="detail-label">Score Percentage</div>
          <div class="detail-value" style="color: #2196f3;">${percentage}%</div>
        </div>
        <div class="score-detail-item">
          <div class="detail-label">Total Questions</div>
          <div class="detail-value">${totalQuestions}</div>
        </div>
      </div>
    </div>
    <div class="score-actions">
      <button onclick="window.location.href='index.html'" class="action-btn green">Back to Topics</button>
      <button onclick="window.location.reload()" class="action-btn orange">Retry Quiz</button>
    </div>
    <div class="review-section">
      <h3>Detailed Review</h3>
      <div class="review-list">
        ${questions.map((q, i) => {
          const userIdx = userAnswers[i];
          const correctIdx = q.options.indexOf(q.answer);
          const isCorrect = userIdx === correctIdx;
          return `
            <div class="review-question ${isCorrect ? 'correct' : 'incorrect'}">
              <div class="question">
                <span class="question-number">Q${i + 1}.</span>
                <span class="question-text">${q.question}</span>
                <span class="question-status ${isCorrect ? 'correct' : 'incorrect'}">
                  ${isCorrect ? '✓' : '✗'}
                </span>
              </div>
              <div class="review-answer">
                <div class="user-answer">
                  Your answer: 
                  <span class="${isCorrect ? 'review-correct' : 'review-wrong'}">
                    ${userIdx !== null ? q.options[userIdx] : 'No answer'}
                  </span>
                </div>
                <div class="correct-answer">
                  Correct answer: 
                  <span class="review-correct">${q.answer}</span>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>`;
  
  reviewArea.innerHTML = scoreHtml;
  reviewArea.style.display = 'block';
  document.getElementById('question-area').style.display = 'none';
  document.querySelector('.quiz-action-row').style.display = 'none';
  document.querySelector('.quiz-nav-row').style.display = 'none';
  
  if (quizSubmitted) {
    document.getElementById('exit-btn').style.display = 'none'; // Hide the exit button since we have new action buttons
  }
}

// Update the showReview function to use the new showScore function
function showReview() {
  const correctCount = userAnswers.filter((ans, i) => 
    ans === questions[i].options.indexOf(questions[i].answer)).length;
  showScore(correctCount, questions.length);
  renderQuestionGrid();
}

setQuizTitle();
if (topic) {
  loadQuestions();
} else {
  document.getElementById('side-panel').style.display = 'none';
  document.querySelector('.quiz-container').style.display = 'none';
  const main = document.querySelector('main');
  const msg = document.createElement('div');
  msg.style.margin = '4rem auto';
  msg.style.textAlign = 'center';
  msg.style.fontSize = '1.3rem';
  msg.innerHTML = `No topic selected.<br><a href="index.html" style="color:#4f8cff;text-decoration:underline;font-weight:bold;">Go back to Home</a>`;
  main.appendChild(msg);
  // Optional: auto-redirect after 3 seconds
  // setTimeout(() => { window.location.href = 'index.html'; }, 3000);
} 


//code for confetti
function confetti() {
  confetti(
    {
      particlecount: 100,
      spread: 70,
      origin: {y: 0.6}
    }
  );
}
