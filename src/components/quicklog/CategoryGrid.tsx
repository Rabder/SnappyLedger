import type { Category } from '../../types'
import { CategoryTile } from './CategoryTile'
import styles from './CategoryGrid.module.css'

interface CategoryGridProps {
  categories: Category[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  shake?: boolean
}

export function CategoryGrid({ categories, selectedId, onSelect, shake }: CategoryGridProps) {
  return (
    <div className={shake ? `${styles.grid} ${styles.shake}` : styles.grid}>
      {categories.map((category) => (
        <CategoryTile
          key={category.id}
          category={category}
          selected={category.id === selectedId}
          onSelect={() => onSelect(selectedId === category.id ? null : category.id)}
        />
      ))}
    </div>
  )
}
