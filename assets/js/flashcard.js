//Flash Card Generator with flash card cloze
var newflash = require("./cardf.js"); //Getting Question Bank
var inquirer = require("inquirer");
var request = require("request");
// Defining Global variables
var vtext = [];
var clozey = [];
var vQuiz = [];
var str = [];
var lineChar = "-";
var dash = ".";
var score = 0;
//**** Constructor Function for flash card
function flashCard(dtext, myclozekey) {
    this.backText = dtext;
    this.backClozey = myclozekey;
    this.textlength = dtext.length;
}
// ******** Creating flash card back object *****
var vtext1 = new flashCard(newflash.ntext, newflash.clozekey);
vtext = vtext1.backText; // asigning to global variable
clozey = vtext1.backClozey;
var qLength = vtext1.textlength; // getting the number of questions

function menu() {
    process.stdout.write('\033c'); //Clearing the screen

    inquirer.prompt([{
        type: "list",
        name: "myChoices",
        message: "------(FLASH CARD MENU)------",
        choices: ["Play Game", "Show Cards", "Exit"] // Menu to Choose Options

    }, ]).then(function(user) {

        if (user.myChoices === "Show Cards") {
            showcards();
        }
        if (user.myChoices === "Play Game") {
            showQuiz();
        }
        if (user.myChoices === "Exit") {
            process.exit();
        }
    })
}
// Showing Cards
function showcards() {
    for (var i = 0; i < qLength; i++) {
        var lineSize = lineChar.repeat(vtext[i].length);
        console.log('+' + lineSize + '+');
        console.log('|' + vtext[i] + '|');
        console.log('+' + lineSize + '+');
    }

    tempPause();

}

// ************* Building Quiz
function buildQuiz() {
    for (var i = 0; i < qLength; i++) {
        var str = vtext[i];
        var clozey1 = clozey[i];
        var dashSize = dash.repeat(clozey1.length) // Calculating length of quiz word
        var x = str.replace(clozey1, dashSize); // Swapping quizword with dash

        vQuiz[i] = x;
    }
}

// Playing Flash Card Game
function showQuiz() {
    var qIndex = Math.floor((Math.random() * qLength));
    var lineSize = lineChar.repeat(vQuiz[qIndex].length);

    console.log('+' + lineSize + '+');
    console.log('|' + vQuiz[qIndex] + '|');
    console.log('+' + lineSize + '+');
    inquirer.prompt([{
        type: "input",
        name: "ans",
        message: "Answer?",
    }, ]).then(function(user) {
        var upperIn = user.ans.toUpperCase();
        var upperComp = clozey[qIndex].toUpperCase();
        if (upperIn === upperComp) {

            score = score + 1;
            console.log("Good Job! your score is " + score);

        } else {
            console.log("The Correct Answer is " + clozey[qIndex]);

        }
        enterToCont();

    })
}
// function to give pause
function tempPause() {
    setTimeout(function() {
        //process.stdout.write('\033c');
        menu();
    }, 3000);

}


// function to create message after quiz question
function enterToCont() {
    inquirer.prompt([{
        type: "input",
        name: "enter",
        message: "Press <Enter> to Continue..."
    }]).then(function(user) {
        menu();
    });
}

menu(); // Calling Menu
buildQuiz(); // Calling buildQuiz function 
// --------------- End of Code -----------------