class Events {
    protected eventsList: Array<number>; // Number array of index nrs, or strings, or objects...

    constructor() {
        this.eventsList = GameSettings.prototype.gameEvents;
    }
    update(): void { }
    draw(): void { }

    announceEvent(): void { }
    activateEvent(): void { }
    countDownToEvent(): void { }
    // Events
    reverseButtons(): void { }
    shrinkPad(): void { }
    fasterBall(): void { }
    hideBall(): void { }
    moreBalls(): void { }
}