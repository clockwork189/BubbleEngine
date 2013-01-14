// Setting the height and width of the canvas element
var stageWidth = canvas.width;
var stageHeight = canvas.height;

// Creating game elements
var bubbles = [];
var mouseX = stageWidth / 2;
var mouseY = 0;
var frameCount = 0;

var images = {};
var ImageSources = {
    bubble1: "images/bubble1.png"
};

var loadImages = function (sources) {
    var loadedImages = 0, numImages = 0, key, i;
    for (key in sources) {
        if (sources.hasOwnProperty(key)) {
            numImages += 1;
        }
    }
    if (numImages > 0) {
        for (i in sources) {
            if (sources.hasOwnProperty(i)) {
                images[i] = new Image();
                images[i].src = sources[i];
                loadedImages += 1;
            }
        }
    }
    if (numImages === loadedImages) {
        return true;
    }
    return false;
};
loadImages(ImageSources);

var GameObject = function () {
    this.lastGeneratedObstacle = 0;
    this.timer = 0;
};

var game = new GameObject();

var Bubble = function (startX, endX, endY, dimensions) {
    this.currentX = startX;
    this.currentY = stageHeight;
    this.endingX = endX;
    this.endingY = endY;
    this.dimensions = dimensions;
    this.speed = random(1, 3);
    this.isPopped = false;
};

var drawBackground = function () {
    context.rect(0, 0, stageWidth, stageHeight);
    // create radial gradient
    var grd = context.createRadialGradient(stageWidth / 2, stageHeight / 2, 60, stageWidth / 2, stageHeight / 2, 1000);
    // light blue
    grd.addColorStop(0, '#8ED6FF');
    // dark blue
    grd.addColorStop(1, '#004CB3');

    context.fillStyle = grd;
    context.fill();
};

var drawFrameCount = function () {
    context.font = '16px courier';
    context.fillStyle = "#000";
    context.fillText("Frame Count: " + frameCount, 700, 30);
};

var generateBubbles = function () {
    if(frameCount - game.lastGeneratedBubble < 100) {
        return;
    }
    var numBubbles = random(1, 5);

    for(var i = 0; i < numBubbles; i += 1) {
        var startX = random(0, stageWidth);
        var endX = startX;
        var endY = random(0, stageHeight);
        var dimensions = random(2, 50);
        var bubble = new Bubble(startX, endX, endY, dimensions);
        bubbles.push(bubble);
    }
    game.lastGeneratedBubble = frameCount;
};

var drawBubbles = function () {
    for(var i = 0; i < bubbles.length; i++) {
        var bubble = bubbles[i];
        if(bubble.currentY !== bubble.endingY) {
            context.drawImage(images.bubble1, bubble.currentX, bubble.currentY, bubble.dimensions, bubble.dimensions);
            bubble.currentY -= bubble.speed;
        } else {
            bubbles.splice(i, 1);
        }
    }
};

var loop = function () {
    frameCount += 1;
    drawBackground();
    generateBubbles();
    drawBubbles();
    requestAnimationFrame(loop);
};
loop();