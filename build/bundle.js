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
var GameArea = (function () {
    function GameArea() {
    }
    GameArea.prototype.update = function () { };
    GameArea.prototype.draw = function () { };
    GameArea.prototype.calculateCircleSize = function () {
        if (windowWidth >= windowHeight) {
            circleSize = windowHeight - 40;
        }
        else {
            circleSize = windowWidth - 40;
        }
        return circleSize;
    };
    return GameArea;
}());
var GameManager = (function () {
    function GameManager() {
        this.gameArea = new GameArea();
        this.events = [];
        this.players = [];
        this.balls = [];
        this.pads = [];
        this.isGameRunning = true;
    }
    GameManager.prototype.update = function () {
        for (var i = 0; i < nrOfPlayers; i++) {
            this.players[i].update();
        }
        circleSize = this.gameArea.calculateCircleSize();
    };
    GameManager.prototype.draw = function () {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            player.draw();
        }
    };
    GameManager.prototype.startGame = function () { };
    GameManager.prototype.quitGame = function () { };
    GameManager.prototype.createPlayer = function (newPlayer) {
        this.players.push(newPlayer);
    };
    GameManager.prototype.createBall = function () { };
    GameManager.prototype.rebuildGameArea = function () { };
    return GameManager;
}());
var img;
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameSettings = (function (_super) {
    __extends(GameSettings, _super);
    function GameSettings() {
        var _this = _super.call(this) || this;
        _this.soundVolume = 5;
        _this.gameEvents = [];
        return _this;
    }
    GameSettings.prototype.controlEvents = function () { };
    GameSettings.prototype.gameStatus = function () {
        if (1) {
            this.startGame();
        }
        else if (2) {
            this.quitGame();
        }
    };
    return GameSettings;
}(GameManager));
var Music = (function () {
    function Music() {
    }
    return Music;
}());
var Player = (function () {
    function Player(playerColor, playerButtonLeft, playerButtonRight) {
        this.activePlayer = true;
        this.pad = new Pad(playerColor, playerButtonLeft, playerButtonRight);
    }
    Player.prototype.update = function () {
        this.pad.update();
    };
    Player.prototype.draw = function () {
        this.pad.draw();
    };
    Player.prototype.hitPlayer = function () { };
    return Player;
}());
var Pad = (function () {
    function Pad(playerColor, leftKey, rightKey) {
        this.playerColor = playerColor;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.velocity = 0;
    }
    Pad.prototype.update = function () {
        this.calculatePlayerVelocity();
    };
    Pad.prototype.draw = function () {
        this.drawPlayer();
    };
    Pad.prototype.drawPlayer = function () {
        noFill();
        stroke(0);
        strokeWeight(9);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.getPadLength);
        stroke(this.playerColor);
        strokeWeight(5);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.getPadLength);
    };
    Pad.prototype.calculatePlayerVelocity = function () {
        if (keyIsDown(this.leftKey)) {
            this.velocity += 2.5;
        }
        if (keyIsDown(this.rightKey)) {
            this.velocity -= 2.5;
        }
        this.currentPosition += this.velocity;
        this.velocity *= 0.4;
        this.currentPosition = constrain(this.currentPosition, this.minConstrain, this.maxConstrain);
    };
    Object.defineProperty(Pad.prototype, "setStartPosition", {
        set: function (value) {
            this.startPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pad.prototype, "getStartPosition", {
        get: function () {
            return this.startPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pad.prototype, "setCurrentPosition", {
        set: function (value) {
            this.currentPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pad.prototype, "getCurrentPosition", {
        get: function () {
            return this.currentPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pad.prototype, "setMinValue", {
        set: function (value) {
            this.minConstrain = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pad.prototype, "setMaxValue", {
        set: function (value) {
            this.maxConstrain = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pad.prototype, "getPadLength", {
        get: function () {
            return (360 / nrOfPlayers) / 3;
        },
        enumerable: true,
        configurable: true
    });
    Pad.prototype.deflectBall = function () { };
    return Pad;
}());
var gameManager;
var gameSettings;
var gameArea;
var players;
var pads;
var balls;
var menu;
var isGameRunning;
var circleSize;
var nrOfPlayers;
window.addEventListener('load', function () {
    isGameRunning = 0;
});
function keyPressed() {
    if (keyCode === ENTER) {
        isGameRunning = 1;
        gameManager = new GameManager;
        gameSettings = new GameSettings;
        nrOfPlayers = 5;
        var player = new Player('blue', 65, 90);
        gameManager.createPlayer(player);
        player = new Player('green', 76, 80);
        gameManager.createPlayer(player);
        player = new Player('purple', 51, 69);
        gameManager.createPlayer(player);
        player = new Player('yellow', 53, 54);
        gameManager.createPlayer(player);
        player = new Player('red', 57, 48);
        gameManager.createPlayer(player);
        for (var i = 0; i < nrOfPlayers; i++) {
            var player_1 = gameManager.players[i];
            player_1.playerID = i;
            if (i === 0) {
                player_1.pad.setCurrentPosition = 0;
                player_1.pad.setStartPosition = 0;
            }
            else {
                player_1.pad.setCurrentPosition = (360 / nrOfPlayers) * i;
                player_1.pad.setStartPosition = (360 / nrOfPlayers) * i;
            }
            player_1.pad.setMinValue = player_1.pad.getStartPosition - (player_1.pad.getPadLength * 0.75) - 5;
            player_1.pad.setMaxValue = player_1.pad.getStartPosition + (player_1.pad.getPadLength * 1.25) - 5;
        }
    }
}
var player1Position = 0;
var player2Position = 180;
var ballSpeedX = 5;
var ballSpeedY = 5;
var ballXPosition = innerWidth / 2;
var ballYPosition = innerHeight / 2;
var padLength = 20;
var hitboxRadius = 7;
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
        var circleSize_1;
        if (windowWidth >= windowHeight) {
            circleSize_1 = windowHeight - 40;
        }
        else {
            circleSize_1 = windowWidth - 40;
        }
        var ballRadius = circleSize_1 / 40;
        var player1XCoordinates = [];
        var player1YCoordinates = [];
        for (var i = 0; i <= padLength; i++) {
            player1XCoordinates[i] = (circleSize_1 / 2) * Math.cos(((player1Position + i) * Math.PI / 180)) + (width / 2);
        }
        for (var i = 0; i <= padLength; i++) {
            player1YCoordinates[i] = (circleSize_1 / 2) * Math.sin(((player1Position + i) * Math.PI / 180)) + (height / 2);
        }
        for (var i = 0; i <= padLength; i++) {
            if (dist(ballXPosition, ballYPosition, player1XCoordinates[i], player1YCoordinates[i])
                < ballRadius + hitboxRadius) {
            }
        }
        var dx = ballXPosition - circleSize_1 / 2;
        var dy = ballYPosition - circleSize_1 / 2;
        if (dist(ballXPosition, ballYPosition, width / 2, height / 2) > -ballRadius + circleSize_1 / 2) {
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
        ellipse(width / 2, height / 2, circleSize_1, circleSize_1);
        stroke(0, 0, 0);
        strokeWeight(9);
        arc(width / 2, height / 2, circleSize_1, circleSize_1, player1Position, player1Position + padLength);
        stroke(255, 204, 0);
        strokeWeight(5);
        arc(width / 2, height / 2, circleSize_1, circleSize_1, player1Position, player1Position + padLength);
        stroke(0, 0, 0);
        strokeWeight(9);
        arc(width / 2, height / 2, circleSize_1, circleSize_1, player2Position, player2Position + padLength);
        stroke(253, 188, 180);
        strokeWeight(5);
        arc(width / 2, height / 2, circleSize_1, circleSize_1, player2Position, player2Position + padLength);
        handlePads();
        handleBall(player1XCoordinates, player1YCoordinates);
        gameManager.update();
        gameManager.draw();
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