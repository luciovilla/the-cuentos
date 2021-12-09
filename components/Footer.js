import NextLink from 'next/link'

const Footer = () => {
  return (
    <div className="pb-8 mt-20 justify-center flex">
      <NextLink href="/">
        <a className="text-sm mr-4 text-gray-600">Home</a>
      </NextLink>
      <NextLink href="/about">
        <a className="text-sm mr-4 text-gray-600">About</a>
      </NextLink>
    </div>
  )
}

export default Footer
