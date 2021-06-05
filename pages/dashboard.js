import useSWR from 'swr'
import CuentosList from '../components/CuentosList'
import Loading from '../components/Loading'
import firebaseFetcher from '../lib/firebaseFetcher'
import { useAuth } from '../lib/auth'
import { NextSeo } from 'next-seo'
import LoginButton from '../components/LoginButton'
import AddCuentoModal from '../components/AddCuentoModal'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const DashboardPage = () => {
  const { user, signout } = useAuth()
  const { data } = useSWR(user ? ['/api/cuentos', user.token] : null, firebaseFetcher)

  const title = 'My Dashboard – The Cuentos'
  const url = 'https://thecuentos.com/dashboard'
  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      <div className="bg-lightblue min-h-full">
        <Nav />
        <main className="px-4 pt-24 max-w-4xl min-h-1/2 mx-auto">
          <div className="px-4 w-full mx-auto">
            <h1 className="text-center mb-4 max-w-xl block mx-auto font-sans font-bold tracking-tighter text-4xl sm:text-5xl">
              My Advice
            </h1>
            <div className="text-center mb-20">
              {user ? (
                <>
                  <AddCuentoModal>+ Add Advice</AddCuentoModal>
                  <button
                    className="px-4 py-2 font-bold text-xs sm:text-md text-gray-700 mt-2 ml-2"
                    onClick={() => signout('/')}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
          {!data && user && <Loading />}
          {data && data.cuentos && user && <CuentosList cuentos={data.cuentos} admin={true} />}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default DashboardPage
