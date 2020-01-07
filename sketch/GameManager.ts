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
        if (!ballXPosition && !ballYPosition) {
            ballXPosition = width / 2;
            ballYPosition = height / 2;
        }
        if (!nrOfPlayers) {
            this.setDefaultNrOfPlayers();
        }

        this.gameMenu.update();

        if (isGameRunning == 1 || isGameRunning == 2) {
            // check for inactive player
            this.removeInactivePlayer();

            // update variable for game area size
            circleSize = this.gameArea.calculateCircleSize();
            for (let i = 0; i < nrOfPlayers; i++) {
                if (this.players[i].activePlayer === true) {
                    this.players[i].update();
                }
            }
        }
    }

    draw() {
        // draw menu
        if (isGameRunning == 0) {
            this.gameMenu.draw();
        }
        else if (isGameRunning == 1) {
            
            this.gameArea.draw();
            this.drawPlayers();
            for (let i = 0; i < nrOfPlayers; i++) {
                this.players[i].draw();
            }
            fill('black');
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(40);
            text("press SPACE \n to start", width/2, height/2);

            if(keyCode === 32){
                isGameRunning = 2;
                }
            } else if (isGameRunning == 2){
            this.gameArea.draw();
            this.drawPlayers();
            for (let i = 0; i < nrOfPlayers; i++) {
                this.players[i].draw();
            }
            for (const ball of this.balls) {
                ball.draw();
            }
            ballRadius = circleSize / 40;
        }
        
        this.gameSettings.draw();

    }

    removeInactivePlayer(): void {
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            if (player.activePlayer === false) {
                this.pads.splice(i, 1)
                this.players.splice(i, 1)
            }
            // if nr of players has changed, reset positions
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

    // set and add default nr of players at start
    private setDefaultNrOfPlayers() {
        nrOfPlayers = 2;
  
        for (let i = 0; i < nrOfPlayers; i++) {
            this.createPlayer();
        }
    }

    // draw each player
    drawPlayers() {
        if ((this.players && isGameRunning == 1) || (this.players && isGameRunning == 2)) {
            for (const player of this.players) {
                player.draw();
            }
        }
    }

    // add player and pad to each list
    public createPlayer() {
        let newPlayer = new Player;
        this.players.push(newPlayer);

        for (let i = 0; i < this.players.length; i++) {
            const pad = this.players[i].pad;
            this.pads.push(pad);
        }
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