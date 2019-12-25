

function preload2() { }

function setup2() {
    gameManager = new GameManager();
    // gameArea = new GameArea();
    // players = new Player();
    // pads = new Pad();
    // ball = new Ball();

    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    noCursor();
    fullscreen();
    angleMode(DEGREES);

    ballSpeedX = random(ballSpeedX * -1, ballSpeedX);
    ballSpeedY = random(ballSpeedY * -1, ballSpeedY);
}

function draw2() { }

function menu2() { 
    textAlign(CENTER, TOP);
    text("Battle Pong")
}