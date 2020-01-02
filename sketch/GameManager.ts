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

    setup() {
        //puts the angles into degrees
        angleMode(DEGREES);
        ballXPosition = width / 2;
        ballYPosition = height * .1;
    }

    update(): void {
        if (!nrOfPlayers) {
            this.setDefaultNrOfPlayers();
        }
        for (let i = 0; i < nrOfPlayers; i++) {
            this.players[i].update();
        }
        this.gameMenu.update();

        if (isGameRunning == 1) {
            // update variable for game area size
            circleSize = this.gameArea.calculateCircleSize();
        }
    }

    draw() {
        // draw menu
        this.gameMenu.draw();
        this.gameSettings.draw();

        if (isGameRunning == 1) {
            this.gameArea.draw();
            this.drawPlayers();
            for (let i = 0; i < nrOfPlayers; i++) {
                this.players[i].draw();
            }
            for (let i = 0; i < this.balls.length; i++) {
                ballRadius = circleSize / 40;
                this.balls[i].draw();
            }
        }

    }

    private setDefaultNrOfPlayers() {
        nrOfPlayers = 2;
        this.addDefaultPlayers();
    }

    private addDefaultPlayers() {
        for (let i = 0; i < nrOfPlayers; i++) {
            this.createPlayer();
        }
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
    public createPlayer() {
        let newPlayer = new Player;
        this.players.push(newPlayer);
    }

    createBall(): void {
        let newBall = new Ball;
        this.balls.push(newBall);

        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].update();
        }
    }
    rebuildGameArea(): void { }
}