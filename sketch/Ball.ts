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
        this.startDirection = [4, -4];
        this.setStartDirection();
        this.ballXPosition = width / 2;
        this.ballYPosition = width / 2;
    }
    public update(): void {
        this.setBallSize(circleSize);
    }
    public draw(): void {
        this.moveBall(); // should be in update() but it only works from here right now
        // this.playerLoss();
        this.drawBall();
    }

    public drawBall(): void {
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(2);
        ellipse(this.ballXPosition, this.ballYPosition, this.ballRadius * 2, this.ballRadius * 2);

        this.handleBall();
    }
    public setStartDirection(): void { //Randomizes direction
        this.ballSpeedX = this.startDirection[Math.floor(Math.random() * this.startDirection.length)];
        this.ballSpeedY = this.startDirection[Math.floor(Math.random() * this.startDirection.length)];
    }
    public getDistArr(playerObjArr: Array<{}>, distList: number[]) {

        for (const playerObj in playerObjArr) {
            if (playerObjArr.hasOwnProperty(playerObj)) {

                if (gameManager.players[playerObj].getDistanceToBall(this.ballXPosition, this.ballYPosition) === Math.min(...distList)) {
                    gameManager.players[playerObj].removePlayer();
                    this.ballXPosition = width / 2;
                    this.ballYPosition = height / 2;
                }
            }
        }
    }

    public setBallSize(diameter: number): void {
        this.ballRadius = diameter / 40;
    }
    // move ball
    private moveBall(): void {
        this.ballXPosition += this.ballSpeedX;
        this.ballYPosition += this.ballSpeedY;

        // update variables
        this.dx = this.ballXPosition - width / 2;
        this.dy = this.ballYPosition - height / 2;
    }
    

    // check for ball collision
    private handleBall(): void {
        for (const player of gameManager.players) {
            // this.checkBall();
            for (let i = 0; i <= player.pad.getPadLength; i++) {
                if (player.playerXCoordinates[i] && player.playerYCoordinates[i]) {
                    // bounce if ball+pad collision
                    if (dist(this.ballXPosition, this.ballYPosition, player.playerXCoordinates[i], player.playerYCoordinates[i]) < this.ballRadius + .5) {
                        this.bounceBackFromPad();
                    }
                }
                // outside circle
                if (dist(this.ballXPosition, this.ballYPosition, width / 2, height / 2) > this.ballRadius + circleSize / 2) {
                    if (gameManager.players.length >= 2) {
                        let playerObjArr: Array<{}> = [];
                        let playdist: number[] = []
                        for (let i = 0; i < gameManager.players.length; i++) {
                            const player = gameManager.players[i];
                            let playerObj = {
                                "ID": player.playerID,
                                "distance": player.getDistanceToBall(this.ballXPosition, this.ballYPosition)
                            }
                            playerObjArr.push(playerObj);
                            playdist.push(player.getDistanceToBall(this.ballXPosition, this.ballYPosition))
                        }
                        this.getDistArr(playerObjArr, playdist);
                    }

                }

                if (gameManager.players.length === 1) {
                    this.ballSpeedY = this.ballSpeedX = 0;
                    this.ballXPosition = width / 2;
                    this.ballYPosition = height / 2;
                }
            }
        }
    }

    

    // ball bounces
    private bounceBackFromPad(): void {
        if (dist(this.ballXPosition, this.ballYPosition, width / 2, height / 2) >= circleSize / 2 - 5) {
            const velocity = Math.sqrt(this.ballSpeedX * this.ballSpeedX + this.ballSpeedY * this.ballSpeedY);
            let angleToCollisionPoint = Math.atan2(-this.dy, this.dx);
            let oldAngle = Math.atan2(-this.ballSpeedY, this.ballSpeedX);
            let newAngle = 2 * angleToCollisionPoint - oldAngle;

            // TODO: check where on pad...

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