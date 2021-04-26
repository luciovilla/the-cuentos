import { SimpleGrid, Text, Box, Heading } from '@chakra-ui/react'
import { parseISO, format } from 'date-fns'
import DeleteCuentoButton from './DeleteCuentoButton'

const CuentosListAdmin = ({ cuentos }) => {
  return (
    <SimpleGrid columns={[2, null, 3]} spacing="40px">
      {cuentos.map((cuento) => (
        <Box key={cuento.url} background="white" p={4} key={cuento.createdAt}>
          <Heading fontSize="md">“{cuento.text}”</Heading>
          {cuento.name && (
            <Text fontSize="sm" mt={1}>
              – {cuento.name}
            </Text>
          )}
          <Text fontSize="xs" color="GrayText" mt="2">
            <Text as="span" fontWeight="bold">
              Date added:
            </Text>{' '}
            {format(parseISO(cuento.createdAt), 'PP')}
          </Text>
          <DeleteCuentoButton cuentoId={cuento.id} />
        </Box>
      ))}
    </SimpleGrid>
  )
}
export default CuentosListAdmin
