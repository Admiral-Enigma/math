type Relation = [string, string]

class SetRelations {
  set: Set<string>
  relations: Set<Relation>
  table: Record<string, Record<string, boolean>>
  isEmpty: boolean
  isReflexive: boolean
  isSymmetric: boolean
  isAntiSymmetric: boolean
  isTransitive: boolean
  isEquivalence: boolean
  isUniversal: boolean
  isIdentity: boolean
  isPartialOrdering: boolean

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
    this.isEmpty = !tableEntries.some(v => Object.values(v[1]).some(x => x))
    this.isReflexive = tableEntries.every(v => v[1][v[0]])
    this.isSymmetric = tableEntries.every(v =>
      Object.entries(v[1]).every(w => this.table[w[0]][v[0]] === w[1])
    )
    this.isAntiSymmetric = tableEntries.every(v =>
      Object.entries(v[1]).every(
        w => v[0] === w[0] || this.table[w[0]][v[0]] !== w[1]
      )
    )
    this.isTransitive = tableEntries.every(v =>
      Object.entries(v[1]).every(
        w => !w[1] || tableRows.every(u => !u[v[0]] || u[w[0]])
      )
    )
    this.isEquivalence =
      this.isReflexive && this.isSymmetric && this.isTransitive
    this.isUniversal = tableRows.every(x => Object.values(x).every(y => y))
    this.isIdentity =
      this.isReflexive &&
      tableRows.every(
        x => Object.values(x).filter(y => y === true).length === 1
      )
    this.isPartialOrdering =
      this.isReflexive && this.isAntiSymmetric && this.isTransitive
  }

  inverse() {
    return new SetRelations(
      this.set,
      new Set([...this.relations].map(v => [v[1], v[0]]))
    )
  }
}

class SR extends SetRelations {}
