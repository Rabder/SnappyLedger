import styles from './NoteInput.module.css'

interface NoteInputProps {
  value: string
  onChange: (value: string) => void
}

export function NoteInput({ value, onChange }: NoteInputProps) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Add a note (optional)"
      className={styles.input}
    />
  )
}
