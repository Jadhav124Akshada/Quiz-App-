// /quiz-app/questions.js

// I've removed duplicate/very similar questions for a cleaner quiz experience.
// The data is now in a single, scalable object.
const quizzes = {
  html: {
    title: "HTML",
    icon: "📜",
    questions: [
      {
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "HyperText Management Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"],
        answer: "HyperText Markup Language"
      },
      {
        question: "Which attribute is used to define the destination of a link in an HTML `<a>` tag?",
        options: ["href", "src", "link", "dest"],
        answer: "href"
      },
      {
        question: "What is the purpose of the `<head>` element in an HTML document?",
        options: ["To define the main content.", "To contain metadata and links to external resources.", "To display the main heading.", "To create the page's footer."],
        answer: "To contain metadata and links to external resources."
      },
      {
        question: "Which attribute specifies an alternate text for an image if it cannot be displayed?",
        options: ["title", "src", "alt", "description"],
        answer: "alt"
      },
      {
        question: "Which input attribute specifies that a field must be filled out before submitting?",
        options: ["required", "placeholder", "validate", "mandatory"],
        answer: "required"
      },
      {
        question: "Which HTML element is used to define a paragraph?",
        options: ["<p>", "<par>", "<div>", "<span>"],
        answer: "<p>"
      },
      {
        question: "What is the correct HTML for inserting an audio file?",
        options: ["<audio src='sound.mp3'></audio>", "<sound src='sound.mp3'>", "<music file='sound.mp3'>", "<audio link='sound.mp3'>"],
        answer: "<audio src='sound.mp3'></audio>"
      },
      {
        question: "Which HTML element is used to define an ordered list?",
        options: ["<ul>", "<li>", "<ol>", "<list>"],
        answer: "<ol>"
      },
      {
        question: "Which element is a container for all the visible content on a webpage?",
        options: ["<body>", "<head>", "<main>", "<content>"],
        answer: "<body>"
      },
      {
        question: "How do you add a comment in an HTML file?",
        options: ["<!-- This is a comment -->", "// This is a comment", "/* This is a comment */", "# This is a comment"],
        answer: "<!-- This is a comment -->"
      }
    ]
  },
  css: {
    title: "CSS",
    icon: "🎨",
    questions: [
      {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets"
      },
      {
        question: "Which CSS syntax is correct for selecting an element with the class 'example'?",
        options: [".example { }", "#example { }", "example { }", "*example { }"],
        answer: ".example { }"
      },
      {
        question: "Which property is used to change the background color of an element?",
        options: ["color", "bgcolor", "background-color", "background"],
        answer: "background-color"
      },
      {
        question: "Which CSS property is used to change the font size of text?",
        options: ["font-style", "font-size", "text-size", "text-style"],
        answer: "font-size"
      },
      {
        question: "How do you apply a background image in CSS?",
        options: ["background-image: url('img.jpg');", "background: url('img.jpg');", "image: url('img.jpg');", "bg-image: url('img.jpg');"],
        answer: "background-image: url('img.jpg');"
      },
      {
        question: "Which property controls the space between an element's content and its border?",
        options: ["margin", "padding", "spacing", "border-spacing"],
        answer: "padding"
      },
      {
        question: "How do you select an element with the id 'header' in CSS?",
        options: ["#header", ".header", "header", "*header"],
        answer: "#header"
      },
      {
        question: "What is the default value of the `position` property in CSS?",
        options: ["static", "relative", "absolute", "fixed"],
        answer: "static"
      },
      {
        question: "Which property is used to make text bold in CSS?",
        options: ["font-weight: bold;", "text-style: bold;", "font-style: bold;", "text-decoration: bold;"],
        answer: "font-weight: bold;"
      },
      {
        question: "How can you make a list display with no bullets or numbers?",
        options: ["list-style-type: none;", "list-style: none;", "bullet-style: none;", "list-decoration: none;"],
        answer: "list-style-type: none;"
      }
    ]
  },
  js: {
    title: "JavaScript",
    icon: "⚡",
    questions: [
      {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        answer: "All of the above"
      },
      {
        question: "How do you add an item to the end of an array named `myArray`?",
        options: ["myArray.push(item);", "myArray.add(item);", "myArray.append(item);", "myArray.insertEnd(item);"],
        answer: "myArray.push(item);"
      },
      {
        question: "Which operator is used for strict equality (checks value and type)?",
        options: ["==", "===", "=", "!=="],
        answer: "==="
      },
      {
        question: "What is the output of `5 + '5'` in JavaScript?",
        options: ["'55'", "10", "Error", "NaN"],
        answer: "'55'"
      },
      {
        question: "Which method is used to remove the last element from an array?",
        options: ["pop()", "shift()", "slice()", "removeLast()"],
        answer: "pop()"
      },
      {
        question: "Which statement is used to stop the execution of a loop or switch statement?",
        options: ["break", "stop", "exit", "continue"],
        answer: "break"
      },
      {
        question: "How do you create an empty object in JavaScript?",
        options: ["let obj = {};", "let obj = [];", "let obj = new Object;", "Both A and C"],
        answer: "Both A and C"
      },
      {
        question: "What does the `this` keyword refer to inside an object's method?",
        options: ["The global window object", "The function itself", "The object that the method belongs to", "The parent element in the DOM"],
        answer: "The object that the method belongs to"
      },
      {
        question: "How do you write a single-line comment in JavaScript?",
        options: ["// comment", "<!-- comment -->", "/* comment */", "# comment"],
        answer: "// comment"
      },
      {
        question: "Which built-in method converts a string to all lowercase letters?",
        options: ["toLowerCase()", "lowerCase()", "convertToLower()", "string.lower()"],
        answer: "toLowerCase()"
      }
    ]
  }
};

export default quizzes;