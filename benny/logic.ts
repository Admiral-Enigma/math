export class LogicalEpxression {
  exprStr: string
  truthTable: Record<string, boolean>[]
  isTautology: boolean
  isContradiction: boolean
  isContingency: boolean

  constructor(exprStr: string, vars: string[]) {
    // This is to avoid overlap in cases where expression is variable
    exprStr = ' ' + exprStr

    const jsExprStr = exprStr
      .replaceAll('<=>', '==')
      .replaceAll('<=', '>=')
      .replaceAll('=>', '<=')
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
    this.isTautology = table.reduce((acc, row) => acc && row[exprStr], true)
    this.isContradiction = !table.reduce(
      (acc, row) => acc || row[exprStr],
      false
    )
    this.isContingency = !this.isTautology && !this.isContradiction
  }

  logTruthTable() {
    console.table(this.truthTable)
  }

  isEqualTo(expr: LogicalEpxression) {
    return (
      JSON.stringify(this.truthTable) ==
      JSON.stringify(expr.truthTable).replaceAll(expr.exprStr, this.exprStr)
    )
  }
}

export class LE extends LogicalEpxression {}
