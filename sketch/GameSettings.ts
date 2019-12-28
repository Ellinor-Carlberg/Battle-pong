class GameSettings extends GameManager {
    private soundVolume: number;
    private gameEvents: number[];

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