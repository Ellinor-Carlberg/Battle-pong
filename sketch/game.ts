class Game {
    private startGameButton : Button;
    private isGameRunning: boolean;

    constructor(){
        this.startGameButton = new Button(100, 100, 100, 50, "Start")
        this.isGameRunning = false;
    }
    public update() {
        this.isGameRunning = this.startGameButton.handleMousePressed()
    }
    public draw() {
        if (!this.isGameRunning) {
            this.startGameButton.draw()
        }
    }
}