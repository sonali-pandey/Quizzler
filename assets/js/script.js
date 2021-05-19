var startButtonEl = document.querySelector("#start-btn");
var buttonsEl = document.querySelector(".button");
var mainEl = document.querySelector("main");
var instructionEl = document.querySelector(".instructions");
var headerEl = document.querySelector(".title");
var footerEl = document.querySelector(".result");
var pageContentEl = document.querySelector(".container");
var viewScoreEl = document.querySelector("#view-highscore");

var questionCounter = 0;
var points=0;
var gameStatus = 0;
var wrong = 0;
var optionsEl;
var result;
var names;
var score = 0;

var savedScore = [];
var savedScoreObj={
    name: names,
    points:points
}

var questionsObj=[
    {
        question:"Commonly used data types DO NOT include:",
        option:["1. strings","2. booleans","3. alerts","4. numbers"],
        answer:"3. alerts",
    },
    {
        question:"The condition in an if/else statement is enclosed with ______.",
        option:["1. quotes","2. curly brackets","3. parenthesis","4. square brackets"],
        answer:"3. parenthesis",
    },
    {
        question:"Arrays in JavaScript can be used to store ______.",
        option:["1. numbers and strings","2. other arrays","3. booleans","4. all of the above"],
        answer:"4. all of the above",
    },
    {
        question:"String values must be enclosed within ______ when being assigned to variables.",
        option:["1. commas","2. curly brackets","3. quotes","4. parenthesis"],
        answer:"3. quotes",  
    },
    {
        question:"A very useful tool used during development and debugging for printing content to the debugger is:",
        option:["1. JavaScript","2. terminal/bash","3. for loops","4. console.log"],
        answer:"4. console.log", 
    }
]



var clear = function(){
     result.remove();
 };

 function refresh(){
    location.reload();
}

var optionButtonHandler = function(event){

    var optionIdEl = event.target.getAttribute("id");
    var selectedAnsEl = event.target.textContent;
    var answerEl = questionsObj[questionCounter].answer;
    
    // Check the answer only when options buttons are clicked
    // don't check for start button click
    if(optionIdEl!== "start-btn"){
    if (optionIdEl==="1"||optionIdEl==="2"||optionIdEl==="3"||optionIdEl==="4"){
        if(selectedAnsEl===answerEl){
            wrong=0;
            result = document.createElement("p");
            result.className="result";
            result.textContent="Correct!";
            footerEl.appendChild(result);
        }
        else{ 
        wrong=1;
        result = document.createElement("p");
        result.className="result";
        result.textContent="Wrong!";
        footerEl.appendChild(result);
        }
    }
}
    else{
        return;
    }
    questionCounter++;
    setTimeout(clear, 300);
    setTimeout(startQuiz,300);
};

var clearInstruction = function(){

    // remove instructions and start button
    buttonsEl.innerHTML="";
    mainEl.innerHTML="";

    for(var i=0; i<4; i++){
        //creating 4 clickable options
        optionsEl = document.createElement("button");
        optionsEl.className= "options";
        optionsEl.setAttribute("id",i+1);
        optionsEl.setAttribute("name",questionCounter);
        buttonsEl.appendChild(optionsEl);
    }
    startQuiz();
}

var checkTimer = function(){
    if(timeLeft>0){
        return true;
    }
    else{
        return false;
    }
};

var loadTasks = function (){

    // retrieve tasks from localStorage
    savedScore=localStorage.getItem("user");

    if (savedScore === null){
        savedScore = [];
        return false;
    }

    savedScore = JSON.parse(savedScore);

    for(var i=0; i<savedScore.length; i++){
        console.log(savedScore[i]);
    }
}

var sorting = function(){
    var temp = [];
    if(savedScore===null){
        return;
    }
    for(j=0; j<savedScore.length;j++){
        for(i=0; i<savedScore.length;i++){
            if(savedScore[j].points>savedScore[i].points){
                temp = savedScore[i];
                savedScore[i]=savedScore[j];
                savedScore[j]=temp;
            }
        }
    }
var l = savedScore.length - 3;
savedScore.splice(4,l);
};

function clearScore(){
    localStorage.clear();
    var l = savedScore.length;
    savedScore.splice(0,l);
    viewHighScore();
}

var viewHighScore = function(){
    headerEl.textContent = "High Scores";
    mainEl.innerHTML="";
    sorting();
    console.log(savedScore.length);
    for(var i=0; i<savedScore.length; i++){
        var a = document.createElement("p");
        a.className="display-score";
        a.textContent= (i+1) + ". " + savedScore[i].name + " - " + savedScore[i].points;
        mainEl.appendChild(a);
    }

    var goBack = document.createElement("button");
    goBack.className="go-back";
    goBack.textContent = "Go Back";
    mainEl.appendChild(goBack);
    var goBackEl = document.querySelector(".go-back");

    var clearHighscore  = document.createElement("button");
    clearHighscore.className="clear-score";
    clearHighscore.textContent="Clear HighScore";
    mainEl.appendChild(clearHighscore);
    var clearHighscoreEl = document.querySelector(".clear-score");
    
    goBackEl.addEventListener("click",refresh);
    clearHighscoreEl.addEventListener("click",clearScore);

};

var submit = function(event){
    event.preventDefault();
    savedScore = localStorage.getItem("user");
    if(savedScore === null){
        savedScore=[];
        //return false;
    }
    else{
    savedScore = JSON.parse(savedScore);
    console.log(savedScore);
    }

    if(event.target.id !== "view-highscore"){
    var inputEl = document.querySelector("input");
    names = inputEl.value;
    savedScoreObj.name = names;
    savedScoreObj.points = points;
    savedScore.push(savedScoreObj);
    console.log(savedScore);
    localStorage.setItem("user",JSON.stringify(savedScore));
    }
    viewHighScore();
};


var highScore = function(){
    // Completion announcement
    headerEl.textContent = "All done!";
    points = timeLeft;
    //Final Score Display
    var score = document.createElement("p");
    score.className = "score";
    score.textContent = "Your final score is " + points + ".";
    mainEl.appendChild(score);
    buttonsEl.innerHTML = "";

    //Form to enter initials
    var formEl = document.createElement("form");
    formEl.setAttribute("name","submit-form");
    mainEl.appendChild(formEl);
    formEl.innerHTML="<p class='score'>Enter initials:</p><input type='text' name='initials'><button class='btn' id='submit-btn'>Submit</button>";

    var submitEl = document.querySelector("#submit-btn");
    submitEl.addEventListener("click",submit);
}

var startQuiz = function(){

    if(gameStatus===0){
        
        if(questionCounter<questionsObj.length){

            if(checkTimer()){
                // display question
                headerEl.textContent = questionsObj[questionCounter].question;
                headerEl.className = "question title";

                // display options
                for(var i= 0; i<4; i++){
                    var optionsValueEl = document.getElementById(i+1);
                    optionsValueEl.textContent= questionsObj[questionCounter].option[i];
                }
            }
        }
        else{
            gameStatus=1;
            highScore();
        }
    }
    else{
    highScore();
    }
};


startButtonEl.addEventListener("click",clearInstruction);
buttonsEl.addEventListener("click",optionButtonHandler);
viewScoreEl.addEventListener("click",submit);