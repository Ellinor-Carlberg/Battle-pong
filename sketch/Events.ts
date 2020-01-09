class Events {
    constructor() {
        this.setEventInterval();
    }

    // set interval for adding balls
    private setEventInterval(): void {
        if (gameManager.players != undefined) {
            if (gameManager.balls.length < 10 && gameMode === 2) {
                let ballSpawnInterval = setInterval(() => {
                    this.addBalls(ballSpawnInterval);
                }, 35000);
            }
        }
    }

    // add balls and/or clear interval
    private addBalls(interval: NodeJS.Timeout): void {
        gameManager.createBall();
        if (gameManager.balls.length == 10 || gameMode === 1) {
            gameManager.balls.length = 1;
            gameManager.events.length = 0;
            clearInterval(interval);
        }
    }
}
