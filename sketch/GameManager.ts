class GameManager {
    public gameSettings: GameSettings;
    public gameArea: GameArea;
    public gameMenu: GameMenu;
    public events!: Events[];
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

    /**
     * Adds default players, updates game area, ball and pad movement, removes player who has lost.
     */
    public update(): void {
        // adds 2 players if nr of players is undefined/0
        if (!nrOfPlayers) {
            this.setDefaultNrOfPlayers();
        }
        if (gameMode == 1 || gameMode == 2) {
            this.gameArea.update();
            for (const ball of this.balls) {
                if (ball != undefined) {
                    ball.update();
                }
            }
            // update active players
            for (let i = 0; i < nrOfPlayers; i++) {
                if (this.players[i].activePlayer === true) {
                    this.players[i].update();
                }
            }
            // check for inactive player
            this.removeInactivePlayer();
        }
    }


    /**
     * Draws game menu, sound button, game area, player pad, text before game starts, winner announcement and ball.
     */
    public draw(): void {
        // draw menu
        if (gameMode == 0) {
            this.gameMenu.draw();
        }
        else if (gameMode == 1) {
            this.gameArea.draw();
            this.drawPlayers();
            // draws the "release ball"-text
            fill('black');
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(40);
            text("press SPACE \n to start", width / 2, height / 2);
            // draws winner announcement
            if (this.players.length === 1) {
                this.drawWinnerAnnouncement();
            }
            // Press space to start
            if (keyIsDown(32) && this.players.length > 1) {
                gameMode = 2;
                this.handleEvents();
            }
        } else if (gameMode == 2) {
            this.gameArea.draw();
            this.drawPlayers();
            if (this.players.length > 1) {
                for (const ball of this.balls) {
                    if (ball != undefined) {
                        ball.draw();
                    }
                }
            }
        }
        // draw sound button
        this.gameSettings.draw();
    }

    /**
     * Checks if player has lost and updates properties.
     * Removes player and pad instance, resets main ball and event interval.
     * Also resets pad's default positions (and constrain values).
     */
    public removeInactivePlayer(): void {
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            if (player.activePlayer === false) {
                // remove player and pad
                this.pads.splice(i, 1);
                this.players.splice(i, 1);
                // reset ball(s) and event
                this.balls.length = 1;
                this.events.length = 0;
                gameMode = 1;
            }

            // reset pad positions when player has been removed
            if (this.players.length < nrOfPlayers) {
                nrOfPlayers--;
                this.setDefaultPositions();
            }
        }
    }

    /**
     * Sets pad's default values equally between players and sets constrain values.
     */
    public setDefaultPositions(): void {
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            if (i === 0) {
                player.pad.setCurrentPosition = 0;
                player.pad.setStartPosition = 0;
            }
            else {
                player.pad.setCurrentPosition = (360 / nrOfPlayers) * i;
                player.pad.setStartPosition = (360 / nrOfPlayers) * i;
            }
            player.setConstrainValues();
        }
    }

    /**
     * Draws winner announcement that pops up when there is only one player left.
     */
    private drawWinnerAnnouncement(): void {
        /** Draw the yellow circle*/
        strokeWeight(2)
        stroke('#000000')
        fill('#F4ed47');
        circle((width * .5), (height * .5), 500)

        /** text*/
        strokeWeight(2)
        let winnerText1 = 'CONGRATULATIONS!'
        textSize(30);
        fill('#000000');
        text(winnerText1, (width * .5), (height * .5) - 70)

        let winnerText2 = 'YOU HAVE WON'
        textSize(30);
        fill('#000000');
        text(winnerText2, (width * .5), (height * .5) - 20)

        strokeWeight(5)
        let winnerText3 = 'BATTLE PONG'
        textSize(50);
        fill('#000000');
        text(winnerText3, (width * .5), (height * .5) + 30)

        strokeWeight(5)
        let winnerText4 = 'BATTLE PONG'
        textSize(50);
        fill('#ff0000');
        text(winnerText4, (width * .5) + 5, (height * .5) + 27)

        strokeWeight(0)
        let winnerText5 = 'Refresh the page to play again'
        textSize(20);
        fill('#000000');
        text(winnerText5, (width * .5), (height * .5) + 100)
    }

    /**
     * Draws each player if game has started.
     */
    public drawPlayers(): void {
        if ((this.players && gameMode == 1) || (this.players && gameMode == 2)) {
            for (const player of this.players) {
                player.draw();
            }
        }
    }

    /**
     * Creates player by creating a player instance, adding it to list of players. 
     * After player has been created, it also adds player's pad to list of pads.
     */
    public createPlayer(): void {
        let newPlayer = new Player;
        this.players.push(newPlayer);

        for (let i = 0; i < this.players.length; i++) {
            const pad = this.players[i].pad;
            this.pads.push(pad);
        }
    }

    /**
     * Creates new ball instance and adds to list of balls.
     */
    public createBall(): void {
        let newBall = new Ball;
        this.balls.push(newBall);
    }

    /**
     * Handles game events by either adding event or reset event.
     */
    public handleEvents(): void {
        // add event if event doesn't exist or more than 1 player
        if (!this.events || this.events.length < 1 || this.players.length > 1) {
            const newEvent = new Events;
            this.events.push(newEvent);
        }
        // reset event and ball if requirements are not met
        else {
            this.events.length = 0;
            this.balls.length = 0;
        }
    }

    /**
     * Set and create default number of players.
     */
    private setDefaultNrOfPlayers() {
        nrOfPlayers = 2;
        for (let i = 0; i < nrOfPlayers; i++) {
            this.createPlayer();
        }
    }
}
