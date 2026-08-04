import { CategoryIcon } from '../shared/CategoryIcon'
import type { Category } from '../../types'
import styles from './CategoryTile.module.css'

interface CategoryTileProps {
  category: Category
  selected: boolean
  onSelect: () => void
}

export function CategoryTile({ category, selected, onSelect }: CategoryTileProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={selected ? `${styles.tile} ${styles.selected}` : styles.tile}
    >
      <CategoryIcon category={category} size={72} />
      <span className={styles.label}>{category.name}</span>
    </button>
  )
}
