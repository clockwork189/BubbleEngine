// Setting the height and width of the canvas element
var stageWidth = canvas.width;
var stageHeight = canvas.height;

// Creating game elements
var bubbles = [];

var mouseX = stageWidth / 2;
var mouseY = 0;

var frameCount = 0;

var GameObject = function () {
    this.lastGeneratedObstacle = 0;
    this.timer = 0;
};

var game = new GameObject();

var Bubble = function (startX, endX, endY, radius) {
    this.currentX = startX;
    this.currentY = stageHeight;
    this.endingX = endX;
    this.endingY = endY;
    this.radius = radius;
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
    var startX = random(0, stageWidth);
    var endX = startX;
    var endY = random(0, stageHeight);
    var radius = random(2, 10);
    var bubble = new Bubble(startX, endX, endY, radius);
    bubbles.push(bubble);
    game.lastGeneratedBubble = frameCount;
};

var drawBubbles = function () {
    for(var i = 0; i < bubbles.length; i++) {
        var bubble = bubbles[i];
        if(bubble.currentY !== bubble.endingY) {
            context.beginPath();
            context.arc(bubble.currentX, bubble.currentY, bubble.radius, 0, 2 * Math.PI, false);
            context.fillStyle = "#3366FF";
            context.stroke();

            bubble.currentY -= 0.5;
        } else {
            bubbles.splice(i, 1);
        }
    }
};

var loop = function () {
    frameCount += 1;
    drawBackground();
    drawFrameCount();
    generateBubbles();
    drawBubbles();
    requestAnimationFrame(loop);
};
loop();