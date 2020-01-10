class GameArea {
    /**
     * Update global circleSize variable.
     */
    public update(): void {
        circleSize = this.calculateCircleSize();
    }

    /**
     * Draws game area (circle).
     */
    public draw(): void {
        this.drawDefaultArea();
    }
   
    /**
     * Calculates game area size from window size.
     */
    public calculateCircleSize(): number {
        if (windowWidth >= windowHeight) {
            return windowHeight - 40;
        } else {
            return windowWidth - 40;
        }
    }
    
    /**
     * Draw default game area (circle).
     */
    private drawDefaultArea(): void {
        background('#777b7e');
        noFill();
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(width / 2, height / 2, circleSize, circleSize);
    }
}