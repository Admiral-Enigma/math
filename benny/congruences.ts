const mod = (n: number, m: number) => ((n % m) + m) % m

class CongruenceSystem {
  system: [number, number][]

  constructor(system: [number, number][]) {
    this.system = system
  }

  isSolution(n: number) {
    return this.system.every(v => mod(n, v[1]) === mod(v[0], v[1]))
  }

  hasSolutionInRange(n: number, m: number) {
    for (let i = n; i < m + 1; i++) {
      if (this.system.every(v => mod(i, v[1]) === mod(v[0], v[1]))) return true
    }
    return false
  }

  solutionsInRange(n: number, m: number) {
    const v: number[] = []
    for (let i = n; i < m + 1; i++) {
      if (this.system.every(v => mod(i, v[1]) === mod(v[0], v[1]))) v.push(i)
    }
    return v
  }

  countSolutionsInRange(n: number, m: number) {
    return this.solutionsInRange(n, m).length
  }
}

class CS extends CongruenceSystem {}
