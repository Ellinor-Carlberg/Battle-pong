class Pad {
    private playerColor: string;
    private leftKey: number;
    private rightKey: number;
    private velocity: number;
    public currentPosition!: number;
    public startPosition!: number; 
    public minConstrain!: number;
    public maxConstrain!: number;

    constructor(playerColor: string, leftKey: number, rightKey: number) {
        this.playerColor = playerColor;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.velocity = 0;
    }
    // update player position
    update(): any {
        this.calculatePlayerVelocity();
    }
    draw(): void {
        this.drawPlayer();
    }
    // draw player
    private drawPlayer(): void {
        noFill();
        stroke(0);
        strokeWeight(9);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.getPadLength);
        stroke(this.playerColor);
        strokeWeight(5);
        arc(width / 2, height / 2, circleSize, circleSize, this.currentPosition, this.currentPosition + this.getPadLength);
    }
    // calculate velocity
    private calculatePlayerVelocity(): void {
        // check if key is down
        if (keyIsDown(this.leftKey)) {
            this.velocity += 2.5;
        }
        if (keyIsDown(this.rightKey)) {
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