class GameSettings {
    private gameMusic: GameMusic;
    public mutedMusic: boolean;

    constructor(gameMusic: GameMusic) {
        this.mutedMusic = false;
        this.gameMusic = gameMusic;
    }


    public update(): void {
        this.handleSoundButton();
        this.controlSound();
    }
    public draw(): void {
        this.drawSoundButton();
    }

    /**
     * Sets volume on background music.
     * @param {number} value volume, where 0 is muted and 1 is max.
     */
    private set setSoundVolume(value: number) {
        this.gameMusic.menuMusic.setVolume(value);
    }

    /**
     * Controls music volume depending on whether music is muted or not.
     */
    private controlSound(): void {
        if (this.mutedMusic === true) {
            this.setSoundVolume = 0;
        }
        else {
            this.setSoundVolume = 0.2;
        }
    }

    /**
     * Draw sound button for muted and non-muted.
     */
    private drawSoundButton(): void {

        /** the round button */
        strokeWeight(3)
        stroke('#000000')
        fill('#F4ed47');
        circle(60, 60, 80);

        /** speaker sign in button */
        fill('#000000');
        triangle(75, 80, 75, 40, 40, 60)

        fill('#F4ed47');
        stroke('#F4ed47')
        rect(47, 50, 5, 30)

        fill('#000000');
        stroke('#000000')
        rect(38, 54, 8, 13)

        /** overline when clicked */
        if (this.mutedMusic === true) {
            strokeWeight(10)
            stroke('#000000');
            line(40, 90, 80, 30);
        }
    }

    /**
     * Handles sound button.
     * Toggles muted music property value.
     */
    private handleSoundButton(): void {
        if (dist(mouseX, mouseY, 60, 60) < 40) {
            if (this.mutedMusic === false) {
                this.mutedMusic = true;
            }
            else if (this.mutedMusic === true) {
                this.mutedMusic = false;
            }
        }
    }

    /**
     * Set game mode to 'start' and create ball.
     * TODO: move ball to game manager.
     */
    public startGame(): void { 
        gameMode = 1;
        gameManager.createBall();
    }
}
