import { useAuth } from '../lib/auth'
import { getAllCuentos } from '../lib/db-admin'
import Nav from '../components/Nav'
import CuentosList from '../components/CuentosList'
import Footer from '../components/Footer'
import LoginButton from '../components/LoginButton'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

export default function CuentosPage({ allCuentos }) {
  const { user } = useAuth()

  return (
    <>
      <NextSeo
        title="The Cuentos"
        openGraph={{ url: 'https://thecuentos.com/all-cuentos' }}
        canonical="https://thecuentos.com/all-cuentos"
        description="Latest advice submitted for and by first-generation Latinos"
      />
      <Nav />
      <main className="min-h-full bg-lightblue px-4">
        <div className="px-4 w-full mx-auto pt-24">
          <h1 className="text-center mb-2 max-w-xl block mx-auto font-sans font-bold tracking-tighter text-4xl sm:text-5xl">
            All Cuentos
          </h1>
          <h2 className="text-center mb-4 text-lg">
            Latest advice submitted for and by first-generation Latinos
          </h2>
          <div className="max-w-xl text-center mx-auto">
            {user ? (
              <Link href="/dashboard">
                <a>
                  <button className="bg-white ml-4 px-4 py-2 border rounded-md font-bold text-xs sm:text-md text-gray-700 mt-2">
                    View/Submit Your Cuentos
                  </button>
                </a>
              </Link>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>

        <div className="max-w-4xl center my-24 mx-auto w-full">
          <CuentosList cuentos={allCuentos} />
        </div>
        <Footer />
      </main>
    </>
  )
}

export async function getStaticProps() {
  const { cuentos } = await getAllCuentos()

  return {
    props: {
      allCuentos: cuentos,
    },
  }
}
