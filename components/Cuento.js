import { useState, useRef } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import useSWR, { useSWRConfig } from 'swr'

import fetcher from '../lib/fetcher'
import SuccessMessage from './SuccessMessage'
import ErrorMessage from './ErrorMessage'
import LoadingSpinner from './LoadingSpinner'

function CuentoEntry({ cuento, user }) {
  const { mutate } = useSWRConfig()
  const deleteEntry = async (e) => {
    e.preventDefault()
    await fetch(`/api/cuentos/${cuento.id}`, {
      method: 'DELETE'
    })
    mutate('/api/cuentos')
  }

  return (
    <li key={cuento.id}>
      <div className="bg-white p-4 rounded-md shadow-sm">
        <svg width="45" height="36" className="mb-5 fill-current text-gray-400 opacity-20">
          <path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path>
        </svg>
        <div className="text-md text-gray-800">{cuento.body}</div>
        {cuento.created_by && <p className="text-sm text-gray-500 mt-2">– {cuento.created_by}</p>}
        {user && cuento.created_by === user.name && (
          <div className="flex items-center space-x-3 mt-2">
            <button className="text-sm text-red-600" onClick={deleteEntry}>
              Delete
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default function Cuento({ data }) {
  const { data: session } = useSession()
  const { mutate } = useSWRConfig()
  const [form, setForm] = useState({ state: '', message: '' })
  const inputEl = useRef(null)
  const { data: cuentos } = useSWR('/api/cuentos', fetcher, {
    data
  })

  const leaveEntry = async (e) => {
    e.preventDefault()
    setForm({ state: 'Loading' })
    const res = await fetch('/api/cuentos', {
      body: JSON.stringify({
        body: inputEl.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const { error } = await res.json()
    if (error) {
      setForm({
        state: 'Error',
        message: error
      })
      return
    }

    inputEl.current.value = ''
    mutate('/api/cuentos')
    setForm({
      state: 'Success',
      message: `Yay! Gracias for submitting your Cuento.`
    })
  }

  return (
    <>
      <div className="border rounded p-6 w-full bg-white mt-10 max-w-lg mx-auto flex-col">
        <h5 className="text-lg md:text-xl font-bold text-gray-900">Submit a Cuento</h5>
        <p className="my-1 text-gray-800 mb-4">Share some advice for first-generation Latinos.</p>
        {!session && (
          <a
            href="/api/auth/signin/google"
            className="bg-white px-4 py-2 border rounded-md font-semibold text-xs sm:text-md text-gray-700"
            onClick={(e) => {
              e.preventDefault()
              signIn('google')
            }}
          >
            {form.state === 'Loading' ? <LoadingSpinner /> : 'Sign in with Google'}
          </a>
        )}

        {session?.user && (
          <form onSubmit={leaveEntry} className="my-4 max-w-xl center mx-auto w-full">
            <textarea
              ref={inputEl}
              type="text"
              aria-label="Your advice"
              placeholder="Your cuento..."
              required
              className="pl-4 pr-32 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white text-gray-900"
            />
            <button
              className="bg-white px-4 py-2 border rounded-md font-semibold text-xs sm:text-md text-gray-700 mt-2"
              type="submit"
            >
              Submit
            </button>
            <button className="ml-2 px-2 py-2 text-sm text-gray-700" onClick={() => signOut()}>
              Sign out
            </button>
          </form>
        )}
        <div className="mt-4">
          {form.state === 'Error' ? (
            <ErrorMessage>{form.message}</ErrorMessage>
          ) : form.state === 'Success' ? (
            <SuccessMessage>{form.message}</SuccessMessage>
          ) : (
            <p className="text-xs text-gray-800">
              Your information is only used to display your name.
            </p>
          )}
        </div>
      </div>
      <div className="max-w-5xl center my-32 mx-auto w-full">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {cuentos?.map((cuento) => (
            <CuentoEntry key={cuento.id} cuento={cuento} user={session?.user} />
          ))}
        </ul>
      </div>
    </>
  )
}
