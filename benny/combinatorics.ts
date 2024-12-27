import { factorial } from './misc.ts'

const P = (n: number, r: number) => factorial(n) / factorial(n - r)

const C = (n: number, r: number) =>
  factorial(n) / (factorial(r) * factorial(n - r))

// how many balls of a colors to guarantee b of same color?
const pigenhole = (a: number, b: number) => (b - 1) * a + 1
