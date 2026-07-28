import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ChatWidget from '../components/ChatWidget'
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton'
import PromoModal from '../components/PromoModal'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isAdmin = router.pathname.startsWith('/admin')

  return (
    <>
      <Head>
        <link rel="icon" href="/images/brand-mark.svg" />
        <link rel="shortcut icon" href="/images/brand-mark.svg" />
      </Head>
      <Component {...pageProps} />
      {!isAdmin && <PromoModal />}
      {!isAdmin && <WhatsAppFloatingButton />}
      <ChatWidget />
    </>
  )
}
