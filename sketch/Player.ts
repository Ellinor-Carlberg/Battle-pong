class Player {
    public playerID: number = gameManager.players.length;
    public activePlayer: boolean;
    public playerColor: p5.Color;
    public pad: Pad;
    private playerButtonLeft!: number;
    private playerButtonRight!: number;
    public playerXCoordinates: number[];
    public playerYCoordinates: number[];
    public playerXArea: number[];
    public playerYArea: number[];

    constructor() {
        this.activePlayer = true;
        this.playerColor = this.getPlayerColor;
        this.playerXCoordinates = [];
        this.playerYCoordinates = [];
        this.playerXArea = [];
        this.playerYArea = [];
        this.pad = new Pad;
    }

    /**
     * Sets player keys.
     * If game has started, sets default positions, gets pad coordinates and handles player buttons.
     */
    public update(): void {
        this.setKeys();

        if (gameMode === 1 || gameMode === 2) {
            // set positions if unset
            if (this.pad.currentPosition == undefined && this.pad.startPosition == undefined) {
                gameManager.setDefaultPositions();
            }
            this.getPadCoordinates();
            this.handlePlayerButtons();
        }
    }

    /**
     * Draws player.
     */
    public draw(): void {
        this.pad.drawPlayer(this.playerColor);
    }

    /**
     * Sets player activity status to false.
     */
    public changeActivePlayer(): void {
        this.activePlayer = false;
    }

    /**
     * Calculates pad coordinates.
     */
    public getPadCoordinates(): void {
        for (let i = 0; i <= this.pad.getPadLength; i++) {
            this.playerXCoordinates[i] = (circleSize / 2) * Math.cos(((this.pad.getCurrentPosition + i) * Math.PI / 180)) + (width / 2);
            this.playerYCoordinates[i] = (circleSize / 2) * Math.sin(((this.pad.getCurrentPosition + i) * Math.PI / 180)) + (height / 2);
        }
    }

    /**
     * Calculates distance between ball and pad's constrain values.
     * @param {number} ballX x-position
     * @param {number} ballY y-position
     * @return {number} added distance values
     */
    public getDistanceToBall(ballX: number, ballY: number): number {
        let distance = dist(ballX, ballY, this.getPlayerMinCoordinates.x, this.getPlayerMinCoordinates.y) + dist(ballX, ballY, this.getPlayerMaxCoordinates.x, this.getPlayerMaxCoordinates.y);
        return distance;
    }

    /**
     * Gets pads min constrain value coordinates, used in ball-pad distance calculation.
     * @property {number} {x} the x-position of the pads min constrain value
     * @property {number} {y} the y-position of the pads min constrain value
     * @return {object} x and y coordinates of min constrain value
     */
    private get getPlayerMinCoordinates() {
        return {
            x: (circleSize / 2) * Math.cos(((this.pad.minConstrain) * Math.PI / 180)) + (width / 2),
            y: (circleSize / 2) * Math.sin(((this.pad.minConstrain) * Math.PI / 180)) + (height / 2)
        }
    }

    /**
     * Gets pads max constrain value coordinates, used in ball-pad distance calculation.
     * @property {number} {x} the x-position of the pads max constrain value
     * @property {number} {y} the y-position of the pads max constrain value
     * @return {object} x and y coordinates of max constrain value
     */
    private get getPlayerMaxCoordinates() {
        return {
            x: (circleSize / 2) * Math.cos(((this.pad.getStartPosition - 5 + (this.pad.getPadLength * 3)) * Math.PI / 180)) + (width / 2),
            y: (circleSize / 2) * Math.sin(((this.pad.getStartPosition - 5 + (this.pad.getPadLength * 3)) * Math.PI / 180)) + (height / 2)
        }
    }

    /**
     * Gets player's assigned color.
     * @return fires p5.js color function
     */
    private get getPlayerColor(): p5.Color {
        switch (this.playerID) {
            case 0:
                return color('red');
            case 1:
                return color('blue');
            case 2:
                return color('yellow');
            case 3:
                return color("#00ff00");
            case 4:
                return color("#ff00ff");
            case 5:
                return color("#ffa500");
            case 6:
                return color("#00ffff");
            case 7:
                return color("#008000");
            default:
                return color(random(0, 255), random(0, 255), random(0, 255));
        }
    }

    /**
     * Handles user key press and fires calculation of player velocity.
     */
    public handlePlayerButtons(): void {
        if (keyIsDown(this.playerButtonLeft)) {
            this.pad.calculatePlayerVelocity('left');
        }
        else if (keyIsDown(this.playerButtonRight)) {
            this.pad.calculatePlayerVelocity('right');
        }
    }

    /**
     * Sets constrain values for player pad.
     */
    public setConstrainValues(): void {
        this.pad.setMinConstrain = this.pad.getStartPosition;
        this.pad.setMaxConstrain = (this.pad.getStartPosition + (this.pad.getPadLength * 2)) - 1;
    }

    /**
     * Sets player buttons.
     */
    public setKeys(): void {
        if (!this.playerButtonRight) {
            const allKeyPairs = Object.entries(this.getKeys)[this.playerID];
            const keyPairIndex = parseInt(allKeyPairs[0])
            const keyPairObj = allKeyPairs[1];
            const keyPair = Object.entries(keyPairObj);

            for (const [key, value] of keyPair) {
                if (key === 'left' && keyPair[this.playerID] == keyPair[keyPairIndex]) {
                    this.playerButtonLeft = (<number>value);
                }
                if (key === 'right' && keyPair[this.playerID] == keyPair[keyPairIndex]) {
                    this.playerButtonRight = (<number>value);
                }
            }
        }
    }

    /**
     * Gets list of keys.
     * @property {number} {left} left key
     * @property {number} {right} right key
     * @return {Array<{}>} all player keys
     */
    private get getKeys(): Array<{}> {
        return [
            { left: DOWN_ARROW, right: UP_ARROW },
            { left: 49, right: 81 }, // 1, Q
            { left: 53, right: 54 }, // 5, 6
            { left: 76, right: 80 }, // L, P
            { left: 83, right: 88 }, // S, X
            { left: 85, right: 73 }, // U, I
            { left: 70, right: 71 }, // F, G
            { left: 78, right: 77 } // N, M
        ]
    }
}


