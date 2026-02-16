import { Metadata } from 'next'
import Card from '@/markdown/2025/card.mdx'
import Sidenote, { SidenoteProvider } from '@/components/Sidenote'
import Comments from '@/components/Comments'
import Signature from '@/components/signature'

export const metadata: Metadata = {
	title: '2025 In Review - MadiShawn Letter',
	description: "A digital version of Madison & Shawn's 2025 annual letter. Written by Madison. Annotated by Shawn.",
}

// const url = 'at://madisonmsites.com/app.bsky.feed.post/3lkhoze4ngs2g'
// const postUrl = 'https://bsky.app/profile/madisonmsites.com/post/3lkhoze4ngs2g'

const url = process.env.COMMENTS_URL_2025
const postUrl = process.env.COMMENTS_POSTURL_2025

export default function TwentyFive() {
	return (
		<>
			<article className="flex flex-col gap-10 sm:gap-12 lg:gap-20 xl:gap-24 pt-18">
				<h1 className="text-4xl font-bold">2025 In Review</h1>
				<div className="mx-auto w-full">
					<section>
						<SidenoteProvider>
							<Card />
							<Signature />
							<div className="clear-both fullwidth pt-4">
								<h3>Additional Notes</h3>
								<p>All four of the letter printouts.</p>
							</div>
							<section className="fullwidth  flex flex-col">
								<Sidenote head="cox">
									Here’s what happened: Madison’s healing from surgery, Shawn becomes a one-man support staff, and the annual letter goes
									digital because paper-folding is not a sport anyone needs right now. You want the details? Scan the QR. You’ll get photos,
									links, and Shawn narrating like he’s on rounds. Also, ten years together. Impressive. Don’t let it go to your heads. And
									yes, the cats “signed” their own card. Of course they did.
								</Sidenote>
								<Sidenote head="jd">
									So I opened this envelope and immediately thought: “Aw, cute.” And then I learned Shawn lettered all of them while Madison
									is healing from surgery, and I thought: “Oh no, it’s a love story.” Also, they hit 10 years. That’s, like, a whole decade
									of teamwork. Scan the QR for the full digital letter (+ Shawn’s commentary). The cats also “signed” their own card. Yes,
									really.
								</Sidenote>
								<Sidenote head="elliot">
									Hi! Okay! Quick briefing! There’s no printed letter because Madison is recovering from surgery, but the QR takes you to
									the actual full story (extra photos, links, and Shawn’s commentary—which, honestly, is very good). Also: they just hit 10
									years, which is adorable and frankly suspicious. And yes, the cats have their own card again. Yes, they “signed” it. Shawn
									assisted.
								</Sidenote>
								<Sidenote head="janitor">
									You’ve been issued one (1) insert. Read it. No printed letter because surgery recovery. QR contains the full digital
									letter. Don’t make me say it twice. Shawn lettered the envelopes and helped the cats sign their own card, which is… a
									choice. Also: ten years together. Huh. Scan the QR. And wash your hands.
								</Sidenote>
							</section>
						</SidenoteProvider>
					</section>
				</div>
			</article>
			{url && postUrl && <Comments url={url} postUrl={postUrl} />}
		</>
	)
}
