var timer = document.querySelector(".timer");
var timeLeft = 60;


function startTimer(){

    //setting timer to 60 seconds
    timer.innerHTML= "<p> Time: " + timeLeft + "</p>";

    var countDown = setInterval(function(){

        // checking if selected answer is wrong then penalize by deducting 10 seconds
        if(wrong===1){
            timeLeft-=10;
            wrong=0;
        }
        // if selected answer is correct continue the timer
        else{
            timeLeft--;
        }

        // checking if the quiz reached last question before the timer ran out
        if(!(gameStatus===1)){

            if(timeLeft<60 && timeLeft>=10){
                timer.innerHTML= "<p> Time: " + timeLeft + "</p>";
            }

            // time left less than 10 seconds turn the timer red
            else if(timeLeft<10 && timeLeft>=0){
                timer.innerHTML= "<p style='color:red'> Time: " + timeLeft + "</p>";
            }

            // timer runs out or goes below 0 due to multiple wrong answers: stop the timer and always display time as 0
            else{
                clearInterval(countDown);
                timeLeft=0;
                timer.innerHTML= "<p style = 'color:red'> Time: " + timeLeft + "</p>";
                gameStatus=1;
                highScore();
            }
        }
        //all questions answered before time ran out then stop the timer
        else{
            clearInterval(countDown);
        }
},100);
};

startButtonEl.addEventListener("click",startTimer);
