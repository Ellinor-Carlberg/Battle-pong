interface GameStatus {
    startGame(): void;
}

interface GameMusic {
    menuMusic: p5.SoundFile;
}

interface MusicStatus {
    mutedMusic: boolean;
}