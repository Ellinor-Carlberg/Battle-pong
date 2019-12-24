
let gameManager: GameManager;
let gameSettings: GameSettings;
let gameArea: GameArea;
// let gameMenu: GameMenu;
let players: Player[];
let pads: Pad[];
let balls: Ball[];
let menu;

let circleSize: number;
let nrOfPlayers: number;
let nrOfPlayers2: Player[];
let playerPosition: number;

// Make Canvas class instead of interface?
interface Canvas {
    width: number;
    height: number;

    resizeCanvas(width: number, height: number): void;
}
interface GameStatus {
    startGame(): void;
    quitGame(): void;
}
interface GameSize {
    gameRadius: number;
}
class GameManager implements GameStatus {
    // private gameSettings: GameSettings;
    private gameArea: GameArea;
    public events: Events[]
    public players: Player[];
    private balls: Ball[];
    public pads: Pad[];
    public isGameRunning: boolean;

    constructor() {
        this.gameArea = GameArea.prototype;
        this.events = [];
        this.players = [];
        this.balls = [];
        this.pads = [];
        this.isGameRunning = true;
    }

    update(): void {
        for (const player of this.players) {
            player.update();
        }
    }
    draw(radius: number): void {

    }
    // Start/Quit
    startGame(): void { }
    quitGame(): void { }
    // New game
    createGameArea(): void { }
    public createPlayer(newPlayer: Player): void {
        this.players.push(newPlayer);
    }
    public set setNrOfPlayers(activePlayers: number) {
        nrOfPlayers = activePlayers;
    }
    public get setNrOfPlayers(): number {
        return nrOfPlayers;
    }
    public get getActivePlayers(): Player[] {
        return gameManager.players;
    }
    createBall(): void { }
    rebuildGameArea(): void { }
}

/** class GameSettings 
 * 
 * Put hit Enter to Start in here?
*/
class GameSettings extends GameManager {
    // Create instance of GameManager to call for start/quit methods
    public soundVolume: number;
    public gameEvents: number[];
    public nrOfPlayers: number;

    constructor() {
        super();
        this.soundVolume = 5;
        this.gameEvents = [];
        this.nrOfPlayers = gameManager.players.length;
    }

    controlEvents(): void { }
    gameStatus(): void {
        if (1) {
            this.startGame();
        }
        else if (2) {
            this.quitGame();
        }
    }
}
class GameArea implements GameSize {
    public gameAreaXPosition: number;
    public gameAreaYPosition: number;
    public gameRadius: number;
    public circleSize: number;

    constructor(gameAreaXPosition: number, gameAreaYPosition: number) {
        this.gameAreaXPosition = gameAreaXPosition; // Do we need this?
        this.gameAreaYPosition = gameAreaYPosition; // Do we need this?
        this.gameRadius = this.calculateGameRadius(); 
        this.circleSize = this.calculateGameArea();
    }
    update(): void { }
    draw(): void { }
    calculateGameRadius() {
        return this.circleSize / 2;
    }
    calculateGameArea(): number {
        if (windowWidth >= windowHeight) {
            this.circleSize = windowHeight - 40;
        } else {
            this.circleSize = windowWidth - 40;
        }
        // let ballRadius = this.circleSize/40; Move to Ball
        return this.circleSize;
    }
}
interface PlayerPosition {
    currentPosition: number;
}
/** class Player */
class Player extends GameManager implements PlayerPosition {
    public playerID: number;
    protected activePlayer: boolean;
    protected pad: Pad;
    public currentPosition!: number;

    constructor(playerColor: string, playerButtonLeft: number, playerButtonRight: number) {
        super();
        this.activePlayer = true;
        this.pad = new Pad(playerColor, playerButtonLeft, playerButtonRight);
        this.playerID = (gameManager.players.length + 1);
    }
    update(): void {
        this.currentPosition = this.pad.calculatePlayerVelocity(this.getCurrentPosition);
        console.log(this.currentPosition);
    }
    draw(): void { }
    hitPlayer(): void { }

    public get getCurrentPosition(): number {
        return (360 / nrOfPlayers) * (1 + this.playerID);
    }
}
/** class Pad */
class Pad implements PlayerPosition {
    private velocity!: number;
    private leftKey: number;
    private rightKey: number;
    private playerColor: string;
    public padLength: number;
    public currentPosition!: number;

    constructor(color: string, leftKey: number, rightKey: number) {
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.playerColor = color;
        this.setVelocity();
        this.padLength = this.getPadLength;
    }
    update(): any {
        this.draw()
        console.log(this.padLength);
    }
    draw(): void {
        noFill();
        stroke(0);
        strokeWeight(9);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.padLength);
        stroke(this.playerColor);
        strokeWeight(5);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.padLength);
    }
    calculatePlayerVelocity(currentPosition: number): number {
        // save in Pad property
        this.currentPosition = currentPosition;

        // check if key is down
        if (keyIsDown(this.leftKey)) {
            this.velocity += 5;
        }
        if (keyIsDown(this.rightKey)) {
            this.velocity -= 5;
        }

        // update Pad position
        this.currentPosition += this.velocity;

        // add friction
        this.velocity *= 0.4;

        this.update();

        // return current position to Player
        return this.currentPosition;
    }
    deflectBall(): void { }

    // calculate default pad length
    public get getPadLength(): number {
        return ((circleSize / 2) / nrOfPlayers) / 3;
    }
    // set default velocity
    public setVelocity() {
        this.velocity = 0;
    }


}

// random testing
function loads(): any {
    gameArea = new GameArea;
    gameManager = new GameManager
    gameSettings = new GameSettings;

    let player = new Player('blue', 65, 90);
    gameManager.createPlayer(player);

    player = new Player('green', 76, 80);
    gameManager.createPlayer(player);

    player = new Player('yellow', 51, 69);
    gameManager.createPlayer(player);

    player = new Player('red', 57, 48);
    gameManager.createPlayer(player);
    nrOfPlayers = gameManager.players.length
    nrOfPlayers2 = gameManager.players

    gameManager.update()
}

/*

class Spelare {
    public pad: Pad;

    constructor (color, left, right) {

    }

}

*/
