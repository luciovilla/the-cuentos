import Link from 'next/link'
import prisma from '../lib/prisma'
import Nav from '../components/Nav'
import Cuento from '../components/Cuento'
import Footer from '../components/Footer'
import { NextSeo } from 'next-seo'

export default function CuentosPage({ data }) {
  return (
    <>
      <NextSeo
        title="Latest Advice – The Cuentos"
        openGraph={{ url: 'https://thecuentos.com/advice' }}
        canonical="https://thecuentos.com/advice"
        description="Latest advice submitted for first-generation Latinos."
      />
      <Nav />
      <main className="min-h-full bg-lightblue px-4">
        <div className="px-4 w-full mx-auto pt-24 mb-5">
          <h1 className="text-center mb-2 max-w-xl block mx-auto font-sans font-bold text-4xl sm:text-5xl">
            All Advice
          </h1>
          <h2 className="text-center">
            Read all submitted advice below and make sure to leave your <i>Cuento</i> too!
          </h2>
        </div>

        <Cuento data={data} />

        <Footer />
      </main>
    </>
  )
}

export async function getStaticProps() {
  const cuentos = await prisma.cuento.findMany({
    orderBy: {
      updated_at: 'desc'
    }
  })

  const data = cuentos.map((cuento) => ({
    id: cuento.id.toString(),
    body: cuento.body,
    created_by: cuento.created_by.toString(),
    updated_at: cuento.updated_at.toString()
  }))

  return {
    props: {
      data
    }
  }
}
