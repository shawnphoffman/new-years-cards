import { ReactNode } from 'react'
import { AppBskyFeedDefs, AppBskyFeedPost, RichText } from '@atproto/api'
import { isImage } from '@atproto/api/dist/client/types/app/bsky/embed/images'
import { MotionProps } from 'motion/react'
import * as motion from 'motion/react-client'
import Link from 'next/link'
import { Forward, Heart, MessageSquare, Repeat2 } from 'lucide-react'

type CommentProps = {
	comment: AppBskyFeedDefs.ThreadViewPost
	isChild?: boolean
}

const linkMotionProps = {
	initial: { scale: 1 },
	whileHover: { scale: 1.5 },
	// whileInView: { opacity: 1, scale: 1 },
	// transition: {
	// 	scale: { type: 'spring', visualDuration: 0.5, bounce: 0.5 },
	// 	// scale: { ease: ['easeIn', 'easeOut'] },
	// },
	// viewport: { amount: 0.8, once: true },
}

export const Comment = ({ comment, isChild = false }: CommentProps) => {
	const author = comment.post.author
	const avatarClassName = 'h-6 w-6 shrink-0 rounded-full bg-(--accent) !w-fit'

	if (!AppBskyFeedPost.isRecord(comment.post.record)) return null

	const motionProps: MotionProps = {
		initial: { opacity: 0, scale: 0 },
		whileHover: { scale: isChild ? 1.01 : 1.05, rotate: isChild ? 1.01 : 1.05 },
		whileInView: { opacity: 1, scale: 1 },
		transition: {
			scale: { type: 'spring', visualDuration: 0.5, bounce: 0.25 },
			// scale: { ease: ['easeIn', 'easeOut'] },
		},
		viewport: { amount: 0.8, once: true },
	}

	const rt = new RichText({
		// @ts-expect-error xxx
		text: comment.post.record.text,
		// @ts-expect-error xxx
		facets: comment.post.record.facets,
	})

	const richText: (ReactNode | string)[] = []

	const hasEmbed = isImage(comment.post.embed)
	// @ts-expect-error xxx
	const commentImage = hasEmbed ? comment.post.embed?.images[0] : null
	// console.log({ commentImage, hasEmbed, embed: JSON.stringify(comment.post.embed, null, 2) })

	let counter = 0
	for (const segment of rt.segments()) {
		// console.log({ segment })
		if (segment.isLink() && segment.link) {
			richText.push(
				<Link key={counter} href={segment.link.uri} target="_blank" rel="noreferrer noopener" className="text-brand-blue hover:bg-squiggle">
					{segment.text}
				</Link>
			)
		} else if (segment.isMention() && segment.mention) {
			richText.push(
				<Link
					key={counter}
					href={`https://bsky.app/profile/${segment.mention.did}`}
					target="_blank"
					rel="noreferrer noopener"
					className="text-brand-blue hover:bg-squiggle"
				>
					{segment.text}
				</Link>
			)
		} else {
			richText.push(segment.text)
		}

		counter++
	}

	const actionsUrl = `https://bsky.app/profile/${author.did}/post/${comment.post.uri.split('/').pop()}`

	return (
		<motion.div
			{...motionProps}
			className={`mt-4 mb-2 text-base p-4 text-black rounded bg-white/15 border-2 border-(--themeforeground)/20 shadow-lg text-pretty ${isChild ? '' : 'backdrop-blur-lg'}`}
		>
			<div className="flex flex-col max-w-xl gap-1">
				{/* AUTHOR */}
				<Link
					className="flex flex-row items-center gap-2 group w-fit text-xl hover:underline! decoration-1! underline-offset-4! no-underline!"
					href={`https://bsky.app/profile/${author.did}`}
					target="_blank"
					rel="noreferrer noopener"
				>
					{author.avatar ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img src={comment.post.author.avatar} alt="avatar" className={avatarClassName} />
					) : (
						<div className={avatarClassName} />
					)}
					<span className="line-clamp-1 group-hover:bg-squiggle">
						{author.displayName ?? author.handle} <span className="text-black/50">@{author.handle}</span>
					</span>
				</Link>

				{/* CONTENT */}
				<span>{richText}</span>

				{/* EMBEDS */}
				{commentImage && (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={(commentImage.thumb as string) ?? ''}
						alt={(commentImage.alt as string) ?? ''}
						className="w-full h-auto max-w-xl rounded-lg"
					/>
				)}

				{/* STATS */}
				<Actions post={comment.post} url={actionsUrl} />
			</div>
			{comment.replies && comment.replies.length > 0 && (
				// <div className="pl-2 ml-2 border-l border-brand-red">
				<div className="ml-2">
					{comment.replies
						.filter(AppBskyFeedDefs.isThreadViewPost)
						.sort(sortByLikes)
						.map(reply => {
							if (!AppBskyFeedDefs.isThreadViewPost(reply)) return null
							return <Comment key={reply.post.uri} comment={reply} isChild />
						})}
				</div>
			)}
		</motion.div>
	)
}

const sortByLikes = (a: AppBskyFeedDefs.ThreadViewPost, b: AppBskyFeedDefs.ThreadViewPost) => {
	if (!AppBskyFeedDefs.isThreadViewPost(a) || !AppBskyFeedDefs.isThreadViewPost(b)) {
		// blocked/deleted posts are just ignored, so don't sort
		return 0
	}
	return (b.post.likeCount ?? 0) - (a.post.likeCount ?? 0)
}

export const Actions = ({ post, url }: { post: AppBskyFeedDefs.PostView; url: string }) => (
	<div className="flex flex-row items-center justify-between w-full max-w-40 text-base text-(--themeaccent)">
		<div className="flex flex-row items-center gap-1.5">
			<MessageSquare />
			<span className="text-base">{post.replyCount ?? 0}</span>
		</div>
		<div className="flex flex-row items-center gap-1.5">
			<Repeat2 />
			<span className="text-base">{post.repostCount ?? 0}</span>
		</div>
		<div className="flex flex-row items-center gap-1.5">
			<Heart />
			<span className="text-base">{post.likeCount ?? 0}</span>
		</div>
		<motion.div {...linkMotionProps}>
			<Link
				href={url}
				target="_blank"
				rel="noreferrer noopener"
				className="flex flex-row items-center gap-1.5 hover:text-(--themeaccent)/50! transition-colors"
			>
				<Forward />
			</Link>
		</motion.div>
	</div>
)
