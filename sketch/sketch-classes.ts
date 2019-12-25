
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
let playerPosition: number;

// Make Canvas class instead of interface?
/** interface Canvas */
interface Canvas {
    width: number;
    height: number;

    resizeCanvas(width: number, height: number): void;
}
/** interface GameStatus */
interface GameStatus {
    startGame(): void;
    quitGame(): void;
}
/** interface GameSize */
interface GameSize {
    gameRadius: number;
}
/** class GameManager */
class GameManager implements GameStatus {
    private gameSettings: GameSettings;
    private gameArea: GameArea;
    public events: Events[]
    public players: Player[];
    private balls: Ball[];
    private pads: Pad[];
    public isGameRunning: boolean;

    constructor() {
        this.gameSettings = new GameSettings();
        this.gameArea = GameArea.prototype;
        this.events = [];
        this.players = [];
        this.balls = [];
        this.pads = [];
        this.isGameRunning = true;
    }

    update(): void { }
    draw(radius: number): void {

    }
    // Start/Quit
    public startGame(): void {
        this.isGameRunning = true;
    }
    public quitGame(): void { }
    // New game
    createGameArea(): void { }
    public createPlayer(newPlayer: Player): void {
        this.players.push(newPlayer);
    }
    createBall(): void { }
    private rebuildGameArea(): void { }
}

/** class GameSettings 
 * 
 * Put hit Enter to Start in here?
*/
class GameSettings {
    // Create instance of GameManager to call for start/quit methods
    public gameManager: GameManager;
    public soundVolume: number;
    public gameEvents: number[];

    constructor() {
        this.gameManager = GameManager.prototype;
        this.soundVolume = 5;
        this.gameEvents = [];
    }
    gameStatus(): void {
        if (1) {
            this.gameManager.startGame();
        }
        else if (2) {
            this.gameManager.quitGame();
        }
    }
    controlEvents(): void { this.gameManager.events; }
    controlSound(): void { }
}
/** class GameArea 
 * not sure what to do here
*/
class GameArea implements GameSize {
    public gameRadius: number;

    constructor() {
        this.gameRadius = this.calculateGameArea();
    }
    update(): void { }
    draw(): void { }

    calculateGameArea(): number {
        if (windowWidth >= windowHeight) {
            circleSize = windowHeight - 40;
        } else {
            circleSize = windowWidth - 40;
        }
        // let ballRadius = this.circleSize/40; Move to Ball
        return circleSize;
    }
}
/** class Pad */
class Pad {
    public padXPosition: number;
    public playerVelocity: number;
    public padLength: number = 20;

    constructor() {
        this.padXPosition = this.calculatePadXPosition();
        this.playerVelocity = this.calculatePlayerVelocity();
    }
    update(): void { }
    draw(radius: number): void {
        radius;
    }

    handlePad(): void {
        if (keyIsDown(UP_ARROW)) {
            // move up

            this.playerVelocity -= 5;
        } else if (keyIsDown(DOWN_ARROW)) {
            // move down

            this.playerVelocity += 5;
        }

        // change position
        this.padXPosition += this.playerVelocity;

        // friction
        this.playerVelocity *= 0.4;

        // constrain pads. Constrain in createPlayer instead?
        this.padXPosition = constrain(this.padXPosition, 0, 159);
        // if two players
    }
    calculatePadSize(): number { return 10 /* number */ } // return void?
    calculatePlayerVelocity(): number { return 10 /* number */ } // Added method for velocity calculation, do we need it?
    calculatePadXPosition(): number { return 10 /* number */ } // Added method for pad x position calculation
    deflectBall(): void { }
}
/** class Player */
class Player {
    // private playerID: number; You can access playerID from array index +1
    private playerColor: string;
    protected playerButtonLeft: number;
    protected playerButtonRight: number;

    constructor(playerColor: string, playerButtonLeft: number, playerButtonRight: number) {
        this.playerColor = playerColor;
        this.playerButtonLeft = playerButtonLeft;
        this.playerButtonRight = playerButtonRight;
    }
    update(): void { }
    // draw each player, Oskars code
    draw(radius: number): void {
        stroke(0, 0, 0);
        strokeWeight(9);

        arc(width / 2, height / 2, circleSize, circleSize, player1Position, player1Position + padLength);
        stroke(255, 204, 0);
        strokeWeight(5);
        arc(width / 2, height / 2, circleSize, circleSize, player1Position, player1Position + padLength);
        stroke(50, 188, 180);
    }
    // draw out each player equally
    public calculateStartPosition(index: number): number {

        if (index === 0) {
            let position: number;
            position = 360 / gameManager.players.length;
            noFill();
            stroke(0);
            strokeWeight(9);
            arc(width / 2, height / 2, circleSize, circleSize, position, position + padLength);
            stroke(150, 75, 23);
            strokeWeight(5);
            arc(width / 2, height / 2, circleSize, circleSize, position, position + padLength);
            return position;
        }
        else {
            let position: number;
            position = 360 / gameManager.players.length;
            position = position * (index + 1);
            noFill();
            stroke(0);
            strokeWeight(9);
            arc(width / 2, height / 2, circleSize, circleSize, position, position + padLength);
            stroke(20, 49, 150);
            strokeWeight(5);
            arc(width / 2, height / 2, circleSize, circleSize, position, position + padLength);
            return position;
        }
    }
    calculatePlayerArea(): number { return 10 /* number */ }
    hitPlayer(): void { }
}
/** class Ball
 * 
 * ball stuff ...
 */
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
    draw(): void {
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(2);
        ellipse(this.ballXPosition, this.ballYPosition, this.ballRadius * 2, this.ballRadius * 2);
    }
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
/** class Events */
class Events {
    protected eventsList: Array<number>; // Number array of index nrs, or strings, or objects...

    constructor() {
        this.eventsList = GameSettings.prototype.gameEvents;
    }
    update(): void { }
    draw(): void { }

    announceEvent(): void { }
    activateEvent(): void { }
    countDownToEvent(): void { }
    // Events
    reverseButtons(): void { }
    shrinkPad(): void { }
    fasterBall(): void { }
    hideBall(): void { }
    moreBalls(): void { }
}
// random testing VVV
function loads(): any {
    gameArea = new GameArea;
    gameManager = new GameManager
    gameSettings = new GameSettings;
    let veloc: number = 0;

    if (keyIsDown(87)) {
        // move up

        veloc -= 5;
    } else if (keyIsDown(83)) {
        // move down

        veloc += 5;
    }

    // player two controls
    if (keyIsDown(UP_ARROW)) {
        // move up

        veloc -= 5;
    } else if (keyIsDown(DOWN_ARROW)) {
        // move down

        veloc += 5;
    }


    let player = new Player('blue', 87, 88);
    gameManager.createPlayer(player)
    player = new Player('red', 87, 88);
    gameManager.createPlayer(player)
    let player = new Player('blue', 87, 88);
    gameManager.createPlayer(player)
    player = new Player('red', 87, 88);
    gameManager.createPlayer(player)
    let player = new Player('blue', 87, 88);
    gameManager.createPlayer(player)
    player = new Player('red', 87, 88);
    gameManager.createPlayer(player)


    if (gameManager.players.length) {
        for (let i = 0; i < gameManager.players.length; i++) {
            if (player.calculateStartPosition(i) == -1) {
                return false;
            } else {
                playerPosition = gameManager.players[i].calculateStartPosition(i)
            
                let x: number
                x = 360 / gameManager.players.length
                let y: number
                y = x
                let min: number
                min = x - (y / 2)
                let max: number
                max = x + (y / 2)
                playerPosition = constrain(playerPosition, min, max)
            }
        }
    }
    playerPosition += veloc;
    
    // change position
    
    // friction
    veloc *= 0.4;

    // constrain pads
    playerPosition = constrain(playerPosition, 0, 159);
}