//define variables//
var wordList = ["princess", "star", "mario", "yoshi", "bowser", "wario", "mushroom", "flagpole", "luigi", "turtle", "fireball", "flower"]
var colors = ["#39b449", "#04abe7", "#FF0000", ];
var black = "#000000";

//audio files for when user gets word right//
var startAudio = new Audio("assets/sounds/gamestartsound.wav");
var peachAudio = new Audio("assets/sounds/peachsound.wav");
var starAudio = new Audio("assets/sounds/starsound.mp3");
var marioAudio = new Audio("assets/sounds/mariosound.wav");
var yoshiAudio = new Audio("assets/sounds/yoshisound.mp3");
var bowserAudio = new Audio("assets/sounds/bowsersound.wav");
var warioAudio = new Audio("assets/sounds/wariosound.wav");
var mushroomAudio = new Audio("assets/sounds/mushroomsound.wav");
var flagpoleAudio = new Audio("assets/sounds/flagpolesound.mp3");
var luigiAudio = new Audio("assets/sounds/luigisound.wav");
var fireballAudio = new Audio("assets/sounds/fireballsound.wav");
var turtleAudio = new Audio("assets/sounds/turtlesound.wav");
var flowerAudio = new Audio("assets/sounds/flowersound.wav")
var thankyouAudio = new Audio("assets/sounds/thankyousound.wav");

var wins = 0;
var numGuesses;
var lettersRemaining;
var gameInProgress = false
revealedWord = [];
hiddenWord = [];
guessedLetters = [];
lettersInAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

//function for end of game//
function thankYou() {
    document.getElementById("revealedWord").innerHTML = "THANKS FOR PLAYING!!!";
}
//Intro tune//
startAudio.play();
//function to start new game//
function newGame() {
   

    revealedWord = [];
    hiddenWord = [];
    guessedLetters = [];

    document.getElementById("playerMessage").innerHTML = "";
    document.getElementById("guessedLetters").innerHTML = "_";
    document.getElementById("totalWins").innerHTML = wins;
    document.getElementById("revealedWord").innerHTML = chosenWord;

    //choose a random word from the wordList array and display it to the user//
    var chosenWord = wordList[Math.floor(Math.random() * wordList.length)];

    //variable that let us know when the game is a win//
    var lettersRemaining = chosenWord.length;

    //variable to show us how many missed guesses the player will get on the given word//
    var numGuesses = 10;
    document.getElementById("revealedWord").innerHTML = chosenWord;

    //display the number of Guesses left to the player//
    document.getElementById("guessesLeft").innerHTML = numGuesses


    //Write a loop to hide the letters in the current word in an array and replace them with blanks//
    for (var i = 0; i < chosenWord.length; i++) {
        revealedWord[i] = "_";

        //Populate this second array with the letters of the hidden word//
        hiddenWord[i] = chosenWord.charAt(i);
    }

    //update the blanks to letters as the user makes correct guesses//
    document.getElementById("revealedWord").innerHTML = revealedWord.join(" ");

    //additional elements to style different colors//
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById("revealedWord").style.color = random_color;

    //Start the game with a press of any key a-z//
    document.onkeyup = function(event) {

        //local variables that will be referenced in this function later//
        var guessInAlphabet = false;
        var alreadyGuessed = false;
        var wrongGuess = false;
        var subtractGuess = true;
        var doPush = true;
        var roundOver = false;
        vargomeOver = false;
        var userGuess = event.key.toLowerCase();




        //Run a loop to make sure the key that is pressed is a letter a-z//
        for (var h = 0; h < lettersInAlphabet.length; h++) {

            if (userGuess === lettersInAlphabet[h]) {

                guessInAlphabet = true;

            } 

            else {

                //Keeps anything that isnt a letter from registering//
                alreadyGuessed = true

            }

        }

        //Tell what to do if user types a new letter, that letter is in the alphabet, and if it has already been guessed by the user//
        if (guessInAlphabet) {

            for (var m = 0; m <= guessedLetters.length; m++) {

                if (userGuess === guessedLetters[m]) {

                    alreadyGuessed = true

                } 

                else {

                    alreadyGuessed = false

                }

            }

        }


        //Tell what to do if the letter has not been guessed yet//
        if (!alreadyGuessed) {


            //Do this if the letter that is guessed is in the hidden word//
            for (var j = 0; j < hiddenWord.length; j++) {

                if (userGuess === hiddenWord[j]) {

                    revealedWord[j] = userGuess;

                    //this will be used later to indicate when the game is won//
                    lettersRemaining--;

                    //Dont take away anything from the Guesses Remaining catagory since they guessed a letter right//
                    subtractGuess = false;

                    //change _ to the guessed letter for user to see they got it correct// 
                    document.getElementById("revealedWord").innerHTML = revealedWord.join(" ");

                }

            }

            if (subtractGuess) {

                //Decreases the number of guesses by 1 when they choose an incorrect letter and display it//
                document.getElementById("guessesLeft").innerHTML = numGuesses--;
                document.getElementById("guessesLeft").innerHTML = numGuesses;
                wrongGuess = true;

            }

        }

        //This is what happens if the user guesses a letter that is not in the secret word//
        if (wrongGuess === true) {

            //loop that pushes guessed letters into the guessedLetters array//
            //Don't push into guessedLetters array if the letter is already in the array to prevent duplicate ltters from showing//
            for (var m = 0; m <= guessedLetters.length; m++) {
                
                if (userGuess == guessedLetters[m]) {
                   
                    doPush = false;

                }

            }

            //Push the letter into the guessedLetters array since it is not already in the array//
            if (doPush) {

                guessedLetters.push(userGuess);

            }

            //Displays all the letters that have been guessed to the user//

            document.getElementById("guessedLetters").innerHTML = guessedLetters.join(", ");
        }

        //Message that occurs and displays if you run out of guesses//
        if (numGuesses === 0) {

            document.getElementById("playerMessage").innerHTML = "You Lose... The Word Was: " + chosenWord.toUpperCase();
            document.getElementById("playerMessage").style.color = random_color;
            roundOver = true

        }

        //Message that occurs if you win and displays it//
        if (lettersRemaining === 0) {

            document.getElementById("playerMessage").innerHTML = "You Win !!!"
            document.getElementById("playerMessage").style.color = random_color;
            document.getElementById("totalWins").innerHTML = wins++;
            roundOver = true

        }

        //Once the round is over, display an image and a sound related to the word they just guess//
        if (roundOver) {

            if (chosenWord === "princess") {
                document.getElementById("marioGreeter").setAttribute("src", "assets/images/peach.png");
                peachAudio.play();
            }

            if (chosenWord === "star") {
                document.getElementById("marioGreeter").setAttribute("src", "assets/images/star.jpg");
                starAudio.play();
            }


            if (chosenWord === "mario") {
                document.getElementById("marioGreeter").setAttribute("src", "assets/images/mario.jpeg");
                marioAudio.play();
            }

            if (chosenWord === "yoshi") {
                document.getElementById("marioGreeter").setAttribute("src", "assets/images/yoshi.png");
                yoshiAudio.play();
            }

            if (chosenWord === "bowser") {
                document.getElementById("marioGreeter").setAttribute("src", "assets/images/bowser.png");
                bowserAudio.play();
            }

            if (chosenWord === "wario") {
                document.getElementById("marioGreeter").setAttribute("src", "assets/images/wario.png");
                warioAudio.play();
            }

            if (chosenWord === "mushroom") {
                document.getElementById("marioGreeter").setAttribute("src", "assets/images/mushroom.jpg");
                mushroomAudio.play();
            }

            if (chosenWord === "flagpole") {
                document.getElementById("marioGreeter").setAttribute("src", "assets/images/flagpole.png");
                flagpoleAudio.play();
            }

            if (chosenWord === "luigi") {
                document.getElementById("marioGreeter").setAttribute("src", "assets/images/luigi.png");
                luigiAudio.play();
            }

            if (chosenWord === "fireball") {
                document.getElementById("marioGreeter").setAttribute("src", "assets/images/fireball.jpg");
                fireballAudio.play();
            }

            if (chosenWord === "turtle") {
                document.getElementById("marioGreeter").setAttribute("src", "assets/images/turtle.png");
                turtleAudio.play();
            }

            if (chosenWord === "flower") {
                document.getElementById("marioGreeter").setAttribute("src", "assets/images/flower.png");
                flowerAudio.play();
            }

            //Take out word from array so user wont see it again//
            wordList.splice(wordList.indexOf(chosenWord), 1);

            //Keep displaying words until the wordList array is empty//

            if (wordList.length > 0) {

                //Run a new word and start the round over after a 5 second delay//
                window.setTimeout("newGame()", 5000);

            } 

            else {

            	//After the user has attempted every word, display a thank you and an audio message after 5 seconds//
                window.setTimeout("thankyouAudio.play()", 5000);
                window.setTimeout("thankYou()", 5000);

                //repopulate the wordList array to start a new game//
                wordList.push("princess", "star", "mario", "yoshi", "bowser", "wario", "mushroom", "flagpole", "luigi", "turtle", "fireball", "flower")
                window.setTimeout("newGame()", 10000);

            }

        }

    }
}



//Start the game by running the above code//
newGame();
