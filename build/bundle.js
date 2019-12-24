"use strict";
var Ball = (function () {
    function Ball(ballXPosition, ballYPosition, ballSpeed, ballRadius) {
        this.ballXPosition = ballXPosition;
        this.ballYPosition = ballYPosition;
        this.ballSpeed = ballSpeed;
        this.ballRadius = ballRadius;
    }
    Ball.prototype.update = function () { };
    Ball.prototype.draw = function () {
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(2);
        ellipse(this.ballXPosition, this.ballYPosition, this.ballRadius * 2, this.ballRadius * 2);
    };
    Ball.prototype.handleBall = function () {
        if (this.ballYPosition > height || this.ballYPosition < 0) {
            this.ballSpeed *= -1;
        }
        else if (this.ballXPosition > width || this.ballXPosition < 0) {
            this.ballSpeed *= -1;
        }
    };
    Ball.prototype.ballSize = function () { };
    Ball.prototype.bounceBackFromPad = function () { };
    return Ball;
}());
var Events = (function () {
    function Events() {
        this.eventsList = GameSettings.prototype.gameEvents;
    }
    Events.prototype.update = function () { };
    Events.prototype.draw = function () { };
    Events.prototype.announceEvent = function () { };
    Events.prototype.activateEvent = function () { };
    Events.prototype.countDownToEvent = function () { };
    Events.prototype.reverseButtons = function () { };
    Events.prototype.shrinkPad = function () { };
    Events.prototype.fasterBall = function () { };
    Events.prototype.hideBall = function () { };
    Events.prototype.moreBalls = function () { };
    return Events;
}());
var GameManager = (function () {
    function GameManager() {
        this.gameSettings = new GameSettings();
        this.gameArea = GameArea.prototype;
        this.events = [];
        this.players = [];
        this.balls = [];
        this.pads = [];
        this.isGameRunning = 0;
    }
    GameManager.prototype.update = function () { };
    GameManager.prototype.draw = function (radius) {
    };
    GameManager.prototype.startGame = function () {
        this.isGameRunning = 1;
    };
    GameManager.prototype.quitGame = function () { };
    GameManager.prototype.createGameArea = function () { };
    GameManager.prototype.createPlayer = function (newPlayer) {
        this.players.push(newPlayer);
    };
    GameManager.prototype.createBall = function () { };
    GameManager.prototype.rebuildGameArea = function () { };
    return GameManager;
}());
var img;
function preload() {
    img = loadImage('./assets/images/battle_pong.svg');
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    fullscreen();
}
function draw() {
    background('#777b7e');
    noStroke();
    fill('#999966');
    rect((width * .5) - 350, 0, 700, height);
    strokeWeight(60);
    stroke('#999966');
    line(0, 150, width, 500);
    strokeWeight(140);
    stroke('#999966');
    line(0, 280, width, 630);
    strokeWeight(40);
    stroke('#999966');
    line(0, 400, width, 750);
    strokeWeight(3);
    stroke('#000000');
    fill('#4363d8');
    rect((width * .5) - 300, 200, 55, 45, 15);
    var playerOne = 'Player 1';
    textSize(30);
    fill('#000000');
    text(playerOne, (width * .5) - 200, 232);
    strokeWeight(3);
    stroke('#000000');
    fill('#ffffff');
    rect((width * .5) + 180, 200, 50, 45, 15);
    fill('#000000');
    triangle((width * .5) + 195, 230, (width * .5) + 215, 230, (width * .5) + 205, 210);
    strokeWeight(3);
    stroke('#000000');
    fill('#ffffff');
    rect((width * .5) + 250, 200, 50, 45, 15);
    fill('#000000');
    triangle((width * .5) + 265, 212, (width * .5) + 285, 212, (width * .5) + 275, 232);
    strokeWeight(3);
    stroke('#000000');
    fill('#cc0000');
    rect((width * .5) - 300, 260, 55, 45, 15);
    var playerTwo = 'Player 2';
    textSize(30);
    fill('#000000');
    text(playerTwo, (width * .5) - 200, 292);
    strokeWeight(3);
    stroke('#000000');
    fill('#ffffff');
    rect((width * .5) + 180, 260, 50, 45, 15);
    var p2LeftKey = 'a';
    textSize(30);
    fill('#000000');
    text(p2LeftKey, (width * .5) + 197, 290);
    strokeWeight(3);
    stroke('#000000');
    fill('#ffffff');
    rect((width * .5) + 250, 260, 50, 45, 15);
    var p2RightKey = 'z';
    textSize(30);
    fill('#000000');
    text(p2RightKey, (width * .5) + 267, 290);
    strokeWeight(3);
    stroke('#000000');
    fill('#911eb4');
    rect((width * .5) - 300, 320, 55, 45, 15);
    var playerThree = 'Player 3';
    textSize(30);
    fill('#000000');
    text(playerThree, (width * .5) - 200, 352);
    strokeWeight(3);
    stroke('#000000');
    fill('#ffffff');
    rect((width * .5) + 180, 320, 50, 45, 15);
    var p3LeftKey = 'l';
    textSize(30);
    fill('#000000');
    text(p3LeftKey, (width * .5) + 202, 352);
    strokeWeight(3);
    stroke('#000000');
    fill('#ffffff');
    rect((width * .5) + 250, 320, 50, 45, 15);
    var p3RightKey = 'p';
    textSize(30);
    fill('#000000');
    text(p3RightKey, (width * .5) + 267, 350);
    strokeWeight(3);
    stroke('#000000');
    fill('#FFe119');
    rect((width * .5) - 300, 380, 55, 45, 15);
    var playerFour = 'Player 4';
    textSize(30);
    fill('#000000');
    text(playerFour, (width * .5) - 200, 412);
    strokeWeight(3);
    stroke('#000000');
    fill('#ffffff');
    rect((width * .5) + 180, 380, 50, 45, 15);
    var p4LeftKey = '3';
    textSize(30);
    fill('#000000');
    text(p4LeftKey, (width * .5) + 198, 412);
    strokeWeight(3);
    stroke('#000000');
    fill('#ffffff');
    rect((width * .5) + 250, 380, 50, 45, 15);
    var p4RightKey = 'e';
    textSize(30);
    fill('#000000');
    text(p4RightKey, (width * .5) + 267, 410);
    strokeWeight(3);
    stroke('#000000');
    fill('#3cb44b');
    rect((width * .5) - 300, 440, 55, 45, 15);
    var playerFive = 'Player 5';
    textSize(30);
    fill('#000000');
    text(playerFive, (width * .5) - 200, 472);
    strokeWeight(3);
    stroke('#000000');
    fill('#ffffff');
    rect((width * .5) + 180, 440, 50, 45, 15);
    var p5LeftKey = '9';
    textSize(30);
    fill('#000000');
    text(p5LeftKey, (width * .5) + 198, 472);
    strokeWeight(3);
    stroke('#000000');
    fill('#ffffff');
    rect((width * .5) + 250, 440, 50, 45, 15);
    var p5RightKey = '0';
    textSize(30);
    fill('#000000');
    text(p5RightKey, (width * .5) + 267, 472);
    strokeWeight(3);
    stroke('#000000');
    fill('#00ffff');
    rect((width * .5) - 300, 500, 55, 45, 15);
    var playerSix = 'Player 6';
    textSize(30);
    fill('#000000');
    text(playerSix, (width * .5) - 200, 532);
    strokeWeight(3);
    stroke('#000000');
    fill('#ffffff');
    rect((width * .5) + 180, 500, 50, 45, 15);
    var p6LeftKey = '5';
    textSize(30);
    fill('#000000');
    text(p6LeftKey, (width * .5) + 198, 532);
    strokeWeight(3);
    stroke('#000000');
    fill('#ffffff');
    rect((width * .5) + 250, 500, 50, 45, 15);
    var p6RightKey = '6';
    textSize(30);
    fill('#000000');
    text(p6RightKey, (width * .5) + 267, 532);
    strokeWeight(3);
    stroke('#000000');
    fill('#ffffff');
    rect((width * .5) + 190, 700, 100, 45, 15);
    var s = '+';
    textSize(30);
    fill('#000000');
    text(s, (width * .5) + 230, 730);
    strokeWeight(60);
    stroke('#F4ed47');
    line(0, 60, width, 60);
    strokeWeight(1);
    stroke('#000000');
    line(0, 30, width, 30);
    strokeWeight(3);
    stroke('#000000');
    line(0, 45, width, 45);
    strokeWeight(1);
    stroke('#000000');
    line(0, 55, width, 55);
    strokeWeight(2);
    stroke('#000000');
    line(0, 60, width, 60);
    strokeWeight(2);
    stroke('#000000');
    line(0, 80, width, 80);
    strokeWeight(2);
    stroke('#000000');
    line(0, 90, width, 90);
    strokeWeight(3);
    stroke('#000000');
    fill('#F4ed47');
    circle(60, 60, 80);
    fill('#000000');
    triangle(75, 80, 75, 40, 40, 60);
    fill('#F4ed47');
    stroke('#F4ed47');
    rect(47, 50, 5, 30);
    fill('#000000');
    stroke('#000000');
    rect(38, 54, 8, 13);
    strokeWeight(10);
    stroke('#000000');
    line(40, 90, 80, 30);
    image(img, width * .5 - (img.width * 0.5), 20);
    strokeWeight(3);
    stroke('#000000');
    fill('#000000');
    rect(1290, 660, 150, 70, 20);
    strokeWeight(3);
    stroke('#000000');
    fill('#F4ed47');
    rect(1300, 650, 150, 70, 20);
    var startButton = 'START';
    textSize(30);
    fill('#000000');
    text(startButton, 1325, 695);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
var GameManager = (function () {
    function GameManager() {
        this.gameSettings = new GameSettings();
        this.gameArea = new GameArea();
        this.events = [];
        this.players = [];
        this.balls = [];
        this.pads = [];
        this.isGameRunning = true;
    }
    GameManager.prototype.update = function () { };
    GameManager.prototype.draw = function () { };
    GameManager.prototype.startGame = function () { };
    GameManager.prototype.quitGame = function () { };
    GameManager.prototype.createGameArea = function () { };
    GameManager.prototype.createPlayer = function () { };
    GameManager.prototype.createBall = function () { };
    GameManager.prototype.rebuildGameArea = function () { };
    return GameManager;
}());
var GameSettings = (function () {
    function GameSettings() {
        this.gameManager = new GameManager();
        this.soundVolume = 5;
        this.gameEvents = [];
        this.nrOfPlayers = this.gameManager.players.length;
    }
    GameSettings.prototype.controlEvents = function () { };
    GameSettings.prototype.controlSound = function () { };
    return GameSettings;
}());
var GameArea = (function () {
    function GameArea(gameAreaXPosition, gameAreaYPosition) {
        this.gameAreaXPosition = gameAreaXPosition;
        this.gameAreaYPosition = gameAreaYPosition;
        this.gameRadius = this.calculateGameRadius();
        this.circleSize = this.calculateGameArea();
    }
    GameArea.prototype.update = function () { };
    GameArea.prototype.draw = function () { };
    GameArea.prototype.calculateGameRadius = function () {
        return this.circleSize / 2;
    };
    GameArea.prototype.calculateGameArea = function () {
        if (windowWidth >= windowHeight) {
            this.circleSize = windowHeight - 40;
        }
        else {
            this.circleSize = windowWidth - 40;
        }
        return this.circleSize;
    };
    return GameArea;
}());
var Pad = (function () {
    function Pad() {
        this.padXPosition = this.calculatePadXPosition();
        this.playerVelocity = this.calculatePlayerVelocity();
        this.padLength = this.calculatePadSize();
    }
    Pad.prototype.update = function () { };
    Pad.prototype.draw = function (radius) { };
    return Pad;
}());
draw();
void {};
hitPlayer();
void {};
this.padXPosition = constrain(this.padXPosition, 0, 159);
var Player = (function () {
    function Player(playerID, playerColor, playerButtonLeft, playerButtonRight) {
        this.playerID = playerID;
        this.playerColor = playerColor;
        this.playerButtonLeft = playerButtonLeft;
        this.playerButtonRight = playerButtonRight;
        this.startPosition = this.calculateStartPosition();
    }
    Player.prototype.update = function () { };
    Player.prototype.draw = function (radius) {
        stroke(0, 0, 0);
        strokeWeight(9);
        arc(width / 2, height / 2, this.circleSize, this.circleSize, this.startPosition, this.startPosition + padLength);
        stroke(253, 188, 180);
    };
    Player.prototype.calculateStartPosition = function () { return 10; };
    Player.prototype.calculatePlayerArea = function () { return 10; };
    Player.prototype.hitPlayer = function () { };
    return Player;
}());
var Ball = (function () {
    function Ball(ballXPosition, ballYPosition, ballSpeed, ballRadius) {
        this.ballXPosition = ballXPosition;
        this.ballYPosition = ballYPosition;
        this.ballSpeed = ballSpeed;
        this.ballRadius = ballRadius;
    }
    Ball.prototype.update = function () { };
    Ball.prototype.draw = function () { };
    Ball.prototype.handleBall = function () {
        if (this.ballYPosition > height || this.ballYPosition < 0) {
            this.ballSpeed *= -1;
        }
        else if (this.ballXPosition > width || this.ballXPosition < 0) {
            this.ballSpeed *= -1;
        }
    };
    Ball.prototype.ballSize = function () { };
    Ball.prototype.bounceBackFromPad = function () { };
    return Ball;
}());
var Events = (function () {
    function Events() {
    }
    return Events;
}());
var player1Position = 0;
var player2Position = 180;
var ballSpeedX = 5;
var ballSpeedY = 5;
var ballXPosition = innerWidth / 2;
var ballYPosition = innerHeight / 2;
var padLength = 20;
var hitboxRadius = 7;
var isGameRunning;
var img;
function preload() {
    img = loadImage('./assets/images/battle_pong.svg');
}
function setup() {
    isGameRunning = 0;
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    fullscreen();
    angleMode(DEGREES);
    ballSpeedX = random(ballSpeedX * -1, ballSpeedX);
    ballSpeedY = random(ballSpeedY * -1, ballSpeedY);
}
function draw() {
    clear();
    if (isGameRunning == 0) {
        background('#777b7e');
        noStroke();
        fill('#999966');
        rect((width * .5) - 350, 0, 700, height);
        strokeWeight(60);
        stroke('#999966');
        line(0, 150, width, 500);
        strokeWeight(140);
        stroke('#999966');
        line(0, 280, width, 630);
        strokeWeight(40);
        stroke('#999966');
        line(0, 400, width, 750);
        strokeWeight(3);
        stroke('#000000');
        fill('#4363d8');
        rect((width * .5) - 300, 200, 55, 45, 15);
        var playerOne = 'Player 1';
        textSize(30);
        fill('#000000');
        text(playerOne, (width * .5) - 200, 232);
        strokeWeight(3);
        stroke('#000000');
        fill('#ffffff');
        rect((width * .5) + 180, 200, 50, 45, 15);
        fill('#000000');
        triangle((width * .5) + 195, 230, (width * .5) + 215, 230, (width * .5) + 205, 210);
        strokeWeight(3);
        stroke('#000000');
        fill('#ffffff');
        rect((width * .5) + 250, 200, 50, 45, 15);
        fill('#000000');
        triangle((width * .5) + 265, 212, (width * .5) + 285, 212, (width * .5) + 275, 232);
        strokeWeight(3);
        stroke('#000000');
        fill('#cc0000');
        rect((width * .5) - 300, 260, 55, 45, 15);
        var playerTwo = 'Player 2';
        textSize(30);
        fill('#000000');
        text(playerTwo, (width * .5) - 200, 292);
        strokeWeight(3);
        stroke('#000000');
        fill('#ffffff');
        rect((width * .5) + 180, 260, 50, 45, 15);
        var p2LeftKey = 'a';
        textSize(30);
        fill('#000000');
        text(p2LeftKey, (width * .5) + 197, 290);
        strokeWeight(3);
        stroke('#000000');
        fill('#ffffff');
        rect((width * .5) + 250, 260, 50, 45, 15);
        var p2RightKey = 'z';
        textSize(30);
        fill('#000000');
        text(p2RightKey, (width * .5) + 267, 290);
        strokeWeight(3);
        stroke('#000000');
        fill('#911eb4');
        rect((width * .5) - 300, 320, 55, 45, 15);
        var playerThree = 'Player 3';
        textSize(30);
        fill('#000000');
        text(playerThree, (width * .5) - 200, 352);
        strokeWeight(3);
        stroke('#000000');
        fill('#ffffff');
        rect((width * .5) + 180, 320, 50, 45, 15);
        var p3LeftKey = 'l';
        textSize(30);
        fill('#000000');
        text(p3LeftKey, (width * .5) + 202, 352);
        strokeWeight(3);
        stroke('#000000');
        fill('#ffffff');
        rect((width * .5) + 250, 320, 50, 45, 15);
        var p3RightKey = 'p';
        textSize(30);
        fill('#000000');
        text(p3RightKey, (width * .5) + 267, 350);
        strokeWeight(3);
        stroke('#000000');
        fill('#FFe119');
        rect((width * .5) - 300, 380, 55, 45, 15);
        var playerFour = 'Player 4';
        textSize(30);
        fill('#000000');
        text(playerFour, (width * .5) - 200, 412);
        strokeWeight(3);
        stroke('#000000');
        fill('#ffffff');
        rect((width * .5) + 180, 380, 50, 45, 15);
        var p4LeftKey = '3';
        textSize(30);
        fill('#000000');
        text(p4LeftKey, (width * .5) + 198, 412);
        strokeWeight(3);
        stroke('#000000');
        fill('#ffffff');
        rect((width * .5) + 250, 380, 50, 45, 15);
        var p4RightKey = 'e';
        textSize(30);
        fill('#000000');
        text(p4RightKey, (width * .5) + 267, 410);
        strokeWeight(3);
        stroke('#000000');
        fill('#3cb44b');
        rect((width * .5) - 300, 440, 55, 45, 15);
        var playerFive = 'Player 5';
        textSize(30);
        fill('#000000');
        text(playerFive, (width * .5) - 200, 472);
        strokeWeight(3);
        stroke('#000000');
        fill('#ffffff');
        rect((width * .5) + 180, 440, 50, 45, 15);
        var p5LeftKey = '9';
        textSize(30);
        fill('#000000');
        text(p5LeftKey, (width * .5) + 198, 472);
        strokeWeight(3);
        stroke('#000000');
        fill('#ffffff');
        rect((width * .5) + 250, 440, 50, 45, 15);
        var p5RightKey = '0';
        textSize(30);
        fill('#000000');
        text(p5RightKey, (width * .5) + 267, 472);
        strokeWeight(3);
        stroke('#000000');
        fill('#00ffff');
        rect((width * .5) - 300, 500, 55, 45, 15);
        var playerSix = 'Player 6';
        textSize(30);
        fill('#000000');
        text(playerSix, (width * .5) - 200, 532);
        strokeWeight(3);
        stroke('#000000');
        fill('#ffffff');
        rect((width * .5) + 180, 500, 50, 45, 15);
        var p6LeftKey = '5';
        textSize(30);
        fill('#000000');
        text(p6LeftKey, (width * .5) + 198, 532);
        strokeWeight(3);
        stroke('#000000');
        fill('#ffffff');
        rect((width * .5) + 250, 500, 50, 45, 15);
        var p6RightKey = '6';
        textSize(30);
        fill('#000000');
        text(p6RightKey, (width * .5) + 267, 532);
        strokeWeight(3);
        stroke('#000000');
        fill('#ffffff');
        rect((width * .5) + 190, 700, 100, 45, 15);
        var s = '+';
        textSize(30);
        fill('#000000');
        text(s, (width * .5) + 230, 730);
        strokeWeight(60);
        stroke('#F4ed47');
        line(0, 60, width, 60);
        strokeWeight(1);
        stroke('#000000');
        line(0, 30, width, 30);
        strokeWeight(3);
        stroke('#000000');
        line(0, 45, width, 45);
        strokeWeight(1);
        stroke('#000000');
        line(0, 55, width, 55);
        strokeWeight(2);
        stroke('#000000');
        line(0, 60, width, 60);
        strokeWeight(2);
        stroke('#000000');
        line(0, 80, width, 80);
        strokeWeight(2);
        stroke('#000000');
        line(0, 90, width, 90);
        strokeWeight(3);
        stroke('#000000');
        fill('#F4ed47');
        circle(60, 60, 80);
        fill('#000000');
        triangle(75, 80, 75, 40, 40, 60);
        fill('#F4ed47');
        stroke('#F4ed47');
        rect(47, 50, 5, 30);
        fill('#000000');
        stroke('#000000');
        rect(38, 54, 8, 13);
        strokeWeight(10);
        stroke('#000000');
        line(40, 90, 80, 30);
        image(img, width * .5 - (img.width * 0.5), 20);
        strokeWeight(3);
        stroke('#000000');
        fill('#000000');
        rect(1290, 660, 150, 70, 20);
        strokeWeight(3);
        stroke('#000000');
        fill('#F4ed47');
        rect(1300, 650, 150, 70, 20);
        var startButton = 'START';
        textSize(30);
        fill('#000000');
        text(startButton, 1325, 695);
    }
    if (isGameRunning == 1) {
        var ballXPositionOld = ballXPosition;
        var ballYPositionOld = ballYPosition;
        ballXPosition += ballSpeedX;
        ballYPosition += ballSpeedY;
        var angleDeg = Math.atan2(ballYPositionOld - ballYPosition, ballXPositionOld - ballXPosition) * 180 / Math.PI;
        var circleSize = void 0;
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
        for (var i = 0; i <= padLength; i++) {
            if (dist(ballXPosition, ballYPosition, player1XCoordinates[i], player1YCoordinates[i])
                < ballRadius + hitboxRadius) {
            }
        }
        var dx = ballXPosition - circleSize / 2;
        var dy = ballYPosition - circleSize / 2;
        if (dist(ballXPosition, ballYPosition, width / 2, height / 2) > -ballRadius + circleSize / 2) {
            var velocity = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
            var angleToCollisionPoint = Math.atan2(-dy, dx);
            var oldAngle = Math.atan2(-ballSpeedY, ballSpeedX);
            var newAngle = 2 * angleToCollisionPoint - oldAngle;
            ballSpeedX = -velocity * Math.cos(newAngle);
            ballSpeedY = velocity * Math.sin(newAngle);
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
}
function keyPressed() {
    if (keyCode === ENTER) {
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
    loads();
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
            fill('purple');
            strokeWeight(2);
            ellipse(player1XCoordinates[i], player1YCoordinates[i], 7, 7);
        }
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
//# sourceMappingURL=bundle.js.map