// Hill Cipher - Matrix-based encryption (2x2 matrix)
type Matrix2x2 = [[number, number], [number, number]]

function parseKey(key: string): Matrix2x2 {
  const numbers = key.split(',').map(n => parseInt(n.trim()))
  if (numbers.length !== 4) {
    throw new Error('Key must be 4 numbers separated by commas (e.g., "3,3,2,5")')
  }
  if (numbers.some(isNaN)) {
    throw new Error('All key values must be valid numbers')
  }
  return [[numbers[0], numbers[1]], [numbers[2], numbers[3]]]
}

function determinant(matrix: Matrix2x2): number {
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
}

function modInverse(a: number, m: number): number {
  a = ((a % m) + m) % m
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x
  }
  throw new Error('Modular inverse does not exist')
}

function inverseMatrix(matrix: Matrix2x2): Matrix2x2 {
  const det = determinant(matrix)
  const detInv = modInverse(det, 26)
  
  return [
    [(matrix[1][1] * detInv) % 26, (-matrix[0][1] * detInv + 26) % 26],
    [(-matrix[1][0] * detInv + 26) % 26, (matrix[0][0] * detInv) % 26]
  ]
}

function multiplyMatrix(matrix: Matrix2x2, vector: [number, number]): [number, number] {
  return [
    (matrix[0][0] * vector[0] + matrix[0][1] * vector[1]) % 26,
    (matrix[1][0] * vector[0] + matrix[1][1] * vector[1]) % 26
  ]
}

export function encrypt(text: string, key: string): string {
  const matrix = parseKey(key)
  const det = determinant(matrix)
  
  if (det % 2 === 0 || det % 13 === 0) {
    throw new Error('Invalid key: determinant must be coprime with 26')
  }

  const clean = text.toUpperCase().replace(/[^A-Z]/g, '')
  let result = ''

  for (let i = 0; i < clean.length; i += 2) {
    const a = clean.charCodeAt(i) - 65
    const b = i + 1 < clean.length ? clean.charCodeAt(i + 1) - 65 : 23 // X if odd length
    
    const encrypted = multiplyMatrix(matrix, [a, b])
    result += String.fromCharCode(encrypted[0] + 65) + String.fromCharCode(encrypted[1] + 65)
  }

  return result
}

export function decrypt(text: string, key: string): string {
  const matrix = parseKey(key)
  const det = determinant(matrix)
  
  if (det % 2 === 0 || det % 13 === 0) {
    throw new Error('Invalid key: determinant must be coprime with 26')
  }

  const invMatrix = inverseMatrix(matrix)
  const clean = text.toUpperCase().replace(/[^A-Z]/g, '')
  let result = ''

  for (let i = 0; i < clean.length; i += 2) {
    if (i + 1 < clean.length) {
      const a = clean.charCodeAt(i) - 65
      const b = clean.charCodeAt(i + 1) - 65
      
      const decrypted = multiplyMatrix(invMatrix, [a, b])
      result += String.fromCharCode(decrypted[0] + 65) + String.fromCharCode(decrypted[1] + 65)
    }
  }

  return result
}
