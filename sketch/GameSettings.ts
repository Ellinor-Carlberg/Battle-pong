class GameSettings extends GameManager {
    // Create instance of GameManager to call for start/quit methods
    public soundVolume: number;
    public gameEvents: number[];

    constructor() {
        super();
        this.soundVolume = 5;
        this.gameEvents = [];
    }
    controlEvents(): void { }
    gameStatus(): void {
        if (1) {
            this.startGame();
        }
        else if (2) {
            this.quitGame();
        }
    }
}