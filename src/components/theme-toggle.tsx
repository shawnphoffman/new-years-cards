'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme()
	const isDark = resolvedTheme === 'dark'

	return (
		<button
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			aria-label="Toggle theme"
			className={
				'relative flex size-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800'
			}
		>
			<Sun className="dark:block hidden h-[1.2rem] w-[1.2rem]" />
			<Moon className="dark:hidden h-[1.2rem] w-[1.2rem] block" />
		</button>
	)
}
