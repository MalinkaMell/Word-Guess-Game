//creating array of words(objects)
let worldToGuess = [
    {
        word_to_guess: "lasagna",
        imgURL: "lasagna.jpg",
        helpImg: "lasagna_sheets.jpg",
        description: "This dish is made of stacked layers of pasta alternated with sauces and ingredients such as meats, vegetables and cheese",
        didntGuess: "It was Lasagna!<br>"
    },
    {
        word_to_guess: "parmigiana",
        imgURL: "parmigiana.jpg",
        helpImg: "melanzana.jpg",
        description: "This dish is made with a shallow or deep-fried sliced eggplant filling, layered with cheese and tomato sauce, then baked",
        didntGuess: "It was Parmigiana!<br>"
    },
    {
        word_to_guess: "carbonara",
        imgURL: "carbonara.jpg",
        helpImg: "pancetta.jpg",
        description: "Italian pasta dish from Rome made with egg, hard cheese, guanciale, and black pepper",
        didntGuess: "It was Carbonara!<br>"
    },
    {
        word_to_guess: "polenta",
        imgURL: "polenta.jpg",
        helpImg: "polenta-cruda.jpg",
        description: "This dish is made of boiled cornmeal that was historically made from other grains. It may be served as a hot porridge, or it may be allowed to cool and solidify into a loaf that can be baked, fried, or grilled",
        didntGuess: "It was Polenta!<br>"
    },
    {
        word_to_guess: "tortellini",
        imgURL: "tortellini.jpg",
        helpImg: "tortellini-help.jpg",
        description: "This dish is originally from the Italian region of Emilia, consist of circle of pasta are usually stuffed with a mix of meat, Parmigiano Reggiano cheese, egg and nutmeg",
        didntGuess: "It was Tortellini!<br>"
    }
];


let waitToStartGame = true; //this is how i avoid for the first pressed key to be counted as a Guess. 
//User have to press enter to start the game or to proceed to the next word
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

function pressEnter() {
    let pressEnter = document.createElement("span");
    //pressEnter.setAttribute("class", "btn btn-success btn-lg mt-1");
    pressEnter.innerHTML = "<small>Press \"ENTER\" to continue</small>";
    //pressEnter.setAttribute("href", "index.html");
    document.getElementById("description").appendChild(pressEnter);
    
}

//create restart game button
function buttonRestartFunction() {
    let buttonRestart = document.createElement("a");
    buttonRestart.setAttribute("class", "btn btn-success btn-lg");
    buttonRestart.innerHTML = "Restart the game";
    buttonRestart.setAttribute("href", "index.html");
    document.getElementById("button_append").appendChild(buttonRestart);
}

//end game function - everithing that happens when user runs out of guesses or solve the word or finish the game
function endGame() {
    //user reached the last question of the game
    if (questionIndex === worldToGuess.length) {
        //in case the word is complete
        if (hiddenWordMatch.indexOf("_") === -1 && countClicks === 10) {
            buttonRestartFunction(); // adding restart button
            //shownig the right word
            document.getElementById("description").innerHTML =
                "That's right!<br><h2>" + worldToGuess[questionIndex - 1].word_to_guess + "</h2>";
            //showing image
            document.getElementById("image").src = "./assets/images/" + worldToGuess[questionIndex - 1].imgURL;
            waitToStartGame = true; // preventing keys other than enter
        }
        //in case the word is uncomlete
        else if (hiddenWordMatch.indexOf("_") !== -1 && countClicks === 10) {

            waitToStartGame = true; // preventing keys other than enter
            buttonRestartFunction(); // adding restart button
            console.log("i dont think its ever triggered")
        }
    }

    //user got the word right, continue to the next word
    else if (hiddenWordMatch.indexOf("_") === -1 && questionIndex !== worldToGuess.length) {
        document.getElementById("image").src = "./assets/images/" + worldToGuess[questionIndex].imgURL; //showing image
        stopCount = countClicks; //saving used guesses
        countClicks = 10; // setting guesses to 10
        wins++; //increasing score
        document.getElementById("wins").innerHTML = wins; //printing score
        questionIndex += 1; //increasing the word index in order to go to the next word
        playWonSound(); // playing victory sound
        document.getElementById("guesses_used").innerHTML = stopCount; //printing out used guesses
        document.getElementById("description").innerHTML =
            "That's right!<br><h2>" + worldToGuess[questionIndex - 1].word_to_guess + "</h2>"; //printing the whole word
        waitToStartGame = true; // preventing keys other than enter
        startGame(); //moving to the next question using startGame() function
        return; // just to make sure i am exiting this

    }
    //used all of my guesses
    else if (countClicks === 10) {
        if (questionIndex !== worldToGuess.length) {
            //printing out the word
            document.getElementById("description").innerHTML = worldToGuess[questionIndex].didntGuess;
            pressEnter();
            playOverSound(); // sad sound
            //showing image
            document.getElementById("image").src = "./assets/images/" + worldToGuess[questionIndex].imgURL;
            questionIndex += 1; // increasing word's index
            waitToStartGame = true; // preventing keys other than enter
            startGame(); //moving to the next question using startGame() function
        }
    }
}

//start game function
function startGame() {
    if (questionIndex !== worldToGuess.length) {
        countClicks = 0; //setting guesses to 0
        displayeddWord = worldToGuess[questionIndex].word_to_guess; //picking the next word
        hiddenWordMatch = []; // emptying the old matching word length "_" array
        for (let j = 0; j < displayeddWord.length; j++) { //creating the new array logn as the new word
            hiddenWordMatch.push("_");
        }
        userGuessedLetters = []; // emptying array of user guesses
    }
    //game over happens here
    else if (questionIndex === worldToGuess.length) {
        waitToStartGame = true; // preventing keys other than enter
        endGame(); //resending to endGame function to manage the game over there
    }
}
//verifying if user already pressed the key, doing nothing if he did, 
//adding a new key too keys array and subtracting one guess if key haven't been pressed yet
let verifyLetter = function (x, s) {
    let letterIsIn = x.indexOf(s); //controlling if user already pressed that key, 
    //adding a new key to array if it hasn't been pressed yet
    if (letterIsIn === -1) {
        x.push(s); 
        countClicks++; //incrementing clicks
    }
    else {
        console.log("not adding!");
    }
}
//playMusic();


let letters = /^[A-Za-z]/; //allowing only letters to be pressed
//here is when the game occurs
document.onkeyup = function (event) {
    let userGuess = event.key.toLowerCase(); // Determines which key was pressed.
    if (event.which === 13 || event.keyCode === 13) { //preventing user from pressing anything else but ENTER 
        waitToStartGame = false; // allowing use letter
    }
    else {
        if (userGuess.match(letters) && waitToStartGame === false) {//checking if my letters pattern match 
            //and if user is allowed to press letters
            if (countClicks < 10) {
                verifyLetter(userGuessedLetters, userGuess); // verifying if letters are in or not as explained on line 153

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
        endGame();
    }
    return true;
}



document.getElementById("test").innerHTML = hiddenWordMatch.join(" ");