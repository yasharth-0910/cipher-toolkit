// Vigenère Cipher - Polyalphabetic substitution
export function encrypt(text: string, key: string): string {
  if (!key || key.trim() === '') {
    throw new Error('Key cannot be empty')
  }

  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '')
  if (cleanKey.length === 0) {
    throw new Error('Key must contain at least one letter')
  }

  let keyIndex = 0
  return text
    .split('')
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase()
        const base = isUpperCase ? 65 : 97
        const charCode = char.toUpperCase().charCodeAt(0) - 65
        const keyCode = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65
        const encrypted = ((charCode + keyCode) % 26) + base
        keyIndex++
        return String.fromCharCode(encrypted)
      }
      return char
    })
    .join('')
}

export function decrypt(text: string, key: string): string {
  if (!key || key.trim() === '') {
    throw new Error('Key cannot be empty')
  }

  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '')
  if (cleanKey.length === 0) {
    throw new Error('Key must contain at least one letter')
  }

  let keyIndex = 0
  return text
    .split('')
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase()
        const base = isUpperCase ? 65 : 97
        const charCode = char.toUpperCase().charCodeAt(0) - 65
        const keyCode = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65
        const decrypted = ((charCode - keyCode + 26) % 26) + base
        keyIndex++
        return String.fromCharCode(decrypted)
      }
      return char
    })
    .join('')
}
