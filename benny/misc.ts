const invmod = (b: number, a: number) => {
  const d = [b, a]
  const s = [0, 1]
  const t = [1, 0]

  for (let i = 2; d[i - 1] > 0; i++) {
    const q = Math.floor(d[i - 2] / d[i - 1])
    d.push(d[i - 2] - q * d[i - 1])
    s.push(s[i - 2] - q * s[i - 1])
    t.push(t[i - 2] - q * t[i - 1])
  }
  return [d[d.length - 1], s[s.length - 1], t[t.length - 1]]
}