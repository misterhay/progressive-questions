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
  
// remap alerts to the answer div
window.alert = function(txt) {
  currentOutput = document.getElementById('answer').innerText;
  if (currentOutput == '') { // if the current output is empty, just set it to the text
    document.getElementById('answer').innerText = txt;
  } else {  // otherwise, add a new line and then the text
    document.getElementById('answer').innerText = currentOutput + '\n' + txt;
  }
}

// Get the current question from localStorage, or set it to 0 if it doesn't exist
let currentQuestion = Number(localStorage.getItem("currentQuestion")) || 0;

// Define a function to display the current question and Blockly workspace
function displayQuestion() {
  const question = questions[currentQuestion];
  const form = document.querySelector("form");
  form.innerHTML = `
    <h2>${question.question}</h2>
    <button type="button" onclick="runCode()">Run Code</button>
    <button type="button" onclick="clearOutput()">Clear Output</button>
    <button type="submit">Submit Output</button>
    <button type="button" onclick="previousQuestion()">Previous Question</button>
    <button type="button" onclick="restart()">Restart Quiz</button>
  `;
}

// Define a function to display the Blockly workspace
function displayBlockly() {
  const workspace = Blockly.inject("blocklyDiv", {
    toolbox: `
    <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display:none">
      <block type="text_print"></block>
      <block type="text"></block>
      <block type="math_number"><field name="NUM">27</field></block>
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
    </xml>
    `
  });
  workspace.addChangeListener(() => {
    const code = Blockly.Python.workspaceToCode(workspace);
    //document.querySelector("#pythonCode").textContent = code;
    document.getElementById('pythonCode').innerText = code;
    //const javascriptCode = Blockly.JavaScript.workspaceToCode(workspace);
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
      clearOutput();
      displayQuestion();
    } else {
      const form = document.querySelector("form");
      form.innerHTML = `
        <h2>You scored ${questions.length} out of ${questions.length}!</h2>
        <button type="button" onclick="restart()">Restart</button>
      `;
    }
  } else {
    clearOutput();
    alert("Incorrect answer. Please try again.");
  }
}

function runCode(workspace) {
  clearOutput();
  window.LoopTrap = 1000;
  Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
  var javascript = Blockly.JavaScript.workspaceToCode(workspace);
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try {
    eval(javascript);
  } catch(e) {
    alert(e);
  }
}

// A function to go to the previous question
function previousQuestion() {
  // confirm that they want to go to the previous question
  if (confirm("Are you sure you want to go to the previous question?")) {
    currentQuestion--;
    localStorage.setItem("currentQuestion", currentQuestion);
    location.reload();
  }
}

// A function to restart the quiz
function restart() {
  // confirm that they want to restart
  if (confirm("Are you sure you want to restart the quiz?")) {
    currentQuestion = 0;
    localStorage.setItem("currentQuestion", currentQuestion);
    location.reload();
  }
}

// a function to clear the output
function clearOutput() {
  document.getElementById('answer').innerText = '';
}

// Call the displayQuestion function to start the quiz
displayQuestion();
displayBlockly();

// Add an event listener to the form to check the user's answer
const form = document.querySelector("form");
form.addEventListener("submit", checkAnswer);
