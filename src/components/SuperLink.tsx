import { Children } from 'react'
import * as motion from 'motion/react-client'
import Link, { LinkProps } from 'next/link'

type Props = LinkProps & {
	children: React.ReactNode
}

export default function SuperLink({ children, ...rest }: Props) {
	const text = Children.toArray(children).join('')
	return (
		<motion.span initial="initial" whileHover="whileHover" className=" relative">
			<Link {...rest} target="_blank" className=" inline-block">
				<motion.div
					variants={{
						initial: { x: 0 },
						whileHover: { y: -12, x: 0 },
					}}
					transition={{
						type: 'spring',
						staggerChildren: 0.0125,
						delayChildren: 0,
					}}
					className="group relative"
				>
					{text.split('').map((l, i) => (
						<motion.span
							variants={{
								initial: { x: 0 },
								whileHover: { y: 12, x: -0 },
							}}
							transition={{ type: 'spring' }}
							className="inline-block underline underline-offset-[0.1em] decoration-[0.05em] group-hover:decoration-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]"
							key={i}
						>
							{l === ' ' ? <>&nbsp;</> : l}
						</motion.span>
					))}
				</motion.div>
			</Link>
		</motion.span>
	)
}
