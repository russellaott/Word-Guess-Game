// GLOBAL VARIABLES (Accessible by all functions)
// ==================================================================================================

// Array of Word Options (all lowercase)
var wordsList = [
    "dog",
    "cat",
    "giraffe",
    "lizard",
    "fish",
    "snake",
    "zebra",
    "monkey",
    "tiger",
    "yeet",
    "babboon",
    "lemur",
    "lion",
    "eel",
    "lobster",
    "crab",
    "doggo",
    "pupperino",
    "unicorn",
    "butterfly",
    "centipede",
    "ants",
    "frog",
    "crane",
    "duck",
    "goose",
  ];
// Variable that holds the winning word
var chosenWord = "";

var lettersInChosenWord = [];
// Variable that shows the number of blank letters in our solution word 
var numBlanks = 0;
// Variable that shows the pending solution word at the blanks are filled in by correct letters 
var blanksAndSuccesses = [];
// Holds all of the wrong guesses
var wrongGuesses = [];
  
// Variable that shows the number of wins
var winCount = 0;
// Variable that shows the number of losses
var lossCount = 0;
// Variable that shows the number of guesses left in the current game
var numGuesses = 10;
  
// Functions that give rules to the game
function newGame() {
// Reset the guesses back to 0.
numGuesses = 10;
  
// Function that pulls the random word from our word bank
chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
// Function that breaks our solution word up into letters
lettersInChosenWord = chosenWord.split("");
// Function that counts the number of letters in our solution word
numBlanks = lettersInChosenWord.length;
// This is used to print our solution word to the console for debugging purposes
console.log(chosenWord);
// Resets our stats after each game
blanksAndSuccesses = [];
// Resets the stats for our wrong guess counter 
wrongGuesses = [];
// This for loop fills our blanksAndSuccesses array with the appropriate number of blanks for our solution word
for (var i = 0; i < numBlanks; i++) {
      blanksAndSuccesses.push("_");
    }
// Print the initial blanks to console log
console.log(blanksAndSuccesses);
  
// Resets our number of guesses remaining
document.getElementById("guesses-left").innerHTML = numGuesses;
// Prints the blanks at the beginning of each round in the HTML
document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
// Clears the wrong guesses that were accumulated from the previous game
document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
  }
// Function that compares to see if letters are correct is created here
function checkLetters(letter) {
// Boolean that is used while we determing if the letter guessed is in the solution word
var letterInWord = false;
// For loop used to check if our letter exists in the array
for (var i = 0; i < numBlanks; i++) {
if (chosenWord[i] === letter) {
// If the letter exists we change this boolean to true for use in the next step 
letterInWord = true;
    }
}
//If statement to be used if the letter is found
if (letterInWord) {
// This for loop runs through the array to find its index position
for (i = 0; i < numBlanks; i++) {
// Shows the specific blank space that we now replace with this letter 
if (chosenWord[i] === letter) {
blanksAndSuccesses[i] = letter;
    }
}
// This logs the result to our console for debugging purposes
console.log(blanksAndSuccesses);
    }
// If we determine that the guessed letter is not found anywhere in our solution word
else {
// We add the letter to the box that holds all our wrong guesses and then we subtract one from the number of guesses remaining
wrongGuesses.push(letter);
numGuesses--;
    }
}
// roundComplete() function
// This function is run after each round of the game has been completed regardless of if it was a win or a loss
function roundComplete() {
// This updates our HTML element to reflect the number of guesses remaining
document.getElementById("guesses-left").innerHTML = numGuesses;
// This updates the element in HTML holding our solution word that shows the current correctly guesses letters and remaining blanks that hold solution letters
document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
// This updates the element in HTML that holds the number of wrong guesses 
document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
// This if statement is run when we finish a round by completing the solution statement and winning this round
if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
// We add one to the game win counter 
winCount++;
// This alerts the user with a pop up that lets them know they escaped the animal attack and won the round
alert("Congratulations! You survived the animal attack and move on to the next round!");
// This updates the win counter element in our HTML 
document.getElementById("wins").innerHTML = winCount;
newGame();
    }
// If we run out of lives/guesses remaining 
else if (numGuesses === 0) {
// We add one to the game loss counter 
lossCount++;
// Give the user an alert.
alert("You did not survive the animal attack :( Please try again...");
// This updates the loss counter element in our HTML
document.getElementById("losses").innerHTML = lossCount;
// This function starts a new game
newGame();
    }
}
//This RUNS the function that starts up our new game
newGame();
// This RUNS our on key function when a key is clicked on our keyboard
document.onkeyup = function(event) {
var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
// This RUNS our code that checks the letter that was clicked/guessed to determine if it is correct and part of our solution word
checkLetters(letterGuessed);
// This RUNS the function after each round is completed
roundComplete();
};