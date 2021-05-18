var timer = document.querySelector(".timer");
var timeLeft = 60;

var timerHandler = function(event){
    if(wrong===1){
    timeLeft-=10;
    }
};

function startTimer(){
    timer.innerHTML= "<p> Time: " + timeLeft + "</p>";
    timeLeft--;
    countDown();
}

function countDown(){

var timeInterval = setInterval(function(){
    if(!(gameStatus===1)){
        if(timeLeft<10 && timeLeft>=0){
            timer.innerHTML= "<p style='color:red'> Time: " + timeLeft + "</p>";
            timeLeft--;
        }
    else if(!(timeLeft<0)){
    timer.innerHTML= "<p> Time: " + timeLeft + "</p>";
    timeLeft--;
    }
    else{
       clearInterval(countDown); 
    }
}
else{
    clearInterval(countDown);
    if(wrong===1){
    timer.innerHTML= "<p> Time: " + timeLeft + "</p>";
    }
}
},1000);
};

startButtonEl.addEventListener("click",startTimer);
buttonsEl.addEventListener("click",timerHandler);
