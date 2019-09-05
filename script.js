// Update years of experience
document.getElementById("yearsOfExperience").innerText = (new Date().getFullYear() - 2007) + '';

// Upage copyright year
document.getElementById("currYear").innerText = (new Date().getFullYear()) + '';



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The JavaScript below handles the cursor and typing animation seen on the top left of this page.
// Two different asynchronous calls to setInterval() and setTimeout()(called recursively) handle the 
// blinking of the cursor and the random addition (and deletion) or characters.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get text span
var textSpan = document.getElementById("HelloWorldText");

// Variable declarations
var completedTyping = false;
var charsTyped = 0;
var messageToType = 'Hello, World...';
var blinkOn = false;


// Update cursor function
function udpateCursor() {
    // Flip completed flag
    blinkOn = !blinkOn;

    if(blinkOn) {
        textSpan.innerText += '█';
    }
    else {
        
        textSpan.innerText = textSpan.innerText.substring(0, textSpan.innerText.length - 1);
    }
}   // End updateCursor()


// Start the Blinking cursor by calling updateCursor() every 500ms infinitely
window.setInterval(udpateCursor, 500);


// Update text function
function udpateText() {
    
    // Type out message if not completed
    if (!completedTyping) {
        // Increment character typed counter
        charsTyped++;

        // Add typed characters to display
        if (charsTyped <= messageToType.length) {     
            textSpan.innerText = messageToType.substring(0, charsTyped);
            // Add cursor if blink On
            if(blinkOn) {
                textSpan.innerText += '█';
            }
        } 
        // Message has been fully typed
        else {
            // Delay via iteration count before considering completed
            if(charsTyped > messageToType.length + 18) {
                completedTyping = true;
                charsTyped = messageToType.length;
            }
        }
    }   // End if not completed
    // Else If completed
    else {
        // Decrement character typed counter
        charsTyped--;

        // Delete characters from display
        if (charsTyped >= 0) {     
            textSpan.innerText = messageToType.substring(0, charsTyped);
            // Add cursor if blink On
            if(blinkOn) {
                textSpan.innerText += '█';
            }
        }
        // Message has been fully deleted
        else {
            // Delay via iteration count before considering NOT completed and restarting
            if(charsTyped < -7) {
                completedTyping = false;
                charsTyped = 0;
            }
        }
    }   // End If completed
}

// Randomly Update text via this Immediately Invoked Function Expression(IIFE) that calls itself after each call to updateText()
(function iterate() {
    var timeRand = Math.round(Math.random() * (450 - 25)) + 25;
    setTimeout(function() {udpateText(); iterate();}, timeRand);
})();
