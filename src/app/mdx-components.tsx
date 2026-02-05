import { InView } from '@/components/ui/in-view'
import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {}

export function useMDXComponents(): MDXComponents {
	return {
		p: props => (
			<InView
				variants={{
					hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
					visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
				}}
				viewOptions={{ margin: '0px 0px -10px 0px' }}
				transition={{ duration: 0.15, ease: 'easeInOut' }}
				once={true}
			>
				{props.children}
			</InView>
		),
		...components,
	}
}
