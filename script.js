
// Get the popup element
var gameRulesPopup = document.getElementById("game-rules");

// Get the button that opens the popup
var ruleButton = document.getElementById("rule-button");

// Get the close button in the popup
var closeRulesBtn = document.getElementById("close-game-rules");

// Check if ruleButton and gameRulesPopup exist before attaching event listeners
if (ruleButton && gameRulesPopup && closeRulesBtn) {
    // When the user clicks the button, open the popup
    ruleButton.onclick = function() {
        gameRulesPopup.style.display = "block";
    }

    // When the user clicks on the close button (x), close the popup
    closeRulesBtn.onclick = function() {
        gameRulesPopup.style.display = "none";
    }
}

// Game logic
const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll('.option');
const userChoiceDisplay = document.getElementById('yourchoice');
const compChoiceDisplay = document.getElementById('compchoice');
const userScoreDisplay = document.getElementById('yScore');
const compScoreDisplay = document.getElementById('cScore');
const triangle = document.querySelector('.triangle');
const mainResultBox = document.querySelector('.mainresult-box');
const mainUserElement = document.querySelector('.circle.one'); // User choice circle
const mainCompElement = document.querySelector('.circle.two'); // Computer choice circle
const statusDisplay = document.getElementById('status'); // Status display
const status1Display = document.getElementById('status1'); // Status 1 display

// Initialize scores from localStorage
let userScore = parseInt(localStorage.getItem('userScore')) || 0;
let compScore = parseInt(localStorage.getItem('compScore')) || 0;

// Update the displayed scores on page load
if (userScoreDisplay && compScoreDisplay) {
    userScoreDisplay.textContent = userScore;
    compScoreDisplay.textContent = compScore;
}

buttons.forEach(button => {
    button.addEventListener('click', function (event) {
        const userChoice = event.target.id; // Get user's choice from the button clicked
        const compChoice = getRandomChoice(); // Get random choice for the computer
        const result = getWinner(userChoice, compChoice); // Determine winner

        // Log choices to the console
        console.log(`User choice: ${userChoice}`);
        console.log(`Computer choice: ${compChoice}`);

        // Update score and status display
        updateScore(result);
        updateStatus(result); // Update the status display

        checkWinner();

        // Hide triangle and show result box
        triangle.style.display = 'none';
        mainResultBox.style.display = 'block';

        // Update background and border color for user choice
        updateCircleStyles(mainUserElement, userChoice);
        // Update background and border color for computer choice
        updateCircleStyles(mainCompElement, compChoice);
    });
});

// Update the score and display the result
function updateScore(result) {
    if (result === "USER") {
        userScore++;
        userScoreDisplay.textContent = userScore;
    } else if (result === "COMP") {
        compScore++;
        compScoreDisplay.textContent = compScore;
    }

    // Store updated scores in localStorage
    localStorage.setItem('userScore', userScore);
    localStorage.setItem('compScore', compScore);
}

// Consolidated status update function
function updateStatus(result) {
    // Remove the winner class from both circles to reset
    mainUserElement.classList.remove('winner');
    mainCompElement.classList.remove('winner');

    if (result === "USER") {
        statusDisplay.textContent = "YOU WIN";
        status1Display.style.display = "block"; // Show status1
        mainUserElement.classList.add('winner'); // Apply winner animation to user
    } else if (result === "COMP") {
        statusDisplay.textContent = "YOU LOST";
        status1Display.style.display = "block"; // Show status1
        mainCompElement.classList.add('winner'); // Apply winner animation to computer
    } else {
        statusDisplay.textContent = "TIE UP";
        status1Display.style.display = "none"; // Hide status1 on tie
    }
}

function checkWinner() {
    if (userScore === 5 || compScore === 5) {
        // Show the scores and result box as usual
        triangle.style.display = 'none';
        mainResultBox.style.display = 'block';

        // Check if the user reached 5 points first
        if (userScore === 5 && userScore > compScore) {
            // Show the "Next" button when the user wins
            document.querySelector('.next-btn').style.display = 'block';
        } else {
            // Keep the "Next" button hidden if the computer wins or it's a tie
            document.querySelector('.next-btn').style.display = 'none';
        }
    }
}

// Reset the game - only resets scores if 5 points are reached
function resetGame() {
    if (userScore === 5 || compScore === 5) {
        userScore = 0;
        compScore = 0;
        localStorage.setItem('userScore', userScore); // Reset local storage
        localStorage.setItem('compScore', compScore);
    }

    userScoreDisplay.textContent = userScore;
    compScoreDisplay.textContent = compScore;
    userChoiceDisplay.textContent = "YOU PICKED";
    compChoiceDisplay.textContent = "PC PICKED";
    triangle.style.display = 'block'; // Show the triangle again when resetting
    mainResultBox.style.display = 'none'; // Hide the result box when resetting

    // Hide the "Next" button during reset
    document.querySelector('.next-btn').style.display = 'none';

    // Reset styles for circles
    resetCircleStyles(mainUserElement);
    resetCircleStyles(mainCompElement);

    // Remove winner class on reset
    mainUserElement.classList.remove('winner');
    mainCompElement.classList.remove('winner');
}

// Update circle styles based on choice
function updateCircleStyles(circleElement, choice) {
    switch (choice) {
        case 'rock':
            circleElement.style.backgroundImage = 'var(--rock)';
            circleElement.style.borderColor = 'var(--bx3)';
            break;
        case 'paper':
            circleElement.style.backgroundImage = 'var(--paper)';
            circleElement.style.borderColor = 'var(--bx1)';
            break;
        case 'scissors':
            circleElement.style.backgroundImage = 'var(--scissors)';
            circleElement.style.borderColor = 'var(--bx2)';
            break;
        default:
            break;
    }
}

// Reset circle styles
function resetCircleStyles(circleElement) {
    circleElement.style.backgroundImage = ''; // Reset background image
    circleElement.style.borderColor = ''; // Reset border color
}

// Add event listener for "Play Again" button (check if the button exists)
const playAgainBtn = document.getElementById('play-again');
if (playAgainBtn) {
    playAgainBtn.addEventListener('click', function() {
        triangle.style.display = 'block'; 
        mainResultBox.style.display = 'none'; 
        resetCircleStyles(mainUserElement);
        resetCircleStyles(mainCompElement);
        userChoiceDisplay.textContent = "YOU PICKED";
        compChoiceDisplay.textContent = "PC PICKED";
        resetGame();
    });
}

// Get a random choice for the computer
function getRandomChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Determine the winner based on user and computer choices
function getWinner(user, comp) {
    if (user === comp) {
        return "TIE";
    } else if (
        (user === "rock" && comp === "scissors") ||
        (user === "paper" && comp === "rock") ||
        (user === "scissors" && comp === "paper")
    ) {
        return "USER";
    } else {
        return "COMP";
    }
}
