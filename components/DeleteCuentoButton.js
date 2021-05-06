import React, { useState } from 'react'
import { mutate } from 'swr'
import { deleteCuento } from '../lib/db'
import { useAuth } from '../lib/auth'

const DeleteCuentoButton = ({ cuentoId }) => {
  const [isOpen, setIsOpen] = useState()
  const auth = useAuth()

  const onClose = () => setIsOpen(false)
  const onDelete = () => {
    deleteCuento(cuentoId)
    mutate(
      ['/api/cuentos', auth.user.token],
      async (data) => {
        return {
          cuentos: data.cuentos.filter((cuento) => cuento.id !== cuentoId),
        }
      },
      false
    )
    onClose()
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md text-gray-700 text-xs font-bold ml-2 hover:bg-gray-200 p-2"
      >
        Remove
      </button>
      <div
        className={`fixed left-0 top-0 w-full h-screen bg-gray-900 opacity-30 ${
          isOpen ? 'block' : 'hidden'
        }`}
      />
      <div
        className={`flex mt-20 justify-center fixed h-screen w-full left-0 top-0 ${
          isOpen ? '' : 'hidden'
        }`}
      >
        <div className="mt-5 md:mt-0  md:col-span-3">
          <div className="shadow bg-white rounded-sm max-w-md sm:overflow-hidden">
            <div className="px-4 py-5  space-y-6 sm:p-6">
              <div>
                <label htmlFor="about" className="block text-md font-medium text-gray-700">
                  Are you sure you want to delete? You can't undo this action afterwards.
                </label>
              </div>
            </div>
            <div className="px-4 py-3 text-right sm:px-6">
              <button
                onClick={onClose}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm mr-3 font-bold rounded-md text-white bg-indigo-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteCuentoButton
