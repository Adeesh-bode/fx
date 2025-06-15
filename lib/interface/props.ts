import { ProductDataI } from "./shared"

interface ProductCardProps {
	cardIndex: number
	angle: number
	color: string
	hoverIndex: number | null
	setHoveredIndex: () => void
	clearHoveredIndex: () => void
	data: ProductDataI
}

export type { ProductCardProps }