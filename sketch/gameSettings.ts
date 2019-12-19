class GameSettings {
    // Create instance of GameManager to call for start/quit methods
    public gameManager: GameManager;
    public soundVolume: number;
    public gameEvents: number[];
    public nrOfPlayers: number;

    constructor() {
        this.gameManager = new GameManager();
        this.soundVolume = 5;
        this.gameEvents = [];
        this.nrOfPlayers = this.gameManager.players.length;
    }

    controlEvents(): void { }
    controlSound(): void { }
}