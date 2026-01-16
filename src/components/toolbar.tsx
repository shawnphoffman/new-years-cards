'use client'

import { useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import { AnimatePresence, motion, MotionConfig, Transition } from 'motion/react'
import { cn } from '@/lib/utils'
import useClickOutside from '@/hooks/useClickOutside'
import { Cat, Clock } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import Link from 'next/link'

const transition = {
	type: 'spring',
	bounce: 0.1,
	duration: 0.25,
}

const ITEMS = [
	{
		id: 1,
		label: 'All Years',
		title: <Clock className="size-5" />,
		content: (
			<div className="flex flex-col gap-1 p-1">
				<Button asChild variant="outline" className="w-full">
					<Link href="/">2025</Link>
				</Button>
				<Button asChild variant="outline" className="w-full">
					<Link href="https://2024.madison.rocks" target="_blank">
						2024
					</Link>
				</Button>
			</div>
		),
	},
	{
		id: 2,
		label: 'Cat Cards',
		title: <Cat className="size-5" />,
		content: (
			<div className="flex flex-col gap-1 p-1">
				<Button asChild variant="outline" className="w-full">
					<Link href="/cats/2025">2025</Link>
				</Button>
				<Button asChild variant="outline" className="w-full">
					<Link href="/cats/2024">2024</Link>
				</Button>
			</div>
		),
	},
]

export default function ToolbarExpandable() {
	const [active, setActive] = useState<number | null>(null)
	const [contentRef, { height: heightContent }] = useMeasure()
	const [menuRef, { width: widthContainer }] = useMeasure()
	const ref = useRef<HTMLDivElement>(null)
	const [isOpen, setIsOpen] = useState(false)

	useClickOutside<HTMLDivElement>(ref, () => {
		setIsOpen(false)
		setActive(null)
	})

	return (
		<MotionConfig transition={transition as Transition}>
			<div className="absolute top-2 z-50" ref={ref}>
				<div className="h-full w-full rounded-xl border bg-white dark:bg-zinc-900 border-zinc-950/10 dark:border-zinc-50/10">
					<div className="flex space-x-2 p-1" ref={menuRef}>
						{ITEMS.map(item => (
							<button
								key={item.id}
								aria-label={item.label}
								className={cn(
									'relative flex size-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]',
									active === item.id ? 'bg-zinc-100 text-zinc-800' : ''
								)}
								type="button"
								onClick={() => {
									if (!isOpen) setIsOpen(true)
									if (active === item.id) {
										setIsOpen(false)
										setActive(null)
										return
									}

									setActive(item.id)
								}}
							>
								{item.title}
							</button>
						))}
						<ThemeToggle />
					</div>
					{/*  */}

					<div className="overflow-hidden">
						<AnimatePresence initial={false} mode="sync">
							{isOpen ? (
								<motion.div
									key="content"
									initial={{ height: 0 }}
									animate={{ height: heightContent || 0 }}
									exit={{ height: 0 }}
									style={{
										width: widthContainer,
									}}
								>
									<div ref={contentRef} className="p-2">
										{ITEMS.map(item => {
											const isSelected = active === item.id

											return (
												<motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: isSelected ? 1 : 0 }} exit={{ opacity: 0 }}>
													<div className={cn('px-0 pt-0 text-sm', isSelected ? 'block' : 'hidden')}>{item.content}</div>
												</motion.div>
											)
										})}
									</div>
								</motion.div>
							) : null}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</MotionConfig>
	)
}
