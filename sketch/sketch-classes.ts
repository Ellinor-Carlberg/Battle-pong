
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
        this.gameArea = new GameArea();
        this.events = [];
        this.players = [];
        this.balls = [];
        this.pads = [];
        this.isGameRunning = true;
        this.createGameArea();
    }

    update(): void {
        for (const player of this.players) {
            player.update();
        }
    }
    draw(): void {
        for (const player of this.players) {
            player.draw()
        }
    }
    // Start/Quit
    startGame(): void { }
    quitGame(): void { }
    // New game
    createGameArea(): void {
        this.gameArea.calculateCircleSize();
    }
    public createPlayer(newPlayer: Player): void {
        this.players.push(newPlayer);
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

    constructor() {
        super();
        this.soundVolume = 5;
        this.gameEvents = [];
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
    public gameRadius: number;
    public circleSize: number;

    constructor() {
        this.gameRadius = (this.calculateCircleSize()) / 2;
        this.circleSize = this.calculateCircleSize();
    }
    update(): void { }
    draw(): void { }
    calculateGameRadius() {
        return this.circleSize / 2;
    }
    calculateCircleSize(): number {
        if (windowWidth >= windowHeight) {
            this.circleSize = windowHeight - 40;
        } else {
            this.circleSize = windowWidth - 40;
        }
        // let ballRadius = this.circleSize/40; Move to Ball
        return circleSize = this.circleSize;
    }
}
interface PlayerPosition {
    _startPosition: number;
}
/** class Player */
class Player extends GameManager {
    public playerID: number;
    protected activePlayer: boolean;
    public pad: Pad;
    public _startPosition!: number;

    constructor(playerColor: string, playerButtonLeft: number, playerButtonRight: number) {
        super();
        this.activePlayer = true;
        this.playerID = (gameManager.players.length + 1);
        this.setStartPosition = this.getStartPosition;
        this.pad = new Pad(playerColor, playerButtonLeft, playerButtonRight, this.getStartPosition);
    }
    update(): void {
        // update current position
        this.pad.update();
    }
    draw(): void {
        this.pad.draw()
    }
    hitPlayer(): void { }
    // gets start position
    public get getStartPosition(): number {
        return (360 / nrOfPlayers) * this.playerID;
    }
    // sets start position
    public set setStartPosition(value: number) {
        this._startPosition = value;
    }
}
/** class Pad */
class Pad {
    private velocity!: number;
    private playerColor: string;
    private leftKey: number;
    private rightKey: number;
    public padLength: number;
    public _currentPosition!: number;
    public _newPosition!: number;

    constructor(playerColor: string, leftKey: number, rightKey: number, previousPosition: number) {
        this.playerColor = playerColor;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.padLength = this.getPadLength;
        this.velocity = 0;
        this._currentPosition = previousPosition;
    }
    update(): any {
        this.calculatePlayerVelocity();
    }
    draw(): void {
        this.drawPlayer();
    }
    public drawPlayer(): void {
        console.log(this.velocity, this._currentPosition);

        noFill();
        stroke(0);
        strokeWeight(9);
        arc(width / 2, height / 2, circleSize, circleSize, this._currentPosition, this._currentPosition + this.padLength);
        stroke(this.playerColor);
        strokeWeight(5);
        arc(width / 2, height / 2, circleSize, circleSize, this.getCurrentPosition, this.getCurrentPosition + this.padLength);
    }
    constrainValues(): void {
        this._currentPosition = constrain(this._currentPosition,
            (360 / nrOfPlayers) + ((360 / nrOfPlayers) * 0.5),
            (360 / nrOfPlayers) + ((360 / nrOfPlayers) * 1.5));
    }
    // get current position
    public get getCurrentPosition(): number {
        return this._currentPosition;
    }
    // set current position
    public set setCurrentPosition(value: number) {
        this._currentPosition = value;
    }
    // calculate velocity
    private calculatePlayerVelocity(): void {
        // check if key is down
        if (keyIsDown(this.leftKey)) {
            this.velocity += 5;
        }
        if (keyIsDown(this.rightKey)) {
            this.velocity -= 5;
        }
        this.velocity *= 0.4;
        this._currentPosition += this.velocity;
        this.constrainValues();
    }
    deflectBall(): void { }

    // calculate default pad length
    public get getPadLength(): number {
        return ((circleSize / 2) / nrOfPlayers) / 3;
    }
}
window.addEventListener('load', () => {
    isGameRunning = 0;
})

function keyPressed() {
    if (keyCode === ENTER) {
        isGameRunning = 1;
        gameArea = new GameArea;
        gameManager = new GameManager
        gameSettings = new GameSettings;

        nrOfPlayers = 5

        // skicka in ID
        let player = new Player('blue', 65, 90);
        gameManager.createPlayer(player);

        player = new Player('green', 76, 80);
        gameManager.createPlayer(player);

        player = new Player('purple', 35, 36);
        gameManager.createPlayer(player);

        player = new Player('yellow', 51, 69);
        gameManager.createPlayer(player);

        player = new Player('red', 57, 48);
        gameManager.createPlayer(player);
    }
}