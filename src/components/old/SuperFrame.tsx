import { MotionProps, Variants } from 'motion/react'
import * as motion from 'motion/react-client'
import { headers } from 'next/headers'

import { cn } from '@/lib/utils'

type Props = React.ComponentProps<'iframe'> & {
	children?: React.ReactNode
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

export default async function SuperFrame({ children, ...frame }: Props) {
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
			className="image-container select-none overflow-hidden h-full"
			whileHover="whileHover"
			initial="initial"
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			variants={variants}
			{...motionProps}
		>
			<div className="image-bg min-w-96 items-center justify-center h-full flex">
				<iframe
					// @ts-expect-error - autoPlay is not a valid attribute for iframe
					autoPlay
					// muted
					loop
					playsInline
					width="768"
					height="480"
					{...frame}
					className={cn('not-prose ', frame.className || '')}
				/>
			</div>
			{children && (
				<motion.figcaption variants={captionVariants} {...captionMotionProps}>
					{children}
				</motion.figcaption>
			)}
		</motion.div>
	)
}
