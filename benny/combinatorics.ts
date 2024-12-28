import { factorial } from './misc.ts'

export const P = (n: number, r: number) => factorial(n) / factorial(n - r)

export const C = (n: number, r: number) =>
  factorial(n) / (factorial(r) * factorial(n - r))

// how many balls of a colors to guarantee b of same color?
export const pigenhole = (a: number, b: number) => (b - 1) * a + 1
