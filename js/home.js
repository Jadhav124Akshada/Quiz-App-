/* /quiz-app/home.js */
import quizzes from './questions.js';

document.addEventListener('DOMContentLoaded', () => {
    const topicGrid = document.getElementById('topic-grid');
    if (!topicGrid) return;

    // Clear the "Loading topics..." message
    topicGrid.innerHTML = ''; 

    // Create a card for each quiz topic defined in questions.js
    Object.keys(quizzes).forEach(key => {
        const topic = quizzes[key];
        
        const card = document.createElement('a');
        card.href = `quiz.html?topic=${key}`;
        card.className = 'topic-card';

        // Populate the card with dynamic data
        card.innerHTML = `
            <span class="icon">${topic.icon}</span>
            <h3>${topic.title}</h3>
            <p>Test your ${topic.title} knowledge.</p>
        `;
        
        topicGrid.appendChild(card);
    });
});