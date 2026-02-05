import { Metadata } from 'next'
import Card from '@/markdown/2025/card.mdx'
import { SidenoteProvider } from '@/components/Sidenote'
import Comments from '@/components/Comments'
import Signature from '@/components/signature'

export const metadata: Metadata = {
	title: '2025 In Review',
	description: "A digital version of Madison's 2025 annual letter",
}

// const url = 'at://madisonmsites.com/app.bsky.feed.post/3lkhoze4ngs2g'
// const postUrl = 'https://bsky.app/profile/madisonmsites.com/post/3lkhoze4ngs2g'

const url = process.env.COMMENTS_URL_2025
const postUrl = process.env.COMMENTS_POSTURL_2025

export default function TwentyFive() {
	return (
		<>
			<article className="flex flex-col gap-10 sm:gap-12 lg:gap-20 xl:gap-24 pt-28">
				<h1 className="text-4xl font-bold">2025 In Review</h1>
				<div className="mx-auto w-full">
					<section>
						<SidenoteProvider>
							<Card />
							<Signature />
						</SidenoteProvider>
					</section>
				</div>
			</article>
			{url && postUrl && <Comments url={url} postUrl={postUrl} />}
		</>
	)
}
