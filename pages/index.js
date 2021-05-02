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
        <div className="items-stretch justify-between flex-col w-full">
          <div className="flex w-full max-w-5xl mx-auto mt-40 justify-between flex-wrap">
            <h1 className="text-5xl font-sans font-bold mb-2">
              A community space gathering advice for and by first-generation Latinos.
            </h1>
            {!auth.user && <LoginButton />}
          </div>
          <div className="max-w-5xl mt-40 mx-auto w-full">
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
