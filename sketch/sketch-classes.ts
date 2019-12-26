
// global variables
let gameManager: GameManager;
let gameSettings: GameSettings;
let gameArea: GameArea;
// let gameMenu: GameMenu;

let players: Player[];
let pads: Pad[];
let balls: Ball[];
let menu;


let isGameRunning: number;

let circleSize: number;
let nrOfPlayers: number;

// set on load, for testing (?)
window.addEventListener('load', () => {
    isGameRunning = 0;
})

// create new game (game manager) on click
function keyPressed() {
    if (keyCode === ENTER) {
        isGameRunning = 1;

        // create new game manager and settings
        gameManager = new GameManager
        gameSettings = new GameSettings;

        // change number of players
        // recieve number from user input
        nrOfPlayers = 5;

        // create players, just for testing
        // these are supposed to be added dynamically, not manually like this
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
            if (i === 0) {
                player.pad.setCurrentPosition = 0; // set for player vid ID 0 to 0, or else playerID != number
                player.pad.setStartPosition = 0;
            }
            else {
                player.pad.setCurrentPosition = (360 / nrOfPlayers) * i;
                player.pad.setStartPosition = (360 / nrOfPlayers) * i;
            }
            // set min and max value for constrain()
            player.pad.setMinValue = player.pad.getStartPosition - (player.pad.getPadLength * 0.75) - 5;
            player.pad.setMaxValue = player.pad.getStartPosition + (player.pad.getPadLength * 1.25) - 5;
        }
    }
}