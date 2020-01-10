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

    /**
     * Draw player with p5.js functions.
     * @param {p5.Color} color 
     */
    public drawPlayer(color: p5.Color): void {
        noFill();
        stroke(0);
        strokeWeight(9);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.getPadLength);
        stroke(color);
        strokeWeight(5);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.getPadLength);
        stroke(0);
        strokeWeight(7);
        arc(width / 2, height / 2, circleSize, circleSize, this.minConstrain, this.minConstrain + 0.01);
    }

    /**
     * Calculates player's velocity and move's pad.
     * @param {string} direction retrieves direction as string
     */
    public calculatePlayerVelocity(direction: string): void {
        // check which key is down
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
    
    /**
     * Sets and gets start position on game start.
     * @param {number} position retrieves position
     */
    public set setStartPosition(position: number) {
        this.startPosition = position;
    }
    public get getStartPosition(): number {
        return this.startPosition;
    }
    
    /**
     * Sets and gets current position of the pad.
     * @param {number} position retrieves pad's current position
     */
    public set setCurrentPosition(position: number) {
        this.currentPosition = position;
    }
    public get getCurrentPosition(): number {
        return this.currentPosition;
    }

    /**
     * Sets pad's constrain values, how much pad can move horizontally.
     * @param {number} minValue min value, left direction
     * @param {number} maxValue max value, right direction
     */
    public set setMinConstrain(minValue: number) {
        this.minConstrain = minValue;
    }
    public set setMaxConstrain(maxValue: number) {
        this.maxConstrain = maxValue;
    }

    /**
     * Gets pad length.
     * @return {number} calculation using full circle degrees, number of players and a third of each player's constrained area.
     */
    public get getPadLength(): number {
        return (360 / nrOfPlayers) / 3;
    }
}
