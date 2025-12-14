export function getRandInt(low: number, high: number) {
    // [low, high)
    return Math.floor(Math.random() * (high - low) + low);
}
