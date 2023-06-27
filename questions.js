// Define an array of objects to store the questions and answers
const questions = [
  {
    question: "What is the capital of France?",
    answer: "Paris"
  },
  {
    question: "Which is the largest planet in our solar system?",
    answer: "Jupiter"
  },
  {
    question: "What is airspeed of an unladen swallow?",
    answer: "European or African?"
  }
];


// Get the current question from localStorage, or set it to 0 if it doesn't exist
let currentQuestion = Number(localStorage.getItem("currentQuestion")) || 0;

// Define a function to display the current question and input field
function displayQuestion() {
  const question = questions[currentQuestion];
  const form = document.querySelector("form");
  form.innerHTML = `
    <h2>${question.question}</h2>
    <input type="text" name="answer" placeholder="Enter your answer">
    <button type="submit">Submit</button>
  `;
}

// Define a function to check the user's answer and display the next question
function checkAnswer(event) {
  event.preventDefault();
  const answer = event.target.elements.answer.value;
  const question = questions[currentQuestion];
  if (answer.toLowerCase() === question.answer.toLowerCase()) {
    currentQuestion++;
    localStorage.setItem("currentQuestion", currentQuestion);
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      const form = document.querySelector("form");
      form.innerHTML = `
        <h2>You scored ${questions.length} out of ${questions.length}!</h2>
        <button type="button" onclick="location.reload()">Restart</button>
      `;
    }
  } else {
    alert("Incorrect answer. Please try again.");
  }
}

// Call the displayQuestion function to start the quiz
displayQuestion();

// Add an event listener to the form to check the user's answer
const form = document.querySelector("form");
form.addEventListener("submit", checkAnswer);
