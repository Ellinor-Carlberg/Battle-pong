class Ball {
    private dx!: number;
    private dy!: number;
    private ballSpeedX: number;
    private ballSpeedY: number;

    constructor() {
        this.ballSpeedX = 7;
        this.ballSpeedY = -7;
    }
    update(): void {
    }
    draw(): void {
        this.handleBall(); // should be in update() but it only works from here right now
        this.drawBall();
    }

    drawBall() {
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(2);
        ellipse(ballXPosition, ballYPosition, ballRadius * 2, ballRadius * 2);

        this.checkCollision();
    }

    handleBall(): void {
        // move ball
        ballXPosition += this.ballSpeedX;
        ballYPosition += this.ballSpeedY;

        // update variables
        this.dx = ballXPosition - width / 2;
        this.dy = ballYPosition - height / 2;
    }

    checkCollision() {
        if (dist(ballXPosition, ballYPosition, width / 2, height / 2) >= circleSize / 2 - ballRadius) {
            const velocity = Math.sqrt(this.ballSpeedX * this.ballSpeedX + this.ballSpeedY * this.ballSpeedY);
            let angleToCollisionPoint = Math.atan2(-this.dy, this.dx);
            // console.log("v", angleToCollisionPoint);
            var oldAngle = Math.atan2(-this.ballSpeedY, this.ballSpeedX);
            var newAngle = 2 * angleToCollisionPoint - oldAngle;

            this.ballSpeedX = -velocity * Math.cos(newAngle);
            this.ballSpeedY = velocity * Math.sin(newAngle);

            const vector = createVector(this.dx, this.dy);
            vector.normalize()
            const scalar = (circleSize / 2 - ballRadius);
            vector.mult(scalar);
            ballXPosition = vector.x + width / 2;
            ballYPosition = vector.y + height / 2;
            this.handleBall();
        }
    }
    
    ballSize(): void { }
    bounceBackFromPad(): void { }
}