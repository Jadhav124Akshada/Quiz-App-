const fs = require('fs');

// HTML Questions
const htmlQuestions = JSON.parse(fs.readFileSync('./quiz-data/html.json', 'utf8'));

// DBMS questions
const dbmsQuestions = JSON.parse(fs.readFileSync('./quiz-data/dbms.json', 'utf8'));

// CSS Questions
const cssQuestions = JSON.parse(fs.readFileSync('./quiz-data/css.json', 'utf8'));

// C++ Questions
const cppQuestions = JSON.parse(fs.readFileSync('./quiz-data/cpp.json', 'utf8'));

// JavaScript Questions
const jsQuestions = JSON.parse(fs.readFileSync('./quiz-data/js.json', 'utf8'));

// React Questions
const reactQuestions = JSON.parse(fs.readFileSync('./quiz-data/js.json', 'utf8'));

// Next.js Questions
const nextjsQuestions = JSON.parse(fs.readFileSync('./quiz-data/nextjs.json', 'utf8'));

// Git & GitHub Questions
const gitQuestions = JSON.parse(fs.readFileSync('./quiz-data/git.json', 'utf8'));

// Python Questions
const pythonQuestions = JSON.parse(fs.readFileSync('./quiz-data/python.json', 'utf8'));

// SQL Questions
const sqlQuestions = JSON.parse(fs.readFileSync('./quiz-data/sql.json', 'utf8'));

// Django Questions
const djangoQuestions = JSON.parse(fs.readFileSync('./quiz-data/django.json', 'utf8'));

// DSA questions
const dsaQuestions =  JSON.parse(fs.readFileSync('./quiz-data/dsa.json', 'utf8'));

// Added auto-scroll and progress tracking variables
const answeredQuestions = new Set()
let totalQuestions = 0


// Function to update progress bar
function updateProgressBar() {
  const progressText = document.getElementById("progress-text")
  const progressPercentage = document.getElementById("progress-percentage")
  const progressFill = document.getElementById("progress-fill")

  if (progressText && progressPercentage && progressFill) {
    const answered = answeredQuestions.size
    const percentage = Math.round((answered / totalQuestions) * 100)
    progressText.textContent = `Progress: ${answered} / ${totalQuestions}`
    progressPercentage.textContent = `${percentage}%`
    progressFill.style.width = `${percentage}%`
  }
}

// Auto-scroll function
function autoScrollToNext(currentIndex) {
  const nextIndex = currentIndex + 1
  const nextQuestion = document.querySelector(`[data-question-index="${nextIndex}"]`)
  if (nextQuestion) {
    console.log(`Auto-scrolling to question ${nextIndex + 1}`)
    setTimeout(() => {
      nextQuestion.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }, 800) // 0.8 second delay for better UX
  }
}

// Timer and scoring functionality
let actualtime = 60
let timeleft = 60
let timeinterval
let globalscore = 0
const timerElement = document.getElementById("timer")
const scoreElement = document.getElementById("scoree")

function updateTimerDisplay() {
  timerElement.textContent = timeleft.toString()
}

function updateGlobalScore() {
  if (scoreElement) {
    globalscore += actualtime - timeleft
    scoreElement.innerHTML = globalscore.toString()
  }
}

function initializeTimer() {
  timeleft = 60
  timerElement.textContent = timeleft.toString()
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.disabled = false
  })
  document.querySelectorAll(".check-answer-btn").forEach((btn) => {
    btn.disabled = false
  })
  stop()
}

function stop() {
  clearInterval(timeinterval)

}

function start() {
  if (timeinterval) {

    clearInterval(timeinterval)
  }
  actualtime = 60
  timeleft = actualtime
  timerElement.textContent = timeleft.toString()
  timeinterval = setInterval(() => {
    timeleft--
    timerElement.innerText = timeleft.toString()
    if (timeleft <= 0) {
      clearInterval(timeinterval)
      handleTimeUp(currentQuestions)
    }
  }, 1000)
}

function handleTimeUp(questions) {
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.disabled = true
  })
  document.querySelectorAll(".check-answer-btn").forEach((btn) => {
    btn.disabled = true
  })
  const response = document.getElementById("result")
  response.textContent = "Time's up"
  calculateTotalScore(questions)
}

const startBtn = document.getElementById("start-btn")
const restartBtn = document.getElementById("restart-btn")

if (startBtn) {
  startBtn.addEventListener("click", () => {
    initializeTimer()
    start()
  })
}

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    initializeTimer()
  })

}

// Function to render a single question
const renderQuestion = (question, index, sectionId) => {

  const sectionContainer = document.getElementById(sectionId)
  if (!sectionContainer) return

  const questionElem = document.createElement("div")
  questionElem.classList.add("question-container")
  // Added data attribute for auto-scroll targeting
  questionElem.setAttribute("data-question-index", index)

  // Add question text
  const questionText = document.createElement("p")
  questionText.textContent = `${index + 1}. ${question.question}`
  questionElem.appendChild(questionText)

  // Create options
  const ul = document.createElement("ul")
  ul.className = "option-container"
  question.options.forEach((option) => {
    const li = document.createElement("li")
    const label = document.createElement("label")
    const input = document.createElement("input")
    input.type = "radio"
    input.name = `question-${index}`
    input.value = option
    const textNode = document.createTextNode(" " + option)
    label.appendChild(input)
    label.appendChild(textNode)
    li.appendChild(label)
    ul.appendChild(li)
  })
  questionElem.appendChild(ul)

  // Add Check Answer button
  const checkBtn = document.createElement("button")
  checkBtn.className = "check-answer-btn"
  checkBtn.dataset.index = index
  checkBtn.textContent = "Check Answer"
  questionElem.appendChild(checkBtn)

  // Add result div
  const resultDiv = document.createElement("div")
  resultDiv.className = "result"
  resultDiv.id = `result-${index}`
  questionElem.appendChild(resultDiv)

  sectionContainer.appendChild(questionElem)
}



// Function to render all questions
const renderQuestions = (questions, sectionId) => {
  // Ensure we don't try to render if the section doesn't exist.
  if (!document.getElementById(sectionId)) return

  // Set total questions for progress tracking
  totalQuestions = questions.length
  questions.forEach((q, index) => renderQuestion(q, index, sectionId))

  // Add a final score container at the end
  const sectionContainer = document.getElementById(sectionId)
  const scoreElem = document.createElement("div")
  scoreElem.classList.add("score-container")
  scoreElem.innerHTML = `
  <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap;">
    <button id="calculate-score-btn" style="width: 180px; padding: 10px; font-size: 16px;">Calculate Total Score</button>
    <button id="feedback-btn" style="width: 180px; padding: 10px; font-size: 16px;">Feedback / Report</button>
  </div>
  <div id="total-score" style="margin-top: 15px; font-weight: bold;"></div>`
  sectionContainer.appendChild(scoreElem)

  // Initialize progress bar
  updateProgressBar()
}


// Function to check the answer for a specific question
const checkAnswer = (questions, index) => {
  const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`)
  const resultContainer = document.getElementById(`result-${index}`)
  const questionContainer = document.querySelector(`[data-question-index="${index}"]`)
  const button = document.querySelector(`[data-index="${index}"]`)

  if (!selectedOption) {
    resultContainer.textContent = "Please select an answer."
    resultContainer.style.color = "orange"
    return false
  }

  // Mark question as answered and update UI
  answeredQuestions.add(index)
  questionContainer.classList.add("answered")
  button.classList.add("answered")
  button.textContent = "✓ Answered"
  button.disabled = true

  if (selectedOption.value === questions[index].answer) {
    resultContainer.textContent = "✅ Correct!"
    resultContainer.style.color = "green"
    // Update progress and auto-scroll
    updateProgressBar()
    autoScrollToNext(index)
    return true
  } else {
    resultContainer.textContent = `❌ Wrong! The correct answer is: ${questions[index].answer}`
    resultContainer.style.color = "red"
    // Update progress and auto-scroll even for wrong answers
    updateProgressBar()
    autoScrollToNext(index)
    return false
  }

}


// Function to calculate the total score
function calculateTotalScore(questions) {
  let score = 0;
  questions.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
    if (selectedOption && selectedOption.value === q.answer) {
      score++;
    }

    globalscore = score;
  });

  updateGlobalScore();


  updateGlobleScore();

  // Display the total score
  const totalScoreContainer = document.getElementById("total-score");
  totalScoreContainer.textContent = `Your total score is: ${score} out of ${questions.length}`;
  totalScoreContainer.style.color = score === questions.length ? "green" : "blue";
}

// Dynamically render questions based on the page

let currentQuestions = []


document.addEventListener("DOMContentLoaded", () => {
  let questions = []
  let sectionId = ""

  // Determine the quiz type
  if (document.getElementById("html-questions")) {
    questions = htmlQuestions
    sectionId = "html-questions"
  } else if (document.getElementById("css-questions")) {

    questions = cssQuestions
    sectionId = "css-questions"
  } else if (document.getElementById("cpp-questions")) {
    questions = cppQuestions
    sectionId = "cpp-questions"

  } else if (document.getElementById("js-questions")) {
    questions = jsQuestions
    sectionId = "js-questions"
  } else if (document.getElementById("react-questions")) {
    questions = reactQuestions
    sectionId = "react-questions"
  } else if (document.getElementById("nextjs-questions")) {
    questions = nextjsQuestions
    sectionId = "nextjs-questions"
  } else if (document.getElementById("git-questions")) {
    questions = gitQuestions
    sectionId = "git-questions"
  } else if (document.getElementById("python-questions")) {
    questions = pythonQuestions
    sectionId = "python-questions"
  } else if (document.getElementById("sql-questions")) {
    questions = sqlQuestions
    sectionId = "sql-questions"
  } else if (document.getElementById("django-questions")) {

    questions = djangoQuestions
    sectionId = "django-questions"
  } else if (document.getElementById("dsa-questions")) {
    questions = dsaQuestions
    sectionId = "dsa-questions"
  } else if (document.getElementById("dbms-questions")) {
    questions = dbmsQuestions
    sectionId = "dbms-questions"
  }

  if (sectionId) {
    currentQuestions = questions
    renderQuestions(questions, sectionId)


    document.querySelectorAll(".check-answer-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = Number.parseInt(event.target.getAttribute("data-index"))
        checkAnswer(questions, index)
      })
    })

    document.getElementById("calculate-score-btn")?.addEventListener("click", () => {

      initializeTimer()
      calculateTotalScore(questions)
    })

    document.getElementById("feedback-btn")?.addEventListener("click", () => {
      window.location.href = "contact-us.html"
    })
  }

  // Restart quiz handler
  const restartBtn = document.getElementById("restartQuizBtn")
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to restart the quiz? All progress will be lost.")) {
        window.location.reload()
      }
    })
  }

  // Contact form logic
  const reasonSelect = document.getElementById("reason")
  const feedbackSection = document.getElementById("feedback-Section")
  const issueSection = document.getElementById("issue-Section")
  const contactForm = document.getElementById("contact-Form")
  const contactResponseMessage = document.getElementById("responseMessage")

  function toggleFormSections() {
    if (!reasonSelect) return
    const selectedReason = reasonSelect.value
    feedbackSection.style.display = "none"
    issueSection.style.display = "none"
    setRequired(feedbackSection, false)
    setRequired(issueSection, false)
    if (selectedReason === "feedback") {
      feedbackSection.style.display = "block"
      setRequired(feedbackSection, true)
    } else if (selectedReason === "issue") {
      issueSection.style.display = "block"
      setRequired(issueSection, true)
    }
  }

  function setRequired(sectionElement, isRequired) {
    const inputs = sectionElement.querySelectorAll('input:not([type="file"]), textarea, select')
    inputs.forEach((input) => {
      input.required = isRequired
    })
  }

  if (contactForm) {
    toggleFormSections()
    reasonSelect.addEventListener("change", toggleFormSections)
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      if (!contactForm.checkValidity()) {
        contactResponseMessage.textContent = "Please fill out all required fields."
        contactResponseMessage.style.color = "red"
        return
      }
      const selectedReason = reasonSelect.value
      let successMessage = ""
      if (selectedReason === "feedback") {
        successMessage = "Thank you for your feedback! We appreciate it."
      } else if (selectedReason === "issue") {
        successMessage = "Your issue has been reported. Thank you!"
      } else {
        successMessage = "Form submitted successfully!"
      }
      const formData = new FormData(contactForm)
      const data = {}
      for (const [key, value] of formData.entries()) {
        data[key] = value
      }
      console.log("Form Data Submitted:", data)
      sessionStorage.setItem("formSubmissionSuccess", successMessage)
      window.location.href = "index.html"
    })
  }

  // Display submission message on index
  const submissionMessageDiv = document.getElementById("submission-message")
  if (submissionMessageDiv) {
    const message = sessionStorage.getItem("formSubmissionSuccess")
    if (message) {
      submissionMessageDiv.textContent = message
      submissionMessageDiv.style.color = "green"
      submissionMessageDiv.style.fontWeight = "bold"
      submissionMessageDiv.style.margin = "15px 0"
      sessionStorage.removeItem("formSubmissionSuccess")
    }
  }
})
