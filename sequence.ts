export const generateSequence = (
  n: number,
  formula: (index: number, prevValues: number[]) => number,
  initialValues: number[]
): number[] => {
  if (n <= initialValues.length) return initialValues.slice(0, n)

  const sequence = [...initialValues]
  for (let i = initialValues.length; i < n; i++) {
    const nextValue = formula(i, sequence)
    sequence.push(nextValue)
  }
  return sequence
}
