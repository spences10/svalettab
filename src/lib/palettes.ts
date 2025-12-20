export interface Palette {
	name: string;
	colors: [string, string, string, string, string];
	author?: string;
}

export const palettes: Palette[] = [
	// Warm & Earthy
	{
		name: 'Sunset Boulevard',
		colors: ['#F7374A', '#FF6B35', '#FF9F1C', '#FFBF69', '#CBF3F0'],
		author: 'colorhunt',
	},
	{
		name: 'Desert Sand',
		colors: ['#D4A574', '#C4956A', '#A67C52', '#8B5E3C', '#6B4423'],
	},
	{
		name: 'Terracotta Dreams',
		colors: ['#E07A5F', '#F2CC8F', '#81B29A', '#3D405B', '#F4F1DE'],
	},
	{
		name: 'Autumn Harvest',
		colors: ['#BC6C25', '#DDA15E', '#FEFAE0', '#606C38', '#283618'],
	},
	{
		name: 'Warm Neutrals',
		colors: ['#F5F5DC', '#E8DCC4', '#C9B99A', '#A69076', '#8B7355'],
	},

	// Cool & Calm
	{
		name: 'Ocean Breeze',
		colors: ['#0077B6', '#00B4D8', '#90E0EF', '#CAF0F8', '#03045E'],
	},
	{
		name: 'Nordic Frost',
		colors: ['#E8F1F2', '#B8DBD9', '#6B9080', '#586F6B', '#2D3A3A'],
	},
	{
		name: 'Midnight Blue',
		colors: ['#10002B', '#240046', '#3C096C', '#5A189A', '#7B2CBF'],
	},
	{
		name: 'Arctic Sky',
		colors: ['#CAD2C5', '#84A98C', '#52796F', '#354F52', '#2F3E46'],
	},
	{
		name: 'Lavender Fields',
		colors: ['#E0B1CB', '#BE95C4', '#9F86C0', '#5E548E', '#231942'],
	},

	// Vibrant & Bold
	{
		name: 'Neon Nights',
		colors: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'],
	},
	{
		name: 'Candy Pop',
		colors: ['#FF69B4', '#FF1493', '#C71585', '#DB7093', '#FFB6C1'],
	},
	{
		name: 'Electric Dreams',
		colors: ['#7400B8', '#6930C3', '#5E60CE', '#5390D9', '#4EA8DE'],
	},
	{
		name: 'Tropical Punch',
		colors: ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'],
	},
	{
		name: 'Retro Wave',
		colors: ['#2E0249', '#570A57', '#A91079', '#F806CC', '#FFC0CB'],
	},

	// Monochromatic
	{
		name: 'Fifty Shades',
		colors: ['#212529', '#495057', '#6C757D', '#ADB5BD', '#DEE2E6'],
	},
	{
		name: 'Blue Monday',
		colors: ['#03045E', '#023E8A', '#0077B6', '#0096C7', '#48CAE4'],
	},
	{
		name: 'Forest Green',
		colors: ['#1B4332', '#2D6A4F', '#40916C', '#52B788', '#74C69D'],
	},
	{
		name: 'Rose Garden',
		colors: ['#590D22', '#800F2F', '#A4133C', '#C9184A', '#FF4D6D'],
	},
	{
		name: 'Golden Hour',
		colors: ['#7F5539', '#9C6644', '#B08968', '#C5A880', '#DDB892'],
	},

	// Pastel & Soft
	{
		name: 'Cotton Candy',
		colors: ['#FFDDD2', '#FFE5EC', '#FFC8DD', '#FFAFCC', '#BDE0FE'],
	},
	{
		name: 'Spring Blossom',
		colors: ['#F8F9FA', '#FFE5EC', '#FFDDD2', '#E8E8E4', '#D8E2DC'],
	},
	{
		name: 'Soft Serve',
		colors: ['#FEC5BB', '#FCD5CE', '#FAE1DD', '#F8EDEB', '#E8E8E4'],
	},
	{
		name: 'Dreamy Pastels',
		colors: ['#CDB4DB', '#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF'],
	},
	{
		name: 'Muted Rainbow',
		colors: ['#F4A261', '#E9C46A', '#2A9D8F', '#264653', '#E76F51'],
	},

	// Dark & Dramatic
	{
		name: 'Charcoal Ember',
		colors: ['#1A1A1D', '#4E4E50', '#6F2232', '#950740', '#C3073F'],
	},
	{
		name: 'Obsidian Night',
		colors: ['#0D0D0D', '#1A1A2E', '#16213E', '#0F3460', '#E94560'],
	},
	{
		name: 'Dark Academia',
		colors: ['#2B2B2B', '#3C3C3C', '#5C4033', '#8B7355', '#D4C5B9'],
	},
	{
		name: 'Moody Blues',
		colors: ['#1B263B', '#2D3748', '#3D5A80', '#5F7A9D', '#98C1D9'],
	},
	{
		name: 'Gothic Romance',
		colors: ['#1E1E24', '#92140C', '#6C0E0E', '#5A0101', '#FFF8F0'],
	},

	// Nature Inspired
	{
		name: 'Rainforest',
		colors: ['#004B23', '#006400', '#007200', '#008000', '#38B000'],
	},
	{
		name: 'Cherry Blossom',
		colors: ['#FFB7C5', '#FF87AB', '#FF5E8A', '#E84A5F', '#2A363B'],
	},
	{
		name: 'Beach Day',
		colors: ['#05668D', '#028090', '#00A896', '#02C39A', '#F0F3BD'],
	},
	{
		name: 'Mountain Mist',
		colors: ['#8ECAE6', '#98C1D9', '#A8DADC', '#B8D4E3', '#E8F4F8'],
	},
	{
		name: 'Wildflower',
		colors: ['#606C38', '#6B705C', '#A68A64', '#DDA15E', '#BC6C25'],
	},

	// Modern & Minimal
	{
		name: 'Swiss Design',
		colors: ['#FFFFFF', '#F0F0F0', '#CCCCCC', '#333333', '#E63946'],
	},
	{
		name: 'Monochrome Plus',
		colors: ['#000000', '#FFFFFF', '#F5F5F5', '#333333', '#FF3366'],
	},
	{
		name: 'Bauhaus',
		colors: ['#F2EE1C', '#EF3D2B', '#1969AF', '#FFFFFF', '#000000'],
	},
	{
		name: 'Memphis',
		colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181'],
	},
	{
		name: 'Material You',
		colors: ['#6750A4', '#D0BCFF', '#EADDFF', '#1C1B1F', '#E6E1E5'],
	},

	// Sunset & Sunrise
	{
		name: 'California Sunset',
		colors: ['#FF6B35', '#F7C59F', '#EFEFD0', '#004E89', '#1A659E'],
	},
	{
		name: 'Mango Tango',
		colors: ['#FF6F61', '#FFB347', '#FFD700', '#FF8C00', '#FF4500'],
	},
	{
		name: 'Dusk',
		colors: ['#2B2D42', '#5C5D8A', '#8D99AE', '#EDF2F4', '#EF233C'],
	},
	{
		name: 'Dawn',
		colors: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'],
	},
	{
		name: 'Purple Rain',
		colors: ['#3D0066', '#7A0099', '#B300CC', '#E600FF', '#FF33FF'],
	},

	// Tech & Cyber
	{
		name: 'Matrix',
		colors: ['#000000', '#003300', '#006600', '#00CC00', '#00FF00'],
	},
	{
		name: 'Cyberpunk',
		colors: ['#0D0D0D', '#1A1A2E', '#FF0055', '#00FFFF', '#FFFF00'],
	},
	{
		name: 'Synthwave',
		colors: ['#2B1055', '#7597DE', '#FF0076', '#FFE100', '#21D19F'],
	},
	{
		name: 'Terminal',
		colors: ['#282C34', '#ABB2BF', '#98C379', '#E06C75', '#61AFEF'],
	},
	{
		name: 'Hacker',
		colors: ['#0D0208', '#003B00', '#008F11', '#00FF41', '#00FF00'],
	},
];

export function getRandomPalette(): Palette {
	return palettes[Math.floor(Math.random() * palettes.length)];
}
