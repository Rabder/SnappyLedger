import { useEffect, useRef, useState } from 'react'
import { useCategories } from '../../hooks/useCategories'
import { amountSanitize } from '../../utils/amountSanitize'
import { DatePill } from './DatePill'
import { AmountCard } from './AmountCard'
import { CategoryGrid } from './CategoryGrid'
import { NoteInput } from './NoteInput'
import { SaveArea } from './SaveArea'
import { CalendarSheet } from './CalendarSheet'
import { SuccessOverlay } from './SuccessOverlay'
import { BottomTabBar } from '../layout/BottomTabBar'
import styles from './QuickLogScreen.module.css'

export function QuickLogScreen() {
  const { categories } = useCategories()
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [date, setDate] = useState(() => new Date())
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [shakeAmount, setShakeAmount] = useState(false)
  const [shakeCategory, setShakeCategory] = useState(false)
  const [saved, setSaved] = useState(false)
  const shakeTimers = useRef<number[]>([])

  useEffect(() => {
    const timers = shakeTimers.current
    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])

  function triggerShake(setShake: (value: boolean) => void) {
    setShake(true)
    const id = window.setTimeout(() => setShake(false), 420)
    shakeTimers.current.push(id)
  }

  const validAmount = parseFloat(amount) > 0
  const isValid = validAmount && categoryId !== null
  const isInvalidAttempt = shakeAmount || shakeCategory
  const helperText = isValid
    ? 'swipe up or tap to log'
    : !validAmount && !categoryId
      ? 'Enter an amount and pick a category'
      : !validAmount
        ? 'Enter an amount'
        : 'Pick a category'

  function resetForm() {
    setAmount('')
    setCategoryId(null)
    setNote('')
    setDate(new Date())
    setSaved(false)
    setCalendarOpen(false)
  }

  function attemptSave() {
    if (!validAmount) triggerShake(setShakeAmount)
    if (!categoryId) triggerShake(setShakeCategory)
    if (!validAmount || !categoryId) return
    setSaved(true)
  }

  const selectedCategory = categories.find((category) => category.id === categoryId)

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.title}>New expense</span>
          <button
            type="button"
            onClick={resetForm}
            className={styles.closeButton}
            aria-label="Close"
          >
            <span className={styles.closeLineA} />
            <span className={styles.closeLineB} />
          </button>
        </div>

        <DatePill date={date} onClick={() => setCalendarOpen(true)} />
        <AmountCard
          value={amount}
          onChange={(raw) => setAmount(amountSanitize(raw))}
          shake={shakeAmount}
        />
        <CategoryGrid
          categories={categories}
          selectedId={categoryId}
          onSelect={setCategoryId}
          shake={shakeCategory}
        />
        <NoteInput value={note} onChange={setNote} />
      </div>

      <div className={styles.spacer} />

      <SaveArea
        isValid={isValid}
        helperText={helperText}
        isInvalidAttempt={isInvalidAttempt}
        onSave={attemptSave}
      />
      <BottomTabBar active="log" />

      <CalendarSheet
        open={calendarOpen}
        selectedDate={date}
        onSelectDate={setDate}
        onClose={() => setCalendarOpen(false)}
      />

      {saved && (
        <SuccessOverlay
          amount={parseFloat(amount) || 0}
          category={selectedCategory}
          onLogAnother={resetForm}
        />
      )}
    </div>
  )
}
