import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth'
import { getAllCuentos } from '../lib/db-admin'

import {
  Flex,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react'

import EmptyState from '../components/EmptyState'
import SignedIn from '../components/SignedIn'
import Nav from '../components/Nav'
import CuentosList from '../components/CuentosList'

export default function Home({ allCuentos }) {
  const auth = useAuth()
  const router = useRouter()
  const [TextValue, setTextValue] = useState('')
  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setTextValue(inputValue)
  }
  const handleSubmitEnd = () => {
    setTextValue('')
    router.push('/dashboard')
  }

  return (
    <Flex direction="column" align="center" justify="center" as="main">
      <Flex
        bg="brand.light"
        alignItems="stretch"
        justifyContent="space-between"
        flexDirection="column"
        w="100%"
      >
        <Nav />
        <Flex
          display="flex"
          maxW="1000px"
          w="100%"
          mx="auto"
          mt={40}
          justifyContent={['center', 'space-between']}
          flexWrap="wrap"
        >
          <Heading as="h1" size="2xl" maxW="500px" p={4}>
            A community space gathering advice for and by first-generation Latinos.
          </Heading>
          <FormControl p={6} maxW="sm" boxShadow="lg" rounded="md" bg="white">
            <FormLabel>What advice do you want to share?</FormLabel>
            <Textarea
              placeholder="Tell us your cuento."
              mb={2}
              px="2"
              value={TextValue}
              onChange={handleInputChange}
            />
            <FormErrorMessage>Error message</FormErrorMessage>

            {auth.user ? (
              <SignedIn text={TextValue} handleSubmitEnd={handleSubmitEnd} />
            ) : (
              <EmptyState text={TextValue} />
            )}
          </FormControl>
        </Flex>
        <Box maxW="1000px" mt="40" mx="auto">
          <CuentosList cuentos={allCuentos} />
        </Box>
      </Flex>
    </Flex>
  )
}

export async function getStaticProps(context) {
  const { cuentos } = await getAllCuentos()

  return {
    props: {
      allCuentos: cuentos,
    },
  }
}
