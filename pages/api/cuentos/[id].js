import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  const session = await getSession({ req })

  const { id } = req.query
  const { email } = session.user

  const cuento = await prisma.cuento.findUnique({
    where: {
      id: Number(id)
    }
  })

  if (req.method === 'GET') {
    return res.json({
      id: cuento.id.toString(),
      body: cuento.body,
      created_by: cuento.created_by,
      updated_at: cuento.updated_at,
      image: cuento.image
    })
  }

  if (!session || email !== cuento.email) {
    return res.status(403).send('Unauthorized')
  }

  if (req.method === 'DELETE') {
    await prisma.cuento.delete({
      where: {
        id: Number(id)
      }
    })
    return res.status(204).json({})
  }

  if (req.method === 'PUT') {
    const body = (req.body.body || '').slice(0, 500)

    await prisma.cuento.update({
      where: {
        id: Number(id)
      },
      data: {
        body,
        updated_at: new Date().toISOString()
      }
    })

    return res.status(201).json({
      ...cuento,
      body
    })
  }

  return res.send('Method no allowed.')
}
