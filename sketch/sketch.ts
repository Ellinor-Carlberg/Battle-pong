// global variables
let gameManager: GameManager;
let gameSettings: GameSettings;
let gameArea: GameArea;
let gameMenu: GameMenu;
let gameMusic: GameMusic;
let players: Player[];
let pads: Pad[];
let balls: Ball[];

// ball stuff
let ballXPosition: number;
let ballYPosition: number;
let padLength = 20;
let ballRadius: number;

// etc
let isGameRunning: number;
let circleSize: number;
let nrOfPlayers: number;
let img: p5.Image;

window.addEventListener('load', () => {
    isGameRunning = 0;
})

/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
    img = loadImage('./assets/images/battle_pong.svg');

    // load music
    soundFormats('wav');
    gameMusic = { menuMusic: (window as any).loadSound('./assets/music/menu-music.wav') }
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */
function setup() {
    //size of the screen
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    fullscreen();

    // play menu music on page load
    gameMusic.menuMusic.play();
    // create new game manager instance
    gameManager = new GameManager(gameMusic);
    gameManager.setup();
}

/**
 * Built in draw function in P5
 * This is a good place to call public functions of the object
 * you created in the setup function above
 */
function draw() {
    gameManager.update();
    gameManager.draw();
}

// start game on enter key
function keyPressed(): void {
    if (keyCode === ENTER && isGameRunning == 0) {
        clear();
        gameManager.gameSettings.startGame();
        gameManager.createBall();
    }
}

// hover event
function mouseMoved(): void {
    const addPlayerButton = mouseX > (width * .5) + 190 && mouseX < (width * .5) + 290 &&
        mouseY > height * .9 && mouseY < (height * .9) + 45;
    const soundButton = dist(mouseX, mouseY, 60, 60) < 40;

    if (addPlayerButton || soundButton) {
        cursor('pointer');
    }
    else {
        cursor(ARROW);
    }
}

// mouse on click/press interactions called here
function mousePressed(): void {
    // mouse click/press events on game menu
    if (isGameRunning == 0 && gameManager.players.length < 8) {
        gameManager.gameMenu.handleAddPlayerButton();

        // set keys after each player is created
        // not the prettiest to have this here...
        for (const playerObj in gameManager.players) {
            if (gameManager.players.hasOwnProperty(playerObj)) {
                const player = gameManager.players[playerObj];
                player.setKeys();
            }
        }
    }
    // etc mouse click/press events in game area, not player buttons
    else if (isGameRunning == 1) {

    }

    // mute music and draw line on click
    gameManager.gameSettings.update();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
