// One-Time Pad - Theoretically unbreakable cipher
export function encrypt(text: string, key: string): string {
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '')
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '')

  if (cleanKey.length < cleanText.length) {
    throw new Error('Key must be at least as long as the plaintext')
  }

  let result = ''
  for (let i = 0; i < cleanText.length; i++) {
    const textChar = cleanText.charCodeAt(i) - 65
    const keyChar = cleanKey.charCodeAt(i) - 65
    const encrypted = (textChar + keyChar) % 26
    result += String.fromCharCode(encrypted + 65)
  }

  return result
}

export function decrypt(text: string, key: string): string {
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '')
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '')

  if (cleanKey.length < cleanText.length) {
    throw new Error('Key must be at least as long as the ciphertext')
  }

  let result = ''
  for (let i = 0; i < cleanText.length; i++) {
    const textChar = cleanText.charCodeAt(i) - 65
    const keyChar = cleanKey.charCodeAt(i) - 65
    const decrypted = (textChar - keyChar + 26) % 26
    result += String.fromCharCode(decrypted + 65)
  }

  return result
}
