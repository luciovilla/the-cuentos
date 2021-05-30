import { NextSeo } from 'next-seo'
import Nav from './Nav'
import Footer from './Footer'

const DocsLayout = ({ children, title, url, description }) => (
  <>
    <NextSeo
      title={title}
      canonical={url}
      description={description}
      openGraph={{
        url,
        title,
      }}
    />
    <div className="bg-lightblue min-h-full">
      <Nav />
      <div className="max-w-2xl mx-auto mt-40 px-4">{children}</div>
      <Footer />
    </div>
  </>
)

export default DocsLayout
