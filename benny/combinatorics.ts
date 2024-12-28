import { factorial, mod } from './misc.ts'

export const P = (n: number, r: number) => factorial(n) / factorial(n - r)

export const C = (n: number, r: number) =>
  factorial(n) / (factorial(r) * factorial(n - r))

// how many balls of a colors to guarantee b of same color?
export const pigenhole = (a: number, b: number) => (b - 1) * a + 1

// how many ways to put a people in b equally sized (unlabeled) groups
export const equalUnlabeledGroups = (a: number, b: number) => {
  if (mod(a, b) !== 0) throw Error('a must be divisible by b')
  const n = a / b
  return factorial(a) / (factorial(n) ** b * factorial(b))
}

// how many ways to put a people in b equally sized (labeled) groups
export const equalLabeledGroups = (a: number, b: number) => {
  if (mod(a, b) !== 0) throw Error('a must be divisible by b')
  const n = a / b
  return factorial(a) / factorial(n) ** b
}
