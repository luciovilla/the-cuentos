import { useState, useRef } from 'react'
import { useAuth } from '../lib/auth'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { getAllApprovedCuentos } from '../lib/db-admin'
import { mutate } from 'swr'
import {
  Flex,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  FormErrorMessage,
  FormHelperText,
  useToast,
} from '@chakra-ui/react'

import EmptyState from '../components/EmptyState'
import { createCuento } from '../lib/db'
import Nav from '../components/Nav'
import CuentosList from '../components/CuentosList'
import Footer from '../components/Footer'

export default function Home({ allCuentos }) {
  const auth = useAuth()
  const router = useRouter()
  const toast = useToast()
  const inputEl = useRef(null)
  const { handleSubmit, register } = useForm()
  const [TextValue, setTextValue] = useState('')

  const onCreateCuento = ({ text }) => {
    const newCuento = {
      uid: auth.user.uid,
      createdAt: new Date().toISOString(),
      text,
      name: auth.user.name,
      status: 'pending',
    }
    const { id } = createCuento(newCuento)
    toast({
      title: 'Success!',
      description: "We've added your cuento.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    mutate(
      ['/api/cuentos', auth.user.token],
      async (data) => ({
        cuentos: [{ id, ...newCuento }, ...data.cuentos],
      }),
      false
    )
    inputEl.current.value = ''
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
          <FormControl
            p={6}
            maxW="sm"
            boxShadow="lg"
            rounded="md"
            bg="white"
            as="form"
            onSubmit={handleSubmit(onCreateCuento)}
          >
            <FormLabel>What advice do you want to share?</FormLabel>
            <Textarea
              placeholder="Tell us your cuento."
              px="2"
              {...register('text')}
              ref={inputEl}
            />
            <FormErrorMessage>Error message</FormErrorMessage>
            <FormHelperText mb={4} mt={0} fontStyle="italic" fontSize="xs">
              * In 30 words or less.
            </FormHelperText>

            {auth.user ? (
              <Button fontWeight="medium" type="submit">
                Submit
              </Button>
            ) : (
              <EmptyState text={TextValue} />
            )}
          </FormControl>
        </Flex>
        <Box maxW="1000px" mt="40" mx="auto" w="100%">
          <CuentosList cuentos={allCuentos} />
        </Box>
      </Flex>
      <Footer/>
    </Flex>
  )
}

export async function getStaticProps(context) {
  const { cuentos } = await getAllApprovedCuentos()

  return {
    props: {
      allCuentos: cuentos,
    },
  }
}
