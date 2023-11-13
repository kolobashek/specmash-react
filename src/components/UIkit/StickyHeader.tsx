import React from 'react'

interface Props {
	titles: {
		key: string
		label: string
	}[]
}

const StickyHeader: React.FC<Props> = ({ titles }) => {
	return (
		<div>
			<div>
				{titles.map((col) => (
					<p key={col.key}>{col.label}</p>
				))}
			</div>
		</div>
	)
}

export { StickyHeader }
