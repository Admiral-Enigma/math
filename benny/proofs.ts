//
//    !!!!!!!!EXPERIMENTAL!!!!!!!!
// (Use your brain before using this)

// Retarded import needed cuz of eval
import { sum as _sum } from './misc.ts'
const sum = _sum

export const validateInductiveProof = (
  start: number,
  lines: [string, string][]
) => {
  let valid = true
  for (let i = 0; i < 101; i++) {
    // n and k are the same, this is so eval has access to them
    let n = start + i
    let k = n

    if (
      !lines.every(
        (line, i) => i === 0 || eval(`${lines[i - 1][1]} ${line[0]} ${line[1]}`)
      )
    ) {
      valid = false
      break
    }
  }
  return valid
}

//
// TEST/EXAMPLE USES
//

// Exam Fall 2022

// validateInductiveProof(2, [
//   ['', 'sum(1, k, i => 2*i + 5)'],
//   ['===', 'sum(1, k-1, i => 2*i + 5) + 2*k + 5'],
//   ['===', '(k - 1)*((k - 1) + 6) + 2*k + 5'],
//   ['===', 'k**2 + 4*k - 5 + 2*k + 5'],
//   ['===', 'k*(k + 6)'],
// ])

// validateInductiveProof(1, [
//   ['', 'sum(1, k+1, i => 2*i + 5)'],
//   ['===', 'sum(1, k, i => 2*i + 5) + 2*(k + 1) + 5'],
//   ['===', 'k*(k + 6) + 2*(k + 1) + 5'],
//   ['===', 'k**2 + 6*k + 2*k + 7'],
//   ['===', '(k + 1)*((k + 1) + 6)'],
// ])

// validateInductiveProof(1, [
//   ['', 'sum(1, k, i => 2*i + 5)'],
//   ['===', 'sum(1, k+1, i => 2*i + 5) - (2*(k+1) + 5)'],
//   ['===', '(k + 1) * ((k + 1) + 6) - (2*(k+1) + 5)'],
//   ['===', 'k**2 + 8*k + 7 - (2*k + 7)'],
//   ['===', 'k*(k + 6)'],
// ])

// Second Re-Exam 2022

// console.log(
//   '1',
//   validateInductiveProof(10, [
//     ['', '(n + 1)**2'],
//     ['===', 'n**2 + 2*n + 1'],
//     ['>=', '10*n + 2*n + 1'],
//     ['>', '10*n + 10'],
//     ['===', '10*(n + 1)'],
//   ])
// )

// console.log(
//   '2',
//   validateInductiveProof(9, [
//     ['', '(n + 2)**2'],
//     ['===', 'n**2 + 4*n + 4'],
//     ['===', '(n + 1)**2 + 2*n + 3'],
//     ['>=', '10*(n + 1) + 2*n + 3'],
//     ['>', '10*(n + 1) + 10'],
//     ['===', '10*(n + 2)'],
//   ])
// )

// console.log(
//   '3',
//   validateInductiveProof(10, [
//     ['', 'n**2'],
//     ['<=', 'n**2 + 2*n + 1'],
//     ['===', '(n + 1)**2'],
//     ['<=', '10 * (n + 1)'],
//     ['<=', '10 * n'],
//   ])
// )

// console.log(
//   '4',
//   validateInductiveProof(10, [
//     ['', '10*n + 10'],
//     ['<=', 'n**2 + 2*n + 1'],
//     ['===', '(n + 1)**2'],
//     ['>=', '10*(n + 1)'],
//   ])
// )
