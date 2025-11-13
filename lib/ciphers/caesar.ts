// Caesar Cipher - Shift cipher
export function encrypt(text: string, shift: number): string {
  shift = ((shift % 26) + 26) % 26 // Normalize shift
  return text
    .split('')
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0)
        const isUpperCase = code >= 65 && code <= 90
        const base = isUpperCase ? 65 : 97
        return String.fromCharCode(((code - base + shift) % 26) + base)
      }
      return char
    })
    .join('')
}

export function decrypt(text: string, shift: number): string {
  return encrypt(text, -shift)
}
