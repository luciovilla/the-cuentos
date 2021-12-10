import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { amount, sort } = req.query
    const cuentos = await prisma.cuento.findMany({
      take: amount ? parseInt(amount) : undefined,
      orderBy: {
        updated_at: sort ? 'asc' : 'desc'
      }
    })

    return res.json(
      cuentos.map((cuento) => ({
        id: cuento.id.toString(),
        body: cuento.body,
        created_by: cuento.created_by,
        updated_at: cuento.updated_at
      }))
    )
  }

  const session = await getSession({ req })
  const { email, name } = session.user

  if (!session) {
    return res.status(403).send('Unauthorized')
  }

  if (req.method === 'POST') {
    const newCuento = await prisma.cuento.create({
      data: {
        email,
        body: (req.body.body || '').slice(0, 500),
        created_by: name
      }
    })
    return res.status(200).json({
      id: newCuento.id.toString,
      body: newCuento.body,
      created_by: newCuento.created_by,
      updated_at: newCuento.updated_at
    })
  }
  return res.send('Method not allowed.')
}
