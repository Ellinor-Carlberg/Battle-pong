// change order of compilation
/// <reference path="./Player.ts" />

class Pad {
    private velocity: number;
    public currentPosition!: number;
    public startPosition!: number;
    public minConstrain!: number;
    public maxConstrain!: number;

    constructor() {
        this.velocity = 0;
    }

    public update(): void { }

    public draw(): void {
    }

    // draw player
    public drawPlayer(color: p5.Color): void {
        stroke(0);
        // fill(color)
        noFill()
        strokeWeight(9);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.getPadLength);
        stroke(color);
        strokeWeight(5);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.getPadLength);

        

        stroke(0);
        strokeWeight(7);
        arc(width / 2, height / 2, circleSize, circleSize, this.minConstrain, this.minConstrain + 0.01);
    }

    // calculate velocity
    public calculatePlayerVelocity(direction: string): void {
        // check if key is down
        if (direction === 'left') {
            this.velocity += 2/nrOfPlayers;
        }
        if (direction === 'right') {
            this.velocity -= 2/nrOfPlayers;
        }

        // change position
        this.currentPosition += this.velocity;

        // add friction
        this.velocity *= 0.4;

        // constrain pad
        this.currentPosition = constrain(this.currentPosition, this.minConstrain, this.maxConstrain);

    }
    // set/get start position
    public set setStartPosition(position: number) {
        this.startPosition = position;
    }
    public get getStartPosition(): number {
        return this.startPosition;
    }
    // set/get current position
    public set setCurrentPosition(position: number) {
        this.currentPosition = position;
    }
    public get getCurrentPosition(): number {
        return this.currentPosition;
    }
    // set min/max constrain value
    public set setMinConstrain(minValue: number) {
        this.minConstrain = minValue;
    }
    public set setMaxConstrain(maxValue: number) {
        this.maxConstrain = maxValue;
    }
    // calculate default pad length
    public get getPadLength(): number {
        return (360 / nrOfPlayers) / 3;
    }
}