'use strict'

export function getRandom (max?: number): number {
    const random = Math.floor(Math.random() * (max || 10));
    return random;
}

export function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
