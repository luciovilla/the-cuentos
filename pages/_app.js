import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import { MDXProvider } from '@mdx-js/react'
import { SessionProvider } from 'next-auth/react'
import MDX from '../components/MDX'
import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <DefaultSeo {...SEO} />
      <MDXProvider components={MDX}>
        <Component {...pageProps} />
      </MDXProvider>
    </SessionProvider>
  )
}

export default App
