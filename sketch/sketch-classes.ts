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
    public gameSettings: GameSettings;
    public gameArea: GameArea;
    public events: Events[]
    public players: Player[];
    public balls: Ball[];
    public pads: Pad[];
    public isGameRunning: boolean;

    constructor() {
        this.gameSettings = new GameSettings();
        this.gameArea = new GameArea();
        this.events = [];
        this.players = [];
        this.balls = [];
        this.pads = [];
        this.isGameRunning = true;
    }

    update(): void { }
    draw(): void { }
    // Start/Quit
    startGame(): void { }
    quitGame(): void { }
    // New game
    createGameArea(): void { }
    createPlayer(): void { }
    createBall(): void { }
    rebuildGameArea(): void { }
}
class GameSettings {
    // Create instance of GameManager to call for start/quit methods
    public gameManager: GameManager;
    public soundVolume: number;
    public gameEvents: number[];
    public nrOfPlayers: number;

    constructor() {
        this.gameManager = new GameManager();
        this.soundVolume = 5;
        this.gameEvents = [];
        this.nrOfPlayers = this.gameManager.players.length;
    }

    controlEvents(): void { }
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

        // constrain pads
        this.padXPosition = constrain(this.padXPosition, 0, 159);
        // if two players
        // Vad är ekvationen? this.padXPosition, x, y ?
        // player2Position = constrain(player2Position, 180, 339);
    }
    calculatePadSize(): number { return 10 /* number */ } // return void?
    calculatePlayerVelocity(): number { return 10 /* number */ } // Added method for velocity calculation, do we need it?
    calculatePadXPosition(): number { return 10 /* number */ } // Added method for pad x position calculation
    deflectBall(): void { }
}
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
