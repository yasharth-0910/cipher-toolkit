// Rail Fence Cipher - Transposition cipher with zigzag pattern
export function encrypt(text: string, rails: number): string {
  if (rails < 2) {
    throw new Error('Number of rails must be at least 2')
  }

  const clean = text.replace(/\s/g, '')
  if (clean.length === 0) return ''

  const fence: string[][] = Array(rails).fill(null).map(() => [])
  let rail = 0
  let direction = 1

  for (const char of clean) {
    fence[rail].push(char)
    rail += direction

    if (rail === 0 || rail === rails - 1) {
      direction *= -1
    }
  }

  return fence.flat().join('')
}

export function decrypt(text: string, rails: number): string {
  if (rails < 2) {
    throw new Error('Number of rails must be at least 2')
  }

  const clean = text.replace(/\s/g, '')
  if (clean.length === 0) return ''

  // Calculate positions
  const fence: (string | null)[][] = Array(rails).fill(null).map(() => Array(clean.length).fill(null))
  let rail = 0
  let direction = 1

  // Mark positions
  for (let i = 0; i < clean.length; i++) {
    fence[rail][i] = '*'
    rail += direction

    if (rail === 0 || rail === rails - 1) {
      direction *= -1
    }
  }

  // Fill in characters
  let index = 0
  for (let r = 0; r < rails; r++) {
    for (let c = 0; c < clean.length; c++) {
      if (fence[r][c] === '*') {
        fence[r][c] = clean[index++]
      }
    }
  }

  // Read zigzag
  let result = ''
  rail = 0
  direction = 1
  for (let i = 0; i < clean.length; i++) {
    result += fence[rail][i]
    rail += direction

    if (rail === 0 || rail === rails - 1) {
      direction *= -1
    }
  }

  return result
}
