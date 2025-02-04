export class Matrix {
  size: [number, number]
  matrix: number[][]

  constructor(matrix: number[][]) {
    if (!matrix.every(row => row.length === matrix[0].length))
      throw Error('Matrix rows have variable size')

    this.matrix = matrix
    this.size = [matrix.length, matrix[0].length]
  }

  transpose() {
    const v: number[][] = new Array(this.size[1]).fill(null).map(() => [])
    for (let i = 0; i < this.size[0]; i++)
      for (let j = 0; j < this.size[1]; j++) v[j][i] = this.matrix[i][j]
    return new Matrix(v)
  }

  isSymmetric() {
    return (
      JSON.stringify(this.transpose().matrix) === JSON.stringify(this.matrix)
    )
  }
}

export const mult = (a: Matrix, b: Matrix) => {
  if (a.size[1] !== b.size[0])
    throw Error(
      'The number of columns of the first matrix must be equal to the number of rows in the second'
    )

  const v: number[][] = []
  for (let i = 0; i < a.size[0]; i++) {
    const w: number[] = []
    const row = a.matrix[i]
    for (let j = 0; j < b.size[1]; j++) {
      const column = b.matrix.reduce((acc, v) => [...acc, v[j]], [])
      const dotProduct = row.reduce((acc, v, k) => acc + v * column[k], 0)
      w.push(dotProduct)
    }
    v.push(w)
  }
  return new Matrix(v)
}

export const boolMult = (a: Matrix, b: Matrix) => {
  if (a.size[1] !== b.size[0])
    throw Error(
      'The number of columns of the first matrix must be equal to the number of rows in the second'
    )

  const v: number[][] = []
  for (let i = 0; i < a.size[0]; i++) {
    const w: number[] = []
    const row = a.matrix[i]
    for (let j = 0; j < b.size[1]; j++) {
      const column = b.matrix.reduce((acc, v) => [...acc, v[j]], [])
      const dotProduct = row.reduce(
        (acc, v, k) => Math.min(acc + v * column[k], 1),
        0
      )
      w.push(dotProduct)
    }
    v.push(w)
  }
  return new Matrix(v)
}

export const scalarMult = (a: Matrix, k: number) =>
  new Matrix(a.matrix.map(v => v.map(x => x * k)))

export const add = (a: Matrix, b: Matrix) => {
  if (a.size[0] !== b.size[0] || a.size[1] !== b.size[1])
    throw Error('a and b must have same sizes')

  return new Matrix(a.matrix.map((v, i) => v.map((x, j) => x + b.matrix[i][j])))
}
