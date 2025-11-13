// Monoalphabetic Cipher - Substitution with custom key
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function encrypt(text: string, key: string): string {
  if (key.length !== 26) {
    throw new Error('Key must be exactly 26 characters')
  }
  
  const upperKey = key.toUpperCase()
  const uniqueChars = new Set(upperKey)
  
  if (uniqueChars.size !== 26) {
    throw new Error('Key must contain all 26 unique letters')
  }

  return text
    .split('')
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase()
        const index = ALPHABET.indexOf(char.toUpperCase())
        const encrypted = upperKey[index]
        return isUpperCase ? encrypted : encrypted.toLowerCase()
      }
      return char
    })
    .join('')
}

export function decrypt(text: string, key: string): string {
  if (key.length !== 26) {
    throw new Error('Key must be exactly 26 characters')
  }

  const upperKey = key.toUpperCase()
  
  return text
    .split('')
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase()
        const index = upperKey.indexOf(char.toUpperCase())
        if (index === -1) return char
        const decrypted = ALPHABET[index]
        return isUpperCase ? decrypted : decrypted.toLowerCase()
      }
      return char
    })
    .join('')
}
