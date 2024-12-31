// Fixes retarded JS mod
export const mod = (n: number, m: number) => ((n % m) + m) % m

export const invmod = (b: number, a: number) => {
  const d = [b, a]
  const s = [0, 1]
  const t = [1, 0]

  for (let i = 2; d[i - 1] > 0; i++) {
    const q = Math.floor(d[i - 2] / d[i - 1])
    d.push(d[i - 2] - q * d[i - 1])
    s.push(s[i - 2] - q * s[i - 1])
    t.push(t[i - 2] - q * t[i - 1])
  }

  if (d[d.length - 2] !== 1) {
    throw new Error(`${b} and ${a} are not coprime!`)
  }

  return mod(s[s.length - 1], a)
}

export const factorial = (n: number) => {
  if (n < 0) throw Error('Factorial is not defined for negative numbers')
  else if (n === 0) return 1
  return n * factorial(n - 1)
}

export const sum = (
  i: number,
  n: number,
  f: (i: number, n: number) => number
) => {
  let m = 0
  for (; i < n + 1; i++) m += f(i, n)
  return m
}

export const gcd = (a: number, b: number) => {
  if (b === 0) return a
  return gcd(b, mod(a, b))
}

export const lcm = (a: number, b: number): number => {
  return Math.abs(a * b) / gcd(a, b)
}

export const arePairwisePrime = (v: number[]) => {
  for (let i = 0; i < v.length; i++)
    for (let j = i + 1; j < v.length; j++)
      if (gcd(v[i], v[j]) !== 1) return false
  return true
}
