import React, { useRef } from 'react'
import axios from 'axios'
import { Input, Modal, Spin, message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface ChatProps {}

const Chat: React.FC<ChatProps> = ({}) => {
	const [myMessage, setMyMessage] = React.useState<string>('')
	const [messages, setMessages] = React.useState<string[]>([
		'The following is a conversation with an AI. The assistant is helpful, creative, clever, and very friendly.',
	])
	const [loading, setLoading] = React.useState<boolean>(false)
	const [visible, setVisible] = React.useState<boolean>(true)
	const [apiKey, setApiKey] = React.useState<string>('')

	const messagesEndRef = useRef<any>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	const generateResponse = async () => {
		scrollToBottom()
		let newMessage = '\n\nHuman: ' + myMessage + '\n'
		setMyMessage('')
		try {
			setMessages([...messages, newMessage])
			setLoading(true)
			const response = await axios.post('/api/chat', {
				apiKey: apiKey,
				prompt: messages.join(' ') + newMessage,
			})
			// console.log(response.data)
			setMessages([
				...messages,
				newMessage,
				`${
					response.data ||
					'Opps, something went wrong. Please try again'
				}`,
			])
		} catch (error:any) {
			console.log(error)
			message.error(
				error?.response?.data ||
					'Opps, something went wrong. Please try again'
			)

			// check if api key is invalid
			if (error?.response?.status === 401) {
				setVisible(true)
			}
		}
		setLoading(false)
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
								borderRadius: '10px',
							}}
						>
							{message}
						</p>
					)
				})}
				{loading && <LoadingOutlined style={{ fontSize: 24 }} spin />}
				<div style={{ marginTop: 150 }} ref={messagesEndRef} />
			</div>
			<div
				style={{
					position: 'fixed',
					bottom: 0,
					width: '100%',
					maxWidth: '650px',
					paddingBottom: '10px',
					zIndex: 1,
					background: 'white',
				}}
			>
				<Input
					style={{
						width: '95%',
					}}
					type='text'
					about='chat'
					size='large'
					placeholder='Chat to me'
					value={myMessage}
					onChange={e => {
						if (!apiKey) {
							setVisible(true)
							return
						}
						setMyMessage(e.target.value)
					}}
					onPressEnter={generateResponse}
					disabled={loading}
					onClick={() => {
						console.log('clicked')
						// check if there is an api key
						if (!apiKey) {
							setVisible(true)
						}
					}}
				/>
			</div>
			<Modal
				title='Paste your OpenAI API key'
				open={visible}
				onCancel={() => {
					setVisible(false)
					// on blur the input
				}}
				footer={null}
			>
				<p>
					You can get your API key from <br />{' '}
					<a
						href='https://platform.openai.com/account/api-keys'
						target='_blank'
						rel='noreferrer'
					>
						https://platform.openai.com/account/api-keys
					</a>
				</p>
				<Input
					placeholder='Paste your Openai api key here'
					//save to local storage when blurred
					onBlur={e => {
						setApiKey(e.target.value)
					}}
					onPressEnter={(e: any) => {
						setApiKey(e.target.value)
						// blur the input
						e.target.blur()
						setVisible(false)
					}}
					allowClear
				/>
				<p>No worries! We never save your API key anywhere!</p>
				<p>
					Source Code:
					<a href='https://github.com/buikhacnam/next-chat'>
						{' '}
						Github
					</a>
				</p>
			</Modal>
		</div>
	)
}
export default Chat
