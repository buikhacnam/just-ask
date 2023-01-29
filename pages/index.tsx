import Head from 'next/head'
import { Inter } from '@next/font/google'
import axios from 'axios'
import { useEffect } from 'react'
import Chat from '@/components/Chat'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const generateResponse = async () => {
    const response = await axios.post('/api/gpt3', { prompt: 'hello' })
    console.log(response.data)
  }


  return (
    <>
      <Head>
        <title>Ask me anything</title>
        <meta name="description" content="Ask me anything" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Chat />
      </div>
    </>
  )
}
