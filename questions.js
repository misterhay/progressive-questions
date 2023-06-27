// Define an array of objects to store the questions and answers
const questions = [
    {
      question: "What is the capital of France?",
      answer: "Paris"
    },
    {
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter"
    },
    {
      question: "What is the tallest mammal?",
      answer: "Giraffe"
    }
  ];
  
  // Get the current question from localStorage, or set it to 0 if it doesn't exist
  let currentQuestion = Number(localStorage.getItem("currentQuestion")) || 0;
  
  // Define a function to display the current question and Blockly workspace
  function displayQuestion() {
    const question = questions[currentQuestion];
    const form = document.querySelector("form");
    form.innerHTML = `
      <h2>${question.question}</h2>
      <div id="answer"></div>
      <button type="submit">Submit</button>
      <button type="button" onclick="restart()">Restart</button>
    `;
    const workspace = Blockly.inject("blocklyDiv", {
      toolbox: `
      <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display:none">
        <block type="controls_repeat_ext"></block>
        <block type="controls_for">
          <value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
          <value name="TO"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
          <value name="BY"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
        </block>
        <block type="controls_if"></block>
        <block type="variables_get"><field name="VAR" class="textVar">i</field></block>
        <block type="logic_compare"></block>
        <block type="math_arithmetic"></block>
        <block type="math_number"><field name="NUM">27</field></block>
        <block type="text_print"></block>
      </xml>
      `
    });
    workspace.addChangeListener(() => {
      //const code = Blockly.JavaScript.workspaceToCode(workspace);
      const code = Blockly.Python.workspaceToCode(workspace);
      document.querySelector("#pythonCode").textContent = code;
      document.querySelector("#answer").textContent = code;
    });
  }
  
  // Define a function to check the user's answer and display the next question
  function checkAnswer(event) {
    event.preventDefault();
    const answer = document.querySelector("#answer").textContent;
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
          <button type="button" onclick="restart()">Restart</button>
        `;
      }
    } else {
      alert("Incorrect answer. Please try again.");
    }
  }
  
  // Define a function to restart the quiz
  function restart() {
    currentQuestion = 0;
    localStorage.setItem("currentQuestion", currentQuestion);
    location.reload();
  }
  
  // Call the displayQuestion function to start the quiz
  displayQuestion();
  
  // Add an event listener to the form to check the user's answer
  const form = document.querySelector("form");
  form.addEventListener("submit", checkAnswer);
