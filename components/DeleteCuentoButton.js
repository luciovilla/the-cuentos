import React, { useState, useRef } from 'react'
import { mutate } from 'swr'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'

import { deleteCuento } from '../lib/db'
import { useAuth } from '../lib/auth'

const DeleteCuentoButton = ({ cuentoId }) => {
  const [isOpen, setIsOpen] = useState()
  const cancelRef = useRef()
  const auth = useAuth()

  const onClose = () => setIsOpen(false)
  const onDelete = () => {
    deleteCuento(cuentoId)
    mutate(
      ['/api/cuentos', auth.user.token],
      async (data) => {
        return {
          cuentos: data.cuentos.filter((cuento) => cuento.id !== cuentoId),
        }
      },
      false
    )
    onClose()
  }

  return (
    <>
      <Button
        aria-label="Delete Cuento"
        ml="1"
        variant="ghost"
        size="sm"
        fontSize="xs"
        onClick={() => setIsOpen(true)}
      >
        Remove
      </Button>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Cuento
          </AlertDialogHeader>
          <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteCuentoButton
