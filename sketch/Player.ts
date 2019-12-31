class Player {
    protected activePlayer: boolean; // this property is probably not needed
    public pad: Pad;
    public playerID: number = gameManager.players.length;

    constructor(playerColor: p5.Color, playerButtonLeft: number, playerButtonRight: number) {
        this.activePlayer = true;
        this.pad = new Pad(playerColor, playerButtonLeft, playerButtonRight);
    }
    // draw + update player pad
    update(): void {
        this.pad.update();
    }
    draw(): void {

        this.pad.draw();
    }
    hitPlayer(): void { }

    setLeftKey() {

    }

    setRightKey() {

    }

    setKeys() {
        for (const keyObj in this.getKeys) {
            if (this.getKeys.hasOwnProperty(keyObj)) {
                const keys = this.getKeys[keyObj];
                
                console.log(Object.values(this.players));
                
                // let val = this.getKeys[].hasOwnProperty('left')
                
                console.log(val);
                Object.getOwnPropertyDescriptors(keys)
                for (let [key, value] of Object.entries(keys)) {

                }
            }
        }
    }

    get getKeys(): Array<{}> {
        return [
            { left: UP_ARROW, right: DOWN_ARROW },
            { left: 65, right: 90 }, // A, Z
            { left: 76, right: 80 }, // L, P
            { left: 51, right: 69 }, // 3, E
            { left: 57, right: 48 }, // 9, 0
            { left: 53, right: 54 }, // 5, 6
            { left: 67, right: 86 }, // C, V
            { left: 66, right: 78 } // B, N
        ]
    }

}


