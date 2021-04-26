import { auth } from '../../lib/firebase-admin'
import { getUserCuentos } from '../../lib/db-admin'

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    const { cuentos } = await getUserCuentos(uid)
    res.status(200).json({ cuentos })
  } catch (error) {
    res.status(500).json({ error })
  }
}
