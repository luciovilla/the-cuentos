import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import CuentosList from '../components/CuentosList'
import DashboardShell from '../components/DashboardShell'
import Loading from '../components/Loading'
import firebaseFetcher from '../lib/firebaseFetcher'
import { useAuth } from '../lib/auth'

const Dashboard = () => {
  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/cuentos', user.token] : null, firebaseFetcher)

  useEffect(() => {
    Router.push('/')
  }, [])

  if (!data) {
    return (
      <DashboardShell>
        <Loading />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      {data.cuentos ? <CuentosList cuentos={data.cuentos} admin={true} /> : <Loading />}
    </DashboardShell>
  )
}

export default Dashboard
