class GameSettings implements GameStatus, MusicStatus {
    private gameMusic: GameMusic;
    public mutedMusic: boolean;

    constructor(gameMusic: GameMusic) {
        this.mutedMusic = false;
        this.gameMusic = gameMusic;
    }

    update() {
        this.handleSoundButton();
        this.controlSound();
    }
    draw() {
        this.drawSoundButton();
    }

    // set volume on soundfile
    set setSoundVolume(value: number) {
        this.gameMusic.menuMusic.setVolume(value);
    }
    // control volume property value
    private controlSound(): void {
        if (this.mutedMusic === true) {
            this.setSoundVolume = 0;
        }
        else {
            this.setSoundVolume = 0.2;
        }
    }
    // draw and handle sound button interaction
    private drawSoundButton(): void {
        /** sound button in top left corner, need to have a mouseClicked event 
        get it overlined when clicked  */

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
    public startGame(): void { 
        isGameRunning = 1;
        gameManager.createBall();
    }
}