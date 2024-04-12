const image = document.querySelector("img");
const writeName = document.querySelector(".writeName");
const letters = document.querySelectorAll(".letter");
const wrongLetter = document.querySelector(".wrong-letters-none");
const wrongSymbolMessage = document.querySelector(".wrong-symbol-message-hidden");
const yourTry = document.querySelector(".tryCount");
const nextButton = document.getElementById("next-button");
const playAgain = document.getElementById("play-again");
const score = document.querySelector(".score");

const movies = ["Casablanca", "city of god", "Dr. Strangelove", "gladiator", "one flew over the cuckoo's nest", "the godfather", "the shawshank redemption", "There will be blood", "troy"];
let predictedLetter = "";
let predictedLetters = [];
let wrongLetters = [];
let lettersArr = [];
let tryCount = 5;
let dublicateMovieArray = [];
let yourScore = 0;
yourTry.textContent = tryCount;

function getRandomMovie() {
    const randomNumber = Math.floor((Math.random() * movies.length));
    const randomMovie = movies[randomNumber];
    if (movies.length == 1) {
        // nextButton.disabled = true;
        nextButton.classList.add("next-button-invisible");
        playAgain.classList.remove("play-again-invisible");
        playAgain.classList.add("play-again");
    } else {
        movies.splice(movies.indexOf(randomMovie), 1);
    }
    setImage(randomMovie);
    return randomMovie;
}

let randomMovie = getRandomMovie();

function setImage(randomMovie) {
    image.src = `../image/movies/${randomMovie}.jpg`;
}

function getRandomMovieSymbols(randomMovie) {
    lettersArr = (randomMovie.split("").map((item) => {
        if (item.toUpperCase().charCodeAt(0) >= 65 && item.toUpperCase().charCodeAt(0) <= 90) {
            dublicateMovieArray.push(item);
            return `<div class="letter"> " "</div>`;
        } else {
            return `<div class="correct-letter">&nbsp; ${item}</div>`;
        }
    }));
    return lettersArr;
}

let randomMovieSymbols = getRandomMovieSymbols(randomMovie);

function addLettersToSymbols(randomMovie, randomMovieSymbols) {
    let count = 0;
    randomMovie.split("").forEach((element) => {
        if (element.toLowerCase() === predictedLetter.toLowerCase()) {
            randomMovieSymbols[count] = `<div class="correct-letter"> ${predictedLetter}</div>`;
            dublicateMovieArray.pop();
            if (dublicateMovieArray.length === 0) {
                yourScore++;
                score.textContent = `${yourScore} out of 9`;
            }
        }
        count++;
    });
    writeName.innerHTML = randomMovieSymbols.join("");
}

window.addEventListener("keydown", (event) => {
    if (tryCount < 1) {
        document.onkeydown = function (e) {
            return false;
        }

    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            if (randomMovie.toLowerCase().split("").includes((event.key).toLowerCase())) {
                predictedLetter = event.key;
                if (!predictedLetters.includes(predictedLetter)) {
                    predictedLetters.push(predictedLetter);
                    addLettersToSymbols(randomMovie, randomMovieSymbols);
                }

            } else {
                if (event.keyCode >= 65 && event.keyCode <= 90) {
                    if (!wrongLetters.includes(event.key)) {
                        tryCount--;
                        yourTry.textContent = tryCount;

                        wrongLetters.push(event.key);
                        wrongLetter.classList.remove("wrong-letters-none");
                        wrongLetter.classList.add("wrong-letters");
                        wrongLetter.innerHTML += (event.key + ", ");
                    }
                }
            }

        } else {
            wrongSymbolMessage.classList.remove("wrong-symbol-message-hidden");
            wrongSymbolMessage.classList.add("wrong-symbol-message");
            setTimeout(() => {
                wrongSymbolMessage.classList.remove("wrong-symbol-message");
                wrongSymbolMessage.classList.add("wrong-symbol-message-hidden");
            }, 2000);
        }
    }

})

nextButton.addEventListener("click", (event) => {
    predictedLetter = "";
    predictedLetters = [];
    wrongLetters = [];
    lettersArr = [];
    tryCount = 5;
    dublicateMovieArray = [];
    yourTry.textContent = tryCount;
    wrongLetter.innerHTML = "";

    randomMovie = getRandomMovie();
    randomMovieSymbols = getRandomMovieSymbols(randomMovie);
    addLettersToSymbols(randomMovie, randomMovieSymbols);

})

document.getElementById("back").addEventListener("click", () => {
    window.location = "../index.html";
})

writeName.innerHTML = lettersArr.join("");


