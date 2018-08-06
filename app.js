// A Trivia Game...on the clock!


//Global variables, arrays and objects
////////////////////////////////////////////////////////////////////////////

var question = [
    {
        q: "What's my favorite book?",
        a: {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "Flowers for Algernon", "Redwall", "Ender's Game", "Harry Potter and the Philosopher's Stone"]
        },
        correctAnswer: 3,
        userCorrect: false,
        diff: 10,
        hint: " ",

    }, {
        q: "What author wrote the last book that I read?",
        a: {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "Stephen King", "Arthur C. Clarke", "Robin McKinley", "Brandon Sanderson"]
        },
        correctAnswer: 1,
        userCorrect: false,
        diff: 7,
        hint: " ",
    }, {
        q: "Which prestigious literary award was awarded to Lois Lowry's 'The Giver'?",
        a: {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "The Pulitzer Prize", "The Newbery Medal", "The Hugo Award", "The Nobel Prize in Literature"]
        },
        userCorrect: false,
        correctAnswer: 2,
        diff: 1,
        hint: " ",
    }, {
        q: "Is this the last question that I'm putting in for now?",
        a: {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "False.", "What?!", "Nah!", "Yeah..."]
        },
        userCorrect: false,
        correctAnswer: 4,
        diff: 1,
        hint: " ",
    }
    //make a bunch more of these. find a 3rd party so I don't have to think of tons of questions.
];

var theQuestion = "";
var theAnswer = -1;
var answerChoices = [];
//
var correctAnswerCounter = 0;
var wrongGuesses = 0;
var counter = 0;            //This is the counter for questions presented. Ticks up as each is given.count

var showCurrentQuestion = $("#section-number-" + (counter - 1)).show('slow');
var hidePreviousQuestion = $("#section-number-" + (counter - 1)).hide('fast');
var showNextQuestion = $("#section-number-" + counter).show('slow');
var hideLoadingScreen = $("#section-start").css("visibility", "hidden");
var hideCurrentQuestion = $("#section-number-" + counter).hide('fast');
var showLoadingScreen = $("#section-start").css("visibility", "visible");
var timerLength = 10;
var pauseBetween = 3;
var timer = timerLength;
var hideTimer = $("#clock").css("visibility", "hidden");
var showTimer = $("#clock").css("visibility", "visible");
var showTime;





//Global functions
//////////////////////////////////////////////////////////////////////////////

function chooseQuestion(questionNumber) {
    console.log("questionNumber: ", questionNumber);
    console.log("question: ", question);
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
    numOfQuestionsDesired = question.length    //Setting this variable to "all questions" for now, but can be dynamic.
    for (var i = 0; i < numOfQuestionsDesired; i++) {

        var workspace = $("#middle");
        var contentArea = $("<div>");
        var showQuestion = $("<span>");
        var answerArea = $("<div>");
        var makeButton = $("<button" + question[i].a.Choices.length + ">")

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
        for (var j = 1; j < question[i].a.Choices.length; j++) {
            answerArea.append("<button class='btn' value=" + [i] + [j] + " id=" + [question[i].a.Button[j]] + ">" + " " + question[i].a.Button[j]);
            answerArea.append("  " + question[i].a.Choices[j] + "<br><br>");
        }

        workspace.append(contentArea);

    } //end of for loop
}; //end of populate function

function pageUpdate() {
    $("#results").html("You've known something interesting " + correctAnswerCounter + " times.<br>You've made: " + wrongGuesses + " wrong guesses...");
    if (correctAnswerCounter + wrongGuesses >= question.length) {
        console.log("End-game condition");
        $("#end").html("<h2>Game over. Hope you beat the clock! See your score below!</h2>");
        $("#end").show();
        clearInterval(tick);
    };
}

// var questionCountdown = function () {

//     setTimeout(questionTimeExpires, 1000 * 12);
//     setTimeout(totalTimeExpires, 1000 * 14);
//     setTimeout(totalTime, 1000 * 16);

function questionTimeExpires() {
    console.log("No time left to answer.")
    hidePreviousQuestion = $("#section-number-" + (counter - 1)).hide('slow');
}
function totalTimeExpires() {
    showLoadingScreen = $("#section-start").css("visibility", "visible");
    console.log("Display results")
}
function totalTime() {

    console.log("Push next question.")
    //push next question.
    hideLoadingScreen = $("#section-start").css("visibility", "hidden");
    showNextQuestion = $("#section-number-" + counter).show('slow');
    counter++;
    pageUpdate();
    // questionCountdown();
}
// }

// var questionOnTimer = function() {









//Game Execution 
/////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    populateQuestions(question);    //pushes the question Object into the DOM
    $(".content-hold").hide();      //hides all questions for later use
    pageUpdate();                     //Gives stats

    showCurrentQuestion = $("#section-number-" + (counter - 1)).show('slow');
    // questionCountdown();
});//end of 'ready'

window.onload = function () {

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
            // counter++;
            // presentQuestion(answerTime);
            pageUpdate();
            return;
        } else if (clickedAnswer != question[currentQuestion].correctAnswer) {
            console.log("A WRONG answer was logged");
            wrongGuesses++;
            hidePreviousQuestion = $("#section-number-" + (counter - 1)).hide('slow');
            timer = timerLength + pauseBetween;
            // counter++;
            pageUpdate();
            // presentQuestion(answerTime);
            return;
        } else {
            console.log("No answer given yet, or we're reset")
            wrongGuesses++;
            console.log("no answer = a miss")
            pageUpdate();
            // presentQuestion(answerTime);
            return;

        }
    })


};

///////////////

//playing with better ways to do this


var tick = setInterval(function () {
    myTimer();
}, 1000);

function myTimer() {
    showTime = timer--;
    $("#clock").html(showTime);


    if (showTime > timerLength) {
        hideTimer;
        showLoadingScreen = $("#section-start").css("visibility", "visible");
        console.log("Break between question");
    } if (showTime <= timerLength) {
        showTimer;
        hideLoadingScreen = $("#section-start").css("visibility", "hidden");
        showCurrentQuestion = $("#section-number-" + (counter - 1)).show('slow');
        console.log("Time during the question");
    } if (showTime <= 0) {
        console.log("We're failing here in negative numbers.");
        hideCurrentQuestion = $("#section-number-" + counter).hide('fast');
        timer = timerLength + pauseBetween;
    }
}


var showCurrentQuestion = $("#section-number-" + (counter - 1)).show('slow');
var hidePreviousQuestion = $("#section-number-" + (counter - 1)).hide('fast');
var showNextQuestion = $("#section-number-" + counter).show('slow');
var hideLoadingScreen = $("#section-start").css("visibility", "hidden");
var hideCurrentQuestion = $("#section-number-" + counter).hide('fast');
var showLoadingScreen = $("#section-start").css("visibility", "visible");

$(document).on("click", function () {

});