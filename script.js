/**
 * Created by ryansouthard on 7/8/17.
 */


var guessedLetters = [];
var words = ['awkward', 'bagpipes', 'cowboy', 'beheaded', 'crime', 'coffin', 'death', 'fraud', 'horse', 'thief', 'gallows', 'gypsy', 'hangman', 'robber', 'noose', 'west'];
var currentWord = "";
var displayWord = "";
var guessesLeft = 8;
var youWon = 0;
var youLost = 0;
var gameOver = false;
var hasStartedGame = false;

//event.key = letter guessed by player
$(function () {
    clearGame()
    $(document).on("keyup", function (event) {
        //if game hasnt started, do nothing, any keyup should hide initialMessage and show hangmanContent
        if (!hasStartedGame) {
            $("#hangmanContent").removeClass("hide");
            $("#initialMessage").addClass("hide");
            hasStartedGame = true;
            return;
        }
        var currentGuess = event.key;
        if (validate(currentGuess)) {
            if (currentWord.includes(currentGuess)) {
                for (var i = 0; i < currentWord.length; i++) {
                    if (currentWord.charAt(i) === currentGuess) { //for every letter in currentWord loop through and replace displayword at that index
                        displayWord = replaceAt(displayWord, i, currentGuess);
                    }
                }
                $("#displayWord").html("Current Word: " + displayWord)
            } else {
                if (guessesLeft > 0) {
                    guessesLeft -= 1;
                }//guessesLeft = guessesLeft -1)
                $("#guessRemaining").html("Guesses Remaining: " + guessesLeft)
                if (!guessedLetters.includes(currentGuess)) {
                    guessedLetters.push(currentGuess);
                }
            }
        }
        if (displayWord === currentWord) {
            youWon += 1;
            $("#wins").html("Wins: " + youWon)
            gameOver = true;
        }
        if (guessesLeft === 0) {
            youLost += 1;
            $("#losses").html("Losses:" + youLost);
            gameOver = true;
        }
        if (gameOver) {
            clearGame();
        }
        $("#lettersAlreadyGuessed").html("Guessed Letters: " + guessedLetters);
    })
})
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getRandomWord(wordsArray) {
    var randomIndex = getRandomIntInclusive(0, wordsArray.length - 1)
    return wordsArray[randomIndex];

}

function fillWord(fillWorldLength) {
    for (var i = 0; i < fillWorldLength; i++) {
        displayWord = displayWord.concat("_");
    }

}

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

function validate(strValue) {
    var objRegExp = /^[a-z]+$/;
    return objRegExp.test(strValue);
}

function clearGame() {
    guessesLeft = 8;
    currentWord = getRandomWord(words);
    displayWord = "";
    fillWord(currentWord.length);
    gameOver = false;
    guessedLetters = [];
    $("#displayWord").html("Current word(" + currentWord.length + " letters): " + displayWord)
    $("#guessRemaining").html("Guesses Remaining: " + guessesLeft)
    $("#wins").html("Wins: " + youWon)
    $("#losses").html("Losses:" + youLost);
    $("#lettersAlreadyGuessed").html("Guessed Letters :" + guessedLetters);
    console.log(currentWord)
}


