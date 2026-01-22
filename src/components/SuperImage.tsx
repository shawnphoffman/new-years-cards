import { Children } from 'react'
import { MotionProps, Variants } from 'motion/react'
import * as motion from 'motion/react-client'
import { headers } from 'next/headers'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

type Props = Omit<ImageProps, 'alt'> & { children?: React.ReactNode }

const motionProps: MotionProps = {
	transition: {
		opacity: {
			duration: 1,
			ease: 'easeInOut'
		},
		rotate: {
			type: 'spring',
			bounce: 0
		},
		scale: {
			type: 'spring',
			bounce: 0.5 }
		},
	}
const captionMotionProps: MotionProps = {
	transition: {
		y: {
			type: 'spring',
			bounce: 0,
			visualDuration: 0.25
		},
		scale: {
			type: 'spring',
			bounce: 0.5
		}
	},
}

export default async function SuperImage({ children, src, ...rest }: Props) {
	const headersList = await headers()
	const userAgent = headersList.get('user-agent') || ''
	const isMobile = /Mobile|Android|iPhone/i.test(userAgent)

	const variants: Variants = !isMobile ? {
		initial: {
			scale: 0.95,
			rotate: 1,
			opacity: 0
		},
		whileHover: {
			scale: 1,
			rotate: -1,
		}
	} : {}

	const captionVariants: Variants = !isMobile ? {
		initial: {
			scale: 1,
			opacity: 0
		},
		whileHover: {
			scale: 1,
			opacity: 1,
			y: 0
		}
	} : {}

	const alt = Children.toArray(children).join('')
	return (
		<motion.div
			className="image-container select-none overflow-hidden"
			whileHover="whileHover"
			initial="initial"
			whileInView={{ opacity: 1 }}
			variants={variants}
			{...motionProps}
		>
			<div className="image-bg">
				<Image src={src} {...rest} className={cn('not-prose border-10 dark:border-zinc-200 border-zinc-800', rest.className)} alt={alt} />
			</div>
			{children && (
				<motion.figcaption variants={captionVariants} {...captionMotionProps}>
					{children}
				</motion.figcaption>
			)}
		</motion.div>
	)
}
