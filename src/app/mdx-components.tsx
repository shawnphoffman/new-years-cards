import { InView } from '@/components/ui/in-view'
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
		p: props => (
			<InView
				variants={{
					hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
					visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
				}}
				viewOptions={{ margin: '0px 0px -200px 0px' }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
				once={true}
			>
				{/* <div className=''> */}
				{props.children}
				{/* </div> */}
			</InView>
		),
		...components,
	}
}
