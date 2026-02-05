import { AppBskyFeedDefs, type AppBskyFeedGetPostThread } from '@atproto/api'
import Link from 'next/link'

import { Comment } from './Comment'
import { Heart, Repeat2 } from 'lucide-react'

async function getPostThread(uri: string) {
	const params = new URLSearchParams({ uri })

	const res = await fetch('https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?' + params.toString(), {
		method: 'GET',
		headers: {
			Accept: 'application/json',
		},
		// cache: 'no-store',
		next: {
			revalidate: 60,
		},
	})

	if (!res.ok) {
		console.error(await res.text())
		return null
	}

	const data = (await res.json()) as AppBskyFeedGetPostThread.OutputSchema

	if (!data || !AppBskyFeedDefs.isThreadViewPost(data.thread)) {
		return null
	}

	return data?.thread
}

export default async function Comments({ url, postUrl }: { url: string; postUrl: string }) {
	const thread = await getPostThread(url)

	if (!thread) {
		return null
	}

	return (
		<>
			<div className="flex flex-row items-center justify-start gap-8">
				<h2 className="my-2!">Comments</h2>
				<div className="flex flex-row gap-4">
					<Link href={postUrl} target="_blank" rel="noreferrer noopener" className="group text-xl hover:no-underline no-underline!">
						<span className="group-hover:text-(--themeaccent) transition-colors	">
							{thread.post.likeCount ?? 0}{' '}
							<span title={`${thread.post.likeCount ?? 0} likes`}>
								<Heart />
							</span>
						</span>
					</Link>
					{/* <>-</> */}
					<Link href={postUrl} target="_blank" rel="noreferrer noopener" className="group text-xl hover:no-underline no-underline!">
						<span className="group-hover:text-(--themeaccent) transition-colors	">
							{thread.post.repostCount ?? 0}{' '}
							<span title={`${thread.post.repostCount ?? 0} reposts`}>
								<Repeat2 />
							</span>
						</span>
					</Link>
				</div>
			</div>

			{!thread.replies || thread.replies.length === 0 ? null : (
				<>
					{/* COMMENTS */}
					{/* <h2 className="text-2xl font-bold text-center text-brand-red">Comments</h2> */}
					<div className="text-base">
						Interact with{' '}
						<Link href={postUrl} className="underline" target="_blank" rel="noreferrer noopener">
							this post on Bluesky
						</Link>{' '}
						and it will appear here!
					</div>
					<div className="w-fit space-y-8">
						{thread.replies
							.filter(AppBskyFeedDefs.isThreadViewPost)
							.sort(sortByLikes)
							.map(reply => {
								if (!AppBskyFeedDefs.isThreadViewPost(reply)) return null
								return <Comment key={reply.post.uri} comment={reply} />
							})}
					</div>
				</>
			)}
		</>
	)
}

const sortByLikes = (a: AppBskyFeedDefs.ThreadViewPost, b: AppBskyFeedDefs.ThreadViewPost) => {
	if (!AppBskyFeedDefs.isThreadViewPost(a) || !AppBskyFeedDefs.isThreadViewPost(b)) {
		// blocked/deleted posts are just ignored, so don't sort
		return 0
	}
	return (b.post.likeCount ?? 0) - (a.post.likeCount ?? 0)
}
