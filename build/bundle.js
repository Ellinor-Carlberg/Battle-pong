"use strict";
var Ball = (function () {
    function Ball() {
        this.startDirection = [3.25, -3.25];
        this.setStartDirection();
        this.ballXPosition = width / 2;
        this.ballYPosition = height / 2;
    }
    Ball.prototype.update = function () {
        this.setBallSize(circleSize);
    };
    Ball.prototype.draw = function () {
        this.moveBall();
        this.drawBall();
    };
    Ball.prototype.drawBall = function () {
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(2);
        ellipse(this.ballXPosition, this.ballYPosition, this.ballRadius * 2, this.ballRadius * 2);
        this.handleBall();
    };
    Ball.prototype.setStartDirection = function () {
        this.ballSpeedX = this.startDirection[Math.floor(Math.random() * this.startDirection.length)];
        this.ballSpeedY = this.startDirection[Math.floor(Math.random() * this.startDirection.length)];
    };
    Ball.prototype.setBallSize = function (diameter) {
        this.ballRadius = diameter / 40;
    };
    Ball.prototype.moveBall = function () {
        this.ballXPosition += this.ballSpeedX;
        this.ballYPosition += this.ballSpeedY;
        this.dx = this.ballXPosition - width / 2;
        this.dy = this.ballYPosition - height / 2;
    };
    Ball.prototype.handleBall = function () {
        for (var _i = 0, _a = gameManager.players; _i < _a.length; _i++) {
            var player = _a[_i];
            for (var i = 0; i <= player.pad.getPadLength; i++) {
                if (player.playerXCoordinates[i] && player.playerYCoordinates[i]) {
                    if (dist(this.ballXPosition, this.ballYPosition, player.playerXCoordinates[i], player.playerYCoordinates[i]) < this.ballRadius + .5) {
                        if (i < player.pad.getPadLength / 3 || i > player.pad.getPadLength * 0.67) {
                            var ballAndPadCollisionPoint = 1;
                            this.bounceBackFromPad(ballAndPadCollisionPoint);
                        }
                        else {
                            var ballAndPadCollisionPoint = 0;
                            this.bounceBackFromPad(ballAndPadCollisionPoint);
                        }
                    }
                }
                if (dist(this.ballXPosition, this.ballYPosition, width / 2, height / 2) > this.ballRadius + circleSize / 2) {
                    if (gameManager.players.length >= 2) {
                        this.createDistanceList();
                    }
                }
            }
        }
    };
    Ball.prototype.createDistanceList = function () {
        var distances = [];
        for (var i = 0; i < gameManager.players.length; i++) {
            var player = gameManager.players[i];
            distances.push(player.getDistanceToBall(this.ballXPosition, this.ballYPosition));
        }
        this.checkPlayerLoss(distances);
    };
    Ball.prototype.checkPlayerLoss = function (distances) {
        for (var playerObj in gameManager.players) {
            if (gameManager.players.hasOwnProperty(playerObj)) {
                if (gameManager.players[playerObj].getDistanceToBall(this.ballXPosition, this.ballYPosition) === Math.min.apply(Math, distances)) {
                    gameManager.players[playerObj].changeActivePlayer();
                    this.resetBall();
                }
            }
        }
    };
    Ball.prototype.resetBall = function () {
        this.ballXPosition = width / 2;
        this.ballYPosition = height / 2;
        gameMode = 1;
    };
    Ball.prototype.bounceBackFromPad = function (ballAndPadCollisionPoint) {
        if (dist(this.ballXPosition, this.ballYPosition, width / 2, height / 2) >= circleSize / 2 - 5) {
            var velocity = Math.sqrt(this.ballSpeedX * this.ballSpeedX + this.ballSpeedY * this.ballSpeedY);
            var angleToCollisionPoint = Math.atan2(-this.dy, this.dx);
            var oldAngle = Math.atan2(-this.ballSpeedY, this.ballSpeedX);
            var newAngle = 2 * angleToCollisionPoint - oldAngle;
            if (ballAndPadCollisionPoint == 1) {
                newAngle = newAngle - 0.3;
            }
            else {
                newAngle = newAngle + 0.3;
            }
            this.ballSpeedX = -velocity * Math.cos(newAngle);
            this.ballSpeedY = velocity * Math.sin(newAngle);
            var vector = createVector(this.dx, this.dy);
            vector.normalize();
            var scalar = (circleSize / 2 - this.ballRadius);
            vector.mult(scalar);
            this.ballXPosition = vector.x + width / 2;
            this.ballYPosition = vector.y + height / 2;
            this.handleBall();
        }
    };
    return Ball;
}());
var Events = (function () {
    function Events() {
        this.setEventInterval();
    }
    Events.prototype.setEventInterval = function () {
        var _this = this;
        if (gameManager.players != undefined) {
            if (gameManager.balls.length < 10 && gameMode === 2) {
                var ballSpawnInterval_1 = setInterval(function () {
                    _this.addBalls(ballSpawnInterval_1);
                }, 35000);
            }
        }
    };
    Events.prototype.addBalls = function (interval) {
        gameManager.createBall();
        if (gameManager.balls.length == 10 || gameMode === 1) {
            gameManager.balls.length = 1;
            gameManager.events.length = 0;
            clearInterval(interval);
        }
    };
    return Events;
}());
var GameArea = (function () {
    function GameArea() {
    }
    GameArea.prototype.update = function () {
        circleSize = this.calculateCircleSize();
    };
    GameArea.prototype.draw = function () {
        this.drawDefaultArea();
    };
    GameArea.prototype.calculateCircleSize = function () {
        if (windowWidth >= windowHeight) {
            return windowHeight - 40;
        }
        else {
            return windowWidth - 40;
        }
    };
    GameArea.prototype.drawDefaultArea = function () {
        background('#777b7e');
        noFill();
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(width / 2, height / 2, circleSize, circleSize);
    };
    return GameArea;
}());
var GameManager = (function () {
    function GameManager(gameMusic) {
        this.gameSettings = new GameSettings(gameMusic);
        this.gameArea = new GameArea;
        this.gameMenu = new GameMenu;
        this.events = [];
        this.players = [];
        this.balls = [];
        this.pads = [];
    }
    GameManager.prototype.update = function () {
        if (!nrOfPlayers) {
            this.setDefaultNrOfPlayers();
        }
        if (gameMode == 1 || gameMode == 2) {
            this.gameArea.update();
            for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
                var ball = _a[_i];
                if (ball != undefined) {
                    ball.update();
                }
            }
            for (var i = 0; i < nrOfPlayers; i++) {
                if (this.players[i].activePlayer === true) {
                    this.players[i].update();
                }
            }
            this.removeInactivePlayer();
        }
    };
    GameManager.prototype.draw = function () {
        if (gameMode == 0) {
            this.gameMenu.draw();
        }
        else if (gameMode == 1) {
            this.gameArea.draw();
            this.drawPlayers();
            fill('black');
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(40);
            text("press SPACE \n to start", width / 2, height / 2);
            if (this.players.length === 1) {
                this.drawWinnerAnnouncement();
            }
            if (keyIsDown(32) && this.players.length > 1) {
                gameMode = 2;
                this.handleEvents();
            }
        }
        else if (gameMode == 2) {
            this.gameArea.draw();
            this.drawPlayers();
            if (this.players.length > 1) {
                for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
                    var ball = _a[_i];
                    if (ball != undefined) {
                        ball.draw();
                    }
                }
            }
        }
        this.gameSettings.draw();
    };
    GameManager.prototype.removeInactivePlayer = function () {
        for (var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            if (player.activePlayer === false) {
                this.pads.splice(i, 1);
                this.players.splice(i, 1);
                this.balls.length = 1;
                this.events.length = 0;
                gameMode = 1;
            }
            if (this.players.length < nrOfPlayers) {
                nrOfPlayers--;
                this.setDefaultPositions();
            }
        }
    };
    GameManager.prototype.setDefaultPositions = function () {
        for (var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            if (i === 0) {
                player.pad.setCurrentPosition = 0;
                player.pad.setStartPosition = 0;
            }
            else {
                player.pad.setCurrentPosition = (360 / nrOfPlayers) * i;
                player.pad.setStartPosition = (360 / nrOfPlayers) * i;
            }
            player.setConstrainValues();
        }
    };
    GameManager.prototype.drawWinnerAnnouncement = function () {
        strokeWeight(2);
        stroke('#000000');
        fill('#F4ed47');
        circle((width * .5), (height * .5), 500);
        strokeWeight(2);
        var winnerText1 = 'CONGRATULATIONS!';
        textSize(30);
        fill('#000000');
        text(winnerText1, (width * .5), (height * .5) - 70);
        var winnerText2 = 'YOU HAVE WON';
        textSize(30);
        fill('#000000');
        text(winnerText2, (width * .5), (height * .5) - 20);
        strokeWeight(5);
        var winnerText3 = 'BATTLE PONG';
        textSize(50);
        fill('#000000');
        text(winnerText3, (width * .5), (height * .5) + 30);
        strokeWeight(5);
        var winnerText4 = 'BATTLE PONG';
        textSize(50);
        fill('#ff0000');
        text(winnerText4, (width * .5) + 5, (height * .5) + 27);
        strokeWeight(0);
        var winnerText5 = 'Refresh the page to play again';
        textSize(20);
        fill('#000000');
        text(winnerText5, (width * .5), (height * .5) + 100);
    };
    GameManager.prototype.drawPlayers = function () {
        if ((this.players && gameMode == 1) || (this.players && gameMode == 2)) {
            for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
                var player = _a[_i];
                player.draw();
            }
        }
    };
    GameManager.prototype.createPlayer = function () {
        var newPlayer = new Player;
        this.players.push(newPlayer);
        for (var i = 0; i < this.players.length; i++) {
            var pad = this.players[i].pad;
            this.pads.push(pad);
        }
    };
    GameManager.prototype.createBall = function () {
        var newBall = new Ball;
        this.balls.push(newBall);
    };
    GameManager.prototype.handleEvents = function () {
        if (!this.events || this.events.length < 1 || this.players.length > 1) {
            var newEvent = new Events;
            this.events.push(newEvent);
        }
        else {
            this.events.length = 0;
            this.balls.length = 0;
        }
    };
    GameManager.prototype.setDefaultNrOfPlayers = function () {
        nrOfPlayers = 2;
        for (var i = 0; i < nrOfPlayers; i++) {
            this.createPlayer();
        }
    };
    return GameManager;
}());
var GameMenu = (function () {
    function GameMenu() {
    }
    GameMenu.prototype.draw = function () {
        this.drawMenu();
        this.drawAddPlayerButton();
        this.drawNewPlayer();
        this.drawStartGameButton();
    };
    GameMenu.prototype.handleAddPlayerButton = function () {
        if (mouseX > (width * .5) + 190 && mouseX < (width * .5) + 290 &&
            mouseY > height * .9 && mouseY < (height * .9) + 45) {
            if (gameManager.players.length < 8) {
                nrOfPlayers++;
                gameManager.createPlayer();
            }
        }
    };
    GameMenu.prototype.drawAddPlayerButton = function () {
        strokeWeight(3);
        stroke('#000000');
        fill('#000000');
        rect((width * .5) + 195, height * .91, 100, 45, 15);
        strokeWeight(3);
        stroke('#000000');
        fill('#ffffff');
        rect((width * .5) + 190, height * .9, 100, 45, 15);
        var s = '+';
        textSize(30);
        fill('#000000');
        text(s, (width * .5) + 230, (height * .9) + 30);
    };
    GameMenu.prototype.drawNewPlayer = function () {
        for (var playerObj in gameManager.players) {
            var player = gameManager.players[playerObj];
            strokeWeight(3);
            stroke('#000000');
            fill(player.playerColor);
            rect((width * .5) - 300, 200 + 60 * (player.playerID), 55, 45, 15);
            textSize(30);
            fill('#000000');
            text('Player ' + (player.playerID + 1), (width * .5) - 200, 232 + 60 * (player.playerID));
            strokeWeight(3);
            stroke('#000000');
            fill('#ffffff');
            rect((width * .5) + 180, 200 + 60 * (player.playerID), 50, 45, 15);
            strokeWeight(3);
            stroke('#000000');
            fill('#ffffff');
            rect((width * .5) + 250, 200 + 60 * (player.playerID), 50, 45, 15);
            this.drawKeys(player.playerID);
        }
    };
    GameMenu.prototype.drawKeys = function (playerID) {
        switch (playerID) {
            case 0:
                fill('#000000');
                triangle((width * .5) + 195, 230, (width * .5) + 215, 230, (width * .5) + 205, 210);
                fill('#000000');
                triangle((width * .5) + 265, 212, (width * .5) + 285, 212, (width * .5) + 275, 232);
                break;
            case 1:
                var p2LeftKey = '1';
                textSize(30);
                fill('#000000');
                text(p2LeftKey, (width * .5) + 197, 292);
                var p2RightKey = 'Q';
                textSize(30);
                fill('#000000');
                text(p2RightKey, (width * .5) + 264, 292);
                break;
            case 2:
                var p3LeftKey = '5';
                textSize(30);
                fill('#000000');
                text(p3LeftKey, (width * .5) + 197, 353);
                var p3RightKey = '6';
                textSize(30);
                fill('#000000');
                text(p3RightKey, (width * .5) + 267, 353);
                break;
            case 3:
                var p4LeftKey = 'L';
                textSize(30);
                fill('#000000');
                text(p4LeftKey, (width * .5) + 198, 412);
                var p4RightKey = 'P';
                textSize(30);
                fill('#000000');
                text(p4RightKey, (width * .5) + 267, 412);
                break;
            case 4:
                var p5LeftKey = 'S';
                textSize(30);
                fill('#000000');
                text(p5LeftKey, (width * .5) + 195, 473);
                var p5RightKey = 'X';
                textSize(30);
                fill('#000000');
                text(p5RightKey, (width * .5) + 265, 473);
                break;
            case 5:
                var p6LeftKey = 'U';
                textSize(30);
                fill('#000000');
                text(p6LeftKey, (width * .5) + 195, 532);
                var p6RightKey = 'I';
                textSize(30);
                fill('#000000');
                text(p6RightKey, (width * .5) + 271, 532);
                break;
            case 6:
                var p7LeftKey = 'F';
                textSize(30);
                fill('#000000');
                text(p7LeftKey, (width * .5) + 195, 592);
                var p7RightKey = 'G';
                textSize(30);
                fill('#000000');
                text(p7RightKey, (width * .5) + 264, 592);
                break;
            case 7:
                var p8LeftKey = 'N';
                textSize(30);
                fill('#000000');
                text(p8LeftKey, (width * .5) + 195, 652);
                var p8RightKey = 'M';
                textSize(30);
                fill('#000000');
                text(p8RightKey, (width * .5) + 264, 652);
                break;
        }
    };
    GameMenu.prototype.drawStartGameButton = function () {
        strokeWeight(3);
        stroke('#000000');
        fill('#000000');
        rect((width * .5) - 280, height * .91, 100, 45, 15);
        strokeWeight(3);
        stroke('#000000');
        fill('#F4ed47');
        rect((width * .5) - 285, height * .9, 100, 45, 15);
        var startButton = 'START';
        textSize(28);
        fill('#000000');
        text(startButton, (width * .48) - 250, (height * .897) + 35);
    };
    GameMenu.prototype.drawMenu = function () {
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
        image(headerImage, width * .5 - (headerImage.width * 0.5), 20);
    };
    return GameMenu;
}());
var GameSettings = (function () {
    function GameSettings(gameMusic) {
        this.mutedMusic = false;
        this.gameMusic = gameMusic;
    }
    GameSettings.prototype.update = function () {
        this.handleSoundButton();
        this.controlSound();
    };
    GameSettings.prototype.draw = function () {
        this.drawSoundButton();
    };
    Object.defineProperty(GameSettings.prototype, "setSoundVolume", {
        set: function (value) {
            this.gameMusic.menuMusic.setVolume(value);
        },
        enumerable: true,
        configurable: true
    });
    GameSettings.prototype.controlSound = function () {
        if (this.mutedMusic === true) {
            this.setSoundVolume = 0;
        }
        else {
            this.setSoundVolume = 0.2;
        }
    };
    GameSettings.prototype.drawSoundButton = function () {
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
        if (this.mutedMusic === true) {
            strokeWeight(10);
            stroke('#000000');
            line(40, 90, 80, 30);
        }
    };
    GameSettings.prototype.handleSoundButton = function () {
        if (dist(mouseX, mouseY, 60, 60) < 40) {
            if (this.mutedMusic === false) {
                this.mutedMusic = true;
            }
            else if (this.mutedMusic === true) {
                this.mutedMusic = false;
            }
        }
    };
    GameSettings.prototype.startGame = function () {
        gameMode = 1;
        gameManager.createBall();
    };
    return GameSettings;
}());
var Player = (function () {
    function Player() {
        this.playerID = gameManager.players.length;
        this.activePlayer = true;
        this.playerColor = this.getPlayerColor;
        this.playerXCoordinates = [];
        this.playerYCoordinates = [];
        this.playerXArea = [];
        this.playerYArea = [];
        this.pad = new Pad;
    }
    Player.prototype.update = function () {
        this.setKeys();
        if (gameMode === 1 || gameMode === 2) {
            if (this.pad.currentPosition == undefined && this.pad.startPosition == undefined) {
                gameManager.setDefaultPositions();
            }
            this.getPadCoordinates();
            this.handlePlayerButtons();
        }
    };
    Player.prototype.draw = function () {
        this.pad.drawPlayer(this.playerColor);
    };
    Player.prototype.changeActivePlayer = function () {
        this.activePlayer = false;
    };
    Player.prototype.getPadCoordinates = function () {
        for (var i = 0; i <= this.pad.getPadLength; i++) {
            this.playerXCoordinates[i] = (circleSize / 2) * Math.cos(((this.pad.getCurrentPosition + i) * Math.PI / 180)) + (width / 2);
            this.playerYCoordinates[i] = (circleSize / 2) * Math.sin(((this.pad.getCurrentPosition + i) * Math.PI / 180)) + (height / 2);
        }
    };
    Player.prototype.getDistanceToBall = function (ballX, ballY) {
        var distance = dist(ballX, ballY, this.getPlayerMinCoordinates.x, this.getPlayerMinCoordinates.y) + dist(ballX, ballY, this.getPlayerMaxCoordinates.x, this.getPlayerMaxCoordinates.y);
        return distance;
    };
    Object.defineProperty(Player.prototype, "getPlayerMinCoordinates", {
        get: function () {
            return {
                x: (circleSize / 2) * Math.cos(((this.pad.minConstrain) * Math.PI / 180)) + (width / 2),
                y: (circleSize / 2) * Math.sin(((this.pad.minConstrain) * Math.PI / 180)) + (height / 2)
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "getPlayerMaxCoordinates", {
        get: function () {
            return {
                x: (circleSize / 2) * Math.cos(((this.pad.getStartPosition - 5 + (this.pad.getPadLength * 3)) * Math.PI / 180)) + (width / 2),
                y: (circleSize / 2) * Math.sin(((this.pad.getStartPosition - 5 + (this.pad.getPadLength * 3)) * Math.PI / 180)) + (height / 2)
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "getPlayerColor", {
        get: function () {
            switch (this.playerID) {
                case 0:
                    return color('red');
                case 1:
                    return color('blue');
                case 2:
                    return color('yellow');
                case 3:
                    return color("#00ff00");
                case 4:
                    return color("#ff00ff");
                case 5:
                    return color("#ffa500");
                case 6:
                    return color("#00ffff");
                case 7:
                    return color("#008000");
                default:
                    return color(random(0, 255), random(0, 255), random(0, 255));
            }
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.handlePlayerButtons = function () {
        if (keyIsDown(this.playerButtonLeft)) {
            this.pad.calculatePlayerVelocity('left');
        }
        else if (keyIsDown(this.playerButtonRight)) {
            this.pad.calculatePlayerVelocity('right');
        }
    };
    Player.prototype.setConstrainValues = function () {
        this.pad.setMinConstrain = this.pad.getStartPosition;
        this.pad.setMaxConstrain = (this.pad.getStartPosition + (this.pad.getPadLength * 2)) - 1;
    };
    Player.prototype.setKeys = function () {
        if (!this.playerButtonRight) {
            var allKeyPairs = Object.entries(this.getKeys)[this.playerID];
            var keyPairIndex = parseInt(allKeyPairs[0]);
            var keyPairObj = allKeyPairs[1];
            var keyPair = Object.entries(keyPairObj);
            for (var _i = 0, keyPair_1 = keyPair; _i < keyPair_1.length; _i++) {
                var _a = keyPair_1[_i], key_1 = _a[0], value = _a[1];
                if (key_1 === 'left' && keyPair[this.playerID] == keyPair[keyPairIndex]) {
                    this.playerButtonLeft = value;
                }
                if (key_1 === 'right' && keyPair[this.playerID] == keyPair[keyPairIndex]) {
                    this.playerButtonRight = value;
                }
            }
        }
    };
    Object.defineProperty(Player.prototype, "getKeys", {
        get: function () {
            return [
                { left: DOWN_ARROW, right: UP_ARROW },
                { left: 49, right: 81 },
                { left: 53, right: 54 },
                { left: 76, right: 80 },
                { left: 83, right: 88 },
                { left: 85, right: 73 },
                { left: 70, right: 71 },
                { left: 78, right: 77 }
            ];
        },
        enumerable: true,
        configurable: true
    });
    return Player;
}());
var Pad = (function () {
    function Pad() {
        this.velocity = 0;
    }
    Pad.prototype.drawPlayer = function (color) {
        noFill();
        stroke(0);
        strokeWeight(9);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.getPadLength);
        stroke(color);
        strokeWeight(5);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.getPadLength);
        stroke(0);
        strokeWeight(7);
        arc(width / 2, height / 2, circleSize, circleSize, this.minConstrain, this.minConstrain + 0.01);
    };
    Pad.prototype.calculatePlayerVelocity = function (direction) {
        if (direction === 'left') {
            this.velocity += 2 / nrOfPlayers;
        }
        if (direction === 'right') {
            this.velocity -= 2 / nrOfPlayers;
        }
        this.currentPosition += this.velocity;
        this.velocity *= 0.4;
        this.currentPosition = constrain(this.currentPosition, this.minConstrain, this.maxConstrain);
    };
    Object.defineProperty(Pad.prototype, "setStartPosition", {
        set: function (position) {
            this.startPosition = position;
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
        set: function (position) {
            this.currentPosition = position;
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
    Object.defineProperty(Pad.prototype, "setMinConstrain", {
        set: function (minValue) {
            this.minConstrain = minValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pad.prototype, "setMaxConstrain", {
        set: function (maxValue) {
            this.maxConstrain = maxValue;
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
    return Pad;
}());
var gameManager;
var gameMusic;
var gameMode;
var circleSize;
var nrOfPlayers;
var headerImage;
window.addEventListener('load', function () {
    gameMode = 0;
});
function preload() {
    headerImage = loadImage('./assets/images/battle_pong.svg');
    soundFormats('wav');
    gameMusic = { menuMusic: window.loadSound('./assets/music/menu-music.wav') };
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    fullscreen();
    angleMode(DEGREES);
    gameMusic.menuMusic.setVolume(0.2);
    gameMusic.menuMusic.loop();
    gameManager = new GameManager(gameMusic);
}
function draw() {
    gameManager.update();
    gameManager.draw();
}
function mouseMoved() {
    var addPlayerButton = mouseX > (width * .5) + 190 && mouseX < (width * .5) + 290 &&
        mouseY > height * .9 && mouseY < (height * .9) + 45;
    var soundButton = dist(mouseX, mouseY, 60, 60) < 40;
    var StartGameButton = mouseX > (width * .5) - 285 && mouseX < (width * .5) - 185 &&
        mouseY > height * .9 && mouseY < (height * .9) + 50;
    if (addPlayerButton || soundButton || StartGameButton) {
        cursor('pointer');
    }
    else {
        cursor(ARROW);
    }
}
function mousePressed() {
    if (gameMode == 0 && gameManager.players.length < 8) {
        gameManager.gameMenu.handleAddPlayerButton();
        for (var playerObj in gameManager.players) {
            if (gameManager.players.hasOwnProperty(playerObj)) {
                var player = gameManager.players[playerObj];
                player.setKeys();
            }
        }
    }
    if (gameMode == 0 && mouseX > (width * .5) - 285 && mouseX < (width * .5) - 185 &&
        mouseY > height * .9 && mouseY < (height * .9) + 50) {
        clear();
        gameManager.gameSettings.startGame();
    }
    gameManager.gameSettings.update();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
//# sourceMappingURL=bundle.js.map