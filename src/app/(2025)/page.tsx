import { Metadata } from 'next'
import Card from '@/markdown/2025/card.mdx'
import { SidenoteProvider } from '@/components/Sidenote'

export const metadata: Metadata = {
	title: '2025 In Review',
	description: "A digital version of Madison's 2025 annual letter",
}

export default function TwentyFive() {
	return (
		<article className="flex flex-col gap-10 sm:gap-12 lg:gap-20 xl:gap-24 pt-28">
			<h1 className="text-4xl font-bold">2025 In Review</h1>
			{/* <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert mx-auto"> */}
			<div className=" mx-auto">
				<section>
					<SidenoteProvider>
						<Card />
					</SidenoteProvider>
				</section>
			</div>
		</article>
	)
}
