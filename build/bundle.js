"use strict";
var player1Position = 0;
var player2Position = 180;
var ballSpeedX = 5;
var ballSpeedY = 5;
var ballXPosition = innerWidth / 2;
var ballYPosition = innerHeight / 2;
var padLength = 20;
function preload() {
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    noCursor();
    fullscreen();
    angleMode(DEGREES);
    ballSpeedX = random(ballSpeedX * -1, ballSpeedX);
    ballSpeedY = random(ballSpeedY * -1, ballSpeedY);
}
function draw() {
    background('#777b7e');
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
    var player1XCoordinates = [];
    var player1YCoordinates = [];
    for (var i = 0; i <= padLength; i++) {
        player1XCoordinates[i] = (circleSize / 2) * Math.cos(((player1Position + i) * Math.PI / 180)) + (width / 2);
    }
    for (var i = 0; i <= padLength; i++) {
        player1YCoordinates[i] = (circleSize / 2) * Math.sin(((player1Position + i) * Math.PI / 180)) + (height / 2);
    }
    background(119, 123, 126);
    fill(255, 255, 255);
    stroke(0, 0, 0);
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
    handleBall(player1XCoordinates, player1YCoordinates);
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
function handleBall(player1XCoordinates, player1YCoordinates) {
    if (ballYPosition > height || ballYPosition < 0) {
        ballSpeedY *= -1;
    }
    else if (ballXPosition > width || ballXPosition < 0) {
        ballSpeedX *= -1;
    }
    for (var i = 0; i <= padLength; i++) {
        for (var j = 0; j <= padLength; j++) {
            stroke('purple');
            strokeWeight(2);
            ellipse(player1XCoordinates[i], player1YCoordinates[i], 7, 7);
        }
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
//# sourceMappingURL=bundle.js.map