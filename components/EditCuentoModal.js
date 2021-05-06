import { useState } from 'react'
import { mutate } from 'swr'
import { updateCuento } from '../lib/db'
import { useAuth } from '../lib/auth'

const EditCuentoModal = ({ children, cuentoText, cuentoId }) => {
  const [text, setText] = useState(cuentoText)
  const [isOpen, setOpen] = useState(false)
  const auth = useAuth()

  const onCreateCuento = async (e) => {
    e.preventDefault()
    const updatedCuento = { text }
    await updateCuento(cuentoId, updatedCuento)
    mutate(['/api/cuentos', auth.user.token])
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md text-xs font-bold bg-gray-200 hover:bg-gray-400 py-2 px-4"
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
        <div className="mt-5 md:mt-0 w-full max-w-sm ">
          <form onSubmit={onCreateCuento} className="bg-white rounded-md">
            <div className="shadow sm:overflow-hidden">
              <div className="px-4 py-5 space-y-6 sm:p-6">
                <div>
                  <label className="mb-2 block text-md font-bold">Edit your Cuento</label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      className="shadow-sm p-2 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Your cuento..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 text-right sm:px-6">
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs mr-3 font-bold rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs font-bold rounded-md bg-gray-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditCuentoModal
