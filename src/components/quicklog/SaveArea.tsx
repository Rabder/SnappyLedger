import { useRef, useState, type PointerEvent } from 'react'
import styles from './SaveArea.module.css'

interface SaveAreaProps {
  isValid: boolean
  helperText: string
  isInvalidAttempt: boolean
  onSave: () => void
}

const DRAG_MIN = -90
const DRAG_SAVE_THRESHOLD = -55

export function SaveArea({ isValid, helperText, isInvalidAttempt, onSave }: SaveAreaProps) {
  const [dragging, setDragging] = useState(false)
  const [dragY, setDragY] = useState(0)
  const dragStartY = useRef(0)

  // Pointer handlers live only on the grip handle below, never on the "Log
  // it" button or a shared wrapper — sharing pointer capture between drag
  // and tap is what silently broke plain clicks in the original prototype.
  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
    dragStartY.current = event.clientY
    setDragging(true)
    setDragY(0)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragging) return
    const delta = event.clientY - dragStartY.current
    setDragY(Math.max(DRAG_MIN, Math.min(0, delta)))
  }

  function handlePointerUp() {
    const shouldSave = dragging && dragY <= DRAG_SAVE_THRESHOLD
    setDragging(false)
    setDragY(0)
    if (shouldSave) onSave()
  }

  return (
    <div
      className={styles.area}
      style={{
        transform: `translateY(${dragY}px)`,
        transition: dragging ? 'none' : 'transform 0.25s cubic-bezier(0.32, 0.72, 0, 1)',
      }}
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={styles.grip}
      >
        <div className={styles.gripHandle} />
      </div>
      <button
        type="button"
        onClick={onSave}
        className={isValid ? styles.saveButton : `${styles.saveButton} ${styles.saveButtonDimmed}`}
      >
        Log it
      </button>
      <div className={isInvalidAttempt ? `${styles.helper} ${styles.helperError}` : styles.helper}>
        {helperText}
      </div>
    </div>
  )
}
