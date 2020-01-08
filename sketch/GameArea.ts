class GameArea {
    public update(): void {
        circleSize = this.calculateCircleSize();
    }
    public draw(): void {
        this.drawDefaultArea();
    }
   
    // calculate game area size
    public calculateCircleSize(): number {
        if (windowWidth >= windowHeight) {
            return windowHeight - 40;
        } else {
            return windowWidth - 40;
        }
    }
    //Draw the gameArea(circle)
    private drawDefaultArea(): void {
        background('#777b7e');
        noFill();
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(width / 2, height / 2, circleSize, circleSize);

    }
}