import { useState, useRef } from 'react'
import SuccessMessage from '../components/newsletter/SuccessMessage'
import ErrorMessage from '../components/newsletter/ErrorMessage'
import LoadingSpinner from '../components/newsletter/LoadingSpinner'

export default function Subscribe() {
  const [form, setForm] = useState(false)
  const inputEl = useRef(null)

  const subscribe = async (e) => {
    e.preventDefault()
    setForm({ state: 'loading' })
    const res = await fetch('/api/newsletter-subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const { error } = await res.json()
    if (error) {
      setForm({
        state: 'error',
        message: error,
      })
      return
    }

    inputEl.current.value = ''
    setForm({
      state: 'success',
      message: `Hooray! You're now on the list.`,
    })
  }

  return (
    <div className="border rounded p-6 my-4 w-full bg-white">
      <p className="text-lg md:text-xl font-bold text-gray-900">Subscribe for updates</p>
      <p className="my-1 text-gray-800">
        Get emails to get notified about the latest news and updates about The Cuentos.
      </p>
      <form className="relative my-4" onSubmit={subscribe}>
        <input
          ref={inputEl}
          aria-label="Email for newsletter"
          placeholder="correo@email.com"
          type="email"
          autoComplete="email"
          required
          className="px-4 py-2 mt-1 focus:ring-blue-50 focus:border-blue-50 block w-full border-gray-300 rounded-md bg-white text-gray-900"
        />
        <button
          className="flex items-center justify-center absolute right-1 top-1 px-4 font-semibold h-8 bg-gray-100 text-gray-900 rounded w-28"
          type="submit"
        >
          {form.state === 'loading' ? <LoadingSpinner /> : 'Subscribe'}
        </button>
      </form>
      {form.state === 'error' && <ErrorMessage>{form.message}</ErrorMessage>}
      {form.state === 'success' && <SuccessMessage>{form.message}</SuccessMessage>}
    </div>
  )
}
