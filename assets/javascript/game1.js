
//creating array of words(objects)
let worldToGuess = [
    { word_to_guess: "lasagna", imgURL: "lasagna.jpg", helpImg: "lasagna_sheets.jpg", description: "This dish is made of stacked layers of pasta alternated with sauces and ingredients such as meats, vegetables and cheese"},
    { word_to_guess: "parmigiana", imgURL: "parmigiana.jpg", helpImg: "melanzana.jpg", description: "This dish is made with a shallow or deep-fried sliced eggplant filling, layered with cheese and tomato sauce, then baked"},
    { word_to_guess: "carbonara", imgURL: "carbonara.jpg", helpImg: "pancetta.jpg", description: "Italian pasta dish from Rome made with egg, hard cheese, guanciale, and black pepper"}
];

//randomlly choosing the word to guess from array of objects
let randomWord = Math.floor(Math.random() * worldToGuess.length);

//saving word to guess in a new variable
let displayeddWord = worldToGuess[randomWord].word_to_guess;

//creating an array of keys pressed by user and storing it in a new array 
let userGuessedLetters = [];
let hiddenWordMatch = [];

let countClicks = 0;

for (let j = 0; j < displayeddWord.length; j++) {
    hiddenWordMatch.push("_");
}

function playMusic() {
 
    let audio = new Audio("./assets/music/tarantella.mp3");
    audio.play();
  }

function endGame() {
    for (let i = 0; i < hiddenWordMatch.length; i++) {
        if (hiddenWordMatch.indexOf("_") === -1) {
            console.log("the word is complete!");
            playMusic();
            document.getElementById("image").src = "./assets/images/" + worldToGuess[randomWord].imgURL;
        }
    }
}





document.onkeyup = function (event) {

    //countUserClicks();
    if (countClicks < 10) {
        
        var userGuess = event.key.toLowerCase(); // Determines which key was pressed.

        
        var letterIsIn = userGuessedLetters.indexOf(userGuess);//controlling if user already pressed that key, adding a new key to array if it hasn't been pressed yet

        if (letterIsIn === -1) {
            userGuessedLetters.push(userGuess);
            console.log(userGuess);
            countClicks++;
        }
        else {
            console.log("not adding!");
        }

        document.getElementById("letters").innerHTML = userGuessedLetters + ", ";

        //checking if the letters guessed by user is present in displayed word

        for (let i = 0; i < displayeddWord.length; i++) {
            if (displayeddWord.charAt(i) === userGuess) {
                hiddenWordMatch[i] = userGuess;
            }

        }
    }

    else {
        document.getElementById("description").innerHTML = "Try again!";
        return;
    }

document.getElementById("test").innerHTML = hiddenWordMatch.join(" ");
document.getElementById("image").src = "./assets/images/" + worldToGuess[randomWord].helpImg;
document.getElementById("description").innerHTML = worldToGuess[randomWord].description;
endGame();
document.getElementById("guesses").innerHTML = countClicks;
}




