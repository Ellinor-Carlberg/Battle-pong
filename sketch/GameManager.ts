/** interface GameStatus */
interface GameStatus {
    startGame(): void;
    quitGame(): void;
}
/** class GameManager */
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
    }

    update(): void {
        // update each player
        for (let i = 0; i < nrOfPlayers; i++) {
            this.players[i].update();
        }
        // update variable for game area size
        circleSize = this.gameArea.calculateCircleSize();
    }
    draw(): void {
        // draw each player
        for (const player of this.players) {
            player.draw();
        }
    }
    // Start/Quit
    startGame(): void { }
    quitGame(): void { }
    // add player to list of players
    public createPlayer(newPlayer: Player): void {
        this.players.push(newPlayer);
    }
    createBall(): void { }
    rebuildGameArea(): void { }
}