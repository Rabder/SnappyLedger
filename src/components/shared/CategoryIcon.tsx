import type { Category } from '../../types'

interface CategoryIconProps {
  category: Category
  size?: number
}

export function CategoryIcon({ category, size = 44 }: CategoryIconProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 'var(--radius-md)',
        background: hexToRgba(category.color, 0.18),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <img
        src={`/category-icons/${category.icon}`}
        alt=""
        width={size * 0.55}
        height={size * 0.55}
      />
    </div>
  )
}

function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace('#', '')
  const r = parseInt(value.substring(0, 2), 16)
  const g = parseInt(value.substring(2, 4), 16)
  const b = parseInt(value.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
