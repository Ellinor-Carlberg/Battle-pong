"use strict";
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
var Game = (function () {
    function Game() {
        this.startGameButton = new Button(100, 100, 100, 50, "Start");
        this.isGameRunning = false;
    }
    Game.prototype.update = function () {
        this.isGameRunning = this.startGameButton.handleMousePressed();
    };
    Game.prototype.draw = function () {
        if (!this.isGameRunning) {
            this.startGameButton.draw();
        }
    };
    return Game;
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
var Pad = (function () {
    function Pad() {
        this.padXPosition = this.calculatePadXPosition();
        this.playerVelocity = this.calculatePlayerVelocity();
        this.padLength = this.calculatePadSize();
    }
    Pad.prototype.update = function () { };
    Pad.prototype.draw = function (radius) { };
    Pad.prototype.handlePad = function () {
        if (keyIsDown(UP_ARROW)) {
            this.playerVelocity -= 5;
        }
        else if (keyIsDown(DOWN_ARROW)) {
            this.playerVelocity += 5;
        }
        this.padXPosition += this.playerVelocity;
        this.playerVelocity *= 0.4;
        this.padXPosition = constrain(this.padXPosition, 0, 159);
    };
    Pad.prototype.calculatePadSize = function () { return 10; };
    Pad.prototype.calculatePlayerVelocity = function () { return 10; };
    Pad.prototype.calculatePadXPosition = function () { return 10; };
    Pad.prototype.deflectBall = function () { };
    return Pad;
}());
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
var player1Position = 0;
var player2Position = 180;
var ballSpeedX = 5;
var ballSpeedY = 5;
var ballXPosition = innerWidth / 2;
var ballYPosition = innerHeight / 2;
var padLength = 20;
var isGameRunning;
var img;
var music;
var button;
var fontAwsome;
function preload() {
    img = loadImage('./assets/images/battle_pong.svg');
}
function setup() {
    isGameRunning = 0;
    createCanvas(windowWidth, windowHeight);
    textSize(15);
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
        stroke('#999966');
        fill('#999966');
        rect((width * .5) - 350, 0, 700, height);
        strokeWeight(60);
        stroke('#999966');
        line(0, height * .2, width, height * 0.6);
        strokeWeight(140);
        stroke('#999966');
        line(0, height * .4, width, height * 0.8);
        strokeWeight(40);
        stroke('#999966');
        line(0, height * .55, width, height * 0.95);
        strokeWeight(80);
        stroke('#F4ed47');
        line(0, height * .08, width, height * 0.08);
        strokeWeight(1);
        stroke('#000000');
        line(0, height * .1, width, height * 0.1);
        strokeWeight(1);
        stroke('#000000');
        line(0, height * .04, width, height * 0.04);
        strokeWeight(3);
        stroke('#000000');
        line(0, height * .08, width, height * 0.08);
        strokeWeight(1);
        stroke('#000000');
        line(0, height * .03, width, height * 0.03);
        strokeWeight(2);
        stroke('#000000');
        line(0, height * .13, width, height * 0.13);
        image(img, width * .5 - (img.width * 0.5), height * .02);
        fill('#F4ed47');
        rect(1250, 765, 140, 40, 20);
        text('Press enter to start', 1255, 790);
    }
    if (isGameRunning == 1) {
        var circleSize = void 0;
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