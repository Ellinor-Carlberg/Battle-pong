class GameManager {
    public gameSettings: GameSettings;
    public gameArea: GameArea;
    public gameMenu: GameMenu;
    public events: Events[]
    public players: Player[];
    public balls: Ball[];
    public pads: Pad[];

    constructor(gameMusic: GameMusic) {
        this.gameSettings = new GameSettings(gameMusic);
        this.gameArea = new GameArea;
        this.gameMenu = new GameMenu;
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

        if (gameMode == 1 || gameMode == 2) {
            this.gameArea.update();

            for (const ball of this.balls) {
                ball.update();
            }
            for (const event of this.events) {
                event.update();
            }
            for (let i = 0; i < nrOfPlayers; i++) {
                if (this.players[i].activePlayer === true) {
                    this.players[i].update();
                }
            }

            // check for inactive player
            this.removeInactivePlayer();

        }
    }

    draw() {
        // draw menu
        if (gameMode == 0) {
            this.gameMenu.draw();
        }
        else if (gameMode == 1) {
            
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
                gameMode = 2;
                }
            } else if (gameMode == 2){
            this.gameArea.draw();
            this.drawPlayers();
            for (let i = 0; i < nrOfPlayers; i++) {
                this.players[i].draw();
            }
            for (const ball of this.balls) {
                ball.draw();
            }
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
        if ((this.players && gameMode == 1) || (this.players && gameMode == 2)) {
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

    public createBall(): void {
        let newBall = new Ball;
        this.balls.push(newBall);
    }

    createEvent(): void {
        const newEvent = new Events;
        this.events.push(newEvent);
    }

    rebuildGameArea(): void { }
}
