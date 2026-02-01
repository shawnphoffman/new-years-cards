import { MotionProps, Variants } from 'motion/react'
import * as motion from 'motion/react-client'
import { headers } from 'next/headers'
import { list } from '@vercel/blob'

import { AutoplayVideo } from '@/components/old/AutoplayVideo'

type Props = {
	fileName: string
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

export default async function SuperBlob2({ children, fileName }: Props) {
	const headersList = await headers()
	const userAgent = headersList.get('user-agent') || ''
	const isMobile = /Mobile|Android|iPhone/i.test(userAgent)

  const { blobs } = await list({
    prefix: fileName,
    limit: 10,
		token: process.env.SHAWN_BLOB_READ_WRITE_TOKEN,
  })
  const { url } = blobs[0]

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
				<AutoplayVideo source={{ src: url, type: 'video/mp4' }} />
			</div>
			{children && (
				<motion.figcaption variants={captionVariants} {...captionMotionProps}>
					{children}
				</motion.figcaption>
			)}
		</motion.div>
	)
}
