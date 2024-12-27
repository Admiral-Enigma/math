class CongruenceSystem {
  system: string[]
  vName: string

  constructor(system: string[], vName: string = 'x') {
    this.system = system
    this.vName = vName
  }

  isSolution(n: number) {
    return this.system.every(x => eval(x.replaceAll(this.vName, n.toString())))
  }

  hasSolutionInRange(n: number, m: number) {
    for (let i = n; i < m + 1; i++) {
      if (this.system.every(x => eval(x.replaceAll(this.vName, i.toString()))))
        return true
    }
    return false
  }

  solutionsInRange(n: number, m: number) {
    const v: number[] = []
    for (let i = n; i < m + 1; i++) {
      if (this.system.every(x => eval(x.replaceAll(this.vName, i.toString()))))
        v.push(i)
    }
    return v
  }

  countSolutionsInRange(n: number, m: number) {
    return this.solutionsInRange(n, m).length
  }
}

class CS extends CongruenceSystem {}
