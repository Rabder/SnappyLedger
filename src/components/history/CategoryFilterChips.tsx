import type { Category } from '../../types'
import styles from './CategoryFilterChips.module.css'

interface CategoryFilterChipsProps {
  categories: Category[]
  selected: string | 'all'
  onSelect: (value: string | 'all') => void
}

export function CategoryFilterChips({ categories, selected, onSelect }: CategoryFilterChipsProps) {
  return (
    <div className={styles.row}>
      <button
        type="button"
        onClick={() => onSelect('all')}
        className={selected === 'all' ? `${styles.chip} ${styles.chipSelected}` : styles.chip}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelect(category.id)}
          className={
            selected === category.id ? `${styles.chip} ${styles.chipSelected}` : styles.chip
          }
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
