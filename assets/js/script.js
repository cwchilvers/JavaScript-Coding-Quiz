// Get elements
const body = document.body;
const highScores = document.querySelector("#high-scores");
const timer = document.querySelector("#timer");
const container = document.querySelector("#container");
const title = document.querySelector("#title");
const footer = document.querySelector("#message");

// Create elements
const p = document.createElement("p");
const ul = document.createElement("ul");
const start = document.createElement("button");
const list = [
    a1 = document.createElement("li"),
    a2 = document.createElement("li"),
    a3 = document.createElement("li"),
    a4 = document.createElement("li")
]
const submit = document.createElement("button");
const form = document.createElement("form");
const label = document.createElement("label");
const input = document.createElement("input");

// Strings
const titleTitleScreen = "Coding Quiz";
const titleGameOver = "All done!";
const titleHighScores = "High-Scores";
const inputLabel = "Enter Name: ";
const description = "Try to answer the folowing code-related questions within the time limit. Keep in mind that wrong answers will penalize your score/time by 10 seconds!";
const startText = "Start Quiz";
const submitText = "Submit";
const questions = [
    "Commonly used data types do NOT include:",                                                             // Question 1
    "The condition in an if/else statment is enclosed with ＿.",                                            // Question 2
    "Arrays in Javascript can be used to store ＿.",                                                        // Question 3
    "String values must be enclosed within ＿ when being assigned variables.",                              // Question 4
    "A very userful tool used during development and debugging for printing content to the debugger is:"    // Question 5
]
const answers = [
    ["Strings", "Booleans", "Alerts", "Numbers"],                              // Answers for Question 1 (Correct Answer = [2])
    ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],            // Answers for Question 2 (Correct Answer = [1])
    ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],   // Answers for Question 3 (Correct Answer = [3])
    ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],                     // Answers for Question 4 (Correct Answer = [2])
    ["Javascript", "Terminal/Bash", "For Loops", "console.log"]                // Answers for Question 5 (Correct Answer = [3])
];
const blank = '';
const scoreDisplay = "You're final score is ";
const correctAnswers = ["Alerts", "Curly Brackets", "All of the Above", "Quotes", "console.log"];

// Quiz Constants/Variables
var question = 0;
var score = 0;
var time = 50;
var isPlaying = false;

// High-Scores
var highScoresArray = []

highScores.addEventListener("click", HighScores);
Title();

// Draws Title Screen
function Title() {
    container.appendChild(p).textContent = description;
    container.appendChild(start).textContent = startText;
    timer.textContent = blank;
    title.textContent = titleTitleScreen;
    start.addEventListener("click", SetupQuiz);
}

// Sets up quiz and goes to first question
function SetupQuiz() {
    container.removeChild(p);
    container.removeChild(start);
    container.appendChild(ul);
    for (let i = 0; i < 4; i++) {
        ul.appendChild(list[i]);
    }
    timer.textContent = "Time: " + time;
    isPlaying = true;
    ResetVariables();
    SetupQuestion();
    CountDown();
}

// Reset variables for quiz
function ResetVariables() {
    question = 0;
    score = 0;
    time = 50
}

// Sets up current question with corresponding answers
function SetupQuestion() {
    let a = 0
    title.textContent = questions[question];
    for (let i = 0; i < 4; i++) {
        ul.children[a].textContent = answers[question][i];
        a++;
    }
    // Set up answers
    SetupAnswers();
}

// Assigns which buttons have correct and incorrect answers
function SetupAnswers() {
    RemoveEventListeners();
    for (let i = 0; i < 4; i++) {
        if (ul.children[i].textContent !== correctAnswers[question]) {
            ul.children[i].addEventListener("click", Incorrect);
        } else {
            ul.children[i].addEventListener("click", Correct);
        }
    }
}

// Removes old event listeners so that new ones with different functions can be added
function RemoveEventListeners() {
    for (let i = 0; i < 4; i++) {
        ul.children[i].removeEventListener("click", Incorrect);
        ul.children[i].removeEventListener("click", Correct);;
    }
}

// For when user selects correct answer
function Correct() {
    footer.textContent = "Correct!";
    score++;
    question++;
    if (question < 5){
        SetupQuestion();
    } else {
        GameOver();
    }
}
    
// For when user selects wrong answer
function Incorrect() {
    footer.textContent = "Wrong";
    question++;
    if (question < 5){
        SetupQuestion();
    } else {
        GameOver();
    }
}

// Countdown for timer
function CountDown() {
    setInterval(function () {
      if (time >= 1) {
        time--;
        timer.textContent = "Time: " + time;
      } 
      if (time === 0 && isPlaying === true) {
        GameOver();
      }
    }, 1000);
}

// Draws game over screen
function GameOver() {
    container.removeChild(ul);
    container.appendChild(p).textContent = scoreDisplay + score;
    container.appendChild(form);
    form.appendChild(label).textContent = inputLabel;
    form.appendChild(input).maxLength = 10;
    form.appendChild(submit).setAttribute("id", "submit");
    title.textContent = titleGameOver;
    timer.textContent = blank;
    submit.textContent = submitText;
    time = 0;
    isPlaying = false;
    Submit();
}

// Submit name and score
function Submit() {
    submit.addEventListener("click", function(event) {
        event.preventDefault();
        // Store user's name and score in an array for the leaderboard
        if (input.value.trim() !== "") {
            // Create object for user's name and score
            let userScore = {
                name: input.value.trim(),
                score: score
            }
            // If array it blank
            if (highScoresArray.length === 0) {
                highScoresArray.push(userScore);
            } 
            // This is to add to the array in order ()
            else {
                for (let i = 0; i <= highScoresArray.length; i++) {
                    if (score > highScoresArray[i].score) {
                        highScoresArray.splice(i, 0, userScore)
                    } else {
                        highScoresArray.push(userScore);
                    }
                }
            }


            //localStorage.setItem("user-score", userScore);

            console.log(highScoresArray);

            HighScores();
        }
    });
}

// Draws high-score screen
function HighScores() {
    container.innerHTML = blank;
    container.appendChild(title);
    timer.textContent = blank;
    title.textContent = titleHighScores;
    footer.textContent = blank;
    time = 0;
    isPlaying = false;
}
