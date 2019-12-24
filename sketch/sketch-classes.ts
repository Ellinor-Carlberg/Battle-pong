<<<<<<< Updated upstream
/* Add these to beginning of .js file?
function setup(): void {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    noCursor();
    fullscreen();
    angleMode(DEGREES);
    Where do we put these? VVV
    // ballSpeedX = random(ballSpeedX * -1, ballSpeedX);
    // ballSpeedY = random(ballSpeedY * -1, ballSpeedY);
} 
function draw() { background('#777b7e'); } */
=======

let gameManager: GameManager;
let gameSettings: GameSettings;
let gameArea: GameArea;
let gameMenu: GameMenu;
let players: Player[];
let pads: Pad[];
let balls: Ball[];
let menu;

let circleSize: number;
let nrOfPlayers: number;
let nrOfPlayers2: Player[];
let playerPosition: number;

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    public gameSettings: GameSettings;
    public gameArea: GameArea;
    public events: Events[]
    public players: Player[];
    public balls: Ball[];
=======
    // private gameSettings: GameSettings;
    private gameArea: GameArea;
    public events: Events[]
    public players: Player[];
    private balls: Ball[];
>>>>>>> Stashed changes
    public pads: Pad[];
    public isGameRunning: boolean;

    constructor() {
<<<<<<< Updated upstream
        this.gameSettings = new GameSettings();
        this.gameArea = new GameArea();
=======
        this.gameArea = GameArea.prototype;
>>>>>>> Stashed changes
        this.events = [];
        this.players = [];
        this.balls = [];
        this.pads = [];
        this.isGameRunning = true;
    }

<<<<<<< Updated upstream
    update(): void { }
    draw(): void { }
=======
    update(): void {
        for (const player of this.players) {
            player.update();
        }
    }
    draw(radius: number): void {

    }
>>>>>>> Stashed changes
    // Start/Quit
    startGame(): void { }
    quitGame(): void { }
    // New game
    createGameArea(): void { }
<<<<<<< Updated upstream
    createPlayer(): void { }
=======
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
>>>>>>> Stashed changes
    createBall(): void { }
    rebuildGameArea(): void { }
}
<<<<<<< Updated upstream
class GameSettings {
=======

/** class GameSettings 
 * 
 * Put hit Enter to Start in here?
*/
class GameSettings extends GameManager {
>>>>>>> Stashed changes
    // Create instance of GameManager to call for start/quit methods
    public soundVolume: number;
    public gameEvents: number[];
    public nrOfPlayers: number;

    constructor() {
<<<<<<< Updated upstream
        this.gameManager = new GameManager();
=======
        super();
>>>>>>> Stashed changes
        this.soundVolume = 5;
        this.gameEvents = [];
        this.nrOfPlayers = this.gameManager.players.length;
    }
<<<<<<< Updated upstream

    controlEvents(): void { }
=======
    gameStatus(): void {
        if (1) {
            this.startGame();
        }
        else if (2) {
            this.quitGame();
        }
    }
    controlEvents(): void { this.events; }
>>>>>>> Stashed changes
    controlSound(): void { }
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
<<<<<<< Updated upstream
class Pad {
    public padXPosition: number;
    public playerVelocity: number;
    public padLength: number;

    constructor() {
        this.padXPosition = this.calculatePadXPosition();
        this.playerVelocity = this.calculatePlayerVelocity();
        this.padLength = this.calculatePadSize();
    }
    update(): void { }
    draw(radius: number): void { }
=======
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
>>>>>>> Stashed changes

    }
    draw(): void { }
    hitPlayer(): void { }

<<<<<<< Updated upstream
        // constrain pads
        this.padXPosition = constrain(this.padXPosition, 0, 159);
        // if two players
        // Vad är ekvationen? this.padXPosition, x, y ?
        // player2Position = constrain(player2Position, 180, 339);
=======
    // calculate current position for player
    public get getCurrentPosition(): number {
        return (360 / nrOfPlayers) * (1 + this.playerID);
>>>>>>> Stashed changes
    }
}
<<<<<<< Updated upstream
class Player {
    private playerID: number;
    private playerColor: string;
    protected playerButtonLeft: number;
    protected playerButtonRight: number;
    private startPosition: number;

    constructor(playerID: number, playerColor: string, playerButtonLeft: number, playerButtonRight: number) {
        this.playerID = playerID;
        this.playerColor = playerColor;
        this.playerButtonLeft = playerButtonLeft;
        this.playerButtonRight = playerButtonRight;
        this.startPosition = this.calculateStartPosition(); // should not recieve input? instead calculate startPosition in method
    }
    update(): void { }
    draw(radius: number): void {
        // draw pad, move to class Pad?
        stroke(0, 0, 0);
        strokeWeight(9);
        // need to reach padLength variable somehow
        arc(width / 2, height / 2, this.circleSize, this.circleSize, this.startPosition, this.startPosition + padLength);
        stroke(253, 188, 180);
    }
    calculateStartPosition(): number { return 10 /* number */ } // 10 = x
    calculatePlayerArea(): number { return 10 /* number */ }
    hitPlayer(): void { }
}
class Ball {
    protected ballXPosition: number;
    protected ballYPosition: number;
    protected ballSpeed: number;
    protected ballRadius: number;

    constructor(ballXPosition: number, ballYPosition: number, ballSpeed: number, ballRadius: number) {
        this.ballXPosition = ballXPosition; // Recieve ball x,y coordinates from method?
        this.ballYPosition = ballYPosition;
        this.ballSpeed = ballSpeed;
        this.ballRadius = ballRadius;
    }
    update(): void { }
    draw(): void { }
    handleBall(): void {
        if (this.ballYPosition > height || this.ballYPosition < 0) {
            this.ballSpeed *= -1;
        } else if (this.ballXPosition > width || this.ballXPosition < 0) {
            this.ballSpeed *= -1;
        }
    }
    ballSize(): void { }
    bounceBackFromPad(): void { }
}
class Events {
    protected eventsList: Array<number>; // Number array of index nrs, or strings, or objects...
=======
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
>>>>>>> Stashed changes


}
<<<<<<< Updated upstream
=======

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
>>>>>>> Stashed changes
