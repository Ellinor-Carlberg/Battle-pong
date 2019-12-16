"use strict";
var Ball = (function () {
    function Ball(ballXPostion, ballYPostion, ballSpeedX, ballSpeedY, ballDiameter) {
        this.ballXPostion = width / 2;
        this.ballYPostion = height / 2;
        this.ballSpeedX = random(ballSpeedX * -1, ballSpeedX);
        this.ballSpeedY = random(ballSpeedY * -1, ballSpeedY);
        this.ballDiameter = 30;
    }
    return Ball;
}());
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
    var ballDiameter = circleSize / 30;
    ;
    background(119, 123, 126);
    fill(255, 255, 255);
    stroke(0, 0, 0);
    strokeWeight(2);
    ellipse(ballXPosition, ballYPosition, ballDiameter, ballDiameter);
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
    console.log(player1Position);
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