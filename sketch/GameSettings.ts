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

    // set volume on soundfile
    private set setSoundVolume(value: number) {
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

    // toggles muted music property
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

    // start game and then create ball
    public startGame(): void { 
        gameMode = 1;
        gameManager.createBall();
    }
}
