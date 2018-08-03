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
var correctAnswers = 0;
var wrongGuesses = 0;




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
         
        
        
       
        





        // for(var j= 1; j<(question[0].a.length); j++){
        //     makeButton.attr("id", "answer-"+[j]);
        //     makeButton.attr("value", [j]);
        //     makeButton.text([j]+".")
        //     answerArea.append(makeButton);   
        // }

   
//
// function populateChoices(){    //where j is  number of answers to your questions so question.a.length-1
//     for(var j= 1; j<(question.a.length-1); j++){
//         specificAnswer = question.a[j];
//     }
// };





//
    workspace.append(contentArea);

} //end of for loop
}; //end of populate function


$(document).ready(function(){


populateQuestions(question);

$(".content-hold").hide();

});//end of 'ready'




// div class="content-hold" id ="section-number-">
//                     <h3><span id="question">Put your question here.</span></h3>
//                     <div>
//                             <button type="button" class="btn btn-secondary" id="btn1">A.</button>
//                             <span id="A1"> Here's an answer. </span><br>
//                             <button type="button" class="btn btn-secondary" id="btn2">B.</button>
//                             <span id="A2"> Here's another one. </span><br>
//                             <button type="button" class="btn btn-secondary" id="btn3">C.</button>
//                             <span id="A3"> Here's the third possibility. </span><br>
//                             <button type="button" class="btn btn-secondary" id="btn4">D.</button>
//                             <span id="A4"> AND...one last one. </span><br>
//                     </div>
//                 </div>




////////////

// questionElement = 







//Game Execution 
/////////////////////////////////////////////////////////////////////////////



document.onkeyup = function () {
    var counter = -1;
    window.setInterval(function(){
    $("#section-number-"+(counter-1)).hide();
    var revealNextQuestion = $("#section-number-"+counter).show();
    console.log(counter);
    counter++;
    console.log(counter);
}, 5000);



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
        alert("You earned a point.");
        correctAnswer++;
            //RIGHT ANSWER EVENTS HERE.
    } else if (clickedAnswer != question[currentQuestion].correctAnswer){
        alert("You got it WRONG!");
        wrongGuesses++;
            //WRONG GUESS EVENTS HERE.
    }       



})

// $(".btn").on("click", function(){
//     alert("The click works!");
// })


// $("#section-number-1").show();


    console.log("OnKey has activated");


}
//Notes to myself, to-dos, pseudocode and future development notes: