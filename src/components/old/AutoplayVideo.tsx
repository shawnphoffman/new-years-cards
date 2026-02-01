'use client'

import { useInView } from 'motion/react'
import { useRef, useEffect, type ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type AutoplayVideoProps = {
	source: ComponentProps<'source'>
	video?: ComponentProps<'video'>
	className?: string
}

/**
 * Client-side video wrapper that triggers play() when in view.
 * Required for reliable autoplay on Firefox mobile and other strict browsers.
 */
export function AutoplayVideo({ source, video = {}, className }: AutoplayVideoProps) {
	const ref = useRef<HTMLVideoElement>(null)
	const isInView = useInView(ref, { amount: 0.5, once: true })

	useEffect(() => {
		const el = ref.current
		if (!el || !isInView) return
		const p = el.play()
		if (p?.catch) p.catch(() => {})
	}, [isInView])

	return (
		<video
			ref={ref}
			preload="metadata"
			autoPlay
			muted
			loop
			playsInline
			width="768"
			{...video}
			className={cn('not-prose border-10 dark:border-zinc-200 border-zinc-800 w-fit', video.className, className)}
		>
			<source src={source?.src} type="video/mp4" {...source} />
			Your browser does not support the video tag.
		</video>
	)
}
