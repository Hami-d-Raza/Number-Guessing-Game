let x = Math.floor(Math.random() * 30) + 1;
let maxTries = 3;
let tries = 0;
let gameEnded = false; // Track if the game has ended

function makeGuess() {
    const guessInput = document.getElementById('guess');
    const guessButton = document.getElementById('guessButton');
    const message = document.getElementById('message');
    let guess = parseInt(guessInput.value);

    if (!gameEnded) {
        if (isNaN(guess) || guess < 1 || guess > 30) {
            message.textContent = "Please enter a number between 1 and 30.";
            guessInput.value = ""; // Clear the input field
            return;
        }

        tries += 1;

        if (guess === x) {
            message.textContent = `You guessed it! I was thinking of the number ${x}.`;
            guessInput.disabled = true;
            gameEnded = true; // Set gameEnded to true
            guessButton.textContent = "Reset"; // Change button text to "Reset"
        } else {
            let hint = guess < x ? "higher" : "lower";
            if (tries < maxTries) {
                message.textContent = `Nope, try again. Guess ${hint}. You have used ${tries} out of ${maxTries} tries.`;
            } else {
                message.textContent = `Sorry, you have reached the maximum number of tries. The number I was thinking of was ${x}.`;
                guessInput.disabled = true;
                gameEnded = true; // Set gameEnded to true
                guessButton.textContent = "Reset"; // Change button text to "Reset"
            }
            guessInput.value = ""; // Clear the input field after an incorrect guess
        }
    } else {
        resetGame(); // Reset the game if it has ended
    }
}

function resetGame() {
    x = Math.floor(Math.random() * 30) + 1;
    tries = 0;
    gameEnded = false;
    const guessInput = document.getElementById('guess');
    const guessButton = document.getElementById('guessButton');
    const message = document.getElementById('message');
    guessInput.value = ""; // Clear the input field
    guessInput.disabled = false; // Enable the input field
    message.textContent = ""; // Clear any messages
    guessButton.textContent = "Guess"; // Change button text back to "Guess"
    guessInput.focus(); // Set focus back to the input field
}

window.onload = function() {
    const guessInput = document.getElementById('guess');
    guessInput.focus();

    guessInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            makeGuess();
        }
    });

    const guessButton = document.getElementById('guessButton');
    guessButton.addEventListener('click', makeGuess);
};
