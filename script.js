
// Get Canvas
var cnvs = document.getElementById("backCanvas");
// Declare and initialize variables
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var starCnt = 1000;
var starAreaOfInfluence = 400;
var xDist;
var yDist;
var xDist2;
var yDist2;
var mag;
var xNorm;
var yNorm;
var xMove;
var yMove;
var stars = [];

// Get Canvas 2d Context
var ctx = cnvs.getContext("2d");

// Resize Canvas
resizeCanvas();

// Resize the Canvas when the window resizes
window.addEventListener('resize' , resizeCanvas, false);


// Resize Canvas to match window
function resizeCanvas() {
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;
    cnvs.width = winWidth;
    cnvs.height = winHeight;

    // Create star field
    buildStars();
}

// Move stars when the mouse moves
function mouseMove(event) {
    drawStarsMove(event.clientX, event.clientY);
}

// Create a random star field - random position, radius, hue, saturation, lightness, and alpha within some bounds that I thought looked good
function buildStars() {
    stars = [];
    for(i=0; i<starCnt; i++) {
        stars.push(
            {
                x: Math.random() * winWidth,
                y: Math.random() * winHeight,
                r: 0.4 + (Math.random()*1.5),
                h: 195 + (Math.random()*90),
                s: Math.random() * 100,
                l: 70,
                a: 0.4 + (Math.random()-0.25)
            }
        );
    }

    // Draw static star field
    drawStars();
}

// Draw stars - static (Used when first loaded or when the window is resized.)
function drawStars() {
    ctx.clearRect(0, 0, winWidth, winHeight);
    for(i=0; i<starCnt; i++) {
        ctx.beginPath();
        ctx.arc(stars[i].x, stars[i].y, stars[i].r, 0 ,360);
        ctx.fillStyle = "hsla("+ stars[i].h + "," + stars[i].s + "%," + stars[i].l + "%," + stars[i].a +")";
        ctx.fill();
        ctx.closePath();
    }
}

// Draw stars - dynamic with mouse movement
function drawStarsMove(mX, mY) {
    // Clear Canvas
    ctx.clearRect(0, 0, winWidth, winHeight);

    // Redraw all stars
    for(i=0; i<starCnt; i++) {
        // Calculate distance to mouse pointer
        xDist = mX - stars[i].x;
        yDist = mY - stars[i].y;
        xDist2 = xDist * xDist;
        yDist2 = yDist * yDist;
        mag = Math.sqrt(xDist2 + yDist2);
        xNorm = xDist / mag;
        yNorm = yDist / mag;
        xMove = xNorm * (1/mag) * 450;
        yMove = yNorm * (1/mag) * 450;
        
        // Draw static stars (all stars outside of the area of influence)
        if(mag > starAreaOfInfluence) {
            // Draw star - Filled circle using hsla() color for fill style
            ctx.beginPath();
            ctx.arc(stars[i].x, stars[i].y, stars[i].r, 0 ,360);
            ctx.fillStyle = "hsla("+ stars[i].h + "," + stars[i].s + "%," + stars[i].l + "%," + stars[i].a +")";
            ctx.fill();
            ctx.closePath();
        }
        // Draw adjusted stars
        else {
            // Draw star - With adjusted x and y position to create visual affect around the mouse cursor
            ctx.beginPath();
            ctx.arc(stars[i].x + xMove, stars[i].y + yMove, stars[i].r, 0 ,360);
            ctx.fillStyle = "hsla("+ stars[i].h + "," + stars[i].s + "%," + stars[i].l + "%," + stars[i].a +")";
            ctx.fill();
            ctx.closePath();
        }

    }
}
