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




