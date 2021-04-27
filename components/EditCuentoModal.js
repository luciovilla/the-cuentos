import { useState } from 'react'
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

import { updateCuento } from '../lib/db'
import { useAuth } from '../lib/auth'

const EditCuentoModal = ({ children, cuentoText, cuentoId }) => {
  const toast = useToast()
  const auth = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register } = useForm()
  let [textValue, setTextValue] = useState(cuentoText)

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setTextValue(inputValue)
  }

  const onCreateCuento = async () => {
    const updatedCuento = {
      text: textValue,
    }
    await updateCuento(cuentoId, updatedCuento)
    toast({
      title: 'Success!',
      description: "We've updated your cuento.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    mutate(['/api/cuentos', auth.user.token])
    onClose()
  }

  return (
    <>
      <Button
        onClick={onOpen}
        size="sm"
        py="3.5"
        fontSize="xs"
        _active={{
          transform: 'scale(0.95)',
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateCuento)}>
          <ModalHeader fontWeight="bold">Edit Cuento</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="My Cuento"
                name="text"
                {...register('text')}
                onChange={handleInputChange}
                value={textValue}
              />
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

export default EditCuentoModal
