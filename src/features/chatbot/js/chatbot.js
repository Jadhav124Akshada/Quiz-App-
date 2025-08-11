class ChatBot {
    constructor() {
        this.messages = document.getElementById('chatMessages');
        this.input = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendMessage');
        this.minimizeButton = document.querySelector('.minimize-btn');
        this.suggestionChips = document.querySelectorAll('.chip');
        
        this.setupEventListeners();
        this.adjustTextareaHeight();
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        this.input.addEventListener('input', () => this.adjustTextareaHeight());
        this.minimizeButton.addEventListener('click', () => this.minimizeChat());
        this.suggestionChips.forEach(chip => {
            chip.addEventListener('click', () => this.useSuggestion(chip.textContent));
        });
    }

    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.input.value = '';
        this.adjustTextareaHeight();
        this.processMessage(message);
    }

    addMessage(content, sender, delay = 0) {
        setTimeout(() => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            messageContent.textContent = content;
            
            const messageTime = document.createElement('time');
            messageTime.className = 'message-time';
            messageTime.textContent = 'Just now';
            
            messageDiv.appendChild(messageContent);
            messageDiv.appendChild(messageTime);
            
            this.messages.appendChild(messageDiv);
            this.messages.scrollTop = this.messages.scrollHeight;
        }, delay);
    }

    processMessage(message) {
        // Simulate bot thinking
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot', 500);
        }, 1000);
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Basic response patterns
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return 'Hello! How can I help you with the quiz today?';
        }
        
        if (lowerMessage.includes('scoring') || lowerMessage.includes('points')) {
            return 'Each correct answer is worth 1 point. Your final score will be shown at the end of the quiz.';
        }
        
        if (lowerMessage.includes('topic') || lowerMessage.includes('subjects')) {
            return 'We have quizzes on HTML, CSS, JavaScript, Python, C++, DBMS, React, Next.js, Git & GitHub, DSA, and Django. Which one interests you?';
        }
        
        if (lowerMessage.includes('difficult') || lowerMessage.includes('hard')) {
            return 'The difficulty varies by topic. You can try a few questions and use the "Mark for Review" feature if you need to come back to them later.';
        }
        
        if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
            return 'I can help you with quiz navigation, scoring, or specific topics. What would you like to know more about?';
        }
        
        if (lowerMessage.includes('thank')) {
            return "You're welcome! Good luck with your quiz!";
        }
        
        // Default response
        return "I'm not sure about that. Would you like to know about quiz topics, scoring, or how to navigate the quiz?";
    }

    useSuggestion(suggestion) {
        this.input.value = suggestion;
        this.sendMessage();
    }

    adjustTextareaHeight() {
        this.input.style.height = 'auto';
        this.input.style.height = (this.input.scrollHeight) + 'px';
    }

    minimizeChat() {
        const container = document.querySelector('.chatbot-container');
        container.classList.toggle('minimized');
        
        const icon = this.minimizeButton.querySelector('.minimize-icon');
        icon.textContent = container.classList.contains('minimized') ? '+' : '−';
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new ChatBot();
}); 