import Head from 'next/head'
import { Inter } from '@next/font/google'
import axios from 'axios'
import { useEffect } from 'react'
import Chat from '@/components/Chat'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {




  return (
    <>
      <Head>
        <title>Just ask</title>
        <meta name="description" content="Just ask | AI chat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='aaaaaaaaaaa' style={{
      }}>
      <Footer />

        <Chat />
        </div>
    </>
  )
}
