// Strips input down to digits + one decimal point, max 2 decimal places.
// Applied on every keystroke so the amount field can never hold invalid text.
export function amountSanitize(raw: string): string {
  let value = raw.replace(/[^0-9.]/g, '')

  const firstDot = value.indexOf('.')
  if (firstDot >= 0) {
    value = value.slice(0, firstDot + 1) + value.slice(firstDot + 1).replace(/\./g, '')
  }

  const dot = value.indexOf('.')
  if (dot >= 0 && value.length - dot - 1 > 2) {
    value = value.slice(0, dot + 3)
  }

  return value
}
