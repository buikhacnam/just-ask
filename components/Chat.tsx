import React from 'react'
import axios from 'axios'


interface ChatProps {

}

const Chat: React.FC<ChatProps> = ({}) => {

    const [myMessage, setMyMessage] = React.useState<string>('')
    const [messages, setMessages] = React.useState<string[]>([])
    const [loading, setLoading] = React.useState<boolean>(false)


    const generateResponse = async () => {
        try {
            setMessages([...messages, myMessage])
            setLoading(true)
            const response = await axios.post('/api/gpt3', { prompt: myMessage })
            // console.log(response.data)
            setMessages([...messages, myMessage, response.data?.bot|| 'Opps, something went wrong. Please try again'])
            setMyMessage('')
            setLoading(false)
        } catch (error) {
            console.log(error)
            alert('Something went wrong')
        }
      
      }
    return <>
        <div>
            <p>ask me anything</p>
            <input type="text" value={myMessage} onChange={(e) => setMyMessage(e.target.value)}  />
            <button onClick={generateResponse}>generate</button>
            {loading && <p>loading...</p>}
            {messages.map((message, index) => {
                return <p key={index}>{message}</p>
            })}
        </div>
    
    
    </>
}
export default Chat