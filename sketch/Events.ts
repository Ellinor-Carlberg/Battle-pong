class Events {
    public eventsList: Array<number>; // Number array of index nrs, or strings, or objects...

    constructor() {
        this.eventsList = [];
    }
    update(): void {
        this.moreBalls();

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
            if (gameManager.balls.length < 5) {
                gameManager.createBall();
                for (let i = 1; i < gameManager.balls.length; i++) {
                    const ball = gameManager.balls[i];
                    ball.ballSpeedX * (-5 * i);
                    ball.ballSpeedY * (-5 * i);
                }
            }
        }, 60000);
    }
}