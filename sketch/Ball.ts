class Ball {
    private dx!: number;
    private dy!: number;
    private ballRadius!: number;
    private startDirection: Array<number>;
    public ballXPosition: number;
    public ballYPosition: number;
    public ballSpeedX!: number;
    public ballSpeedY!: number;

    constructor() {
        this.startDirection = [3.25, -3.25]; // Change the add start speed. Should be the same number
        this.setStartDirection();
        this.ballXPosition = width / 2;
        this.ballYPosition = height / 2;
    }

    /**
     * Updates ball size if game area size has changed.
     */
    public update(): void {
        this.setBallSize(circleSize);
    }

    /**
     * Draws and moves ball.
     * TODO: move moveBall() to update()? It only works from here right now.
     */
    public draw(): void {
        this.moveBall();
        this.drawBall();
    }

    /**
     * Draws the ball.
     */
    public drawBall(): void {
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(2);
        ellipse(this.ballXPosition, this.ballYPosition, this.ballRadius * 2, this.ballRadius * 2);
        this.handleBall();
    }

    /**
     * Randomizes ball's start direction.
     */
    public setStartDirection(): void { 
        this.ballSpeedX = this.startDirection[Math.floor(Math.random() * this.startDirection.length)];
        this.ballSpeedY = this.startDirection[Math.floor(Math.random() * this.startDirection.length)];
    }

    /**
     * Sets default ball size.
     * @param {number} diameter the diameter of game area (circle).
     */
    public setBallSize(diameter: number): void {
        this.ballRadius = diameter / 40;
    }

    /**
     * Moves the ball by adding ball speed (velocity) to ball x, y-position.
     * Updates variables used in method for ball-pad-collision.
     */
    private moveBall(): void {
        this.ballXPosition += this.ballSpeedX;
        this.ballYPosition += this.ballSpeedY;

        // update variables
        this.dx = this.ballXPosition - width / 2;
        this.dy = this.ballYPosition - height / 2;
    }

    /**
     * Checks for collision with game area border or player pads.
     */
    private handleBall(): void {
        for (const player of gameManager.players) {
            for (let i = 0; i <= player.pad.getPadLength; i++) {
                if (player.playerXCoordinates[i] && player.playerYCoordinates[i]) {
                    // bounce if ball + pad collision
                    if (dist(this.ballXPosition, this.ballYPosition, player.playerXCoordinates[i], player.playerYCoordinates[i]) < this.ballRadius + .5) {
                        //detects where on the pad it bounces (it is possible to add more detection-spots, just slice the pad in more parts)
                        if (i < player.pad.getPadLength / 3 || i > player.pad.getPadLength * 0.67) {
                            let ballAndPadCollisionPoint = 1;
                            this.bounceBackFromPad(ballAndPadCollisionPoint);
                        } else {
                            let ballAndPadCollisionPoint = 0;
                            this.bounceBackFromPad(ballAndPadCollisionPoint);
                        }
                    }
                }
                // ball is outside game area
                if (dist(this.ballXPosition, this.ballYPosition, width / 2, height / 2) > this.ballRadius + circleSize / 2) {
                    if (gameManager.players.length >= 2) {
                        this.createDistanceList();
                    }
                }
            }
        }
    }

    /**
     * Creates array of pad-to-ball distances. 
     * Fires method that checks which player lost.
     */
    private createDistanceList(): void {
        let distances: number[] = [];
        for (let i = 0; i < gameManager.players.length; i++) {
            const player = gameManager.players[i];
            distances.push(player.getDistanceToBall(this.ballXPosition, this.ballYPosition));
        }
        this.checkPlayerLoss(distances);
    }

    /**
     * Change status on player with min pad-to-ball distance and reset ball.
     * @param {Array<number>} distances uses information in array of pad-to-ball distances.
     */
    private checkPlayerLoss(distances: number[]): void {
        for (const playerObj in gameManager.players) {
            if (gameManager.players.hasOwnProperty(playerObj)) {
                if (gameManager.players[playerObj].getDistanceToBall(this.ballXPosition, this.ballYPosition) === Math.min(...distances)) {
                    gameManager.players[playerObj].changeActivePlayer();
                    this.resetBall();
                }
            }
        }
    }

    /**
     * Resets the main ball's position to center of game area.
     */
    private resetBall(): void {
        this.ballXPosition = width / 2;
        this.ballYPosition = height / 2;
        gameMode = 1;
    }

    /**
     * Makes the ball bounce upon collision with pad.
     * @param {number} ballAndPadCollisionPoint uses information on where on the pad the collision happens to change angle on bounce.
     */
    private bounceBackFromPad(ballAndPadCollisionPoint: number): void {
        if (dist(this.ballXPosition, this.ballYPosition, width / 2, height / 2) >= circleSize / 2 - 5) {
            const velocity = Math.sqrt(this.ballSpeedX * this.ballSpeedX + this.ballSpeedY * this.ballSpeedY);
            let angleToCollisionPoint = Math.atan2(-this.dy, this.dx);
            let oldAngle = Math.atan2(-this.ballSpeedY, this.ballSpeedX);
            let newAngle = 2 * angleToCollisionPoint - oldAngle;
            // Changes angle depending on where the pad was hit
            if (ballAndPadCollisionPoint == 1) {
                newAngle = newAngle - 0.3;
            } else {
                newAngle = newAngle + 0.3;
            }
            // magic happens
            this.ballSpeedX = -velocity * Math.cos(newAngle);
            this.ballSpeedY = velocity * Math.sin(newAngle);
            const vector = createVector(this.dx, this.dy);
            vector.normalize();
            const scalar = (circleSize / 2 - this.ballRadius);
            vector.mult(scalar);
            this.ballXPosition = vector.x + width / 2;
            this.ballYPosition = vector.y + height / 2;
            this.handleBall();
        }
    }
}
