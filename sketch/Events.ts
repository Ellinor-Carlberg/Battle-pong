class Events {
    public eventsList: Array<number>; // Number array of index nrs, or strings, or objects...

    constructor() {
        this.eventsList = [];
    }
    update(): void {
        let ballSpawnInterval = setInterval(this.moreBalls, 5000);
        if (gameManager.balls.length = 5) {
            clearInterval(ballSpawnInterval);
        }
    }

    draw(): void { }

    announceEvent(): void { }
    activateEvent(): void { }
    countDownToEvent(): void { }
    // Events
    reverseButtons(): void { }
    shrinkPad(): void { }
    fasterBall(): void { }
    hideBall(): void { }

    moreBalls(): void {
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