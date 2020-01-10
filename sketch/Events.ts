class Events {
    constructor() {
        this.setEventInterval();
    }

    
    /**
     * Sets event interval.
     */
    private setEventInterval(): void {
        if (gameManager.players != undefined) {
            if (gameManager.balls.length < 10 && gameMode === 2) {
                let ballSpawnInterval = setInterval(() => {
                    this.addBalls(ballSpawnInterval);
                }, 35000);
            }
        }
    }

    /**
     * Game event that adds balls to make game more difficult.
     * @param {NodeJS.Timeout} interval the interval to clear if requirements are met.
     */
    private addBalls(interval: NodeJS.Timeout): void {
        gameManager.createBall();
        if (gameManager.balls.length == 10 || gameMode === 1 || nrOfPlayers != gameManager.players.length) {
            gameManager.balls.length = 1;
            gameManager.events.length = 0;
            clearInterval(interval);
        }
    }
}
