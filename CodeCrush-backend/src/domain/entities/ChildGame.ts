export interface ChildGame {
    gameId: string;
    currentLevel: number;
    currentLevelHighScore: number;
    averageScore?: number;
    lastPlayedAt?: Date;
}