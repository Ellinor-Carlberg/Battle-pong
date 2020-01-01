
// global variables
let gameManager: GameManager;
let gameSettings: GameSettings;
let gameArea: GameArea;
let gameMenu: GameMenu;
let gameMusic: GameMusic;
let players: Player[];
let pads: Pad[];
let balls: Ball[];

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

    soundFormats('wav');
    // load music
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

    gameMusic.menuMusic.play();
    gameManager = new GameManager(gameMusic);

    //puts the angles inte degrees rather than PI
    angleMode(DEGREES);

    //generate at random way for the ball to go
    ballSpeedX = random(ballSpeedX * -1, ballSpeedX);
    ballSpeedY = random(ballSpeedY * -1, ballSpeedY);

}

/**
 * Built in draw function in P5
 * This is a good place to call public functions of the object
 * you created in the setup function above
 */
function draw() {
    gameManager.update();
    gameManager.draw();

    // console.log(nrOfPlayers)
}

function values() {
    for (let i = 0; i < nrOfPlayers; i++) {
        // set playerID for each player
        const player = gameManager.players[i];

        // set position for current position and default position
        // currentPosition will change, startPosition won't
        if (i === 0) {
            // set for player with playerID = 0 to 0 or else playerID is not read as a number (i)
            player.pad.setCurrentPosition = 0;
            player.pad.setStartPosition = 0;
        }
        else {
            // position = full circle divided by nr of players, multiplied by playerID
            // or else each player ends up at the same position
            player.pad.setCurrentPosition = (360 / nrOfPlayers) * i;
            player.pad.setStartPosition = (360 / nrOfPlayers) * i;
        }
        // set min and max value for constrain()
        // max value is - 1 to make players not overlap each other
        player.pad.setMinValue = player.pad.getStartPosition - player.pad.getPadLength;
        player.pad.setMaxValue = (player.pad.getStartPosition + player.pad.getPadLength) - 1;
    }
}

// start game on enter key
function keyPressed() {
    if (keyCode === ENTER && isGameRunning == 0) {
        clear();
        gameManager.gameSettings.startGame();

        // change number of players, just for testing
        // it's supposed to recieve number from user input
        

        // create players, just for testing
        // players are supposed to be added dynamically, not manually like this

        // set some values after players are created
        // this must be fired after all players are created

    }
}
// mouse on click/press interactions called here
function mousePressed(): void {
    // mouse click/press events on game menu
    if (isGameRunning == 0 && gameManager.players.length < 8) {
        gameManager.gameMenu.handleAddPlayerButton();

        for (const playerObj in gameManager.players) {
            if (gameManager.players.hasOwnProperty(playerObj)) {
                const player = gameManager.players[playerObj];
                player.setKeys();
            }
        }
    }
    // mouse click/press events in game area
    else if (isGameRunning == 1) {
        
    }

    // mute music and draw line on click
    gameManager.gameSettings.update();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}