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
          <div className="flex w-full max-w-4xl mx-auto mt-40 justify-center flex-wrap">
            <h1 className="text-center text-5xl font-sans font-bold mb-2">
              A community space gathering advice for and by first-generation Latinos.
            </h1>
            {!auth.user && <LoginButton />}
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
