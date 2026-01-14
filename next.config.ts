import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// Configure `pageExtensions` to include MDX files
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
	options: {
		providerImportSource: '@/app/mdx-components',
	},
})

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig)
