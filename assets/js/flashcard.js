//Flash Card Generator with flash card cloze
var newflash = require("./cardf.js");
var inquirer = require("inquirer");
var request = require("request");
var vtext = [];
var clozey = [];
var vQuiz = [];
var str = [];
var lineChar = "-";
var dash = ".";
var score = 0;
vtext = newflash.ntext;
clozey = newflash.clozekey;
var qLength = vtext.length;

function menu() {
    process.stdout.write('\033c');
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
        var dashSize = dash.repeat(clozey1.length)
        var x = str.replace(clozey1, dashSize);

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

            score = score+1;
            console.log("Good Job! your score is " + score);
           
        } else {
            console.log("The Correct Answer is " + clozey[qIndex]);
           
        }
        enterToCont();
        
    })
}

function tempPause() {
    setTimeout(function() {
        //process.stdout.write('\033c');
        menu();
    }, 3000);

}



function enterToCont() {
    inquirer.prompt([{
        type: "input",
        name: "enter",
        message: "Press <Enter> to Continue..."
    }]).then(function(user) {
    	menu();
    });
}

menu();
buildQuiz();