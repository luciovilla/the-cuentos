import { useState, useRef } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import useSWR, { useSWRConfig } from 'swr'

import fetcher from '../lib/fetcher'
import SuccessMessage from './SuccessMessage'
import ErrorMessage from './ErrorMessage'
import LoadingSpinner from './LoadingSpinner'

function CuentoEntry({ cuento, user }) {
  const { mutate } = useSWRConfig()
  const deleteEntry = async () => {
    await fetch(`/api/cuentos/${cuento.id}`, {
      method: 'DELETE'
    })
    mutate('/api/cuentos')
  }

  return (
    <li key={cuento.id}>
      <div className="bg-white p-6 rounded-md shadow-sm">
        <div className="text-lg text-gray-700">{cuento.body}</div>
        {user && cuento.created_by === user.name && (
          <div className="flex items-center space-x-3 mt-4">
            <button className="text-sm text-red-600" onClick={deleteEntry}>
              Delete
            </button>
          </div>
        )}
        <div className="flex items-center space-x-4 mt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cuento.image}
            alt=""
            className="flex-none w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-auto">
            <div className="text-sm text-gray-500 ">{cuento.created_by}</div>
          </div>
        </div>
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
