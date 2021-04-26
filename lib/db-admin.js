import { db } from './firebase-admin'
import { compareDesc, parseISO } from 'date-fns'

export async function getAllCuentos() {
  const snapshot = await db.collection('cuentos').get()
  const cuentos = []
  snapshot.forEach((doc) => {
    cuentos.push({ id: doc.id, ...doc.data() })
  })
  cuentos.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))
  return { cuentos }
}
