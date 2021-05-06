import Nav from './Nav'
import Footer from './Footer'

const DocsLayout = ({ children }) => (
  <div className="bg-lightblue min-h-full">
    <Nav />
    <div className="max-w-2xl mx-auto mt-40 px-8">{children}</div>
    <Footer />
  </div>
)

export default DocsLayout
