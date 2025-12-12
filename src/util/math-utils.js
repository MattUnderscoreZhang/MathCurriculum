export function getRandInt(low, high) {
    // [low, high)
    return Math.floor(Math.random() * (high - low) + low);
}
