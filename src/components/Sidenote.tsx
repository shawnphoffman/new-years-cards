'use client'
import { createContext, useContext, useId, useMemo, useRef } from 'react'
import { MotionProps } from 'motion/react'
import * as motion from 'motion/react-client'
import Image from 'next/image'

import BlueBell from '@/components/img/cat_bluebell.png'
import Scoop from '@/components/img/cat_scoop.png'
import Shawn from '@/components/img/1.png'
import Shawn2 from '@/components/img/2.png'
import Shawn3 from '@/components/img/3.png'
import Shawn4 from '@/components/img/4.png'
import Shawn5 from '@/components/img/5.png'
import Shawn6 from '@/components/img/6.png'
import Shawn7 from '@/components/img/7.png'

const motionProps: MotionProps = {
	// initial: { opacity: 0, scale: 0 },
	whileHover: { scale: 1.1, rotate: 1.1 },
	// whileInView: { opacity: 1, scale: 1 },
	transition: {
		scale: { type: 'spring', visualDuration: 0.5, bounce: 0.5 },
		// scale: { ease: ['easeIn', 'easeOut'] },
	},
	viewport: { amount: 0.8, once: true },
}

type Props = { index?: number; head?: 'shawn' | 'bluebell' | 'scoop'; children: React.ReactNode }

type SidenoteCounter = {
	getIndex: (id: string) => number
}

const SidenoteCounterContext = createContext<SidenoteCounter | null>(null)

export function SidenoteProvider({ children }: { children: React.ReactNode }) {
	const countRef = useRef(0)
	const indexMapRef = useRef(new Map<string, number>())

	const counter = useMemo<SidenoteCounter>(() => {
		return {
			getIndex: (id: string) => {
				if (indexMapRef.current.has(id)) {
					return indexMapRef.current.get(id) as number
				}

				const next = ++countRef.current
				indexMapRef.current.set(id, next)
				return next
			},
		}
	}, [])

	return <SidenoteCounterContext.Provider value={counter}>{children}</SidenoteCounterContext.Provider>
}

export const ScoopHead = () => <Image src={Scoop} height={36} alt="Scoop" title="Notes from Scoop" className="shawn-head" />
export const BlueBellHead = () => <Image src={BlueBell} height={36} alt="BlueBell" title="Notes from BlueBell" className="shawn-head" />
export const ShawnHead = () => <Image src={Shawn} height={36} alt="Shawn" title="Notes from Shawn" className="shawn-head" />
export const Shawn2Head = () => <Image src={Shawn2} height={36} alt="Shawn2" title="Notes from Shawn2" className="shawn-head" />
export const Shawn3Head = () => <Image src={Shawn3} height={36} alt="Shawn3" title="Notes from Shawn3" className="shawn-head" />
export const Shawn4Head = () => <Image src={Shawn4} height={36} alt="Shawn4" title="Notes from Shawn4" className="shawn-head" />
export const Shawn5Head = () => <Image src={Shawn5} height={36} alt="Shawn5" title="Notes from Shawn5" className="shawn-head" />
export const Shawn6Head = () => <Image src={Shawn6} height={36} alt="Shawn6" title="Notes from Shawn6" className="shawn-head" />
export const Shawn7Head = () => <Image src={Shawn7} height={36} alt="Shawn7" title="Notes from Shawn7" className="shawn-head" />

const SHAWN_HEADS = [ShawnHead, Shawn2Head, Shawn3Head, Shawn4Head, Shawn5Head, Shawn6Head, Shawn7Head]

export default function Sidenote({ children, index, head }: Props) {
	const id = useId()
	const shawnHeadIndex = useMemo(() => [...id].reduce((acc, c) => acc + c.charCodeAt(0), 0) % SHAWN_HEADS.length, [id])

	let Head: () => React.JSX.Element
	if (head === 'bluebell') {
		Head = BlueBellHead
	} else if (head === 'scoop') {
		Head = ScoopHead
	} else {
		Head = SHAWN_HEADS[shawnHeadIndex]
	}

	// if (type === 'marginnote') {
	if (!index) {
		return (
			// <div className="not-prose">
			<>
				<label htmlFor={id} className="margin-toggle">
					{/* &#8853; */}
					&#8226;
				</label>
				<input type="checkbox" id={id} className="margin-toggle" />
				<motion.div className="marginnote flex flex-row items-center gap-2 select-none" {...motionProps}>
					<Head />
					<span>{children}</span>
				</motion.div>
			</>
			// </div>
		)
	}

	return (
		// <div className="not-prose">
		<>
			<input type="checkbox" id={id} className="margin-toggle" />
			<label htmlFor={id} className="margin-toggle sidenote-number"></label>
			<motion.div {...motionProps} className="sidenote flex flex-row items-center gap-2 select-none">
				<Head />
				<span className="sidenote-number-internal self-start">{index}</span>
				<span>{children}</span>
			</motion.div>
		</>
		// </div>
	)
}

export function NumberedSidenote({ children, head }: Omit<Props, 'index'>) {
	const counter = useContext(SidenoteCounterContext)
	const id = useId()
	const index = counter ? counter.getIndex(id) : undefined

	return (
		<Sidenote index={index} head={head}>
			{children}
		</Sidenote>
	)
}
