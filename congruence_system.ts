import consola from 'consola'
// @ts-ignore
import { gcd, invmod } from 'mathjs'

function solveCongruenceSystem(
  remainders: number[],
  moduli: number[]
): number | null {
  const n = remainders.length

  // Check if all moduli are pairwise coprime
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (gcd(moduli[i], moduli[j]) !== 1) {
        return null // Moduli are not pairwise coprime
      }
    }
  }

  // Apply the Chinese Remainder Theorem
  let M = 1
  for (let i = 0; i < n; i++) {
    M *= moduli[i]
  }

  let x = 0
  for (let i = 0; i < n; i++) {
    const Mi = M / moduli[i]
    const inv = invmod(Mi, moduli[i])

    if (inv === null) return null // No solution exists
    x += remainders[i] * Mi * inv
  }

  return x % M
}

async function main() {
  const moduli = await consola
    .prompt('Input moduli as CSV', {
      type: 'text',
    })
    .then((string) => string.split(',').map((element) => Number(element)))
  const remainders = await consola
    .prompt('Input remainders as CSV', {
      type: 'text',
    })
    .then((string) => string.split(',').map((element) => Number(element)))

  const result = solveCongruenceSystem(remainders, moduli)

  if (result == null) {
    consola.error('No solution found')
  } else {
    consola.success(`Result ${result}`)
    moduli.forEach((moduli, index) => {
      consola.info(`${result} mod ${moduli} = ${result % moduli}`)
    })
  }
}
main()
