
//creating array of words(objects)
let worldToGuess = [
    {
        word_to_guess: "lasagna",
        imgURL: "lasagna.jpg",
        helpImg: "lasagna_sheets.jpg",
        description: "This dish is made of stacked layers of pasta alternated with sauces and ingredients such as meats, vegetables and cheese"
    },
    {
        word_to_guess: "parmigiana",
        imgURL: "parmigiana.jpg",
        helpImg: "melanzana.jpg",
        description: "This dish is made with a shallow or deep-fried sliced eggplant filling, layered with cheese and tomato sauce, then baked"
    },
    {
        word_to_guess: "carbonara",
        imgURL: "carbonara.jpg",
        helpImg: "pancetta.jpg",
        description: "Italian pasta dish from Rome made with egg, hard cheese, guanciale, and black pepper"
    }
];

let questionIndex = 0;
let displayeddWord = worldToGuess[questionIndex].word_to_guess;
let userGuessedLetters = [];
let hiddenWordMatch = [];
let countClicks = 0;
let wins = 0;

for (let j = 0; j < displayeddWord.length; j++) {
    hiddenWordMatch.push("_");
}

function playMusic() {
    let audio = new Audio("./assets/music/tarantella.mp3");
    audio.play();
}

function endGame() {
    if (hiddenWordMatch.indexOf("_") === -1) {
        console.log("the word is complete!");
        console.log("before " + questionIndex);
        playMusic();
        hiddenWordMatch = [];
        userGuessedLetters = [];
        document.getElementById("image").src = "./assets/images/" + worldToGuess[questionIndex].imgURL;
        wins++;
        stopCount = countClicks;
        countClicks = 10;
        document.getElementById("guesses_div").style.display = "none";
        document.getElementById("guesses_used_div").style.display = "block";
        document.getElementById("description").style.display = "none";
        document.getElementById("description_next").style.display = "block";
        document.getElementById("guesses_used").innerHTML = stopCount;
        document.getElementById("description_next").innerHTML = "Delizioso!!!<br><small>Press any key to restart</small>";
        questionIndex += 1;
        console.log("after " + questionIndex);
        startGame();
    }

}

let verifyLetter = function (x, s) {
    let letterIsIn = x.indexOf(s); //controlling if user already pressed that key, adding a new key to array if it hasn't been pressed yet

    if (letterIsIn === -1) {
        x.push(s);
        console.log(s);
        countClicks++;
    }
    else {
        console.log("not adding!");
    }
}

function startGame() {
    document.onkeyup = function (event) {

        if (countClicks < 10) {
        
        let userGuess = event.key.toLowerCase(); // Determines which key was pressed.

        verifyLetter(userGuessedLetters, userGuess);

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
        document.getElementById("image").src = "./assets/images/" + worldToGuess[questionIndex].helpImg;
        document.getElementById("description").innerHTML = worldToGuess[questionIndex].description;
        document.getElementById("guesses").innerHTML = countClicks;
        document.getElementById("wins").innerHTML = wins;
        endGame();
    }

}
startGame();
document.getElementById("test").innerHTML = hiddenWordMatch.join(" ");
