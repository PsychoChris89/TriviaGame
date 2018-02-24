$(document).ready(function () {
    var triviaSelections = [
        {
            question: "Who is Chicken's sister?", 
            choice: ["Dee Dee", "Cow", "Bubbles", "none"],
            answer: 1,
            photo: "https://media.giphy.com/media/gJcvQpuy158Os/giphy.gif"
         },
         {
             question: "What is Johnny Bravo's favorite food", 
            choice: ["Pizza", "Sandwich", "Chinese Food", "Beef Jerky"],
            answer: 3,
            photo: "https://i.ytimg.com/vi/10IygllU2CA/hqdefault.jpg"
         }, 
         {
             question: "Who is Dexter's Sister?", 
            choice: ["Cow", "Number 3", "Deedee", "Rice variety" ],
            answer: 2,
            photo: "http://cdn1.clevver.com/wp-content/uploads/2015/10/dexters-laboratory-chasing-dee-dee.gif"
        }, 
      
     ];
    
    var correctAnswers = 0;
    var wrongAnswers = 0;
    var noAnswers = 0;
    var timer =     10;
    var intervalId;
    var playerGuess ="";
    var running = false;
    var qCount = triviaSelections.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();

    //On click start button
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            startTimer();
            for(var i = 0; i < triviaSelections.length; i++) {
        holder.push(triviaSelections[i]);
    }
        })
    //start timer
    function startTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //countdown timer
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer when reached to 0
        if (timer === 0) {
            noAnswers++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //stop timer
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*triviaSelections.length);
        pick = triviaSelections[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //On click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from playerGuess
        playerGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct results
        if (playerGuess === pick.answer) {
            stop();
            correctAnswers++;
            playerGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
        //wrong results
        } else {
            stop();
            wrongAnswers++;
            playerGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        triviaSelections.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 10;
    
        //score screen
        if ((wrongAnswers + correctAnswers + noAnswers) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctAnswers + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongAnswers + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + noAnswers + "</h4>" );
            $("#reset").show();
            correctAnswers = 0;
            wrongAnswers = 0;
            noAnswers = 0;
    
        } else {
            startTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            triviaSelections.push(holder[i]);
        }
        startTimer();
        displayQuestion();
    
    })
    
    })