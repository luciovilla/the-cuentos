import { useState } from 'react'
import { mutate } from 'swr'
import { createCuento } from '../lib/db'
import { useAuth } from '../lib/auth'

const AddCuentoModal = ({ children }) => {
  const auth = useAuth()
  const [text, setText] = useState('')
  const [isOpen, setOpen] = useState(false)

  const handleClose = (e) => {
    e.preventDefault()
    setOpen(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const newCuento = {
      uid: auth.user.uid,
      createdAt: new Date().toISOString(),
      text,
      name: auth.user.name,
      status: 'pending',
    }
    const { id } = createCuento(newCuento)
    mutate(
      ['/api/cuentos', auth.user.token],
      async (data) => ({
        cuentos: [{ id, ...newCuento }, ...data.cuentos],
      }),
      false
    )
    setOpen(false)
    setText('')
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-white px-4 py-2 border font-bold text-xs sm:text-md text-gray-700 mt-2"
      >
        {children}
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
        <div className="w-full max-w-sm">
          <div className="mt-5 md:mt-0 md:col-span-3">
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label htmlFor="about" className="block text-md font-medium text-gray-700">
                      Add Cuento
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        className="shadow-sm focus:ring-indigo-500 p-2 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Your cuento..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-white text-right sm:px-6">
                  <button
                    onClick={(e) => handleClose(e)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs mr-3 font-bold rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs font-bold rounded-md bg-gray-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCuentoModal
