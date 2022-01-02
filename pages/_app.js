import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App
