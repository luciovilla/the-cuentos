import NextLink from 'next/link'

const Footer = () => {
  return (
    <div className="pb-8 mt-20 justify-center flex">
      <NextLink href="/">
        <a className="text-sm mr-4 text-gray-500">Home</a>
      </NextLink>
      <NextLink href="/about">
        <a className="text-sm mr-4 text-gray-500">About</a>
      </NextLink>
      <NextLink href="/privacy-policy">
        <a className="text-sm mr-4 text-gray-500">Privacy Policy</a>
      </NextLink>
      <NextLink href="/terms">
        <a className="text-sm mr-4 text-gray-500">Terms</a>
      </NextLink>
    </div>
  )
}

export default Footer
