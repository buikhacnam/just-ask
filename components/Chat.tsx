import React, { useRef } from 'react'
import axios from 'axios'
import { Input, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

/*
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: nice talking to you\n Nice talking to you too! How may I assist you today?",
  temperature: 0.9,
  max_tokens: 150,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0.6,
  stop: [" Human:", " AI:"],
});

*/

interface ChatProps {}

const Chat: React.FC<ChatProps> = ({}) => {
	const [myMessage, setMyMessage] = React.useState<string>('')
	const [messages, setMessages] = React.useState<string[]>(['The following is a conversation with an AI. The assistant is helpful, creative, clever, and very friendly.'])
	const [loading, setLoading] = React.useState<boolean>(false)


	const messagesEndRef = useRef<any>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	const generateResponse = async () => {
		scrollToBottom()
		let newMessage =  '\n\nHuman: ' + myMessage + '\n'
		setMyMessage('')
		try {
			setMessages([...messages, newMessage])
			setLoading(true)
			const response = await axios.post('/api/chat', {
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
                                borderRadius: '10px',
							}}
						>
							{message}
						</p>
					)
				})}
				{loading &&<LoadingOutlined style={{ fontSize: 24 }} spin />}
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
                    about='chat'
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


