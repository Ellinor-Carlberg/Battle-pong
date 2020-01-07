class Ball {
    private dx!: number;
    private dy!: number;
    public ballSpeedX!: number;
    public ballSpeedY!: number;
    private startDirection: Array<number>;
    public ballXPosition: number;
    public ballYPosition: number;
    private ballRadius!: number;

    constructor() {
        this.startDirection = [4, -4];
        this.setStartDirection();
        this.ballXPosition = width / 2;
        this.ballYPosition = width / 2;
    }
    update(): void {
        this.setBallSize(circleSize);
    }
    draw(): void {
        this.moveBall(); // should be in update() but it only works from here right now
        // this.playerLoss();
        this.drawBall();
    }

    drawBall(): void {
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(2);
        ellipse(this.ballXPosition, this.ballYPosition, this.ballRadius * 2, this.ballRadius * 2);

        this.handleBall();
    }

    // move ball
    private moveBall(): void {
        this.ballXPosition += this.ballSpeedX;
        this.ballYPosition += this.ballSpeedY;

        // update variables
        this.dx = this.ballXPosition - width / 2;
        this.dy = this.ballYPosition - height / 2;
    }
    setStartDirection(): void { //Randomizes direction
        this.ballSpeedX = this.startDirection[Math.floor(Math.random() * this.startDirection.length)];
        this.ballSpeedY = this.startDirection[Math.floor(Math.random() * this.startDirection.length)];
    }
    // check for ball collision
    private handleBall(): void {
        for (const player of gameManager.players) {
            for (let i = 0; i <= player.pad.getPadLength; i++) {
                if (player.playerXCoordinates[i] && player.playerYCoordinates[i]) {
                    // bounce if ball+pad collision
                    if (dist(this.ballXPosition, this.ballYPosition, player.playerXCoordinates[i], player.playerYCoordinates[i]) < this.ballRadius + .5) {
                        this.bounceBackFromPad();
                    }
                }
            }
            if (dist(this.ballXPosition, this.ballYPosition, width / 2, height / 2) > this.ballRadius + circleSize / 2) {
                let distances: number[];
                distances = [];
                Math.max(...distances)
                for (let i = 0; i < gameManager.players.length; i++) {
                    const player = gameManager.players[i];
                    Math.max(...distances)
                    let distanceToBall = player.getDistanceToBall(this.ballXPosition, this.ballYPosition)
                    distances.push(distanceToBall);

                }
                if (distances.length = gameManager.players.length) {
                    for (const player of gameManager.players) {
                        if (distances[player.playerID] === Math.min(...distances)) {
                            gameManager.players[player.playerID].removePlayer();
                        }
                        this.ballXPosition = innerWidth / 2;
                        this.ballYPosition = innerHeight / 2;
                    }
                }
            }
        }
    }

    setBallSize(diameter: number) {
        this.ballRadius = diameter / 40;
    }

    // ball bounces
    private bounceBackFromPad(): void {
        if (dist(this.ballXPosition, this.ballYPosition, width / 2, height / 2) >= circleSize / 2 - 5) {
            const velocity = Math.sqrt(this.ballSpeedX * this.ballSpeedX + this.ballSpeedY * this.ballSpeedY);
            let angleToCollisionPoint = Math.atan2(-this.dy, this.dx);
            let oldAngle = Math.atan2(-this.ballSpeedY, this.ballSpeedX);
            let newAngle = 2 * angleToCollisionPoint - oldAngle;

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
/*
if (this.ballYPosition < height / 2) {
    gameRestart = 1;
    this.ballXPosition = innerWidth / 2;
    this.ballYPosition = innerHeight / 2;
}
if (this.ballYPosition > height / 2) {
    gameRestart = 1;
    this.ballXPosition = innerWidth / 2;
    this.ballYPosition = innerHeight / 2;
}
*/