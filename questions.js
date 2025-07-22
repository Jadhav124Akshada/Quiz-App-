/**
 * questions.js
 * This file stores all the quiz questions in a single global variable.
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
  ]
};
