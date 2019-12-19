class Pad {
    public padXPosition: number;
    public playerVelocity: number;
    public padLength: number;

    constructor() {
        this.padXPosition = this.calculatePadXPosition();
        this.playerVelocity = this.calculatePlayerVelocity();
        this.padLength = this.calculatePadSize();
    }
    update(): void { }
    draw(radius: number): void { }

    handlePad(): void {
        if (keyIsDown(UP_ARROW)) {
            // move up

            this.playerVelocity -= 5;
        } else if (keyIsDown(DOWN_ARROW)) {
            // move down

            this.playerVelocity += 5;
        }

        // change position
        this.padXPosition += this.playerVelocity;

        // friction
        this.playerVelocity *= 0.4;

        // constrain pads
        this.padXPosition = constrain(this.padXPosition, 0, 159);
        // if two players
        // Vad är ekvationen? this.padXPosition, x, y ?
        // player2Position = constrain(player2Position, 180, 339);
    }
    calculatePadSize(): number { return 10 /* number */ } // return void?
    calculatePlayerVelocity(): number { return 10 /* number */ } // Added method for velocity calculation, do we need it?
    calculatePadXPosition(): number { return 10 /* number */ } // Added method for pad x position calculation
    deflectBall(): void { }
}