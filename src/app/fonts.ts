import {
	// Anton,
	// Bonheur_Royale,
	// Covered_By_Your_Grace,
	EB_Garamond,
	// Economica,
	Elsie,
	// Gothic_A1,
	// IM_Fell_DW_Pica,
	// Italiana,
	// League_Script,
	Lexend,
	// Montez,
	// Mrs_Saint_Delafield,
	Nabla,
	// Permanent_Marker,
	// Playfair_Display,
	// Sassy_Frass,
	// UnifrakturMaguntia,
} from 'next/font/google'
import localFont from 'next/font/local'

//
const elsie = Elsie({
	weight: '900',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-elsie',
})
const lexend = Lexend({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-lexend',
})

// const anton = Anton({
// 	weight: '400',
// 	subsets: ['latin'],
// 	display: 'swap',
// 	variable: '--font-anton',
// })
// //
// const covered_by_your_grace = Covered_By_Your_Grace({
// 	weight: '400',
// 	subsets: ['latin'],
// 	display: 'swap',
// 	variable: '--font-grace',
// })
// //
// const economica = Economica({
// 	weight: '400',
// 	subsets: ['latin'],
// 	display: 'swap',
// 	style: 'italic',
// 	variable: '--font-economica',
// })
// //
// const gothic = Gothic_A1({
// 	weight: '900',
// 	subsets: ['latin'],
// 	display: 'swap',
// 	variable: '--font-gothic',
// })
// //
// const im_fell = IM_Fell_DW_Pica({
// 	weight: '400',
// 	subsets: ['latin'],
// 	display: 'swap',
// 	style: ['normal', 'italic'],
// 	variable: '--font-fell',
// })
// //
// const italiana = Italiana({
// 	weight: '400',
// 	subsets: ['latin'],
// 	display: 'swap',
// 	variable: '--font-italiana',
// })
// //
// const league = League_Script({
// 	weight: '400',
// 	subsets: ['latin'],
// 	display: 'swap',
// 	variable: '--font-league',
// })
// //
// const montez = Montez({
// 	weight: '400',
// 	subsets: ['latin'],
// 	display: 'swap',
// 	variable: '--font-montez',
// })
// //
// const mrs_saint = Mrs_Saint_Delafield({
// 	weight: ['400'],
// 	subsets: ['latin'],
// 	display: 'swap',
// 	variable: '--font-saint',
// })
// //
// const permanent = Permanent_Marker({
// 	weight: '400',
// 	subsets: ['latin'],
// 	display: 'swap',
// 	variable: '--font-permanent',
// })
// //
// const playfair = Playfair_Display({
// 	weight: '400',
// 	subsets: ['latin'],
// 	display: 'swap',
// 	variable: '--font-playfair',
// })
// //
// const unifraktur = UnifrakturMaguntia({
// 	weight: '400',
// 	subsets: ['latin'],
// 	display: 'swap',
// 	variable: '--font-unifraktur',
// })
// const royale = Bonheur_Royale({
// 	weight: '400',
// 	subsets: ['latin'],
// 	display: 'swap',
// 	variable: '--font-royale',
// })
// const sassy = Sassy_Frass({
// 	weight: '400',
// 	subsets: ['latin'],
// 	display: 'swap',
// 	variable: '--font-sassy',
// })

// SHAWN FONT
const nabla = Nabla({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-nabla',
})
const garamond = EB_Garamond({
	weight: '700',
	subsets: ['latin'],
	display: 'swap',
	style: 'italic',
	variable: '--font-garamond',
})

const etBook = localFont({
	variable: '--font-et-book',
	display: 'swap',
	src: [
		{
			path: '../fonts/et-book-roman-line-figures.woff',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../fonts/et-book-display-italic-old-style-figures.woff',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../fonts/et-book-bold-line-figures.woff',
			weight: '700',
			style: 'normal',
		},
	],
})
const scrubs = localFont({
	variable: '--font-scrubs',
	display: 'swap',
	src: [
		{
			path: '../fonts/scrubs.ttf',
			weight: '400',
			style: 'normal',
		},
	],
})

export const fontClasses = `${elsie.variable} ${lexend.variable} ${etBook.variable} ${nabla.variable} ${garamond.variable} ${scrubs.variable}`
// export const fontClasses = `${anton.variable} ${covered_by_your_grace.variable} ${economica.variable} ${elsie.variable} ${gothic.variable} ${im_fell.variable} ${italiana.variable} ${league.variable} ${montez.variable} ${mrs_saint.variable} ${permanent.variable} ${playfair.variable} ${unifraktur.variable} ${etBook.variable} ${nabla.variable} ${lexend.variable} ${garamond.variable} ${royale.variable} ${sassy.variable}`
