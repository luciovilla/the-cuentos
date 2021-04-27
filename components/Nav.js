import { Flex, Text, Link, Button, Box, Avatar } from '@chakra-ui/react'
import { useAuth } from '../lib/auth'
import NextLink from 'next/link'

const Nav = () => {
  const { user, signinWithGoogle, signout } = useAuth()

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
          <NextLink href="/" passHref>
            <Link>
              <Text fontWeight="extrabold">THE CUENTOS</Text>
            </Link>
          </NextLink>
        </Flex>
        <Flex justifyContent="space-around" alignItems="center" p="10px">
          <NextLink href="/" passHref>
            <Link p={1} fontWeight="light" mx="2" display={['none', 'block']}>
              Home
            </Link>
          </NextLink>
          {user ? (
            <>
              <NextLink href="/dashboard" passHref>
                <Link p={1} fontWeight="light" mx="2" fontSize="sm">
                  My Cuentos
                </Link>
              </NextLink>
              <Button variant="solid" size="sm" onClick={() => signout('/')} mx="2" p={1}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button variant="solid" size="sm" onClick={() => signinWithGoogle()} mx="2">
              Sign In
            </Button>
          )}

          <NextLink href="/dashboard" passHref>
            <Link>
              <Avatar size="sm" src={user?.photoUrl} />
            </Link>
          </NextLink>
        </Flex>
      </Flex>
    </Flex>
  )
}
export default Nav
