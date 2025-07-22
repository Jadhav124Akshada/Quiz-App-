/**
 * script.js
 * This script handles all the logic for the dynamic quiz interface.
 */
const quizData = {
  "html": [
    {
      "question": "What does HTML stand for?",
      "options": [
        "HyperText Markup Language",
        "HyperText Management Language",
        "Home Tool Markup Language",
        "Hyper Transfer Markup Language"
      ],
      "answer": "HyperText Markup Language"
    },
    {
      "question": "What attribute is used to define the destination of a link in HTML?",
      "options": ["href", "src", "action", "destination"],
      "answer": "href"
    },
    {
      "question": "What is the purpose of the <head> element in an HTML document?",
      "options": [
        "To define the main content of the page.",
        "To provide metadata and links to external resources.",
        "To display headings on the page.",
        "To create the body of the page."
      ],
      "answer": "To provide metadata and links to external resources."
    },
    {
      "question": "Which attribute is used to specify an alternate text for an image if the image cannot be displayed?",
      "options": ["title", "src", "alt", "description"],
      "answer": "alt"
    },
    {
      "question": "Which attribute specifies that an input field must be filled out before submitting?",
      "options": ["required", "placeholder", "value", "mandatory"],
      "answer": "required"
    },
    {
      "question": "What is the purpose of the alt attribute in an image tag?",
      "options": [
        "Specifies the title of the image",
        "Provides a textual description of the image",
        "Specifies the location of the image",
        "Defines the image's resolution"
      ],
      "answer": "Provides a textual description of the image"
    },
    {
      "question": "What does the <head> element in HTML contain?",
      "options": [
        "Metadata about the page",
        "Visible content of the page",
        "Footer information",
        "Navigation links"
      ],
      "answer": "Metadata about the page"
    },
    {
      "question": "Which HTML element is used to define a paragraph?",
      "options": ["p", "text", "div", "span"],
      "answer": "p"
    },
    {
      "question": "What is the correct HTML for inserting an audio file?",
      "options": [
        "audio src='audio.mp3'",
        "audio file='audio.mp3'",
        "audio url='audio.mp3'",
        "music src='audio.mp3'"
      ],
      "answer": "audio src='audio.mp3'"
    },
    {
      "question": "Which HTML element is used to define an ordered list?",
      "options": ["ul", "li", "ol", "ol-list"],
      "answer": "ol"
    }
  ],
  "css": [
    {
      "question": "Which of the following is the correct CSS syntax for selecting an element with the class name 'example'?",
      "options": [
        ".example { color: red; }",
        "example { color: red; }",
        "#example { color: red; }",
        "*example { color: red; }"
      ],
      "answer": ".example { color: red; }"
    },
    {
      "question": "What does the CSS display property control?",
      "options": [
        "The visibility of an element",
        "The layout behavior of an element",
        "The background color of an element",
        "The size of an element"
      ],
      "answer": "The layout behavior of an element"
    },
    {
      "question": "Which CSS property is used to change the background color of an element?",
      "options": ["color", "bgcolor", "background-color", "background"],
      "answer": "background-color"
    },
    {
      "question": "Which CSS property is used to change the font size of an element?",
      "options": ["font-style", "font-size", "text-size", "size"],
      "answer": "font-size"
    },
    {
      "question": "How do you apply a background image in CSS?",
      "options": [
        "background: url('image.jpg');",
        "background-image: 'image.jpg';",
        "background-image: url('image.jpg');",
        "image-background: url('image.jpg');"
      ],
      "answer": "background-image: url('image.jpg');"
    },
    {
      "question": "Which CSS property controls the space between words?",
      "options": ["letter-spacing", "word-spacing", "text-spacing", "line-height"],
      "answer": "word-spacing"
    },
    {
      "question": "Which property is used to change the color of text in CSS?",
      "options": ["color", "text-color", "font-color", "background-color"],
      "answer": "color"
    },
    {
      "question": "How do you select an element with the id 'header' in CSS?",
      "options": ["#header", ".header", "header", "[id='header']"],
      "answer": "#header"
    },
    {
      "question": "What is the default value of the position property in CSS?",
      "options": ["static", "relative", "absolute", "fixed"],
      "answer": "static"
    },
    {
      "question": "Which CSS property is used to add space between an element's border and its content?",
      "options": ["padding", "margin", "border-spacing", "gap"],
      "answer": "padding"
    }
  ],
  "javascript": [
    {
      "question": "Which of the following is the correct way to define a function in JavaScript?",
      "options": [
        "function myFunction() { }",
        "def myFunction() { }",
        "function: myFunction() { }",
        "func myFunction() { }"
      ],
      "answer": "function myFunction() { }"
    },
    {
      "question": "How do you declare a variable in JavaScript?",
      "options": [
        "var myVariable;",
        "int myVariable;",
        "declare myVariable;",
        "variable myVariable;"
      ],
      "answer": "var myVariable;"
    },
    {
      "question": "Which of the following is used to add an item to the end of an array in JavaScript?",
      "options": [
        "array.push(item);",
        "array.add(item);",
        "array.append(item);",
        "array.insert(item);"
      ],
      "answer": "array.push(item);"
    },
    {
      "question": "Which method is used to convert a string to lowercase in JavaScript?",
      "options": ["toLowerCase()", "lowercase()", "toLower()", "convertLower()"],
      "answer": "toLowerCase()"
    },
    {
      "question": "Which operator is used to assign a value to a variable in JavaScript?",
      "options": ["=", "==", "===", ":="],
      "answer": "="
    },
    {
      "question": "What is the output of 5 + '5' in JavaScript?",
      "options": ["55", "10", "error", "undefined"],
      "answer": "55"
    },
    {
      "question": "Which method is used to remove the last element from an array in JavaScript?",
      "options": ["pop()", "remove()", "shift()", "slice()"],
      "answer": "pop()"
    },
    {
      "question": "Which statement is used to stop a loop in JavaScript?",
      "options": ["break", "exit", "stop", "return"],
      "answer": "break"
    },
    {
      "question": "How do you create an object in JavaScript?",
      "options": [
        "let obj = {};",
        "let obj = [];",
        "let obj = new Object();",
        "let obj = ({});"
      ],
      "answer": "let obj = {};"
    },
    {
      "question": "What does the 'this' keyword refer to in JavaScript?",
      "options": [
        "The current function",
        "The global object",
        "The current object",
        "The previous variable"
      ],
      "answer": "The current object"
    }
  ],
  "react": [
      { question: "What is JSX?",
      options: [
        "JavaScript XML",
        "JavaScript Extension",
        "Java Syntax Extension",
        "JSON Syntax"
      ],
      answer: "JavaScript XML" },
      { question: "What is the purpose of the `useState` hook in React?",
      options: [
        "To fetch data",
        "To add state to functional components",
        "To perform side effects",
        "To create context"
      ],
      answer: "To add state to functional components" },
      { question: "How do you pass data from a parent component to a child component?",
      options: [
        "Using state",
        "Using props",
        "Using context",
        "Using Redux"
      ],
      answer: "Using props" },
      { question: "In React, what is used to render a list of elements?",
      options: [
        "The for loop",
        "The forEach() method",
        "The map() method",
        "The render() method"
      ],
      answer: "The map() method" },
      { question: "What does `ReactDOM.render()` do?",
      options: [
        "It renders a React element to the DOM",
        "It compiles React code",
        "It creates a new React component",
        "It updates the virtual DOM"
      ],
      answer: "It renders a React element to the DOM" },
      { question: "What is the purpose of the `useEffect` hook?",
      options: [
        "To manage component state",
        "To handle user events",
        "To perform side effects in functional components",
        "To optimize rendering"
      ],
      answer: "To perform side effects in functional components" },
      { question: "Which of the following is NOT a core concept of React?",
      options: [
        "Components",
        "Virtual DOM",
        "Templates",
        "State and Props"
      ],
      answer: "Templates" },
      { question: "How do you create a React functional component?",
      options: [
        "class MyComponent extends React.Component",
        "function MyComponent() { ... }",
        "new React.Component()",
        "create.component()"
      ],
      answer: "function MyComponent() { ... }" },
      { question: "What is the purpose of 'keys' when rendering a list?",
      options: [
        "To style list items",
        "To identify which items have changed, are added, or are removed",
        "To handle click events",
        "To define the list order"
      ],
      answer: "To identify which items have changed, are added, or are removed" },
      { question: "What tool is commonly used to create a new React app?",
      options: [
        "npm init",
        "react-start",
        "Create React App",
        "react-new"
      ],
      answer: "Create React App" }
  ],
  "nextjs": [
      { question: "How is routing primarily handled in Next.js?",
      options: [
        "Using a routing library like React Router",
        "Through a configuration file",
        "Based on the file system in the `pages` directory",
        "Manually in the server file"
      ],
      answer: "Based on the file system in the `pages` directory" },
      { question: "Which rendering method pre-renders a page at build time?",
      options: [
        "Server-Side Rendering (SSR)",
        "Client-Side Rendering (CSR)",
        "Static Site Generation (SSG)",
        "Incremental Static Regeneration (ISR)"
      ],
      answer: "Static Site Generation (SSG)" },
      { question: "What is the purpose of the `/pages/api` directory in Next.js?",
      options: [
        "To store static assets",
        "To create serverless API endpoints",
        "To define page routes",
        "To manage global styles"
      ],
      answer: "To create serverless API endpoints" },
      { question: "Which component is used for optimized, client-side navigation between pages?",
      options: [
        "<a>",
        "<Route>",
        "<Navigate>",
        "<Link>"
      ],
      answer: "<Link>" },
      { question: "What is `getStaticProps` used for?",
      options: [
        "To fetch data for client-side rendering",
        "To fetch data at build time for pre-rendering",
        "To handle API requests",
        "To define dynamic routes"
      ],
      answer: "To fetch data at build time for pre-rendering" },
      { question: "How do you create a dynamic route in Next.js, for example for a blog post?",
      options: [
        "/pages/blog/[id].js",
        "/pages/blog/{id}.js",
        "/pages/blog/dynamic.js",
        "/pages/blog?id=[id].js"
      ],
      answer: "/pages/blog/[id].js" },
      { question: "What is Server-Side Rendering (SSR)?",
      options: [
        "The page is rendered by the browser",
        "The page is rendered on the server for each request",
        "The page is rendered at build time",
        "The page is not rendered at all"
      ],
      answer: "The page is rendered on the server for each request" },
      { question: "Which function is used to fetch data on every request for SSR?",
      options: [
        "getStaticProps",
        "getServerSideProps",
        "getInitialProps",
        "useEffect"
      ],
      answer: "getServerSideProps" },
      { question: "What is the main benefit of Image Optimization in Next.js?",
      options: [
        "It automatically converts images to CSS backgrounds",
        "It serves images in modern formats like WebP and resizes them",
        "It applies Instagram-like filters",
        "It stores images in a database"
      ],
      answer: "It serves images in modern formats like WebP and resizes them" },
      { question: "What command do you use to build a Next.js application for production?",
      options: [
        "npm start",
        "next dev",
        "npm run build",
        "next produce"
      ],
      answer: "npm run build" }
  ],
  "git": [
      { question: "What command initializes a new Git repository?",
      options: [
        "git start",
        "git new",
        "git init",
        "git create"
      ],
      answer: "git init" },
      { question: "Which command stages a file for the next commit?",
      options: [
        "git stage",
        "git add",
        "git commit",
        "git track"
      ],
      answer: "git add" },
      { question: "How do you check the status of your working directory and staging area?",
      options: [
        "git check",
        "git log",
        "git status",
        "git diff"
      ],
      answer: "git status" },
      { question: "What command is used to record the staged changes to the repository?",
      options: [
        "git push",
        "git save",
        "git commit",
        "git record"
      ],
      answer: "git commit" },
      { question: "How do you send your committed changes to a remote repository like GitHub?",
      options: [
        "git send",
        "git upload",
        "git remote",
        "git push"
      ],
      answer: "git push" },
      { question: "What does the `git clone` command do?",
      options: [
        "Creates a new branch",
        "Creates a copy of a remote repository on your local machine",
        "Merges two repositories",
        "Deletes a repository"
      ],
      answer: "Creates a copy of a remote repository on your local machine" },
      { question: "How do you create a new branch and switch to it in one command?",
      options: [
        "git branch -c <branch-name>",
        "git switch -n <branch-name>",
        "git checkout -b <branch-name>",
        "git new-branch <branch-name>"
      ],
      answer: "git checkout -b <branch-name>" },
      { question: "What is a 'pull request' on GitHub?",
      options: [
        "A request to pull code from someone's computer",
        "A notification that you have new commits",
        "A way to propose changes to a repository for review",
        "A command to download the latest changes"
      ],
      answer: "A way to propose changes to a repository for review" },
      { question: "Which command is used to merge another branch into your current branch?",
      options: [
        "git combine <branch-name>",
        "git join <branch-name>",
        "git merge <branch-name>",
        "git attach <branch-name>"
      ],
      answer: "git merge <branch-name>" },
      { question: "What is the purpose of the `.gitignore` file?",
      options: [
        "To list all files in the repository",
        "To specify intentionally untracked files that Git should ignore",
        "To store your Git credentials",
        "To define Git commands"
      ],
      answer: "To specify intentionally untracked files that Git should ignore" }
  ],
  "python": [
      { question: "Which keyword is used to define a function in Python?",
      options: [
        "function",
        "def",
        "func",
        "define"
      ],
      answer: "def" },
      { question: "How do you create a single-line comment in Python?",
      options: [
        "// This is a comment",
        "/* This is a comment */",
        "# This is a comment",
        ""
      ],
      answer: "# This is a comment" },
      { question: "Which data type is used to store a sequence of items, is changeable, and allows duplicate values?",
      options: [
        "tuple",
        "dictionary",
        "set",
        "list"
      ],
      answer: "list" },
      { question: "What is the correct way to get the length of a list named `my_list`?",
      options: [
        "len(my_list)",
        "my_list.length()",
        "size(my_list)",
        "length(my_list)"
      ],
      answer: "len(my_list)" },
      { question: "In Python, how is a block of code (like in a loop or function) indicated?",
      options: [
        "Using curly braces {}",
        "Using parentheses ()",
        "Using indentation",
        "Using the `begin` and `end` keywords"
      ],
      answer: "Using indentation" },
      { question: "Which operator is used for exponentiation (e.g., 5 to the power of 2)?",
      options: [
        "^",
        "*",
        "**",
        "pow"
      ],
      answer: "**" },
      { question: "What will `print(type('Hello'))` output?",
      options: [
        "<class 'string'>",
        "<class 'str'>",
        "<type 'string'>",
        "<type 'str'>"
      ],
      answer: "<class 'str'>" },
      { question: "Which method is used to add an item to the end of a list?",
      options: [
        ".add()",
        ".push()",
        ".insert()",
        ".append()"
      ],
      answer: ".append()" },
      { question: "How do you access the value associated with the key 'name' in a dictionary `d`?",
      options: [
        "d.name",
        "d('name')",
        "d.get('name')",
        "d['name']"
      ],
      answer: "d['name']" },
      { question: "Which statement is used to stop a loop?",
      options: [
        "stop",
        "exit",
        "break",
        "return"
      ],
      answer: "break" }
  ],
  "sql": [
      { question: "Which SQL statement is used to extract data from a database?",
      options: [
        "GET",
        "OPEN",
        "EXTRACT",
        "SELECT"
      ],
      answer: "SELECT" },
      { question: "Which SQL clause is used to filter records?",
      options: [
        "FILTER BY",
        "WHERE",
        "SEARCH",
        "FROM"
      ],
      answer: "WHERE" },
      { question: "Which SQL statement is used to update data in a database?",
      options: [
        "MODIFY",
        "UPDATE",
        "SAVE",
        "CHANGE"
      ],
      answer: "UPDATE" },
      { question: "Which SQL statement is used to insert new data into a database?",
      options: [
        "ADD NEW",
        "INSERT INTO",
        "ADD RECORD",
        "INSERT NEW"
      ],
      answer: "INSERT INTO" },
      { question: "Which SQL keyword is used to sort the result-set?",
      options: [
        "SORT BY",
        "ORDER BY",
        "ARRANGE BY",
        "SORT"
      ],
      answer: "ORDER BY" },
      { question: "Which type of JOIN returns records that have matching values in both tables?",
      options: [
        "OUTER JOIN",
        "FULL JOIN",
        "LEFT JOIN",
        "INNER JOIN"
      ],
      answer: "INNER JOIN" },
      { question: "What does the `COUNT()` function in SQL do?",
      options: [
        "Counts the number of columns",
        "Counts the total value of a numeric column",
        "Returns the number of rows that matches a specified criterion",
        "Counts the number of tables"
      ],
      answer: "Returns the number of rows that matches a specified criterion" },
      { question: "Which SQL statement is used to delete data from a database?",
      options: [
        "DELETE",
        "REMOVE",
        "COLLAPSE",
        "ERASE"
      ],
      answer: "DELETE" },
      { question: "What does the `AS` keyword do in a query?",
      options: [
        "It is used to compare two values",
        "It is a wildcard character",
        "It creates an alias for a column or table name",
        "It is used for aggregation"
      ],
      answer: "It creates an alias for a column or table name" },
      { question: "Which SQL statement is used to create a new table?",
      options: [
        "CREATE TABLE",
        "NEW TABLE",
        "MAKE TABLE",
        "BUILD TABLE"
      ],
      answer: "CREATE TABLE" }
  ],
  "django": [
      { question: "What is the architectural pattern that Django follows?",
      options: [
        "Model-View-Controller (MVC)",
        "Model-View-Presenter (MVP)",
        "Model-View-Template (MVT)",
        "Model-View-Adapter (MVA)"
      ],
      answer: "Model-View-Template (MVT)" },
      { question: "Which file in a Django app is used to define the data models (database schema)?",
      options: [
        "views.py",
        "models.py",
        "urls.py",
        "admin.py"
      ],
      answer: "models.py" },
      { question: "What is the primary role of `views.py` in a Django application?",
      options: [
        "To define the database structure",
        "To handle requests and return responses",
        "To map URLs to functions",
        "To render HTML templates"
      ],
      answer: "To handle requests and return responses" },
      { question: "Which command is used to start the Django development server?",
      options: [
        "django start",
        "python manage.py startserver",
        "django run",
        "python manage.py runserver"
      ],
      answer: "python manage.py runserver" },
      { question: "What is the purpose of the Django ORM?",
      options: [
        "To handle URL routing",
        "To manage static files",
        "To provide an object-oriented way to interact with the database",
        "To create user interfaces"
      ],
      answer: "To provide an object-oriented way to interact with the database" },
      { question: "Which file is used to map URLs to specific views in a Django project?",
      options: [
        "views.py",
        "settings.py",
        "urls.py",
        "models.py"
      ],
      answer: "urls.py" },
      { question: "What command creates the database tables for the models defined in your apps?",
      options: [
        "python manage.py makemigrations",
        "python manage.py migrate",
        "python manage.py create_db",
        "python manage.py syncdb"
      ],
      answer: "python manage.py migrate" },
      { question: "In which project file do you register a new application?",
      options: [
        "urls.py",
        "wsgi.py",
        "manage.py",
        "settings.py"
      ],
      answer: "settings.py" },
      { question: "What feature provides a ready-to-use interface for administrators to manage site content?",
      options: [
        "The Django Shell",
        "The Django Template Engine",
        "The Django Admin",
        "The Django Forms Library"
      ],
      answer: "The Django Admin" },
      { question: "In a Django template, how do you correctly output the value of a variable `my_variable`?",
      options: [
        "{{ my_variable }}",
        "{% my_variable %}",
        "[[ my_variable ]]",
        "(( my_variable ))"
      ],
      answer: "{{ my_variable }}" }
  ]
};

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
    let quizName = quizType.charAt(0).toUpperCase() + quizType.slice(1);
    
    // Custom naming for display
    if (quizType === 'nextjs') {
        quizName = 'Next.js';
    } else if (quizType === 'git') {
        quizName = 'Git & GitHub';
    }

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