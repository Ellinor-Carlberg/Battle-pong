abstract class gameState {
    abstract setup(): void;
    abstract draw();
    abstract startGame();
    abstract createPlayer();
    abstract createGameArea();
    abstract createBall();
    abstract rebuildGameArea();
}

// extends gameState
class gameSettings {
    controlEvents(): boolean {
        return true || false;
    }
    controlSound(): boolean {
        return true || false;
    }
}
// extends gameState
class gameArea {
    private gameAreaXPosition: number; // protected?
    private gameAreaYPosition: number; // protected?
    private gameDiameter: number;

    constructor(gameAreaXPosition: number, gameAreaYPosition: number, gameDiameter: number) {
        super();
        this.gameAreaXPosition = gameAreaXPosition;
        this.gameAreaYPosition = gameAreaYPosition;
        this.gameDiameter = gameDiameter;
    }

    calculateGameArea(): void {

    }
}
// extends gameState
class Player {
    public playerID: number;
    public playerColor: string;
    public playerButtonLeft: number;
    public playerButtonRight: number;
    protected startPosition: number; // private?

    constructor(playerID: number, playerColor: string, playerButtonLeft: number, playerButtonRight: number, startPosition: number) {
        this.playerID = playerID;
        this.playerColor = playerColor;
        this.playerButtonLeft = playerButtonLeft;
        this.playerButtonRight = playerButtonRight;
        this.startPosition = startPosition;
    }

    // return number
    calculateStartPosition(): void {

    }
    // return number?
    calculatePlayerArea(): void {

    }
    hitPlayer(): void {

    }

}
// extends Player?
class Pad {
    protected padXPosition: number;
    protected playerVelocity: number;
    protected padLength: number;

    constructor(padXPosition: number, playerVelocity: number, padLength: number) {
        this.padXPosition = padXPosition;
        this.playerVelocity = playerVelocity;
        this.padLength = padLength;
    }

    handlePad(): void {

    }
    calculatePadSize(): void {

    }
    deflectBall(): void {

    }
}
// extends gameState
class Ball {
    protected ballXPosition: number;
    protected ballYPosition: number;
    protected ballSpeed: number;
    protected ballRadius: number;

    constructor(ballXPosition: number, ballYPosition: number, ballSpeed: number, ballRadius: number) {
        this.ballXPosition = ballXPosition;
        this.ballYPosition = ballYPosition;
        this.ballSpeed = ballSpeed;
        this.ballRadius = ballRadius;
    }

    handleBall(): void {

    }
    ballSize(): void {

    }
    bounceBackFromPad(): void {

    }
}
// extends gameState
class Level {
    protected levelList: Array<number>

    constructor(levelList: Array<number>) {
        this.levelList = levelList;
    }

    activateEvent(): void {

    }
    countDownToEvent(): void {

    }
    announceLevel(): void {

    }
    reverseButtons(): void {

    }
    shrinkPad(): void {

    }
    fasterBall(): void {

    }
    hideBall(): void {

    }
    moreBalls(): void {

    }
}