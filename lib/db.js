import firebase from './firebase'

const firestore = firebase.firestore()

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}
export function createCuento(data) {
  const cuento = firestore.collection('cuentos').doc()
  cuento.set(data)
  return cuento
}

export function deleteCuento(id) {
  return firestore.collection('cuentos').doc(id).delete()
}
