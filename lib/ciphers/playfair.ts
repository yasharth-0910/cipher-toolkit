// Playfair Cipher - 5x5 grid substitution
function createPlayfairMatrix(key: string): string[][] {
  const cleanKey = key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '')
  const seen = new Set<string>()
  const matrix: string[][] = []
  let row: string[] = []

  // Add key characters
  for (const char of cleanKey) {
    if (!seen.has(char)) {
      seen.add(char)
      row.push(char)
      if (row.length === 5) {
        matrix.push(row)
        row = []
      }
    }
  }

  // Add remaining alphabet
  for (let i = 65; i <= 90; i++) {
    const char = String.fromCharCode(i)
    if (char !== 'J' && !seen.has(char)) {
      seen.add(char)
      row.push(char)
      if (row.length === 5) {
        matrix.push(row)
        row = []
      }
    }
  }

  return matrix
}

function findPosition(matrix: string[][], char: string): [number, number] {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[i][j] === char) {
        return [i, j]
      }
    }
  }
  return [0, 0]
}

function preparePlaintext(text: string): string[] {
  const clean = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '')
  const pairs: string[] = []
  
  for (let i = 0; i < clean.length; i += 2) {
    const a = clean[i]
    const b = i + 1 < clean.length ? clean[i + 1] : 'X'
    
    if (a === b) {
      pairs.push(a + 'X')
      i--
    } else {
      pairs.push(a + b)
    }
  }
  
  return pairs
}

export function encrypt(text: string, key: string): string {
  if (!key || key.trim() === '') {
    throw new Error('Key cannot be empty')
  }

  const matrix = createPlayfairMatrix(key)
  const pairs = preparePlaintext(text)
  let result = ''

  for (const pair of pairs) {
    const [r1, c1] = findPosition(matrix, pair[0])
    const [r2, c2] = findPosition(matrix, pair[1])

    if (r1 === r2) {
      // Same row
      result += matrix[r1][(c1 + 1) % 5] + matrix[r2][(c2 + 1) % 5]
    } else if (c1 === c2) {
      // Same column
      result += matrix[(r1 + 1) % 5][c1] + matrix[(r2 + 1) % 5][c2]
    } else {
      // Rectangle
      result += matrix[r1][c2] + matrix[r2][c1]
    }
  }

  return result
}

export function decrypt(text: string, key: string): string {
  if (!key || key.trim() === '') {
    throw new Error('Key cannot be empty')
  }

  const matrix = createPlayfairMatrix(key)
  const clean = text.toUpperCase().replace(/[^A-Z]/g, '')
  const pairs: string[] = []
  
  for (let i = 0; i < clean.length; i += 2) {
    if (i + 1 < clean.length) {
      pairs.push(clean[i] + clean[i + 1])
    }
  }

  let result = ''

  for (const pair of pairs) {
    const [r1, c1] = findPosition(matrix, pair[0])
    const [r2, c2] = findPosition(matrix, pair[1])

    if (r1 === r2) {
      // Same row
      result += matrix[r1][(c1 + 4) % 5] + matrix[r2][(c2 + 4) % 5]
    } else if (c1 === c2) {
      // Same column
      result += matrix[(r1 + 4) % 5][c1] + matrix[(r2 + 4) % 5][c2]
    } else {
      // Rectangle
      result += matrix[r1][c2] + matrix[r2][c1]
    }
  }

  return result
}
