// A Trivia Game, with a challenge!



//Global variables, arrays and objects
////////////////////////////////////////////////////////////////////////////

    var question = [
        {
            q: "A question string?",
            a: [null, "answer", "b", "This is not right", "Last choice"],
            correctAnswer: 3,
            userCorrect: false,
            diff: 10,
            hint: "a space for hints", 

        },{
            q: "Does this work?",
            a: [null, "Yes", "No", "Maybe", "Here's hoping..."],
            correctAnswer: 4,
            userCorrect: false,
            diff: 7,
            h: "We're in development", 
        },{
            q: "True, False, Frue or Talse?",
            a: [null, "Yes", "What?!", "True", "False"],
            userCorrect: false,
            correctAnswer: 2,
            diff: 1,
            h: "A genuine reaction.", 
        }
        //make a bunch more of these. find a 3rd party so I don't have to think of tons of questions.
    ];

var theQuestion = "";
var theAnswer = -1;
var answerChoices = [];


//Global functions
//////////////////////////////////////////////////////////////////////////////

function chooseQuestion(questionNumber){
   theQuestion = question[questionNumber].q;
}




console.log(chooseQuestion(1));
console.log(chooseQuestion(2));
chooseQuestion(1);
console.log(theQuestion);
chooseQuestion(2);
console.log(theQuestion);


function assignAnswer(questionNumber){
    theAnswer = question[questionNumber].correctAnswer;
}

console.log(theAnswer);
assignAnswer(1);
console.log(theAnswer);

function listAnswers(questionNumber){
    answerChoices = question[questionNumber].a;
}

console.log(answerChoices);
listAnswers(1);
console.log(answerChoices);


function getCurrent(i){
    chooseQuestion(i);
    listAnswers(i);
    assignAnswer(i);
}

console.log(theAnswer);
console.log(theQuestion);
console.log(answerChoices);

getCurrent(2);
console.log(theAnswer);
console.log(theQuestion);
console.log(answerChoices);

getCurrent(1);

console.log(theAnswer);
console.log(theQuestion);
console.log(answerChoices);

getCurrent(0);

console.log(theAnswer);
console.log(theQuestion);
console.log(answerChoices[1]);
console.log(answerChoices[2]);
console.log(answerChoices[3]);
console.log(answerChoices[0]);


////////////


// questionElement = 




{/* <button type="button" class="btn btn-secondary" id="btn1">A.</button><span id="A1"> Here's a question.</span> */}


//Game Execution 
/////////////////////////////////////////////////////////////////////////////



// document.onkeyup();





//Notes to myself, to-dos, pseudocode and future development notes: