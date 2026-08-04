import { describe, expect, it } from 'vitest'
import { amountSanitize } from './amountSanitize'

describe('amountSanitize', () => {
  it('strips non-numeric, non-dot characters', () => {
    expect(amountSanitize('a1b2c3')).toBe('123')
  })

  it('keeps only the first decimal point', () => {
    expect(amountSanitize('1.2.3.4')).toBe('1.23')
  })

  it('truncates to at most 2 digits after the decimal', () => {
    expect(amountSanitize('12.3456')).toBe('12.34')
  })

  it('allows a trailing decimal point while typing', () => {
    expect(amountSanitize('12.')).toBe('12.')
  })

  it('passes plain integers through unchanged', () => {
    expect(amountSanitize('42')).toBe('42')
  })

  it('handles an empty string', () => {
    expect(amountSanitize('')).toBe('')
  })
})
