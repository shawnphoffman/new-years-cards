import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

const components: MDXComponents = {}

// This function is required for MDX to work with Next.js
export function useMDXComponents(): MDXComponents {
	return {
		// Allows customizing built-in components, e.g. to add styling.
		// h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
		img: props => <Image sizes="100vw" style={{ width: '100%', height: 'auto' }} {...(props as ImageProps)} alt="" />,
		...components,
	}
}
