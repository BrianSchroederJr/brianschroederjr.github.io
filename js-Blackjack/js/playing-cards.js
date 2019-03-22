// playing-cards.js - Playing Card functions and models

function createDeck() {
    // Create deck of cards
    let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
    let ranks = ["Ace", "King", "Queen", "Jack", "Ten", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two"];
    let deck = [];
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for (let rankIndex = 0; rankIndex < ranks.length; rankIndex++) {
            let card = { suit: suits[suitIndex], rank: ranks[rankIndex] };
            deck.push(card);
        }
    }
    return deck;
}

// This function is obsolete in this implementation but left as a reference.
function getCardDesc(card) {
    return card.rank + " of " + card.suit;
}

function getCardsDesc(cards) {
    let cardsDesc = "";

    // Describe cards
    // for (let card = 0; card < cards.length; card++) {
    //     cardsDesc += getCardDesc(cards[card]) + "<br>";
    // }

    // Draw cards - 1 line at a time for 6 lines
    // Top
    for (i=0; i<cards.length; i++) {
        cardsDesc += "&nbsp;-----&nbsp;&nbsp;";
    }
    cardsDesc += "<br>"
    for (i=0; i<cards.length; i++) {
        if(cards[i].rank === "Ten") {
            cardsDesc += "|" + getCardRankSymbol(cards[i]) + "&nbsp;&nbsp;&nbsp;|&nbsp;";
        }
        else {
            cardsDesc += "|" + getCardRankSymbol(cards[i]) + "&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;";
        }
    }
    cardsDesc += "<br>"
    for (i=0; i<cards.length; i++) {
        cardsDesc += "|" + getCardSuitSymbol(cards[i]) + "&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;";
    }
    cardsDesc += "<br>"
    for (i=0; i<cards.length; i++) {
        cardsDesc += "|&nbsp;&nbsp;&nbsp;&nbsp;" + getCardSuitSymbol(cards[i]) + "|&nbsp;";
    }
    cardsDesc += "<br>"
    for (i=0; i<cards.length; i++) {
        if(cards[i].rank === "Ten") {
            cardsDesc += "|&nbsp;&nbsp;&nbsp;" + getCardRankSymbol(cards[i]) + "|&nbsp;";
        }
        else {
            cardsDesc += "|&nbsp;&nbsp;&nbsp;&nbsp;" + getCardRankSymbol(cards[i]) + "|&nbsp;";
        }
    }
    cardsDesc += "<br>"
    // Bottom
    for (i=0; i<cards.length; i++) {
        cardsDesc += "&nbsp;-----&nbsp;&nbsp;"
    }
    cardsDesc += "<br>"

    return cardsDesc;
}

function getNextCard() {
    // Take the first card from the deck
    return deck.shift();        // Note: This function is affecting the global deck declared at the top of this file.
}

function shuffleDeck(deck) {
    for (let currCard = 0; currCard < deck.length; currCard++) {
        let swapIndex = Math.floor(Math.random() * deck.length);
        let tempCard = deck[swapIndex];
        deck[swapIndex] = deck[currCard];
        deck[currCard] = tempCard;
    }
}

function getScore(cards) {
    let score = 0;
    let hasAce = false;

    for (let card = 0; card < cards.length; card++) {
        let currCard = cards[card];
        score += getCardValue(currCard);
        if (currCard.rank === "Ace") {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        score += 10;
    }
    return score;
}

function getCardValue(card) {
    switch(card.rank) {
        case "Ace":
            return 1;
        case "Two":
            return 2;
        case "Three":
            return 3;
        case "Four":
            return 4;
        case "Five":
            return 5;
        case "Six":
            return 6;
        case "Seven":
            return 7;
        case "Eight":
            return 8;
        case "Nine":
            return 9;
        default:
            return 10;
    }
}

function getCardRankSymbol(card) {
    switch(card.rank) {
        case "Ace":
            return "A";
        case "Two":
            return "2";
        case "Three":
            return "3";
        case "Four":
            return "4";
        case "Five":
            return "5";
        case "Six":
            return "6";
        case "Seven":
            return "7";
        case "Eight":
            return "8";
        case "Nine":
            return "9";
        case "Ten":
            return "10";
        case "Jack":
            return "J";
        case "Queen":
            return "Q";
        default:
            return "K";
    }
}

function getCardSuitSymbol(card) {
    switch(card.suit) {
        case "Clubs":
            return "&clubs;";
        case "Diamonds":
            return "&diams;";
        case "Hearts":
            return "&hearts;";
        default:
            return "&spades;";
    }
}
