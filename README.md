# Quiz App

A simple and interactive Quiz Application built for testing knowledge on various topics. This project is designed to be user-friendly and easily extendable.

## Features
- Multiple choice questions
- Score tracking
- Responsive design
- Instant feedback on answers
- Easy to add or modify questions

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, etc.)

### Installation
1. Clone or download this repository to your local machine.
2. Open the `index.html` file in your web browser.

No additional setup or dependencies are required.

## Usage
- Launch the app by opening `index.html`.
- Select your answers for each question.
- Submit your answers to see your score and feedback.

## Project Structure
```
Quiz-App-pro/
├── index.html        # Main HTML file
├── style.css         # Stylesheet (if present)
├── script.js         # JavaScript logic (if present)
├── README.md         # Project documentation
```

## Customization
- To add or edit questions, modify the JavaScript file (usually `script.js`).
- Update styles in `style.css` to change the appearance.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License
This project is open source and available under the [MIT License](LICENSE).


## Features

## Key Features Implemented:

### **User Authentication & Access**

- Name and quiz code entry system
- Hidden admin mode (access with "adminmode" as quiz code)
- Session management


### **Quiz Functionality**

- 10 questions per quiz from multiple tech topics
- Timer with enable/disable functionality
- Real-time scoring
- Detailed explanations for each question
- Progress tracking


### **Admin Control Panel**

- **Topic Management**: Add/delete quiz topics with custom codes
- **Question Management**: Add/delete questions with explanations
- **Settings Control**: Configure timer duration, questions per quiz, passing score
- Real-time updates that reflect in actual quizzes


### **Additional Features**

- **Leaderboard**: Shows top scores across all topics
- **Light/Dark Theme**: Toggle with persistent storage
- **Responsive Design**: Works on all devices
- **Detailed Results**: Shows correct answers and explanations
- **Data Persistence**: All data saved in localStorage


## How to Use:

1. **Start**: Open `index.html` and enter your name
2. **Regular User**: Enter a topic code (like "HTML001", "CSS001", etc.)
3. **Admin Access**: Enter "adminmode" as the quiz code
4. **Take Quiz**: Answer questions, use timer controls, submit when done
5. **View Results**: See score, explanations, and leaderboard


## Admin Features:

- **Manage Topics**: Add new quiz subjects with custom codes
- **Manage Questions**: Add/edit/delete questions with explanations
- **Configure Settings**: Set timer duration, question count, passing scores
- **Real-time Updates**: Changes immediately reflect in user quizzes