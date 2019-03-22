// js-Blackjack.js - Blackjack game implementation

// Variables
let gameStarted = false;
let gameOver = false;
let gameOverRendered = false;
let playerWon = false;
let playerStaying = false;
let dealerStaying = false;
let blackjack = false;
let tie = false;
let dealerCards = [];
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;
let wins = 0;
let losses = 0;
let deck = [];
let replayText = "";
let replayTextOptions = ["Let's have another go","Deal Me In, Again","I'm not quitting now","2 more cards please","Play again"];


// Get HTML output element
let outPane = document.getElementById("outputPane");
let winLossPane = document.getElementById("winLossPane");
let winCnt = document.getElementById("winCnt");
let lossCnt = document.getElementById("lossCnt");
// Get HTML buttons
let startBtn = document.getElementById("btnStart");
let hitBtn = document.getElementById("btnHit");
let stayBtn = document.getElementById("btnStay");

// Hide HIT and STAY buttons at beginning (and Wins: and Losses: div)
hitBtn.style.display = "none";
stayBtn.style.display = "none";
winLossPane.style.display = "none";

renderGame();

// INITIALIZE NEW GAME - and set up Event Listeners
// Hide and show buttons and update display
startBtn.addEventListener("click", function() {
    // Reset needed game variables for another game
    gameStarted = true;
    gameOver = false;
    gameOverRendered = false;
    playerWon = false;
    playerStaying = false;
    dealerStaying = false;
    blackjack = false;
    tie = false;
    dealerScore = 0;
    playerScore = 0;

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    startBtn.style.display = "none";
    hitBtn.style.display = "inline";
    stayBtn.style.display = "inline";

    updateGame();
    renderGame();
});

hitBtn.addEventListener("click", function() {
    playerCards.push(getNextCard());
    updateGame();
    renderGame();
});

stayBtn.addEventListener("click", function() {
    playerStaying = true;

    // Have dealer grab cards with a delay that cleans itself up when complete
    var dealerCardTimer = setInterval(function() {
        if(dealerScore < playerScore && dealerScore < 21) {
            dealerCards.push(getNextCard());
            updateGame();
            renderGame();
        }
        else {
            // Stop dealer from grabbing more cards
            dealerStaying = true;
            clearInterval(dealerCardTimer);
            updateGame();
            renderGame();
        }
    }, 300);

});


// METHODS (FUNCTIONS)

function updateGame() {

    updateScores();

    // Player loses if their score is over 21
    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    }
    // Player wins with a Blackjack immediately
    else if (playerScore === 21 && playerCards.length === 2) {
        playerWon = true;
        blackjack = true;
        gameOver = true;
    }
    // Player and dealer tie
    else if (playerScore === dealerScore && playerStaying && dealerStaying) {
        tie = true;
        gameOver = true;
    }
    // Player wins if the dealer went over 21
    else if (dealerScore > 21 && dealerStaying) {
        playerWon = true;
        gameOver = true;
    }
    // Or the game can be over with neither player being over 21 then see if player beats dealer
    else if (dealerStaying) {
        if(playerScore > dealerScore) {
            playerWon = true;
            gameOver = true;
        }
        else {
            playerWon = false;
            gameOver = true;
        }
    }
}

function renderGame() {
    if (!gameStarted) {
        outPane.innerHTML = "Welcome to js-Blackjack!";
        return;
    }

    outPane.innerHTML = 
    "Dealer has:<br>" +
    getCardsDesc(dealerCards) +
    "(score: " + dealerScore + ")<br><br>" +
    "Player has:<br>" +
    getCardsDesc(playerCards) +
    "(score: " + playerScore + ")<br><br>";

    // Check Game Over state
    if (gameOver && !gameOverRendered) {
        if (playerWon && blackjack) {
            outPane.innerHTML += "BLACKJACK, YOU WIN!";
            wins++;
        }
        else if (tie) {
            outPane.innerHTML += "PUSH (TIE GAME)";
        }
        else if (playerWon && !blackjack) {
            outPane.innerHTML += "YOU WIN!";
            wins++;
        }
        else if (!playerWon && !tie) {
            outPane.innerHTML += "DEALER WINS!";
            losses++;
        }
        // Reset buttons
        replayText = replayTextOptions[Math.floor(Math.random() * replayTextOptions.length)];
        startBtn.innerHTML = replayText;
        startBtn.style.display = "inline";
        hitBtn.style.display = "none";
        stayBtn.style.display = "none";

        // Update wins/losses display
        winLossPane.style.display = "block";
        winCnt.innerHTML = "" + wins;
        lossCnt.innerHTML = "" + losses;

        // Reset gameOverRendered to keep code execution out of here.
        gameOverRendered = !gameOverRendered;   
    }
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}
