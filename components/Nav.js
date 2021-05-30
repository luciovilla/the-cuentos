import { useAuth } from '../lib/auth'
import Link from 'next/link'

const Nav = () => {
  const { user, signinWithGoogle } = useAuth()

  return (
    <div className="w-full bg-lightblue">
      <div
        className="h-1"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ff2606, #000000, #ffcb10, #000000, #ffffff, #00c5eb, #0c47d7, #000000, #ffcb10, #11a37f, #000000, #ff2606)',
        }}
      />
      <div className="flex justify-between items-center">
        <div className="py-4 pl-2 sm:pl-4">
          <Link href="/">
            <a className="font-bold">THE CUENTOS</a>
          </Link>
        </div>

        <div className="justify-around items-center flex py-4 sm:pr-4">
          <Link href="/about" passHref>
            <a className="text-sm mx-2">About</a>
          </Link>
          <Link href="/all-cuentos" passHref>
            <a className="text-sm mx-2">All Cuentos</a>
          </Link>
          {user ? (
            <Link href="/dashboard">
              <a className="text-sm">
                <span className=" inline-flex items-center">
                  <img src={user?.photoUrl} className="w-8 h-8 object-cover rounded-2xl" />
                </span>
              </a>
            </Link>
          ) : (
            <button className="text-sm mx-2" onClick={() => signinWithGoogle('/dashboard')}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
export default Nav
