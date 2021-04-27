import { SimpleGrid, Text, Box, Heading } from '@chakra-ui/react'
import { parseISO, format } from 'date-fns'
import DeleteCuentoButton from './DeleteCuentoButton'
import EditCuentoModal from './EditCuentoModal'

const CuentosListAdmin = ({ cuentos }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing="40px">
      {cuentos.map((cuento) => (
        <Box key={cuento.id} background="white" p={4} key={cuento.createdAt}>
          <Heading fontSize="md">“{cuento.text}”</Heading>
          <Text fontSize="xs" color="GrayText" mt="2">
            {format(parseISO(cuento.createdAt), 'PPp')}
          </Text>
          <Box mt="4">
            <EditCuentoModal cuentoText={cuento.text} cuentoId={cuento.id}>
              Edit
            </EditCuentoModal>
            <DeleteCuentoButton cuentoId={cuento.id} />
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  )
}
export default CuentosListAdmin
