import Link from 'next/link'
import { useAuth } from '../lib/auth'
import { getAllApprovedCuentos } from '../lib/db-admin'
import Nav from '../components/Nav'
import CuentosList from '../components/CuentosList'
import Footer from '../components/Footer'
import LoginButton from '../components/LoginButton'
import Newsletter from '../components/Newsletter'

export default function Home({ allCuentos }) {
  const auth = useAuth()

  return (
    <>
      <Nav />
      <main className="min-h-full bg-lightblue px-4">
        <div className="w-full mx-auto pt-44 mb-44">
          <h1 className="text-center mb-4">
            <span className="text-md sm:text-lg uppercase font-sans font-semibold text-gray-700 mb-2">
              The Cuentos
            </span>
            <span className="max-w-xl block mx-auto font-sans font-bold tracking-tighter text-3xl sm:text-5xl">
              A community space gathering advice for and by first-generation Latinos
            </span>
          </h1>
          <div className="max-w-xl text-center mx-auto">
            {auth.user ? (
              <Link href="/dashboard">
                <a>
                  <button className="bg-white px-4 py-2 border rounded-md font-semibold text-xs sm:text-md text-gray-700 mt-2">
                    View/Submit Your Advice
                  </button>
                </a>
              </Link>
            ) : (
              <LoginButton />
            )}
            <Link href="/advice">
              <a className="ml-4">
                <button className="bg-white px-4 py-2 border rounded-md font-semibold text-xs sm:text-md text-gray-700 mt-2">
                  View all Advice
                </button>
              </a>
            </Link>
          </div>
          <div className="max-w-4xl center mt-32 mx-auto w-full">
            <CuentosList cuentos={allCuentos} simple={true} />
          </div>
        </div>
        <div className="max-w-xl mt-10 mx-auto">
          <Newsletter />
        </div>
        <Footer />
      </main>
    </>
  )
}

export async function getStaticProps() {
  const { cuentos } = await getAllApprovedCuentos()

  return {
    props: {
      allCuentos: cuentos,
    },
  }
}
