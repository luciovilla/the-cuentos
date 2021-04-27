import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { AuthProvider } from '../lib/auth'
import theme from '../styles/theme'
import SEO from '../next-seo.config'
import { MDXProvider } from '@mdx-js/react'
import MDX from '../components/MDX'

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <DefaultSeo {...SEO} />
        <MDXProvider components={MDX}>
          <Component {...pageProps} />
        </MDXProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
