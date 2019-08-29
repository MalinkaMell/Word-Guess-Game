
//creating array of words(objects)
let worldToGuess = [
    {
        word_to_guess: "lasagna",
        imgURL: "lasagna.jpg",
        helpImg: "lasagna_sheets.jpg",
        description: "This dish is made of stacked layers of pasta alternated with sauces and ingredients such as meats, vegetables and cheese",
        didntGuess: "It was Lasagna!<br><small>Press any key to continue</small>"
    },
    {
        word_to_guess: "parmigiana",
        imgURL: "parmigiana.jpg",
        helpImg: "melanzana.jpg",
        description: "This dish is made with a shallow or deep-fried sliced eggplant filling, layered with cheese and tomato sauce, then baked",
        didntGuess: "It was Parmigiana!<br><small>Press any key to continue</small>"
    },
    {
        word_to_guess: "carbonara",
        imgURL: "carbonara.jpg",
        helpImg: "pancetta.jpg",
        description: "Italian pasta dish from Rome made with egg, hard cheese, guanciale, and black pepper",
        didntGuess: "It was Carbonara!<br><small>Press any key to continue</small>"
    },
    {
        word_to_guess: "polenta",
        imgURL: "polenta.jpg",
        helpImg: "polenta-cruda.jpg",
        description: "This dish is made of boiled cornmeal that was historically made from other grains. It may be served as a hot porridge, or it may be allowed to cool and solidify into a loaf that can be baked, fried, or grilled",
        didntGuess: "It was Polenta!<br><small>Press any key to continue</small>"
    },
    {
        word_to_guess: "tortellini",
        imgURL: "tortellini.jpg",
        helpImg: "tortellini-help.jpg",
        description: "This dish is originally from the Italian region of Emilia, consist of circle of pasta are usually stuffed with a mix of meat, Parmigiano Reggiano cheese, egg and nutmeg",
        didntGuess: "It was Tortellini!<br><small>Press any key to continue</small>"
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

function playWonSound() {
    let audio = new Audio("./assets/music/success.mp3");
    audio.play();
}

function playOverSound() {
    let audio = new Audio("./assets/music/over.mp3");
    audio.play();
}

function endGame() {
    if (questionIndex === worldToGuess.length) {
        let buttonRestart = document.createElement("a");
            buttonRestart.setAttribute("class", "btn btn-success btn-lg mt-1");
            buttonRestart.innerHTML = "Restart the game";
            buttonRestart.setAttribute("href", "index.html");
            document.getElementById("description").innerHTML = "Game over! Thanks for playing!<br>";
            document.getElementById("description").appendChild(buttonRestart);
    }

    if (hiddenWordMatch.indexOf("_") === -1) {
        document.getElementById("image").src = "./assets/images/" + worldToGuess[questionIndex].imgURL;
        stopCount = countClicks;
        countClicks = 10;
        wins++;
        document.getElementById("wins").innerHTML = wins;
        questionIndex += 1;
        playWonSound();
        stopCount = countClicks;
        countClicks = 10;
        document.getElementById("guesses_used").innerHTML = stopCount;
        document.getElementById("description").innerHTML = "Delizioso!!!<br><small>Press any key to continue</small>";
        //questionIndex += 1;
        //console.log("after " + questionIndex); 
        console.log(countClicks);
        startGame();
    }

    if (hiddenWordMatch.indexOf("_") === -1 || countClicks == 10) {
        if (questionIndex === worldToGuess.length) {
            let buttonRestart = document.createElement("a");
            buttonRestart.setAttribute("class", "btn btn-success btn-lg mt-1");
            buttonRestart.innerHTML = "Restart the game";
            buttonRestart.setAttribute("href", "index.html");
            document.getElementById("description").innerHTML = "Game over! Thanks for playing!<br>";
            document.getElementById("description").appendChild(buttonRestart);
            return;

        }
        else {
            document.getElementById("description").innerHTML = worldToGuess[questionIndex].didntGuess;
            console.log(countClicks);
            playOverSound();
            console.log(worldToGuess[questionIndex].didntGuess);
            document.getElementById("image").src = "./assets/images/" + worldToGuess[questionIndex].imgURL;
            questionIndex += 1;
            startGame();
        }
    }


}
function startGame() {


    if (questionIndex !== worldToGuess.length) {
        countClicks = 0;
        displayeddWord = worldToGuess[questionIndex].word_to_guess;
        hiddenWordMatch = [];
        for (let j = 0; j < displayeddWord.length; j++) {
            hiddenWordMatch.push("_");
        }
        userGuessedLetters = [];
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
//playMusic();
document.onkeyup = function (event) {

    if (countClicks < 10) {

        let userGuess = event.key.toLowerCase(); // Determines which key was pressed.

        verifyLetter(userGuessedLetters, userGuess);

        //checking if the letters guessed by user is present in displayed word

        for (let i = 0; i < displayeddWord.length; i++) {
            if (displayeddWord.charAt(i) === userGuess) {
                hiddenWordMatch[i] = userGuess;
            }

        }


    }
    else {

        endGame();

    }

    if (questionIndex !== worldToGuess.length) {

    
        document.getElementById("letters").innerHTML = userGuessedLetters + ", ";
        document.getElementById("test").innerHTML = hiddenWordMatch.join(" ");
        document.getElementById("image").src = "./assets/images/" + worldToGuess[questionIndex].helpImg;
        document.getElementById("description").innerHTML = worldToGuess[questionIndex].description;
        document.getElementById("guesses").innerHTML = countClicks;
        endGame();
    }
}



document.getElementById("test").innerHTML = hiddenWordMatch.join(" ");
