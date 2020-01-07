let hello: number = 0;
let arcis;
class Ball {
    private dx!: number;
    private dy!: number;
    private ballSpeedX!: number;
    private ballSpeedY!: number;
    private startDirection: Array <number>;
    public ballXPosition: number;
    public ballYPosition: number;
    private ballRadius!: number;

    constructor() {
        this.startDirection = [4, -4];
        this.ballSpeedX = 7;
        this.ballSpeedY = -7;
        this.ballXPosition = width / 2;
        this.ballYPosition = width / 2;
    }
    update(): void {
        this.setStartDirection();
        this.setBallSize(circleSize);
    }
    draw(): void {
        this.moveBall(); // should be in update() but it only works from here right now
        this.playerLoss();
        this.drawBall();

        /*
        if (hello != 1) {
             this.drawws()
         }*/
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
        this.ballSpeedX = this.startDirection[Math.floor(Math.random()*this.startDirection.length)];
        this.ballSpeedY = this.startDirection[Math.floor(Math.random()*this.startDirection.length)];
    }

    // check for ball collision
    private handleBall(): void {
        for (const player of gameManager.players) {
            // this.checkBall();
            for (let i = 0; i <= player.pad.getPadLength; i++) {
                if (player.playerXCoordinates[i] && player.playerYCoordinates[i]) {
                    // bounce on ball - pad collision
                    if (dist(ballXPosition, ballYPosition, player.playerXCoordinates[i], player.playerYCoordinates[i]) < ballRadius + .5) {
                        
                        this.bounceBackFromPad();
                    }
                }
            }

        }
    }

    // radius, x, y, startAngle, endAngle
    checkBall() {
        for (let i = 0; i < gameManager.players.length; i++) {
            const player = gameManager.players[1];
            let radius = circleSize / 2;
            let sectorStart = radians(player.pad.getStartPosition);
            let sectorEnd = radians((player.pad.getStartPosition + (player.pad.getPadLength * 2)));

            let x = this.ballXPosition;
            let y = this.ballYPosition;
            stroke('red')
            strokeWeight(5)
            point(this.ballXPosition, this.ballYPosition);
            let angle = atan2(y, x)
            if (angle > sectorStart && angle < sectorEnd) {
                console.log('yes');

            }
        }
    }

    drawws() {
        let can = new OffscreenCanvas(width, height);
        let ctx = can.getContext('2d')

        for (let i = 0; i <= 1; i++) {
            arcis = new Path2D();
            const player = gameManager.players[0];
            arcis.arc(width / 2, height / 2, circleSize / 2, player.pad.minConstrain, player.pad.maxConstrain + player.pad.getPadLength)
            arcis.closePath();
            ctx.fillStyle = 'red'
            ctx.lineWidth = 10
            ctx.fill(arcis)
            if (mouseIsPressed && ctx.isPointInStroke(arcis, mouseX, mouseY)) {

                console.log('maybe');

            }
            else if (mouseIsPressed && !ctx.isPointInPath(arcis, mouseX, mouseY)) {
                console.log('no')
            }

        }
        // hello = 1;
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

    private playerLoss(): void {
        if (dist(this.ballXPosition, this.ballYPosition, width / 2, height / 2) > this.ballRadius + circleSize / 2) {
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
        }
    }
}
