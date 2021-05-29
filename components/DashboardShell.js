import { useAuth } from '../lib/auth'
import { NextSeo } from 'next-seo'
import AddCuentoModal from './AddCuentoModal'
import Nav from './Nav'
import Footer from './Footer'

const title = 'Dashboard – The Cuentos'
const url = 'https://thecuentos.com/dashboard'

const DashboardShell = ({ children }) => {
  const { signout } = useAuth()
  return (
    <div className="bg-lightblue min-h-full">
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      <Nav />
      <main className="px-4 pt-24 max-w-4xl min-h-1/2 mx-auto">
        <div className="px-4 w-full mx-auto">
          <h1 className="text-center mb-4 max-w-xl block mx-auto font-sans font-bold tracking-tighter text-4xl sm:text-5xl">
            My Cuentos
          </h1>
          <div className="text-center mb-20">
            <AddCuentoModal>+ Add Cuento</AddCuentoModal>
            <button
              className="px-4 py-2 font-bold text-xs sm:text-md text-gray-700 mt-2 ml-2"
              onClick={() => signout('/')}
            >
              Sign Out
            </button>
          </div>
        </div>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default DashboardShell
