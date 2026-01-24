import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { MotionProps } from 'motion/react'
import * as motion from 'motion/react-client'

const motionProps: MotionProps = {
	initial: { scale: 0.95 },
	whileHover: { scale: 1.1 },
	transition: { scale: { type: 'spring', bounce: 0.5 } },
}

type UseDotButtonType = { selectedIndex: number; scrollSnaps: number[]; onDotButtonClick: (index: number) => void }

export const useDotButton = (emblaApi: EmblaCarouselType | undefined): UseDotButtonType => {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

	const onDotButtonClick = useCallback(
		(index: number) => {
			if (!emblaApi) return
			emblaApi.scrollTo(index)
		},
		[emblaApi]
	)

	const onInit = useCallback((emblaApi: EmblaCarouselType) => {
		setScrollSnaps(emblaApi.scrollSnapList())
	}, [])

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setSelectedIndex(emblaApi.selectedScrollSnap())
	}, [])

	useEffect(() => {
		if (!emblaApi) return

		onInit(emblaApi)
		onSelect(emblaApi)
		emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
	}, [emblaApi, onInit, onSelect])

	return { selectedIndex, scrollSnaps, onDotButtonClick }
}

type PropType = ComponentPropsWithRef<'button'> & MotionProps

export const DotButton: React.FC<PropType> = props => {
	const { children, ...restProps } = props

	return (
		<motion.button role="button" type="button" {...restProps} {...motionProps}>
			{children}
		</motion.button>
	)
}
