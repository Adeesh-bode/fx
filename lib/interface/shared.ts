interface ProductDataI {
	name: string
	description: string
	imagePath: string
	color: string
	redirectionPath: string
}


interface ProductCardI {
	id: string
	cardIndex: number
	angle: number
	data: ProductDataI
}

// export interface ProductDataI;

export type { ProductCardI , ProductDataI };