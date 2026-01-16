// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from 'next/font/google'
import { ScrollProgressWrapper } from '@/components/ScrollProgressWrapper'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import ToolbarExpandable from '@/components/toolbar'
// import { Suspense } from 'react'

// const geistSans = Geist({
// 	variable: '--font-geist-sans',
// 	subsets: ['latin'],
// })

// const geistMono = Geist_Mono({
// 	variable: '--font-geist-mono',
// 	subsets: ['latin'],
// })

// export const metadata: Metadata = {
//   title: "2025 In Review",
//   description: "A digital version of Madison's 2025 annual letter",
// };

type Props = Readonly<{ children: React.ReactNode }>

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en" suppressHydrationWarning>
			{/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> */}
			<body className="antialiased">
				<ThemeProvider attribute="class">
					<div className="flex flex-col items-center justify-center">
						<ToolbarExpandable />
					</div>
					<ScrollProgressWrapper>
						<div className="px-4 py-10 max-w-3xl mx-auto sm:px-6 sm:py-12 lg:max-w-4xl lg:py-16 lg:px-8 xl:max-w-6xl">{children}</div>
					</ScrollProgressWrapper>
				</ThemeProvider>
				{/* <Suspense fallback={<div>Loading...</div>}>{children}</Suspense> */}
			</body>
		</html>
	)
}
