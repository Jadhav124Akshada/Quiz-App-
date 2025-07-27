// Global variables
let currentUser = ""
let isAdmin = false
let currentQuiz = null
let currentQuestionIndex = 0
let userAnswers = []
let quizTimer = null
let timeRemaining = 0
let timerEnabled = true

// Data storage (simulating database)
let quizData = {
  topics: [
    { id: "html", name: "HTML", code: "HTML001" },
    { id: "css", name: "CSS", code: "CSS001" },
    { id: "javascript", name: "JavaScript", code: "JS001" },
    { id: "react", name: "React", code: "REACT001" },
    { id: "python", name: "Python", code: "PY001" },
    { id: "cpp", name: "C++", code: "CPP001" },
    { id: "dsa", name: "Data Structures & Algorithms", code: "DSA001" },
    { id: "dbms", name: "Database Management", code: "DBMS001" },
  ],
  questions: {
    html: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          "HyperText Markup Language",
          "HyperText Management Language",
          "Home Tool Markup Language",
          "Hyper Transfer Markup Language",
        ],
        correct: 0,
        explanation:
          "HTML stands for HyperText Markup Language, which is the standard markup language for creating web pages.",
      },
      {
        id: 2,
        question: "Which HTML element is used for the largest heading?",
        options: ["<h6>", "<h1>", "<heading>", "<header>"],
        correct: 1,
        explanation: "The <h1> element represents the largest heading in HTML, with <h6> being the smallest.",
      },
      {
        id: 3,
        question: "What attribute is used to define the destination of a link?",
        options: ["href", "src", "link", "url"],
        correct: 0,
        explanation: "The href attribute specifies the URL of the page the link goes to.",
      },
      {
        id: 4,
        question: "Which element is used to create a line break?",
        options: ["<break>", "<br>", "<lb>", "<newline>"],
        correct: 1,
        explanation: "The <br> element produces a line break in text.",
      },
      {
        id: 5,
        question: "What is the correct HTML for creating a hyperlink?",
        options: [
          "<a url='http://example.com'>Link</a>",
          "<a href='http://example.com'>Link</a>",
          "<link href='http://example.com'>Link</link>",
          "<hyperlink>http://example.com</hyperlink>",
        ],
        correct: 1,
        explanation: "The correct syntax for creating a hyperlink is <a href='URL'>Link text</a>.",
      },
      {
        id: 6,
        question: "Which HTML element defines the title of a document?",
        options: ["<meta>", "<title>", "<head>", "<header>"],
        correct: 1,
        explanation: "The <title> element defines the title of the document, shown in the browser's title bar or tab.",
      },
      {
        id: 7,
        question: "What is the correct HTML element for inserting an image?",
        options: ["<image>", "<img>", "<picture>", "<src>"],
        correct: 1,
        explanation: "The <img> element is used to embed images in HTML documents.",
      },
      {
        id: 8,
        question: "Which attribute specifies the URL of an image?",
        options: ["href", "src", "url", "link"],
        correct: 1,
        explanation: "The src attribute specifies the path to the image file.",
      },
      {
        id: 9,
        question: "What does the alt attribute in an img tag specify?",
        options: ["Alternative text", "Alignment", "Animation", "Automatic loading"],
        correct: 0,
        explanation: "The alt attribute provides alternative text for an image if it cannot be displayed.",
      },
      {
        id: 10,
        question: "Which HTML element is used to define an unordered list?",
        options: ["<ol>", "<ul>", "<list>", "<li>"],
        correct: 1,
        explanation: "The <ul> element defines an unordered (bulleted) list.",
      },
    ],
    css: [
      {
        id: 1,
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        correct: 1,
        explanation: "CSS stands for Cascading Style Sheets, used for styling HTML documents.",
      },
      {
        id: 2,
        question: "Which property is used to change the background color?",
        options: ["color", "bgcolor", "background-color", "background"],
        correct: 2,
        explanation: "The background-color property sets the background color of an element.",
      },
      {
        id: 3,
        question: "How do you select an element with id 'header'?",
        options: [".header", "#header", "header", "*header"],
        correct: 1,
        explanation: "The # symbol is used to select elements by their ID in CSS.",
      },
      {
        id: 4,
        question: "Which property controls the text size?",
        options: ["font-size", "text-size", "font-style", "text-style"],
        correct: 0,
        explanation: "The font-size property controls the size of text.",
      },
      {
        id: 5,
        question: "How do you make text bold in CSS?",
        options: ["font-weight: bold", "text-style: bold", "font-style: bold", "text-weight: bold"],
        correct: 0,
        explanation: "The font-weight property with value 'bold' makes text bold.",
      },
      {
        id: 6,
        question: "Which property is used to change text color?",
        options: ["text-color", "font-color", "color", "foreground-color"],
        correct: 2,
        explanation: "The color property sets the color of text.",
      },
      {
        id: 7,
        question: "How do you center text horizontally?",
        options: ["text-align: center", "align: center", "text-center: true", "horizontal-align: center"],
        correct: 0,
        explanation: "The text-align property with value 'center' centers text horizontally.",
      },
      {
        id: 8,
        question: "Which property adds space inside an element?",
        options: ["margin", "padding", "spacing", "border"],
        correct: 1,
        explanation: "Padding adds space inside an element, between the content and border.",
      },
      {
        id: 9,
        question: "What is the default position value?",
        options: ["relative", "absolute", "static", "fixed"],
        correct: 2,
        explanation: "The default value of the position property is 'static'.",
      },
      {
        id: 10,
        question: "How do you hide an element?",
        options: ["visibility: none", "display: none", "hidden: true", "show: false"],
        correct: 1,
        explanation: "The display: none property completely hides an element.",
      },
    ],
    javascript: [
      {
        id: 1,
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        correct: 3,
        explanation: "JavaScript has three keywords for declaring variables: var, let, and const.",
      },
      {
        id: 2,
        question: "What is the correct way to write a JavaScript array?",
        options: [
          "var colors = 'red', 'green', 'blue'",
          "var colors = (1:'red', 2:'green', 3:'blue')",
          "var colors = ['red', 'green', 'blue']",
          "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
        ],
        correct: 2,
        explanation: "JavaScript arrays are written with square brackets and comma-separated values.",
      },
      {
        id: 3,
        question: "How do you write 'Hello World' in an alert box?",
        options: ["alertBox('Hello World')", "msg('Hello World')", "alert('Hello World')", "msgBox('Hello World')"],
        correct: 2,
        explanation: "The alert() function displays an alert dialog with the specified message.",
      },
      {
        id: 4,
        question: "Which operator is used to assign a value to a variable?",
        options: ["=", "==", "===", ":="],
        correct: 0,
        explanation: "The = operator is used for assignment in JavaScript.",
      },
      {
        id: 5,
        question: "What will the following code return: Boolean(10 > 9)?",
        options: ["true", "false", "NaN", "undefined"],
        correct: 0,
        explanation: "10 > 9 evaluates to true, and Boolean(true) returns true.",
      },
      {
        id: 6,
        question: "Which method can be used to find the length of a string?",
        options: ["length()", "size()", "length", "getSize()"],
        correct: 2,
        explanation: "The length property returns the number of characters in a string.",
      },
      {
        id: 7,
        question: "How do you round the number 7.25 to the nearest integer?",
        options: ["Math.round(7.25)", "Math.rnd(7.25)", "round(7.25)", "rnd(7.25)"],
        correct: 0,
        explanation: "Math.round() rounds a number to the nearest integer.",
      },
      {
        id: 8,
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ["onchange", "onclick", "onmouseclick", "onmouseover"],
        correct: 1,
        explanation: "The onclick event occurs when an element is clicked.",
      },
      {
        id: 9,
        question: "How do you declare a JavaScript function?",
        options: [
          "function myFunction() {}",
          "function = myFunction() {}",
          "declare function myFunction() {}",
          "def myFunction() {}",
        ],
        correct: 0,
        explanation: "Functions are declared using the function keyword followed by the function name.",
      },
      {
        id: 10,
        question: "What is the correct way to write a JavaScript object?",
        options: [
          "var person = {firstName:'John', lastName:'Doe'}",
          "var person = (firstName:'John', lastName:'Doe')",
          "var person = firstName = 'John', lastName = 'Doe'",
          "var person = [firstName:'John', lastName:'Doe']",
        ],
        correct: 0,
        explanation: "JavaScript objects are written with curly braces and key-value pairs.",
      },
    ],
    react: [
      {
        id: 1,
        question: "What is JSX?",
        options: ["JavaScript XML", "JavaScript Extension", "Java Syntax Extension", "JSON Syntax"],
        correct: 0,
        explanation: "JSX stands for JavaScript XML and allows you to write HTML-like syntax in JavaScript.",
      },
      {
        id: 2,
        question: "Which hook is used to manage state in functional components?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correct: 1,
        explanation: "useState is the hook used to add state to functional components.",
      },
      {
        id: 3,
        question: "How do you pass data from parent to child component?",
        options: ["Using state", "Using props", "Using context", "Using refs"],
        correct: 1,
        explanation: "Props are used to pass data from parent components to child components.",
      },
      {
        id: 4,
        question: "What is the virtual DOM?",
        options: [
          "A copy of the real DOM",
          "A JavaScript representation of the DOM",
          "A faster version of DOM",
          "All of the above",
        ],
        correct: 3,
        explanation:
          "The virtual DOM is a JavaScript representation of the real DOM that React uses for efficient updates.",
      },
      {
        id: 5,
        question: "Which method is used to render a React component?",
        options: ["ReactDOM.render()", "React.render()", "render()", "ReactDOM.display()"],
        correct: 0,
        explanation: "ReactDOM.render() is used to render React components to the DOM.",
      },
      {
        id: 6,
        question: "What is a React component?",
        options: ["A JavaScript function", "A JavaScript class", "A reusable piece of UI", "All of the above"],
        correct: 3,
        explanation: "React components can be functions or classes that return JSX and represent reusable UI pieces.",
      },
      {
        id: 7,
        question: "Which hook is used for side effects?",
        options: ["useState", "useEffect", "useContext", "useMemo"],
        correct: 1,
        explanation: "useEffect is used to perform side effects in functional components.",
      },
      {
        id: 8,
        question: "What is the purpose of keys in React lists?",
        options: ["Styling", "Identification", "Performance optimization", "Both B and C"],
        correct: 3,
        explanation: "Keys help React identify which items have changed, are added, or removed for better performance.",
      },
      {
        id: 9,
        question: "How do you handle events in React?",
        options: ["Using event handlers", "Using addEventListener", "Using jQuery", "Using vanilla JavaScript"],
        correct: 0,
        explanation: "React uses event handlers (like onClick) to handle events in a declarative way.",
      },
      {
        id: 10,
        question: "What is the difference between state and props?",
        options: [
          "State is mutable, props are immutable",
          "Props are mutable, state is immutable",
          "Both are mutable",
          "Both are immutable",
        ],
        correct: 0,
        explanation:
          "State is mutable and managed within a component, while props are immutable and passed from parent components.",
      },
    ],
    python: [
      {
        id: 1,
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "func", "define"],
        correct: 1,
        explanation: "The 'def' keyword is used to define functions in Python.",
      },
      {
        id: 2,
        question: "How do you create a comment in Python?",
        options: [
          "// This is a comment",
          "/* This is a comment */",
          "# This is a comment",
          "<!-- This is a comment -->",
        ],
        correct: 2,
        explanation: "Python uses the # symbol for single-line comments.",
      },
      {
        id: 3,
        question: "Which data type is ordered and changeable?",
        options: ["tuple", "set", "list", "dictionary"],
        correct: 2,
        explanation: "Lists in Python are ordered and changeable (mutable).",
      },
      {
        id: 4,
        question: "What is the output of print(2 ** 3)?",
        options: ["6", "8", "9", "23"],
        correct: 1,
        explanation: "The ** operator is used for exponentiation. 2 ** 3 = 2³ = 8.",
      },
      {
        id: 5,
        question: "Which method is used to add an item to the end of a list?",
        options: ["add()", "append()", "insert()", "push()"],
        correct: 1,
        explanation: "The append() method adds an item to the end of a list.",
      },
      {
        id: 6,
        question: "How do you get the length of a list?",
        options: ["length(list)", "len(list)", "list.length()", "size(list)"],
        correct: 1,
        explanation: "The len() function returns the number of items in a list.",
      },
      {
        id: 7,
        question: "Which operator is used for floor division?",
        options: ["/", "//", "%", "**"],
        correct: 1,
        explanation:
          "The // operator performs floor division, returning the largest integer less than or equal to the result.",
      },
      {
        id: 8,
        question: "What is the correct way to create a dictionary?",
        options: ["dict = {key: value}", "dict = [key: value]", "dict = (key: value)", "dict = <key: value>"],
        correct: 0,
        explanation: "Dictionaries in Python are created using curly braces with key-value pairs.",
      },
      {
        id: 9,
        question: "Which statement is used to exit a loop?",
        options: ["exit", "break", "stop", "end"],
        correct: 1,
        explanation: "The 'break' statement is used to exit/terminate a loop.",
      },
      {
        id: 10,
        question: "What does the range(5) function return?",
        options: ["[1, 2, 3, 4, 5]", "[0, 1, 2, 3, 4]", "[0, 1, 2, 3, 4, 5]", "5"],
        correct: 1,
        explanation: "range(5) returns a sequence of numbers from 0 to 4 (5 is excluded).",
      },
    ],
    cpp: [
      {
        id: 1,
        question: "Which header file is required for input/output operations?",
        options: ["<stdio.h>", "<iostream>", "<conio.h>", "<fstream>"],
        correct: 1,
        explanation: "The <iostream> header file is required for input/output operations in C++.",
      },
      {
        id: 2,
        question: "Which operator is used to allocate memory dynamically?",
        options: ["malloc", "alloc", "new", "create"],
        correct: 2,
        explanation: "The 'new' operator is used to allocate memory dynamically in C++.",
      },
      {
        id: 3,
        question: "What is the correct way to declare a pointer?",
        options: ["int *ptr;", "int ptr*;", "pointer int ptr;", "int &ptr;"],
        correct: 0,
        explanation: "Pointers are declared using the * symbol: int *ptr;",
      },
      {
        id: 4,
        question: "Which access specifier makes members accessible only within the class?",
        options: ["public", "private", "protected", "internal"],
        correct: 1,
        explanation: "Private members are accessible only within the same class.",
      },
      {
        id: 5,
        question: "What is function overloading?",
        options: [
          "Multiple functions with same name but different parameters",
          "One function calling another",
          "Recursive function calls",
          "Virtual functions",
        ],
        correct: 0,
        explanation: "Function overloading allows multiple functions with the same name but different parameters.",
      },
      {
        id: 6,
        question: "Which keyword is used to inherit from a base class?",
        options: ["extends", "inherits", ":", "->"],
        correct: 2,
        explanation: "The colon (:) is used to inherit from a base class in C++.",
      },
      {
        id: 7,
        question: "What is a constructor?",
        options: [
          "A function that destroys objects",
          "A function that creates objects",
          "A special function called when object is created",
          "A data type",
        ],
        correct: 2,
        explanation: "A constructor is a special function automatically called when an object is created.",
      },
      {
        id: 8,
        question: "Which loop is guaranteed to execute at least once?",
        options: ["for loop", "while loop", "do-while loop", "nested loop"],
        correct: 2,
        explanation: "The do-while loop executes the body at least once before checking the condition.",
      },
      {
        id: 9,
        question: "What does 'this' pointer refer to?",
        options: ["Previous object", "Next object", "Current object", "Global object"],
        correct: 2,
        explanation: "The 'this' pointer refers to the current object instance.",
      },
      {
        id: 10,
        question: "Which operator is used to access members of a class through a pointer?",
        options: [".", "->", "::", "*"],
        correct: 1,
        explanation: "The -> operator is used to access class members through a pointer.",
      },
    ],
    dsa: [
      {
        id: 1,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correct: 1,
        explanation: "Binary search has O(log n) time complexity as it divides the search space in half each time.",
      },
      {
        id: 2,
        question: "Which data structure uses LIFO principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correct: 1,
        explanation: "Stack follows Last In First Out (LIFO) principle.",
      },
      {
        id: 3,
        question: "What is the worst-case time complexity of Quick Sort?",
        options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
        correct: 1,
        explanation:
          "Quick Sort has O(n²) worst-case time complexity when the pivot is always the smallest or largest element.",
      },
      {
        id: 4,
        question: "Which traversal visits the root node first?",
        options: ["Inorder", "Preorder", "Postorder", "Level order"],
        correct: 1,
        explanation: "Preorder traversal visits the root node first, then left subtree, then right subtree.",
      },
      {
        id: 5,
        question: "What is a hash collision?",
        options: [
          "When hash function returns null",
          "When two keys map to same hash value",
          "When hash table is full",
          "When hash function fails",
        ],
        correct: 1,
        explanation: "A hash collision occurs when two different keys produce the same hash value.",
      },
      {
        id: 6,
        question: "Which algorithm is used to find shortest path in weighted graph?",
        options: ["BFS", "DFS", "Dijkstra's", "Kruskal's"],
        correct: 2,
        explanation:
          "Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph.",
      },
      {
        id: 7,
        question: "What is the space complexity of merge sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct: 2,
        explanation: "Merge sort requires O(n) additional space for the temporary arrays used during merging.",
      },
      {
        id: 8,
        question: "Which data structure is used in BFS traversal?",
        options: ["Stack", "Queue", "Priority Queue", "Deque"],
        correct: 1,
        explanation: "BFS (Breadth-First Search) uses a queue to keep track of vertices to visit.",
      },
      {
        id: 9,
        question: "What is a balanced binary tree?",
        options: [
          "Tree with equal left and right subtrees",
          "Tree where height difference between subtrees is at most 1",
          "Tree with same number of nodes in each level",
          "Complete binary tree",
        ],
        correct: 1,
        explanation:
          "A balanced binary tree has height difference of at most 1 between left and right subtrees for every node.",
      },
      {
        id: 10,
        question: "Which sorting algorithm is stable?",
        options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
        correct: 2,
        explanation: "Merge Sort is stable, meaning it maintains the relative order of equal elements.",
      },
    ],
    dbms: [
      {
        id: 1,
        question: "What does ACID stand for in database transactions?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Accuracy, Consistency, Integrity, Durability",
          "Atomicity, Correctness, Isolation, Durability",
          "Accuracy, Correctness, Integrity, Dependability",
        ],
        correct: 0,
        explanation:
          "ACID stands for Atomicity, Consistency, Isolation, and Durability - the four key properties of database transactions.",
      },
      {
        id: 2,
        question: "Which SQL command is used to retrieve data?",
        options: ["GET", "FETCH", "SELECT", "RETRIEVE"],
        correct: 2,
        explanation: "SELECT is the SQL command used to retrieve data from database tables.",
      },
      {
        id: 3,
        question: "What is a primary key?",
        options: [
          "A key that can be null",
          "A key that uniquely identifies each record",
          "A key that references another table",
          "A key used for indexing",
        ],
        correct: 1,
        explanation: "A primary key uniquely identifies each record in a table and cannot be null.",
      },
      {
        id: 4,
        question: "Which normal form eliminates transitive dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correct: 2,
        explanation: "Third Normal Form (3NF) eliminates transitive dependencies.",
      },
      {
        id: 5,
        question: "What is a foreign key?",
        options: [
          "A key from another database",
          "A key that references primary key of another table",
          "A key that is not used",
          "A backup key",
        ],
        correct: 1,
        explanation:
          "A foreign key is a field that references the primary key of another table, establishing a link between tables.",
      },
      {
        id: 6,
        question: "Which JOIN returns all records from both tables?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
        correct: 3,
        explanation: "FULL OUTER JOIN returns all records from both tables, with NULLs where there are no matches.",
      },
      {
        id: 7,
        question: "What is database normalization?",
        options: [
          "Making database faster",
          "Organizing data to reduce redundancy",
          "Creating backups",
          "Encrypting data",
        ],
        correct: 1,
        explanation:
          "Database normalization is the process of organizing data to reduce redundancy and improve data integrity.",
      },
      {
        id: 8,
        question: "Which command is used to modify existing data?",
        options: ["ALTER", "UPDATE", "MODIFY", "CHANGE"],
        correct: 1,
        explanation: "UPDATE command is used to modify existing data in database tables.",
      },
      {
        id: 9,
        question: "What is an index in database?",
        options: [
          "A table of contents",
          "A data structure that improves query performance",
          "A backup mechanism",
          "A security feature",
        ],
        correct: 1,
        explanation: "An index is a data structure that improves the speed of data retrieval operations on a table.",
      },
      {
        id: 10,
        question: "Which isolation level prevents dirty reads?",
        options: ["READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"],
        correct: 1,
        explanation: "READ COMMITTED isolation level prevents dirty reads by ensuring only committed data is read.",
      },
    ],
  },
  settings: {
    defaultTimer: 10,
    questionsPerQuiz: 10,
    passingScore: 60,
  },
  leaderboard: [],
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage()
  initializeTheme()

  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  switch (currentPage) {
    case "index.html":
    case "":
      initializeLogin()
      break
    case "dashboard.html":
      initializeDashboard()
      break
    case "quiz.html":
      initializeQuiz()
      break
    case "admin.html":
      initializeAdmin()
      break
  }
})

// Theme management
function initializeTheme() {
  const savedTheme = localStorage.getItem("quizTheme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)
  updateThemeButton(savedTheme)
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("quizTheme", newTheme)
  updateThemeButton(newTheme)
}

function updateThemeButton(theme) {
  const themeButton = document.getElementById("themeToggle")
  if (themeButton) {
    themeButton.textContent = theme === "dark" ? "☀️" : "🌙"
  }
}

// Storage management
function saveToStorage() {
  localStorage.setItem("quizAppData", JSON.stringify(quizData))
}

function loadFromStorage() {
  const stored = localStorage.getItem("quizAppData")
  if (stored) {
    try {
      quizData = JSON.parse(stored)
    } catch (e) {
      console.error("Error loading data from storage:", e)
    }
  }
}

// Login page
function initializeLogin() {
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }
}

function handleLogin(e) {
  e.preventDefault()

  const userName = document.getElementById("userName").value.trim()
  const quizCode = document.getElementById("quizCode").value.trim()

  if (!userName || !quizCode) {
    alert("Please fill in all fields")
    return
  }

  currentUser = userName

  if (quizCode.toLowerCase() === "adminmode") {
    isAdmin = true
    sessionStorage.setItem("currentUser", userName)
    sessionStorage.setItem("isAdmin", "true")
    window.location.href = "admin.html"
  } else {
    // Check if quiz code is valid
    const topic = quizData.topics.find((t) => t.code === quizCode.toUpperCase())
    if (topic) {
      isAdmin = false
      sessionStorage.setItem("currentUser", userName)
      sessionStorage.setItem("isAdmin", "false")
      sessionStorage.setItem("selectedTopic", topic.id)
      window.location.href = "dashboard.html"
    } else {
      alert("Invalid quiz code. Please try again.")
    }
  }
}

// Dashboard page
function initializeDashboard() {
  currentUser = sessionStorage.getItem("currentUser")
  isAdmin = sessionStorage.getItem("isAdmin") === "true"

  if (!currentUser) {
    window.location.href = "index.html"
    return
  }

  document.getElementById("welcomeUser").textContent = `Welcome, ${currentUser}!`
  loadTopics()
}

function loadTopics() {
  const topicsList = document.getElementById("topicsList")
  topicsList.innerHTML = ""

  quizData.topics.forEach((topic) => {
    const topicCard = document.createElement("div")
    topicCard.className = "topic-card"
    topicCard.innerHTML = `
      <h3>${topic.name}</h3>
      <p>Code: ${topic.code}</p>
      <p>${quizData.questions[topic.id]?.length || 0} Questions</p>
    `
    topicCard.addEventListener("click", () => startQuiz(topic.id))
    topicsList.appendChild(topicCard)
  })
}

function startQuiz(topicId) {
  sessionStorage.setItem("selectedTopic", topicId)
  window.location.href = "quiz.html"
}

function showLeaderboard() {
  const modal = document.getElementById("leaderboardModal")
  const content = document.getElementById("leaderboardContent")

  // Sort leaderboard by score
  const sortedLeaderboard = [...quizData.leaderboard].sort((a, b) => b.score - a.score)

  let html =
    '<table class="leaderboard-table"><tr><th>Rank</th><th>Name</th><th>Topic</th><th>Score</th><th>Time</th></tr>'

  sortedLeaderboard.forEach((entry, index) => {
    html += `<tr>
      <td>${index + 1}</td>
      <td>${entry.name}</td>
      <td>${entry.topic}</td>
      <td>${entry.score}%</td>
      <td>${entry.time}</td>
    </tr>`
  })

  html += "</table>"
  content.innerHTML = html
  modal.style.display = "block"
}

function closeLeaderboard() {
  document.getElementById("leaderboardModal").style.display = "none"
}

// Quiz page
function initializeQuiz() {
  currentUser = sessionStorage.getItem("currentUser")
  const selectedTopic = sessionStorage.getItem("selectedTopic")

  if (!currentUser || !selectedTopic) {
    window.location.href = "index.html"
    return
  }

  const topic = quizData.topics.find((t) => t.id === selectedTopic)
  if (!topic) {
    alert("Invalid topic selected")
    window.location.href = "dashboard.html"
    return
  }

  document.getElementById("userName").textContent = currentUser
  document.getElementById("quizTitle").textContent = `${topic.name} Quiz`

  currentQuiz = {
    topic: topic,
    questions: shuffleArray([...quizData.questions[selectedTopic]]).slice(0, quizData.settings.questionsPerQuiz),
    startTime: new Date(),
  }

  userAnswers = new Array(currentQuiz.questions.length).fill(null)
  currentQuestionIndex = 0

  document.getElementById("totalQuestions").textContent = currentQuiz.questions.length

  setupTimer()
  displayQuestion()
}

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function setupTimer() {
  timeRemaining = quizData.settings.defaultTimer * 60 // Convert to seconds
  updateTimerDisplay()

  if (timerEnabled) {
    quizTimer = setInterval(() => {
      timeRemaining--
      updateTimerDisplay()

      if (timeRemaining <= 60) {
        document.querySelector(".timer-container").classList.add("timer-warning")
      }

      if (timeRemaining <= 0) {
        clearInterval(quizTimer)
        submitQuiz()
      }
    }, 1000)
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  document.getElementById("timer").textContent =
    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

function toggleTimer() {
  const timerToggle = document.getElementById("timerToggle")

  if (timerEnabled) {
    clearInterval(quizTimer)
    timerEnabled = false
    timerToggle.textContent = "Enable Timer"
    document.getElementById("timer").textContent = "Disabled"
  } else {
    setupTimer()
    timerEnabled = true
    timerToggle.textContent = "Disable Timer"
  }
}

function displayQuestion() {
  const question = currentQuiz.questions[currentQuestionIndex]

  document.getElementById("questionNumber").textContent =
    `Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}`
  document.getElementById("questionText").textContent = question.question

  const optionsContainer = document.getElementById("optionsContainer")
  optionsContainer.innerHTML = ""

  question.options.forEach((option, index) => {
    const optionDiv = document.createElement("div")
    optionDiv.className = "option"
    optionDiv.innerHTML = `
      <input type="radio" name="answer" value="${index}" id="option${index}" ${userAnswers[currentQuestionIndex] === index ? "checked" : ""}>
      <label for="option${index}">${option}</label>
    `
    optionDiv.addEventListener("click", () => selectOption(index))
    optionsContainer.appendChild(optionDiv)
  })

  updateProgress()
  updateNavigationButtons()
  updateScore()
}

function selectOption(optionIndex) {
  userAnswers[currentQuestionIndex] = optionIndex

  // Update radio button
  document.getElementById(`option${optionIndex}`).checked = true

  // Update visual selection
  document.querySelectorAll(".option").forEach((opt) => opt.classList.remove("selected"))
  document.querySelectorAll(".option")[optionIndex].classList.add("selected")

  updateScore()
}

function updateProgress() {
  const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100
  document.getElementById("progressFill").style.width = `${progress}%`
}

function updateNavigationButtons() {
  document.getElementById("prevBtn").disabled = currentQuestionIndex === 0

  if (currentQuestionIndex === currentQuiz.questions.length - 1) {
    document.getElementById("nextBtn").style.display = "none"
    document.getElementById("submitBtn").style.display = "inline-block"
  } else {
    document.getElementById("nextBtn").style.display = "inline-block"
    document.getElementById("submitBtn").style.display = "none"
  }
}

function updateScore() {
  let correctAnswers = 0
  userAnswers.forEach((answer, index) => {
    if (answer !== null && answer === currentQuiz.questions[index].correct) {
      correctAnswers++
    }
  })
  document.getElementById("currentScore").textContent = correctAnswers
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--
    displayQuestion()
  }
}

function nextQuestion() {
  if (currentQuestionIndex < currentQuiz.questions.length - 1) {
    currentQuestionIndex++
    displayQuestion()
  }
}

function submitQuiz() {
  clearInterval(quizTimer)

  let correctAnswers = 0
  userAnswers.forEach((answer, index) => {
    if (answer !== null && answer === currentQuiz.questions[index].correct) {
      correctAnswers++
    }
  })

  const score = Math.round((correctAnswers / currentQuiz.questions.length) * 100)
  const endTime = new Date()
  const timeTaken = Math.round((endTime - currentQuiz.startTime) / 1000)

  // Add to leaderboard
  quizData.leaderboard.push({
    name: currentUser,
    topic: currentQuiz.topic.name,
    score: score,
    time: formatTime(timeTaken),
    date: new Date().toLocaleDateString(),
  })

  saveToStorage()

  showResults(score, correctAnswers, timeTaken)
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

function showResults(score, correctAnswers, timeTaken) {
  const modal = document.getElementById("resultsModal")
  const content = document.getElementById("resultsContent")

  let performance = ""
  if (score >= 90) performance = "Excellent! 🎉"
  else if (score >= 75) performance = "Great job! 👏"
  else if (score >= 60) performance = "Good work! 👍"
  else performance = "Keep practicing! 💪"

  content.innerHTML = `
    <div class="score-display-large">
      <h3>Your Score: ${score}%</h3>
      <p>${performance}</p>
    </div>
    <div class="score-details">
      <p><strong>Correct Answers:</strong> ${correctAnswers} out of ${currentQuiz.questions.length}</p>
      <p><strong>Time Taken:</strong> ${formatTime(timeTaken)}</p>
      <p><strong>Topic:</strong> ${currentQuiz.topic.name}</p>
    </div>
  `

  modal.style.display = "block"
}

function showDetailedResults() {
  const modal = document.getElementById("detailedResultsModal")
  const content = document.getElementById("detailedResultsContent")

  let html = ""
  currentQuiz.questions.forEach((question, index) => {
    const userAnswer = userAnswers[index]
    const isCorrect = userAnswer === question.correct

    html += `
      <div class="result-item ${isCorrect ? "correct" : "incorrect"}">
        <div class="result-question">Q${index + 1}: ${question.question}</div>
        <div class="result-answer">
          <strong>Your Answer:</strong> ${userAnswer !== null ? question.options[userAnswer] : "Not answered"}
        </div>
        <div class="result-answer">
          <strong>Correct Answer:</strong> ${question.options[question.correct]}
        </div>
        <div class="result-explanation">
          <strong>Explanation:</strong> ${question.explanation}
        </div>
      </div>
    `
  })

  content.innerHTML = html
  modal.style.display = "block"
}

function closeDetailedResults() {
  document.getElementById("detailedResultsModal").style.display = "none"
}

function goToDashboard() {
  window.location.href = "dashboard.html"
}

// Admin page
function initializeAdmin() {
  currentUser = sessionStorage.getItem("currentUser")
  isAdmin = sessionStorage.getItem("isAdmin") === "true"

  if (!currentUser || !isAdmin) {
    window.location.href = "index.html"
    return
  }

  loadAdminData()
}

function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Remove active class from all buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Show selected tab
  document.getElementById(`${tabName}Tab`).classList.add("active")
  document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add("active")

  if (tabName === "topics") {
    loadAdminTopics()
  } else if (tabName === "questions") {
    loadTopicSelect()
  } else if (tabName === "settings") {
    loadSettings()
  }
}

function loadAdminData() {
  loadAdminTopics()
  loadTopicSelect()
  loadSettings()
}

function loadAdminTopics() {
  const topicsList = document.getElementById("topicsList")
  topicsList.innerHTML = ""

  quizData.topics.forEach((topic) => {
    const topicItem = document.createElement("div")
    topicItem.className = "topic-item"
    topicItem.innerHTML = `
      <div>
        <strong>${topic.name}</strong> (${topic.code})
        <br><small>${quizData.questions[topic.id]?.length || 0} questions</small>
      </div>
      <button onclick="deleteTopic('${topic.id}')" class="btn-danger">Delete</button>
    `
    topicsList.appendChild(topicItem)
  })
}

function addTopic() {
  const name = document.getElementById("newTopicName").value.trim()
  const code = document.getElementById("newTopicCode").value.trim().toUpperCase()

  if (!name || !code) {
    alert("Please fill in all fields")
    return
  }

  // Check if topic already exists
  if (quizData.topics.find((t) => t.id === name.toLowerCase().replace(/\s+/g, "") || t.code === code)) {
    alert("Topic or code already exists")
    return
  }

  const topicId = name.toLowerCase().replace(/\s+/g, "")
  quizData.topics.push({
    id: topicId,
    name: name,
    code: code,
  })

  quizData.questions[topicId] = []

  document.getElementById("newTopicName").value = ""
  document.getElementById("newTopicCode").value = ""

  saveToStorage()
  loadAdminTopics()
  loadTopicSelect()

  alert("Topic added successfully!")
}

function deleteTopic(topicId) {
  if (confirm("Are you sure you want to delete this topic and all its questions?")) {
    quizData.topics = quizData.topics.filter((t) => t.id !== topicId)
    delete quizData.questions[topicId]

    saveToStorage()
    loadAdminTopics()
    loadTopicSelect()

    alert("Topic deleted successfully!")
  }
}

function loadTopicSelect() {
  const select = document.getElementById("topicSelect")
  select.innerHTML = '<option value="">Select Topic</option>'

  quizData.topics.forEach((topic) => {
    const option = document.createElement("option")
    option.value = topic.id
    option.textContent = topic.name
    select.appendChild(option)
  })
}

function loadQuestions() {
  const topicId = document.getElementById("topicSelect").value
  const questionsList = document.getElementById("questionsList")

  if (!topicId) {
    questionsList.innerHTML = ""
    return
  }

  const questions = quizData.questions[topicId] || []
  questionsList.innerHTML = ""

  questions.forEach((question, index) => {
    const questionItem = document.createElement("div")
    questionItem.className = "question-item"
    questionItem.innerHTML = `
      <div>
        <strong>Q${index + 1}:</strong> ${question.question}
        <br><small>Correct: ${question.options[question.correct]}</small>
      </div>
      <button onclick="deleteQuestion('${topicId}', ${question.id})" class="btn-danger">Delete</button>
    `
    questionsList.appendChild(questionItem)
  })
}

function showAddQuestionForm() {
  const topicId = document.getElementById("topicSelect").value
  if (!topicId) {
    alert("Please select a topic first")
    return
  }

  document.getElementById("addQuestionForm").style.display = "block"
}

function cancelAddQuestion() {
  document.getElementById("addQuestionForm").style.display = "none"
  clearQuestionForm()
}

function clearQuestionForm() {
  document.getElementById("questionText").value = ""
  document.getElementById("option1").value = ""
  document.getElementById("option2").value = ""
  document.getElementById("option3").value = ""
  document.getElementById("option4").value = ""
  document.getElementById("correctAnswer").value = ""
  document.getElementById("explanation").value = ""
}

function saveQuestion() {
  const topicId = document.getElementById("topicSelect").value
  const questionText = document.getElementById("questionText").value.trim()
  const option1 = document.getElementById("option1").value.trim()
  const option2 = document.getElementById("option2").value.trim()
  const option3 = document.getElementById("option3").value.trim()
  const option4 = document.getElementById("option4").value.trim()
  const correctAnswer = Number.parseInt(document.getElementById("correctAnswer").value)
  const explanation = document.getElementById("explanation").value.trim()

  if (!questionText || !option1 || !option2 || !option3 || !option4 || isNaN(correctAnswer) || !explanation) {
    alert("Please fill in all fields")
    return
  }

  const newQuestion = {
    id: Date.now(),
    question: questionText,
    options: [option1, option2, option3, option4],
    correct: correctAnswer,
    explanation: explanation,
  }

  if (!quizData.questions[topicId]) {
    quizData.questions[topicId] = []
  }

  quizData.questions[topicId].push(newQuestion)

  saveToStorage()
  loadQuestions()
  cancelAddQuestion()

  alert("Question added successfully!")
}

function deleteQuestion(topicId, questionId) {
  if (confirm("Are you sure you want to delete this question?")) {
    quizData.questions[topicId] = quizData.questions[topicId].filter((q) => q.id !== questionId)

    saveToStorage()
    loadQuestions()

    alert("Question deleted successfully!")
  }
}

function loadSettings() {
  document.getElementById("defaultTimer").value = quizData.settings.defaultTimer
  document.getElementById("questionsPerQuiz").value = quizData.settings.questionsPerQuiz
  document.getElementById("passingScore").value = quizData.settings.passingScore
}

function saveSettings() {
  quizData.settings.defaultTimer = Number.parseInt(document.getElementById("defaultTimer").value)
  quizData.settings.questionsPerQuiz = Number.parseInt(document.getElementById("questionsPerQuiz").value)
  quizData.settings.passingScore = Number.parseInt(document.getElementById("passingScore").value)

  saveToStorage()
  alert("Settings saved successfully!")
}

function logout() {
  sessionStorage.clear()
  window.location.href = "index.html"
}

// Close modals when clicking outside
window.onclick = (event) => {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none"
    }
  })
}
