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

// let menuMusic: p5.SoundFile;
let img: p5.Image;

// game not running on load
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

    // gameManager.music.menuMusic.setVolume(0.25)
    // menuMusic.stop();
    // gameManager.music.menuMusic.play()

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
    gameManager.gameMenu.draw();
}


// start game on click
function keyPressed() {
    if (keyCode === ENTER) {
        isGameRunning = 1;

        // change number of players, just for testing
        // it's supposed to recieve number from user input
        nrOfPlayers = 5;

        // create players, just for testing
        // players are supposed to be added dynamically, not manually like this
        let player = new Player('blue', 65, 90);
        gameManager.createPlayer(player);

        player = new Player('green', 76, 80);
        gameManager.createPlayer(player);

        player = new Player('purple', 51, 69);
        gameManager.createPlayer(player);

        player = new Player('yellow', 53, 54);
        gameManager.createPlayer(player);

        player = new Player('red', 57, 48);
        gameManager.createPlayer(player);

        // set some values after players are created
        // this must be fired after all players are created
        for (let i = 0; i < nrOfPlayers; i++) {
            // set playerID for each player
            const player = gameManager.players[i];
            player.playerID = i;

            // set position for current position and default position
            // currentPosition will change, startPosition won't
            if (i === 0) {
                // set for player with playerID = 0 to 0, or else playerID is not read as a number (i)
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
}
function mousePressed(): void {
    gameManager.gameMenu.update();
}
