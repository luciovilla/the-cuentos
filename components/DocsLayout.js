import Nav from './Nav'
import Footer from './Footer'

const DocsLayout = ({ children }) => (
  <>
    <Nav />
    <div className="max-w-2xl mx-auto mt-40 px-8">{children}</div>
    <Footer />
  </>
)

export default DocsLayout
