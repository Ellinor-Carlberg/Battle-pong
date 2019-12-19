class Player {
    private playerID: number;
    private playerColor: string;
    protected playerButtonLeft: number;
    protected playerButtonRight: number;
    private startPosition: number;

    constructor(playerID: number, playerColor: string, playerButtonLeft: number, playerButtonRight: number) {
        this.playerID = playerID;
        this.playerColor = playerColor;
        this.playerButtonLeft = playerButtonLeft;
        this.playerButtonRight = playerButtonRight;
        this.startPosition = this.calculateStartPosition(); // should not recieve input? instead calculate startPosition in method
    }
    update(): void { }
    draw(radius: number): void {
        // draw pad, move to class Pad?
        stroke(0, 0, 0);
        strokeWeight(9);
        // need to reach padLength variable somehow
        arc(width / 2, height / 2, this.circleSize, this.circleSize, this.startPosition, this.startPosition + padLength);
        stroke(253, 188, 180);
    }
    calculateStartPosition(): number { return 10 /* number */ } // 10 = x
    calculatePlayerArea(): number { return 10 /* number */ }
    hitPlayer(): void { }
}