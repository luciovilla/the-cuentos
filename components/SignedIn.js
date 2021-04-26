import { useAuth } from '../lib/auth'
import { Button, Stack, useToast } from '@chakra-ui/react'
import { createCuento } from '../lib/db'

export default function SignedIn({ text }) {
  const auth = useAuth()
  const toast = useToast()
  const handleSubmit = (text) => {
    console.log(auth.user, 'user!')
    // need to add logic to not submit if empty
    const formatTextSubmission = {
      cuento: text,
      uid: auth.user.uid,
      name: auth.user.displayName,
      createdAt: new Date().toISOString(),
    }
    console.log(formatTextSubmission, 'hiii')
    createCuento(formatTextSubmission)
    toast({
      title: 'Cuento submitted!',
      description: "We've submitted your advice.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Stack spacing={4} direction="row" align="center">
      <Button
        backgroundColor="white"
        color="gray.900"
        variant="outline"
        fontWeight="medium"
        _hover={{ bg: 'gray.100' }}
        _active={{
          bg: 'gray.100',
          transform: 'scale(0.95)',
        }}
        onClick={() => handleSubmit(text)}
      >
        Submit
      </Button>
      <Button
        backgroundColor="white"
        color="gray.900"
        fontSize="small"
        fontWeight="medium"
        textDecor="underline"
        _hover={{ bg: 'gray.100' }}
        _active={{
          bg: 'gray.100',
          transform: 'scale(0.95)',
        }}
        onClick={(e) => auth.signout()}
      >
        View responses
      </Button>
    </Stack>
  )
}
