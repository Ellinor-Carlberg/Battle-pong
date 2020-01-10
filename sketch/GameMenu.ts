class GameMenu {
    public draw(): void {
        this.drawMenu();
        this.drawAddPlayerButton();
        this.drawNewPlayer();
        this.drawStartGameButton();
    }

    /**
     * Handles add player button on game menu.
     * If maximum of player is not reached, create a player.
     */
    public handleAddPlayerButton(): void {
        if (mouseX > (width * .5) + 190 && mouseX < (width * .5) + 290 &&
            mouseY > height * .9 && mouseY < (height * .9) + 45) {
            if (gameManager.players.length < 8) {
                nrOfPlayers++;
                gameManager.createPlayer();
            }
        }
    }

    /**
     * Draw add player button on game menu.
     */
    private drawAddPlayerButton(): void {

        /**shadow box for add more players button */
        strokeWeight(3)
        stroke('#000000')
        fill('#000000');
        rect((width * .5) + 195, height * .91, 100, 45, 15);

        /** add more players button, need to have a mouseClicked event */
        strokeWeight(3);
        stroke('#000000');
        fill('#ffffff');
        rect((width * .5) + 190, height * .9, 100, 45, 15);
        /** "+"-sign in add more player button */
        let s = '+';
        textSize(30);
        fill('#000000');
        text(s, (width * .5) + 230, (height * .9) + 30);
    }

    /**
     * Draw new player: assigned color, text and keys.
     */
    private drawNewPlayer(): void {
        for (const playerObj in gameManager.players) {
            const player = gameManager.players[playerObj];
            // color
            strokeWeight(3);
            stroke('#000000');
            fill(player.playerColor);
            rect((width * .5) - 300, 200 + 60 * (player.playerID), 55, 45, 15);
            // text
            textSize(30);
            fill('#000000');
            text('Player ' + (player.playerID + 1), (width * .5) - 200, 232 + 60 * (player.playerID));
            // left key
            strokeWeight(3)
            stroke('#000000')
            fill('#ffffff');
            rect((width * .5) + 180, 200 + 60 * (player.playerID), 50, 45, 15);
            // right key
            strokeWeight(3)
            stroke('#000000')
            fill('#ffffff');
            rect((width * .5) + 250, 200 + 60 * (player.playerID), 50, 45, 15)

            this.drawKeys(player.playerID);
        }
    }

    /**
     * Draw player keys.
     * @param {number} playerID the player to assign keys to.
     */
    private drawKeys(playerID: number): void {
        switch (playerID) {
            case 0:
                /** text left-key player one */
                fill('#000000');
                triangle((width * .5) + 195, 230, (width * .5) + 215, 230, (width * .5) + 205, 210);
                /** text right-key player one */
                fill('#000000');
                triangle((width * .5) + 265, 212, (width * .5) + 285, 212, (width * .5) + 275, 232);
                break;
            case 1:
                /** text left-key player two */
                let p2LeftKey = '1';
                textSize(30);
                fill('#000000');
                text(p2LeftKey, (width * .5) + 197, 292);
                /** text right-key player two */
                let p2RightKey = 'Q';
                textSize(30);
                fill('#000000');
                text(p2RightKey, (width * .5) + 264, 292);
                break;
            case 2:
                /** text left-key player three */
                let p3LeftKey = '5';
                textSize(30);
                fill('#000000');
                text(p3LeftKey, (width * .5) + 197, 353);
                /** text right-key player three */
                let p3RightKey = '6';
                textSize(30);
                fill('#000000');
                text(p3RightKey, (width * .5) + 267, 353);
                break;
            case 3:
                /** text left-key player four */
                let p4LeftKey = 'L';
                textSize(30);
                fill('#000000');
                text(p4LeftKey, (width * .5) + 198, 412);
                /** text right-key player four */
                let p4RightKey = 'P';
                textSize(30);
                fill('#000000');
                text(p4RightKey, (width * .5) + 267, 412);
                break;
            case 4:
                /** text left-key player five */
                let p5LeftKey = 'S';
                textSize(30);
                fill('#000000');
                text(p5LeftKey, (width * .5) + 195, 473);
                /** text right-key player five */
                let p5RightKey = 'X';
                textSize(30);
                fill('#000000');
                text(p5RightKey, (width * .5) + 265, 473);
                break;
            case 5:
                /** text left-key player six */
                let p6LeftKey = 'U';
                textSize(30);
                fill('#000000');
                text(p6LeftKey, (width * .5) + 195, 532);
                /** text right-key player six */
                let p6RightKey = 'I';
                textSize(30);
                fill('#000000');
                text(p6RightKey, (width * .5) + 271, 532);
                break;
            case 6:
                /** text left-key player seven */
                let p7LeftKey = 'F';
                textSize(30);
                fill('#000000');
                text(p7LeftKey, (width * .5) + 195, 592);
                /** text right-key player seven */
                let p7RightKey = 'G';
                textSize(30);
                fill('#000000');
                text(p7RightKey, (width * .5) + 264, 592);
                break;
            case 7:
                /** text left-key player eight */
                let p8LeftKey = 'N';
                textSize(30);
                fill('#000000');
                text(p8LeftKey, (width * .5) + 195, 652);
                /** text right-key player eight */
                let p8RightKey = 'M';
                textSize(30);
                fill('#000000');

                text(p8RightKey, (width * .5) + 264, 652);
                break;
        }
    }

    /**
     * Draw start button on game menu.
     */
    private drawStartGameButton(): void {

        /** black shadow for start button */
        strokeWeight(3);
        stroke('#000000');
        fill('#000000');
        rect((width * .5) - 280, height * .91, 100, 45, 15);

        /** yellow start button */
        strokeWeight(3);
        stroke('#000000');
        fill('#F4ed47');
        rect((width * .5) - 285, height * .9, 100, 45, 15);


        /** text in start button */
        let startButton = 'START'
        textSize(28);
        fill('#000000');
        text(startButton, (width * .48) - 250, (height * .897) + 35);
    }

    /** 
     * Draw menu elements such as background, middle section and header.
     */
    private drawMenu(): void {
        /** Background, (grey and brown) */

        /** grey background */
        background('#777b7e');

        /** big brown rect. in the middle*/
        noStroke()
        fill('#999966');
        rect((width * .5) - 350, 0, 700, height)

        /** top vertical brown line*/
        strokeWeight(60)
        stroke('#999966');
        line(0, 150, width, 500);

        /** middle vertical brown line*/
        strokeWeight(140)
        stroke('#999966');
        line(0, 280, width, 630);

        /** bottom vertical brown line*/
        strokeWeight(40)
        stroke('#999966');
        line(0, 400, width, 750);

        /** line behind headline */
        /** yellow line behind headline */
        strokeWeight(60)
        stroke('#F4ed47');
        line(0, 60, width, 60);

        /** black lines over yellow line */
        strokeWeight(1)
        stroke('#000000');
        line(0, 30, width, 30);

        strokeWeight(3)
        stroke('#000000');
        line(0, 45, width, 45);

        strokeWeight(1)
        stroke('#000000');
        line(0, 55, width, 55);

        strokeWeight(2)
        stroke('#000000');
        line(0, 60, width, 60);

        strokeWeight(2)
        stroke('#000000');
        line(0, 80, width, 80);

        strokeWeight(2)
        stroke('#000000');
        line(0, 90, width, 90);

        /**headline Battle-Pong svg */
        image(headerImage, width * .5 - (headerImage.width * 0.5), 20)
    }
}