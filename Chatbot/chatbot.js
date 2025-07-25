function getBotReply(msg) {
  msg = msg.toLowerCase();

  
  if (msg.includes("about") || msg.includes("what is") || msg.includes("overview")) {
    return "🤖 Quiz-App is an open-source quiz platform to learn Computer Science topics through fun and interactive quizzes!";
  }

  
  if (msg.includes("topics") || msg.includes("quizzes") || msg.includes("subjects") || msg.includes("categories")) {
    return "📚 Quiz Topics:\n• DSA\n• SQL & DBMS\n• Operating Systems\n• Computer Networks\n• OOPs\n• Python, Java\n• Web (HTML, CSS, JS)\n• Git & GitHub\n• More coming soon!";
  }

  
  if (msg.includes("rules") || msg.includes("guidelines") || msg.includes("instructions") || msg.includes("dos") || msg.includes("donts")) {
    return "📌 Quiz Guidelines:\n• Don’t refresh the page mid-quiz\n• Finish within the timer (if enabled)\n• Choose wisely — no negative marking unless stated\n• No skipping unless allowed\n• Submit to see score";
  }

  
  if (msg.includes("how to") && msg.includes("quiz") && (msg.includes("start") || msg.includes("begin") || msg.includes("play") || msg.includes("participate"))) {
    return "📝 How to Start:\n1. Pick a topic\n2. Click 'Start Quiz'\n3. Select correct answers\n4. Click 'Submit' to see your score";
  }

  
  if (msg.includes("setup") || msg.includes("install") || msg.includes("start locally") || msg.includes("run app")) {
    return "🛠️ Local Setup:\n1. Fork & clone the repo\n2. Run `npm install`\n3. Run `npm start`\n4. Visit `http://localhost:3000` in browser";
  }

  
  if (msg.includes("contribute") || msg.includes("help contribute") || msg.includes("edit code")) {
    return "🤝 Contribution Guide:\n• Fork the repo\n• Create a new branch\n• Make your changes (UI, features, questions)\n• Push and raise a Pull Request (PR)\n• Look for `good first issue` in Issues tab";
  }

  
  if (msg.includes("pull request") || msg.includes("pr") || msg.includes("github") || msg.includes("merge")) {
    return "🔁 Submitting a PR:\n1. Fork the repo\n2. Clone locally\n3. Create a branch\n4. Make changes\n5. Push to your fork\n6. Open a PR to `main` branch";
  }

  
  if (msg.includes("design") || msg.includes("ui") || msg.includes("frontend")) {
    return "🎨 Yes! You can contribute to UI/UX — update layout, colors, accessibility, or animations to improve user experience.";
  }

  
  if (msg.includes("timer") || msg.includes("time limit") || msg.includes("negative marking")) {
    return "⏱️ Timer & Marking:\n• Some quizzes may be timed\n• No negative marking unless clearly stated\n• Time and score rules vary per topic";
  }

  
  if (msg.includes("faq") || msg.includes("frequent") || msg.includes("questions") || msg.includes("doubts")) {
    return "📖 FAQs:\n• How to run the app?\n• How to start a quiz?\n• Can I contribute?\n• Is there a timer?\n• Is it mobile supported?\n• Can I suggest quiz topics?";
  }

  
  if (msg.includes("mobile") || msg.includes("phone") || msg.includes("tablet")) {
    return "📱 Yes, Quiz-App is responsive and works on all mobile and tablet devices!";
  }

  
  if (msg.includes("progress") || msg.includes("track score") || msg.includes("history")) {
    return "📊 Currently, progress tracking is not supported. Each quiz shows your result once submitted.";
  }

  
  if (msg.includes("reset") || msg.includes("clear answers") || msg.includes("retake")) {
    return "🔄 You can retake the quiz by refreshing the page or selecting the topic again. There’s no reset button yet.";
  }

  
  if (msg.includes("how") && msg.includes("questions selected")) {
    return "🎯 Questions are selected randomly from a pool for each topic. You may get different questions on each attempt.";
  }

  
  if (msg.includes("suggest") || msg.includes("request") || msg.includes("add topic")) {
    return "📝 Want to suggest a topic? Open an issue on GitHub with your idea. We love new contributions!";
  }

  
  if (msg.includes("mentor") || msg.includes("contact") || msg.includes("ask help") || msg.includes("community")) {
    return "👨‍🏫 For help, post in GitHub Discussions or join our community Discord. Tag maintainers if urgent.";
  }

  
  if (msg.includes("license") || msg.includes("usage rights")) {
    return "📝 Quiz-App is licensed under the MIT License. You are free to use, modify, and distribute it with attribution.";
  }

  
  if (msg.includes("tech stack") || msg.includes("technology") || msg.includes("built with")) {
    return "🧱 Tech Stack:\n• React (Frontend)\n• Node.js / Express (Backend)\n• MongoDB (if backend is used)\n• HTML/CSS\n• Git + GitHub";
  }

  
  if (msg.includes("feedback") || msg.includes("suggestions") || msg.includes("improvements")) {  
      return "📝 We value your feedback! Open an issue on GitHub to share your ideas or report bugs.";}

  
  return "🤔 I didn’t understand. You can try asking things like:\n• What is Quiz-App?\n• What topics are there?\n• How do I start a quiz?\n• Can I contribute?\n• Are there any rules?";
}


function handleChat() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  displayMessage(message, "user");
  input.value = "";

  const reply = getBotReply(message);
  setTimeout(() => {
    displayMessage(reply, "bot");
  }, 400);
}


function displayMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `bubble ${sender}`;

  if (sender === "bot") {
    const avatar = document.createElement("img");
    avatar.src = "chatbot-avatar.jpg"; 
    avatar.alt = "Bot Avatar";
    avatar.className = "avatar";
    msgDiv.appendChild(avatar);
  }

  const textNode = document.createElement("span");
  textNode.textContent = text;
  msgDiv.appendChild(textNode);

  document.getElementById("messages").appendChild(msgDiv);
}


window.onload = function () {
  displayMessage("👋 Hello! I'm QuizzyBot — your guide to the Quiz-App. Ask me anything about quizzes, topics, setup, or how to contribute. Let's get started!", "bot");
};



function toggleExamples() {
  const ex = document.getElementById("examples");
  ex.style.display = ex.style.display === "none" ? "block" : "none";
}

function fillPrompt(li) {
  document.getElementById("userInput").value = li.textContent;
  handleChat();
}

document.getElementById("themeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark");
  this.textContent = document.body.classList.contains("dark")
    ? "☀️ Switch to Light Mode"
    : "🌙 Switch to Dark Mode";
});

function clearChat() {
  document.getElementById("messages").innerHTML = "";
  displayMessage("🧠 Chat cleared! Ask me anything about Quiz-App.", "bot");
}
document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    handleChat();
  }
});







