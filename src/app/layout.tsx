import { ScrollProgressWrapper } from '@/components/ScrollProgressWrapper'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import ToolbarExpandable from '@/components/toolbar'

import { fontClasses } from './fonts'

type Props = Readonly<{ children: React.ReactNode }>

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`antialiased ${fontClasses} overflow-x-hidden w-full scroll-smooth`}>
				<ThemeProvider attribute="class">
					<div className="flex flex-col items-center justify-center">
						<ToolbarExpandable />
					</div>
					<ScrollProgressWrapper>
						{/* <div className="px-4 py-10 max-w-3xl mx-auto sm:px-6 sm:py-12 lg:max-w-4xl lg:py-16 lg:px-8 xl:max-w-6xl">{children}</div> */}
						<main>{children}</main>
					</ScrollProgressWrapper>
				</ThemeProvider>
			</body>
		</html>
	)
}
