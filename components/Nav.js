import { Flex, IconButton, Link, Button, Box, Avatar } from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons'
import { useAuth } from '../lib/auth'
import NextLink from 'next/link'

const Nav = () => {
  const { user } = useAuth()

  return (
    <Flex
      bg="brand.light"
      alignItems="stretch"
      justifyContent="space-between"
      flexDirection="column"
      w="100%"
    >
      <Box
        bgGradient="linear(to-r,#ff2606,#000000,#ffcb10,#000000,#ffffff,#00c5eb,#0c47d7,#000000,#ffcb10,#11a37f,#000000, #ff2606)"
        h="1"
      />
      <Flex justifyContent="space-between">
        <Flex p={4}>
          <IconButton colorScheme="teal" aria-label="Logo" icon={<PhoneIcon />} />
        </Flex>
        <Flex justifyContent="space-around" alignItems="center" p="10px">
          <Link p={4}>Home</Link>
          <Link p={4}>About</Link>
          <Button variant="solid" size="md" p={4}>
            Sign In
          </Button>
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          <NextLink href="/account" passHref>
            <Link>
              <Avatar size="sm" src={user?.photoURL} />
            </Link>
          </NextLink>
        </Flex>
      </Flex>
    </Flex>
  )
}
export default Nav
