import { categoryStyle, getCategoryTheme } from '../../lib/categoryTheme'

export function Badge({ category }: { category: string }) {
  const theme = getCategoryTheme(category)
  return (
    <span className="cat-tag" style={categoryStyle(category)}>
      {theme.label}
    </span>
  )
}
