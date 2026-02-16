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
import Madi2 from '@/components/img/madi_2.png'
import Madi3 from '@/components/img/madi_3.png'
import Madi4 from '@/components/img/madi_4.png'
import Madi5 from '@/components/img/madi_5.png'
import Cox from '@/components/img/cox.png'
import Jd from '@/components/img/jd.png'
import Elliot from '@/components/img/elliot.png'
import Janitor from '@/components/img/janitor.png'

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

type Props = {
	index?: number
	head?: 'shawn' | 'bluebell' | 'scoop' | 'madi' | 'cox' | 'jd' | 'elliot' | 'janitor'
	children: React.ReactNode
}

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
export const Shawn2Head = () => <Image src={Shawn2} height={36} alt="Shawn" title="Notes from Shawn" className="shawn-head" />
export const Shawn3Head = () => <Image src={Shawn3} height={36} alt="Shawn" title="Notes from Shawn" className="shawn-head" />
export const Shawn4Head = () => <Image src={Shawn4} height={36} alt="Shawn" title="Notes from Shawn" className="shawn-head" />
export const Shawn5Head = () => <Image src={Shawn5} height={36} alt="Shawn" title="Notes from Shawn" className="shawn-head" />
export const Shawn6Head = () => <Image src={Shawn6} height={36} alt="Shawn" title="Notes from Shawn" className="shawn-head" />
export const Shawn7Head = () => <Image src={Shawn7} height={36} alt="Shawn" title="Notes from Shawn" className="shawn-head" />
export const Madi2Head = () => <Image src={Madi2} height={36} alt="Madison" title="Notes from Madison" className="shawn-head" />
export const Madi3Head = () => <Image src={Madi3} height={36} alt="Madison" title="Notes from Madison" className="shawn-head" />
export const Madi4Head = () => <Image src={Madi4} height={36} alt="Madison" title="Notes from Madison" className="shawn-head" />
export const Madi5Head = () => <Image src={Madi5} height={36} alt="Madison" title="Notes from Madison" className="shawn-head" />
export const CoxHead = () => <Image src={Cox} height={72} alt="Cox" title="Notes from Cox" className="shawn-head" />
export const JdHead = () => <Image src={Jd} height={72} alt="JD" title="Notes from JD" className="shawn-head" />
export const ElliotHead = () => <Image src={Elliot} height={72} alt="Elliot" title="Notes from Elliot" className="shawn-head" />
export const JanitorHead = () => <Image src={Janitor} height={72} alt="Janitor" title="Notes from Janitor" className="shawn-head" />

const SHAWN_HEADS = [ShawnHead, Shawn2Head, Shawn3Head, Shawn4Head, Shawn5Head, Shawn6Head, Shawn7Head]
const MADI_HEADS = [Madi2Head, Madi3Head, Madi4Head, Madi5Head]

export default function Sidenote({ children, index, head }: Props) {
	const id = useId()
	const shawnHeadIndex = useMemo(() => [...id].reduce((acc, c) => acc + c.charCodeAt(0), 0) % SHAWN_HEADS.length, [id])
	const madiHeadIndex = useMemo(() => [...id].reduce((acc, c) => acc + c.charCodeAt(0), 0) % MADI_HEADS.length, [id])

	let Head: () => React.JSX.Element
	if (head === 'bluebell') {
		Head = BlueBellHead
	} else if (head === 'scoop') {
		Head = ScoopHead
	} else if (head === 'cox') {
		Head = CoxHead
	} else if (head === 'jd') {
		Head = JdHead
	} else if (head === 'elliot') {
		Head = ElliotHead
	} else if (head === 'janitor') {
		Head = JanitorHead
	} else if (head === 'madi') {
		Head = MADI_HEADS[madiHeadIndex]
	} else {
		Head = SHAWN_HEADS[shawnHeadIndex]
	}

	// if (type === 'marginnote') {
	if (!index) {
		return (
			<>
				<label htmlFor={id} className="margin-toggle">
					{/* &#8853; */}
					&#8226;
				</label>
				<input type="checkbox" id={id} className="margin-toggle" />
				<motion.div className="marginnote flex flex-row items-center gap-2 select-none mb-2" {...motionProps}>
					<Head />
					<span className="overflow-x-auto text-ellipsis max-lg:text-base max-md:text-sm">{children}</span>
				</motion.div>
			</>
		)
	}

	return (
		<>
			<input type="checkbox" id={id} className="margin-toggle" />
			<label htmlFor={id} className="margin-toggle sidenote-number" suppressHydrationWarning>
				{index}
			</label>
			<motion.div {...motionProps} className="sidenote flex flex-row items-center gap-2 select-none mb-2">
				<Head />
				<span className="sidenote-number-internal self-start" suppressHydrationWarning>
					{index}
				</span>
				<span className="overflow-x-auto text-ellipsis max-lg:text-base max-md:text-sm">{children}</span>
			</motion.div>
		</>
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
