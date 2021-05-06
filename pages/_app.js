import { DefaultSeo } from 'next-seo'
import { AuthProvider } from '../lib/auth'
import SEO from '../next-seo.config'
import { MDXProvider } from '@mdx-js/react'
import MDX from '../components/MDX'
import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <DefaultSeo {...SEO} />
      <MDXProvider components={MDX}>
        <Component {...pageProps} />
      </MDXProvider>
    </AuthProvider>
  )
}

export default App
