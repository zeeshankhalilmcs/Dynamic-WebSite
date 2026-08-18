import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ChatWidget from '../components/ChatWidget'
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton'

const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-ZPJ6775HEX'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    if (!gaId || typeof window === 'undefined') {
      return
    }

    const gtag = (window as any).gtag
    if (typeof gtag !== 'function') {
      return
    }

    const handleRouteChange = (url: string) => {
      gtag('config', gaId, {
        page_path: url,
      })
      gtag('event', 'page_view', {
        page_path: url,
      })
    }

    router.events?.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events?.off('routeChangeComplete', handleRouteChange)
    }
  }, [router, gaId])

  return (
    <>
      <Head>
        <link rel="icon" href="/images/brand-mark.svg" />
        <link rel="shortcut icon" href="/images/brand-mark.svg" />
      </Head>

      {/* Google Analytics */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      <Component {...pageProps} />
      <WhatsAppFloatingButton />
      <ChatWidget />
    </>
  )
}
