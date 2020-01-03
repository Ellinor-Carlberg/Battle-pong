// change order of compilation
/// <reference path="./Player.ts" />

class Pad {
    private velocity: number;
    public currentPosition!: number;
    public startPosition!: number;
    private minConstrain!: number;
    private maxConstrain!: number;

    constructor() {
        this.velocity = 0;
    }

    update(): any { }

    draw(): void {
    }

    // draw player
    public drawPad(color: p5.Color): void {
        noFill();
        stroke(0);
        strokeWeight(9);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.getPadLength);
        stroke(color);
        strokeWeight(5);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.getPadLength);
    }
    // calculate velocity
    public calculatePlayerVelocity(direction: string): void {
            // check if key is down
            if (direction === 'left') {
                this.velocity += 2.5;
            }
            if (direction === 'right') {
                this.velocity -= 2.5;
            }

            // change position
            this.currentPosition += this.velocity;

            // add friction
            this.velocity *= 0.4;

            // constrain pad
            this.currentPosition = constrain(this.currentPosition, this.minConstrain, this.maxConstrain);
        
    }
    // set/get start position
    set setStartPosition(value: number) {
        this.startPosition = value;
    }
    get getStartPosition(): number {
        return this.startPosition;
    }
    // set/get current position
    set setCurrentPosition(value: number) {
        this.currentPosition = value;
    }
    get getCurrentPosition(): number {
        return this.currentPosition;
    }
    // set min/max constrain value
    set setMinValue(value: number) {
        this.minConstrain = value;
    }
    set setMaxValue(value: number) {
        this.maxConstrain = value;
    }
    // calculate default pad length
    get getPadLength(): number {
        return (360 / nrOfPlayers) / 3;
    }

    deflectBall(): void { }
}