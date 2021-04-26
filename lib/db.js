import firebase from './firebase'

const firestore = firebase.firestore()

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}
export function createCuento(data) {
  return firestore.collection('cuentos').add(data)
}

export function deleteCuento(id) {
  return firestore.collection('cuentos').doc(id).delete()
}
