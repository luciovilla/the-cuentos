import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Button,
  Textarea,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'

import { createCuento } from '../lib/db'
import { useAuth } from '../lib/auth'

const AddCuentoModal = ({ children }) => {
  const toast = useToast()
  const auth = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register } = useForm()
  const inputEl = useRef(null)

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
    onClose()
    inputEl.current.value = ''
  }

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateCuento)}>
          <ModalHeader fontWeight="bold">Add Cuento</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea placeholder="My Cuento" name="text" {...register('text')} ref={inputEl} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button backgroundColor="#99FFFE" color="#194D4C" fontWeight="medium" type="submit">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddCuentoModal
