// A Trivia Game, with a challenge!



//Global variables, arrays and objects
////////////////////////////////////////////////////////////////////////////

var question = [
    {
        q: "A question string?",
        a:  {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "answer", "b", "This is not right", "Last choice"]
            },
        correctAnswer: 3,
        userCorrect: false,
        diff: 10,
        hint: "a space for hints",

    }, {
        q: "Does this work?",
        a:  {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "Yes", "No", "Maybe", "Here's hoping..."]
            },
        correctAnswer: 4,
        userCorrect: false,
        diff: 7,
        hint: "We're in development",
    }, {
        q: "True, False, Frue or Talse?",
        a:  {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "Yes", "What?!", "True", "False"]
            },
        userCorrect: false,
        correctAnswer: 2,
        diff: 1,
        hint: "A genuine reaction.",
    }, {
        q: "True, False, Frue or Talse?",
        a:  {
            Button: [null, "A.", "B.", "C.", "D."],
            Choices: [null, "Yes", "What?!", "True", "False"]
            },
        userCorrect: false,
        correctAnswer: 2,
        diff: 1,
        hint: "A genuine reaction.",
    }
    //make a bunch more of these. find a 3rd party so I don't have to think of tons of questions.
];

var theQuestion = "";
var theAnswer = -1;
var answerChoices = [];
//
var correctAnswerCounter = 0;
var wrongGuesses = 0;
var correctFlag = 2;     // We need more states than true/false. So:  0=false, 1=true, 2=reset (waiting for answer) 
var counter = 0;            //This is the counter for questions presented. Ticks up as each is given.



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



function pageUpdate(){
    $("#results").html("Correct counter: "+correctAnswerCounter +"  /  Wrong counter:"+ wrongGuesses+"..." );
}


//Let's create the html to fill, dynamically:




function populateQuestions(question){
    numOfQuestionsDesired = question.length    //Setting this variable to "all questions" for now, but can be dynamic.

    


for (var i = 0; i<numOfQuestionsDesired; i++){

    var workspace = $("#middle");
    var contentArea = $("<div>");
    var showQuestion = $("<span>");
    var answerArea = $("<div>");
    var makeButton = $("<button"+question[i].a.Choices.length+">")
    
    getCurrent(i);
    contentArea.addClass("content-hold");
    contentArea.attr("id", "section-number-"+[i]);
    contentArea.html(showQuestion);

        showQuestion.addClass("question");
        showQuestion.attr(("id", "question-number-"+[i]));
        
        showQuestion.html(theQuestion);

    contentArea.append(answerArea);
        
        answerArea.addClass("answers");
        answerArea.attr("id", "answers-to-"+[i]);
            for (var j = 1; j<question[i].a.Choices.length; j++){
        answerArea.append("<button class='btn' value="+[i]+[j]+" id=" + [question[i].a.Button[j]] + ">" + " " + question[i].a.Button[j]);
        answerArea.append("  "+question[i].a.Choices[j]+"<br><br>");
        }           

        console.log(question[i]);
        console.log(question[i].a);
        console.log(question[i].a.Choices);
        console.log(question[i].a.Choices.length);
         
    workspace.append(contentArea);

} //end of for loop
}; //end of populate function

function presentQuestion(answerTime){
    
    window.setTimeout(function() {
    $("#section-number-"+(counter-1)).hide('fast');
    var revealNextQuestion = $("#section-number-"+counter).show('slow');
    console.log(counter);
    

        
        
}, answerTime);
}




$(document).ready(function(){


populateQuestions(question);

$(".content-hold").hide();

});//end of 'ready'



//Game Execution 
/////////////////////////////////////////////////////////////////////////////



document.onkeyup = function () {
    
    
    presentQuestion(10000); 



$(".btn").on("click", function(){
    console.log(this);
    console.log("This value:  " +$(this).val());

                

    var coordinates = $(this).val();
    var code =   coordinates.split("");
    var currentQuestion = code[0];
    var clickedAnswer = code[1];

        console.log(code);
        console.log("Question? " + currentQuestion);
        console.log("My guess:  "+ clickedAnswer);


        console.log("True1 " +clickedAnswer);
        console.log("True2 " +question[currentQuestion].correctAnswer);


    if (clickedAnswer == question[currentQuestion].correctAnswer){
        console.log("A correct answer is logged.");
        correctAnswerCounter++;
        clearInterval(questionTime);
        counter++;
        presentQuestion(answerTime);
        pageUpdate();
    
    } else if (clickedAnswer != question[currentQuestion].correctAnswer){
        console.log("A WRONG answer was logged");
        wrongGuesses++;
        clearInterval(questionTime);
        counter++;
        pageUpdate();
        presentQuestion(answerTime);
        
    

    } else {
        console.log("No answer given yet, or we're reset")
            counter++;
            pageUpdate();
            presentQuestion(answerTime);
        
    }
})

// $(".btn").on("click", function(){
//     alert("The click works!");
// })



    console.log("OnKey has activated");


}
//Notes to myself, to-dos, pseudocode and future development notes: