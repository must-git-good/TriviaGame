// A Trivia Game...on the clock!


//Global variables, arrays and objects
////////////////////////////////////////////////////////////////////////////

var question = [
    {
        q: "What is the study of time-measuring devices called?",
        a: {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "Tempology", "Clock Science", "Horology", "Pneumenosism"]
        },
        correctAnswer: 3,
        userCorrect: false,
        diff: 6,
        hint: " ",

    }, {
        q: "An early Egyptian time-measuring device was oriented facing ______ each morning.",
        a: {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "East", "West", "Upright", "Towards the Moon"]
        },
        correctAnswer: 1,
        userCorrect: false,
        diff: 2,
        hint: " ",
    }, {
        q: "The most precise timekeeping tool of the ancient world was powered by: ",
        a: {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "Springs", "Water", "Pendulums", "Sunlight"]
        },
        userCorrect: false,
        correctAnswer: 2,
        diff: 1,
        hint: " ",
    }, {
        q: "The most accurate timekeeping devices are: ",
        a: {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "Metronomes", "Quartz-powered", "Quantum Computers", "Atomic Clocks"]
        },
        userCorrect: false,
        correctAnswer: 4,
        diff: 1,
        hint: " ",
    }, {
        q: "A day is _______ seconds long.",
        a: {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "525,600.", "256,800", "24 x 60", "86,400"]
        },
        userCorrect: false,
        correctAnswer: 4,
        diff: 1,
        hint: " ",
    }, {
        q: "Alarm clocks first appeared in ancient ______.",
        a: {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "Rome", "Greece", "China", "Egypt"]
        },
        userCorrect: false,
        correctAnswer: 2,
        diff: 1,
        hint: " ",
    }, {
        q: "Atomic clocks are accurate down to the second over the course of __________.",
        a: {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "Millions of Years", "Caesium's Half-life", "52 light-years x the Plack constant", "Eternity"]
        },
        userCorrect: false,
        correctAnswer: 1,
        diff: 1,
        hint: " ",
    }, {
        q: "The SI base unit of time is the:",
        a: {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "Nanosecond.", "Minute", "Second", "Tic"]
        },
        userCorrect: false,
        correctAnswer: 3,
        diff: 1,
        hint: " ",
    }, {
        q: "What is the 'arm' of a sundial known as?",
        a: {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "triangulator", "gnomon", "chronometer", "T-square"]
        },
        userCorrect: false,
        correctAnswer: 2,
        diff: 1,
        hint: " ",
    }, {
        q: "He invented the minute-hand:",
        a: {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "Jost Burgi", "Duke Richard of Minuet", "Galileo", "Christian Huygens"]
        },
        userCorrect: false,
        correctAnswer: 1,
        diff: 1,
        hint: " ",
    }
    //Questions are from wikipedia entry on "Time". Create more of these when you're able.
];

var theQuestion = "";
var theAnswer = -1;
var answerChoices = [];
var correctAnswerCounter = 0;
var wrongGuesses = -1;
var counter = 0;            //This is the counter for questions presented. Ticks up as each is given.count
var showCurrentQuestion = $("#section-number-" + (counter - 1)).show('slow');
var hidePreviousQuestion = $("#section-number-" + (counter - 1)).hide('fast');
var showNextQuestion = $("#section-number-" + counter).show('slow');
var hideLoadingScreen = $("#section-start").css("visibility", "hidden");
var hideCurrentQuestion = $("#section-number-" + counter).hide('fast');
var showLoadingScreen = $("#section-start").css("visibility", "visible");
var timerLength = (15 - Math.floor((correctAnswerCounter/2)));
var pauseBetween = 2;
var timer = timerLength;
var hideTimer = $("#clock").css("visibility", "hidden");
var showTimer = $("#clock").css("visibility", "visible");
var showTime;
var tick = setInterval(function () {
    myTimer();
}, 1000);
var gameTitle = "On-the-clock Trivia";

//Global functions
//////////////////////////////////////////////////////////////////////////////

function chooseQuestion(questionNumber) {
    theQuestion = question[questionNumber].q;
}
function assignAnswer(questionNumber) {
    theAnswer = question[questionNumber].correctAnswer;
}
function listAnswers(questionNumber) {
    answerChoices = question[questionNumber].a.Choices;
}
function getCurrent(questionNumber) {
    chooseQuestion(questionNumber);
    listAnswers(questionNumber);
    assignAnswer(questionNumber);
}
function populateQuestions(question) {
    numOfQuestionsDesired = question.length                 //Setting this variable to "all questions" for now, but can be dynamic.
    for (var i = 0; i < numOfQuestionsDesired; i++) {
        var workspace = $("#middle");
        var contentArea = $("<div>");
        var showQuestion = $("<span>");
        var answerArea = $("<div>");
        var makeButton = $("<button" + question[i].a.Choices.length + ">");
        var endScreen = $("#end");
        var welcomeScreen = $("#welcome");
        getCurrent(i);
        contentArea.addClass("content-hold");
        contentArea.attr("id", "section-number-" + [i]);
        contentArea.html(showQuestion);
        showQuestion.addClass("question");
        showQuestion.attr(("id", "question-number-" + [i]));
        showQuestion.html(theQuestion);
        contentArea.append(answerArea);
        answerArea.addClass("answers");
        answerArea.attr("id", "answers-to-" + [i]);
        welcomeScreen.html("<h2> Welcome to "+gameTitle+". <br><br> Each round you'll have limited time to answer a question.<br><br> The more you get right, the faster the clock gets! <br><br> Good luck..." );
        endScreen.html("<h2>Game over. <br> Hope you beat the clock! <br><br>You scored a: " +(parseInt(correctAnswerCounter)/parseInt(question.length)*100)+ " %! </h2>");
        workspace.prepend(welcomeScreen);
        workspace.append(endScreen);
        for (var j = 1; j < question[i].a.Choices.length; j++) {
            answerArea.append("<button class='btn' value=" + [i] + [j] + " id=" + [question[i].a.Button[j]] + ">" + " " + question[i].a.Button[j]);
            answerArea.append("  " + question[i].a.Choices[j] + "<br><br>");
        }
        workspace.append(contentArea);

    } //end of for loop
}; //end of populate function
function myTimer() {
    showTime = timer--;
    $(".clock").html("Time remaining this round: " + showTime);
    hideTimer = $("#clock").css("visibility", "hidden");

    if (showTime > timerLength) {
        hideTimer = $("#clock").css("visibility", "hidden");
        showLoadingScreen = $("#section-start").css("visibility", "visible");
        console.log("Break between question");
        pageUpdate();
    } if (showTime <= timerLength) {
        showTimer;
        showTimer = $("#clock").css("visibility", "visible");
        hideLoadingScreen = $("#section-start").css("visibility", "hidden");
        showCurrentQuestion = $("#section-number-" + (counter - 1)).show('slow');
        console.log("Time during the question");
        pageUpdate();
    } if (showTime <= 0) {
        $("#welcome").hide();
        console.log("We're failing here in negative numbers.");
        hideCurrentQuestion = $("#section-number-" + counter).hide('fast');
        hidePreviousQuestion = $("#section-number-" + (counter - 1)).hide('slow');
        wrongGuesses++;
        timer = timerLength + pauseBetween;
        counter++;
        pageUpdate();
    }
}
function pageUpdate() {
    $("#results").html("You've known something interesting " + correctAnswerCounter + " times.<br>You've made: " + wrongGuesses + " wrong guesses...");
    if (correctAnswerCounter + wrongGuesses >= question.length) {
        console.log("End-game condition");
        hideTimer = $("#clock").css("visibility", "hidden");
        hidePreviousQuestion = $("#section-number-" + (counter - 1)).hide('slow');
        $("#end").html("<h2>Game over. <br> Hope you beat the clock! <br><br>You scored a: " +(parseInt(correctAnswerCounter)/parseInt(question.length)*100)+ " %! </h2>");
        $("#end").show();
        clearInterval(tick);
    };
}


//Game Execution 
/////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    populateQuestions(question);    //pushes the question Object into the DOM
    $(".content-hold").hide();      //hides all questions for later use
    pageUpdate();                     //Gives stats
    hideTimer = $("#clock").css("visibility", "hidden");
    showCurrentQuestion = $("#section-number-" + (counter - 1)).show('slow');
    $("#results").css("visibility", "hidden");
    $("#clock").html("The game begins in... "+showTime);
    $("#clock").css("visibility", "hidden");
});//end of 'ready'

window.onload = function () {
    $("#clock").html("The game will begin shortly...get ready!");
    $("#welcome").show('slow');
    $(".btn").on("click", function () {
        console.log(this);
        console.log("This value:  " + $(this).val());

        var coordinates = $(this).val();
        var code = coordinates.split("");
        var currentQuestion = code[0];
        var clickedAnswer = code[1];
        if (clickedAnswer == question[currentQuestion].correctAnswer) {
            console.log("A correct answer is logged.");
            correctAnswerCounter++;
            hidePreviousQuestion = $("#section-number-" + (counter - 1)).hide('slow');
            timer = timerLength + pauseBetween;
            counter++;
            $("#results").css("visibility", "visible");
            pageUpdate();
            return;
        } else if (clickedAnswer != question[currentQuestion].correctAnswer) {
            console.log("A wrong answer was logged.");
            wrongGuesses++;
            hidePreviousQuestion = $("#section-number-" + (counter - 1)).hide('slow');
            timer = timerLength + pauseBetween;
            counter++;
            $("#results").css("visibility", "visible");
            pageUpdate();
            return;
        } else {
            hidePreviousQuestion = $("#section-number-" + (counter - 1)).hide('slow');
            wrongGuesses++;
            console.log("No input was given, mark as 'wrong'.")
            pageUpdate();
            return;

        }
    })


};

///////////////

//playing with better ways to do this




