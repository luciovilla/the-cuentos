import useSWR from 'swr'
import CuentosList from '../components/CuentosList'
import DashboardShell from '../components/DashboardShell'
import Loading from '../components/Loading'
import fetcher from '../lib/fetcher';
import { useAuth } from '../lib/auth'

const Dashboard = () => {
  const auth = useAuth()
  const { data } = useSWR('/api/cuentos', fetcher);

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
