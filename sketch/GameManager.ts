/** interface GameStatus */
interface GameStatus {
    startGame(): void;
    quitGame(): void;
}
/** class GameManager */
class GameManager implements GameStatus {
    private gameSettings: GameSettings;
    private gameArea: GameArea;
    public events: Events[]
    public players: Player[];
    private balls: Ball[];
    private pads: Pad[];
    public isGameRunning: number;

    constructor() {
        this.gameSettings = new GameSettings();
        this.gameArea = GameArea.prototype;
        this.events = [];
        this.players = [];
        this.balls = [];
        this.pads = [];
        this.isGameRunning = 0;
    }

    update(): void { }
    draw(radius: number): void {

    }
    // Start/Quit
    public startGame(): void {
        this.isGameRunning = 1;
    }
    public quitGame(): void { }
    // New game
    createGameArea(): void { }
    // add new player to Player array
    public createPlayer(newPlayer: Player): void {
        this.players.push(newPlayer);
    }
    createBall(): void { }
    rebuildGameArea(): void { }
}