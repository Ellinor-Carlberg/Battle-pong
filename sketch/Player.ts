class Player {
    protected activePlayer: boolean; // this property is probably not needed
    public pad: Pad;
    public playerID!: number;

    constructor(playerColor: string, playerButtonLeft: number, playerButtonRight: number) {
        this.activePlayer = true;
        this.pad = new Pad(playerColor, playerButtonLeft, playerButtonRight);
    }
    // draw + update player pad
    update(): void {
        this.pad.update();
    }
    draw(): void {
        this.pad.draw();
    }
    hitPlayer(): void { }
}