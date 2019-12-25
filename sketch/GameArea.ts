class GameArea extends GameManager {
    update(): void { }
    draw(): void { }
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