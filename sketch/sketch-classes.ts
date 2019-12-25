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
´
/** class Player */

/** class Pad */
class Pad {
    private playerColor: string;
    private leftKey: number;
    private rightKey: number;
    private velocity: number;
    public currentPosition!: number;
    public startPosition!: number; 
    public minConstrain!: number;
    public maxConstrain!: number;

    constructor(playerColor: string, leftKey: number, rightKey: number) {
        this.playerColor = playerColor;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.velocity = 0;
    }
    // update player position
    update(): any {
        this.calculatePlayerVelocity();
    }
    draw(): void {
        this.drawPlayer();
    }
    // draw player
    private drawPlayer(): void {
        noFill();
        stroke(0);
        strokeWeight(9);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.getPadLength);
        stroke(this.playerColor);
        strokeWeight(5);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.getPadLength);
    }
    // calculate velocity
    private calculatePlayerVelocity(): void {
        // check if key is down
        if (keyIsDown(this.leftKey)) {
            this.velocity += 2.5;
        }
        if (keyIsDown(this.rightKey)) {
            this.velocity -= 2.5;
        }

        // change position
        this.currentPosition += this.velocity;

        // add friction
        this.velocity *= 0.4;

        // constrain pad
        this.currentPosition = constrain(this.currentPosition, this.minConstrain, this.maxConstrain);
    }
    // set/get start position
    set setStartPosition(value: number) {
        this.startPosition = value;
    }
    get getStartPosition(): number {
        return this.startPosition;
    }
    // set/get current position
    set setCurrentPosition(value: number) {
        this.currentPosition = value;
    }
    get getCurrentPosition(): number {
        return this.currentPosition;
    }
    // set min/max constrain value
    set setMinValue(value: number) {
        this.minConstrain = value;
    }
    set setMaxValue(value: number) {
        this.maxConstrain = value;
    }
    // calculate default pad length
    get getPadLength(): number {
        return (360 / nrOfPlayers) / 3;
    }

    deflectBall(): void { }
}

// set on load
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
        // these are supposed to be added dynamically
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