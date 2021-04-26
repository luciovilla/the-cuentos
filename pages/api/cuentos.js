import db from '../../lib/firebase-admin'

export default async (_, res) => {
  // const userSnapshot = await db.collection('users').get()
  const cuentosSnapshot = await db.collection('cuentos').get()
  const cuentos = []
  const users = []

  // userSnapshot.forEach((doc) => {
  //   users.push({ ...doc.data() })
  // })
  cuentosSnapshot.forEach((doc) => {
    cuentos.push({ ...doc.data() })
  })
  // const userCuentos = cuentos.map((item, i) => Object.assign({}, item, users[i]))

  res.status(200).json({ cuentos })
}
