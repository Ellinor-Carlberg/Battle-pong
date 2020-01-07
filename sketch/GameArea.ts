
class GameArea {
    update(): void { }
    draw(): void {
        this.drawDefaultArea();
    }
    private drawDefaultArea() {
        background('#777b7e');
        noFill();
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(width / 2, height / 2, circleSize, circleSize);

    }

    // calculate game area size
    public calculateCircleSize(): number {
        if (windowWidth >= windowHeight) {
            circleSize = windowHeight - 40;
        } else {
            circleSize = windowWidth - 40;
        }
        return circleSize;
    }
}