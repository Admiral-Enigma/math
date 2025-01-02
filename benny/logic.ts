export class LogicalEpxression {
  exprStr: string
  truthTable: Record<string, boolean>[]
  isTautology: boolean
  isContradiction: boolean
  isContingency: boolean

  constructor(exprStr: string, _vars?: string[]) {
    // This is to avoid overlap in cases where expression is variable
    exprStr = ' ' + exprStr

    const jsExprStr = exprStr
      .replaceAll('<=>', '==')
      .replaceAll('<=', '>=')
      .replaceAll('=>', '<=')
      .replaceAll('-', '&& !') // For use in set logic

    const vars = _vars || [...new Set(jsExprStr.match(/[a-zA-Z]/g))].toSorted()
    const table: Record<string, boolean>[] = []

    for (let i = 0; i < 2 ** vars.length; i++) {
      let row = {}
      let expr = jsExprStr
      for (let j = 0; j < vars.length; j++) {
        const bit = (i >> j) & 1
        const v = vars[j]
        expr = expr.replaceAll(v, bit.toString())
        row[v] = !!bit
      }
      row[exprStr] = !!eval(expr)
      table.push(row)
    }

    this.exprStr = exprStr
    this.truthTable = table
    this.isTautology = table.every(v => v[exprStr])
    this.isContradiction = !table.some(v => v[exprStr])
    this.isContingency = !this.isTautology && !this.isContradiction
  }

  logTruthTable() {
    console.table(this.truthTable)
  }

  isEqualTo(expr: LogicalEpxression) {
    return new LogicalEpxression(`(${this.exprStr}) <=> (${expr.exprStr})`)
      .isTautology
  }
}

export class LE extends LogicalEpxression {}
