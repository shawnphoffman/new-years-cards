import { MotionProps, Variants } from 'motion/react'
import * as motion from 'motion/react-client'
import { headers } from 'next/headers'

import { cn } from '@/lib/utils'

type Props = {
	source: React.ComponentProps<'source'>
	children?: React.ReactNode
	video: React.ComponentProps<'video'>
}

const motionProps: MotionProps = {
	transition: {
		opacity: {
			duration: 1,
			ease: 'easeInOut',
		},
		rotate: {
			type: 'spring',
			bounce: 0,
		},
		scale: {
			type: 'spring',
			bounce: 0.5,
		},
	},
}
const captionMotionProps: MotionProps = {
	transition: {
		y: {
			type: 'spring',
			bounce: 0,
			visualDuration: 0.25,
		},
		scale: {
			type: 'spring',
			bounce: 0.5,
		},
	},
}

export default async function SuperImage({ children, source, video }: Props) {
	const headersList = await headers()
	const userAgent = headersList.get('user-agent') || ''
	const isMobile = /Mobile|Android|iPhone/i.test(userAgent)

	const variants: Variants = !isMobile
		? {
				initial: {
					scale: 0.95,
					rotate: 1,
					opacity: 0,
				},
				whileHover: {
					scale: 1,
					rotate: -1,
				},
			}
		: {}

	const captionVariants: Variants = !isMobile
		? {
				initial: {
					scale: 1,
					opacity: 0,
				},
				whileHover: {
					scale: 1,
					opacity: 1,
					y: 0,
				},
			}
		: {}

	return (
		<motion.div
			className="image-container select-none overflow-hidden"
			whileHover="whileHover"
			initial="initial"
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			variants={variants}
			{...motionProps}
		>
			<div className="image-bg">
				<video
					// controls
					preload="none"
					autoPlay
					muted
					loop
					width="768"
					{...video}
					className={cn('not-prose border-10 dark:border-zinc-200 border-zinc-800 w-fit', video.className)}
				>
					<source src={source?.src} type="video/mp4" {...source} />
					Your browser does not support the video tag.
				</video>
				{/* <Image
					src={src}
					{...rest}
					className={cn('not-prose border-10 dark:border-zinc-200 border-zinc-800 w-fit', rest.className)}
					alt={alt}
				/> */}
			</div>
			{children && (
				<motion.figcaption variants={captionVariants} {...captionMotionProps}>
					{children}
				</motion.figcaption>
			)}
		</motion.div>
	)
}
