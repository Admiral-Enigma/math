class CongruenceSystem {
  system: string[]
  vName: string

  constructor(system: string[], vName: string = 'x') {
    this.system = system
    this.vName = vName
  }

  hasSolutionInRange(n: number, m: number) {
    for (let i = n; i < m + 1; i++) {
      if (this.system.every(x => eval(x.replaceAll(this.vName, i.toString()))))
        return true
    }
    return false
  }
}

class CS extends CongruenceSystem {}
