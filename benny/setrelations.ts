type Relation = [string, string]

class SetRelations {
  set: Set<string>
  relations: Set<Relation>
  table: Record<string, Record<string, boolean>>
  empty: boolean
  reflexive: boolean
  symmetric: boolean
  transitive: boolean
  equivalence: boolean
  universal: boolean
  identity: boolean

  constructor(set: Set<string>, relations: Set<Relation>) {
    this.set = set
    this.relations = relations

    const arrRelations = [...relations]
    const arrSet = [...set]

    this.table = arrSet.reduce(
      (a, x) => ({
        ...a,
        [x]: arrSet.reduce(
          (b, y) => ({
            ...b,
            [y]: arrRelations.some(v => v[0] === x && v[1] === y),
          }),
          {}
        ),
      }),
      {}
    )

    const tableEntries = Object.entries(this.table)
    const tableRows = Object.values(this.table)
    this.empty = !tableEntries.some(v => Object.values(v[1]).some(x => x))
    this.reflexive = tableEntries.every(v => v[1][v[0]])
    this.symmetric = tableEntries.every(v =>
      Object.entries(v[1]).every(w => this.table[w[0]][v[0]] === w[1])
    )
    this.transitive = tableEntries.every(v =>
      Object.entries(v[1]).every(
        w => !w[1] || tableRows.every(u => !u[v[0]] || u[w[0]])
      )
    )
    this.equivalence = this.reflexive && this.symmetric && this.transitive
    this.universal = tableRows.every(x => Object.values(x).every(y => y))
    this.identity =
      this.reflexive &&
      tableRows.every(
        x => Object.values(x).filter(y => y === true).length === 1
      )
  }

  inverse() {
    return new SetRelations(
      this.set,
      new Set([...this.relations].map(v => [v[1], v[0]]))
    )
  }
}

class SR extends SetRelations {}
