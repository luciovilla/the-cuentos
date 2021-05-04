import React from 'react'
import { NextSeo } from 'next-seo'
import AddCuentoModal from './AddCuentoModal'
import Nav from './Nav'
import Footer from './Footer'

const title = 'The Cuentos – Dashboard'
const url = 'https://thecuentos.com/dashboard'

const DashboardShell = ({ children }) => {
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
      <Nav />
      <div className="mt-20 max-w-4xl min-h-1/2 mx-auto">
        <div className="mx-auto w-full flex flex-col px-8">
          <div className="flex justify-between mb-8" justifyContent="space-between">
            <h1 className="text-3xl font-bold">My Cuentos</h1>
            <AddCuentoModal>+ Add Cuento</AddCuentoModal>
          </div>
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DashboardShell
