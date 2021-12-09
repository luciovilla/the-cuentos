import Link from 'next/link'

const Nav = () => {
  return (
    <div className="w-full bg-lightblue">
      <div className="flex justify-between items-center">
        <div className="py-4 pl-2 sm:pl-4">
          <Link href="/">
            <a className="font-bold">THE CUENTOS</a>
          </Link>
        </div>

        <div className="justify-around items-center flex py-4 pr-2 sm:pr-4">
          <Link href="/about" passHref>
            <a className="text-sm mx-2">About</a>
          </Link>
          <Link href="/advice" passHref>
            <a className="text-sm mx-2">All Advice</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Nav
