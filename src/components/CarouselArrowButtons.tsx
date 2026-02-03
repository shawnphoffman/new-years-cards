import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { MotionProps } from 'motion/react'
import * as motion from 'motion/react-client'

const motionProps: MotionProps = {
	initial: { scale: 0.95 },
	whileHover: { scale: 1.1 },
	transition: {
		scale: { type: 'spring', bounce: 0.5 },
	},
}

type UsePrevNextButtonsType = {
	prevBtnDisabled: boolean
	nextBtnDisabled: boolean
	onPrevButtonClick: () => void
	onNextButtonClick: () => void
}

export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined): UsePrevNextButtonsType => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return
		emblaApi.scrollPrev()
	}, [emblaApi])

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return
		emblaApi.scrollNext()
	}, [emblaApi])

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev())
		setNextBtnDisabled(!emblaApi.canScrollNext())
	}, [])

	useEffect(() => {
		if (!emblaApi) return

		// eslint-disable-next-line
		onSelect(emblaApi)
		emblaApi.on('reInit', onSelect).on('select', onSelect)
	}, [emblaApi, onSelect])

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	}
}

type PropType = ComponentPropsWithRef<'button'> & MotionProps

export const PrevButton = (props: PropType) => {
	const { children, ...restProps } = props

	return (
		<motion.button className="embla__button embla__button--prev" aria-label="Previous" type="button" {...restProps} {...motionProps}>
			<svg viewBox="0 0 320 512">
				<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
			</svg>
			{children}
		</motion.button>
	)
}

export const NextButton = (props: PropType) => {
	const { children, ...restProps } = props

	return (
		<motion.button className="embla__button embla__button--next" aria-label="Next" type="button" {...restProps} {...motionProps}>
			<svg viewBox="0 0 320 512">
				<path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
			</svg>
			{children}
		</motion.button>
	)
}
