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
            if (this.players[i].activePlayer === true) {
                this.players[i].update();
            }
        }

        this.gameMenu.update();

        if (isGameRunning == 1) {
            // check for inactive player
            this.removeInactivePlayer();

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

    removeInactivePlayer(): void {
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            if (player.activePlayer === false) {
                this.pads.splice(i, 1)
                this.players.splice(i, 1)

            }
            if (this.players.length < nrOfPlayers) {
                nrOfPlayers--;
                this.setDefaultPositions();
            }
        }
    }

    setDefaultPositions() {
        // if nr of players is more than 1, just for testing
        // if (this.players.length > 1) {
            for (let i = 0; i < this.players.length; i++) {
                const player = this.players[i];
                if (i === 0) {
                    // 0 is not read as number so it is set manually
                    player.pad.setCurrentPosition = 0;
                    player.pad.setStartPosition = 0;
                }
                else {
                    // position = full circle divided by nr of players, multiplied by playerID
                    // or else each player ends up at the same position
                    player.pad.setCurrentPosition = (360 / nrOfPlayers) * i;
                    player.pad.setStartPosition = (360 / nrOfPlayers) * i;
                }
                player.setConstrainValues();
            }
        // }
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