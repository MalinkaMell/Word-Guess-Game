
//creating array of words(objects)
let worldToGuess = [
    { word_to_guess: "lasagna", imgURL: "lasagna.jpg", helpImg: "lasagna_sheets.jpg"},
    { word_to_guess: "parmigiana", imgURL: "parmigiana.jpg", helpImg: "melanzana.jpg"},
    { word_to_guess: "carbonara", imgURL: "carbonara.jpg", helpImg: "pancetta.jpg"}
];

//randomlly choosing the word to guess from array of objects
let randomWord = Math.floor(Math.random() * worldToGuess.length);

//saving word to guess in a new variable
let displayeddWord = worldToGuess[randomWord].word_to_guess;

//creating an array of keys pressed by user and storing it in a new array 
let userGuessedLetters = [];
let hiddenWordMatch = [];
for (let j = 0; j < displayeddWord.length; j++) {
    hiddenWordMatch.push("_");
}

function playMusic() {
 
    let audio = new Audio("./assets/music/tarantella.mp3");
    audio.play();
  }

function wordComplete() {
    for (let i = 0; i < hiddenWordMatch.length; i++) {
        if (hiddenWordMatch.indexOf("_") === -1) {
            console.log("the word is complete!");
            playMusic();
            document.getElementById("image").src = "./assets/images/" + worldToGuess[randomWord].imgURL;
        }
    }
}

//counting clicks

    let countClicks = 0;



document.onkeyup = function (event) {
    if (countClicks < 15) {
        // Determines which key was pressed.
        var userGuess = event.key.toLowerCase();

        //controlling if user already pressed that key, adding a new key to array if it hasn't been pressed yet
        var letterIsIn = userGuessedLetters.indexOf(userGuess);
        //console.log(letterIsIn);
        if (letterIsIn === -1) {

            userGuessedLetters.push(userGuess);
            console.log(userGuess);
            countClicks++
        }
        else {
            console.log("not adding!");
        }

        document.getElementById("letters").innerHTML = userGuessedLetters + ", ";

        //checking if the letters guessed by user is present in displayed word

        for (let i = 0; i < displayeddWord.length; i++) {


            if (displayeddWord.charAt(i) === userGuess) {
                //let tdt = displayeddWord.indexOf(userGuess);
                //console.log("found the letter at position " + tdt);
                hiddenWordMatch[i] = userGuess;

            }


        }

    }
    else {
        return;
    }



    document.getElementById("guesses").innerHTML = countClicks;
    document.getElementById("test").innerHTML = hiddenWordMatch.join(" ");
  //  document.getElementById("word").innerHTML = displayeddWord;
document.getElementById("image").src = "./assets/images/" + worldToGuess[randomWord].helpImg;
wordComplete();

}

//document.getElementById("test").innerHTML = hiddenWordMatch.join(" ");

//function to choose random word from the array



