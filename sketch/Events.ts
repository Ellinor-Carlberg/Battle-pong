class Events {
    constructor() {
        this.setEventInterval();
    }

    // set interval for adding balls
    private setEventInterval(): void {
        if (gameManager.players != undefined) {
            if (gameManager.players.length < 5) {
                let ballSpawnInterval = setInterval(() => {
                    this.moreBalls(ballSpawnInterval);
                }, 60000);
            }
        }
    }

    // add ball if nr of balls is less than 5
    private moreBalls(interval: NodeJS.Timeout): void {
        gameManager.createBall();
        if (gameManager.balls.length == 5) {
            clearInterval(interval);
        }
    }
}
