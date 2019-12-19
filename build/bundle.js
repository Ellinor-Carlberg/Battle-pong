"use strict";
var player1Position = 0;
var player2Position = 180;
var ballSpeedX = 5;
var ballSpeedY = 5;
var ballXPosition = innerWidth / 2;
var ballYPosition = innerHeight / 2;
var padLength = 20;
let isGameRunning;


function preload() {
    
}
function setup() {
    isGameRunning = 0;
    
    createCanvas(windowWidth, windowHeight);
    textSize(23);
    frameRate(60);
    fullscreen();
    angleMode(DEGREES);
    ballSpeedX = random(ballSpeedX * -1, ballSpeedX);
    ballSpeedY = random(ballSpeedY * -1, ballSpeedY);
}
function draw() {
    background(50);
    clear();
    if(isGameRunning == 0){
        text('Press enter to start', 20, 40)
    }
    if(isGameRunning == 1) {
    var circleSize;
    ballXPosition += ballSpeedX;
    ballYPosition += ballSpeedY;
    if (windowWidth >= windowHeight) {
        circleSize = windowHeight - 40;
    }
    else {
        circleSize = windowWidth - 40;
    }
    var ballRadius = circleSize / 40;
    ;
    background(119, 123, 126);
    fill(5, 213, 133);
    stroke(179, 124, 34);
    strokeWeight(2);
    ellipse(ballXPosition, ballYPosition, ballRadius * 2, ballRadius * 2);
    noFill();
    stroke(0, 0, 0);
    strokeWeight(1);
    ellipse(width / 2, height / 2, circleSize, circleSize);
    stroke(0, 0, 0);
    strokeWeight(9);
    arc(width / 2, height / 2, circleSize, circleSize, player1Position, player1Position + padLength);
    stroke(255, 204, 0);
    strokeWeight(5);
    arc(width / 2, height / 2, circleSize, circleSize, player1Position, player1Position + padLength);
    stroke(0, 0, 0);
    strokeWeight(9);
    arc(width / 2, height / 2, circleSize, circleSize, player2Position, player2Position + padLength);
    stroke(253, 188, 180);
    strokeWeight(5);
    arc(width / 2, height / 2, circleSize, circleSize, player2Position, player2Position + padLength);
    handlePads();
    handleBall(player1Position, player1Position);
    }
}
function keyPressed(){
    if(keyCode === ENTER){
        isGameRunning = 1;
    }
}
function handlePads() {
    var player1Velocity = 0;
    var player2Velocity = 0;
    if (keyIsDown(87)) {
        player1Velocity -= 5;
    }
    else if (keyIsDown(83)) {
        player1Velocity += 5;
    }
    if (keyIsDown(UP_ARROW)) {
        player2Velocity -= 5;
    }
    else if (keyIsDown(DOWN_ARROW)) {
        player2Velocity += 5;
    }
    player1Position += player1Velocity;
    player2Position += player2Velocity;
    player1Velocity *= 0.4;
    player2Velocity *= 0.4;
    player1Position = constrain(player1Position, 0, 159);
    player2Position = constrain(player2Position, 180, 339);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function handleBall(player1Position, player2Position) {
    if (ballYPosition > height || ballYPosition < 0) {
        ballSpeedY *= -1;
    }
    else if (ballXPosition > width || ballXPosition < 0) {
        ballSpeedX *= -1;
    }
    for (var i = player1Position; i < (player1Position + padLength); i++) {
        if (i == ballYPosition || i == ballXPosition) {
            console.log('pad - player 1');
        }
    }
    for (var i = player2Position; i < (player2Position + padLength); i++) {
        if (i == ballYPosition || i == ballXPosition) {
            console.log('pad - player 2');
        }
    }
}
//# sourceMappingURL=bundle.js.map