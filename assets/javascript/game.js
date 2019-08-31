
//creating array of words(objects)
let worldToGuess = [
    {
        word_to_guess: "lasagna",
        imgURL: "lasagna.jpg",
        helpImg: "lasagna_sheets.jpg",
        description: "This dish is made of stacked layers of pasta alternated with sauces and ingredients such as meats, vegetables and cheese",
        didntGuess: "It was Lasagna!<br><small>Press \"ENTER\" to continue</small>"
    },
    {
        word_to_guess: "parmigiana",
        imgURL: "parmigiana.jpg",
        helpImg: "melanzana.jpg",
        description: "This dish is made with a shallow or deep-fried sliced eggplant filling, layered with cheese and tomato sauce, then baked",
        didntGuess: "It was Parmigiana!<br><small>Press \"ENTER\" to continue</small>"
    }/*,
    {
        word_to_guess: "carbonara",
        imgURL: "carbonara.jpg",
        helpImg: "pancetta.jpg",
        description: "Italian pasta dish from Rome made with egg, hard cheese, guanciale, and black pepper",
        didntGuess: "It was Carbonara!<br><small>Press \"ENTER\" to continue</small>"
    },
    {
        word_to_guess: "polenta",
        imgURL: "polenta.jpg",
        helpImg: "polenta-cruda.jpg",
        description: "This dish is made of boiled cornmeal that was historically made from other grains. It may be served as a hot porridge, or it may be allowed to cool and solidify into a loaf that can be baked, fried, or grilled",
        didntGuess: "It was Polenta!<br><small>Press \"ENTER\" to continue</small>"
    },
    {
        word_to_guess: "tortellini",
        imgURL: "tortellini.jpg",
        helpImg: "tortellini-help.jpg",
        description: "This dish is originally from the Italian region of Emilia, consist of circle of pasta are usually stuffed with a mix of meat, Parmigiano Reggiano cheese, egg and nutmeg",
        didntGuess: "It was Tortellini!<br><small>Press \"ENTER\" to continue</small>"
    } */
];


let waitToStartGame = true;//this is how i avoid for the first pressed key to be counted as a Guess. User have to press enter to start the game or to proceed to the next word
let questionIndex = 0; //start counting question number from 0
let displayeddWord = worldToGuess[questionIndex].word_to_guess; //saving displayed word in a variable for furter use
let userGuessedLetters = []; //creating an emty array, i'm going to save here the letters 
let hiddenWordMatch = []; // here's the trick: creting a array long like displayed word, going to populate it with "_" and going to replase them with letters as user guesses the right ones
let countClicks = 0; //saving in a variable how many keys user presses, that's how we counting guesses
let wins = 0; // saving users wins in a variable

//here i'm comparing and pushing "_" to array as explained on line 44
for (let j = 0; j < displayeddWord.length; j++) {
    hiddenWordMatch.push("_");
}
//background music
function playMusic() {
    let audio = new Audio("./assets/music/tarantella.mp3");
    audio.play();
}
//solved sound
function playWonSound() {
    let audio = new Audio("./assets/music/success.mp3");
    audio.play();
}
//not solved sound
function playOverSound() {
    let audio = new Audio("./assets/music/over.mp3");
    audio.play();
}

//create restart game button
function buttonRestartFunction() {
    let buttonRestart = document.createElement("a");
    buttonRestart.setAttribute("class", "btn btn-success btn-lg mt-1");
    buttonRestart.innerHTML = "Restart the game";
    buttonRestart.setAttribute("href", "index.html");
    document.getElementById("description").appendChild(buttonRestart);
}

//end game function - everithing that happens when user runs out of guesses or solve the word or finish the game
function endGame() {
    //user reached the end of the game
    if (questionIndex === worldToGuess.length) {
        document.getElementById("description").innerHTML = "Game over! Thanks for playing!<br>";
        buttonRestartFunction();
        waitToStartGame = true;
    }

    //user got the word right, continue to the next word
    else if (hiddenWordMatch.indexOf("_") === -1 && questionIndex !== worldToGuess.length) {
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
        document.getElementById("description").innerHTML = "Delizioso!!!<br><small>Press \"ENTER\" to continue</small>";
        waitToStartGame = true;
        startGame();
        console.log("line 98");
        return;

    }
    //
    else if (hiddenWordMatch.indexOf("_") === -1 || countClicks === 10) {
        if (questionIndex === worldToGuess.length) {
            let buttonRestart = document.createElement("a");
            buttonRestart.setAttribute("class", "btn btn-info btn-lg mt-2");
            buttonRestart.innerHTML = "Restart the game";
            buttonRestart.setAttribute("href", "index.html");
            document.getElementById("description").innerHTML = "Game over! Thanks for playing!<br>";
            document.getElementById("description").appendChild(buttonRestart);
            waitToStartGame = true;
            console.log("line 111");
            //return;


        }
        else { // going ahead with the game, case of not solved if we still have questions
            document.getElementById("description").innerHTML = worldToGuess[questionIndex].didntGuess;
            console.log(countClicks);
            playOverSound();
            console.log(worldToGuess[questionIndex].didntGuess);
            document.getElementById("image").src = "./assets/images/" + worldToGuess[questionIndex].imgURL;
            questionIndex += 1;
            waitToStartGame = true;
            startGame();
            console.log("line 126");
            //return;
        }
    }


}
//start game function
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
    else if (questionIndex === worldToGuess.length) {
        console.log("got it right?");
        //event.preventDefault();
        waitToStartGame = true;
        endGame();
    }
}
//verifying if user already pressed the key, doing nothing if he did, adding a new key too keys array and subtracting one guess if key haven't been pressed yet
let verifyLetter = function (x, s) {
    let letterIsIn = x.indexOf(s); //controlling if user already pressed that key, adding a new key to array if it hasn't been pressed yet

    if (letterIsIn === -1) {
        x.push(s);
        //console.log(s);
        countClicks++;
    }
    else {
        //console.log("not adding!");
    }
}
//playMusic();


let letters = /^[A-Za-z]+$/;
//here is when the game occurs
document.onkeyup = function (event) {
    let userGuess = event.key.toLowerCase(); // Determines which key was pressed.
    if (event.which === 13 || event.keyCode === 13) {
        //event.preventDefault();
        waitToStartGame = false;
        console.log("game paused event enter " + waitToStartGame);

    }
    else {
        //event.preventDefault();
        if (userGuess.match(letters) && waitToStartGame === false) {
            if (countClicks < 10) {
                verifyLetter(userGuessedLetters, userGuess); // verifying if letters are in or not as explained on line 131

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
        }
    }
    //continue to display words from array untill we reach the last index of array
    if (questionIndex !== worldToGuess.length && waitToStartGame === false) {
        document.getElementById("letters").innerHTML = userGuessedLetters.join(" ");
        document.getElementById("test").innerHTML = hiddenWordMatch.join(" ");
        document.getElementById("image").src = "./assets/images/" + worldToGuess[questionIndex].helpImg;
        document.getElementById("description").innerHTML = worldToGuess[questionIndex].description;
        document.getElementById("guesses").innerHTML = countClicks;
        console.log("from 1");

        endGame();
    }
    return true;
}



document.getElementById("test").innerHTML = hiddenWordMatch.join(" ");
