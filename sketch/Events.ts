class Events {
    public eventsList: Array<number>; // Number array of index nrs, or strings, or objects...

    constructor() {
        this.eventsList = [];
    }
    public update(): void {
        let ballSpawnInterval = setInterval(this.moreBalls, 5000);
        if (gameManager.balls.length = 5) {
            clearInterval(ballSpawnInterval);
        }
    }

    public draw(): void { }

    public announceEvent(): void { }
    public activateEvent(): void { }
    public countDownToEvent(): void { }
    // Events
    public reverseButtons(): void { }
    public shrinkPad(): void { }
    public fasterBall(): void { }
    public hideBall(): void { }

    public moreBalls(): void {
        setTimeout(() => {
            gameManager.createBall();
            for (let i = 1; i < gameManager.balls.length; i++) {
                const ball = gameManager.balls[i];
                ball.ballSpeedX * i;
                ball.ballSpeedY * i;
            }
        }, 60000);
    }
}
