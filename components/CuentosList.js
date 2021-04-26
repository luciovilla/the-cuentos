import { SimpleGrid, Text, Box, Heading } from '@chakra-ui/react'
import { parseISO, format } from 'date-fns'

const CuentosList = ({ cuentos }) => {
  return (
    <SimpleGrid columns={[2, null, 3]} spacing="40px">
      {cuentos.map((cuento) => (
        <Box key={cuento.url} background="white" p={4} key={cuento.createdAt}>
          <Heading fontSize="md">“{cuento.cuento}”</Heading>
          {cuento.name && (
            <Text fontSize="sm" mt={1}>
              – {cuento.name}
            </Text>
          )}
          <Text fontSize="xs" color="GrayText" mt="2">
            {format(parseISO(cuento.createdAt), 'PP')}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}
export default CuentosList