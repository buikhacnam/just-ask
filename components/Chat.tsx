import React, { useRef } from 'react'
import axios from 'axios'
import { Input, Spin } from 'antd'
import styled from 'styled-components'

interface ChatProps {}

const Chat: React.FC<ChatProps> = ({}) => {
	const [myMessage, setMyMessage] = React.useState<string>('')
	const [messages, setMessages] = React.useState<string[]>([])
	const [loading, setLoading] = React.useState<boolean>(false)

	const messagesEndRef = useRef<any>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	const generateResponse = async () => {
		scrollToBottom()
		try {
			setMyMessage('')
			setMessages([...messages, myMessage])
			setLoading(true)
			const response = await axios.post('/api/chat', {
				prompt: myMessage,
			})
			// console.log(response.data)
			setMessages([
				...messages,
				myMessage,
				`🤖: ${
					response.data?.bot ||
					'Opps, something went wrong. Please try again'
				}`,
			])
			setLoading(false)
		} catch (error) {
			console.log(error)
			alert('Something went wrong')
		}
		scrollToBottom()
	}
	return (
		<div
			style={{
				position: 'relative',
                height: '100%',
			}}
		>
			<div>
				{messages.map((message, index) => {
					return (
						<p
							key={index}
							style={{
								background:
									index % 2 === 0
										? 'lightblue'
										: 'lightgreen',
								padding: '10px',
							}}
						>
							{message}
						</p>
					)
				})}
				{loading && <Spin />}
				<div style={{ marginTop: 150 }} ref={messagesEndRef} />
			</div>
			<div style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                paddingBottom: '10px',
                zIndex: 1,
                background: 'white',
            }}>
				<Input
					style={{
                        width: '95%'
                    }}
                    type='text'
					size='large'
					placeholder='Chat to me'
					value={myMessage}
					onChange={e => setMyMessage(e.target.value)}
					onPressEnter={generateResponse}
					disabled={loading}
				/>
			</div>
		</div>
	)
}
export default Chat


