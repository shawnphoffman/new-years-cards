'use client'

import React, { useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import ClassNames from 'embla-carousel-class-names'
import useEmblaCarousel from 'embla-carousel-react'

import { NextButton, PrevButton, usePrevNextButtons } from './CarouselArrowButtons'
import { DotButton, useDotButton } from './CarouselDotButton'

const OPTIONS: EmblaOptionsType = { loop: false }

type PropType = { children: React.ReactNode[] }

const EmblaCarousel: React.FC<PropType> = props => {
	const { children } = props
	const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [ClassNames()])

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

	const onIndexClick = useCallback(
		(i: number) => {
			if (!emblaApi) return
			emblaApi.scrollTo(i)
		},
		[emblaApi]
	)

	return (
		<section className="embla">
			<div className="embla__viewport overflow-visible!" ref={emblaRef}>
				<div className="embla__container">
					{children.map((child, index) => (
						<div className="embla__slide" key={index} onClick={() => onIndexClick(index)}>
							{child}
							{/* <div className="embla__slide__number">{index + 1}</div> */}
						</div>
					))}
				</div>
			</div>

			<div className="embla__controls">
				<div className="embla__buttons">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>

				<div className="embla__dots">
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							aria-label={`Go to slide ${index + 1}`}
							onClick={() => onDotButtonClick(index)}
							className={'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '')}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default EmblaCarousel
