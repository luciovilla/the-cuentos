import useSWR from 'swr'
import CuentosList from '../components/CuentosList'
import DashboardShell from '../components/DashboardShell'
import Loading from '../components/Loading'
import fetcher from '../lib/fetcher'
import { useAuth } from '../lib/auth'

const Dashboard = () => {
  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/cuentos', user.token] : null, fetcher)

  if (!data) {
    return (
      <DashboardShell>
        <Loading />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      {data.cuentos ? <CuentosList cuentos={data.cuentos} /> : <Loading />}
    </DashboardShell>
  )
}

export default Dashboard
