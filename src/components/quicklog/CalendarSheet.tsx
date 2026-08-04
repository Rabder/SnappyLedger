import { useEffect, useState } from 'react'
import { MONTHS, sameDay, stripTime } from '../../utils/date'
import styles from './CalendarSheet.module.css'

interface CalendarSheetProps {
  open: boolean
  selectedDate: Date
  onSelectDate: (date: Date) => void
  onClose: () => void
}

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

interface CalendarCell {
  day: number
  disabled: boolean
  selected: boolean
}

function buildCalendarCells(
  viewYear: number,
  viewMonth: number,
  selectedDate: Date,
): (CalendarCell | null)[] {
  const startWeekday = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const today = stripTime(new Date())

  const cells: (CalendarCell | null)[] = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let day = 1; day <= daysInMonth; day++) {
    const cellDate = new Date(viewYear, viewMonth, day)
    cells.push({
      day,
      disabled: cellDate > today,
      selected: sameDay(cellDate, selectedDate),
    })
  }
  // Always pad to a fixed 6 rows (42 cells) so the sheet's height stays
  // constant across months instead of jumping between 5-row and 6-row layouts.
  while (cells.length < 42) cells.push(null)
  return cells
}

export function CalendarSheet({ open, selectedDate, onSelectDate, onClose }: CalendarSheetProps) {
  const [view, setView] = useState(() => ({
    year: selectedDate.getFullYear(),
    month: selectedDate.getMonth(),
  }))

  // Every time the sheet opens, jump the visible month back to whatever's
  // currently selected — otherwise it'd stay wherever you last navigated to.
  useEffect(() => {
    if (open) {
      setView({ year: selectedDate.getFullYear(), month: selectedDate.getMonth() })
    }
  }, [open, selectedDate])

  const today = new Date()
  const nextDisabled = view.year === today.getFullYear() && view.month === today.getMonth()

  function goToPrevMonth() {
    setView((v) => {
      const month = v.month - 1
      return month < 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month }
    })
  }

  function goToNextMonth() {
    setView((v) => {
      if (v.year === today.getFullYear() && v.month === today.getMonth()) return v
      const month = v.month + 1
      return month > 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month }
    })
  }

  function selectDay(day: number) {
    onSelectDate(new Date(view.year, view.month, day))
    onClose()
  }

  function selectToday() {
    onSelectDate(stripTime(new Date()))
    onClose()
  }

  function selectYesterday() {
    const yesterday = stripTime(new Date())
    yesterday.setDate(yesterday.getDate() - 1)
    onSelectDate(yesterday)
    onClose()
  }

  return (
    <>
      {open && <div onClick={onClose} className={styles.backdrop} />}

      <div className={open ? `${styles.sheet} ${styles.sheetOpen}` : styles.sheet}>
        <div className={styles.grabHandle} />

        <div className={styles.monthNav}>
          <button
            type="button"
            onClick={goToPrevMonth}
            className={styles.navButton}
            aria-label="Previous month"
          >
            ‹
          </button>
          <span className={styles.monthLabel}>
            {MONTHS[view.month]} {view.year}
          </span>
          <button
            type="button"
            onClick={goToNextMonth}
            disabled={nextDisabled}
            className={nextDisabled ? `${styles.navButton} ${styles.navButtonDisabled}` : styles.navButton}
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        <div className={styles.quickSelect}>
          <button type="button" onClick={selectToday} className={styles.quickButton}>
            Today
          </button>
          <button type="button" onClick={selectYesterday} className={styles.quickButton}>
            Yesterday
          </button>
        </div>

        <div className={styles.grid}>
          {WEEKDAY_LABELS.map((label, index) => (
            <span key={index} className={styles.weekdayLabel}>
              {label}
            </span>
          ))}
          {buildCalendarCells(view.year, view.month, selectedDate).map((cell, index) =>
            cell === null ? (
              <span key={index} className={styles.emptyCell} />
            ) : (
              <button
                key={index}
                type="button"
                disabled={cell.disabled}
                onClick={() => selectDay(cell.day)}
                className={
                  cell.selected
                    ? `${styles.dayCell} ${styles.dayCellSelected}`
                    : cell.disabled
                      ? `${styles.dayCell} ${styles.dayCellDisabled}`
                      : styles.dayCell
                }
              >
                {cell.day}
              </button>
            ),
          )}
        </div>

        <button type="button" onClick={onClose} className={styles.doneButton}>
          Done
        </button>
      </div>
    </>
  )
}
