import { useAuth } from '../lib/auth'
import { getAllApprovedCuentos } from '../lib/db-admin'
import Nav from '../components/Nav'
import CuentosList from '../components/CuentosList'
import Footer from '../components/Footer'
import LoginButton from '../components/LoginButton'

export default function Home({ allCuentos }) {
  const auth = useAuth()

  return (
    <>
      <Nav />
      <main className="flex flex-col items-center justify-center">
        <div className="items-center justify-center flex-col w-full">
          <div className="px-4 flex w-full mx-auto mt-40 justify-center flex-col">
            <h1 className="text-center mb-4">
              <span className="text-4xl sm:text-6xl font-sans font-black block mb-2">
                The Cuentos
              </span>{' '}
              <span className="max-w-lg block mx-auto text-xl sm:text-2xl">
                A community space gathering advice for and by first-generation Latinos.
              </span>
            </h1>
            <div className="mx-auto">
              {!auth.user && <LoginButton />}
              <button className="bg-gray-200 ml-4 px-4 py-2 border rounded-md font-bold text-xs sm:text-md text-gray-700 mt-2">
                View Cuentos
              </button>
            </div>
          </div>
          <div className="max-w-4xl center mt-40 mx-auto w-full">
            <CuentosList cuentos={allCuentos} />
          </div>
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
