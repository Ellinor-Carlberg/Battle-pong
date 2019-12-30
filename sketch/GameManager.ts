/** interface GameStatus */
interface GameStatus {
    startGame(): void;
    quitGame(): void;
}
/** class GameManager */
class GameManager {
    public gameSettings: GameSettings;
    public gameArea: GameArea;
    public gameMenu: GameMenu;
    public gameMusic: GameMusic;
    public events: Events[]
    public players: Player[];
    public balls: Ball[];
    public pads: Pad[];

    constructor(gameMusic: GameMusic) {
        this.gameSettings = new GameSettings(gameMusic);
        this.gameArea = new GameArea;
        this.gameMenu = new GameMenu;
        this.gameMusic = gameMusic;
        this.events = [];
        this.players = [];
        this.balls = [];
        this.pads = [];
    }

    update(): void {
        if (isGameRunning == 1) {
            // update each player
            for (let i = 0; i < nrOfPlayers; i++) {
                this.players[i].update();
            }
            // update variable for game area size
            circleSize = this.gameArea.calculateCircleSize();
        }
    }

    draw(): void {
        // draw menu
        if (isGameRunning == 1) {
            this.gameArea.draw();
            this.drawPlayers();
        }
        this.gameMenu.draw();
        this.gameSettings.draw();
    }
    // draw each player
    drawPlayers(): void {
        if (this.players) {
            for (const player of this.players) {
                player.draw();
            }
        }
    }

    // add player to list of players
    public createPlayer(newPlayer: Player): void {
        this.players.push(newPlayer);
    }

    createBall(): void { }
    rebuildGameArea(): void { }
}