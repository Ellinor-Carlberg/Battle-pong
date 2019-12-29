interface GameStatus {
    startGame(): void;
    quitGame(): void;
}
// might not need this Or make into class?
interface Canvas {
    width: number;
    height: number;
    resizeCanvas(width: number, height: number): void;
}

interface GameMusic {
    menuMusic: p5.SoundFile;
}