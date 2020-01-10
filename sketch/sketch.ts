// explanation of game modes
// gameMode = 0 = game menu rendering, game has not started
// gameMode = 1 = game area+players rendering, game has not started
// gameMode = 2 = game area+players+ball rendering, game has started

// global variables
let gameManager: GameManager;
let gameMusic: GameMusic;
let gameMode: number;
let circleSize: number;
let nrOfPlayers: number;
let headerImage: p5.Image;

window.addEventListener('load', () => {
    gameMode = 0;
})

/**
 * p5.js preload() is used to load assets such as images and sound files.
 */
function preload() {
    // load header image
    headerImage = loadImage('./assets/images/battle_pong.svg');

    // load music
    soundFormats('wav');
    gameMusic = { menuMusic: (window as any).loadSound('./assets/music/menu-music.wav') }
}

/**
 * p5.js setup() is fired after preload() has finished.
 * This function defines environmental properties, plays music and creates the Game Manager instance.
 */
function setup() {
    // size of the screen
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    fullscreen();
    angleMode(DEGREES);

    // loop music and set default volume
    gameMusic.menuMusic.setVolume(0.2);
    gameMusic.menuMusic.loop();
    
    // create new game manager instance
    gameManager = new GameManager(gameMusic);
}

/**
 * p5.js draw(), the main function that draws all the canvas elements.
 * This function fires the game manager methods that handle the game.
 */
function draw() {
    gameManager.update();
    gameManager.draw();
}

/**
 * p5.js mouseMoved() function with hover events.
 * Handles cursor symbol change on button hover.
 */
function mouseMoved(): void {
    const addPlayerButton = mouseX > (width * .5) + 190 && mouseX < (width * .5) + 290 &&
        mouseY > height * .9 && mouseY < (height * .9) + 45;
    const soundButton = dist(mouseX, mouseY, 60, 60) < 40;

    const StartGameButton = mouseX > (width * .5) - 285 && mouseX < (width * .5) - 185 &&
        mouseY > height * .9 && mouseY < (height * .9) + 50;

    if (addPlayerButton || soundButton || StartGameButton) {
        cursor('pointer');
    }
    else {
        cursor(ARROW);
    }
}

/**
 * p5.js mousePressed() function handles mouse press events.
 */
function mousePressed(): void {
    // mouse click/press events on game menu
    if (gameMode == 0 && gameManager.players.length < 8) {
        gameManager.gameMenu.handleAddPlayerButton();

        // set keys after each player is created
        for (const playerObj in gameManager.players) {
            if (gameManager.players.hasOwnProperty(playerObj)) {
                const player = gameManager.players[playerObj];
                player.setKeys();
            }
        }
    }

    // mouse click/press events on start button
    if (gameMode == 0 && mouseX > (width * .5) - 285 && mouseX < (width * .5) - 185 &&
        mouseY > height * .9 && mouseY < (height * .9) + 50) {
        clear();
        gameManager.gameSettings.startGame();
    }

    // mute music and draw line on click
    gameManager.gameSettings.update();
}

/**
 * p5.js windowResized() handles resize event.
 * Here it adjusts the canvas size on window resize.
 */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
