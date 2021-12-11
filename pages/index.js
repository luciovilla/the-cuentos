import Link from 'next/link'
import prisma from '../lib/prisma'
import { signIn, useSession } from 'next-auth/react'
import Nav from '../components/Nav'
import CuentosList from '../components/CuentosList'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'

export default function Home({ data }) {
  const { data: session } = useSession()
  const { data: cuentos } = useSWR('/api/cuentos?amount=3&sort=asc', fetcher, {
    data
  })

  return (
    <>
      <Nav />
      <main className="min-h-full bg-lightblue px-4">
        <div className="w-full mx-auto pt-44">
          <h1 className="text-center mb-4">
            <span className="text-md sm:text-lg uppercase font-sans font-semibold text-gray-700 mb-2">
              The Cuentos
            </span>
            <span className="max-w-xl block mx-auto font-sans font-bold px-2 text-3xl sm:text-5xl">
              A community space gathering advice for first-generation Latinos
            </span>
          </h1>
          <div className="flex items-center justify-center max-w-xl text-center mx-auto">
            <Link href="/advice">
              <a>
                <button className="bg-white px-4 py-2 border rounded-md font-semibold text-xs sm:text-md text-gray-700">
                  View/Submit Advice
                </button>
              </a>
            </Link>
            
            {!session && (
              <a
                href="/api/auth/signin/google"
                className="bg-white ml-3 px-4 py-2 border rounded-md font-semibold text-xs sm:text-md text-gray-700"
                onClick={(e) => {
                  e.preventDefault()
                  signIn('google', {
                    callbackUrl: `/advice`
                  })
                }}
              >
                Submit your advice
              </a>
            )}
          </div>
          {cuentos && <CuentosList cuentos={cuentos} />}
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
  const cuentos = await prisma.cuento.findMany({
    take: 2,
    orderBy: {
      updated_at: 'asc'
    }
  })

  const data = JSON.stringify(cuentos)

  return {
    props: {
      data
    }
  }
}
