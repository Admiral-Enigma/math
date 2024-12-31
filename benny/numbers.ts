// !!!!DISCLAIMER!!!!
// USE THIS MODULE WITH CARE!
// This is only ment for super basic testing...
// Please use your brain before using this!

// These sets should be enough for most exam cases
// They include:
// - Negative / Positive / Zero
// - Prime / Composite
// - Odd / Even
const TEST_SETS = {
  Z: [-13, -10, -9, -7, -4, -3, -2, -1, 0, 1, 2, 3, 4, 7, 8, 9, 11, 13, 16],
  'Z+': [1, 2, 3, 4, 7, 8, 9, 11, 13, 16],
  'Z-': [-13, -10, -9, -7, -4, -3, -2, -1],
  N: [0, 1, 2, 3, 4, 7, 8, 9, 11, 13, 16],
}

export const forall = (
  setName: keyof typeof TEST_SETS,
  f: (x: number) => boolean
) => TEST_SETS[setName].every(f)

export const exists = (
  setName: keyof typeof TEST_SETS,
  f: (x: number) => boolean
) => TEST_SETS[setName].some(f)

export const existsUnique = (
  setName: keyof typeof TEST_SETS,
  f: (x: number) => boolean
) => TEST_SETS[setName].filter(f).length === 1
