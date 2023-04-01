import React from 'react'

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
	return (
		<div
			style={{
				position: 'sticky',
				bottom: 0,
				width: '100%',
				background: 'white',
				textAlign: 'center',
				zIndex: 1,
			}}
		>
			<h3>🤖 Just ask!</h3>
			<p>
				Made with ❤️ by <a href='https://buinam.com'>Casey Bui</a>
			</p>
		</div>
	)
}
export default Footer
