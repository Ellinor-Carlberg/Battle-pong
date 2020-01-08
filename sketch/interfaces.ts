interface GameStatus {
    startGame(): void;
    quitGame(): void;
}

interface GameMusic {
    menuMusic: p5.SoundFile;
}

interface MusicStatus {
    mutedMusic: boolean;
}