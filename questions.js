// Define an array of objects to store the questions and answers
const questions = [
    {
      question: "What is the capital of Canada?",
      answer: "Ottawa"
    },
    {
      question: "What are the single-digit odd numbers?",
      answer: "1<br>3<br>5<br>7<br>9"
    },
    {
      question: "What are the two-digit perfect squares?",
      answer: "16<br>25<br>36<br>49<br>64<br>81"
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
  document.getElementById("question").innerText = question.question; // instead of <h2>${question.question}</h2>
  const form = document.querySelector("form");
  form.innerHTML = `
    
    <button type="button" onclick="runCode()">▶ Run Code</button>
    <button type="button" onclick="clearOutput()">Clear Output</button>
    <button style="color: green" type="submit">Submit Output</button>
    <button type="button" style="color: orange" onclick="previousQuestion()">Previous Question</button>
    <button type="button" style="color: red" onclick="restart()">Restart Quiz</button>
  `;
}

// Define a function to display the Blockly workspace
function displayBlockly() {
  const workspace = Blockly.inject("blocklyDiv", {
    toolbox: `
    <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display:none">
      <category name="Logic" colour="%{BKY_LOGIC_HUE}">
        <block type="controls_if"></block>
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>
        <block type="logic_boolean"></block>
        <block type="logic_null"></block>
        <block type="logic_ternary"></block>
      </category>
      <category name="Loops" colour="%{BKY_LOOPS_HUE}">
        <block type="controls_repeat_ext">
          <value name="TIMES">
            <shadow type="math_number">
              <field name="NUM">10</field>
            </shadow>
          </value>
        </block>
        <block type="controls_whileUntil"></block>
        <block type="controls_for">
          <value name="FROM">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
          <value name="TO">
            <shadow type="math_number">
              <field name="NUM">10</field>
            </shadow>
          </value>
          <value name="BY">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
        </block>
        <block type="controls_forEach"></block>
        <block type="controls_flow_statements"></block>
      </category>
      <category name="Math" colour="%{BKY_MATH_HUE}">
        <block type="math_number">
          <field name="NUM">123</field>
        </block>
        <block type="math_arithmetic">
          <value name="A">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
          <value name="B">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
        </block>
        <block type="math_single">
          <value name="NUM">
            <shadow type="math_number">
              <field name="NUM">9</field>
            </shadow>
          </value>
        </block>
        <block type="math_trig">
          <value name="NUM">
            <shadow type="math_number">
              <field name="NUM">45</field>
            </shadow>
          </value>
        </block>
        <block type="math_constant"></block>
        <block type="math_number_property">
          <value name="NUMBER_TO_CHECK">
            <shadow type="math_number">
              <field name="NUM">0</field>
            </shadow>
          </value>
        </block>
        <block type="math_round">
          <value name="NUM">
            <shadow type="math_number">
              <field name="NUM">3.1</field>
            </shadow>
          </value>
        </block>
        <block type="math_on_list"></block>
        <block type="math_modulo">
          <value name="DIVIDEND">
            <shadow type="math_number">
              <field name="NUM">64</field>
            </shadow>
          </value>
          <value name="DIVISOR">
            <shadow type="math_number">
              <field name="NUM">10</field>
            </shadow>
          </value>
        </block>
        <block type="math_constrain">
          <value name="VALUE">
            <shadow type="math_number">
              <field name="NUM">50</field>
            </shadow>
          </value>
          <value name="LOW">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
          <value name="HIGH">
            <shadow type="math_number">
              <field name="NUM">100</field>
            </shadow>
          </value>
        </block>
        <block type="math_random_int">
          <value name="FROM">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
          <value name="TO">
            <shadow type="math_number">
              <field name="NUM">100</field>
            </shadow>
          </value>
        </block>
        <block type="math_random_float"></block>
        <block type="math_atan2">
          <value name="X">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
          <value name="Y">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
        </block>
      </category>
      <category name="Text" colour="%{BKY_TEXTS_HUE}">
        <block type="text"></block>
        <block type="text_join"></block>
        <block type="text_append">
          <value name="TEXT">
            <shadow type="text"></shadow>
          </value>
        </block>
        <block type="text_length">
          <value name="VALUE">
            <shadow type="text">
              <field name="TEXT">abc</field>
            </shadow>
          </value>
        </block>
        <block type="text_isEmpty">
          <value name="VALUE">
            <shadow type="text">
              <field name="TEXT"></field>
            </shadow>
          </value>
        </block>
        <block type="text_indexOf">
          <value name="VALUE">
            <block type="variables_get">
              <field name="VAR">{textVariable}</field>
            </block>
          </value>
          <value name="FIND">
            <shadow type="text">
              <field name="TEXT">abc</field>
            </shadow>
          </value>
        </block>
        <block type="text_charAt">
          <value name="VALUE">
            <block type="variables_get">
              <field name="VAR">{textVariable}</field>
            </block>
          </value>
        </block>
        <block type="text_getSubstring">
          <value name="STRING">
            <block type="variables_get">
              <field name="VAR">{textVariable}</field>
            </block>
          </value>
        </block>
        <block type="text_changeCase">
          <value name="TEXT">
            <shadow type="text">
              <field name="TEXT">abc</field>
            </shadow>
          </value>
        </block>
        <block type="text_trim">
          <value name="TEXT">
            <shadow type="text">
              <field name="TEXT">abc</field>
            </shadow>
          </value>
        </block>
        <block type="text_print">
          <value name="TEXT">
            <shadow type="text">
              <field name="TEXT">abc</field>
            </shadow>
          </value>
        </block>
        <block type="text_prompt_ext">
          <value name="TEXT">
            <shadow type="text">
              <field name="TEXT">abc</field>
            </shadow>
          </value>
        </block>
      </category>
      <category name="Lists" colour="%{BKY_LISTS_HUE}">
        <block type="lists_create_with">
          <mutation items="0"></mutation>
        </block>
        <block type="lists_create_with"></block>
        <block type="lists_repeat">
          <value name="NUM">
            <shadow type="math_number">
              <field name="NUM">5</field>
            </shadow>
          </value>
        </block>
        <block type="lists_length"></block>
        <block type="lists_isEmpty"></block>
        <block type="lists_indexOf">
          <value name="VALUE">
            <block type="variables_get">
              <field name="VAR">{listVariable}</field>
            </block>
          </value>
        </block>
        <block type="lists_getIndex">
          <value name="VALUE">
            <block type="variables_get">
              <field name="VAR">{listVariable}</field>
            </block>
          </value>
        </block>
        <block type="lists_setIndex">
          <value name="LIST">
            <block type="variables_get">
              <field name="VAR">{listVariable}</field>
            </block>
          </value>
        </block>
        <block type="lists_getSublist">
          <value name="LIST">
            <block type="variables_get">
              <field name="VAR">{listVariable}</field>
            </block>
          </value>
        </block>
        <block type="lists_split">
          <value name="DELIM">
            <shadow type="text">
              <field name="TEXT">,</field>
            </shadow>
          </value>
        </block>
        <block type="lists_sort"></block>
      </category>
      <category name="Colours" colour="%{BKY_COLOUR_HUE}">
        <block type="colour_picker"></block>
        <block type="colour_random"></block>
        <block type="colour_rgb">
          <value name="RED">
            <shadow type="math_number">
              <field name="NUM">100</field>
            </shadow>
          </value>
          <value name="GREEN">
            <shadow type="math_number">
              <field name="NUM">50</field>
            </shadow>
          </value>
          <value name="BLUE">
            <shadow type="math_number">
              <field name="NUM">0</field>
            </shadow>
          </value>
        </block>
        <block type="colour_blend">
          <value name="COLOUR1">
            <shadow type="colour_picker">
              <field name="COLOUR">#ff0000</field>
            </shadow>
          </value>
          <value name="COLOUR2">
            <shadow type="colour_picker">
              <field name="COLOUR">#3333ff</field>
            </shadow>
          </value>
          <value name="RATIO">
            <shadow type="math_number">
              <field name="NUM">0.5</field>
            </shadow>
          </value>
        </block>
      </category>
      <sep></sep>
      <category name="Variables" colour="%{BKY_VARIABLES_HUE}" custom="VARIABLE"></category>
      <category name="Functions" colour="%{BKY_PROCEDURES_HUE}" custom="PROCEDURE"></category>
    </xml>
    `
  });

  // add some start blocks xml
  const startBlocks = `
  <xml xmlns="https://developers.google.com/blockly/xml" id="startBlocks" style="display: none">
    <block type="text_print">
      <value name="TEXT">
        <block type="text">
          <field name="TEXT">Ottawa</field>
        </block>
      </value>
    </block>  
  </xml>
  `;
  //<block type="text">Paris</block>

  // inject our xml into the workspace
  Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(startBlocks), workspace);


  workspace.addChangeListener(() => {
    const code = Blockly.Python.workspaceToCode(workspace);
    document.getElementById('pythonCode').innerText = code;
    //const javascriptCode = Blockly.JavaScript.workspaceToCode(workspace);
  });
}

// Define a function to check the user's answer and display the next question
function checkAnswer(event) {
  event.preventDefault();
  //const answer = document.querySelector("#answer").textContent;
  const answer = document.getElementById('answer').innerHTML;
  //console.log(answer);
  const question = questions[currentQuestion];
  if (answer.toLowerCase() === question.answer.toLowerCase()) {
    confirm("Correct"); // use this since we have remaped the alert function, ok and cancel buttons do nothing
    currentQuestion++;
    localStorage.setItem("currentQuestion", currentQuestion);
    if (currentQuestion < questions.length) {
      clearOutput();
      displayQuestion();
    } else {
      const form = document.querySelector("form");
      form.innerHTML = `
        <h2>Well done, you completed all ${questions.length} challenges.</h2>
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
