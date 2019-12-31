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
        if (!nrOfPlayers) {
            this.setDefaultNrOfPlayers();
        }

        this.gameMenu.update();

        if (isGameRunning == 1) {
            // update each player
            for (let i = 0; i < nrOfPlayers; i++) {
                this.players[i].update();
            }
            // update variable for game area size
            circleSize = this.gameArea.calculateCircleSize();
        }
    }

    draw() {
        // draw menu
        if (isGameRunning == 1) {
            this.gameArea.draw();
            this.drawPlayers();
        }
        this.gameMenu.draw();
        this.gameSettings.draw();
    }

    private setDefaultNrOfPlayers() {
        nrOfPlayers = 2;
        this.gameMenu.addDefaultPlayers();
    }

    // draw each player
    drawPlayers() {
        if (this.players && isGameRunning == 1) {
            for (const player of this.players) {
                player.draw();
            }
            
        }
    }
    // add player to list of players
    public createPlayer(newPlayer: Player) {
        this.players.push(newPlayer);
    }

    public crePla() {
        let r = random(0, 255);
        let g = random(0, 255);
        let b = random(0, 255);
        let c = color(r, g, b);
        let player = new Player(c, 65, 90);
        gameManager.createPlayer(player);
    }

    createBall(): void { }
    rebuildGameArea(): void { }
}