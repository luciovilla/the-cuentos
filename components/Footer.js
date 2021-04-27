import NextLink from 'next/link'
import { Link, Flex } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Flex mb={8} mt={24} justify="center">
      <NextLink href="/privacy-policy" passHref>
        <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
          Privacy Policy
        </Link>
      </NextLink>
      <NextLink href="/terms" passHref>
        <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
          Terms
        </Link>
      </NextLink>
      <NextLink href="/" passHref>
        <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
          Home
        </Link>
      </NextLink>
    </Flex>
  )
}

export default Footer
