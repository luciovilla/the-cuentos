import { useAuth } from '../lib/auth'
import NextLink from 'next/link'

const Nav = () => {
  const { user, signinWithGoogle, signout } = useAuth()

  return (
    <div className="w-full">
      <div
        className="h-1"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ff2606, #000000, #ffcb10, #000000, #ffffff, #00c5eb, #0c47d7, #000000, #ffcb10, #11a37f, #000000, #ff2606)',
        }}
      />
      <div className="flex justify-between items-center">
        <div className="p-4">
          <NextLink href="/">
            <a className="font-bold">THE CUENTOS</a>
          </NextLink>
        </div>

        <div className="justify-around items-center flex p-4">
          <NextLink href="/about" passHref>
            <a className="text-sm mx-2">About</a>
          </NextLink>
          {user ? (
            <>
              <NextLink href="/dashboard">
                <a className="mx-2 text-sm sm:block hidden">My Cuentos</a>
              </NextLink>
              <button className="mx-2 text-sm font-bold" onClick={() => signout('/')}>
                Sign Out
              </button>
              <NextLink href="/dashboard">
                <a className="text-sm">
                  <span className=" inline-flex items-center">
                    <img src={user?.photoUrl} className="w-8 h-8 object-cover rounded-2xl" />
                  </span>
                </a>
              </NextLink>
            </>
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
