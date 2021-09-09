// init();

// function init() {
// constructor function to Initialize all question objects (i.e question + Multiple choice Options)
function QuestionSet(question, option1, option2, option3, option4) {
  this.question = question;
  this.option1 = option1;
  this.option2 = option2;
  this.option3 = option3;
  this.option4 = option4;
}

var quesInfo = ["Sikkim", "Arunachal Pradesh", "Manipur", "Rajasthan", "Mizoram", "Andhra Pradesh", "Orissa", "Meghalaya", "Assam", "Tamil Nadu"];
var option1Info = ["kohima", "Itanagar", "Imphal", "panaji", "dispur", "Amaravathi", "itanagar", "itanagar", "mumbai", "Chennai"];
var option2Info = ["Gangtok", "Hyderabad", "Hyderabad", "Jaipur", "chennai", "Hyderabad", "Bhuvaneshwar", "Shillong", "jaipur", "imphal"];
var option3Info = ["dispur", "dispur", "amaravathi", "imphal", "shillong", "kohima", "Bhopal", "aizwal", "chennai", "shimla"];
var option4Info = ["itanagar", "Shimla", "Bastar", "Shimla", "Aizwal", "shimla", "chandigarh", "dispur", "Dispur", "amaravathi"];
var quesarray = []; // array containing 10 question objects after being pushed into it
for (var j = 0; j <= 9; j++) // looping to display a list of all question objects which are to be initialized
{
  var ques = new QuestionSet("What is the capital of" + " " + quesInfo[j] + "?", option1Info[j], option2Info[j], option3Info[j], option4Info[j]);
  quesarray.push(ques);
}
var length = quesarray.length; /* used to generate the random numbers*/
var randomPattern = []; /*Empty array to push all the randomly generated ques objects*/
var userClickPattern = [];
var finalScore = []; /*Empty array to push incremented score when answer for question is correct*/
var k = 1; /* variable k to generate serial number for questions generated randomly */
var start = false; /*Boolean for initial keypress event to start the quiz content*/
var point = 0; /*variable to update the score as soon as my answer to question is correct */
var timerSound = new Audio("sounds/game sound.mp3");
timerSound.loop = true;
beforeGameStart(); /* function call to hide the container containing question object(i.e. question and four multiple choice answers) before game start */
gameSoundButtons();
begin(start);
// }



function gameSoundButtons() {
  document.querySelector("#stopSound").addEventListener("click", function() {
    timerSound.pause();
  });
  document.querySelector("#playSound").addEventListener("click", function() {
    timerSound.play();
  });
}


// keypress event for the game to start
function begin(action) {
  document.querySelector("#buttonclick").addEventListener("click", function() {
    if (!action) {
      headUpdate(); /* function call to update score after game start*/
      quizSequence(); /*function call to generate first random question as soon as game start */
      start = true;
      afterGameStart(); /*function call to show the container containing question object after game starts*/
      gameStartSound(userClickPattern.length); /*function call to play the background game sound*/

    }
  });
}

// function definition for title updation to increment score for every correct answer
function headUpdate() {
  document.querySelector("h1").innerHTML = "Your Score is" + " " + point + "/5" + ".";
  if (point === 0) {
    point++;
  } else {
    finalScore.push(point);
    point++;
  }

}

// function definition for randomly generated questions
function quizSequence() {
  var rand = Math.random();
  rand = rand * length;
  var randomNumber = Math.floor(rand);
  console.log("questions array:", quesarray);
  setTimeout(function() {
    randomPattern.push(quesarray[randomNumber]); /* randomly generated question objects are pushed into array for calculating length which is used to end quiz after 10 questions completed */
  }, 200);
  // placing all the content(question + multiple choice options) of randomly generated question object
  document.querySelector("#demo1").innerHTML = k + ".)" + " " + quesarray[randomNumber].question;
  document.getElementById("demo2").innerHTML = quesarray[randomNumber].option1;
  document.getElementById("demo3").innerHTML = quesarray[randomNumber].option2;
  document.getElementById("demo4").innerHTML = quesarray[randomNumber].option3;
  document.getElementById("demo5").innerHTML = quesarray[randomNumber].option4;
  // class added and removed to blink a block while generating next random question
  document.querySelector(".container").classList.add("blink");
  setTimeout(function() {
    document.querySelector(".container").classList.remove("blink");
  }, 300);
  // quesarray.splice(randomNumber, 1); /* array splicing to avoid repetetion of randomly generated question objects */
  // length--;
  k++; /*serial number increment for each new question generated*/
}

// code for the click event ( i.e to click on my answer to question)
var length1 = document.querySelectorAll(".optionclick").length;
for (var i = 0; i < length1; i++) {
  document.querySelectorAll(".optionclick")[i].addEventListener("click", function() {
    var clickContent = this.innerText;
    userClickPattern.push(clickContent);
    // condition for correct answer of each randomly generated questions
    if ((clickContent === quesarray[0].option2) || (clickContent === quesarray[1].option1) || (clickContent === quesarray[2].option1) || (clickContent === quesarray[3].option2) || (clickContent === quesarray[4].option4) || (clickContent === quesarray[5].option1) || (clickContent === quesarray[6].option2) || (clickContent === quesarray[7].option2) || (clickContent === quesarray[8].option4) || (clickContent === quesarray[9].option1)) {

      if (userClickPattern.length <= 4) {
        headUpdate(); /*function call to update my score after answer to my question is correct*/
        correctAnswerStyle(this); /*function call to add styling when my answer is correct*/

        // function call for next randomly generated question object after correct answer for current question object
        setTimeout(function() {
          quizSequence();
        }, 1500);
      } else {
        headUpdate(); /*function call to update my score after answer to my question is correct*/
        correctAnswerStyle(this);
        setTimeout(function() {
          endQuiz(); /*ending of quiz after 10th question answer is correct*/
          gameStartSound(userClickPattern.length);
        }, 1500);
      }
    }
    // else condition for wrong answers of randomly generated question
    else {
      if (userClickPattern.length <= 4) {
        wrongAnswerStyle(this); /*function call to add styling when my answer is incorrect*/
        // function call for next randomly generated question object after wrong answer for current question object
        setTimeout(function() {
          quizSequence();
        }, 1500);
      } else {
        wrongAnswerStyle(this);
        setTimeout(function() {
          endQuiz(); /* ending of quiz after 10th question answer is wrong */
          gameStartSound(userClickPattern.length); /* function call to stop background game sound after quiz of 10 questions is completed*/
        }, 1500);
      }
    }
  });
}

// function definition  to display final score after the quiz of 10 questions is ended and reset all the variables to begin new game
function endQuiz() {
  if ((finalScore.length === 5)) {
    document.querySelector("h1").innerHTML = "Your final score is" + " " + (finalScore.length) + "/5" + "<br>" + "Wow!! Perfect" + "<br>" + "click to continue";
    gameCompleteSound(1); /*function call to add sound after final score display */
    afterGameEnd(); // function call to hide the question object container after game end and reset all the stuff
  } else if ((finalScore.length > 3) && (finalScore.length < 5)) {
    document.querySelector("h1").innerHTML = "Your final score is" + " " + (finalScore.length) + "/5" + "<br>" + "Ok!! Better" + "<br>" + "click to continue";
    gameCompleteSound(2);
    afterGameEnd(); // function call to hide the question object container after game end and reset all the stuff
  } else {
    document.querySelector("h1").innerHTML = "Your final score is" + " " + (finalScore.length) + "/5" + "<br>" + "Hmmmm!! Better luck " + "<br>" + "click to continue";
    gameCompleteSound(0);
    afterGameEnd(); // function call to hide the question object container after game end and reset all the stuff
  }
}

// function definition to hide the question object container before game start
function beforeGameStart() {
  document.querySelector("h1").classList.add("sizing");
  document.querySelector(".container").classList.add("hidden");
  document.querySelector("#buttonnext").classList.add("buttonNextStyle");
  document.querySelector(".playStopMusic").classList.add("playStopDisplay");
}

// function definition to show the question object container after game start
function afterGameStart() {
  document.querySelector(".container").classList.remove("hidden");
  document.querySelector("h1").classList.remove("sizing");
  document.querySelector("#buttonclick").classList.add("hidden1");
  document.querySelector(".playStopMusic").classList.remove("playStopDisplay");
}

// function definition to start the background game sound and remove after quiz is over to display final score
function gameStartSound(lengthRand) {
  if (lengthRand === 5) {
    timerSound.pause(); /*when game of 10 question is over and final score is displayed,the game background should stop*/
    timerSound.currentTime = 0;
  } else {
    timerSound.play();
  }
}

// function definition to hide the question object container after the game end and reset all stuff.With a key press start the next game..
function afterGameEnd() {
  document.querySelector("h1").classList.add("sizing");
  document.querySelector(".container").classList.add("hidden");
  document.querySelector("#buttonnext").classList.remove("buttonNextStyle");
  document.querySelector(".playStopMusic").classList.add("playStopDisplay");
  document.querySelector("#buttonnext").addEventListener("click", function() {
    quesarray = quesarray.concat(randomPattern);
    randomPattern = [];
    userClickPattern = [];
    finalScore = [];
    k = 1;
    point = 0;
    headUpdate();
    quizSequence();
    gameStartSound(userClickPattern.length);
    document.querySelector(".container").classList.remove("hidden");
    document.querySelector("h1").classList.remove("sizing");
    document.querySelector("#buttonnext").classList.add("buttonNextStyle");
    document.querySelector(".playStopMusic").classList.remove("playStopDisplay");
  });
}

// function definiton to add and remove class for styling after my answer is correct
function correctAnswerStyle(content) {
  setTimeout(function() {
    content.classList.add("option-style");
  }, 100);
  setTimeout(function() {
    content.classList.remove("option-style");
  }, 800);
  var correctSound = new Audio("sounds/correct answer.mp3");
  correctSound.play();
}

// function definition to add and remove class for styling after my answer is wrong
function wrongAnswerStyle(content1) {
  setTimeout(function() {
    content1.classList.add("option-wrong-style");
  }, 100);
  setTimeout(function() {
    content1.classList.remove("option-wrong-style");
  }, 800);
  var wrongSound = new Audio("sounds/wrong answer.wav");
  wrongSound.play();
}

// function definition to add sound after the final score is displayed
function gameCompleteSound(i) {
  var i;
  var loc = "sounds/" + "game" + " " + i + ".mp3";
  var complete = new Audio(loc);
  complete.play();
}


/* CODE FOR TIMER */

// function timer() {
//   var countTimer;
//   var count=20;
//   countTimer = setInterval(decrease, 1000);
//
//  function decrease() {
//     if(count === 0)
//       {
//         clearInterval(countTimer);
//         quizSequence();
//       }
//
//     else
//       {
//         count--;
//         document.querySelector(".rambo").innerHTML=count;
//       }
//   }
// }




// var quesarray = [ques1, ques2, ques3, ques4, ques5, ques6, ques7, ques8, ques9, ques10, ques11, ques12, ques13, ques14, ques15, ques16, ques17, ques18, ques19, ques20];
// var length = quesarray.length; /*to generate the random numbers*/






/*TRIED THIS TO GO BACK TO HOME PAGE AFTER MY FINAL SCORE IS PERFECT. */
// document.querySelector("h1").classList.add("sizing");
// document.querySelector(".container").classList.add("hidden");
// document.addEventListener("click", function() {
//   beforeGameStart();
//   document.querySelector("h1").innerHTML = "Test your IQ";
//   document.querySelector("#buttonclick").classList.remove("hidden1");
//
//
//   //   document.querySelector("h1").classList.add("sizing");
//   //   document.querySelector(".container").classList.add("hidden");
//   //   document.querySelector("#buttonclick").classList.remove("hidden1");
//   quesarray = quesarray.concat(randomPattern);
//   randomPattern = [];
//   userClickPattern = [];
//   finalScore = [];
//   k = 1;
//   point = 0;
//   start = false;
//   begin();
//
// });

/* to play the background sound throught the game*/
// var timerSound = new Audio("sounds/game sound.mp3");
// timerSound.play();
