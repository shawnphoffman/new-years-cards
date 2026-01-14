'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme()
	const isDark = resolvedTheme === 'dark'

	return (
		<Button variant="outline" size="icon" onClick={() => setTheme(isDark ? 'light' : 'dark')} aria-label="Toggle theme">
			<Sun className="dark:block hidden h-[1.2rem] w-[1.2rem]" />
			<Moon className="dark:hidden h-[1.2rem] w-[1.2rem] block" />
		</Button>
	)
}
