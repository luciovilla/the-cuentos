import { db } from './firebase-admin'
import { compareDesc, parseISO } from 'date-fns'

export async function getAllApprovedCuentos() {
  const snapshot = await db.collection('cuentos').where('status', '==', 'approved').get()
  const cuentos = []
  snapshot.forEach((doc) => {
    cuentos.push({ id: doc.id, ...doc.data() })
  })
  cuentos.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))
  return { cuentos }
}

export async function getAllCuentos() {
  const snapshot = await db.collection('cuentos').limit(6).get()
  const cuentos = []
  snapshot.forEach((doc) => {
    cuentos.push({ id: doc.id, ...doc.data() })
  })
  cuentos.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))
  return { cuentos }
}

export async function getUserCuentos(uid) {
  const snapshot = await db.collection('cuentos').where('uid', '==', uid).get()
  const cuentos = []
  snapshot.forEach((doc) => {
    cuentos.push({ id: doc.id, ...doc.data() })
  })
  cuentos.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))
  return { cuentos }
}
