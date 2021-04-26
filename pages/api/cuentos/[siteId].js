import { getAllCuentos } from '../../../lib/db-admin'

export default async (req, res) => {
  const cuentoId = req.query.siteId
  const cuentos = await getAllCuentos(cuentoId)

  res.status(200).json({ cuentos })
}
